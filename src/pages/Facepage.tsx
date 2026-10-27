
import { useMemo, useState } from "react";
import {
  ArrowDown,
  // ArrowLeft,
  // ArrowRight,
  ArrowUpRight,
  Check,
  ChevronDown,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

type FaceCreamProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  tag: string;
  color: string;
};

type FaceCreamCollectionPageProps = {
  onAddToBag: (product: FaceCreamProduct) => void;
  saved: number[];
  onToggleSaved: (id: number) => void;
};

const faceCreamProducts: FaceCreamProduct[] = [
  {
    id: 201,
    name: "The Cloud Cream",
    category: "DAILY MOISTURISER · 50ML",
    price: 18500,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    tag: "BESTSELLER",
    color: "#E9D8C7",
  },
  {
    id: 202,
    name: "Velvet Barrier Cream",
    category: "BARRIER SUPPORT · 50ML",
    price: 22000,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
    tag: "NOURISHING",
    color: "#D9D0C2",
  },
  {
    id: 203,
    name: "Dewdrop Water Cream",
    category: "LIGHTWEIGHT HYDRATION · 50ML",
    price: 16500,
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    tag: "LIGHTWEIGHT",
    color: "#DCE4D8",
  },
  {
    id: 204,
    name: "The Overnight Cocoon",
    category: "NIGHT CREAM · 50ML",
    price: 24500,
    image:
      "https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?auto=format&fit=crop&w=900&q=85",
    tag: "NIGHT RITUAL",
    color: "#D9C9D9",
  },
  {
    id: 205,
    name: "Petal Soft Face Cream",
    category: "DAILY NOURISHMENT · 50ML",
    price: 19500,
    image:
      "https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?auto=format&fit=crop&w=900&q=85",
    tag: "DAILY ESSENTIAL",
    color: "#E8D7D0",
  },
  {
    id: 206,
    name: "Golden Hour Moisture",
    category: "RADIANCE CREAM · 50ML",
    price: 21000,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
    tag: "RADIANCE",
    color: "#E7D9B9",
  },
  {
    id: 207,
    name: "Calm & Comfort Cream",
    category: "COMFORT MOISTURISER · 50ML",
    price: 17500,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    tag: "GENTLE CARE",
    color: "#D7DDD0",
  },
  {
    id: 208,
    name: "The Rich Ritual",
    category: "RICH FACE CREAM · 50ML",
    price: 28500,
    image:
      "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    tag: "THE LUXE EDIT",
    color: "#E5D0B6",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

export default function FaceCreamCollectionPage({
  onAddToBag,
  saved,
  onToggleSaved,
}: FaceCreamCollectionPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [activeFilter, setActiveFilter] = useState("All face creams");
  const [quickView, setQuickView] = useState<FaceCreamProduct | null>(null);
  const [addedProductId, setAddedProductId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filters = [
    "All face creams",
    "Daily moisturisers",
    "Night creams",
    "Lightweight",
    "Rich creams",
  ];

  const filteredProducts = useMemo(() => {
    let result = [...faceCreamProducts];

    if (activeFilter === "Daily moisturisers") {
      result = result.filter((product) =>
        /daily/i.test(product.category),
      );
    } else if (activeFilter === "Night creams") {
      result = result.filter((product) =>
        /night/i.test(product.category),
      );
    } else if (activeFilter === "Lightweight") {
      result = result.filter((product) =>
        /lightweight/i.test(product.category),
      );
    } else if (activeFilter === "Rich creams") {
      result = result.filter((product) =>
        /rich/i.test(product.category),
      );
    }

    const query = searchQuery.trim().toLowerCase();

    if (query) {
      result = result.filter((product) =>
        `${product.name} ${product.category} ${product.tag}`
          .toLowerCase()
          .includes(query),
      );
    }

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeFilter, searchQuery, sortBy]);

  function handleAddToBag(product: FaceCreamProduct) {
    onAddToBag(product);
    setAddedProductId(product.id);

    window.setTimeout(() => {
      setAddedProductId((current) =>
        current === product.id ? null : current,
      );
    }, 1800);
  }

  return (
    <div className="min-h-screen bg-[#F7F2EA] text-[#5A4037]">
      {/* COLLECTION INTRO */}
      <section className="relative overflow-hidden border-b border-[#B99A62]/20 bg-[#EDE3D7]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 -top-32 h-80 w-80 rounded-full bg-[#B99A62]/10 blur-3xl"
        />
        

        <div className="relative mx-auto grid max-w-[1600px] items-center gap-8 px-5 pb-12 pt-12 sm:px-10 sm:pb-16 sm:pt-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-16 lg:pb-20 lg:pt-20">
          <div className="max-w-2xl">
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-[#B99A62]" />
              <p className="text-[10px] font-semibold tracking-[0.25em] text-[#8B6A48]">
                THE MOISTURE EDIT
              </p>
            </div>

            <h1
              className="max-w-[700px] font-serif text-5xl font-normal leading-[1.05] tracking-[-0.055em] text-[#30232F] sm:text-6xl lg:text-[76px]"
              style={{ fontFamily: '"Canosa", Georgia, serif' }}
            >
              A little more
              <span className="block italic text-[#9A7958]">
                love for your skin.
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-sm leading-7 text-[#6E5A50] sm:text-base sm:leading-8">
              Meet your skin's new favourite ritual. Thoughtfully selected
              face creams that bring softness, comfort and everyday
              nourishment to your skincare routine.
            </p>

            <a
              href="#face-cream-products"
              className="group mt-8 inline-flex items-center gap-5 border border-[#4B165C] bg-[#4B165C] px-6 py-4 text-[10px] font-semibold tracking-[0.17em] text-[#F7F2EA] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F]"
            >
              EXPLORE FACE CREAMS
              <ArrowDown
                size={15}
                className="transition-transform duration-300 group-hover:translate-y-1"
              />
            </a>

            <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 border-t border-[#B99A62]/30 pt-6 text-[10px] tracking-[0.12em] text-[#806C5E]">
              <span className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#A17B45]" />
                YOUR DAILY RITUAL
              </span>
              <span className="h-3 w-px bg-[#B99A62]/50" />
              <span>SOFTNESS, EVERY DAY</span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[510px]">
            <div className="absolute -inset-3 rotate-2 border border-[#B99A62]/35" />

            <div className="relative aspect-[4/4.4] overflow-hidden bg-[#D9C7B5]">
              <img
                src={faceCreamProducts[0].image}
                alt="Face cream skincare collection"
                className="h-full w-full object-cover transition-transform duration-1000 hover:scale-[1.04]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/45 via-transparent to-[#30232F]/5" />

              <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 border-t border-white/40 pt-4 text-white sm:bottom-7 sm:left-7 sm:right-7">
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-white/80">
                    A SOFTER SKINCARE RITUAL
                  </p>
                  <p className="mt-1 font-serif text-2xl italic sm:text-3xl">
                    Made for your moments.
                  </p>
                </div>
                <span className="mb-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/60">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </div>

            <div className="absolute -bottom-5 -left-3 hidden bg-[#F7F2EA] px-5 py-4 shadow-[0_10px_35px_rgba(48,35,47,0.10)] sm:block">
              <p className="font-serif text-xl italic text-[#4B165C]">
                Your skin, gently.
              </p>
              <p className="mt-1 text-[9px] tracking-[0.14em] text-[#8B7669]">
                THE SOFT EDIT
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* COLLECTION CONTENT */}
      <section
        id="face-cream-products"
        className="mx-auto max-w-[1600px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16"
      >
        <div className="mb-8 flex flex-col gap-5 border-b border-[#B99A62]/30 pb-7 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-3 text-[9px] font-semibold tracking-[0.23em] text-[#98764E]">
              THE SOFT EDIT COLLECTION
            </p>
            <h2
              className="font-serif text-4xl tracking-[-0.04em] text-[#30232F] sm:text-5xl"
              style={{ fontFamily: '"Canosa", Georgia, serif' }}
            >
              Face creams
              <span className="ml-3 text-2xl italic text-[#A78B70] sm:text-3xl">
                ({filteredProducts.length})
              </span>
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#806C5E]">
              Find the finishing touch to your routine, from featherlight
              hydration to a richer evening ritual.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setActiveFilter("All face creams");
              setSearchQuery("");
              setSortBy("featured");
            }}
            className="self-start text-[10px] tracking-[0.14em] text-[#806C5E] underline decoration-[#B99A62]/60 underline-offset-4 transition-colors hover:text-[#4B165C] md:self-auto"
          >
            RESET COLLECTION
          </button>
        </div>

        {/* SEARCH AND SORT */}
        <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setShowFilters((current) => !current)}
              aria-expanded={showFilters}
              className="inline-flex items-center gap-2 border border-[#B99A62]/50 px-4 py-3 text-[10px] tracking-[0.12em] text-[#4B165C] transition-colors hover:bg-[#4B165C] hover:text-white"
            >
              <SlidersHorizontal size={14} />
              FILTERS
              <ChevronDown
                size={13}
                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>

            <div className="relative min-w-[210px] flex-1 sm:flex-none">
              <Search
                size={15}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#98764E]"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Find your face cream..."
                aria-label="Search face creams"
                className="h-[42px] w-full border border-[#B99A62]/40 bg-transparent pl-9 pr-4 text-xs text-[#5A4037] outline-none transition-colors placeholder:text-[#9A887B] focus:border-[#4B165C] sm:w-[260px]"
              />
            </div>
          </div>

          <label className="flex items-center gap-3 text-[10px] tracking-[0.1em] text-[#806C5E]">
            SORT BY
            <select
              value={sortBy}
              onChange={(event) => setSortBy(event.target.value)}
              className="h-[42px] min-w-[170px] border border-[#B99A62]/40 bg-[#F7F2EA] px-3 text-xs tracking-normal text-[#4B165C] outline-none focus:border-[#4B165C]"
            >
              <option value="featured">Featured</option>
              <option value="price-low">Price: low to high</option>
              <option value="price-high">Price: high to low</option>
              <option value="name">Name: A to Z</option>
            </select>
          </label>
        </div>

        {/* FILTER CHIPS */}
        {showFilters && (
          <div className="mb-7 flex flex-wrap gap-2 border-y border-[#B99A62]/25 py-5">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`border px-4 py-2.5 text-[10px] tracking-[0.08em] transition-all duration-300 ${
                  activeFilter === filter
                    ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]"
                    : "border-[#B99A62]/40 text-[#806C5E] hover:border-[#4B165C] hover:text-[#4B165C]"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        )}

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 md:grid-cols-3 xl:grid-cols-4 xl:gap-x-6">
            {filteredProducts.map((product, index) => {
              const isSaved = saved.includes(product.id);
              const isAdded = addedProductId === product.id;

              return (
                <article
                  key={product.id}
                  className="group min-w-0 animate-in fade-in duration-500"
                >
                  <div
                    className="relative isolate aspect-[4/5] overflow-hidden"
                    style={{ backgroundColor: product.color }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading={index > 3 ? "lazy" : "eager"}
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    />

                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#30232F]/20 via-transparent to-white/5 opacity-70" />

                    <span className="absolute left-2.5 top-2.5 max-w-[75%] bg-[#F7F2EA]/95 px-2.5 py-2 text-[8px] font-semibold tracking-[0.1em] text-[#4B165C] sm:left-4 sm:top-4 sm:px-3 sm:text-[9px]">
                      {product.tag}
                    </span>

                    <button
                      type="button"
                      onClick={() => onToggleSaved(product.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${product.name} from wishlist`
                          : `Save ${product.name} to wishlist`
                      }
                      aria-pressed={isSaved}
                      className={`absolute right-2.5 top-2.5 flex h-9 w-9 items-center justify-center rounded-full border transition-all duration-300 sm:right-4 sm:top-4 sm:h-10 sm:w-10 ${
                        isSaved
                          ? "border-[#4B165C] bg-[#4B165C] text-white"
                          : "border-white/80 bg-[#F7F2EA]/90 text-[#4B165C] hover:border-[#4B165C] hover:bg-[#4B165C] hover:text-white"
                      }`}
                    >
                      <Heart
                        size={16}
                        strokeWidth={1.7}
                        fill={isSaved ? "currentColor" : "none"}
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickView(product)}
                      className="absolute inset-x-2 bottom-2.5 translate-y-2 border border-white/70 bg-[#F7F2EA]/95 py-3 text-[9px] font-semibold tracking-[0.13em] text-[#4B165C] opacity-0 transition-all duration-300 hover:bg-[#4B165C] hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 sm:inset-x-4 sm:bottom-4 sm:py-3.5 sm:text-[10px]"
                    >
                      QUICK VIEW
                    </button>
                  </div>

                  <div className="pt-4 sm:pt-5">
                    <p className="mb-2 text-[8px] tracking-[0.11em] text-[#98764E] sm:text-[9px] sm:tracking-[0.14em]">
                      {product.category}
                    </p>

                    <button
                      type="button"
                      onClick={() => setQuickView(product)}
                      className="text-left font-serif text-base leading-snug text-[#30232F] transition-colors hover:text-[#8B5D78] sm:text-xl"
                    >
                      {product.name}
                    </button>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-semibold text-[#4B165C] sm:text-sm">
                        {formatPrice(product.price)}
                      </p>

                      <button
                        type="button"
                        onClick={() => handleAddToBag(product)}
                        aria-label={`Add ${product.name} to basket`}
                        className={`flex h-9 w-9 items-center justify-center border transition-all duration-300 sm:h-10 sm:w-10 ${
                          isAdded
                            ? "border-[#7D8768] bg-[#7D8768] text-white"
                            : "border-[#B99A62]/50 text-[#4B165C] hover:border-[#4B165C] hover:bg-[#4B165C] hover:text-white"
                        }`}
                      >
                        {isAdded ? (
                          <Check size={16} />
                        ) : (
                          <ShoppingBag size={16} strokeWidth={1.6} />
                        )}
                      </button>
                    </div>

                    {isAdded && (
                      <p className="mt-2 text-[10px] text-[#65724F]">
                        Added to your basket
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="border border-[#B99A62]/30 px-5 py-16 text-center">
            <Search size={25} className="mx-auto text-[#B99A62]" />
            <h3 className="mt-5 font-serif text-2xl text-[#30232F]">
              Nothing found just yet
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#806C5E]">
              Try a different search or choose another collection filter.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setActiveFilter("All face creams");
              }}
              className="mt-5 border border-[#4B165C] bg-[#4B165C] px-5 py-3 text-[10px] tracking-[0.12em] text-white transition-colors hover:bg-[#30232F]"
            >
              VIEW ALL FACE CREAMS
            </button>
          </div>
        )}

        <p className="mt-8 text-center text-[10px] tracking-[0.12em] text-[#987D6B]">
          SHOWING {filteredProducts.length} OF {faceCreamProducts.length} FACE
          CREAMS
        </p>
      </section>

      {/* BRAND PROMISE */}
      <section className="border-y border-[#B99A62]/25 bg-[#EEE5DA]">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-5 py-10 sm:grid-cols-3 sm:px-10 sm:py-12 lg:px-16">
          <div className="text-center">
            <Sparkles size={20} className="mx-auto text-[#A17B45]" />
            <h3 className="mt-3 font-serif text-xl text-[#30232F]">
              Your daily ritual
            </h3>
            <p className="mx-auto mt-2 max-w-[250px] text-xs leading-6 text-[#806C5E]">
              Make a little space in your day for the care you deserve.
            </p>
          </div>

          <div className="text-center">
            <Heart size={20} className="mx-auto text-[#A17B45]" />
            <h3 className="mt-3 font-serif text-xl text-[#30232F]">
              Chosen with care
            </h3>
            <p className="mx-auto mt-2 max-w-[250px] text-xs leading-6 text-[#806C5E]">
              Explore your next skincare favourite at your own pace.
            </p>
          </div>

          <div className="text-center">
            <ArrowUpRight size={20} className="mx-auto text-[#A17B45]" />
            <h3 className="mt-3 font-serif text-xl text-[#30232F]">
              A softer feeling
            </h3>
            <p className="mx-auto mt-2 max-w-[250px] text-xs leading-6 text-[#806C5E]">
              Thoughtful little moments, from the first step to the last.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-[#1C131D]/75 p-4 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setQuickView(null);
            }
          }}
          role="presentation"
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="face-cream-quick-view-title"
            className="relative my-auto grid w-full max-w-[850px] overflow-hidden bg-[#F7F2EA] shadow-[0_30px_100px_rgba(0,0,0,0.3)] sm:grid-cols-2"
          >
            <button
              type="button"
              onClick={() => setQuickView(null)}
              aria-label="Close quick view"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border border-[#B99A62]/40 bg-[#F7F2EA]/95 text-[#4B165C] transition-colors hover:bg-[#4B165C] hover:text-white"
            >
              <X size={18} />
            </button>

            <div
              className="relative min-h-[280px] bg-[#E9D8C7] sm:min-h-[480px]"
              style={{ backgroundColor: quickView.color }}
            >
              <img
                src={quickView.image}
                alt={quickView.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center px-6 py-9 sm:px-9 sm:py-12">
              <p className="text-[9px] tracking-[0.2em] text-[#98764E]">
                {quickView.tag}
              </p>

              <h2
                id="face-cream-quick-view-title"
                className="mt-4 font-serif text-3xl leading-tight text-[#30232F] sm:text-4xl"
              >
                {quickView.name}
              </h2>

              <p className="mt-3 text-[10px] tracking-[0.12em] text-[#98764E]">
                {quickView.category}
              </p>

              <p className="mt-5 text-lg font-semibold text-[#4B165C]">
                {formatPrice(quickView.price)}
              </p>

              <p className="mt-5 text-sm leading-7 text-[#806C5E]">
                A considered addition to your everyday skincare ritual.
                Discover a little moment of care with The Soft Edit.
              </p>

              <button
                type="button"
                onClick={() => {
                  handleAddToBag(quickView);
                  setQuickView(null);
                }}
                className="mt-8 flex w-full items-center justify-center gap-3 bg-[#4B165C] px-5 py-4 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-300 hover:bg-[#30232F]"
              >
                <ShoppingBag size={16} />
                ADD TO BAG — {formatPrice(quickView.price)}
              </button>

              <button
                type="button"
                onClick={() => onToggleSaved(quickView.id)}
                className="mt-4 flex items-center justify-center gap-2 py-2 text-[10px] tracking-[0.12em] text-[#806C5E] transition-colors hover:text-[#4B165C]"
              >
                <Heart
                  size={15}
                  fill={saved.includes(quickView.id) ? "currentColor" : "none"}
                />
                {saved.includes(quickView.id)
                  ? "SAVED TO WISHLIST"
                  : "SAVE TO WISHLIST"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
