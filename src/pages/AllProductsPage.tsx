
import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  ArrowRight,
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

type StoreProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  tag: string;
};

type AllProductsPageProps = {
  onAddToBag: (product: StoreProduct) => void;
  saved: number[];
  onToggleSaved: (id: number) => void;
};

const categories = [
  "All Products",
  "Body Cream",
  "Body Wash",
  "Braid Shower Cap",
  "Cleanser",
  "dishié Glow Oil",
  "dishie Routine Set",
  "Face Cream",
  "Face Wash",
  "Glow Face Mist",
  "Serums",
  "Shower",
  "Sponge",
  "Sunscreen",
  "Toners",
];

const products: StoreProduct[] = [
  {
    id: 501,
    name: "The Glow Elixir Multi-Oil Body Lotion",
    category: "Body Cream",
    price: 26433.6,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    description: "A rich, silky body moisturiser for a soft, luminous-looking finish.",
    tag: "Bestseller",
  },
  {
    id: 502,
    name: "Velvet Skin Body Cream",
    category: "Body Cream",
    price: 24500,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
    description: "A luxurious daily moisturising ritual for supple, comfortable skin.",
    tag: "Daily ritual",
  },
  {
    id: 503,
    name: "The Restorer Mandelic Acid Body Wash",
    category: "Body Wash",
    price: 22468.56,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    description: "A refreshing body-cleansing ritual for smooth, refreshed-feeling skin.",
    tag: "Skin ritual",
  },
  {
    id: 504,
    name: "Silk Touch Hydrating Body Wash",
    category: "Body Wash",
    price: 19500,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    description: "A gentle-feeling cleanse designed to make shower time feel special.",
    tag: "Everyday essential",
  },
  {
    id: 505,
    name: "2 Long Braid & Dread Shower Cap",
    category: "Braid Shower Cap",
    price: 8458.75,
    image: "https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=900&q=85",
    description: "A practical shower accessory for helping protect longer braids and locs.",
    tag: "Hair care",
  },
  {
    id: 506,
    name: "Satin-Lined Shower Cap",
    category: "Braid Shower Cap",
    price: 9500,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    description: "A chic shower accessory for your self-care collection.",
    tag: "Routine essential",
  },
  {
    id: 507,
    name: "Salicylic Acid Face Cleanser 200ml",
    category: "Cleanser",
    price: 22468.56,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
    description: "A targeted cleansing step for a fresh-feeling skincare routine.",
    tag: "Targeted care",
  },
  {
    id: 508,
    name: "dishie’ Snail Facial Cleanser Daily Wash",
    category: "Cleanser",
    price: 19825.2,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    description: "A daily facial cleansing option for a clean, refreshed feeling.",
    tag: "Daily essential",
  },
  {
    id: 509,
    name: "dishié Glow Oil",
    category: "dishié Glow Oil",
    price: 21500,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
    description: "A glow-inspired body oil step to complement your moisturising ritual.",
    tag: "Glow ritual",
  },
  {
    id: 510,
    name: "Golden Hour Body Oil",
    category: "dishié Glow Oil",
    price: 23500,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    description: "An elegant finishing step for a soft-looking, radiant body-care routine.",
    tag: "Radiance",
  },
  {
    id: 511,
    name: "The Complete Glow Routine Set",
    category: "dishie Routine Set",
    price: 68500,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    description: "A curated demo set bringing cleansing and moisturising steps together.",
    tag: "Routine set",
  },
  {
    id: 512,
    name: "The Everyday Essentials Set",
    category: "dishie Routine Set",
    price: 55000,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
    description: "A convenient demo collection for building a simple everyday ritual.",
    tag: "Curated edit",
  },
  {
    id: 513,
    name: "AHA + BHA Brightening Moisturizing Lotion 50ml",
    category: "Face Cream",
    price: 27755.28,
    image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
    description: "A moisturising step for a thoughtfully layered facial skincare routine.",
    tag: "Featured",
  },
  {
    id: 514,
    name: "Cloud Comfort Face Cream",
    category: "Face Cream",
    price: 23500,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85",
    description: "A demo daily face cream concept for a soft, moisturised finish.",
    tag: "Daily hydration",
  },
  {
    id: 515,
    name: "Gentle Daily Face Wash",
    category: "Face Wash",
    price: 18500,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    description: "A simple first step for a fresh-feeling morning or evening routine.",
    tag: "Daily essential",
  },
  {
    id: 516,
    name: "Fresh Start Foaming Wash",
    category: "Face Wash",
    price: 19900,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
    description: "A demo facial wash concept for a clean, refreshed feel.",
    tag: "Fresh start",
  },
  {
    id: 517,
    name: "PDRN + Peptide Glow Mist Spray",
    category: "Glow Face Mist",
    price: 19825.2,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    description: "A fine facial mist concept to refresh your routine throughout the day.",
    tag: "Glow essential",
  },
  {
    id: 518,
    name: "Dew Veil Facial Mist",
    category: "Glow Face Mist",
    price: 17500,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85",
    description: "A refreshing mist-inspired addition to a layered skincare ritual.",
    tag: "On-the-go",
  },
  {
    id: 519,
    name: "Vitamin C Serum Roller Cream Massager 80g",
    category: "Serums",
    price: 22468.56,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    description: "A serum-category product concept for a glow-focused skincare routine.",
    tag: "Featured",
  },
  {
    id: 520,
    name: "Radiance Renewal Serum",
    category: "Serums",
    price: 24500,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85",
    description: "A demo serum concept for a carefully layered facial routine.",
    tag: "Skin ritual",
  },
  {
    id: 521,
    name: "Restorative Shower Ritual",
    category: "Shower",
    price: 18500,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    description: "A shower-category demo item for an elevated bathing experience.",
    tag: "Bath ritual",
  },
  {
    id: 522,
    name: "Daily Shower Essential",
    category: "Shower",
    price: 15500,
    image: "https://images.unsplash.com/photo-1556229010-6c3f2c9ca5f8?auto=format&fit=crop&w=900&q=85",
    description: "A simple demo bathing essential for your everyday routine.",
    tag: "Everyday care",
  },
  {
    id: 523,
    name: "Sponge – 100% African Exfoliating",
    category: "Sponge",
    price: 5286.72,
    image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    description: "A bathing accessory designed for your body-care routine.",
    tag: "Bath essential",
  },
  {
    id: 524,
    name: "Soft Touch Bath Sponge",
    category: "Sponge",
    price: 4500,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&w=900&q=85",
    description: "A demo bath accessory to round out your shower essentials.",
    tag: "Shower essential",
  },
  {
    id: 525,
    name: "dishie’ Zero White Cast Sunscreen SPF 50 PA++++ 50ml",
    category: "Sunscreen",
    price: 23790.24,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=900&q=85",
    description: "A sunscreen listing for the daytime skincare step; follow the product label for use.",
    tag: "Daytime essential",
  },
  {
    id: 526,
    name: "Daily Shield Sunscreen SPF 50",
    category: "Sunscreen",
    price: 22500,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85",
    description: "A demo sunscreen concept for the daytime skincare category.",
    tag: "Daily protection",
  },
  {
    id: 527,
    name: "Sink Into Renewal Face Toner 300ml",
    category: "Toners",
    price: 23790.24,
    image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    description: "A toner step to complement a considered cleansing and moisturising routine.",
    tag: "Featured",
  },
  {
    id: 528,
    name: "Soft Balance Daily Toner",
    category: "Toners",
    price: 18500,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?auto=format&fit=crop&w=900&q=85",
    description: "A demo toner concept for a simple, layered skincare ritual.",
    tag: "Daily ritual",
  },
];

