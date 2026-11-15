
// import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
// import {
//   ArrowLeft,
//   Banknote,
//   Check,
//   CreditCard,
//   Gift,
//   Loader2,
//   Minus,
//   PackageCheck,
//   Plus,
//   Search,
//   ShieldCheck,
//   Sparkles,
//   Tag,
//   Truck,
//   X,
// } from "lucide-react";
// import { STORE_PRODUCTS, ngn } from "../data/catalog";
// import {
//   FREE_SHIPPING_OVER,
//   createOrder,
//   isEmail,
//   makeReference,
//   payWithPaystack,
//   priceCart,
//   validateDiscountCode,
//   verifyPaystackPayment,
//   type Order,
// } from "../lib/api";
// import { Eyebrow, type Go } from "../components/ui";

// const STATES = [
//   "Abia","Adamawa","Akwa Ibom","Anambra","Bauchi","Bayelsa","Benue","Borno","Cross River","Delta","Ebonyi","Edo","Ekiti","Enugu","FCT Abuja","Gombe","Imo","Jigawa","Kaduna","Kano","Katsina","Kebbi","Kogi","Kwara","Lagos","Nasarawa","Niger","Ogun","Ondo","Osun","Oyo","Plateau","Rivers","Sokoto","Taraba","Yobe","Zamfara",
// ];

// const STORAGE_KEY = "softEditPreorderCart";

// type Line = { id: number; quantity: number };

// const field =
//   "min-h-14 w-full border border-[#D7C7D4] bg-[#F7F2EA] px-5 text-sm text-[#5A4037] outline-none transition-all duration-300 placeholder:text-[#98877D] focus:border-[#4B165C] focus:ring-2 focus:ring-[#4B165C]/10";

// export default function PreOrderPage({ go }: { go: Go }) {
//   /* ---------- cart (persisted so a refresh never loses it) ---------- */
//   const [lines, setLines] = useState<Line[]>(() => {
//     try {
//       const raw = window.localStorage.getItem(STORAGE_KEY);
//       return raw ? (JSON.parse(raw) as Line[]) : [];
//     } catch {
//       return [];
//     }
//   });

//   useEffect(() => {
//     try {
//       window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
//     } catch {
//       /* ignore */
//     }
//   }, [lines]);

//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
//   }, []);

//   /* ---------- browsing ---------- */
//   const [query, setQuery] = useState("");
//   const [category, setCategory] = useState("All");
//   const [visible, setVisible] = useState(12);

//   const categories = useMemo(
//     () => ["All", ...Array.from(new Set(STORE_PRODUCTS.map((p) => p.category)))],
//     [],
//   );

//   const results = useMemo(() => {
//     const term = query.trim().toLowerCase();
//     return STORE_PRODUCTS.filter((p) => {
//       if (category !== "All" && p.category !== category) return false;
//       if (!term) return true;
//       return `${p.name} ${p.category}`.toLowerCase().includes(term);
//     });
//   }, [query, category]);

//   useEffect(() => setVisible(12), [query, category]);

//   /* ---------- cart helpers ---------- */
//   const qtyOf = (id: number) => lines.find((l) => l.id === id)?.quantity ?? 0;

//   function change(id: number, delta: number) {
//     setLines((cur) => {
//       const existing = cur.find((l) => l.id === id);
//       if (!existing) return delta > 0 ? [...cur, { id, quantity: delta }] : cur;
//       return cur
//         .map((l) => (l.id === id ? { ...l, quantity: l.quantity + delta } : l))
//         .filter((l) => l.quantity > 0);
//     });
//   }

//   const items = useMemo(
//     () =>
//       lines
//         .map((l) => {
//           const product = STORE_PRODUCTS.find((p) => p.id === l.id);
//           return product ? { product, quantity: l.quantity } : null;
//         })
//         .filter((x): x is { product: (typeof STORE_PRODUCTS)[number]; quantity: number } => x !== null),
//     [lines],
//   );

//   const itemCount = items.reduce((n, i) => n + i.quantity, 0);

//   /* ---------- discount ---------- */
//   const [codeInput, setCodeInput] = useState(() => {
//     try {
//       return window.localStorage.getItem("softEditDiscountCode") ?? "";
//     } catch {
//       return "";
//     }
//   });
//   const [appliedCode, setAppliedCode] = useState("");
//   const [codeMsg, setCodeMsg] = useState("");

//   const totals = priceCart(items, !!appliedCode);

//   async function applyCode() {
//     setCodeMsg("");
//     if (!codeInput.trim()) return;
//     const ok = await validateDiscountCode(codeInput);
//     if (ok) {
//       setAppliedCode(codeInput.trim().toUpperCase());
//       setCodeMsg("Code applied. Lovely.");
//     } else {
//       setAppliedCode("");
//       setCodeMsg("That code isn't valid or has already been used.");
//     }
//   }

//   /* ---------- customer + payment ---------- */
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     address: "",
//     city: "",
//     state: "Lagos",
//     note: "",
//   });
//   const [method, setMethod] = useState<"paystack" | "transfer">("paystack");
//   const [agree, setAgree] = useState(false);
//   const [busy, setBusy] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState<null | { reference: string; total: number; confirmed: boolean }>(null);

//   const set =
//     (k: keyof typeof form) =>
//     (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
//       setForm((f) => ({ ...f, [k]: e.target.value }));

//   async function placePreOrder(e: FormEvent) {
//     e.preventDefault();
//     setError("");

//     if (items.length === 0) return setError("Please add at least one product to your pre-order.");
//     if (!form.name.trim()) return setError("Please enter your full name.");
//     if (!isEmail(form.email)) return setError("Please enter a valid email address.");
//     if (form.phone.replace(/\D/g, "").length < 10) return setError("Please enter a valid phone number.");
//     if (!form.address.trim() || !form.city.trim()) return setError("Please enter your delivery address and city.");
//     if (!agree) return setError("Please confirm you understand how pre-orders work.");

//     setBusy(true);
//     try {
//       const reference = makeReference().replace(/^SE-/, "PRE-");
//       const address = form.note.trim()
//         ? `${form.address.trim()} (Note: ${form.note.trim()})`
//         : form.address.trim();

//       const order: Order = {
//         reference,
//         order_type: "preorder",
//         customer_name: form.name.trim(),
//         email: form.email.trim().toLowerCase(),
//         phone: form.phone.trim(),
//         address,
//         city: form.city.trim(),
//         state: form.state,
//         items: items.map((i) => ({
//           id: i.product.id,
//           name: i.product.name,
//           price: i.product.price,
//           quantity: i.quantity,
//           image: i.product.image,
//         })),
//         subtotal: totals.subtotal,
//         discount: totals.discount,
//         shipping: totals.shipping,
//         total: totals.total,
//         method,
//         status: method === "transfer" ? "awaiting_transfer" : "pending",
//         discount_code: appliedCode || null,
//       };

//       await createOrder(order);

//       const clearCart = () => {
//         setLines([]);
//         try {
//           window.localStorage.removeItem(STORAGE_KEY);
//         } catch {
//           /* ignore */
//         }
//       };

//       if (method === "transfer") {
//         clearCart();
//         go("/transfer");
//         return;
//       }

//       const paid = await payWithPaystack({
//         email: order.email,
//         total: order.total,
//         reference,
//         name: order.customer_name,
//         phone: order.phone,
//       });

//       if (!paid) {
//         setError("Payment was not completed. Your pre-order is saved, so you can try again whenever you're ready.");
//         return;
//       }

//       const confirmed = await verifyPaystackPayment(paid.reference);
//       clearCart();
//       setSuccess({ reference, total: order.total, confirmed });
//     } catch (err) {
//       setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
//     } finally {
//       setBusy(false);
//     }
//   }

