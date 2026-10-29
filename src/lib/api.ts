import { supabase } from "./supabase";
import type { StoreProduct } from "../data/catalog";

/* ------------------------------------------------------------------ */
/*  CONFIG — everything you may need to change lives here             */
/* ------------------------------------------------------------------ */
export const SHIPPING_FEE = 3500; // flat delivery fee in Naira
export const FREE_SHIPPING_OVER = 100000;
export const DISCOUNT_PERCENT = 10;

export const BANK = {
  bank: "Zenith Bank",
  // Exactly as you sent it. NOTE: Nigerian bank account numbers have 10 digits and this has 9,
  // so please double-check it against your Zenith account before launch.
  accountNumber: "221575836",
  accountName: "The Soft Edit", // TODO: put the exact account name on the Zenith account
};

export const OWNER_WHATSAPP = "2348139333832";

export const PAYSTACK_PUBLIC_KEY: string =
  (import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_PAYSTACK_PUBLIC_KEY ?? "";

export const ADMIN_EMAILS: string[] = (
  ((import.meta as unknown as { env: Record<string, string | undefined> }).env.VITE_ADMIN_EMAILS ?? "") as string
)
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type OrderStatus =
  | "pending"
  | "awaiting_transfer"
  | "transfer_reported"
  | "paid"
  | "paid_unverified"
  | "fulfilled"
  | "cleared"
  | "cancelled";

export type OrderItem = { id: number; name: string; price: number; quantity: number; image: string };

export type Order = {
  id?: string;
  reference: string;
  customer_name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  method: "paystack" | "transfer";
  status: OrderStatus;
  discount_code?: string | null;
  user_id?: string | null;
  created_at?: string;
  paid_at?: string | null;
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
const rand = (n: number) =>
  Array.from({ length: n }, () => "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"[Math.floor(Math.random() * 32)]).join("");

export const makeReference = () => `SE-${Date.now().toString(36).toUpperCase()}-${rand(4)}`;

export const isEmail = (s: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim());

/* ------------------------------------------------------------------ */
/*  Waitlist                                                           */
/* ------------------------------------------------------------------ */
export async function joinWaitlist(input: { name: string; email: string; interest?: string }) {
  const { error } = await supabase.from("waitlist").insert({
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    interest: input.interest ?? null,
  });
  if (error && error.code !== "23505") throw new Error(error.message); // 23505 = already on the list
  return { alreadyJoined: error?.code === "23505" };
}

/* ------------------------------------------------------------------ */
/*  10% discount codes                                                 */
/* ------------------------------------------------------------------ */
export async function requestDiscountCode(input: { name: string; email: string }) {
  const email = input.email.trim().toLowerCase();

  // one code per email — return the existing one if they ask again
  const existing = await supabase.rpc("get_discount_for_email", { p_email: email });
  if (!existing.error && typeof existing.data === "string" && existing.data) {
    return { code: existing.data as string, existing: true };
  }

  const code = `SOFT10-${rand(6)}`;
  const { error } = await supabase.from("discount_codes").insert({
    code,
    name: input.name.trim(),
    email,
    percent: DISCOUNT_PERCENT,
  });
  if (error) {
    if (error.code === "23505") throw new Error("This email has already claimed its welcome code.");
    throw new Error(error.message);
  }

  // Best-effort email through the optional `send-discount` edge function.
  try {
    await supabase.functions.invoke("send-discount", { body: { name: input.name.trim(), email, code } });
  } catch {
    /* the code is still shown on screen, so nothing is lost */
  }

  return { code, existing: false };
}

export async function validateDiscountCode(code: string): Promise<boolean> {
  const { data, error } = await supabase.rpc("validate_discount", { p_code: code.trim().toUpperCase() });
  return !error && data === true;
}

/* ------------------------------------------------------------------ */
/*  Orders                                                             */
/* ------------------------------------------------------------------ */
export function priceCart(items: { product: StoreProduct | { price: number }; quantity: number }[], discountOn: boolean) {
  const subtotal = items.reduce((n, i) => n + i.product.price * i.quantity, 0);
  const discount = discountOn ? Math.round((subtotal * DISCOUNT_PERCENT) / 100) : 0;
  const shipping = subtotal === 0 || subtotal - discount >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
  return { subtotal, discount, shipping, total: subtotal - discount + shipping };
}

export async function createOrder(order: Order): Promise<Order> {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const row = { ...order, user_id: user?.id ?? null };
  const { error } = await supabase.from("orders").insert(row);
  if (error) throw new Error(error.message);

  if (order.discount_code) {
    await supabase.rpc("redeem_discount", { p_code: order.discount_code.toUpperCase() });
  }

  try {
    window.localStorage.setItem("softEditLastOrder", JSON.stringify(row));
  } catch {
    /* ignore */
  }
  return row;
}

/** Asks the secure edge function to verify the Paystack payment and mark the order paid. */
export async function verifyPaystackPayment(reference: string): Promise<boolean> {
  try {
    const { data, error } = await supabase.functions.invoke("verify-paystack", { body: { reference } });
    return !error && data?.verified === true;
  } catch {
    return false;
  }
}

export function getLastOrder(): Order | null {
  try {
    const raw = window.localStorage.getItem("softEditLastOrder");
    return raw ? (JSON.parse(raw) as Order) : null;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/*  Paystack inline popup                                              */
/* ------------------------------------------------------------------ */
type PaystackSetup = {
  key: string;
  email: string;
  amount: number;
  currency: string;
  ref: string;
  channels?: string[];
  metadata?: Record<string, unknown>;
  callback: (res: { reference: string }) => void;
  onClose: () => void;
};
declare global {
  interface Window {
    PaystackPop?: { setup: (o: PaystackSetup) => { openIframe: () => void } };
  }
}

function loadPaystack(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.PaystackPop) return resolve();
    const s = document.createElement("script");
    s.src = "https://js.paystack.co/v1/inline.js";
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("Could not load Paystack. Check your internet connection."));
    document.body.appendChild(s);
  });
}

