
// // import { useCallback, useEffect, useMemo, useState } from "react";
// // import {
// //   Check,
// //   ChevronDown,
// //   Loader2,
// //   RefreshCw,
// //   Trash2,
// //   ShieldAlert,
// // } from "lucide-react";

// // import {
// //   deleteOrder,
// //   fetchDiscountSignups,
// //   fetchOrders,
// //   fetchWaitlist,
// //   isAdminSession,
// //   setOrderStatus,
// //   type Order,
// //   type OrderStatus,
// // } from "../lib/api";

// // import { ngn } from "../data/catalog";
// // import { Eyebrow, type Go } from "../components/ui";

// // type Tab = "orders" | "transactions" | "customers" | "waitlist" | "codes";

// // const PAID: OrderStatus[] = [
// //   "paid",
// //   "paid_unverified",
// //   "fulfilled",
// //   "cleared",
// // ];

// // const STATUS_STYLE: Record<OrderStatus, string> = {
// //   pending: "bg-[#EFE6DC] text-[#6D594D]",
// //   awaiting_transfer: "bg-[#F3E6C9] text-[#7A5B1E]",
// //   transfer_reported: "bg-[#F6DDB5] text-[#7A4A0E]",
// //   paid: "bg-[#DDE5D3] text-[#4D5C3A]",
// //   paid_unverified: "bg-[#DDE5D3] text-[#4D5C3A]",
// //   fulfilled: "bg-[#E3D6EA] text-[#4B165C]",
// //   cleared: "bg-[#E6E1E3] text-[#5E5358]",
// //   cancelled: "bg-[#EFD6D6] text-[#8A3434]",
// // };

// // const fmtDate = (s?: string | null) =>
// //   s
// //     ? new Date(s).toLocaleString("en-NG", {
// //         dateStyle: "medium",
// //         timeStyle: "short",
// //       })
// //     : "—";

// // export default function AdminPage({ go }: { go: Go }) {
// //   const [gate, setGate] = useState<"checking" | "denied" | "ok">("checking");
// //   const [who, setWho] = useState<string | null>(null);
// //   const [authError, setAuthError] = useState("");

// //   const [tab, setTab] = useState<Tab>("orders");

// //   const [orders, setOrders] = useState<Order[]>([]);
// //   const [waitlist, setWaitlist] = useState<
// //     Awaited<ReturnType<typeof fetchWaitlist>>
// //   >([]);
// //   const [codes, setCodes] = useState<
// //     Awaited<ReturnType<typeof fetchDiscountSignups>>
// //   >([]);

// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const [q, setQ] = useState("");

// //   const [filter, setFilter] = useState<
// //     "active" | "all" | OrderStatus
// //   >("active");

// //   const [open, setOpen] = useState<string | null>(null);
// //   const [busyId, setBusyId] = useState<string | null>(null);

// //   // --------------------------------------------------
// //   // LOAD ADMIN DATA
// //   // --------------------------------------------------

// //   const load = useCallback(async () => {
// //     setLoading(true);
// //     setError("");

// //     try {
// //       const [o, w, c] = await Promise.all([
// //         fetchOrders(),
// //         fetchWaitlist(),
// //         fetchDiscountSignups(),
// //       ]);

// //       setOrders(o);
// //       setWaitlist(w);
// //       setCodes(c);
// //     } catch (e) {
// //       setError(
// //         e instanceof Error
// //           ? e.message
// //           : "Unable to load your dashboard data."
// //       );
// //     } finally {
// //       setLoading(false);
// //     }
// //   }, []);

// //   // --------------------------------------------------
// //   // VERIFY ADMIN SESSION
// //   // --------------------------------------------------

// //   const checkAdmin = useCallback(async () => {
// //     setGate("checking");
// //     setAuthError("");

// //     try {
// //       const result = await isAdminSession();

// //       setWho(result.email);

// //       if (!result.ok) {
// //         setGate("denied");
// //         return;
// //       }

// //       setGate("ok");
// //       await load();
// //     } catch (e) {
// //       setGate("denied");

// //       setAuthError(
// //         e instanceof Error
// //           ? e.message
// //           : "Unable to verify your admin account."
// //       );
// //     }
// //   }, [load]);

// //   useEffect(() => {
// //     void checkAdmin();
// //   }, [checkAdmin]);

// //   // --------------------------------------------------
// //   // UPDATE ORDER STATUS
// //   // --------------------------------------------------

// //   async function act(id: string, status: OrderStatus) {
// //     setBusyId(id);
// //     setError("");

// //     try {
// //       await setOrderStatus(id, status);

// //       setOrders((list) =>
// //         list.map((o) =>
// //           o.id === id ? { ...o, status } : o
// //         )
// //       );
// //     } catch (e) {
// //       setError(
// //         e instanceof Error ? e.message : "Order update failed."
// //       );
// //     } finally {
// //       setBusyId(null);
// //     }
// //   }

// //   // --------------------------------------------------
// //   // DELETE ORDER
// //   // --------------------------------------------------

// //   async function remove(id: string) {
// //     if (
// //       !window.confirm(
// //         "Delete this order permanently? This cannot be undone."
// //       )
// //     ) {
// //       return;
// //     }

// //     setBusyId(id);
// //     setError("");

// //     try {
// //       await deleteOrder(id);

// //       setOrders((list) =>
// //         list.filter((o) => o.id !== id)
// //       );
// //     } catch (e) {
// //       setError(
// //         e instanceof Error ? e.message : "Delete failed."
// //       );
// //     } finally {
// //       setBusyId(null);
// //     }
// //   }

// //   // --------------------------------------------------
// //   // CLEAR FULFILLED ORDERS
// //   // --------------------------------------------------

// //   async function clearFulfilled() {
// //     const targets = orders.filter(
// //       (o) => o.status === "fulfilled" && o.id
// //     );

// //     if (!targets.length) return;

// //     if (
// //       !window.confirm(
// //         `Clear ${targets.length} fulfilled order(s)?`
// //       )
// //     ) {
// //       return;
// //     }

// //     for (const o of targets) {
// //       if (o.id) await act(o.id, "cleared");
// //     }
// //   }

// //   // --------------------------------------------------
// //   // DASHBOARD STATISTICS
// //   // --------------------------------------------------

// //   const stats = useMemo(() => {
// //     const paid = orders.filter((o) =>
// //       PAID.includes(o.status)
// //     );

// //     return {
// //       revenue: paid.reduce((n, o) => n + o.total, 0),

// //       paidCount: paid.length,

// //       awaiting: orders.filter(
// //         (o) =>
// //           o.status === "awaiting_transfer" ||
// //           o.status === "transfer_reported"
// //       ).length,

// //       open: orders.filter(
// //         (o) =>
// //           !["cleared", "cancelled"].includes(o.status)
// //       ).length,
// //     };
// //   }, [orders]);

// //   // --------------------------------------------------
// //   // SEARCH AND FILTER ORDERS
// //   // --------------------------------------------------

// //   const shownOrders = useMemo(() => {
// //     const term = q.trim().toLowerCase();

// //     return orders.filter((o) => {
// //       if (
// //         filter === "active" &&
// //         ["cleared", "cancelled"].includes(o.status)
// //       ) {
// //         return false;
// //       }

// //       if (
// //         filter !== "active" &&
// //         filter !== "all" &&
// //         o.status !== filter
// //       ) {
// //         return false;
// //       }

// //       if (!term) return true;

// //       return `
// //         ${o.reference}
// //         ${o.customer_name}
// //         ${o.email}
// //         ${o.phone}
// //         ${o.items.map((i) => i.name).join(" ")}
// //       `
// //         .toLowerCase()
// //         .includes(term);
// //     });
// //   }, [orders, q, filter]);

// //   // --------------------------------------------------
// //   // CUSTOMER INFORMATION
// //   // --------------------------------------------------

// //   const customers = useMemo(() => {
// //     const map = new Map<
// //       string,
// //       {
// //         name: string;
// //         email: string;
// //         phone: string;
// //         orders: number;
// //         spent: number;
// //         last: string;
// //       }
// //     >();

// //     for (const o of orders) {
// //       const c = map.get(o.email) ?? {
// //         name: o.customer_name,
// //         email: o.email,
// //         phone: o.phone,
// //         orders: 0,
// //         spent: 0,
// //         last: o.created_at ?? "",
// //       };

// //       c.orders += 1;

// //       if (PAID.includes(o.status)) {
// //         c.spent += o.total;
// //       }

// //       if ((o.created_at ?? "") > c.last) {
// //         c.last = o.created_at ?? "";
// //       }

// //       map.set(o.email, c);
// //     }

// //     return [...map.values()].sort(
// //       (a, b) => b.spent - a.spent
// //     );
// //   }, [orders]);

// //   // --------------------------------------------------
// //   // SHARED TABLE STYLES
// //   // --------------------------------------------------

// //   const th =
// //     "px-4 py-3 text-left text-[10px] font-semibold tracking-[0.14em] text-[#7D8768]";

// //   const td =
// //     "px-4 py-4 align-top text-sm text-[#5A4037]";

// //   const btn =
// //     "border px-3 py-2 text-[10px] font-semibold tracking-[0.1em] transition-colors disabled:opacity-50";

// //   const TABS: [Tab, string][] = [
// //     ["orders", "Orders"],
// //     ["transactions", "Transactions"],
// //     ["customers", "Users"],
// //     ["waitlist", "Waitlist"],
// //     ["codes", "10% sign-ups"],
// //   ];

// //   // --------------------------------------------------
// //   // CHECKING ADMIN ACCESS
// //   // --------------------------------------------------

// //   if (gate === "checking") {
// //     return (
// //       <section className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FBF7F0] pt-32">
// //         <Loader2
// //           size={30}
// //           className="animate-spin text-[#4B165C]"
// //         />

// //         <p className="mt-5 text-[10px] tracking-[0.2em] text-[#89766A]">
// //           VERIFYING ADMIN ACCESS
// //         </p>
// //       </section>
// //     );
// //   }

// //   // --------------------------------------------------
// //   // ACCESS DENIED
// //   // --------------------------------------------------

// //   if (gate === "denied") {
// //     return (
// //       <section className="flex min-h-[75vh] items-center justify-center bg-[#FBF7F0] px-5 pb-24 pt-36">
// //         <div className="w-full max-w-lg text-center">

// //           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EFE6DC]">
// //             <ShieldAlert
// //               size={28}
// //               className="text-[#4B165C]"
// //             />
// //           </div>

// //           <Eyebrow>RESTRICTED AREA</Eyebrow>

// //           <h1 className="mt-5 font-serif text-4xl italic text-[#4B165C] sm:text-5xl">
// //             Admin access only.
// //           </h1>

// //           <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#7A685E]">
// //             {who
// //               ? `You're currently signed in as ${who}, but this email address has not been authorised for The Soft Edit administration.`
// //               : "You need to sign in with your authorised administrator account to access this dashboard."}
// //           </p>

// //           {authError && (
// //             <p className="mt-4 border border-[#E3B9B9] bg-[#FBEDED] px-4 py-3 text-xs text-[#8A3434]">
// //               {authError}
// //             </p>
// //           )}

