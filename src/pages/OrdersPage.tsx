import { useEffect, useMemo, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, Mail, Package, Search } from "lucide-react";
import { supabase } from "../lib/supabase";
import { ngn } from "../data/catalog";
import { AccountShell, GuestGate, PageSpinner, useAuthUser } from "./AccountShell";

type OrderItem = { name: string; quantity: number; price: number; image?: string };

type Order = {
  id: string;
  reference: string;
  createdAt: string;
  status: string;
  total: number;
  paymentMethod: string;
  items: OrderItem[];
};

const STEPS = ["Placed", "Processing", "Shipped", "Delivered"];

const FILTERS = ["All", "Processing", "Shipped", "Delivered", "Cancelled"] as const;
type Filter = (typeof FILTERS)[number];

/** Maps whatever status text is stored to a tracker position (or "cancelled"). */
function stageOf(status: string): number | "cancelled" {
  const s = status.toLowerCase();
  if (/(cancel|fail|refund|declin)/.test(s)) return "cancelled";
  if (/(deliver|complete|fulfil)/.test(s)) return 3;
  if (/(ship|dispatch|transit)/.test(s)) return 2;
  if (/(process|paid|confirm|packing|success)/.test(s)) return 1;
  return 0;
}

function labelOf(status: string) {
  const stage = stageOf(status);
  return stage === "cancelled" ? "Cancelled" : STEPS[stage];
}

