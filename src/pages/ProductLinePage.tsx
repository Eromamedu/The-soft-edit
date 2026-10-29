import { useMemo, useState } from "react";
import { ArrowUpRight, Search, SlidersHorizontal, X } from "lucide-react";
import { COLLECTIONS, STORE_PRODUCTS, slugify } from "../data/catalog";
import { Eyebrow, ProductCard, Reveal, type CommerceProps } from "../components/ui";

type Sort = "featured" | "low" | "high" | "az";
const PRICE_BANDS: [string, number, number][] = [
  ["Any price", 0, Infinity],
  ["Under ₦10,000", 0, 10000],
  ["₦10,000 – ₦20,000", 10000, 20000],
  ["₦20,000 – ₦40,000", 20000, 40000],
  ["Over ₦40,000", 40000, Infinity],
];

/** Searchable, filterable, sortable grid. Used by the full product line and every collection page. */
export function FilterableGrid({
  fixedCategory,
  onAddToBag,
  saved,
  onToggleSaved,
  go,
}: CommerceProps & { fixedCategory?: string }) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(fixedCategory ?? "All");
  const [sort, setSort] = useState<Sort>("featured");
  const [band, setBand] = useState(0);
  const [onlyNew, setOnlyNew] = useState(false);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    const [, lo, hi] = PRICE_BANDS[band];
    let list = STORE_PRODUCTS.filter((p) => {
      if (fixedCategory && p.category !== fixedCategory) return false;
      if (!fixedCategory && cat !== "All" && p.category !== cat) return false;
      if (term && !`${p.name} ${p.category} ${p.tag ?? ""}`.toLowerCase().includes(term)) return false;
      if (p.price < lo || p.price >= hi) return false;
      if (onlyNew && p.tag !== "NEW") return false;
      return true;
    });
    if (sort === "low") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "high") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "az") list = [...list].sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [q, cat, sort, band, onlyNew, fixedCategory]);

  const hasFilters = q || (!fixedCategory && cat !== "All") || band !== 0 || onlyNew || sort !== "featured";

  function reset() {
    setQ("");
    setCat(fixedCategory ?? "All");
    setSort("featured");
    setBand(0);
    setOnlyNew(false);
  }

  const select =
    "min-h-12 border border-[#D8C8B7] bg-[#F7F2EA] px-4 text-xs text-[#5A4037] outline-none transition-colors focus:border-[#4B165C]";

  return (
    <div>
      <div className="border-y border-[#E6D9CA] py-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <label className="relative flex-1">
            <span className="sr-only">Search products</span>
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-[#9A8061]" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search pots, bags, mirrors, candles…"
              className="min-h-12 w-full border border-[#D8C8B7] bg-[#F7F2EA] pl-11 pr-4 text-sm text-[#5A4037] outline-none transition-all placeholder:text-[#98877D] focus:border-[#4B165C] focus:ring-2 focus:ring-[#4B165C]/10"
            />
          </label>

          <div className="flex flex-wrap items-center gap-3">
            <SlidersHorizontal size={17} className="hidden text-[#9A8061] sm:block" />
            <select aria-label="Price" value={band} onChange={(e) => setBand(Number(e.target.value))} className={select}>
              {PRICE_BANDS.map(([label], i) => (
                <option key={label} value={i}>{label}</option>
              ))}
            </select>
            <select aria-label="Sort" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className={select}>
              <option value="featured">Featured</option>
              <option value="low">Price: low to high</option>
              <option value="high">Price: high to low</option>
              <option value="az">Name: A to Z</option>
            </select>
            <button
              type="button"
              aria-pressed={onlyNew}
              onClick={() => setOnlyNew((v) => !v)}
              className={`min-h-12 border px-5 text-[10px] font-semibold tracking-[0.14em] transition-all duration-300 ${
                onlyNew ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]" : "border-[#D8C8B7] text-[#6D594D] hover:border-[#4B165C] hover:text-[#4B165C]"
              }`}
            >
              NEW IN
            </button>
          </div>
        </div>

        {!fixedCategory && (
          <div className="mt-5 flex flex-wrap gap-2">
            {["All", ...COLLECTIONS.map((c) => c.name)].map((name) => (
              <button
                key={name}
                type="button"
                onClick={() => setCat(name)}
                aria-pressed={cat === name}
                className={`rounded-full border px-4 py-2.5 text-[10px] transition-all duration-300 sm:text-xs ${
                  cat === name
                    ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA] shadow-md"
                    : "border-[#CDBBAA] bg-[#F7F2EA]/60 text-[#6D594D] hover:border-[#4B165C] hover:text-[#4B165C]"
                }`}
              >
                {name}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between py-5 text-xs text-[#89766A]">
        <p>
          Showing <span className="font-semibold text-[#4B165C]">{results.length}</span> lovely{" "}
          {results.length === 1 ? "find" : "finds"}
        </p>
        {hasFilters && (
          <button type="button" onClick={reset} className="flex items-center gap-1.5 text-[#4B165C] underline underline-offset-4">
            <X size={13} /> Clear filters
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <div className="py-20 text-center">
          <p className="font-serif text-3xl italic text-[#4B165C]">Nothing quite like that, yet.</p>
          <p className="mt-3 text-sm text-[#89766A]">Try another word or clear your filters.</p>
          <button type="button" onClick={reset} className="mt-7 border border-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] hover:bg-[#4B165C] hover:text-[#F7F2EA]">
            CLEAR FILTERS
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-3 gap-y-10 sm:gap-x-5 sm:gap-y-14 lg:grid-cols-4">
          {results.map((p, i) => (
            <Reveal key={p.id} delay={(i % 4) * 90}>
              <ProductCard
                product={p}
                variant="overlay"
                onAddToBag={onAddToBag}
                isSaved={saved.includes(p.id)}
                onToggleSaved={onToggleSaved}
                go={go}
              />
            </Reveal>
          ))}
        </div>
      )}
    </div>
  );
}

export default function ProductLinePage(props: CommerceProps) {
  return (
    <section className="relative overflow-hidden bg-[#EFE6DC] px-5 pb-24 pt-36 sm:px-10 sm:pt-44 lg:pb-32">
      <div className="pointer-events-none absolute -right-40 top-24 h-96 w-96 rounded-full border border-[#B99A62]/20" />
      <div className="relative mx-auto max-w-[1500px]">
        <Eyebrow>THE FULL EDIT</Eyebrow>
        <h1 className="mt-6 font-serif text-5xl leading-[1.05] tracking-[-0.045em] text-[#4B165C] sm:text-6xl lg:text-7xl">
          The Soft Edit
          <br />
          <em className="text-[#9A8061]">Product Line.</em>
        </h1>
        <p className="mt-6 max-w-xl text-sm leading-8 text-[#7A685E] sm:text-base">
          Every piece in the store, in one place. Hover for the details, tap the heart to save your favourites.
        </p>

        <div className="mt-12">
          <FilterableGrid {...props} />
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-center gap-4 text-center">
          <span className="h-px w-10 bg-[#B99A62]/70" />
          <p className="font-serif text-lg italic text-[#7D8768]">Live beautifully.</p>
          <span className="h-px w-10 bg-[#B99A62]/70" />
        </div>
        <div className="mt-6 text-center">
          <button type="button" onClick={() => props.go("/collection/" + slugify("Pots"))} className="inline-flex items-center gap-3 text-[10px] font-semibold tracking-[0.16em] text-[#4B165C]">
            BROWSE BY COLLECTION <ArrowUpRight size={15} />
          </button>
        </div>
      </div>
    </section>
  );
}