export async function payWithPaystack(opts: {
  email: string;
  total: number;
  reference: string;
  name: string;
  phone: string;
}): Promise<{ reference: string } | null> {
  if (!PAYSTACK_PUBLIC_KEY) {
    throw new Error("Paystack is not set up yet. Add VITE_PAYSTACK_PUBLIC_KEY to your .env file.");
  }
  await loadPaystack();

  return new Promise((resolve) => {
    const handler = window.PaystackPop!.setup({
      key: PAYSTACK_PUBLIC_KEY,
      email: opts.email,
      amount: Math.round(opts.total * 100), // kobo
      currency: "NGN",
      ref: opts.reference,
      channels: ["card", "bank", "ussd", "qr", "mobile_money", "bank_transfer"],
      metadata: { customer_name: opts.name, phone: opts.phone },
      callback: (res) => resolve({ reference: res.reference }),
      onClose: () => resolve(null),
    });
    handler.openIframe();
  });
}

/* ------------------------------------------------------------------ */
/*  Admin                                                              */
/* ------------------------------------------------------------------ */
export async function isAdminSession(): Promise<{ ok: boolean; email: string | null }> {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  const email = user?.email?.toLowerCase() ?? null;
  return { ok: !!email && ADMIN_EMAILS.includes(email), email };
}

export async function fetchOrders(): Promise<Order[]> {
  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as Order[];
}

export async function setOrderStatus(id: string, status: OrderStatus) {
  const patch: Record<string, unknown> = { status };
  if (status === "paid") patch.paid_at = new Date().toISOString();
  const { error } = await supabase.from("orders").update(patch).eq("id", id);
  if (error) throw new Error(error.message);
}

export async function deleteOrder(id: string) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw new Error(error.message);
}

export async function fetchWaitlist() {
  const { data, error } = await supabase.from("waitlist").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as { id: string; name: string; email: string; interest: string | null; created_at: string }[];
}

export async function fetchDiscountSignups() {
  const { data, error } = await supabase.from("discount_codes").select("*").order("created_at", { ascending: false });
  if (error) throw new Error(error.message);
  return (data ?? []) as { id: string; name: string; email: string; code: string; used: boolean; created_at: string }[];
}