const formatPrice = (price: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);

export default function AllProductsPage({
  onAddToBag,
  saved,
  onToggleSaved,
}: AllProductsPageProps) {
  const [activeCategory, setActiveCategory] = useState("All Products");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("featured");
  const [quickView, setQuickView] = useState<StoreProduct | null>(null);
  const [addedId, setAddedId] = useState<number | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        activeCategory === "All Products" ||
        product.category === activeCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sort === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, search, sort]);

  const handleAdd = (product: StoreProduct) => {
    onAddToBag(product);
    setAddedId(product.id);
    setQuickView(null);
  };

  return (
    <main className="min-h-screen bg-[#F7F2EA] text-[#30232F]">
      {/* EDITORIAL HERO */}
      <section className="relative overflow-hidden bg-[#30232F] px-5 pb-16 pt-28 text-[#F7F2EA] sm:px-10 sm:pb-24 sm:pt-36 lg:px-16">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#D9BE8B]/15" />
        <div className="pointer-events-none absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#D9BE8B]/20" />
        <div className="pointer-events-none absolute -bottom-32 left-1/3 h-72 w-72 rounded-full bg-[#4B165C]/50 blur-3xl" />

        <div className="relative mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#D9BE8B]" />
              <p className="text-[10px] uppercase tracking-[0.35em] text-[#D9BE8B] sm:text-xs">
                The complete collection
              </p>
            </div>

            <h1 className="max-w-3xl font-serif text-5xl font-light leading-[1.08] sm:text-6xl lg:text-8xl">
              Your ritual.
              <br />
              <span className="italic text-[#D9BE8B]">Your radiance.</span>
            </h1>

            <p className="mt-7 max-w-lg text-sm leading-7 text-[#F7F2EA]/70 sm:text-base">
              Discover the complete edit of skincare and self-care essentials.
              Thoughtfully curated for the little moments that make you feel
              beautifully, unapologetically you.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={() => {
                  setActiveCategory("All Products");
                  document
                    .getElementById("all-products-grid")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="group inline-flex items-center gap-4 border border-[#D9BE8B] bg-[#D9BE8B] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#30232F] transition hover:bg-transparent hover:text-[#D9BE8B]"
              >
                Explore the collection
                <ArrowUpRight
                  size={15}
                  className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                />
              </button>

              <span className="text-xs text-[#F7F2EA]/60">
                {products.length} curated items
              </span>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="absolute -inset-4 rotate-3 border border-[#D9BE8B]/30" />
            <div className="relative aspect-[4/4.3] overflow-hidden bg-[#493743]">
              <img
                src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=90"
                alt="Skincare products arranged for a luxurious self-care ritual"
                className="h-full w-full object-cover opacity-90 transition duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/80 via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4 sm:bottom-9 sm:left-9 sm:right-9">
                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-[#D9BE8B]">
                    The Soft Edit
                  </p>
                  <p className="mt-2 font-serif text-3xl italic text-white sm:text-4xl">
                    A little luxury, daily.
                  </p>
                </div>
                <Sparkles className="mb-1 shrink-0 text-[#D9BE8B]" size={25} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BRAND PROMISE STRIP */}
      <section className="border-b border-[#30232F]/10 bg-[#EFE6DA] px-5 py-5 sm:px-10 lg:px-16">
        <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 text-center sm:grid-cols-3 sm:gap-6">
          {[
            ["01", "Your everyday ritual"],
            ["02", "A considered collection"],
            ["03", "A little time for you"],
          ].map(([number, label]) => (
            <div key={number} className="flex items-center justify-center gap-3">
              <span className="font-serif text-lg italic text-[#9D805A]">
                {number}
              </span>
              <span className="text-[9px] uppercase tracking-[0.2em] sm:text-[10px]">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCT COLLECTION */}
      <section
        id="all-products-grid"
        className="mx-auto max-w-[1600px] px-5 py-14 sm:px-10 sm:py-20 lg:px-16"
      >
        <div className="mb-9 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-8 bg-[#9D805A]" />
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#80654D]">
                Find your favourites
              </p>
            </div>
            <h2 className="font-serif text-4xl font-light sm:text-5xl">
              The collection
            </h2>
            <p className="mt-3 max-w-xl text-sm leading-6 text-[#30232F]/60">
              From your first cleanse to your final glow, find the essentials
              that belong in your ritual.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="flex min-w-0 flex-1 items-center gap-3 border border-[#30232F]/15 bg-white/60 px-4 py-3 sm:min-w-[230px]">
              <Search size={16} className="shrink-0 text-[#80654D]" />
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search the collection"
                aria-label="Search products"
                className="w-full bg-transparent text-xs outline-none placeholder:text-[#30232F]/40"
              />
              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                >
                  <X size={14} />
                </button>
              )}
            </label>

            <button
              type="button"
              onClick={() => setShowFilters(!showFilters)}
              aria-expanded={showFilters}
              className={`inline-flex items-center gap-2 border px-4 py-3 text-[10px] uppercase tracking-[0.14em] transition ${
                showFilters
                  ? "border-[#30232F] bg-[#30232F] text-white"
                  : "border-[#30232F]/15 hover:border-[#30232F]"
              }`}
            >
              <SlidersHorizontal size={14} />
              Filter
            </button>
          </div>
        </div>

        {/* CATEGORY CHIPS */}
        <div className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <button
              type="button"
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`border px-4 py-3 text-[9px] uppercase tracking-[0.12em] transition sm:text-[10px] ${
                activeCategory === category
                  ? "border-[#30232F] bg-[#30232F] text-[#F7F2EA]"
                  : "border-[#30232F]/15 bg-transparent text-[#30232F]/70 hover:border-[#9D805A] hover:text-[#30232F]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* SORT FILTER */}
        {showFilters && (
          <div className="mb-8 flex flex-col gap-4 border border-[#30232F]/10 bg-[#EFE6DA]/60 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-medium">Refine your collection</p>
              <p className="mt-1 text-xs text-[#30232F]/55">
                Choose a category above or arrange products below.
              </p>
            </div>
            <label className="flex items-center gap-3 text-xs">
              <ArrowDownUp size={15} />
              Sort by
              <span className="relative">
                <select
                  value={sort}
                  onChange={(event) => setSort(event.target.value)}
                  className="min-w-[180px] appearance-none border border-[#30232F]/15 bg-[#F7F2EA] py-3 pl-3 pr-9 text-xs outline-none focus:border-[#9D805A]"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: low to high</option>
                  <option value="price-high">Price: high to low</option>
                  <option value="name">Name: A to Z</option>
                </select>
                <ChevronDown
                  size={13}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2"
                />
              </span>
            </label>
          </div>
        )}

        <div className="mb-5 flex items-center justify-between border-b border-[#30232F]/10 pb-4">
          <p className="text-xs text-[#30232F]/60">
            Showing{" "}
            <span className="font-semibold text-[#30232F]">
              {filteredProducts.length}
            </span>{" "}
            {filteredProducts.length === 1 ? "product" : "products"}
            {activeCategory !== "All Products" && ` in ${activeCategory}`}
          </p>
          <p className="hidden text-[9px] uppercase tracking-[0.18em] text-[#30232F]/45 sm:block">
            The Soft Edit · Shop all
          </p>
        </div>

        {/* PRODUCT GRID */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product, index) => {
              const isSaved = saved.includes(product.id);
              const isAdded = addedId === product.id;

              return (
                <article
                  key={product.id}
                  className="group min-w-0 animate-in fade-in duration-500"
                >
                  <div className="relative aspect-[4/5] overflow-hidden bg-[#E9DFD3]">
                    <button
                      type="button"
                      onClick={() => setQuickView(product)}
                      aria-label={`View ${product.name}`}
                      className="absolute inset-0 z-0 h-full w-full"
                    >
                      <img
                        src={product.image}
                        alt={product.name}
                        loading={index > 3 ? "lazy" : "eager"}
                        className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-[1.06]"
                      />
                    </button>

                    <span className="absolute left-2 top-2 z-[1] max-w-[70%] bg-[#F7F2EA]/95 px-2 py-2 text-[8px] uppercase tracking-[0.12em] text-[#30232F] sm:left-3 sm:top-3 sm:px-3 sm:text-[9px]">
                      {product.tag}
                    </span>

                    <button
                      type="button"
                      onClick={() => onToggleSaved(product.id)}
                      aria-label={
                        isSaved
                          ? `Remove ${product.name} from wishlist`
                          : `Add ${product.name} to wishlist`
                      }
                      aria-pressed={isSaved}
                      className={`absolute right-2 top-2 z-[2] flex h-9 w-9 items-center justify-center rounded-full border transition sm:right-3 sm:top-3 ${
                        isSaved
                          ? "border-[#4B165C] bg-[#4B165C] text-white"
                          : "border-white/70 bg-[#F7F2EA]/90 text-[#30232F] hover:border-[#4B165C] hover:bg-[#4B165C] hover:text-white"
                      }`}
                    >
                      <Heart size={15} fill={isSaved ? "currentColor" : "none"} />
                    </button>

                    <button
                      type="button"
                      onClick={() => setQuickView(product)}
                      className="absolute bottom-2 left-2 right-2 z-[2] flex translate-y-2 items-center justify-center gap-2 bg-[#F7F2EA]/95 px-2 py-3 text-[8px] font-medium uppercase tracking-[0.15em] opacity-0 transition duration-300 hover:bg-[#30232F] hover:text-white group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100 sm:bottom-3 sm:left-3 sm:right-3 sm:text-[9px]"
                    >
                      Quick view <ArrowUpRight size={13} />
                    </button>
                  </div>

                  <div className="pt-4 sm:pt-5">
                    <p className="mb-2 text-[8px] uppercase tracking-[0.18em] text-[#80654D] sm:text-[9px]">
                      {product.category}
                    </p>
                    <button
                      type="button"
                      onClick={() => setQuickView(product)}
                      className="line-clamp-2 min-h-[40px] text-left font-serif text-base leading-5 transition hover:text-[#80654D] sm:min-h-[48px] sm:text-lg sm:leading-6"
                    >
                      {product.name}
                    </button>

                    <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs font-semibold sm:text-sm">
                        {formatPrice(product.price)}
                      </p>
                      <button
                        type="button"
                        onClick={() => handleAdd(product)}
                        aria-label={`Add ${product.name} to basket`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center border border-[#30232F]/15 transition hover:border-[#4B165C] hover:bg-[#4B165C] hover:text-white sm:h-10 sm:w-10"
                      >
                        {isAdded ? (
                          <Check size={16} />
                        ) : (
                          <ShoppingBag size={15} />
                        )}
                      </button>
                    </div>

                    {isAdded && (
                      <p className="mt-2 text-[9px] text-[#56704C]">
                        Added to your basket
                      </p>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="py-20 text-center">
            <Search size={28} className="mx-auto mb-5 text-[#80654D]" />
            <h3 className="font-serif text-3xl">Nothing found just yet.</h3>
            <p className="mt-3 text-sm text-[#30232F]/60">
              Try another search or choose a different category.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All Products");
              }}
              className="mt-6 border border-[#30232F] px-6 py-3 text-[10px] uppercase tracking-[0.15em] transition hover:bg-[#30232F] hover:text-white"
            >
              Clear filters
            </button>
          </div>
        )}

        <div className="mt-16 flex flex-col items-center border-t border-[#30232F]/10 pt-10 text-center">
          <Sparkles size={20} className="mb-4 text-[#9D805A]" />
          <h3 className="font-serif text-3xl italic sm:text-4xl">
            Make room for your ritual.
          </h3>
          <p className="mt-3 max-w-md text-sm leading-6 text-[#30232F]/60">
            Your skincare routine doesn't have to be complicated. Start with
            what feels right for you.
          </p>
          <button
            type="button"
            onClick={() => {
              setActiveCategory("All Products");
              setSearch("");
              setSort("featured");
              document
                .getElementById("all-products-grid")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="mt-6 inline-flex items-center gap-3 border-b border-[#9D805A] pb-2 text-[10px] uppercase tracking-[0.2em] transition hover:text-[#80654D]"
          >
            Explore all products <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {quickView && (
        <div
          className="fixed inset-0 z-[10000] flex items-center justify-center overflow-y-auto bg-[#1D1520]/75 p-4 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setQuickView(null);
          }}
          role="dialog"
          aria-modal="true"
          aria-label={`Product details: ${quickView.name}`}
        >
          <div className="relative my-auto grid w-full max-w-4xl overflow-hidden bg-[#F7F2EA] md:grid-cols-2">
            <button
              type="button"
              onClick={() => setQuickView(null)}
              aria-label="Close product details"
              className="absolute right-3 top-3 z-10 flex h-10 w-10 items-center justify-center border border-[#30232F]/10 bg-[#F7F2EA]/95 transition hover:bg-[#30232F] hover:text-white"
            >
              <X size={17} />
            </button>

            <div className="min-h-[260px] bg-[#E9DFD3] sm:min-h-[420px]">
              <img
                src={quickView.image}
                alt={quickView.name}
                className="h-full max-h-[520px] w-full object-cover"
              />
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-10">
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#80654D]">
                {quickView.category}
              </p>
              <h3 className="mt-4 font-serif text-3xl leading-tight sm:text-4xl">
                {quickView.name}
              </h3>
              <p className="mt-5 text-xl font-medium">
                {formatPrice(quickView.price)}
              </p>
              <div className="my-6 h-px bg-[#30232F]/10" />
              <p className="text-sm leading-7 text-[#30232F]/70">
                {quickView.description}
              </p>

              <p className="mt-5 text-[9px] uppercase tracking-[0.16em] text-[#80654D]">
                {quickView.tag}
              </p>

              <button
                type="button"
                onClick={() => handleAdd(quickView)}
                className="mt-8 flex w-full items-center justify-center gap-3 bg-[#4B165C] px-6 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-white transition hover:bg-[#30232F]"
              >
                <ShoppingBag size={15} />
                Add to basket · {formatPrice(quickView.price)}
              </button>

              <button
                type="button"
                onClick={() => onToggleSaved(quickView.id)}
                className="mt-4 flex items-center justify-center gap-2 py-3 text-[10px] uppercase tracking-[0.15em] transition hover:text-[#80654D]"
              >
                <Heart
                  size={15}
                  fill={saved.includes(quickView.id) ? "currentColor" : "none"}
                />
                {saved.includes(quickView.id)
                  ? "Remove from wishlist"
                  : "Save to wishlist"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