//   /* ================= SUCCESS ================= */
//   if (success) {
//     return (
//       <section className="bg-[#FBF7F0] px-5 pb-28 pt-44 text-center sm:pt-52">
//         <div className="mx-auto max-w-xl">
//           <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#B99A62] text-[#4B165C]">
//             <Check size={34} />
//           </div>
//           <Eyebrow>
//             <span className="mx-auto">PRE-ORDER RESERVED</span>
//           </Eyebrow>
//           <h1 className="mt-5 font-serif text-5xl italic leading-tight text-[#4B165C]">It's yours, beautifully.</h1>
//           <p className="mx-auto mt-5 max-w-md text-sm leading-8 text-[#7A685E]">
//             {success.confirmed
//               ? "Your payment is confirmed and your pieces are reserved. We'll be in touch as soon as they are ready to ship."
//               : "We've received your payment and we're confirming it now. Your pieces are reserved and you'll hear from us shortly."}
//           </p>
//           <div className="mx-auto mt-8 inline-block border border-dashed border-[#4B165C] px-8 py-4">
//             <p className="text-[10px] tracking-[0.2em] text-[#7D8768]">PRE-ORDER REFERENCE</p>
//             <p className="mt-1 font-mono text-lg tracking-widest text-[#4B165C]">{success.reference}</p>
//             <p className="mt-1 text-sm text-[#5A4037]">{ngn(success.total)}</p>
//           </div>
//           <div className="mt-10 flex flex-wrap justify-center gap-3">
//             <button type="button" onClick={() => go("/")} className="bg-[#4B165C] px-9 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition-all hover:bg-[#351043]">
//               BACK TO THE STORE
//             </button>
//             <button type="button" onClick={() => go("/account")} className="border border-[#4B165C] px-9 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition-all hover:bg-[#4B165C] hover:text-white">
//               TRACK MY ORDER
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   const promises = [
//     { icon: PackageCheck, title: "Reserved for you", text: "Your pieces are set aside the moment you pay." },
//     { icon: Gift, title: "Carefully prepared", text: "Packed with care and sent as soon as stock lands." },
//     { icon: Truck, title: "Delivered to your door", text: `Free delivery on orders over ${ngn(FREE_SHIPPING_OVER)}.` },
//     { icon: ShieldCheck, title: "Secure payment", text: "Paystack or direct bank transfer, your choice." },
//   ];

//   return (
//     <div className="bg-[#FBF7F0]">
//       {/* ================= HERO ================= */}
//       <section className="relative isolate overflow-hidden bg-[#2D1038] px-5 pb-16 pt-36 text-center sm:px-10 sm:pb-24 sm:pt-48">
//         <div aria-hidden="true" className="pointer-events-none absolute -right-32 -top-24 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/25" />
//         <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/15" />
//         <div className="mx-auto max-w-3xl">
//           <button
//             type="button"
//             onClick={() => go("/")}
//             className="mb-8 inline-flex items-center gap-2 text-[10px] tracking-[0.16em] text-[#E8D2A7] transition-colors hover:text-white"
//           >
//             <ArrowLeft size={14} /> BACK TO THE STORE
//           </button>
//           <div className="flex items-center justify-center gap-3">
//             <span className="h-px w-9 bg-[#B99A62]" />
//             <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#E8D2A7]">Limited pieces · Reserve yours</p>
//             <span className="h-px w-9 bg-[#B99A62]" />
//           </div>
//           <h1 className="mt-6 font-serif text-5xl leading-[1.08] tracking-[-0.04em] text-[#F7F2EA] sm:text-6xl lg:text-7xl">
//             Reserve it <em className="text-[#E8D2A7]">before it's gone.</em>
//           </h1>
//           <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/80 sm:text-base">
//             Our most-loved pieces are made in small batches. Pre-order today, pay securely, and your pieces are set aside
//             for you and delivered the moment they are ready.
//           </p>
//           <a
//             href="#browse"
//             className="group mt-9 inline-flex items-center gap-5 border border-[#F7F2EA] bg-[#F7F2EA] px-7 py-4 text-[10px] font-semibold tracking-[0.18em] text-[#4B165C] transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#32103D]"
//           >
//             CHOOSE YOUR PIECES <Sparkles size={16} />
//           </a>
//         </div>
//       </section>

//       {/* ================= PROMISES ================= */}
//       <section className="border-b border-[#E6D9CA] bg-[#FBF7F0]">
//         <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">
//           {promises.map((p, i) => (
//             <div
//               key={p.title}
//               className={`px-5 py-8 sm:px-8 ${i % 2 === 0 ? "border-r border-[#E6D9CA]" : ""} ${i < 2 ? "border-b border-[#E6D9CA] lg:border-b-0" : ""} ${i !== 3 ? "lg:border-r lg:border-[#E6D9CA]" : ""}`}
//             >
//               <p.icon size={22} strokeWidth={1.3} className="text-[#4B165C]" />
//               <p className="mt-3 font-serif text-lg leading-tight text-[#4B165C]">{p.title}</p>
//               <p className="mt-1 text-xs leading-5 text-[#89766A]">{p.text}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ================= BROWSE + CHECKOUT ================= */}
//       <section id="browse" className="scroll-mt-28 px-5 py-16 sm:px-10 sm:py-24">
//         <div className="mx-auto max-w-[1400px]">
//           <Eyebrow>STEP 1 · CHOOSE</Eyebrow>
//           <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-[#4B165C] sm:text-5xl">
//             Find your <em className="text-[#9A8061]">pieces.</em>
//           </h2>

//           {/* search + filters */}
//           <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center">
//             <div className="relative lg:w-[380px]">
//               <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8061]" />
//               <input
//                 type="search"
//                 value={query}
//                 onChange={(e) => setQuery(e.target.value)}
//                 placeholder="Search all products..."
//                 aria-label="Search products"
//                 className="min-h-14 w-full border border-[#D7C7D4] bg-[#F7F2EA] pl-11 pr-10 text-sm text-[#5A4037] outline-none placeholder:text-[#98877D] focus:border-[#4B165C]"
//               />
//               {query && (
//                 <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9A8061] hover:text-[#4B165C]">
//                   <X size={16} />
//                 </button>
//               )}
//             </div>

//             <div className="flex flex-wrap gap-2">
//               {categories.map((c) => (
//                 <button
//                   key={c}
//                   type="button"
//                   onClick={() => setCategory(c)}
//                   aria-pressed={category === c}
//                   className={`rounded-full border px-4 py-2.5 text-[10px] transition-all duration-300 sm:text-xs ${
//                     category === c
//                       ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]"
//                       : "border-[#CDBBAA] bg-[#F7F2EA]/60 text-[#6D594D] hover:border-[#4B165C] hover:text-[#4B165C]"
//                   }`}
//                 >
//                   {c}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mt-10 grid gap-12 lg:grid-cols-[1.4fr_0.8fr] lg:gap-14">
//             {/* product grid */}
//             <div>
//               <p className="text-xs text-[#89766A]">
//                 {results.length} {results.length === 1 ? "piece" : "pieces"}
//               </p>

//               {results.length === 0 ? (
//                 <p className="py-16 text-center font-serif text-2xl italic text-[#9A8061]">
//                   We couldn't find a match. Try another name or category.
//                 </p>
//               ) : (
//                 <div className="mt-5 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 xl:grid-cols-3">
//                   {results.slice(0, visible).map((p) => {
//                     const q = qtyOf(p.id);
//                     return (
//                       <article key={p.id} className="group min-w-0">
//                         <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DCD1]">
//                           <img
//                             src={p.image}
//                             alt={p.name}
//                             loading="lazy"
//                             className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
//                           />
//                           <span className="absolute left-2 top-2 bg-[#F7F2EA]/95 px-2.5 py-1.5 text-[8px] font-medium tracking-[0.12em] text-[#4B165C] sm:left-3 sm:top-3">
//                             {p.stock > 0 ? `ONLY ${p.stock} LEFT` : "PRE-ORDER"}
//                           </span>
//                           {q > 0 && (
//                             <span className="absolute right-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-[#4B165C] px-2 text-[11px] font-semibold text-white sm:right-3 sm:top-3">
//                               {q}
//                             </span>
//                           )}
//                         </div>
//                         <div className="pt-3">
//                           <p className="text-[8px] tracking-[0.12em] text-[#89766A] sm:text-[9px]">{p.category.toUpperCase()}</p>
//                           <h3 className="mt-1 font-serif text-base leading-snug text-[#4B165C] sm:text-lg">{p.name}</h3>
//                           <p className="mt-1 text-sm font-medium text-[#5A4037]">{ngn(p.price)}</p>

//                           {q === 0 ? (
//                             <button
//                               type="button"
//                               onClick={() => change(p.id, 1)}
//                               className="mt-3 flex w-full items-center justify-center gap-2 border border-[#4B165C] px-3 py-3 text-[9px] font-semibold tracking-[0.12em] text-[#4B165C] transition-all duration-300 hover:bg-[#4B165C] hover:text-white sm:text-[10px]"
//                             >
//                               PRE-ORDER <Plus size={14} />
//                             </button>
//                           ) : (
//                             <div className="mt-3 flex items-center justify-between border border-[#4B165C] bg-[#F7F2EA]">
//                               <button type="button" aria-label={`Decrease ${p.name}`} onClick={() => change(p.id, -1)} className="flex h-11 w-11 items-center justify-center text-[#4B165C] hover:bg-[#EFE6DC]">
//                                 <Minus size={14} />
//                               </button>
//                               <span className="text-sm font-medium text-[#4B165C]">{q}</span>
//                               <button type="button" aria-label={`Increase ${p.name}`} onClick={() => change(p.id, 1)} className="flex h-11 w-11 items-center justify-center text-[#4B165C] hover:bg-[#EFE6DC]">
//                                 <Plus size={14} />
//                               </button>
//                             </div>
//                           )}
//                         </div>
//                       </article>
//                     );
//                   })}
//                 </div>
//               )}

//               {visible < results.length && (
//                 <div className="mt-12 text-center">
//                   <button
//                     type="button"
//                     onClick={() => setVisible((v) => v + 12)}
//                     className="border border-[#4B165C] px-9 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition-all hover:bg-[#4B165C] hover:text-white"
//                   >
//                     SHOW MORE
//                   </button>
//                 </div>
//               )}
//             </div>

//             {/* checkout column */}
//             <form id="preorder-form" onSubmit={placePreOrder} noValidate className="h-fit lg:sticky lg:top-32">
//               <div className="border border-[#E6D9CA] bg-[#F7F2EA] p-6 sm:p-8">
//                 <Eyebrow>STEP 2 · YOUR PRE-ORDER</Eyebrow>
//                 <h2 className="mt-3 font-serif text-3xl text-[#4B165C]">
//                   Your list <span className="font-sans text-base italic text-[#9A8061]">({itemCount})</span>
//                 </h2>

//                 {items.length === 0 ? (
//                   <p className="mt-6 text-sm leading-7 text-[#7A685E]">
//                     Nothing here yet. Add the pieces you love and they'll appear here with your total.
//                   </p>
//                 ) : (
//                   <div className="mt-6 space-y-5">
//                     {items.map(({ product, quantity }) => (
//                       <div key={product.id} className="flex gap-4">
//                         <img src={product.image} alt={product.name} className="h-20 w-16 shrink-0 bg-[#EFE6DC] object-cover" />
//                         <div className="min-w-0 flex-1">
//                           <p className="font-serif text-base leading-snug text-[#4B165C]">{product.name}</p>
//                           <p className="mt-1 text-xs text-[#5A4037]">{ngn(product.price * quantity)}</p>
//                           <div className="mt-2 inline-flex items-center border border-[#D8C8B7]">
//                             <button type="button" aria-label="Decrease" onClick={() => change(product.id, -1)} className="flex h-8 w-8 items-center justify-center hover:bg-[#EFE6DC]"><Minus size={12} /></button>
//                             <span className="min-w-7 text-center text-xs">{quantity}</span>
//                             <button type="button" aria-label="Increase" onClick={() => change(product.id, 1)} className="flex h-8 w-8 items-center justify-center hover:bg-[#EFE6DC]"><Plus size={12} /></button>
//                           </div>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}

//                 {/* discount */}
//                 <div className="mt-7 border-t border-[#E6D9CA] pt-6">
//                   <div className="flex gap-2">
//                     <div className="relative flex-1">
//                       <Tag size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#9A8061]" />
//                       <input
//                         value={codeInput}
//                         onChange={(e) => setCodeInput(e.target.value)}
//                         placeholder="Discount code"
//                         aria-label="Discount code"
//                         className="min-h-12 w-full border border-[#D7C7D4] bg-white/60 pl-10 pr-3 text-xs uppercase tracking-wider outline-none focus:border-[#4B165C]"
//                       />
//                     </div>
//                     <button type="button" onClick={() => void applyCode()} className="border border-[#4B165C] px-5 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] hover:bg-[#4B165C] hover:text-white">
//                       APPLY
//                     </button>
//                   </div>
//                   {codeMsg && <p className={`mt-2 text-xs ${appliedCode ? "text-[#7D8768]" : "text-[#9A3B3B]"}`}>{codeMsg}</p>}
//                 </div>

//                 <dl className="mt-6 space-y-3 border-t border-[#E6D9CA] pt-6 text-sm text-[#5A4037]">
//                   <div className="flex justify-between"><dt>Subtotal</dt><dd>{ngn(totals.subtotal)}</dd></div>
//                   {totals.discount > 0 && <div className="flex justify-between text-[#7D8768]"><dt>Discount</dt><dd>-{ngn(totals.discount)}</dd></div>}
//                   <div className="flex justify-between"><dt>Delivery</dt><dd>{totals.shipping === 0 ? "Free" : ngn(totals.shipping)}</dd></div>
//                   <div className="flex items-baseline justify-between border-t border-[#E6D9CA] pt-4">
//                     <dt className="font-serif text-lg text-[#4B165C]">Total</dt>
//                     <dd className="font-serif text-3xl text-[#4B165C]">{ngn(totals.total)}</dd>
//                   </div>
//                 </dl>
//                 <p className="mt-2 text-[10px] text-[#89766A]">Free delivery on orders over {ngn(FREE_SHIPPING_OVER)}.</p>
//               </div>

//               {/* delivery */}
//               <div className="mt-8">
//                 <Eyebrow>STEP 3 · DELIVERY</Eyebrow>
//                 <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
//                   <input className={`${field} sm:col-span-2 lg:col-span-1 xl:col-span-2`} placeholder="Full name" autoComplete="name" value={form.name} onChange={set("name")} />
//                   <input className={field} type="email" placeholder="Email address" autoComplete="email" value={form.email} onChange={set("email")} />
//                   <input className={field} type="tel" placeholder="Phone number" autoComplete="tel" value={form.phone} onChange={set("phone")} />
//                   <input className={`${field} sm:col-span-2 lg:col-span-1 xl:col-span-2`} placeholder="Delivery address" autoComplete="street-address" value={form.address} onChange={set("address")} />
//                   <input className={field} placeholder="City / Town" autoComplete="address-level2" value={form.city} onChange={set("city")} />
//                   <select className={field} value={form.state} onChange={set("state")} aria-label="State">
//                     {STATES.map((s) => (
//                       <option key={s}>{s}</option>
//                     ))}
//                   </select>
//                   <textarea
//                     className={`${field} min-h-24 py-4 sm:col-span-2 lg:col-span-1 xl:col-span-2`}
//                     placeholder="Delivery note or gift message (optional)"
//                     value={form.note}
//                     onChange={set("note")}
//                     maxLength={240}
//                   />
//                 </div>
//               </div>

//               {/* payment */}
//               <div className="mt-8">
//                 <Eyebrow>STEP 4 · PAYMENT</Eyebrow>
//                 <div className="mt-5 grid gap-3">
//                   {[
//                     { id: "paystack" as const, icon: CreditCard, title: "Pay online", sub: "Card, bank, USSD and more, securely through Paystack." },
//                     { id: "transfer" as const, icon: Banknote, title: "Direct bank transfer", sub: "We'll show you our account details next. Your pieces are reserved once we confirm it." },
//                   ].map((m) => (
//                     <label
//                       key={m.id}
//                       className={`flex cursor-pointer items-start gap-4 border px-5 py-5 transition-all duration-300 ${
//                         method === m.id ? "border-[#4B165C] bg-[#F7F2EA] shadow-[0_10px_30px_rgba(75,22,92,0.08)]" : "border-[#D8C8B7] hover:border-[#B99A62]"
//                       }`}
//                     >
//                       <input type="radio" name="method" checked={method === m.id} onChange={() => setMethod(m.id)} className="mt-1 accent-[#4B165C]" />
//                       <m.icon size={22} strokeWidth={1.4} className="mt-0.5 shrink-0 text-[#4B165C]" />
//                       <span>
//                         <span className="block font-serif text-lg text-[#4B165C]">{m.title}</span>
//                         <span className="mt-1 block text-xs leading-6 text-[#7A685E]">{m.sub}</span>
//                       </span>
//                     </label>
//                   ))}
//                 </div>
//               </div>

//               {/* terms */}
//               <label className="mt-7 flex cursor-pointer items-start gap-3 text-xs leading-6 text-[#7A685E]">
//                 <input type="checkbox" checked={agree} onChange={(e) => setAgree(e.target.checked)} className="mt-1 h-4 w-4 shrink-0 accent-[#4B165C]" />
//                 <span>
//                   I understand these pieces are made available on pre-order, so they ship once stock is ready, and
//                   I've reviewed the{" "}
//                   <a href="/delivery-returns" className="text-[#4B165C] underline underline-offset-4">delivery & returns policy</a>.
//                 </span>
//               </label>

//               {error && <p role="alert" className="mt-5 text-xs leading-6 text-[#9A3B3B]">{error}</p>}

//               <button
//                 type="submit"
//                 disabled={busy || items.length === 0}
//                 className="mt-6 flex min-h-14 w-full items-center justify-center gap-3 bg-[#4B165C] px-5 text-[10px] font-semibold tracking-[0.16em] text-white transition-all duration-500 hover:-translate-y-0.5 hover:bg-[#351043] disabled:cursor-not-allowed disabled:opacity-60"
//               >
//                 {busy && <Loader2 size={16} className="animate-spin" />}
//                 {method === "paystack" ? `RESERVE & PAY ${ngn(totals.total)}` : "PLACE PRE-ORDER & SEE BANK DETAILS"}
//               </button>
//               <p className="mt-4 flex items-center justify-center gap-2 text-[10px] tracking-[0.1em] text-[#7D8768]">
//                 <ShieldCheck size={14} /> SECURE & ENCRYPTED
//               </p>
//             </form>
//           </div>
//         </div>
//       </section>

//       {/* ================= MOBILE STICKY BAR ================= */}
//       {itemCount > 0 && (
//         <div className="fixed inset-x-0 bottom-0 z-[900] flex items-center justify-between gap-4 border-t border-[#B99A62]/40 bg-[#30232F]/[0.98] px-5 py-3 backdrop-blur-xl lg:hidden">
//           <div>
//             <p className="text-[9px] tracking-[0.16em] text-[#D9BE8B]">{itemCount} {itemCount === 1 ? "PIECE" : "PIECES"}</p>
//             <p className="font-serif text-xl text-[#F7F2EA]">{ngn(totals.total)}</p>
//           </div>
//           <a
//             href="#preorder-form"
//             className="bg-[#F7F2EA] px-6 py-3.5 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition-colors hover:bg-[#B99A62]"
//           >
//             CONTINUE
//           </a>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Banknote,
  Check,
  ChevronDown,
  CreditCard,
  Gift,
  Loader2,
  Minus,
  PackageCheck,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Tag,
  Truck,
  X,
} from "lucide-react";

