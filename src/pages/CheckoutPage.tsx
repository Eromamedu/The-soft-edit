import { useState, type FormEvent } from "react";
import { ArrowLeft, Banknote, Check, CreditCard, Loader2, Minus, Plus, ShieldCheck, Tag } from "lucide-react";
import { ngn } from "../data/catalog";
import {
  FREE_SHIPPING_OVER,
  createOrder,
  isEmail,
  makeReference,
  payWithPaystack,
  priceCart,
  validateDiscountCode,
  verifyPaystackPayment,
  type Order,
} from "../lib/api";
import { Eyebrow, type Go } from "../components/ui";

export type CheckoutItem = {
  product: { id: number; name: string; price: number; image: string; category: string };
  quantity: number;
};

type Props = {
  items: CheckoutItem[];
  onUpdateQuantity: (id: number, change: number) => void;
  onClearBag: () => void;
  go: Go;
};

const STATES = [
  "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
];

export default function CheckoutPage({ items, onUpdateQuantity, onClearBag, go }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "Lagos" });
  const [method, setMethod] = useState<"paystack" | "transfer">("paystack");
  const [codeInput, setCodeInput] = useState(() => {
    try {
      return window.localStorage.getItem("softEditDiscountCode") ?? "";
    } catch {
      return "";
    }
  });
  const [appliedCode, setAppliedCode] = useState("");
  const [codeMsg, setCodeMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState<null | { reference: string; total: number; confirmed: boolean }>(null);

  const totals = priceCart(items, !!appliedCode);
  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  async function applyCode() {
    setCodeMsg("");
    if (!codeInput.trim()) return;
    const ok = await validateDiscountCode(codeInput);
    if (ok) {
      setAppliedCode(codeInput.trim().toUpperCase());
      setCodeMsg("Code applied. Lovely.");
    } else {
      setAppliedCode("");
      setCodeMsg("That code isn't valid or has already been used.");
    }
  }

  async function placeOrder(e: FormEvent) {
    e.preventDefault();
    setError("");
    if (items.length === 0) return setError("Your bag is empty.");
    if (!form.name.trim()) return setError("Please enter your full name.");
    if (!isEmail(form.email)) return setError("Please enter a valid email address.");
    if (form.phone.replace(/\D/g, "").length < 10) return setError("Please enter a valid phone number.");
    if (!form.address.trim() || !form.city.trim()) return setError("Please enter your delivery address and city.");

    setBusy(true);
    try {
      const reference = makeReference();
      const order: Order = {
        reference,
        customer_name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        address: form.address.trim(),
        city: form.city.trim(),
        state: form.state,
        items: items.map((i) => ({
          id: i.product.id,
          name: i.product.name,
          price: i.product.price,
          quantity: i.quantity,
          image: i.product.image,
        })),
        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        method,
        status: method === "transfer" ? "awaiting_transfer" : "pending",
        discount_code: appliedCode || null,
      };

      await createOrder(order);

      if (method === "transfer") {
        onClearBag();
        go("/transfer");
        return;
      }

      const paid = await payWithPaystack({
        email: order.email,
        total: order.total,
        reference,
        name: order.customer_name,
        phone: order.phone,
      });

      if (!paid) {
        setError("Payment was not completed. Your order is saved, so you can try again whenever you're ready.");
        return;
      }

      const confirmed = await verifyPaystackPayment(paid.reference);
      onClearBag();
      setSuccess({ reference, total: order.total, confirmed });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setBusy(false);
    }
  }

  const field =
    "min-h-14 w-full border border-[#D7C7D4] bg-[#F7F2EA] px-5 text-sm text-[#5A4037] outline-none transition-all duration-300 placeholder:text-[#98877D] focus:border-[#4B165C] focus:ring-2 focus:ring-[#4B165C]/10";

  /* ---------- success ---------- */
  if (success) {
    return (
      <section className="bg-[#FBF7F0] px-5 pb-28 pt-44 text-center sm:pt-52">
        <div className="mx-auto max-w-xl">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#B99A62] text-[#4B165C]">
            <Check size={34} />
          </div>
          <Eyebrow>
            <span className="mx-auto">ORDER RECEIVED</span>
          </Eyebrow>
          <h1 className="mt-5 font-serif text-5xl italic leading-tight text-[#4B165C]">Thank you, beautifully.</h1>
          <p className="mx-auto mt-5 max-w-md text-sm leading-8 text-[#7A685E]">
            {success.confirmed
              ? "Your payment is confirmed and your order is being prepared."
              : "We've received your payment and we're confirming it now. You'll hear from us shortly."}
          </p>
          <div className="mx-auto mt-8 inline-block border border-dashed border-[#4B165C] px-8 py-4">
            <p className="text-[10px] tracking-[0.2em] text-[#7D8768]">ORDER REFERENCE</p>
            <p className="mt-1 font-mono text-lg tracking-widest text-[#4B165C]">{success.reference}</p>
            <p className="mt-1 text-sm text-[#5A4037]">{ngn(success.total)}</p>
          </div>
          <div className="mt-10">
            <button type="button" onClick={() => go("/")} className="bg-[#4B165C] px-9 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition-all hover:bg-[#351043]">
              CONTINUE SHOPPING
            </button>
          </div>
        </div>
      </section>
    );
  }

  /* ---------- empty ---------- */
  if (items.length === 0) {
    return (
      <section className="bg-[#FBF7F0] px-5 pb-32 pt-48 text-center">
        <h1 className="font-serif text-5xl italic text-[#4B165C]">Your bag is waiting for something lovely.</h1>
        <button type="button" onClick={() => go("/product-line")} className="mt-8 bg-[#4B165C] px-9 py-4 text-[10px] font-semibold tracking-[0.15em] text-white hover:bg-[#351043]">
          DISCOVER THE EDIT
        </button>
      </section>
    );
  }

  return (
    <section className="bg-[#FBF7F0] px-5 pb-24 pt-36 sm:px-10 sm:pt-44">
      <div className="mx-auto max-w-[1250px]">
        <button type="button" onClick={() => go("/product-line")} className="mb-8 flex items-center gap-2 text-[10px] tracking-[0.16em] text-[#7D8768] hover:text-[#4B165C]">
          <ArrowLeft size={14} /> CONTINUE SHOPPING
        </button>
        <Eyebrow>SECURE CHECKOUT</Eyebrow>
        <h1 className="mt-4 font-serif text-5xl tracking-[-0.04em] text-[#4B165C] sm:text-6xl">
          Almost <em className="text-[#9A8061]">yours.</em>
        </h1>

        <form onSubmit={placeOrder} noValidate className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="space-y-10">
            {/* delivery */}
            <div>
              <h2 className="font-serif text-2xl text-[#4B165C]">Delivery details</h2>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <input className={`${field} sm:col-span-2`} placeholder="Full name" autoComplete="name" value={form.name} onChange={set("name")} />
                <input className={field} type="email" placeholder="Email address" autoComplete="email" value={form.email} onChange={set("email")} />
                <input className={field} type="tel" placeholder="Phone number" autoComplete="tel" value={form.phone} onChange={set("phone")} />
                <input className={`${field} sm:col-span-2`} placeholder="Delivery address" autoComplete="street-address" value={form.address} onChange={set("address")} />
                <input className={field} placeholder="City / Town" autoComplete="address-level2" value={form.city} onChange={set("city")} />
                <select className={field} value={form.state} onChange={set("state")} aria-label="State">
                  {STATES.map((s) => (
                    <option key={s}>{s}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* payment method */}
            <div>
              <h2 className="font-serif text-2xl text-[#4B165C]">How would you like to pay?</h2>
              <div className="mt-5 grid gap-4">
                {[
                  { id: "paystack" as const, icon: CreditCard, title: "Pay online", sub: "Card, bank, USSD, bank transfer and more, securely through Paystack." },
                  { id: "transfer" as const, icon: Banknote, title: "Direct bank transfer", sub: "Send to our Zenith Bank account. We confirm and ship once it arrives." },
                ].map((m) => (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-start gap-4 border px-5 py-5 transition-all duration-300 ${
                      method === m.id ? "border-[#4B165C] bg-[#F7F2EA] shadow-[0_10px_30px_rgba(75,22,92,0.08)]" : "border-[#D8C8B7] hover:border-[#B99A62]"
                    }`}
                  >
                    <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} className="mt-1 accent-[#4B165C]" />
                    <m.icon size={22} strokeWidth={1.4} className="mt-0.5 shrink-0 text-[#4B165C]" />
                    <span>
                      <span className="block font-serif text-lg text-[#4B165C]">{m.title}</span>
                      <span className="mt-1 block text-xs leading-6 text-[#7A685E]">{m.sub}</span>
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* summary */}
          <aside className="h-fit border border-[#E6D9CA] bg-[#F7F2EA] p-6 sm:p-8 lg:sticky lg:top-32">
            <h2 className="font-serif text-2xl text-[#4B165C]">Your bag</h2>

            <div className="mt-6 space-y-5">
              {items.map(({ product, quantity }) => (
                <div key={product.id} className="flex gap-4">
                  <img src={product.image} alt={product.name} className="h-20 w-16 shrink-0 bg-[#EFE6DC] object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="font-serif text-base leading-snug text-[#4B165C]">{product.name}</p>
                    <p className="mt-1 text-xs text-[#5A4037]">{ngn(product.price * quantity)}</p>
                    <div className="mt-2 inline-flex items-center border border-[#D8C8B7]">
                      <button type="button" aria-label="Decrease" onClick={() => onUpdateQuantity(product.id, -1)} className="flex h-7 w-7 items-center justify-center hover:bg-[#EFE6DC]"><Minus size={12} /></button>
                      <span className="min-w-7 text-center text-xs">{quantity}</span>
                      <button type="button" aria-label="Increase" onClick={() => onUpdateQuantity(product.id, 1)} className="flex h-7 w-7 items-center justify-center hover:bg-[#EFE6DC]"><Plus size={12} /></button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-7 border-t border-[#E6D9CA] pt-6">
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A8061]" />
                  <input
                    value={codeInput}
                    onChange={(e) => setCodeInput(e.target.value)}
                    placeholder="Discount code"
                    aria-label="Discount code"
                    className="min-h-12 w-full border border-[#D7C7D4] bg-white/60 pl-10 pr-3 text-xs uppercase tracking-wider outline-none focus:border-[#4B165C]"
                  />
                </div>
                <button type="button" onClick={applyCode} className="border border-[#4B165C] px-5 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] hover:bg-[#4B165C] hover:text-white">
                  APPLY
                </button>
              </div>
              {codeMsg && <p className={`mt-2 text-xs ${appliedCode ? "text-[#7D8768]" : "text-[#9A3B3B]"}`}>{codeMsg}</p>}
            </div>

            <dl className="mt-6 space-y-3 border-t border-[#E6D9CA] pt-6 text-sm text-[#5A4037]">
              <div className="flex justify-between"><dt>Subtotal</dt><dd>{ngn(totals.subtotal)}</dd></div>
              {totals.discount > 0 && <div className="flex justify-between text-[#7D8768]"><dt>Discount</dt><dd>-{ngn(totals.discount)}</dd></div>}
              <div className="flex justify-between"><dt>Delivery</dt><dd>{totals.shipping === 0 ? "Free" : ngn(totals.shipping)}</dd></div>
              <div className="flex items-baseline justify-between border-t border-[#E6D9CA] pt-4">
                <dt className="font-serif text-lg text-[#4B165C]">Total</dt>
                <dd className="font-serif text-3xl text-[#4B165C]">{ngn(totals.total)}</dd>
              </div>
            </dl>
            <p className="mt-2 text-[10px] text-[#89766A]">Free delivery on orders over {ngn(FREE_SHIPPING_OVER)}.</p>

            {error && <p role="alert" className="mt-5 text-xs leading-6 text-[#9A3B3B]">{error}</p>}

            <button
              type="submit"
              disabled={busy}
              className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 bg-[#4B165C] px-5 text-[10px] font-semibold tracking-[0.16em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#351043] disabled:opacity-60"
            >
              {busy && <Loader2 size={16} className="animate-spin" />}
              {method === "paystack" ? `PAY ${ngn(totals.total)}` : "PLACE ORDER & SEE BANK DETAILS"}
            </button>
            <p className="mt-4 flex items-center justify-center gap-2 text-[10px] tracking-[0.1em] text-[#7D8768]">
              <ShieldCheck size={14} /> SECURE & ENCRYPTED
            </p>
          </aside>
        </form>
      </div>
    </section>
  );
}