// //           <div className="mt-8 flex flex-wrap justify-center gap-3">

// //             {/* <a
// //               href="/login"
// //               className="bg-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition hover:bg-[#351043]"
// //             >
// //               SIGN IN
// //             </a> */}
// //             <button
// //   type="button"
// //   onClick={() => go("/admin/login")}
// //   className="bg-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition hover:bg-[#351043]"
// // >
// //   ADMIN SIGN IN
// // </button>

// //             <button
// //               type="button"
// //               onClick={() => void checkAdmin()}
// //               className="border border-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition hover:bg-[#4B165C] hover:text-white"
// //             >
// //               TRY AGAIN
// //             </button>

// //             <button
// //               type="button"
// //               onClick={() => go("/")}
// //               className="border border-[#D8C8B7] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#6D594D] transition hover:bg-[#EFE6DC]"
// //             >
// //               BACK TO STORE
// //             </button>

// //           </div>
// //         </div>
// //       </section>
// //     );
// //   }

// //   // --------------------------------------------------
// //   // ADMIN DASHBOARD
// //   // --------------------------------------------------

// //   return (
// //     <section className="min-h-screen bg-[#FBF7F0] px-4 pb-24 pt-32 sm:px-8 sm:pt-40">

// //       <div className="mx-auto max-w-[1400px]">

// //         {/* HEADER */}

// //         <div className="flex flex-wrap items-end justify-between gap-4">

// //           <div>
// //             <Eyebrow>ADMIN</Eyebrow>

// //             <h1 className="mt-3 font-serif text-4xl text-[#4B165C] sm:text-5xl">
// //               The Soft Edit{" "}
// //               <em className="text-[#9A8061]">
// //                 dashboard
// //               </em>
// //             </h1>

// //             <p className="mt-2 text-xs text-[#89766A]">
// //               Signed in as {who}
// //             </p>
// //           </div>

// //           <button
// //             type="button"
// //             onClick={() => void load()}
// //             disabled={loading}
// //             className="flex items-center gap-2 border border-[#4B165C] px-5 py-3 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] transition hover:bg-[#4B165C] hover:text-white disabled:opacity-50"
// //           >
// //             <RefreshCw
// //               size={14}
// //               className={loading ? "animate-spin" : ""}
// //             />
// //             REFRESH
// //           </button>

// //         </div>

// //         {/* ERROR MESSAGE */}

// //         {error && (
// //           <p
// //             role="alert"
// //             className="mt-5 border border-[#E3B9B9] bg-[#FBEDED] px-4 py-3 text-xs text-[#8A3434]"
// //           >
// //             {error}
// //           </p>
// //         )}

// //         {/* STATISTICS */}

// //         <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">

// //           {[
// //             ["Revenue (paid)", ngn(stats.revenue)],
// //             ["Paid orders", String(stats.paidCount)],
// //             ["Awaiting transfer", String(stats.awaiting)],
// //             ["Open orders", String(stats.open)],
// //           ].map(([label, value]) => (

// //             <div
// //               key={label}
// //               className="border border-[#E6D9CA] bg-[#F7F2EA] p-5"
// //             >
// //               <p className="text-[10px] tracking-[0.16em] text-[#7D8768]">
// //                 {label.toUpperCase()}
// //               </p>

// //               <p className="mt-2 font-serif text-2xl text-[#4B165C] sm:text-3xl">
// //                 {value}
// //               </p>
// //             </div>

// //           ))}

// //         </div>

// //         {/* NAVIGATION TABS */}

// //         <div className="mt-8 flex flex-wrap gap-2 border-b border-[#E6D9CA] pb-4">

// //           {TABS.map(([id, label]) => (

// //             <button
// //               key={id}
// //               type="button"
// //               onClick={() => setTab(id)}
// //               className={`rounded-full border px-5 py-2.5 text-xs transition-all ${
// //                 tab === id
// //                   ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]"
// //                   : "border-[#CDBBAA] text-[#6D594D] hover:border-[#4B165C]"
// //               }`}
// //             >
// //               {label}
// //             </button>

// //           ))}

// //         </div>

// //         {/* ==========================================
// //             ORDERS
// //         ========================================== */}

// //         {tab === "orders" && (

// //           <div className="mt-6">

// //             <div className="flex flex-wrap items-center gap-3">

// //               <input
// //                 value={q}
// //                 onChange={(e) => setQ(e.target.value)}
// //                 placeholder="Search name, email, reference, product…"
// //                 className="min-h-12 min-w-[240px] flex-1 border border-[#D8C8B7] bg-[#F7F2EA] px-4 text-sm outline-none focus:border-[#4B165C]"
// //               />

// //               <select
// //                 value={filter}
// //                 onChange={(e) =>
// //                   setFilter(e.target.value as typeof filter)
// //                 }
// //                 className="min-h-12 border border-[#D8C8B7] bg-[#F7F2EA] px-4 text-xs outline-none focus:border-[#4B165C]"
// //               >
// //                 <option value="active">Active orders</option>
// //                 <option value="all">Everything</option>

// //                 {(Object.keys(STATUS_STYLE) as OrderStatus[]).map(
// //                   (s) => (
// //                     <option key={s} value={s}>
// //                       {s.replace(/_/g, " ")}
// //                     </option>
// //                   )
// //                 )}

// //               </select>

// //               <button
// //                 type="button"
// //                 onClick={() => void clearFulfilled()}
// //                 className={`${btn} min-h-12 border-[#4B165C] text-[#4B165C] hover:bg-[#4B165C] hover:text-white`}
// //               >
// //                 CLEAR ALL FULFILLED
// //               </button>

// //             </div>

// //             <div className="mt-5 overflow-x-auto border border-[#E6D9CA] bg-[#FBF7F0]">

// //               <table className="w-full min-w-[860px]">

// //                 <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
// //                   <tr>
// //                     <th className={th}>ORDER</th>
// //                     <th className={th}>CUSTOMER</th>
// //                     <th className={th}>PRODUCTS BOUGHT</th>
// //                     <th className={th}>TOTAL</th>
// //                     <th className={th}>STATUS</th>
// //                     <th className={th}>ACTIONS</th>
// //                   </tr>
// //                 </thead>

// //                 <tbody>

// //                   {shownOrders.length === 0 && (
// //                     <tr>
// //                       <td
// //                         colSpan={6}
// //                         className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
// //                       >
// //                         No orders here yet.
// //                       </td>
// //                     </tr>
// //                   )}

// //                   {shownOrders.map((o) => {

// //                     const id = o.id ?? o.reference;
// //                     const expanded = open === id;

// //                     return (
// //                       <tr
// //                         key={id}
// //                         className="border-b border-[#EFE6DC] last:border-0"
// //                       >

// //                         <td className={td}>
// //                           <p className="font-mono text-xs text-[#4B165C]">
// //                             {o.reference}
// //                           </p>

// //                           <p className="mt-1 text-[11px] text-[#89766A]">
// //                             {fmtDate(o.created_at)}
// //                           </p>

// //                           <p className="mt-1 text-[11px] uppercase tracking-wider text-[#9A8061]">
// //                             {o.method}
// //                             {o.order_type === "preorder" && (
// //   <span className="mt-1 inline-block rounded-full bg-[#4B165C] px-2 py-0.5 text-[9px] font-semibold tracking-wider text-white">PRE-ORDER</span>
// // )}
// //                           </p>
// //                         </td>

// //                         <td className={td}>
// //                           <p className="font-medium">
// //                             {o.customer_name}
// //                           </p>

// //                           <p className="text-xs text-[#89766A]">
// //                             {o.email}
// //                           </p>

// //                           <p className="text-xs text-[#89766A]">
// //                             {o.phone}
// //                           </p>

// //                           {expanded && (
// //                             <p className="mt-2 text-xs leading-5 text-[#7A685E]">
// //                               {o.address}, {o.city}, {o.state}
// //                             </p>
// //                           )}
// //                         </td>

// //                         <td className={td}>

// //                           <button
// //                             type="button"
// //                             onClick={() =>
// //                               setOpen(expanded ? null : id)
// //                             }
// //                             className="flex items-center gap-1 text-left text-xs text-[#4B165C]"
// //                           >
// //                             {o.items.reduce(
// //                               (n, i) => n + i.quantity,
// //                               0
// //                             )}{" "}
// //                             item(s)

// //                             <ChevronDown
// //                               size={13}
// //                               className={
// //                                 expanded ? "rotate-180" : ""
// //                               }
// //                             />
// //                           </button>

// //                           {(expanded
// //                             ? o.items
// //                             : o.items.slice(0, 2)
// //                           ).map((i) => (

// //                             <p
// //                               key={i.id}
// //                               className="mt-1 text-xs text-[#6D594D]"
// //                             >
// //                               {i.quantity} × {i.name}
// //                             </p>

// //                           ))}

// //                           {!expanded && o.items.length > 2 && (
// //                             <p className="mt-1 text-xs text-[#9A8061]">
// //                               +{o.items.length - 2} more
// //                             </p>
// //                           )}

// //                           {o.discount_code && (
// //                             <p className="mt-2 text-[11px] text-[#7D8768]">
// //                               Code {o.discount_code}
// //                             </p>
// //                           )}

// //                         </td>

// //                         <td className={`${td} whitespace-nowrap font-serif text-lg text-[#4B165C]`}>
// //                           {ngn(o.total)}
// //                         </td>

// //                         <td className={td}>
// //                           <span
// //                             className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide ${STATUS_STYLE[o.status]}`}
// //                           >
// //                             {o.status.replace(/_/g, " ").toUpperCase()}
// //                           </span>
// //                         </td>

// //                         <td className={td}>

// //                           {busyId === id ? (

// //                             <Loader2
// //                               size={16}
// //                               className="animate-spin text-[#4B165C]"
// //                             />

// //                           ) : (

// //                             <div className="flex flex-wrap gap-2">

// //                               {[
// //                                 "awaiting_transfer",
// //                                 "transfer_reported",
// //                                 "pending",
// //                               ].includes(o.status) && (

// //                                 <button
// //                                   type="button"
// //                                   onClick={() =>
// //                                     o.id && void act(o.id, "paid")
// //                                   }
// //                                   className={`${btn} border-[#7D8768] text-[#4D5C3A] hover:bg-[#7D8768] hover:text-white`}
// //                                 >
// //                                   <Check
// //                                     size={12}
// //                                     className="mr-1 inline"
// //                                   />
// //                                   MARK PAID
// //                                 </button>

// //                               )}

// //                               {[
// //                                 "paid",
// //                                 "paid_unverified",
// //                               ].includes(o.status) && (

// //                                 <button
// //                                   type="button"
// //                                   onClick={() =>
// //                                     o.id && void act(o.id, "fulfilled")
// //                                   }
// //                                   className={`${btn} border-[#4B165C] text-[#4B165C] hover:bg-[#4B165C] hover:text-white`}
// //                                 >
// //                                   FULFILLED
// //                                 </button>

// //                               )}

// //                               {![
// //                                 "cleared",
// //                                 "cancelled",
// //                               ].includes(o.status) && (

