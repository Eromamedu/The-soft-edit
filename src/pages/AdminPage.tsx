import { useCallback, useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, Loader2, RefreshCw, Trash2 } from "lucide-react";
import {
  deleteOrder,
  fetchDiscountSignups,
  fetchOrders,
  fetchWaitlist,
  isAdminSession,
  setOrderStatus,
  type Order,
  type OrderStatus,
} from "../lib/api";
import { ngn } from "../data/catalog";
import { Eyebrow, type Go } from "../components/ui";

type Tab = "orders" | "transactions" | "customers" | "waitlist" | "codes";

const PAID: OrderStatus[] = ["paid", "paid_unverified", "fulfilled", "cleared"];

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

const fmtDate = (s?: string) => (s ? new Date(s).toLocaleString("en-NG", { dateStyle: "medium", timeStyle: "short" }) : "—");

export default function AdminPage({ go }: { go: Go }) {
  const [gate, setGate] = useState<"checking" | "denied" | "ok">("checking");
  const [who, setWho] = useState<string | null>(null);
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [waitlist, setWaitlist] = useState<Awaited<ReturnType<typeof fetchWaitlist>>>([]);
  const [codes, setCodes] = useState<Awaited<ReturnType<typeof fetchDiscountSignups>>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState<"active" | "all" | OrderStatus>("active");
  const [open, setOpen] = useState<string | null>(null);
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [o, w, c] = await Promise.all([fetchOrders(), fetchWaitlist(), fetchDiscountSignups()]);
      setOrders(o);
      setWaitlist(w);
      setCodes(c);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not load data.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void isAdminSession().then((r) => {
      setWho(r.email);
      setGate(r.ok ? "ok" : "denied");
      if (r.ok) void load();
    });
  }, [load]);

  async function act(id: string, status: OrderStatus) {
    setBusyId(id);
    try {
      await setOrderStatus(id, status);
      setOrders((list) => list.map((o) => (o.id === id ? { ...o, status } : o)));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Update failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function remove(id: string) {
    if (!window.confirm("Delete this order permanently? This cannot be undone.")) return;
    setBusyId(id);
    try {
      await deleteOrder(id);
      setOrders((list) => list.filter((o) => o.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : "Delete failed.");
    } finally {
      setBusyId(null);
    }
  }

  async function clearFulfilled() {
    const targets = orders.filter((o) => o.status === "fulfilled" && o.id);
    if (!targets.length) return;
    if (!window.confirm(`Clear ${targets.length} fulfilled order(s)?`)) return;
    for (const o of targets) await act(o.id!, "cleared");
  }

  const stats = useMemo(() => {
    const paid = orders.filter((o) => PAID.includes(o.status));
    return {
      revenue: paid.reduce((n, o) => n + o.total, 0),
      paidCount: paid.length,
      awaiting: orders.filter((o) => o.status === "awaiting_transfer" || o.status === "transfer_reported").length,
      open: orders.filter((o) => !["cleared", "cancelled"].includes(o.status)).length,
    };
  }, [orders]);

  const shownOrders = useMemo(() => {
    const term = q.trim().toLowerCase();
    return orders.filter((o) => {
      if (filter === "active" && ["cleared", "cancelled"].includes(o.status)) return false;
      if (filter !== "active" && filter !== "all" && o.status !== filter) return false;
      if (!term) return true;
      return `${o.reference} ${o.customer_name} ${o.email} ${o.phone} ${o.items.map((i) => i.name).join(" ")}`
        .toLowerCase()
        .includes(term);
    });
  }, [orders, q, filter]);

  const customers = useMemo(() => {
    const map = new Map<string, { name: string; email: string; phone: string; orders: number; spent: number; last: string }>();
    for (const o of orders) {
      const c = map.get(o.email) ?? { name: o.customer_name, email: o.email, phone: o.phone, orders: 0, spent: 0, last: o.created_at ?? "" };
      c.orders += 1;
      if (PAID.includes(o.status)) c.spent += o.total;
      if ((o.created_at ?? "") > c.last) c.last = o.created_at ?? "";
      map.set(o.email, c);
    }
    return [...map.values()].sort((a, b) => b.spent - a.spent);
  }, [orders]);

  /* ---------- gates ---------- */
  if (gate === "checking") {
    return (
      <section className="flex min-h-[70vh] items-center justify-center bg-[#FBF7F0] pt-32">
        <Loader2 className="animate-spin text-[#4B165C]" />
      </section>
    );
  }

  if (gate === "denied") {
    return (
      <section className="bg-[#FBF7F0] px-5 pb-32 pt-48 text-center">
        <h1 className="font-serif text-5xl italic text-[#4B165C]">Admin access only.</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#7A685E]">
          {who ? `You're signed in as ${who}, which isn't an admin account.` : "Please sign in with the admin account to continue."}
        </p>
        <div className="mt-8 flex justify-center gap-3">
          <a href="/login" className="bg-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-white hover:bg-[#351043]">SIGN IN</a>
          <button type="button" onClick={() => go("/")} className="border border-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] hover:bg-[#4B165C] hover:text-white">BACK TO STORE</button>
        </div>
      </section>
    );
  }

  const th = "px-4 py-3 text-left text-[10px] font-semibold tracking-[0.14em] text-[#7D8768]";
  const td = "px-4 py-4 align-top text-sm text-[#5A4037]";
  const btn = "border px-3 py-2 text-[10px] font-semibold tracking-[0.1em] transition-colors disabled:opacity-50";

  const TABS: [Tab, string][] = [
    ["orders", "Orders"],
    ["transactions", "Transactions"],
    ["customers", "Users"],
    ["waitlist", "Waitlist"],
    ["codes", "10% sign-ups"],
  ];

  return (
    <section className="bg-[#FBF7F0] px-4 pb-24 pt-32 sm:px-8 sm:pt-40">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <Eyebrow>ADMIN</Eyebrow>
            <h1 className="mt-3 font-serif text-4xl text-[#4B165C] sm:text-5xl">The Soft Edit <em className="text-[#9A8061]">dashboard</em></h1>
            <p className="mt-2 text-xs text-[#89766A]">Signed in as {who}</p>
          </div>
          <button type="button" onClick={() => void load()} className="flex items-center gap-2 border border-[#4B165C] px-5 py-3 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] hover:bg-[#4B165C] hover:text-white">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> REFRESH
          </button>
        </div>

        {error && <p role="alert" className="mt-5 border border-[#E3B9B9] bg-[#FBEDED] px-4 py-3 text-xs text-[#8A3434]">{error}</p>}

        <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {[
            ["Revenue (paid)", ngn(stats.revenue)],
            ["Paid orders", String(stats.paidCount)],
            ["Awaiting transfer", String(stats.awaiting)],
            ["Open orders", String(stats.open)],
          ].map(([l, v]) => (
            <div key={l} className="border border-[#E6D9CA] bg-[#F7F2EA] p-5">
              <p className="text-[10px] tracking-[0.16em] text-[#7D8768]">{l.toUpperCase()}</p>
              <p className="mt-2 font-serif text-2xl text-[#4B165C] sm:text-3xl">{v}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-[#E6D9CA] pb-4">
          {TABS.map(([id, label]) => (
            <button
              key={id}
              type="button"
              onClick={() => setTab(id)}
              className={`rounded-full border px-5 py-2.5 text-xs transition-all ${
                tab === id ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]" : "border-[#CDBBAA] text-[#6D594D] hover:border-[#4B165C]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ORDERS */}
        {tab === "orders" && (
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name, email, reference, product…" className="min-h-12 min-w-[240px] flex-1 border border-[#D8C8B7] bg-[#F7F2EA] px-4 text-sm outline-none focus:border-[#4B165C]" />
              <select value={filter} onChange={(e) => setFilter(e.target.value as typeof filter)} className="min-h-12 border border-[#D8C8B7] bg-[#F7F2EA] px-4 text-xs outline-none focus:border-[#4B165C]">
                <option value="active">Active orders</option>
                <option value="all">Everything</option>
                {(Object.keys(STATUS_STYLE) as OrderStatus[]).map((s) => (
                  <option key={s} value={s}>{s.replace(/_/g, " ")}</option>
                ))}
              </select>
              <button type="button" onClick={() => void clearFulfilled()} className={`${btn} min-h-12 border-[#4B165C] text-[#4B165C] hover:bg-[#4B165C] hover:text-white`}>
                CLEAR ALL FULFILLED
              </button>
            </div>

            <div className="mt-5 overflow-x-auto border border-[#E6D9CA] bg-[#FBF7F0]">
              <table className="w-full min-w-[860px]">
                <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]">
                  <tr>
                    <th className={th}>ORDER</th><th className={th}>CUSTOMER</th><th className={th}>PRODUCTS BOUGHT</th><th className={th}>TOTAL</th><th className={th}>STATUS</th><th className={th}>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {shownOrders.length === 0 && (
                    <tr><td colSpan={6} className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]">No orders here yet.</td></tr>
                  )}
                  {shownOrders.map((o) => {
                    const id = o.id ?? o.reference;
                    const expanded = open === id;
                    return (
                      <tr key={id} className="border-b border-[#EFE6DC] last:border-0">
                        <td className={td}>
                          <p className="font-mono text-xs text-[#4B165C]">{o.reference}</p>
                          <p className="mt-1 text-[11px] text-[#89766A]">{fmtDate(o.created_at)}</p>
                          <p className="mt-1 text-[11px] uppercase tracking-wider text-[#9A8061]">{o.method}</p>
                        </td>
                        <td className={td}>
                          <p className="font-medium">{o.customer_name}</p>
                          <p className="text-xs text-[#89766A]">{o.email}</p>
                          <p className="text-xs text-[#89766A]">{o.phone}</p>
                          {expanded && <p className="mt-2 text-xs leading-5 text-[#7A685E]">{o.address}, {o.city}, {o.state}</p>}
                        </td>
                        <td className={td}>
                          <button type="button" onClick={() => setOpen(expanded ? null : id)} className="flex items-center gap-1 text-left text-xs text-[#4B165C]">
                            {o.items.reduce((n, i) => n + i.quantity, 0)} item(s) <ChevronDown size={13} className={expanded ? "rotate-180" : ""} />
                          </button>
                          {(expanded ? o.items : o.items.slice(0, 2)).map((i) => (
                            <p key={i.id} className="mt-1 text-xs text-[#6D594D]">{i.quantity} × {i.name}</p>
                          ))}
                          {!expanded && o.items.length > 2 && <p className="mt-1 text-xs text-[#9A8061]">+{o.items.length - 2} more</p>}
                          {o.discount_code && <p className="mt-2 text-[11px] text-[#7D8768]">Code {o.discount_code}</p>}
                        </td>
                        <td className={`${td} whitespace-nowrap font-serif text-lg text-[#4B165C]`}>{ngn(o.total)}</td>
                        <td className={td}>
                          <span className={`inline-block rounded-full px-3 py-1 text-[10px] font-semibold tracking-wide ${STATUS_STYLE[o.status]}`}>
                            {o.status.replace(/_/g, " ").toUpperCase()}
                          </span>
                        </td>
                        <td className={td}>
                          {busyId === id ? (
                            <Loader2 size={16} className="animate-spin text-[#4B165C]" />
                          ) : (
                            <div className="flex flex-wrap gap-2">
                              {["awaiting_transfer", "transfer_reported", "pending"].includes(o.status) && (
                                <button type="button" onClick={() => o.id && void act(o.id, "paid")} className={`${btn} border-[#7D8768] text-[#4D5C3A] hover:bg-[#7D8768] hover:text-white`}>
                                  <Check size={12} className="mr-1 inline" />MARK PAID
                                </button>
                              )}
                              {["paid", "paid_unverified"].includes(o.status) && (
                                <button type="button" onClick={() => o.id && void act(o.id, "fulfilled")} className={`${btn} border-[#4B165C] text-[#4B165C] hover:bg-[#4B165C] hover:text-white`}>FULFILLED</button>
                              )}
                              {!["cleared", "cancelled"].includes(o.status) && (
                                <button type="button" onClick={() => o.id && void act(o.id, "cleared")} className={`${btn} border-[#B99A62] text-[#7A5B1E] hover:bg-[#B99A62] hover:text-white`}>CLEAR</button>
                              )}
                              <button type="button" onClick={() => o.id && void remove(o.id)} aria-label="Delete order" className={`${btn} border-[#D9A6A6] text-[#8A3434] hover:bg-[#8A3434] hover:text-white`}>
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
        )}

        {/* TRANSACTIONS */}
        {tab === "transactions" && (
          <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
            <table className="w-full min-w-[760px]">
              <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]"><tr><th className={th}>DATE</th><th className={th}>USERNAME</th><th className={th}>PRODUCTS</th><th className={th}>METHOD</th><th className={th}>AMOUNT</th><th className={th}>STATUS</th></tr></thead>
              <tbody>
                {orders.filter((o) => PAID.includes(o.status)).map((o) => (
                  <tr key={o.id ?? o.reference} className="border-b border-[#EFE6DC] last:border-0">
                    <td className={td}>{fmtDate(o.paid_at ?? o.created_at)}</td>
                    <td className={td}>{o.customer_name}<p className="text-xs text-[#89766A]">{o.email}</p></td>
                    <td className={td}>{o.items.map((i) => `${i.quantity}× ${i.name}`).join(", ")}</td>
                    <td className={`${td} uppercase`}>{o.method}</td>
                    <td className={`${td} font-serif text-lg text-[#4B165C]`}>{ngn(o.total)}</td>
                    <td className={td}><span className={`rounded-full px-3 py-1 text-[10px] font-semibold ${STATUS_STYLE[o.status]}`}>{o.status.toUpperCase()}</span></td>
                  </tr>
                ))}
                {orders.every((o) => !PAID.includes(o.status)) && <tr><td colSpan={6} className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]">No transactions yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* USERS */}
        {tab === "customers" && (
          <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
            <table className="w-full min-w-[640px]">
              <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]"><tr><th className={th}>NAME</th><th className={th}>EMAIL</th><th className={th}>PHONE</th><th className={th}>ORDERS</th><th className={th}>TOTAL SPENT</th><th className={th}>LAST ORDER</th></tr></thead>
              <tbody>
                {customers.map((c) => (
                  <tr key={c.email} className="border-b border-[#EFE6DC] last:border-0">
                    <td className={td}>{c.name}</td><td className={td}>{c.email}</td><td className={td}>{c.phone}</td>
                    <td className={td}>{c.orders}</td><td className={`${td} font-serif text-lg text-[#4B165C]`}>{ngn(c.spent)}</td><td className={td}>{fmtDate(c.last)}</td>
                  </tr>
                ))}
                {customers.length === 0 && <tr><td colSpan={6} className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]">No customers yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* WAITLIST */}
        {tab === "waitlist" && (
          <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
            <table className="w-full min-w-[560px]">
              <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]"><tr><th className={th}>NAME</th><th className={th}>EMAIL</th><th className={th}>INTERESTED IN</th><th className={th}>JOINED</th></tr></thead>
              <tbody>
                {waitlist.map((w) => (
                  <tr key={w.id} className="border-b border-[#EFE6DC] last:border-0"><td className={td}>{w.name}</td><td className={td}>{w.email}</td><td className={td}>{w.interest ?? "—"}</td><td className={td}>{fmtDate(w.created_at)}</td></tr>
                ))}
                {waitlist.length === 0 && <tr><td colSpan={4} className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]">Nobody on the waitlist yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}

        {/* DISCOUNT SIGNUPS */}
        {tab === "codes" && (
          <div className="mt-6 overflow-x-auto border border-[#E6D9CA]">
            <table className="w-full min-w-[560px]">
              <thead className="border-b border-[#E6D9CA] bg-[#F7F2EA]"><tr><th className={th}>NAME</th><th className={th}>EMAIL</th><th className={th}>CODE</th><th className={th}>USED</th><th className={th}>SENT</th></tr></thead>
              <tbody>
                {codes.map((c) => (
                  <tr key={c.id} className="border-b border-[#EFE6DC] last:border-0"><td className={td}>{c.name}</td><td className={td}>{c.email}</td><td className={`${td} font-mono text-xs`}>{c.code}</td><td className={td}>{c.used ? "Yes" : "No"}</td><td className={td}>{fmtDate(c.created_at)}</td></tr>
                ))}
                {codes.length === 0 && <tr><td colSpan={5} className="px-4 py-14 text-center font-serif text-xl italic text-[#9A8061]">No sign-ups yet.</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}