import { STORE_PRODUCTS, ngn } from "../data/catalog";

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

const STATES = [
  "Abia", "Adamawa", "Akwa Ibom", "Anambra", "Bauchi",
  "Bayelsa", "Benue", "Borno", "Cross River", "Delta",
  "Ebonyi", "Edo", "Ekiti", "Enugu", "FCT Abuja",
  "Gombe", "Imo", "Jigawa", "Kaduna", "Kano",
  "Katsina", "Kebbi", "Kogi", "Kwara", "Lagos",
  "Nasarawa", "Niger", "Ogun", "Ondo", "Osun",
  "Oyo", "Plateau", "Rivers", "Sokoto", "Taraba",
  "Yobe", "Zamfara",
];

const STORAGE_KEY = "softEditPreorderCart";

type Line = {
  id: number;
  quantity: number;
};

type Stage = "browse" | "checkout";

const field =
  "min-h-[54px] w-full border border-[#D7C7D4] bg-[#F7F2EA] px-4 text-sm text-[#5A4037] outline-none transition-all placeholder:text-[#98877D] focus:border-[#4B165C] focus:ring-2 focus:ring-[#4B165C]/10";

export default function PreOrderPage({ go }: { go: Go }) {

  /* ================================================
     CART
  ================================================ */

  const [lines, setLines] = useState<Line[]>(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      return raw ? (JSON.parse(raw) as Line[]) : [];
    } catch {
      return [];
    }
  });

  const [stage, setStage] = useState<Stage>("browse");

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      // Ignore storage errors.
    }
  }, [lines]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant" as ScrollBehavior,
    });
  }, [stage]);

  /* ================================================
     PRODUCT BROWSING
  ================================================ */

  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [visible, setVisible] = useState(12);

  const categories = useMemo(
    () => [
      "All",
      ...Array.from(
        new Set(STORE_PRODUCTS.map((p) => p.category))
      ),
    ],
    []
  );

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();

    return STORE_PRODUCTS.filter((p) => {
      if (category !== "All" && p.category !== category) {
        return false;
      }

      if (!term) return true;

      return `${p.name} ${p.category}`
        .toLowerCase()
        .includes(term);
    });
  }, [query, category]);

  useEffect(() => {
    setVisible(12);
  }, [query, category]);

  /* ================================================
     CART HELPERS
  ================================================ */

  const qtyOf = (id: number) =>
    lines.find((l) => l.id === id)?.quantity ?? 0;

  function change(id: number, delta: number) {
    setLines((current) => {
      const existing = current.find((l) => l.id === id);

      if (!existing) {
        return delta > 0
          ? [...current, { id, quantity: delta }]
          : current;
      }

      return current
        .map((l) =>
          l.id === id
            ? { ...l, quantity: l.quantity + delta }
            : l
        )
        .filter((l) => l.quantity > 0);
    });
  }

  const items = useMemo(
    () =>
      lines
        .map((l) => {
          const product = STORE_PRODUCTS.find(
            (p) => p.id === l.id
          );

          return product
            ? { product, quantity: l.quantity }
            : null;
        })
        .filter(
          (
            x
          ): x is {
            product: (typeof STORE_PRODUCTS)[number];
            quantity: number;
          } => x !== null
        ),
    [lines]
  );

  const itemCount = items.reduce(
    (total, item) => total + item.quantity,
    0
  );

  /* ================================================
     DISCOUNT
  ================================================ */

  const [codeInput, setCodeInput] = useState(() => {
    try {
      return (
        window.localStorage.getItem("softEditDiscountCode") ?? ""
      );
    } catch {
      return "";
    }
  });

  const [appliedCode, setAppliedCode] = useState("");
  const [codeMsg, setCodeMsg] = useState("");
  const [applyingCode, setApplyingCode] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);

  const totals = priceCart(items, !!appliedCode);

  async function applyCode() {
    if (!codeInput.trim()) {
      setCodeMsg("Please enter a discount code.");
      return;
    }

    setApplyingCode(true);
    setCodeMsg("");

    try {
      const ok = await validateDiscountCode(codeInput);

      if (ok) {
        const normalized = codeInput.trim().toUpperCase();

        setAppliedCode(normalized);
        setCodeInput(normalized);
        setCodeMsg("Your discount has been applied. Lovely!");

        try {
          window.localStorage.setItem(
            "softEditDiscountCode",
            normalized
          );
        } catch {
          // Ignore storage errors.
        }
      } else {
        setAppliedCode("");
        setCodeMsg(
          "This code isn't valid or has already been used."
        );
      }
    } catch {
      setCodeMsg("Unable to validate this code. Please try again.");
    } finally {
      setApplyingCode(false);
    }
  }

  /* ================================================
     CUSTOMER DETAILS
  ================================================ */

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "Lagos",
    note: "",
  });

  const [method, setMethod] = useState<
    "paystack" | "transfer"
  >("paystack");

  const [agree, setAgree] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const [success, setSuccess] = useState<null | {
    reference: string;
    total: number;
    confirmed: boolean;
  }>(null);

  const set =
    (key: keyof typeof form) =>
    (
      e: ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) => {
      setForm((current) => ({
        ...current,
        [key]: e.target.value,
      }));
    };

  /* ================================================
     NAVIGATION
  ================================================ */

  function continueToCheckout() {
    if (items.length === 0) return;

    setError("");
    setStage("checkout");
  }

  function returnToBrowsing() {
    setError("");
    setStage("browse");
  }

  /* ================================================
     PLACE PRE-ORDER
  ================================================ */

  async function placePreOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (items.length === 0) {
      return setError(
        "Please add at least one product to your pre-order."
      );
    }

    if (!form.name.trim()) {
      return setError("Please enter your full name.");
    }

    if (!isEmail(form.email)) {
      return setError("Please enter a valid email address.");
    }

    if (form.phone.replace(/\D/g, "").length < 10) {
      return setError("Please enter a valid phone number.");
    }

    if (!form.address.trim() || !form.city.trim()) {
      return setError(
        "Please enter your delivery address and city."
      );
    }

    if (!agree) {
      return setError(
        "Please confirm that you understand how pre-orders work."
      );
    }

    setBusy(true);

    try {
      const reference = makeReference().replace(/^SE-/, "PRE-");

      const address = form.note.trim()
        ? `${form.address.trim()} (Note: ${form.note.trim()})`
        : form.address.trim();

      const order: Order = {
        reference,
        order_type: "preorder",
        customer_name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        phone: form.phone.trim(),
        address,
        city: form.city.trim(),
        state: form.state,

        items: items.map((item) => ({
          id: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
          image: item.product.image,
        })),

        subtotal: totals.subtotal,
        discount: totals.discount,
        shipping: totals.shipping,
        total: totals.total,
        method,

        status:
          method === "transfer"
            ? "awaiting_transfer"
            : "pending",

        discount_code: appliedCode || null,
      };

      await createOrder(order);

      const clearCart = () => {
        setLines([]);

        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          // Ignore storage errors.
        }
      };

      if (method === "transfer") {
        clearCart();
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
        setError(
          "Payment was not completed. Your pre-order has been saved. You can try again whenever you're ready."
        );
        return;
      }

      const confirmed = await verifyPaystackPayment(
        paid.reference
      );

      clearCart();

      setSuccess({
        reference,
        total: order.total,
        confirmed,
      });

    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setBusy(false);
    }
  }

  /* ================================================
     SUCCESS SCREEN
  ================================================ */

  if (success) {
    return (
      <section className="min-h-[75vh] bg-[#FBF7F0] px-5 pb-28 pt-36 text-center sm:pt-48">

        <div className="mx-auto max-w-xl">

          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#B99A62] text-[#4B165C]">
            <Check size={34} />
          </div>

          <Eyebrow>
            <span className="mx-auto">
              PRE-ORDER RESERVED
            </span>
          </Eyebrow>

          <h1 className="mt-5 font-serif text-5xl italic leading-tight text-[#4B165C]">
            It's yours, beautifully.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-8 text-[#7A685E]">
            {success.confirmed
              ? "Your payment is confirmed and your pieces are reserved. We'll be in touch as soon as they are ready to ship."
              : "We've received your payment and we're confirming it now. Your pieces are reserved and you'll hear from us shortly."}
          </p>

          <div className="mx-auto mt-8 inline-block border border-dashed border-[#4B165C] px-8 py-4">

            <p className="text-[10px] tracking-[0.2em] text-[#7D8768]">
              PRE-ORDER REFERENCE
            </p>

            <p className="mt-1 font-mono text-lg tracking-widest text-[#4B165C]">
              {success.reference}
            </p>

            <p className="mt-1 text-sm text-[#5A4037]">
              {ngn(success.total)}
            </p>

          </div>

          <div className="mt-10 flex flex-wrap justify-center gap-3">

            <button
              type="button"
              onClick={() => go("/")}
              className="bg-[#4B165C] px-9 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition-all hover:bg-[#351043]"
            >
              BACK TO THE STORE
            </button>

            <button
              type="button"
              onClick={() => go("/account")}
              className="border border-[#4B165C] px-9 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition-all hover:bg-[#4B165C] hover:text-white"
            >
              TRACK MY ORDER
            </button>

          </div>

        </div>
      </section>
    );
  }

  /* ================================================
     PROMISES
  ================================================ */

  const promises = [
    {
      icon: PackageCheck,
      title: "Reserved for you",
      text: "Your pieces are set aside when you pay.",
    },
    {
      icon: Gift,
      title: "Carefully prepared",
      text: "Packed with care and sent when ready.",
    },
    {
      icon: Truck,
      title: "Delivered to your door",
      text: `Free delivery over ${ngn(FREE_SHIPPING_OVER)}.`,
    },
    {
      icon: ShieldCheck,
      title: "Secure payment",
      text: "Pay securely through Paystack.",
    },
  ];

  /* ================================================
     MAIN PAGE
  ================================================ */

  return (
    <div className="min-h-screen bg-[#FBF7F0]">

      {/* ==========================================
          HERO
      ========================================== */}

      <section className="relative isolate overflow-hidden bg-[#2D1038] px-5 pb-16 pt-36 text-center sm:px-10 sm:pb-20 sm:pt-48">

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-32 -top-24 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/25"
        />

        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-40 -left-24 -z-10 h-96 w-96 rounded-full border border-[#B99A62]/15"
        />

        <div className="mx-auto max-w-3xl">

          <button
            type="button"
            onClick={() => go("/")}
            className="mb-8 inline-flex items-center gap-2 text-[10px] tracking-[0.16em] text-[#E8D2A7] transition-colors hover:text-white"
          >
            <ArrowLeft size={14} />
            BACK TO THE STORE
          </button>

          <div className="flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-[#B99A62]" />

            <p className="text-[10px] font-medium uppercase tracking-[0.26em] text-[#E8D2A7]">
              Limited pieces · Reserve yours
            </p>

            <span className="h-px w-9 bg-[#B99A62]" />
          </div>

          <h1 className="mt-6 font-serif text-5xl leading-[1.08] tracking-[-0.04em] text-[#F7F2EA] sm:text-6xl lg:text-7xl">
            Reserve it{" "}
            <em className="text-[#E8D2A7]">
              before it's gone.
            </em>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-sm leading-8 text-white/80 sm:text-base">
            Our most-loved pieces are made in small batches.
            Pre-order today, pay securely, and have your pieces
            reserved for you until they're ready.
          </p>

          <a
            href="#browse"
            className="group mt-9 inline-flex items-center gap-5 border border-[#F7F2EA] bg-[#F7F2EA] px-7 py-4 text-[10px] font-semibold tracking-[0.18em] text-[#4B165C] transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#32103D]"
          >
            CHOOSE YOUR PIECES
            <Sparkles size={16} />
          </a>

        </div>
      </section>

      {/* ==========================================
          BRAND PROMISES
      ========================================== */}

      <section className="border-b border-[#E6D9CA] bg-[#FBF7F0]">

        <div className="mx-auto grid max-w-[1400px] grid-cols-2 lg:grid-cols-4">

          {promises.map((p, i) => (
            <div
              key={p.title}
              className={`px-5 py-7 sm:px-8 ${
                i % 2 === 0 ? "border-r border-[#E6D9CA]" : ""
              } ${
                i < 2 ? "border-b border-[#E6D9CA] lg:border-b-0" : ""
              } ${
                i !== 3 ? "lg:border-r lg:border-[#E6D9CA]" : ""
              }`}
            >
              <p.icon
                size={22}
                strokeWidth={1.3}
                className="text-[#4B165C]"
              />

              <p className="mt-3 font-serif text-lg leading-tight text-[#4B165C]">
                {p.title}
              </p>

              <p className="mt-1 text-xs leading-5 text-[#89766A]">
                {p.text}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* ==========================================
          STEP 1: PRODUCT BROWSING
      ========================================== */}

      {stage === "browse" && (
        <section
          id="browse"
          className="scroll-mt-24 px-5 py-14 sm:px-10 sm:py-20"
        >

          <div className="mx-auto max-w-[1400px]">

            <Eyebrow>STEP 1 · CHOOSE YOUR PIECES</Eyebrow>

            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-[#4B165C] sm:text-5xl">
              Find your{" "}
              <em className="text-[#9A8061]">pieces.</em>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-7 text-[#89766A]">
              Explore our collection and add the pieces you'd
              love to reserve. You can review everything before
              proceeding to checkout.
            </p>

            {/* SEARCH AND CATEGORY */}

            <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_240px]">

              <div className="relative">

                <Search
                  size={17}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8061]"
                />

                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for a product..."
                  aria-label="Search products"
                  className={`${field} pl-11 pr-11`}
                />

                {query && (
                  <button
                    type="button"
                    aria-label="Clear search"
                    onClick={() => setQuery("")}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8061] hover:text-[#4B165C]"
                  >
                    <X size={17} />
                  </button>
                )}

              </div>

              <div className="relative">

                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  aria-label="Filter by category"
                  className={`${field} appearance-none pr-10`}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c === "All" ? "All categories" : c}
                    </option>
                  ))}
                </select>

                <ChevronDown
                  size={16}
                  className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#9A8061]"
                />

              </div>

            </div>

            {/* PRODUCT COUNT */}

            <div className="mt-7 flex items-center justify-between border-b border-[#E6D9CA] pb-4">

              <p className="text-xs text-[#89766A]">
                Showing {Math.min(visible, results.length)} of{" "}
                {results.length}{" "}
                {results.length === 1 ? "piece" : "pieces"}
              </p>

              {category !== "All" || query ? (
                <button
                  type="button"
                  onClick={() => {
                    setCategory("All");
                    setQuery("");
                  }}
                  className="text-[10px] font-semibold tracking-wider text-[#4B165C] underline underline-offset-4"
                >
                  CLEAR FILTERS
                </button>
              ) : null}

            </div>

            {/* PRODUCTS */}

            {results.length === 0 ? (

              <div className="py-24 text-center">

                <Search
                  size={30}
                  strokeWidth={1}
                  className="mx-auto text-[#B99A62]"
                />

                <h3 className="mt-5 font-serif text-2xl italic text-[#4B165C]">
                  Nothing found just yet.
                </h3>

                <p className="mt-3 text-sm text-[#89766A]">
                  Try another product name or category.
                </p>

              </div>

            ) : (

              <div className="mt-7 grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">

                {results.slice(0, visible).map((p) => {

                  const q = qtyOf(p.id);

                  return (
                    <article
                      key={p.id}
                      className="group min-w-0"
                    >

                      <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DCD1]">

                        <img
                          src={p.image}
                          alt={p.name}
                          loading="lazy"
                          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                        />

                        <span className="absolute left-2 top-2 bg-[#F7F2EA]/95 px-2.5 py-1.5 text-[8px] font-medium tracking-[0.12em] text-[#4B165C] sm:left-3 sm:top-3">
                          {p.stock > 0
                            ? `ONLY ${p.stock} LEFT`
                            : "PRE-ORDER"}
                        </span>

                        {q > 0 && (
                          <span className="absolute right-2 top-2 flex h-7 min-w-7 items-center justify-center rounded-full bg-[#4B165C] px-2 text-[11px] font-semibold text-white sm:right-3 sm:top-3">
                            {q}
                          </span>
                        )}

                      </div>

                      <div className="pt-3">

                        <p className="text-[8px] tracking-[0.12em] text-[#89766A] sm:text-[9px]">
                          {p.category.toUpperCase()}
                        </p>

                        <h3 className="mt-1 font-serif text-base leading-snug text-[#4B165C] sm:text-lg">
                          {p.name}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-[#5A4037]">
                          {ngn(p.price)}
                        </p>

                        {q === 0 ? (

                          <button
                            type="button"
                            onClick={() => change(p.id, 1)}
                            className="mt-3 flex min-h-11 w-full items-center justify-center gap-2 border border-[#4B165C] px-2 py-3 text-[9px] font-semibold tracking-[0.1em] text-[#4B165C] transition-all hover:bg-[#4B165C] hover:text-white sm:text-[10px]"
                          >
                            ADD TO ORDER
                            <Plus size={14} />
                          </button>

                        ) : (

                          <div className="mt-3 flex min-h-11 items-center justify-between border border-[#4B165C] bg-[#F7F2EA]">

                            <button
                              type="button"
                              aria-label={`Decrease ${p.name}`}
                              onClick={() => change(p.id, -1)}
                              className="flex h-11 w-11 items-center justify-center text-[#4B165C] hover:bg-[#EFE6DC]"
                            >
                              <Minus size={14} />
                            </button>

                            <span className="text-sm font-semibold text-[#4B165C]">
                              {q}
                            </span>

                            <button
                              type="button"
                              aria-label={`Increase ${p.name}`}
                              onClick={() => change(p.id, 1)}
                              className="flex h-11 w-11 items-center justify-center text-[#4B165C] hover:bg-[#EFE6DC]"
                            >
                              <Plus size={14} />
                            </button>

                          </div>

                        )}

                      </div>

                    </article>
                  );
                })}

              </div>

            )}

            {/* SHOW MORE */}

            {visible < results.length && (
              <div className="mt-12 text-center">

                <button
                  type="button"
                  onClick={() => setVisible((v) => v + 12)}
                  className="border border-[#4B165C] px-9 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition-all hover:bg-[#4B165C] hover:text-white"
                >
                  SHOW MORE PIECES
                </button>

              </div>
            )}

            {/* EMPTY CART NOTE */}

            {itemCount === 0 && (
              <p className="mt-12 text-center text-xs text-[#89766A]">
                Your selection will appear here as you add pieces.
              </p>
            )}

          </div>
        </section>
      )}

      {/* ==========================================
          STEP 2: SIMPLE CHECKOUT
      ========================================== */}

      {stage === "checkout" && (

        <section className="px-5 py-12 sm:px-10 sm:py-16">

          <div className="mx-auto max-w-4xl">

            {/* BACK TO PRODUCTS */}

            <button
              type="button"
              onClick={returnToBrowsing}
              className="mb-8 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] transition-colors hover:text-[#9A8061]"
            >
              <ArrowLeft size={15} />
              BACK TO MY SELECTION
            </button>

            <Eyebrow>STEP 2 · COMPLETE YOUR ORDER</Eyebrow>

            <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em] text-[#4B165C] sm:text-5xl">
              Almost{" "}
              <em className="text-[#9A8061]">yours.</em>
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#89766A]">
              Review your selection, tell us where to deliver,
              and choose how you'd like to pay.
            </p>

            <form
              onSubmit={placePreOrder}
              noValidate
              className="mt-10"
            >

              {/* ORDER SUMMARY */}

              <div className="border border-[#E6D9CA] bg-[#F7F2EA] p-5 sm:p-8">

                <div className="flex items-center justify-between gap-4">

                  <div>
                    <Eyebrow>YOUR SELECTION</Eyebrow>

                    <h3 className="mt-2 font-serif text-2xl text-[#4B165C]">
                      Your pieces ({itemCount})
                    </h3>
                  </div>

                  <button
                    type="button"
                    onClick={returnToBrowsing}
                    className="text-[9px] font-semibold tracking-wider text-[#4B165C] underline underline-offset-4"
                  >
                    EDIT ORDER
                  </button>

                </div>

                {items.length > 0 ? (

                  <div className="mt-6 divide-y divide-[#E6D9CA]">

                    {items.map(({ product, quantity }) => (

                      <div
                        key={product.id}
                        className="flex items-center gap-3 py-4 sm:gap-5"
                      >

                        <img
                          src={product.image}
                          alt={product.name}
                          className="h-[76px] w-[65px] shrink-0 bg-[#EFE6DC] object-cover"
                        />

                        <div className="min-w-0 flex-1">

                          <p className="font-serif text-base leading-snug text-[#4B165C]">
                            {product.name}
                          </p>

                          <p className="mt-1 text-xs text-[#89766A]">
                            {ngn(product.price)} each
                          </p>

                          <div className="mt-2 inline-flex items-center border border-[#D8C8B7]">

                            <button
                              type="button"
                              aria-label={`Decrease ${product.name}`}
                              onClick={() => change(product.id, -1)}
                              className="flex h-8 w-8 items-center justify-center text-[#4B165C] hover:bg-[#EFE6DC]"
                            >
                              <Minus size={12} />
                            </button>

                            <span className="min-w-8 text-center text-xs text-[#4B165C]">
                              {quantity}
                            </span>

                            <button
                              type="button"
                              aria-label={`Increase ${product.name}`}
                              onClick={() => change(product.id, 1)}
                              className="flex h-8 w-8 items-center justify-center text-[#4B165C] hover:bg-[#EFE6DC]"
                            >
                              <Plus size={12} />
                            </button>

                          </div>

                        </div>

                        <p className="shrink-0 text-right text-sm font-medium text-[#5A4037]">
                          {ngn(product.price * quantity)}
                        </p>

                      </div>

                    ))}

                  </div>

                ) : (

                  <p className="py-8 text-sm text-[#89766A]">
                    Your order is empty. Please return to the
                    collection and select a piece.
                  </p>

                )}

                {/* DISCOUNT */}

                <div className="border-t border-[#E6D9CA] pt-5">

                  <button
                    type="button"
                    onClick={() => setShowDiscount((v) => !v)}
                    className="flex w-full items-center justify-between text-xs font-medium text-[#4B165C]"
                  >
                    <span className="flex items-center gap-2">
                      <Tag size={15} />
                      Have a discount code?
                    </span>

                    <ChevronDown
                      size={16}
                      className={`transition-transform ${
                        showDiscount ? "rotate-180" : ""
                      }`}
                    />

                  </button>

                  {showDiscount && (

                    <div className="mt-4">

                      <div className="flex gap-2">

                        <input
                          value={codeInput}
                          onChange={(e) => setCodeInput(e.target.value)}
                          placeholder="Enter discount code"
                          aria-label="Discount code"
                          className="min-h-12 min-w-0 flex-1 border border-[#D7C7D4] bg-white/60 px-4 text-xs uppercase tracking-wider outline-none focus:border-[#4B165C]"
                        />

                        <button
                          type="button"
                          onClick={() => void applyCode()}
                          disabled={applyingCode}
                          className="flex min-w-[90px] items-center justify-center border border-[#4B165C] px-4 text-[10px] font-semibold tracking-wider text-[#4B165C] hover:bg-[#4B165C] hover:text-white disabled:opacity-50"
                        >
                          {applyingCode ? (
                            <Loader2 size={15} className="animate-spin" />
                          ) : (
                            "APPLY"
                          )}
                        </button>

                      </div>

                      {codeMsg && (
                        <p className={`mt-2 text-xs ${
                          appliedCode
                            ? "text-[#7D8768]"
                            : "text-[#9A3B3B]"
                        }`}>
                          {codeMsg}
                        </p>
                      )}

                    </div>

                  )}

                  {appliedCode && (
                    <p className="mt-3 flex items-center gap-2 text-xs text-[#7D8768]">
                      <Check size={14} />
                      {appliedCode} applied successfully.
                    </p>
                  )}

                </div>

                {/* TOTALS */}

                <div className="mt-6 space-y-3 border-t border-[#E6D9CA] pt-5 text-sm text-[#5A4037]">

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{ngn(totals.subtotal)}</span>
                  </div>

                  {totals.discount > 0 && (
                    <div className="flex justify-between text-[#7D8768]">
                      <span>Discount</span>
                      <span>-{ngn(totals.discount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span>
                      {totals.shipping === 0
                        ? "Free"
                        : ngn(totals.shipping)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between border-t border-[#E6D9CA] pt-5">

                    <span className="font-serif text-xl text-[#4B165C]">
                      Total to pay
                    </span>

                    <span className="font-serif text-3xl text-[#4B165C]">
                      {ngn(totals.total)}
                    </span>

                  </div>

                  <p className="text-[10px] text-[#89766A]">
                    Free delivery on orders over {ngn(FREE_SHIPPING_OVER)}.
                  </p>

                </div>

              </div>

              {/* DELIVERY DETAILS */}

              <div className="mt-10">

                <Eyebrow>DELIVERY DETAILS</Eyebrow>

                <h3 className="mt-3 font-serif text-2xl text-[#4B165C]">
                  Where should we send your pieces?
                </h3>

                <p className="mt-2 text-xs leading-6 text-[#89766A]">
                  Please provide your contact and delivery
                  information below.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-[#5A4037]">
                      Full name *
                    </label>

                    <input
                      className={field}
                      placeholder="Your full name"
                      autoComplete="name"
                      value={form.name}
                      onChange={set("name")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-[#5A4037]">
                      Email address *
                    </label>

                    <input
                      className={field}
                      type="email"
                      placeholder="you@example.com"
                      autoComplete="email"
                      value={form.email}
                      onChange={set("email")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-[#5A4037]">
                      Phone number *
                    </label>

                    <input
                      className={field}
                      type="tel"
                      placeholder="Your phone number"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={set("phone")}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-2 block text-xs font-medium text-[#5A4037]">
                      Delivery address *
                    </label>

                    <input
                      className={field}
                      placeholder="House number, street and area"
                      autoComplete="street-address"
                      value={form.address}
                      onChange={set("address")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-[#5A4037]">
                      City / Town *
                    </label>

                    <input
                      className={field}
                      placeholder="e.g. Lekki"
                      autoComplete="address-level2"
                      value={form.city}
                      onChange={set("city")}
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs font-medium text-[#5A4037]">
                      State *
                    </label>

                    <select
                      className={field}
                      value={form.state}
                      onChange={set("state")}
                      autoComplete="address-level1"
                    >
                      {STATES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* OPTIONAL DELIVERY NOTE */}

                  <div className="sm:col-span-2">

                    <details className="group border border-[#E6D9CA] bg-[#F7F2EA]">

                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-xs text-[#4B165C]">

                        <span>
                          Add a delivery note or gift message{" "}
                          <span className="text-[#9A8061]">
                            (Optional)
                          </span>
                        </span>

                        <ChevronDown
                          size={16}
                          className="transition-transform group-open:rotate-180"
                        />

                      </summary>

                      <div className="px-4 pb-4">

                        <textarea
                          className={`${field} min-h-24 resize-y py-4`}
                          placeholder="Anything we should know about your delivery?"
                          value={form.note}
                          onChange={set("note")}
                          maxLength={240}
                        />

                      </div>

                    </details>

                  </div>

                </div>

              </div>

              {/* PAYMENT METHOD */}

              <div className="mt-10">

                <Eyebrow>PAYMENT METHOD</Eyebrow>

                <h3 className="mt-3 font-serif text-2xl text-[#4B165C]">
                  How would you like to pay?
                </h3>

                <p className="mt-2 text-xs leading-6 text-[#89766A]">
                  Choose your preferred payment method.
                </p>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">

                  {/* PAYSTACK */}

                  <label
                    className={`flex cursor-pointer items-start gap-3 border p-5 transition-all ${
                      method === "paystack"
                        ? "border-[#4B165C] bg-[#F7F2EA] shadow-[0_8px_25px_rgba(75,22,92,0.07)]"
                        : "border-[#D8C8B7] hover:border-[#B99A62]"
                    }`}
                  >

                    <input
                      type="radio"
                      name="method"
                      checked={method === "paystack"}
                      onChange={() => setMethod("paystack")}
                      className="mt-1 accent-[#4B165C]"
                    />

                    <CreditCard
                      size={22}
                      strokeWidth={1.4}
                      className="shrink-0 text-[#4B165C]"
                    />

                    <span>

                      <span className="block font-serif text-lg text-[#4B165C]">
                        Pay online
                      </span>

                      <span className="mt-1 block text-xs leading-5 text-[#7A685E]">
                        Card, bank transfer, USSD and other secure payment options through Paystack.
                      </span>

                    </span>

                  </label>

                  {/* BANK TRANSFER */}

                  <label
                    className={`flex cursor-pointer items-start gap-3 border p-5 transition-all ${
                      method === "transfer"
                        ? "border-[#4B165C] bg-[#F7F2EA] shadow-[0_8px_25px_rgba(75,22,92,0.07)]"
                        : "border-[#D8C8B7] hover:border-[#B99A62]"
                    }`}
                  >

                    <input
                      type="radio"
                      name="method"
                      checked={method === "transfer"}
                      onChange={() => setMethod("transfer")}
                      className="mt-1 accent-[#4B165C]"
                    />

                    <Banknote
                      size={22}
                      strokeWidth={1.4}
                      className="shrink-0 text-[#4B165C]"
                    />

                    <span>

                      <span className="block font-serif text-lg text-[#4B165C]">
                        Bank transfer
                      </span>

                      <span className="mt-1 block text-xs leading-5 text-[#7A685E]">
                        Receive our bank details on the next page and complete your transfer.
                      </span>

                    </span>

                  </label>

                </div>

              </div>

              {/* PRE-ORDER TERMS */}

              <div className="mt-8 border-t border-[#E6D9CA] pt-6">

                <label className="flex cursor-pointer items-start gap-3 text-xs leading-6 text-[#7A685E]">

                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-1 h-4 w-4 shrink-0 accent-[#4B165C]"
                  />

                  <span>
                    I understand these pieces are available on
                    pre-order and will be shipped once stock is
                    ready. I've reviewed the{" "}

                    <a
                      href="/delivery-returns"
                      className="font-medium text-[#4B165C] underline underline-offset-4"
                    >
                      delivery & returns policy
                    </a>.
                  </span>

                </label>

              </div>

              {/* ERROR */}

              {error && (
                <p
                  role="alert"
                  className="mt-6 border border-[#9A3B3B]/20 bg-[#9A3B3B]/5 px-4 py-4 text-xs leading-6 text-[#9A3B3B]"
                >
                  {error}
                </p>
              )}

              {/* PLACE ORDER */}

              <button
                type="submit"
                disabled={busy || items.length === 0}
                className="mt-7 flex min-h-[60px] w-full items-center justify-center gap-3 bg-[#4B165C] px-5 text-[10px] font-semibold tracking-[0.16em] text-white transition-all duration-300 hover:bg-[#351043] disabled:cursor-not-allowed disabled:opacity-50"
              >

                {busy ? (
                  <>
                    <Loader2 size={17} className="animate-spin" />
                    PLEASE WAIT...
                  </>
                ) : method === "paystack" ? (
                  <>
                    RESERVE & PAY {ngn(totals.total)}
                    <ArrowRight size={16} />
                  </>
                ) : (
                  <>
                    PLACE PRE-ORDER
                    <ArrowRight size={16} />
                  </>
                )}

              </button>

              <p className="mt-4 flex items-center justify-center gap-2 text-[10px] tracking-[0.1em] text-[#7D8768]">
                <ShieldCheck size={14} />
                YOUR DETAILS ARE SECURE
              </p>

              <button
                type="button"
                onClick={returnToBrowsing}
                className="mt-6 w-full text-center text-[10px] font-medium tracking-[0.12em] text-[#89766A] transition-colors hover:text-[#4B165C]"
              >
                <ArrowLeft size={13} className="mr-2 inline" />
                CONTINUE SHOPPING
              </button>

            </form>

          </div>

        </section>

      )}

      {/* ==========================================
          MOBILE + DESKTOP STICKY CART BAR
      ========================================== */}

      {stage === "browse" && itemCount > 0 && (

        <div className="fixed inset-x-0 bottom-0 z-[900] border-t border-[#B99A62]/40 bg-[#30232F]/[0.98] px-5 py-3 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] backdrop-blur-xl">

          <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4">

            <div className="min-w-0">

              <p className="text-[9px] tracking-[0.16em] text-[#D9BE8B]">
                {itemCount} {itemCount === 1 ? "PIECE" : "PIECES"} SELECTED
              </p>

              <p className="font-serif text-xl text-[#F7F2EA]">
                {ngn(totals.total)}
              </p>

            </div>

            <button
              type="button"
              onClick={continueToCheckout}
              className="flex shrink-0 items-center justify-center gap-3 bg-[#F7F2EA] px-6 py-4 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] transition-all hover:bg-[#B99A62] sm:px-9"
            >
              CONTINUE TO CHECKOUT
              <ArrowRight size={15} />
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