// //                                 <button
// //                                   type="button"
// //                                   onClick={() =>
// //                                     o.id && void act(o.id, "cleared")
// //                                   }
// //                                   className={`${btn} border-[#B99A62] text-[#7A5B1E] hover:bg-[#B99A62] hover:text-white`}
// //                                 >
// //                                   CLEAR
// //                                 </button>

// //                               )}

// //                               <button
// //                                 type="button"
// //                                 onClick={() =>
// //                                   o.id && void remove(o.id)
// //                                 }
// //                                 aria-label="Delete order"
// //                                 className={`${btn} border-[#D9A6A6] text-[#8A3434] hover:bg-[#8A3434] hover:text-white`}
// //                               >
// //                                 <Trash2 size={12} />
// //                               </button>

// //                             </div>

// //                           )}

// //                         </td>

// //                       </tr>
// //                     );
// //                   })}

// //                 </tbody>
// //               </table>

// //             </div>

// //           </div>
// //         )}

// //         {/* ==========================================
// //             TRANSACTIONS
// //         ========================================== */}

// //         {tab === "transactions" && (

// //           <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">

// //             <table className="w-full min-w-[760px]">

// //               <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
// //                 <tr>
// //                   <th className={th}>DATE</th>
// //                   <th className={th}>USERNAME</th>
// //                   <th className={th}>PRODUCTS</th>
// //                   <th className={th}>METHOD</th>
// //                   <th className={th}>AMOUNT</th>
// //                   <th className={th}>STATUS</th>
// //                 </tr>
// //               </thead>

// //               <tbody>

// //                 {orders
// //                   .filter((o) => PAID.includes(o.status))
// //                   .map((o) => (

// //                     <tr
// //                       key={o.id ?? o.reference}
// //                       className="border-b border-[#EFE6DC] last:border-0"
// //                     >

// //                       <td className={td}>
// //                         {fmtDate(o.paid_at ?? o.created_at)}
// //                       </td>

// //                       <td className={td}>
// //                         {o.customer_name}
// //                         <p className="text-xs text-[#89766A]">
// //                           {o.email}
// //                         </p>
// //                       </td>

// //                       <td className={td}>
// //                         {o.items
// //                           .map(
// //                             (i) =>
// //                               `${i.quantity}× ${i.name}`
// //                           )
// //                           .join(", ")}
// //                       </td>

// //                       <td className={`${td} uppercase`}>
// //                         {o.method}
// //                       </td>

// //                       <td className={`${td} font-serif text-lg text-[#4B165C]`}>
// //                         {ngn(o.total)}
// //                       </td>

// //                       <td className={td}>
// //                         <span
// //                           className={`rounded-full px-3 py-1 text-[10px] font-semibold ${STATUS_STYLE[o.status]}`}
// //                         >
// //                           {o.status.toUpperCase()}
// //                         </span>
// //                       </td>

// //                     </tr>

// //                   ))}

// //                 {orders.every(
// //                   (o) => !PAID.includes(o.status)
// //                 ) && (

// //                   <tr>
// //                     <td
// //                       colSpan={6}
// //                       className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
// //                     >
// //                       No transactions yet.
// //                     </td>
// //                   </tr>

// //                 )}

// //               </tbody>
// //             </table>

// //           </div>

// //         )}

// //         {/* ==========================================
// //             CUSTOMERS
// //         ========================================== */}

// //         {tab === "customers" && (

// //           <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">

// //             <table className="w-full min-w-[640px]">

// //               <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
// //                 <tr>
// //                   <th className={th}>NAME</th>
// //                   <th className={th}>EMAIL</th>
// //                   <th className={th}>PHONE</th>
// //                   <th className={th}>ORDERS</th>
// //                   <th className={th}>TOTAL SPENT</th>
// //                   <th className={th}>LAST ORDER</th>
// //                 </tr>
// //               </thead>

// //               <tbody>

// //                 {customers.map((c) => (

// //                   <tr
// //                     key={c.email}
// //                     className="border-b border-[#EFE6DC] last:border-0"
// //                   >

// //                     <td className={td}>{c.name}</td>
// //                     <td className={td}>{c.email}</td>
// //                     <td className={td}>{c.phone}</td>
// //                     <td className={td}>{c.orders}</td>

// //                     <td className={`${td} font-serif text-lg text-[#4B165C]`}>
// //                       {ngn(c.spent)}
// //                     </td>

// //                     <td className={td}>
// //                       {fmtDate(c.last)}
// //                     </td>

// //                   </tr>

// //                 ))}

// //                 {customers.length === 0 && (

// //                   <tr>
// //                     <td
// //                       colSpan={6}
// //                       className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
// //                     >
// //                       No customers yet.
// //                     </td>
// //                   </tr>

// //                 )}

// //               </tbody>
// //             </table>

// //           </div>

// //         )}

// //         {/* ==========================================
// //             WAITLIST
// //         ========================================== */}

// //         {tab === "waitlist" && (

// //           <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">

// //             <table className="w-full min-w-[560px]">

// //               <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
// //                 <tr>
// //                   <th className={th}>NAME</th>
// //                   <th className={th}>EMAIL</th>
// //                   <th className={th}>INTERESTED IN</th>
// //                   <th className={th}>JOINED</th>
// //                 </tr>
// //               </thead>

// //               <tbody>

// //                 {waitlist.map((w) => (

// //                   <tr
// //                     key={w.id}
// //                     className="border-b border-[#EFE6DC] last:border-0"
// //                   >

// //                     <td className={td}>{w.name}</td>
// //                     <td className={td}>{w.email}</td>
// //                     <td className={td}>{w.interest ?? "—"}</td>
// //                     <td className={td}>
// //                       {fmtDate(w.created_at)}
// //                     </td>

// //                   </tr>

// //                 ))}

// //                 {waitlist.length === 0 && (

// //                   <tr>
// //                     <td
// //                       colSpan={4}
// //                       className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
// //                     >
// //                       Nobody on the waitlist yet.
// //                     </td>
// //                   </tr>

// //                 )}

// //               </tbody>
// //             </table>

// //           </div>

// //         )}

// //         {/* ==========================================
// //             DISCOUNT SIGN-UPS
// //         ========================================== */}

// //         {tab === "codes" && (

// //           <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">

// //             <table className="w-full min-w-[560px]">

// //               <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
// //                 <tr>
// //                   <th className={th}>NAME</th>
// //                   <th className={th}>EMAIL</th>
// //                   <th className={th}>CODE</th>
// //                   <th className={th}>USED</th>
// //                   <th className={th}>SENT</th>
// //                 </tr>
// //               </thead>

// //               <tbody>

// //                 {codes.map((c) => (

// //                   <tr
// //                     key={c.id}
// //                     className="border-b border-[#EFE6DC] last:border-0"
// //                   >

// //                     <td className={td}>{c.name}</td>
// //                     <td className={td}>{c.email}</td>

// //                     <td className={`${td} font-mono text-xs`}>
// //                       {c.code}
// //                     </td>

// //                     <td className={td}>
// //                       {c.used ? "Yes" : "No"}
// //                     </td>

// //                     <td className={td}>
// //                       {fmtDate(c.created_at)}
// //                     </td>

// //                   </tr>

// //                 ))}

// //                 {codes.length === 0 && (

// //                   <tr>
// //                     <td
// //                       colSpan={5}
// //                       className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
// //                     >
// //                       No sign-ups yet.
// //                     </td>
// //                   </tr>

// //                 )}

// //               </tbody>
// //             </table>

// //           </div>

// //         )}

// //       </div>
// //     </section>
// //   );
// // }

// import { useCallback, useEffect, useMemo, useState } from "react";
// import {
//   Check,
//   ChevronDown,
//   Loader2,
//   RefreshCw,
//   Trash2,
//   ShieldAlert,
// } from "lucide-react";

// import {
//   deleteOrder,
//   fetchDiscountSignups,
//   fetchOrders,
//   fetchWaitlist,
//   isAdminSession,
//   setOrderStatus,
//   type Order,
//   type OrderStatus,
// } from "../lib/api";

// import { ngn } from "../data/catalog";
// import { Eyebrow, type Go } from "../components/ui";

// type Tab =
//   | "orders"
//   | "preorders"
//   | "transactions"
//   | "customers"
//   | "waitlist"
//   | "codes";

// type OrderKind = "orders" | "preorders";

// const PAID: OrderStatus[] = [
//   "paid",
//   "paid_unverified",
//   "fulfilled",
//   "cleared",
// ];

// const STATUS_STYLE: Record<OrderStatus, string> = {
//   pending: "bg-[#EFE6DC] text-[#6D594D]",
//   awaiting_transfer: "bg-[#F3E6C9] text-[#7A5B1E]",
//   transfer_reported: "bg-[#F6DDB5] text-[#7A4A0E]",
//   paid: "bg-[#DDE5D3] text-[#4D5C3A]",
//   paid_unverified: "bg-[#DDE5D3] text-[#4D5C3A]",
//   fulfilled: "bg-[#E3D6EA] text-[#4B165C]",
//   cleared: "bg-[#E6E1E3] text-[#5E5358]",
//   cancelled: "bg-[#EFD6D6] text-[#8A3434]",
// };

// const fmtDate = (s?: string | null) =>
//   s
//     ? new Date(s).toLocaleString("en-NG", {
//         dateStyle: "medium",
//         timeStyle: "short",
//       })
//     : "—";

// const isPreorder = (o: Order) => o.order_type === "preorder";

// export default function AdminPage({ go }: { go: Go }) {
//   const [gate, setGate] = useState<"checking" | "denied" | "ok">("checking");
//   const [who, setWho] = useState<string | null>(null);
//   const [authError, setAuthError] = useState("");

//   const [tab, setTab] = useState<Tab>("orders");

//   const [orders, setOrders] = useState<Order[]>([]);
//   const [waitlist, setWaitlist] = useState<
//     Awaited<ReturnType<typeof fetchWaitlist>>
//   >([]);
//   const [codes, setCodes] = useState<
//     Awaited<ReturnType<typeof fetchDiscountSignups>>
//   >([]);

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [q, setQ] = useState("");

//   const [filter, setFilter] = useState<"active" | "all" | OrderStatus>(
//     "active"
//   );

//   const [open, setOpen] = useState<string | null>(null);
//   const [busyId, setBusyId] = useState<string | null>(null);

//   // --------------------------------------------------
//   // LOAD ADMIN DATA
//   // --------------------------------------------------

//   const load = useCallback(async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const [o, w, c] = await Promise.all([
//         fetchOrders(),
//         fetchWaitlist(),
//         fetchDiscountSignups(),
//       ]);

//       setOrders(o);
//       setWaitlist(w);
//       setCodes(c);
//     } catch (e) {
//       setError(
//         e instanceof Error ? e.message : "Unable to load your dashboard data."
//       );
//     } finally {
//       setLoading(false);
//     }
//   }, []);

//   // --------------------------------------------------
//   // VERIFY ADMIN SESSION
//   // --------------------------------------------------

//   const checkAdmin = useCallback(async () => {
//     setGate("checking");
//     setAuthError("");

//     try {
//       const result = await isAdminSession();

//       setWho(result.email);

