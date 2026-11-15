
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  PackageCheck,
  RefreshCw,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { supabase } from "../lib/supabase";

type OrderRecord = Record<string, unknown> & {
  id?: string | number;
  created_at?: string;
  status?: string;
  total?: number | string;
  total_amount?: number | string;
  items?: unknown;
  order_items?: unknown;
};

const currency = (value: unknown) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

const prettyDate = (value: unknown) => {
  if (!value) return "Date not provided";

  const date = new Date(String(value));

  return Number.isNaN(date.getTime())
    ? String(value)
    : new Intl.DateTimeFormat("en-NG", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(date);
};

const humanStatus = (value: unknown) =>
  String(value || "Order received")
    .replace(/[_-]/g, " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());

export default function MyOrdersPage({
  onBackToShop,
}: {
  onBackToShop: () => void;
}) {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState<string | number | null>(null);

  async function loadOrders() {
    setLoading(true);
    setError("");

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      setError("Please sign in to view your order history.");
      setLoading(false);
      return;
    }

    const { data, error: queryError } = await supabase
      .from("orders")
      .select("*")
      .eq("customer_id", user.id);

    if (queryError) {
      setError(
        "We couldn't load your orders. Please confirm that your Supabase 'orders' table has a customer_id column and that customers can read their own orders."
      );
      setLoading(false);
      return;
    }

    const rows = (data ?? []) as OrderRecord[];

    rows.sort(
      (a, b) =>
        new Date(String(b.created_at || 0)).getTime() -
        new Date(String(a.created_at || 0)).getTime()
    );

    setOrders(rows);
    setLoading(false);
  }

  useEffect(() => {
    void loadOrders();
  }, []);

  const orderCount = orders.length;

  const totalSpent = useMemo(
    () =>
      orders.reduce(
        (sum, order) =>
          sum + Number(order.total_amount ?? order.total ?? 0),
        0
      ),
    [orders]
  );

  function orderItems(
    order: OrderRecord
  ): Array<Record<string, unknown>> {
    const raw = order.items ?? order.order_items ?? [];

    if (Array.isArray(raw)) {
      return raw as Array<Record<string, unknown>>;
    }

    if (raw && typeof raw === "object") {
      return Object.values(
        raw as Record<string, unknown>
      ).filter(
        (item): item is Record<string, unknown> =>
          !!item && typeof item === "object"
      );
    }

    return [];
  }

  return (
    <main className="min-h-[70vh] bg-[#F7F2EA] text-[#5A4037]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#211625] px-5 py-16 text-[#F7F2EA] sm:px-10 sm:py-24">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-[#B99A62]/20" />

        <div className="relative mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={onBackToShop}
            className="mb-10 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[.18em] text-white/65 transition hover:text-[#E6D3AD]"
          >
            <ArrowLeft size={15} />
            CONTINUE SHOPPING
          </button>

          <p className="text-[10px] font-semibold tracking-[.28em] text-[#D9BE8B]">
            YOUR SOFT EDIT ACCOUNT
          </p>

          <div className="mt-4 flex flex-col justify-between gap-8 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                My <em className="text-[#D9BE8B]">Orders.</em>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                Every thoughtful delivery, gathered in one place. Follow
                your purchases from confirmation through to arrival.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="min-w-32 border border-[#D9BE8B]/25 bg-white/[.04] px-5 py-4">
                <p className="text-[9px] tracking-[.16em] text-white/50">
                  ORDERS PLACED
                </p>
                <p className="mt-2 font-serif text-3xl">
                  {loading ? "—" : orderCount}
                </p>
              </div>

              <div className="min-w-32 border border-[#D9BE8B]/25 bg-white/[.04] px-5 py-4">
                <p className="text-[9px] tracking-[.16em] text-white/50">
                  TOTAL SPENT
                </p>
                <p className="mt-2 font-serif text-xl">
                  {loading ? "—" : currency(totalSpent)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ORDER HISTORY */}
      <section className="mx-auto max-w-[1200px] px-5 py-14 sm:px-10 sm:py-20">
        <div className="mb-8 flex items-center justify-between gap-4 border-b border-[#DCCFC2] pb-5">
          <div>
            <p className="text-[9px] tracking-[.22em] text-[#9A8061]">
              PURCHASE HISTORY
            </p>

            <h2 className="mt-2 font-serif text-3xl text-[#4B165C]">
              Your deliveries
            </h2>
          </div>

          <button
            type="button"
            onClick={() => void loadOrders()}
            disabled={loading}
            className="inline-flex items-center gap-2 text-[10px] font-semibold tracking-[.12em] text-[#4B165C] disabled:opacity-50"
          >
            <RefreshCw
              size={14}
              className={loading ? "animate-spin" : ""}
            />
            REFRESH
          </button>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="flex items-center justify-center gap-3 py-20 text-sm text-[#806D61]">
            <RefreshCw size={18} className="animate-spin" />
            Gathering your orders...
          </div>
        ) : error ? (
          /* ERROR */
          <div className="mx-auto max-w-2xl border border-[#DCCFC2] bg-white/60 p-8 text-center">
            <PackageCheck
              size={28}
              className="mx-auto text-[#9A8061]"
            />

            <h3 className="mt-4 font-serif text-2xl text-[#4B165C]">
              Your order history needs a moment.
            </h3>

            <p className="mt-3 text-sm leading-7 text-[#806D61]">
              {error}
            </p>

            <button
              type="button"
              onClick={() => void loadOrders()}
              className="mt-6 bg-[#4B165C] px-6 py-3 text-[10px] font-semibold tracking-[.15em] text-white"
            >
              TRY AGAIN
            </button>
          </div>
        ) : orders.length === 0 ? (
          /* EMPTY STATE */
          <div className="mx-auto flex max-w-xl flex-col items-center py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EDE3E9] text-[#4B165C]">
              <ShoppingBag size={30} strokeWidth={1.25} />
            </div>

            <p className="mt-8 text-[9px] font-semibold tracking-[.24em] text-[#9A8061]">
              NOTHING HERE JUST YET
            </p>

            <h3 className="mt-3 font-serif text-4xl text-[#4B165C]">
              Your next delivery awaits.
            </h3>

            <p className="mt-4 text-sm leading-7 text-[#806D61]">
              Once you place an order and it is saved to your account,
              you will find its details and status here.
            </p>

            <button
              type="button"
              onClick={onBackToShop}
              className="mt-8 inline-flex items-center gap-3 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[.16em] text-white"
            >
              EXPLORE THE EDIT
              <ArrowUpRight size={15} />
            </button>
          </div>
        ) : (
          /* ORDERS LIST */
          <div className="space-y-5">
            {orders.map((order, index) => {
              const key = order.id ?? index;
              const items = orderItems(order);
              const status = humanStatus(
                order.status ?? order.order_status
              );
              const total =
                order.total_amount ?? order.total ?? order.amount;
              const isOpen = expanded === key;

              return (
                <article
                  key={String(key)}
                  className="overflow-hidden border border-[#E2D7CC] bg-white/65 shadow-[0_12px_35px_rgba(68,43,36,.04)]"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setExpanded(isOpen ? null : key)
                    }
                    className="flex w-full flex-col justify-between gap-4 p-5 text-left sm:flex-row sm:items-center sm:p-7"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EDE3E9] text-[#4B165C]">
                        <PackageCheck size={21} />
                      </div>

                      <div>
                        <p className="text-[9px] tracking-[.16em] text-[#9A8061]">
                          ORDER{" "}
                          {String(
                            order.order_number ??
                              order.id ??
                              `#${index + 1}`
                          )}
                        </p>

                        <p className="mt-1 font-serif text-xl text-[#4B165C]">
                          {prettyDate(
                            order.created_at ?? order.order_date
                          )}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4 sm:gap-8">
                      <span className="rounded-full bg-[#E7EBDD] px-3 py-2 text-[9px] font-semibold tracking-wide text-[#526044]">
                        {status}
                      </span>

                      <span className="font-medium text-[#4B165C]">
                        {currency(total)}
                      </span>

                      <span className="text-xs text-[#9A8061]">
                        {isOpen ? "−" : "+"}
                      </span>
                    </div>
                  </button>

                  {isOpen && (
                    <div className="border-t border-[#E2D7CC] bg-[#FBF8F3] px-5 py-6 sm:px-7">
                      {items.length ? (
                        <div className="space-y-3">
                          {items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="flex items-center justify-between gap-4 border-b border-[#E8DED4] pb-3 text-sm last:border-0"
                            >
                              <div>
                                <p className="font-medium text-[#4B165C]">
                                  {String(
                                    item.name ??
                                      item.product_name ??
                                      item.title ??
                                      `Item ${itemIndex + 1}`
                                  )}
                                </p>

                                <p className="mt-1 text-xs text-[#8A776B]">
                                  Quantity:{" "}
                                  {String(item.quantity ?? 1)}
                                </p>
                              </div>

                              <span className="text-sm">
                                {currency(
                                  item.price ?? item.unit_price ?? 0
                                )}
                              </span>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-[#806D61]">
                          Item details are not included in this order
                          record.
                        </p>
                      )}

                      <div className="mt-5 grid gap-3 text-xs text-[#806D61] sm:grid-cols-2">
                        <p>
                          <span className="font-semibold text-[#4B165C]">
                            Payment:
                          </span>{" "}
                          {humanStatus(
                            order.payment_status ??
                              order.payment_method ??
                              "Not specified"
                          )}
                        </p>

                        <p>
                          <span className="font-semibold text-[#4B165C]">
                            Delivery:
                          </span>{" "}
                          {String(
                            order.delivery_address ??
                              order.shipping_address ??
                              "Address not provided"
                          )}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center gap-2 text-[10px] tracking-wide text-[#7D8768]">
                        <Truck size={15} />
                        Order details supplied by your store account
                      </div>
                    </div>
                  )}
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}
