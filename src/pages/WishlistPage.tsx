import { useMemo, useState } from "react";
import { Heart, Plus, ShoppingBag, Trash2, ArrowUpRight } from "lucide-react";
import { ngn } from "../data/catalog";
import { AccountShell } from "./AccountShell";

type WishProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  tag?: string;
  color?: string;
};

type Props = {
  /** Every product in the store; saved ids are matched against this list. */
  catalog: WishProduct[];
  saved: number[];
  onToggleSaved: (id: number) => void;
  onAddToBag: (product: WishProduct) => void;
  go: (path: string) => void;
};

type SortKey = "recent" | "low" | "high" | "name";

export default function WishlistPage({ catalog, saved, onToggleSaved, onAddToBag, go }: Props) {
  const [sort, setSort] = useState<SortKey>("recent");
  const [confirmClear, setConfirmClear] = useState(false);

  const items = useMemo(() => {
    const byId = new Map<number, WishProduct>();
    catalog.forEach((p) => {
      if (!byId.has(Number(p.id))) byId.set(Number(p.id), p);
    });

    // Most recently loved first (the saved array is in the order items were added).
    const list = [...saved]
      .reverse()
      .map((id) => byId.get(Number(id)))
      .filter((p): p is WishProduct => Boolean(p));

    if (sort === "low") return [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") return [...list].sort((a, b) => b.price - a.price);
    if (sort === "name") return [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [catalog, saved, sort]);

  const total = items.reduce((sum, p) => sum + p.price, 0);

  function addAllToBag() {
    items.forEach((p) => onAddToBag(p));
  }

  function clearAll() {
    items.forEach((p) => onToggleSaved(p.id));
    setConfirmClear(false);
  }

  return (
    <AccountShell
      active="wishlist"
      eyebrow="YOUR LITTLE COLLECTION"
      title={
        <>
          My wish list,
          <br />
          <em className="text-[#9A8061]">softly saved.</em>
        </>
      }
      description="Everything you've loved, kept in one place. Tap the heart on any product and it appears here."
      go={go}
    >
      {items.length === 0 ? (
        <div className="mx-auto max-w-xl border border-[#E6D9CA] bg-[#FBF7F0] px-6 py-16 text-center sm:px-12">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full border border-[#B99A62]/50 bg-[#EFE6DC] text-[#4B165C]">
            <Heart size={30} strokeWidth={1.2} />
          </div>
          <h2 className="mt-7 font-serif text-3xl leading-tight text-[#4B165C]">
            Nothing saved just yet.
          </h2>
          <p className="mx-auto mt-3 max-w-sm text-sm leading-7 text-[#89766A]">
            Tap the heart on anything you love and it will wait for you here.
          </p>
          <button
            type="button"
            onClick={() => go("/product-line")}
            className="mt-8 inline-flex items-center gap-3 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.14em] text-white transition-colors hover:bg-[#351043]"
          >
            DISCOVER THE EDIT <ArrowUpRight size={15} />
          </button>
        </div>
      ) : (
        <>
          <div className="flex flex-col gap-4 border-b border-[#E6D9CA] pb-6 lg:flex-row lg:items-center lg:justify-between">
            <p className="text-sm text-[#5A4037]">
              <span className="font-serif text-2xl text-[#4B165C]">{items.length}</span>{" "}
              {items.length === 1 ? "saved item" : "saved items"}
              <span className="mx-3 text-[#CDBBAA]">|</span>
              Worth <span className="font-medium">{ngn(total)}</span>
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <label className="sr-only" htmlFor="wishlist-sort">
                Sort wish list
              </label>
              <select
                id="wishlist-sort"
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className="min-h-11 border border-[#CDBBAA] bg-[#FBF7F0] px-4 text-xs text-[#5A4037] outline-none focus:border-[#4B165C]"
              >
                <option value="recent">Recently added</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="name">Name: A to Z</option>
              </select>

              <button
                type="button"
                onClick={addAllToBag}
                className="inline-flex min-h-11 items-center gap-2 bg-[#4B165C] px-5 text-[10px] font-semibold tracking-[0.12em] text-white transition-colors hover:bg-[#351043]"
              >
                <ShoppingBag size={15} /> ADD ALL TO BAG
              </button>

              {confirmClear ? (
                <span className="inline-flex min-h-11 items-center gap-3 border border-[#B99A62] px-4 text-xs text-[#5A4037]">
                  Clear everything?
                  <button type="button" onClick={clearAll} className="font-semibold text-[#4B165C] underline">
                    Yes
                  </button>
                  <button type="button" onClick={() => setConfirmClear(false)} className="text-[#89766A] underline">
                    No
                  </button>
                </span>
              ) : (
                <button
                  type="button"
                  onClick={() => setConfirmClear(true)}
                  className="inline-flex min-h-11 items-center gap-2 border border-[#CDBBAA] px-5 text-[10px] font-semibold tracking-[0.12em] text-[#6D594D] transition-colors hover:border-[#4B165C] hover:text-[#4B165C]"
                >
                  <Trash2 size={14} /> CLEAR ALL
                </button>
              )}
            </div>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-4">
            {items.map((product) => (
              <article key={product.id} className="group min-w-0">
                <div
                  className="relative aspect-[4/5] overflow-hidden"
                  style={{ backgroundColor: product.color || "#E8DCD1" }}
                >
                  <button
                    type="button"
                    onClick={() => go(`/product/${product.id}`)}
                    aria-label={`View ${product.name}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.07]"
                    />
                  </button>

                  {product.tag && (
                    <span className="pointer-events-none absolute left-2 top-2 bg-[#F7F2EA]/95 px-2.5 py-2 text-[7px] font-medium tracking-[0.12em] text-[#4B165C] sm:left-4 sm:top-4 sm:text-[9px]">
                      {product.tag}
                    </span>
                  )}

                  <button
                    type="button"
                    onClick={() => onToggleSaved(product.id)}
                    aria-label={`Remove ${product.name} from wish list`}
                    className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2EA]/95 text-[#4B165C] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
                  >
                    <Heart size={17} strokeWidth={1.5} fill="#4B165C" />
                  </button>

                  <button
                    type="button"
                    onClick={() => onAddToBag(product)}
                    className="absolute inset-x-2 bottom-2 flex items-center justify-center gap-2 bg-[#F7F2EA] px-2 py-3 text-[9px] font-semibold tracking-[0.1em] text-[#4B165C] shadow-sm transition-all duration-500 hover:bg-[#4B165C] hover:text-white sm:inset-x-4 sm:bottom-4 sm:translate-y-3 sm:py-4 sm:text-[10px] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
                  >
                    ADD TO BAG <Plus size={15} />
                  </button>
                </div>

                <div className="pt-4 sm:pt-5">
                  <p className="text-[8px] tracking-[0.12em] text-[#89766A] sm:text-[9px]">
                    {product.category}
                  </p>
                  <h3 className="mt-2 font-serif text-lg leading-snug text-[#4B165C] sm:text-xl">
                    {product.name}
                  </h3>
                  <p className="mt-3 text-sm font-medium text-[#5A4037]">{ngn(product.price)}</p>
                  <div className="mt-4 h-px w-full bg-[#D8C8B7]" />
                </div>
              </article>
            ))}
          </div>
        </>
      )}
    </AccountShell>
  );
}