//       if (!result.ok) {
//         setGate("denied");
//         return;
//       }

//       setGate("ok");
//       await load();
//     } catch (e) {
//       setGate("denied");

//       setAuthError(
//         e instanceof Error ? e.message : "Unable to verify your admin account."
//       );
//     }
//   }, [load]);

//   useEffect(() => {
//     void checkAdmin();
//   }, [checkAdmin]);

//   // Reset the search and filter whenever the admin switches tabs.
//   useEffect(() => {
//     setQ("");
//     setFilter("active");
//     setOpen(null);
//   }, [tab]);

//   // --------------------------------------------------
//   // UPDATE ORDER STATUS
//   // --------------------------------------------------

//   async function act(id: string, status: OrderStatus) {
//     setBusyId(id);
//     setError("");

//     try {
//       await setOrderStatus(id, status);

//       setOrders((list) =>
//         list.map((o) => (o.id === id ? { ...o, status } : o))
//       );
//     } catch (e) {
//       setError(e instanceof Error ? e.message : "Order update failed.");
//     } finally {
//       setBusyId(null);
//     }
//   }

//   // --------------------------------------------------
//   // DELETE ORDER
//   // --------------------------------------------------

//   async function remove(id: string) {
//     if (
//       !window.confirm("Delete this order permanently? This cannot be undone.")
//     ) {
//       return;
//     }

//     setBusyId(id);
//     setError("");

//     try {
//       await deleteOrder(id);

//       setOrders((list) => list.filter((o) => o.id !== id));
//     } catch (e) {
//       setError(e instanceof Error ? e.message : "Delete failed.");
//     } finally {
//       setBusyId(null);
//     }
//   }

//   // --------------------------------------------------
//   // CLEAR FULFILLED (only within the current tab)
//   // --------------------------------------------------

//   async function clearFulfilled(kind: OrderKind) {
//     const targets = orders.filter(
//       (o) =>
//         o.status === "fulfilled" &&
//         o.id &&
//         (kind === "preorders" ? isPreorder(o) : !isPreorder(o))
//     );

//     if (!targets.length) return;

//     const label = kind === "preorders" ? "pre-order(s)" : "order(s)";

//     if (!window.confirm(`Clear ${targets.length} fulfilled ${label}?`)) {
//       return;
//     }

//     for (const o of targets) {
//       if (o.id) await act(o.id, "cleared");
//     }
//   }

//   // --------------------------------------------------
//   // SPLIT ORDERS / PRE-ORDERS
//   // --------------------------------------------------

//   const standardOrders = useMemo(
//     () => orders.filter((o) => !isPreorder(o)),
//     [orders]
//   );

//   const preOrders = useMemo(() => orders.filter(isPreorder), [orders]);

//   const openCount = (list: Order[]) =>
//     list.filter((o) => !["cleared", "cancelled"].includes(o.status)).length;

//   // --------------------------------------------------
//   // DASHBOARD STATISTICS (scoped to the active tab)
//   // --------------------------------------------------

//   const stats = useMemo(() => {
//     const scope =
//       tab === "orders"
//         ? standardOrders
//         : tab === "preorders"
//         ? preOrders
//         : orders;

//     const prefix = tab === "preorders" ? "Pre-order " : "";

//     const paid = scope.filter((o) => PAID.includes(o.status));

//     return {
//       prefix,
//       revenue: paid.reduce((n, o) => n + o.total, 0),
//       paidCount: paid.length,
//       awaiting: scope.filter(
//         (o) =>
//           o.status === "awaiting_transfer" || o.status === "transfer_reported"
//       ).length,
//       open: openCount(scope),
//     };
//   }, [tab, orders, standardOrders, preOrders]);

//   // --------------------------------------------------
//   // SEARCH AND FILTER (works for either list)
//   // --------------------------------------------------

//   const applyFilters = useCallback(
//     (list: Order[]) => {
//       const term = q.trim().toLowerCase();

//       return list.filter((o) => {
//         if (filter === "active" && ["cleared", "cancelled"].includes(o.status)) {
//           return false;
//         }

//         if (filter !== "active" && filter !== "all" && o.status !== filter) {
//           return false;
//         }

//         if (!term) return true;

//         return `
//           ${o.reference}
//           ${o.customer_name}
//           ${o.email}
//           ${o.phone}
//           ${o.items.map((i) => i.name).join(" ")}
//         `
//           .toLowerCase()
//           .includes(term);
//       });
//     },
//     [q, filter]
//   );

//   const shownOrders = useMemo(
//     () => applyFilters(standardOrders),
//     [applyFilters, standardOrders]
//   );

//   const shownPreorders = useMemo(
//     () => applyFilters(preOrders),
//     [applyFilters, preOrders]
//   );

//   // --------------------------------------------------
//   // CUSTOMER INFORMATION
//   // --------------------------------------------------

//   const customers = useMemo(() => {
//     const map = new Map<
//       string,
//       {
//         name: string;
//         email: string;
//         phone: string;
//         orders: number;
//         preorders: number;
//         spent: number;
//         last: string;
//       }
//     >();

//     for (const o of orders) {
//       const c = map.get(o.email) ?? {
//         name: o.customer_name,
//         email: o.email,
//         phone: o.phone,
//         orders: 0,
//         preorders: 0,
//         spent: 0,
//         last: o.created_at ?? "",
//       };

//       if (isPreorder(o)) c.preorders += 1;
//       else c.orders += 1;

//       if (PAID.includes(o.status)) {
//         c.spent += o.total;
//       }

//       if ((o.created_at ?? "") > c.last) {
//         c.last = o.created_at ?? "";
//       }

//       map.set(o.email, c);
//     }

//     return [...map.values()].sort((a, b) => b.spent - a.spent);
//   }, [orders]);

//   // --------------------------------------------------
//   // SHARED STYLES
//   // --------------------------------------------------

//   const th =
//     "px-4 py-3 text-left text-[10px] font-semibold tracking-[0.14em] text-[#7D8768]";

//   const td = "px-4 py-4 align-top text-sm text-[#5A4037]";

//   const btn =
//     "border px-3 py-2 text-[10px] font-semibold tracking-[0.1em] transition-colors disabled:opacity-50";

//   const TABS: [Tab, string][] = [
//     ["orders", `Orders (${openCount(standardOrders)})`],
//     ["preorders", `Pre-orders (${openCount(preOrders)})`],
//     ["transactions", "Transactions"],
//     ["customers", "Users"],
//     ["waitlist", "Waitlist"],
//     ["codes", "10% sign-ups"],
//   ];

//   // --------------------------------------------------
//   // REUSABLE ORDERS PANEL (used by Orders and Pre-orders)
//   // --------------------------------------------------

//   function renderOrdersPanel(kind: OrderKind, list: Order[]) {
//     const isPre = kind === "preorders";

//     return (
//       <div className="mt-6">
//         {isPre && (
//           <p className="mb-4 border border-[#D9C5A4] bg-[#F7F2EA] px-4 py-3 text-xs leading-6 text-[#7A685E]">
//             Pre-orders are reserved pieces paid for in advance. Mark them paid
//             once payment is confirmed, then mark them fulfilled when the stock
//             has been delivered.
//           </p>
//         )}

//         <div className="flex flex-wrap items-center gap-3">
//           <input
//             value={q}
//             onChange={(e) => setQ(e.target.value)}
//             placeholder="Search name, email, reference, product…"
//             className="min-h-12 min-w-[240px] flex-1 border border-[#D8C8B7] bg-[#F7F2EA] px-4 text-sm outline-none focus:border-[#4B165C]"
//           />

//           <select
//             value={filter}
//             onChange={(e) => setFilter(e.target.value as typeof filter)}
//             className="min-h-12 border border-[#D8C8B7] bg-[#F7F2EA] px-4 text-xs outline-none focus:border-[#4B165C]"
//           >
//             <option value="active">
//               {isPre ? "Active pre-orders" : "Active orders"}
//             </option>
//             <option value="all">Everything</option>

//             {(Object.keys(STATUS_STYLE) as OrderStatus[]).map((s) => (
//               <option key={s} value={s}>
//                 {s.replace(/_/g, " ")}
//               </option>
//             ))}
//           </select>

//           <button
//             type="button"
//             onClick={() => void clearFulfilled(kind)}
//             className={`${btn} min-h-12 border-[#4B165C] text-[#4B165C] hover:bg-[#4B165C] hover:text-white`}
//           >
//             CLEAR ALL FULFILLED
//           </button>
//         </div>

//         <div className="mt-5 overflow-x-auto border border-[#E6D9CA] bg-[#FBF7F0]">
//           <table className="w-full min-w-[860px]">
//             <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
//               <tr>
//                 <th className={th}>{isPre ? "PRE-ORDER" : "ORDER"}</th>
//                 <th className={th}>CUSTOMER</th>
//                 <th className={th}>
//                   {isPre ? "PRODUCTS RESERVED" : "PRODUCTS BOUGHT"}
//                 </th>
//                 <th className={th}>TOTAL</th>
//                 <th className={th}>STATUS</th>
//                 <th className={th}>ACTIONS</th>
//               </tr>
//             </thead>

//             <tbody>
//               {list.length === 0 && (
//                 <tr>
//                   <td
//                     colSpan={6}
//                     className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
//                   >
//                     {isPre ? "No pre-orders here yet." : "No orders here yet."}
//                   </td>
//                 </tr>
//               )}

//               {list.map((o) => {
//                 const id = o.id ?? o.reference;
//                 const expanded = open === id;

//                 return (
//                   <tr
//                     key={id}
//                     className="border-b border-[#EFE6DC] last:border-0"
//                   >
//                     <td className={td}>
//                       <p className="font-mono text-xs text-[#4B165C]">
//                         {o.reference}
//                       </p>

//                       <p className="mt-1 text-[11px] text-[#89766A]">
//                         {fmtDate(o.created_at)}
//                       </p>

//                       <p className="mt-1 text-[11px] uppercase tracking-wider text-[#9A8061]">
//                         {o.method}
//                       </p>
//                     </td>

//                     <td className={td}>
//                       <p className="font-medium">{o.customer_name}</p>

//                       <p className="text-xs text-[#89766A]">{o.email}</p>

//                       <p className="text-xs text-[#89766A]">{o.phone}</p>

//                       {expanded && (
//                         <p className="mt-2 text-xs leading-5 text-[#7A685E]">
//                           {o.address}, {o.city}, {o.state}
//                         </p>
//                       )}
//                     </td>

//                     <td className={td}>
//                       <button
//                         type="button"
//                         onClick={() => setOpen(expanded ? null : id)}
//                         className="flex items-center gap-1 text-left text-xs text-[#4B165C]"
//                       >
//                         {o.items.reduce((n, i) => n + i.quantity, 0)} item(s)
//                         <ChevronDown
//                           size={13}
//                           className={expanded ? "rotate-180" : ""}
//                         />
//                       </button>

//                       {(expanded ? o.items : o.items.slice(0, 2)).map((i) => (
//                         <p key={i.id} className="mt-1 text-xs text-[#6D594D]">
//                           {i.quantity} × {i.name}
//                         </p>
//                       ))}