function toNumber(value: unknown, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function normalise(raw: Record<string, unknown>): Order {
  let rawItems: unknown = raw.items ?? raw.order_items ?? [];
  if (typeof rawItems === "string") {
    try {
      rawItems = JSON.parse(rawItems);
    } catch {
      rawItems = [];
    }
  }

  const items: OrderItem[] = (Array.isArray(rawItems) ? rawItems : []).map((entry) => {
    const it = (entry ?? {}) as Record<string, unknown>;
    const nested = (it.product ?? {}) as Record<string, unknown>;
    return {
      name: String(it.name ?? it.product_name ?? it.title ?? nested.name ?? "Item"),
      quantity: toNumber(it.quantity ?? it.qty, 1),
      price: toNumber(it.price ?? it.unit_price ?? nested.price, 0),
      image: (it.image ?? it.image_url ?? nested.image) as string | undefined,
    };
  });

  const computed = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const id = String(raw.id ?? "");

  return {
    id,
    reference: String(raw.order_number ?? raw.reference ?? raw.order_ref ?? `#${id.slice(0, 8).toUpperCase()}`),
    createdAt: String(raw.created_at ?? raw.inserted_at ?? ""),
    status: String(raw.status ?? raw.order_status ?? "pending"),
    total: toNumber(raw.total ?? raw.total_amount ?? raw.amount, computed),
    paymentMethod: String(raw.payment_method ?? raw.payment_type ?? ""),
    items,
  };
}

function formatDate(value: string) {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("en-NG", { day: "numeric", month: "long", year: "numeric" });
}

export default function OrdersPage({ go }: { go: (path: string) => void }) {
  const { user, loading: authLoading } = useAuthUser();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [filter, setFilter] = useState<Filter>("All");
  const [query, setQuery] = useState("");
  const [openId, setOpenId] = useState<string | null>(null);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    let active = true;

    async function load(userId: string) {
      setLoading(true);
      setFailed(false);

      // Orders may be keyed by customer_id or user_id depending on the checkout setup.
      let result = await supabase
        .from("orders")
        .select("*")
        .eq("customer_id", userId)
        .order("created_at", { ascending: false });

      if (result.error) {
        result = await supabase
          .from("orders")
          .select("*")
          .eq("user_id", userId)
          .order("created_at", { ascending: false });
      }

      if (!active) return;

      if (result.error) {
        console.error("Unable to load orders:", result.error.message);
        setFailed(true);
        setOrders([]);
      } else {
        setOrders((result.data ?? []).map((row) => normalise(row as Record<string, unknown>)));
      }
      setLoading(false);
    }

    void load(user.id);
    return () => {
      active = false;
    };
  }, [user, authLoading]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return orders.filter((order) => {
      const stage = stageOf(order.status);
      const matchesFilter =
        filter === "All" ||
        (filter === "Cancelled" && stage === "cancelled") ||
        (filter === "Processing" && (stage === 0 || stage === 1)) ||
        (filter === "Shipped" && stage === 2) ||
        (filter === "Delivered" && stage === 3);
      const matchesQuery =
        !q ||
        order.reference.toLowerCase().includes(q) ||
        order.items.some((i) => i.name.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [orders, filter, query]);

  return (
    <AccountShell
      active="orders"
      eyebrow="YOUR PURCHASES"
      title={
        <>
          My orders,
          <br />
          <em className="text-[#9A8061]">all in one place.</em>
        </>
      }
      description="Follow every parcel from our edit to your door, and revisit what you've ordered."
      go={go}
    >
      {authLoading || loading ? (
        <PageSpinner />
      ) : !user ? (
        <GuestGate message="Sign in to see your orders and track your deliveries." />
      ) : failed ? (
        <div className="mx-auto max-w-xl border border-[#E6D9CA] bg-[#FBF7F0] px-6 py-14 text-center">
          <h2 className="font-serif text-3xl text-[#4B165C]">We couldn't load your orders</h2>
          <p className="mt-3 text-sm leading-7 text-[#89766A]">
            Please check your connection and try again in a moment.
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="mt-7 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.14em] text-white hover:bg-[#351043]"
          >
            TRY AGAIN
          </button>
        </div>
      ) : orders.length === 0 ? (
        <div className="mx-auto max-w-xl border border-[#E6D9CA] bg-[#FBF7F0] px-6 py-16 text-center sm:px-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#B99A62]/50 bg-[#EFE6DC] text-[#4B165C]">
            <Package size={30} strokeWidth={1.2} />
          </div>
          <h2 className="mt-7 font-serif text-3xl leading-tight text-[#4B165C]">No orders yet.</h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#89766A]">
            When you place an order, it will appear here so you can follow it every step of the way.
          </p>
          <button
            type="button"
            onClick={() => go("/product-line")}
            className="mt-8 inline-flex items-center gap-3 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.14em] text-white transition-colors hover:bg-[#351043]"
          >
            START SHOPPING <ArrowUpRight size={15} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  type="button"
                  aria-pressed={filter === f}
                  onClick={() => setFilter(f)}
                  className={`shrink-0 rounded-full border px-4 py-2.5 text-[11px] transition-all duration-300 ${
                    filter === f
                      ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]"
                      : "border-[#CDBBAA] bg-[#F7F2EA]/60 text-[#6D594D] hover:border-[#4B165C] hover:text-[#4B165C]"
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>

            <label className="relative block w-full lg:w-72">
              <span className="sr-only">Search orders</span>
              <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#89766A]" />
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search order number or item"
                className="min-h-11 w-full border border-[#CDBBAA] bg-[#FBF7F0] pl-11 pr-4 text-xs text-[#5A4037] outline-none placeholder:text-[#98877D] focus:border-[#4B165C]"
              />
            </label>
          </div>

          {visible.length === 0 ? (
            <p className="py-16 text-center font-serif text-xl text-[#4B165C]">
              No orders match your search.
            </p>
          ) : (
            <div className="mt-8 space-y-5">
              {visible.map((order) => {
                const stage = stageOf(order.status);
                const open = openId === order.id;
                const itemCount = order.items.reduce((n, i) => n + i.quantity, 0);

                return (
                  <article key={order.id} className="border border-[#E6D9CA] bg-[#FBF7F0]">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenId(open ? null : order.id)}
                      className="flex w-full flex-wrap items-center justify-between gap-4 px-5 py-5 text-left sm:px-8 sm:py-6"
                    >
                      <div className="min-w-0">
                        <p className="text-[9px] tracking-[0.2em] text-[#7D8768]">ORDER</p>
                        <p className="mt-1 truncate font-serif text-xl text-[#4B165C]">{order.reference}</p>
                        {order.createdAt && (
                          <p className="mt-1 text-xs text-[#89766A]">Placed {formatDate(order.createdAt)}</p>
                        )}
                      </div>

                      <div className="flex items-center gap-5 sm:gap-8">
                        <span
                          className={`rounded-full border px-3 py-1.5 text-[10px] font-semibold tracking-[0.08em] ${
                            stage === "cancelled"
                              ? "border-[#C9A3A3] text-[#8C4A4A]"
                              : stage === 3
                                ? "border-[#7D8768] bg-[#7D8768]/10 text-[#5E6A49]"
                                : "border-[#B99A62] text-[#896B48]"
                          }`}
                        >
                          {labelOf(order.status)}
                        </span>
                        <div className="text-right">
                          <p className="font-serif text-xl text-[#4B165C]">{ngn(order.total)}</p>
                          {itemCount > 0 && (
                            <p className="text-[10px] text-[#89766A]">
                              {itemCount} {itemCount === 1 ? "item" : "items"}
                            </p>
                          )}
                        </div>
                        <ChevronDown
                          size={18}
                          className={`shrink-0 text-[#4B165C] transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                        />
                      </div>
                    </button>

                    {open && (
                      <div className="border-t border-[#E6D9CA] px-5 py-7 sm:px-8">
                        {stage === "cancelled" ? (
                          <p className="text-sm text-[#8C4A4A]">This order was cancelled.</p>
                        ) : (
                          <ol className="grid grid-cols-4 gap-2" aria-label="Order progress">
                            {STEPS.map((step, index) => {
                              const done = index <= stage;
                              return (
                                <li key={step} className="text-center">
                                  <div className="flex items-center">
                                    <span className={`h-px flex-1 ${index === 0 ? "opacity-0" : done ? "bg-[#4B165C]" : "bg-[#D8C8B7]"}`} />
                                    <span
                                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs ${
                                        done
                                          ? "border-[#4B165C] bg-[#4B165C] text-white"
                                          : "border-[#D8C8B7] text-[#98877D]"
                                      }`}
                                    >
                                      {done ? <Check size={14} /> : index + 1}
                                    </span>
                                    <span className={`h-px flex-1 ${index === STEPS.length - 1 ? "opacity-0" : index < stage ? "bg-[#4B165C]" : "bg-[#D8C8B7]"}`} />
                                  </div>
                                  <p className={`mt-2 text-[10px] tracking-[0.05em] sm:text-xs ${done ? "text-[#4B165C]" : "text-[#98877D]"}`}>
                                    {step}
                                  </p>
                                </li>
                              );
                            })}
                          </ol>
                        )}

                        {order.items.length > 0 && (
                          <ul className="mt-8 divide-y divide-[#E6D9CA] border-y border-[#E6D9CA]">
                            {order.items.map((item, i) => (
                              <li key={`${item.name}-${i}`} className="flex items-center gap-4 py-4">
                                {item.image ? (
                                  <img src={item.image} alt={item.name} className="h-20 w-16 shrink-0 bg-[#EFE6DC] object-cover" />
                                ) : (
                                  <span className="flex h-20 w-16 shrink-0 items-center justify-center bg-[#EFE6DC] text-[#4B165C]">
                                    <Package size={20} strokeWidth={1.3} />
                                  </span>
                                )}
                                <div className="min-w-0 flex-1">
                                  <p className="truncate font-serif text-lg text-[#4B165C]">{item.name}</p>
                                  <p className="mt-1 text-xs text-[#89766A]">Qty {item.quantity}</p>
                                </div>
                                <p className="text-sm font-medium text-[#5A4037]">{ngn(item.price * item.quantity)}</p>
                              </li>
                            ))}
                          </ul>
                        )}

                        <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                          <div className="text-xs leading-6 text-[#89766A]">
                            {order.paymentMethod && <p>Payment: {order.paymentMethod}</p>}
                            <p>Total paid: <span className="font-medium text-[#5A4037]">{ngn(order.total)}</span></p>
                          </div>
                          <a
                            href={`mailto:hello@thesoftedit.com?subject=${encodeURIComponent(`Help with order ${order.reference}`)}`}
                            className="inline-flex items-center justify-center gap-2 border border-[#4B165C] px-5 py-3 text-[10px] font-semibold tracking-[0.12em] text-[#4B165C] transition-colors hover:bg-[#4B165C] hover:text-[#F7F2EA]"
                          >
                            <Mail size={14} /> NEED HELP WITH THIS ORDER?
                          </a>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          )}
        </>
      )}
    </AccountShell>
  );
}