//                       {!expanded && o.items.length > 2 && (
//                         <p className="mt-1 text-xs text-[#9A8061]">
//                           +{o.items.length - 2} more
//                         </p>
//                       )}

//                       {o.discount_code && (
//                         <p className="mt-2 text-[11px] text-[#7D8768]">
//                           Code {o.discount_code}
//                         </p>
//                       )}
//                     </td>

//                     <td
//                       className={`${td} whitespace-nowrap font-serif text-lg text-[#4B165C]`}
//                     >
//                       {ngn(o.total)}
//                     </td>

//                     <td className={td}>
//                       <span
//                         className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide ${STATUS_STYLE[o.status]}`}
//                       >
//                         {o.status.replace(/_/g, " ").toUpperCase()}
//                       </span>
//                     </td>

//                     <td className={td}>
//                       {busyId === id ? (
//                         <Loader2
//                           size={16}
//                           className="animate-spin text-[#4B165C]"
//                         />
//                       ) : (
//                         <div className="flex flex-wrap gap-2">
//                           {[
//                             "awaiting_transfer",
//                             "transfer_reported",
//                             "pending",
//                           ].includes(o.status) && (
//                             <button
//                               type="button"
//                               onClick={() => o.id && void act(o.id, "paid")}
//                               className={`${btn} border-[#7D8768] text-[#4D5C3A] hover:bg-[#7D8768] hover:text-white`}
//                             >
//                               <Check size={12} className="mr-1 inline" />
//                               MARK PAID
//                             </button>
//                           )}

//                           {["paid", "paid_unverified"].includes(o.status) && (
//                             <button
//                               type="button"
//                               onClick={() =>
//                                 o.id && void act(o.id, "fulfilled")
//                               }
//                               className={`${btn} border-[#4B165C] text-[#4B165C] hover:bg-[#4B165C] hover:text-white`}
//                             >
//                               FULFILLED
//                             </button>
//                           )}

//                           {!["cleared", "cancelled"].includes(o.status) && (
//                             <button
//                               type="button"
//                               onClick={() => o.id && void act(o.id, "cleared")}
//                               className={`${btn} border-[#B99A62] text-[#7A5B1E] hover:bg-[#B99A62] hover:text-white`}
//                             >
//                               CLEAR
//                             </button>
//                           )}

//                           <button
//                             type="button"
//                             onClick={() => o.id && void remove(o.id)}
//                             aria-label="Delete order"
//                             className={`${btn} border-[#D9A6A6] text-[#8A3434] hover:bg-[#8A3434] hover:text-white`}
//                           >
//                             <Trash2 size={12} />
//                           </button>
//                         </div>
//                       )}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     );
//   }

//   // --------------------------------------------------
//   // CHECKING ADMIN ACCESS
//   // --------------------------------------------------

//   if (gate === "checking") {
//     return (
//       <section className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FBF7F0] pt-32">
//         <Loader2 size={30} className="animate-spin text-[#4B165C]" />

//         <p className="mt-5 text-[10px] tracking-[0.2em] text-[#89766A]">
//           VERIFYING ADMIN ACCESS
//         </p>
//       </section>
//     );
//   }

//   // --------------------------------------------------
//   // ACCESS DENIED
//   // --------------------------------------------------

//   if (gate === "denied") {
//     return (
//       <section className="flex min-h-[75vh] items-center justify-center bg-[#FBF7F0] px-5 pb-24 pt-36">
//         <div className="w-full max-w-lg text-center">
//           <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EFE6DC]">
//             <ShieldAlert size={28} className="text-[#4B165C]" />
//           </div>

//           <Eyebrow>RESTRICTED AREA</Eyebrow>

//           <h1 className="mt-5 font-serif text-4xl italic text-[#4B165C] sm:text-5xl">
//             Admin access only.
//           </h1>

//           <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#7A685E]">
//             {who
//               ? `You're currently signed in as ${who}, but this email address has not been authorised for The Soft Edit administration.`
//               : "You need to sign in with your authorised administrator account to access this dashboard."}
//           </p>

//           {authError && (
//             <p className="mt-4 border border-[#E3B9B9] bg-[#FBEDED] px-4 py-3 text-xs text-[#8A3434]">
//               {authError}
//             </p>
//           )}

//           <div className="mt-8 flex flex-wrap justify-center gap-3">
//             <button
//               type="button"
//               onClick={() => go("/admin/login")}
//               className="bg-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition hover:bg-[#351043]"
//             >
//               ADMIN SIGN IN
//             </button>

//             <button
//               type="button"
//               onClick={() => void checkAdmin()}
//               className="border border-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition hover:bg-[#4B165C] hover:text-white"
//             >
//               TRY AGAIN
//             </button>

//             <button
//               type="button"
//               onClick={() => go("/")}
//               className="border border-[#D8C8B7] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#6D594D] transition hover:bg-[#EFE6DC]"
//             >
//               BACK TO STORE
//             </button>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   // --------------------------------------------------
//   // ADMIN DASHBOARD
//   // --------------------------------------------------

//   return (
//     <section className="min-h-screen bg-[#FBF7F0] px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
//       <div className="mx-auto max-w-[1400px]">
//         {/* HEADER */}

//         <div className="flex flex-wrap items-end justify-between gap-4">
//           <div>
//             <Eyebrow>ADMIN</Eyebrow>

//             <h1 className="mt-3 font-serif text-4xl text-[#4B165C] sm:text-5xl">
//               The Soft Edit <em className="text-[#9A8061]">dashboard</em>
//             </h1>

//             <p className="mt-2 text-xs text-[#89766A]">Signed in as {who}</p>
//           </div>

//           <button
//             type="button"
//             onClick={() => void load()}
//             disabled={loading}
//             className="flex items-center gap-2 border border-[#4B165C] px-5 py-3 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] transition hover:bg-[#4B165C] hover:text-white disabled:opacity-50"
//           >
//             <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
//             REFRESH
//           </button>
//         </div>

//         {/* ERROR MESSAGE */}

//         {error && (
//           <p
//             role="alert"
//             className="mt-5 border border-[#E3B9B9] bg-[#FBEDED] px-4 py-3 text-xs text-[#8A3434]"
//           >
//             {error}
//           </p>
//         )}

//         {/* STATISTICS */}

//         <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
//           {[
//             [`${stats.prefix}Revenue (paid)`, ngn(stats.revenue)],
//             [`${stats.prefix}Paid orders`, String(stats.paidCount)],
//             ["Awaiting transfer", String(stats.awaiting)],
//             [`Open ${tab === "preorders" ? "pre-orders" : "orders"}`, String(stats.open)],
//           ].map(([label, value]) => (
//             <div
//               key={label}
//               className="border border-[#E6D9CA] bg-[#F7F2EA] p-5"
//             >
//               <p className="text-[10px] tracking-[0.16em] text-[#7D8768]">
//                 {label.toUpperCase()}
//               </p>

//               <p className="mt-2 font-serif text-2xl text-[#4B165C] sm:text-3xl">
//                 {value}
//               </p>
//             </div>
//           ))}
//         </div>

//         {/* NAVIGATION TABS */}

//         <div className="mt-8 flex flex-wrap gap-2 border-b border-[#E6D9CA] pb-4">
//           {TABS.map(([id, label]) => (
//             <button
//               key={id}
//               type="button"
//               onClick={() => setTab(id)}
//               className={`rounded-full border px-5 py-2.5 text-xs transition-all ${
//                 tab === id
//                   ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]"
//                   : "border-[#CDBBAA] text-[#6D594D] hover:border-[#4B165C]"
//               }`}
//             >
//               {label}
//             </button>
//           ))}
//         </div>

//         {/* ORDERS */}
//         {tab === "orders" && renderOrdersPanel("orders", shownOrders)}

//         {/* PRE-ORDERS */}
//         {tab === "preorders" && renderOrdersPanel("preorders", shownPreorders)}

//         {/* TRANSACTIONS */}

//         {tab === "transactions" && (
//           <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
//             <table className="w-full min-w-[760px]">
//               <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
//                 <tr>
//                   <th className={th}>DATE</th>
//                   <th className={th}>USERNAME</th>
//                   <th className={th}>PRODUCTS</th>
//                   <th className={th}>TYPE</th>
//                   <th className={th}>METHOD</th>
//                   <th className={th}>AMOUNT</th>
//                   <th className={th}>STATUS</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {orders
//                   .filter((o) => PAID.includes(o.status))
//                   .map((o) => (
//                     <tr
//                       key={o.id ?? o.reference}
//                       className="border-b border-[#EFE6DC] last:border-0"
//                     >
//                       <td className={td}>
//                         {fmtDate(o.paid_at ?? o.created_at)}
//                       </td>

//                       <td className={td}>
//                         {o.customer_name}
//                         <p className="text-xs text-[#89766A]">{o.email}</p>
//                       </td>

//                       <td className={td}>
//                         {o.items
//                           .map((i) => `${i.quantity}× ${i.name}`)
//                           .join(", ")}
//                       </td>

//                       <td className={td}>
//                         <span
//                           className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide ${
//                             isPreorder(o)
//                               ? "bg-[#4B165C] text-white"
//                               : "bg-[#EFE6DC] text-[#6D594D]"
//                           }`}
//                         >
//                           {isPreorder(o) ? "PRE-ORDER" : "ORDER"}
//                         </span>
//                       </td>

//                       <td className={`${td} uppercase`}>{o.method}</td>

//                       <td className={`${td} font-serif text-lg text-[#4B165C]`}>
//                         {ngn(o.total)}
//                       </td>

//                       <td className={td}>
//                         <span
//                           className={`rounded-full px-3 py-1 text-[10px] font-semibold ${STATUS_STYLE[o.status]}`}
//                         >
//                           {o.status.toUpperCase()}
//                         </span>
//                       </td>
//                     </tr>
//                   ))}

//                 {orders.every((o) => !PAID.includes(o.status)) && (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
//                     >
//                       No transactions yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* CUSTOMERS */}

//         {tab === "customers" && (
//           <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
//             <table className="w-full min-w-[720px]">
//               <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
//                 <tr>
//                   <th className={th}>NAME</th>
//                   <th className={th}>EMAIL</th>
//                   <th className={th}>PHONE</th>
//                   <th className={th}>ORDERS</th>
//                   <th className={th}>PRE-ORDERS</th>
//                   <th className={th}>TOTAL SPENT</th>
//                   <th className={th}>LAST ORDER</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {customers.map((c) => (
//                   <tr
//                     key={c.email}
//                     className="border-b border-[#EFE6DC] last:border-0"
//                   >
//                     <td className={td}>{c.name}</td>
//                     <td className={td}>{c.email}</td>
//                     <td className={td}>{c.phone}</td>
//                     <td className={td}>{c.orders}</td>
//                     <td className={td}>{c.preorders}</td>

//                     <td className={`${td} font-serif text-lg text-[#4B165C]`}>
//                       {ngn(c.spent)}
//                     </td>

//                     <td className={td}>{fmtDate(c.last)}</td>
//                   </tr>
//                 ))}

//                 {customers.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={7}
//                       className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
//                     >
//                       No customers yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* WAITLIST */}

//         {tab === "waitlist" && (
//           <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
//             <table className="w-full min-w-[560px]">
//               <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
//                 <tr>
//                   <th className={th}>NAME</th>
//                   <th className={th}>EMAIL</th>
//                   <th className={th}>INTERESTED IN</th>
//                   <th className={th}>JOINED</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {waitlist.map((w) => (
//                   <tr
//                     key={w.id}
//                     className="border-b border-[#EFE6DC] last:border-0"
//                   >
//                     <td className={td}>{w.name}</td>
//                     <td className={td}>{w.email}</td>
//                     <td className={td}>{w.interest ?? "—"}</td>
//                     <td className={td}>{fmtDate(w.created_at)}</td>
//                   </tr>
//                 ))}

//                 {waitlist.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={4}
//                       className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
//                     >
//                       Nobody on the waitlist yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* DISCOUNT SIGN-UPS */}

//         {tab === "codes" && (
//           <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
//             <table className="w-full min-w-[560px]">
//               <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
//                 <tr>
//                   <th className={th}>NAME</th>
//                   <th className={th}>EMAIL</th>
//                   <th className={th}>CODE</th>
//                   <th className={th}>USED</th>
//                   <th className={th}>SENT</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {codes.map((c) => (
//                   <tr
//                     key={c.id}
//                     className="border-b border-[#EFE6DC] last:border-0"
//                   >
//                     <td className={td}>{c.name}</td>
//                     <td className={td}>{c.email}</td>]

//                     <td className={`${td} font-mono text-xs`}>{c.code}</td>

//                     <td className={td}>{c.used ? "Yes" : "No"}</td>

//                     <td className={td}>{fmtDate(c.created_at)}</td>
//                   </tr>
//                 ))}

//                 {codes.length === 0 && (
//                   <tr>
//                     <td
//                       colSpan={5}
//                       className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
//                     >
//                       No sign-ups yet.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  ChevronDown,
  Loader2,
  RefreshCw,
  Trash2,
  ShieldAlert,
  Truck,
  Wallet,
} from "lucide-react";

import {
  bookDelivery,
  deleteOrder,
  fetchDiscountSignups,
  fetchOrders,
  fetchRoutagWallet,
  fetchWaitlist,
  isAdminSession,
  refreshDelivery,
  setOrderStatus,
  type Order,
  type OrderStatus,
} from "../lib/api";

import { ngn } from "../data/catalog";
import { Eyebrow, type Go } from "../components/ui";

type Tab =
  | "orders"
  | "preorders"
  | "transactions"
  | "customers"
  | "waitlist"
  | "codes";

type OrderKind = "orders" | "preorders";

const PAID: OrderStatus[] = [
  "paid",
  "paid_unverified",
  "fulfilled",
  "cleared",
];

const STATUS_STYLE: Record<OrderStatus, string> = {
  pending: "bg-[#EFE6DC] text-[#6D594D]",
  awaiting_transfer: "bg-[#F3E6C9] text-[#7A5B1E]",
  transfer_reported: "bg-[#F6DDB5] text-[#7A4A0E]",
  paid: "bg-[#DDE5D3] text-[#4D5C3A]",
  paid_unverified: "bg-[#DDE5D3] text-[#4D5C3A]",
  fulfilled: "bg-[#E3D6EA] text-[#4B165C]",
  cleared: "bg-[#E6E1E3] text-[#5E5358]",
  cancelled: "bg-[#EFD6D6] text-[#8A3434]",
};

const DELIVERY_STYLE: Record<string, string> = {
  BOOKING: "bg-[#F3E6C9] text-[#7A5B1E]",
  PENDING: "bg-[#EFE6DC] text-[#6D594D]",
  BROADCASTED: "bg-[#F6DDB5] text-[#7A4A0E]",
  ASSIGNED: "bg-[#E3D6EA] text-[#4B165C]",
  IN_TRANSIT: "bg-[#D9E4EE] text-[#2F4D66]",
  DELIVERED: "bg-[#DDE5D3] text-[#4D5C3A]",
  SENDER_CANCELLED: "bg-[#EFD6D6] text-[#8A3434]",
};

const fmtDate = (s?: string | null) =>
  s
    ? new Date(s).toLocaleString("en-NG", {
        dateStyle: "medium",
        timeStyle: "short",
      })
    : "—";

const isPreorder = (o: Order) => o.order_type === "preorder";

const LOW_WALLET = 10000; // warn when the RouTag wallet drops below this (Naira)

export default function AdminPage({ go }: { go: Go }) {
  const [gate, setGate] = useState<"checking" | "denied" | "ok">("checking");
  const [who, setWho] = useState<string | null>(null);
  const [authError, setAuthError] = useState("");

  const [tab, setTab] = useState<Tab>("orders");

  const [orders, setOrders] = useState<Order[]>([]);
  const [waitlist, setWaitlist] = useState<
    Awaited<ReturnType<typeof fetchWaitlist>>
  >([]);
  const [codes, setCodes] = useState<
    Awaited<ReturnType<typeof fetchDiscountSignups>>
  >([]);
  const [wallet, setWallet] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");

  const [filter, setFilter] = useState<"active" | "all" | OrderStatus>(
    "active"
  );

  const [open, setOpen] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  // --------------------------------------------------
  // LOAD ADMIN DATA
  // --------------------------------------------------

  const load = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const [o, w, c] = await Promise.all([
        fetchOrders(),
        fetchWaitlist(),
        fetchDiscountSignups(),
      ]);

      setOrders(o);
      setWaitlist(w);
      setCodes(c);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to load your dashboard data."
      );
    } finally {
      setLoading(false);
    }

    // RouTag wallet is optional: never block the dashboard on it.
    fetchRoutagWallet()
      .then(setWallet)
      .catch(() => setWallet(null));
  }, []);

  // --------------------------------------------------
  // VERIFY ADMIN SESSION
  // --------------------------------------------------

  const checkAdmin = useCallback(async () => {
    setGate("checking");
    setAuthError("");

    try {
      const result = await isAdminSession();

      setWho(result.email);

      if (!result.ok) {
        setGate("denied");
        return;
      }

      setGate("ok");
      await load();
    } catch (e) {
      setGate("denied");

      setAuthError(
        e instanceof Error ? e.message : "Unable to verify your admin account."
      );
    }
  }, [load]);

  useEffect(() => {
    void checkAdmin();
  }, [checkAdmin]);

  // Reset the search and filter whenever the admin switches tabs.
  useEffect(() => {
    setQ("");
    setFilter("active");
    setOpen(null);
  }, [tab]);

  // --------------------------------------------------
  // DELIVERY (RouTag)
  // --------------------------------------------------

  const patchOrder = (id: string, patch: Partial<Order>) =>
    setOrders((list) => list.map((o) => (o.id === id ? { ...o, ...patch } : o)));

  /** Books a rider. Shows errors but never throws, so callers can chain it. */
  async function runBook(o: Order) {
    if (!o.id) return;
    try {
      const d = await bookDelivery(o.reference);
      patchOrder(o.id, { ...d, delivery_error: null });
      fetchRoutagWallet().then(setWallet).catch(() => {});
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not book a rider.";
      setError(`Delivery for ${o.reference}: ${msg}`);
      patchOrder(o.id, { delivery_error: msg });
    }
  }

  async function book(o: Order) {
    setBusyId(o.id ?? o.reference);
    setError("");
    await runBook(o);
    setBusyId(null);
  }

  async function syncDelivery(o: Order) {
    if (!o.id) return;
    setBusyId(o.id);
    setError("");
    try {
      const r = await refreshDelivery(o.reference);
      patchOrder(o.id, { ...r.delivery, status: r.order_status });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not refresh delivery.");
    } finally {
      setBusyId(null);
    }
  }

  // --------------------------------------------------
  // UPDATE ORDER STATUS
  // --------------------------------------------------

  async function act(id: string, status: OrderStatus) {
    setBusyId(id);
    setError("");

    try {
      await setOrderStatus(id, status);

      setOrders((list) =>
        list.map((o) => (o.id === id ? { ...o, status } : o))
      );
    } catch (e) {
      setError(e instanceof Error ? e.message : "Order update failed.");
    } finally {
      setBusyId(null);
    }
  }

  // --------------------------------------------------
  // DELETE ORDER
  // --------------------------------------------------

  async function remove(id: string) {
    if (
      !window.confirm("Delete this order permanently? This cannot be undone.")
    ) {
      return;
    }

    setBusyId(id);
    setError("");

    try {
      await deleteOrder(id);

      setOrders((list) => list.filter((o) => o.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setBusyId(null);
    }
  }

  // --------------------------------------------------
  // CLEAR FULFILLED (only within the current tab)
  // --------------------------------------------------

  async function clearFulfilled(kind: OrderKind) {
    const targets = orders.filter(
      (o) =>
        o.status === "fulfilled" &&
        o.id &&
        (kind === "preorders" ? isPreorder(o) : !isPreorder(o))
    );

    if (!targets.length) return;

    const label = kind === "preorders" ? "pre-order(s)" : "order(s)";

    if (!window.confirm(`Clear ${targets.length} fulfilled ${label}?`)) {
      return;
    }

    for (const o of targets) {
      if (o.id) await act(o.id, "cleared");
    }
  }

  // --------------------------------------------------
  // SPLIT ORDERS / PRE-ORDERS
  // --------------------------------------------------

  const standardOrders = useMemo(
    () => orders.filter((o) => !isPreorder(o)),
    [orders]
  );

  const preOrders = useMemo(() => orders.filter(isPreorder), [orders]);

  const openCount = (list: Order[]) =>
    list.filter((o) => !["cleared", "cancelled"].includes(o.status)).length;

  // --------------------------------------------------
  // DASHBOARD STATISTICS (scoped to the active tab)
  // --------------------------------------------------

  const stats = useMemo(() => {
    const scope =
      tab === "orders"
        ? standardOrders
        : tab === "preorders"
        ? preOrders
        : orders;

    const prefix = tab === "preorders" ? "Pre-order " : "";

    const paid = scope.filter((o) => PAID.includes(o.status));

    return {
      prefix,
      revenue: paid.reduce((n, o) => n + o.total, 0),
      paidCount: paid.length,
      awaiting: scope.filter(
        (o) =>
          o.status === "awaiting_transfer" || o.status === "transfer_reported"
      ).length,
      open: openCount(scope),
    };
  }, [tab, orders, standardOrders, preOrders]);

  // --------------------------------------------------
  // SEARCH AND FILTER (works for either list)
  // --------------------------------------------------

  const applyFilters = useCallback(
    (list: Order[]) => {
      const term = q.trim().toLowerCase();

      return list.filter((o) => {
        if (filter === "active" && ["cleared", "cancelled"].includes(o.status)) {
          return false;
        }

        if (filter !== "active" && filter !== "all" && o.status !== filter) {
          return false;
        }

        if (!term) return true;

        return `
          ${o.reference}
          ${o.customer_name}
          ${o.email}
          ${o.phone}
          ${o.items.map((i) => i.name).join(" ")}
        `
          .toLowerCase()
          .includes(term);
      });
    },
    [q, filter]
  );

  const shownOrders = useMemo(
    () => applyFilters(standardOrders),
    [applyFilters, standardOrders]
  );

  const shownPreorders = useMemo(
    () => applyFilters(preOrders),
    [applyFilters, preOrders]
  );

  // --------------------------------------------------
  // CUSTOMER INFORMATION
  // --------------------------------------------------

  const customers = useMemo(() => {
    const map = new Map<
      string,
      {
        name: string;
        email: string;
        phone: string;
        orders: number;
        preorders: number;
        spent: number;
        last: string;
      }
    >();

    for (const o of orders) {
      const c = map.get(o.email) ?? {
        name: o.customer_name,
        email: o.email,
        phone: o.phone,
        orders: 0,
        preorders: 0,
        spent: 0,
        last: o.created_at ?? "",
      };

      if (isPreorder(o)) c.preorders += 1;
      else c.orders += 1;

      if (PAID.includes(o.status)) {
        c.spent += o.total;
      }

      if ((o.created_at ?? "") > c.last) {
        c.last = o.created_at ?? "";
      }

      map.set(o.email, c);
    }

    return [...map.values()].sort((a, b) => b.spent - a.spent);
  }, [orders]);

  // --------------------------------------------------
  // SHARED STYLES
  // --------------------------------------------------

  const th =
    "px-4 py-3 text-left text-[10px] font-semibold tracking-[0.14em] text-[#7D8768]";

  const td = "px-4 py-4 align-top text-sm text-[#5A4037]";

  const btn =
    "border px-3 py-2 text-[10px] font-semibold tracking-[0.1em] transition-colors disabled:opacity-50";

  const TABS: [Tab, string][] = [
    ["orders", `Orders (${openCount(standardOrders)})`],
    ["preorders", `Pre-orders (${openCount(preOrders)})`],
    ["transactions", "Transactions"],
    ["customers", "Users"],
    ["waitlist", "Waitlist"],
    ["codes", "10% sign-ups"],
  ];

  // --------------------------------------------------
  // DELIVERY CELL (one order)
  // --------------------------------------------------

  function renderDelivery(o: Order) {
    const id = o.id ?? o.reference;
    const refreshing = busyId === id;

    if (o.delivery_status === "BOOKING" && !o.delivery_id) {
      return (
        <p className="flex items-center gap-2 text-xs text-[#7A5B1E]">
          <Loader2 size={13} className="animate-spin" /> Booking delivery…
        </p>
      );
    }

    if (!o.delivery_id) {
      return (
        <div>
          <p className="text-xs text-[#89766A]">
            {["paid", "paid_unverified"].includes(o.status)
              ? `Ready to book (${o.delivery_speed === "express" ? "Express" : "Regular"})`
              : o.status === "fulfilled" || o.status === "cleared"
              ? "No delivery booked"
              : "Waiting for payment"}
          </p>
          {o.delivery_error && (
            <p className="mt-2 max-w-[220px] text-[11px] leading-4 text-[#8A3434]">
              {o.delivery_error}
            </p>
          )}
        </div>
      );
    }

    const status = o.delivery_status ?? "PENDING";
    const rider = o.delivery_rider;

    return (
      <div className="space-y-2 text-xs">
        <span
          className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide ${
            DELIVERY_STYLE[status] ?? DELIVERY_STYLE.PENDING
          }`}
        >
          {status.replace(/_/g, " ")}
        </span>
        <span className="ml-2 text-[10px] tracking-wide text-[#9A8061]">
          {o.delivery_speed === "express" ? "EXPRESS" : "REGULAR"}
        </span>

        {status === "SENDER_CANCELLED" && (
          <p className="text-[11px] leading-4 text-[#8A3434]">Cancelled. ROUTAG refunds the delivery charge. You can book again.</p>
        )}

        {rider?.name ? (
          <p className="leading-5 text-[#5A4037]">
            {rider.name}
            {rider.phone && (
              <>
                <br />
                <a href={`tel:${rider.phone}`} className="text-[#4B165C] underline">
                  {rider.phone}
                </a>
              </>
            )}
            {rider.vehicle ? ` · ${rider.vehicle}` : ""}
          </p>
        ) : (
          <p className="text-[#89766A]">No rider yet</p>
        )}

        {o.delivery_eta && status !== "DELIVERED" && (
          <p className="text-[#89766A]">ETA {fmtDate(o.delivery_eta)}</p>
        )}

        {typeof o.delivery_fee === "number" && (
          <p className="text-[#89766A]">
            Courier {ngn(o.delivery_fee)} · customer paid {ngn(o.shipping)}
          </p>
        )}

        {o.delivery_code && (
          <p className="text-[#5A4037]">
            Code <span className="font-mono tracking-widest text-[#4B165C]">{o.delivery_code}</span>
          </p>
        )}

        {o.delivery_error && (
          <p className="max-w-[220px] text-[11px] leading-4 text-[#8A3434]">{o.delivery_error}</p>
        )}

        <div className="flex flex-wrap gap-2 pt-1">
          <button
            type="button"
            disabled={refreshing}
            onClick={() => void syncDelivery(o)}
            className={`${btn} inline-flex items-center gap-1 border-[#CDBBAA] text-[#6D594D] hover:border-[#4B165C]`}
          >
            <RefreshCw size={12} className={refreshing ? "animate-spin" : ""} /> UPDATE
          </button>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // REUSABLE ORDERS PANEL (used by Orders and Pre-orders)
  // --------------------------------------------------

  function renderOrdersPanel(kind: OrderKind, list: Order[]) {
    const isPre = kind === "preorders";

    return (
      <div className="mt-6">
        {isPre && (
          <p className="mb-4 border border-[#D9C5A4] bg-[#F7F2EA] px-4 py-3 text-xs leading-6 text-[#7A685E]">
            Pre-orders are reserved pieces paid for in advance. Mark them paid
            once payment is confirmed. When the stock has arrived, press Book
            delivery. Delivered orders are marked fulfilled automatically.
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search name, email, reference, product…"
            className="min-h-12 min-w-[240px] flex-1 border border-[#D8C8B7] bg-[#F7F2EA] px-4 text-sm outline-none focus:border-[#4B165C]"
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as typeof filter)}
            className="min-h-12 border border-[#D8C8B7] bg-[#F7F2EA] px-4 text-xs outline-none focus:border-[#4B165C]"
          >
            <option value="active">
              {isPre ? "Active pre-orders" : "Active orders"}
            </option>
            <option value="all">Everything</option>

            {(Object.keys(STATUS_STYLE) as OrderStatus[]).map((s) => (
              <option key={s} value={s}>
                {s.replace(/_/g, " ")}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={() => void clearFulfilled(kind)}
            className={`${btn} min-h-12 border-[#4B165C] text-[#4B165C] hover:bg-[#4B165C] hover:text-white`}
          >
            CLEAR ALL FULFILLED
          </button>
        </div>

        <div className="mt-5 overflow-x-auto border border-[#E6D9CA] bg-[#FBF7F0]">
          <table className="w-full min-w-[1080px]">
            <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
              <tr>
                <th className={th}>{isPre ? "PRE-ORDER" : "ORDER"}</th>
                <th className={th}>CUSTOMER</th>
                <th className={th}>
                  {isPre ? "PRODUCTS RESERVED" : "PRODUCTS BOUGHT"}
                </th>
                <th className={th}>TOTAL</th>
                <th className={th}>STATUS</th>
                <th className={th}>DELIVERY</th>
                <th className={th}>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {list.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
                  >
                    {isPre ? "No pre-orders here yet." : "No orders here yet."}
                  </td>
                </tr>
              )}

              {list.map((o) => {
                const id = o.id ?? o.reference;
                const expanded = open === id;
                const canBook =
                  ["paid", "paid_unverified"].includes(o.status) &&
                  (!o.delivery_id || o.delivery_status === "SENDER_CANCELLED") &&
                  o.delivery_status !== "BOOKING";

                return (
                  <tr
                    key={id}
                    className="border-b border-[#EFE6DC] last:border-0"
                  >
                    <td className={td}>
                      <p className="font-mono text-xs text-[#4B165C]">
                        {o.reference}
                      </p>

                      <p className="mt-1 text-[11px] text-[#89766A]">
                        {fmtDate(o.created_at)}
                      </p>

                      <p className="mt-1 text-[11px] uppercase tracking-wider text-[#9A8061]">
                        {o.method}
                      </p>
                    </td>

                    <td className={td}>
                      <p className="font-medium">{o.customer_name}</p>

                      <p className="text-xs text-[#89766A]">{o.email}</p>

                      <p className="text-xs text-[#89766A]">{o.phone}</p>

                      {expanded && (
                        <p className="mt-2 text-xs leading-5 text-[#7A685E]">
                          {o.address}, {o.city}, {o.state}
                        </p>
                      )}
                    </td>

                    <td className={td}>
                      <button
                        type="button"
                        onClick={() => setOpen(expanded ? null : id)}
                        className="flex items-center gap-1 text-left text-xs text-[#4B165C]"
                      >
                        {o.items.reduce((n, i) => n + i.quantity, 0)} item(s)
                        <ChevronDown
                          size={13}
                          className={expanded ? "rotate-180" : ""}
                        />
                      </button>

                      {(expanded ? o.items : o.items.slice(0, 2)).map((i) => (
                        <p key={i.id} className="mt-1 text-xs text-[#6D594D]">
                          {i.quantity} × {i.name}
                        </p>
                      ))}

                      {!expanded && o.items.length > 2 && (
                        <p className="mt-1 text-xs text-[#9A8061]">
                          +{o.items.length - 2} more
                        </p>
                      )}

                      {o.discount_code && (
                        <p className="mt-2 text-[11px] text-[#7D8768]">
                          Code {o.discount_code}
                        </p>
                      )}
                    </td>

                    <td
                      className={`${td} whitespace-nowrap font-serif text-lg text-[#4B165C]`}
                    >
                      {ngn(o.total)}
                    </td>

                    <td className={td}>
                      <span
                        className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide ${STATUS_STYLE[o.status]}`}
                      >
                        {o.status.replace(/_/g, " ").toUpperCase()}
                      </span>
                    </td>

                    <td className={td}>{renderDelivery(o)}</td>

                    <td className={td}>
                      {busyId === id ? (
                        <Loader2
                          size={16}
                          className="animate-spin text-[#4B165C]"
                        />
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {[
                            "awaiting_transfer",
                            "transfer_reported",
                            "pending",
                          ].includes(o.status) && (
                            <button
                              type="button"
                              onClick={() => o.id && void act(o.id, "paid")}
                              className={`${btn} border-[#7D8768] text-[#4D5C3A] hover:bg-[#7D8768] hover:text-white`}
                            >
                              <Check size={12} className="mr-1 inline" />
                              MARK PAID
                            </button>
                          )}

                          {canBook && (
                            <button
                              type="button"
                              onClick={() => void book(o)}
                              className={`${btn} border-[#2F4D66] text-[#2F4D66] hover:bg-[#2F4D66] hover:text-white`}
                            >
                              <Truck size={12} className="mr-1 inline" />
                              {o.delivery_error || o.delivery_status === "SENDER_CANCELLED" ? "BOOK AGAIN" : "BOOK DELIVERY"}
                            </button>
                          )}

                          {["paid", "paid_unverified"].includes(o.status) && (
                            <button
                              type="button"
                              onClick={() =>
                                o.id && void act(o.id, "fulfilled")
                              }
                              className={`${btn} border-[#4B165C] text-[#4B165C] hover:bg-[#4B165C] hover:text-white`}
                            >
                              FULFILLED
                            </button>
                          )}

                          {!["cleared", "cancelled"].includes(o.status) && (
                            <button
                              type="button"
                              onClick={() => o.id && void act(o.id, "cleared")}
                              className={`${btn} border-[#B99A62] text-[#7A5B1E] hover:bg-[#B99A62] hover:text-white`}
                            >
                              CLEAR
                            </button>
                          )}

                          <button
                            type="button"
                            onClick={() => o.id && void remove(o.id)}
                            aria-label="Delete order"
                            className={`${btn} border-[#D9A6A6] text-[#8A3434] hover:bg-[#8A3434] hover:text-white`}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // CHECKING ADMIN ACCESS
  // --------------------------------------------------

  if (gate === "checking") {
    return (
      <section className="flex min-h-[70vh] flex-col items-center justify-center bg-[#FBF7F0] pt-32">
        <Loader2 size={30} className="animate-spin text-[#4B165C]" />

        <p className="mt-5 text-[10px] tracking-[0.2em] text-[#89766A]">
          VERIFYING ADMIN ACCESS
        </p>
      </section>
    );
  }

  // --------------------------------------------------
  // ACCESS DENIED
  // --------------------------------------------------

  if (gate === "denied") {
    return (
      <section className="flex min-h-[75vh] items-center justify-center bg-[#FBF7F0] px-5 pb-24 pt-36">
        <div className="w-full max-w-lg text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EFE6DC]">
            <ShieldAlert size={28} className="text-[#4B165C]" />
          </div>

          <Eyebrow>RESTRICTED AREA</Eyebrow>

          <h1 className="mt-5 font-serif text-4xl italic text-[#4B165C] sm:text-5xl">
            Admin access only.
          </h1>

          <p className="mx-auto mt-5 max-w-md text-sm leading-7 text-[#7A685E]">
            {who
              ? `You're currently signed in as ${who}, but this email address has not been authorised for The Soft Edit administration.`
              : "You need to sign in with your authorised administrator account to access this dashboard."}
          </p>

          {authError && (
            <p className="mt-4 border border-[#E3B9B9] bg-[#FBEDED] px-4 py-3 text-xs text-[#8A3434]">
              {authError}
            </p>
          )}

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <button
              type="button"
              onClick={() => go("/admin/login")}
              className="bg-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition hover:bg-[#351043]"
            >
              ADMIN SIGN IN
            </button>

            <button
              type="button"
              onClick={() => void checkAdmin()}
              className="border border-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition hover:bg-[#4B165C] hover:text-white"
            >
              TRY AGAIN
            </button>

            <button
              type="button"
              onClick={() => go("/")}
              className="border border-[#D8C8B7] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#6D594D] transition hover:bg-[#EFE6DC]"
            >
              BACK TO STORE
            </button>
          </div>
        </div>
      </section>
    );
  }

  // --------------------------------------------------
  // ADMIN DASHBOARD
  // --------------------------------------------------

  return (
    <section className="min-h-screen bg-[#FBF7F0] px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[1400px]">
        {/* HEADER */}

        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>ADMIN</Eyebrow>

            <h1 className="mt-3 font-serif text-4xl text-[#4B165C] sm:text-5xl">
              The Soft Edit <em className="text-[#9A8061]">dashboard</em>
            </h1>

            <p className="mt-2 text-xs text-[#89766A]">Signed in as {who}</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {wallet !== null && (
              <div
                title="RouTag delivery wallet balance"
                className={`flex items-center gap-2 border px-4 py-3 text-xs ${
                  wallet < LOW_WALLET
                    ? "border-[#E3B9B9] bg-[#FBEDED] text-[#8A3434]"
                    : "border-[#E6D9CA] bg-[#F7F2EA] text-[#4B165C]"
                }`}
              >
                <Wallet size={14} />
                RouTag wallet {ngn(wallet)}
                {wallet < LOW_WALLET && <span className="font-semibold">· LOW, TOP UP</span>}
              </div>
            )}

            <button
              type="button"
              onClick={() => void load()}
              disabled={loading}
              className="flex items-center gap-2 border border-[#4B165C] px-5 py-3 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] transition hover:bg-[#4B165C] hover:text-white disabled:opacity-50"
            >
              <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
              REFRESH
            </button>
          </div>
        </div>

        {/* ERROR MESSAGE */}

        {error && (
          <p
            role="alert"
            className="mt-5 border border-[#E3B9B9] bg-[#FBEDED] px-4 py-3 text-xs text-[#8A3434]"
          >
            {error}
          </p>
        )}

        {/* STATISTICS */}

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            [`${stats.prefix}Revenue (paid)`, ngn(stats.revenue)],
            [`${stats.prefix}Paid orders`, String(stats.paidCount)],
            ["Awaiting transfer", String(stats.awaiting)],
            [`Open ${tab === "preorders" ? "pre-orders" : "orders"}`, String(stats.open)],
          ].map(([label, value]) => (
            <div
              key={label}
              className="border border-[#E6D9CA] bg-[#F7F2EA] p-5"
            >
              <p className="text-[10px] tracking-[0.16em] text-[#7D8768]">
                {label.toUpperCase()}
              </p>

              <p className="mt-2 font-serif text-2xl text-[#4B165C] sm:text-3xl">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* NAVIGATION TABS */}

        <div className="mt-8 flex flex-wrap gap-2 border-b border-[#E6D9CA] pb-4">
          {TABS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full border px-5 py-2.5 text-xs transition-all ${
                tab === id
                  ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]"
                  : "border-[#CDBBAA] text-[#6D594D] hover:border-[#4B165C]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ORDERS */}
        {tab === "orders" && renderOrdersPanel("orders", shownOrders)}

        {/* PRE-ORDERS */}
        {tab === "preorders" && renderOrdersPanel("preorders", shownPreorders)}

        {/* TRANSACTIONS */}

        {tab === "transactions" && (
          <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
            <table className="w-full min-w-[760px]">
              <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
                <tr>
                  <th className={th}>DATE</th>
                  <th className={th}>USERNAME</th>
                  <th className={th}>PRODUCTS</th>
                  <th className={th}>TYPE</th>
                  <th className={th}>METHOD</th>
                  <th className={th}>AMOUNT</th>
                  <th className={th}>STATUS</th>
                </tr>
              </thead>

              <tbody>
                {orders
                  .filter((o) => PAID.includes(o.status))
                  .map((o) => (
                    <tr
                      key={o.id ?? o.reference}
                      className="border-b border-[#EFE6DC] last:border-0"
                    >
                      <td className={td}>
                        {fmtDate(o.paid_at ?? o.created_at)}
                      </td>

                      <td className={td}>
                        {o.customer_name}
                        <p className="text-xs text-[#89766A]">{o.email}</p>
                      </td>

                      <td className={td}>
                        {o.items
                          .map((i) => `${i.quantity}× ${i.name}`)
                          .join(", ")}
                      </td>

                      <td className={td}>
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide ${
                            isPreorder(o)
                              ? "bg-[#4B165C] text-white"
                              : "bg-[#EFE6DC] text-[#6D594D]"
                          }`}
                        >
                          {isPreorder(o) ? "PRE-ORDER" : "ORDER"}
                        </span>
                      </td>

                      <td className={`${td} uppercase`}>{o.method}</td>

                      <td className={`${td} font-serif text-lg text-[#4B165C]`}>
                        {ngn(o.total)}
                      </td>

                      <td className={td}>
                        <span
                          className={`rounded-full px-3 py-1 text-[10px] font-semibold ${STATUS_STYLE[o.status]}`}
                        >
                          {o.status.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))}

                {orders.every((o) => !PAID.includes(o.status)) && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
                    >
                      No transactions yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* CUSTOMERS */}

        {tab === "customers" && (
          <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
            <table className="w-full min-w-[720px]">
              <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
                <tr>
                  <th className={th}>NAME</th>
                  <th className={th}>EMAIL</th>
                  <th className={th}>PHONE</th>
                  <th className={th}>ORDERS</th>
                  <th className={th}>PRE-ORDERS</th>
                  <th className={th}>TOTAL SPENT</th>
                  <th className={th}>LAST ORDER</th>
                </tr>
              </thead>

              <tbody>
                {customers.map((c) => (
                  <tr
                    key={c.email}
                    className="border-b border-[#EFE6DC] last:border-0"
                  >
                    <td className={td}>{c.name}</td>
                    <td className={td}>{c.email}</td>
                    <td className={td}>{c.phone}</td>
                    <td className={td}>{c.orders}</td>
                    <td className={td}>{c.preorders}</td>

                    <td className={`${td} font-serif text-lg text-[#4B165C]`}>
                      {ngn(c.spent)}
                    </td>

                    <td className={td}>{fmtDate(c.last)}</td>
                  </tr>
                ))}

                {customers.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
                    >
                      No customers yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* WAITLIST */}

        {tab === "waitlist" && (
          <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
            <table className="w-full min-w-[560px]">
              <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
                <tr>
                  <th className={th}>NAME</th>
                  <th className={th}>EMAIL</th>
                  <th className={th}>INTERESTED IN</th>
                  <th className={th}>JOINED</th>
                </tr>
              </thead>

              <tbody>
                {waitlist.map((w) => (
                  <tr
                    key={w.id}
                    className="border-b border-[#EFE6DC] last:border-0"
                  >
                    <td className={td}>{w.name}</td>
                    <td className={td}>{w.email}</td>
                    <td className={td}>{w.interest ?? "—"}</td>
                    <td className={td}>{fmtDate(w.created_at)}</td>
                  </tr>
                ))}

                {waitlist.length === 0 && (
                  <tr>
                    <td
                      colSpan={4}
                      className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
                    >
                      Nobody on the waitlist yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {/* DISCOUNT SIGN-UPS */}

        {tab === "codes" && (
          <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
            <table className="w-full min-w-[560px]">
              <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
                <tr>
                  <th className={th}>NAME</th>
                  <th className={th}>EMAIL</th>
                  <th className={th}>CODE</th>
                  <th className={th}>USED</th>
                  <th className={th}>SENT</th>
                </tr>
              </thead>

              <tbody>
                {codes.map((c) => (
                  <tr
                    key={c.id}
                    className="border-b border-[#EFE6DC] last:border-0"
                  >
                    <td className={td}>{c.name}</td>
                    <td className={td}>{c.email}</td>

                    <td className={`${td} font-mono text-xs`}>{c.code}</td>

                    <td className={td}>{c.used ? "Yes" : "No"}</td>

                    <td className={td}>{fmtDate(c.created_at)}</td>
                  </tr>
                ))}

                {codes.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]"
                    >
                      No sign-ups yet.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}