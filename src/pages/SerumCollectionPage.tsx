// // import { useEffect, useRef, useState } from "react";
// // import { ArrowUpRight, Heart, Plus, Sparkles } from "lucide-react";

// import { useEffect, useRef, useState } from "react";
// import {
//   ArrowUpRight,
//   Heart,
//   Leaf,
//   Plus,
//   ShieldCheck,
//   Sparkles,
// } from "lucide-react";


// type SerumProduct = {
//   id: number;
//   name: string;
//   category: string;
//   price: number;
//   image: string;
//   tag: string;
//   color: string;
// };

// const BRAND = { purple: "#4B165C", ivory: "#F7F2EA", cocoa: "#5A4037", leaf: "#7D8768", gold: "#B99A62" } as const;

// function formatPrice(price: number) {
//   return new Intl.NumberFormat("en-GB", { style: "currency", currency: "GBP" }).format(price);
// }

// function SerumReveal({
//   children,
//   className = "",
//   delay = 0,
//   direction = "up",
// }: {
//   children: React.ReactNode;
//   className?: string;
//   delay?: number;
//   direction?: "up" | "left" | "right" | "none";
// }) {
//   const elementRef = useRef<HTMLDivElement>(null);
//   const [visible, setVisible] = useState(false);

//   useEffect(() => {
//     const element = elementRef.current;
//     if (!element) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         // Animate IN when entering the viewport.
//         // Animate OUT when leaving it.
//         // This works while scrolling both up and down.
//         setVisible(entry.isIntersecting);
//       },
//       {
//         threshold: 0.08,
//         rootMargin: "0px 0px -25px 0px",
//       },
//     );

//     observer.observe(element);

//     return () => {
//       observer.disconnect();
//     };
//   }, []);

//   const hiddenTransform = {
//     up: "translate3d(0, 38px, 0)",
//     left: "translate3d(-38px, 0, 0)",
//     right: "translate3d(38px, 0, 0)",
//     none: "scale(0.97)",
//   }[direction];

//   return (
//     <div
//       ref={elementRef}
//       className={className}
//       style={{
//         opacity: visible ? 1 : 0,
//         transform: visible
//           ? "translate3d(0, 0, 0) scale(1)"
//           : hiddenTransform,
//         transition: `opacity 850ms ease ${visible ? delay : 0}ms, transform 1000ms cubic-bezier(0.2, 0.7, 0.2, 1) ${visible ? delay : 0}ms`,
//         willChange: "opacity, transform",
//       }}
//     >
//       {children}
//     </div>
//   );
// }





// /* SERUM COLLECTION — LUXURY CATEGORY PAGE */
// const serumProducts: SerumProduct[] = [
//   {
//     id: 101,
//     name: "The Daily Glow Serum",
//     category: "BRIGHTENING · 30ML",
//     price: 28,
//     image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=90",
//     tag: "BESTSELLER",
//     color: "#E9D8C7",
//   },
//   {
//     id: 102,
//     name: "Dewdrop Hyaluronic Elixir",
//     category: "DEEP HYDRATION · 30ML",
//     price: 32,
//     image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=90",
//     tag: "HYDRATION HERO",
//     color: "#DDE4DF",
//   },
//   {
//     id: 103,
//     name: "Evening Calm Peptide Serum",
//     category: "FIRMING CARE · 30ML",
//     price: 36,
//     image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=90",
//     tag: "THE NIGHT RITUAL",
//     color: "#E2D8E7",
//   },
//   {
//     id: 104,
//     name: "Petal Soft Barrier Serum",
//     category: "BARRIER SUPPORT · 30ML",
//     price: 30,
//     image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=90",
//     tag: "SKIN COMFORT",
//     color: "#E7D8CD",
//   },
//   {
//     id: 105,
//     name: "Golden Hour Vitamin C",
//     category: "RADIANCE · 30ML",
//     price: 34,
//     image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=90",
//     tag: "RADIANCE EDIT",
//     color: "#E9DCC2",
//   },
//   {
//     id: 106,
//     name: "Quiet Luxury Niacinamide",
//     category: "BALANCING CARE · 30ML",
//     price: 29,
//     image: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1000&q=90",
//     tag: "DAILY ESSENTIAL",
//     color: "#DCDDD2",
//   },
//   {
//     id: 107,
//     name: "Midnight Renewal Drops",
//     category: "OVERNIGHT CARE · 30ML",
//     price: 38,
//     image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1000&q=90",
//     tag: "THE EVENING EDIT",
//     color: "#D9D3DE",
//   },
//   {
//     id: 108,
//     name: "Silk Veil Hydrating Serum",
//     category: "SOFTENING CARE · 30ML",
//     price: 31,
//     image: "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=1000&q=90",
//     tag: "SOFT SKIN FAVOURITE",
//     color: "#E8DDD4",
//   },
// ];

// type SerumCollectionPageProps = {
//   onAddToBag: (product: SerumProduct) => void;
//   saved: number[];
//   onToggleSaved: (id: number) => void;
// };

// export default function SerumCollectionPage({ onAddToBag, saved, onToggleSaved }: SerumCollectionPageProps) {
//   const [activeFilter, setActiveFilter] = useState("All serums");
//   const [sortBy, setSortBy] = useState("featured");
//   const [minPrice, setMinPrice] = useState("0");
//   const [maxPrice, setMaxPrice] = useState("100");
//   const filters = ["All serums", "Hydration", "Brightening", "Firming", "Barrier care"];

//   let visibleProducts = serumProducts.filter((product) => {
//     const category = product.category.toLowerCase();
//     const matchesFilter = activeFilter === "All serums" ||
//       (activeFilter === "Hydration" && (category.includes("hydration") || category.includes("softening"))) ||
//       (activeFilter === "Brightening" && (category.includes("brightening") || category.includes("radiance"))) ||
//       (activeFilter === "Firming" && category.includes("firming")) ||
//       (activeFilter === "Barrier care" && (category.includes("barrier") || category.includes("balancing")));
//     return matchesFilter && product.price >= Number(minPrice || 0) && product.price <= Number(maxPrice || 1000);
//   });

//   if (sortBy === "price-low") visibleProducts = [...visibleProducts].sort((a, b) => a.price - b.price);
//   if (sortBy === "price-high") visibleProducts = [...visibleProducts].sort((a, b) => b.price - a.price);
//   if (sortBy === "name") visibleProducts = [...visibleProducts].sort((a, b) => a.name.localeCompare(b.name));

//   return (
//     <main id="serums" className="min-h-screen bg-[#F7F2EA] pt-[88px] text-[#5A4037] sm:pt-[94px] lg:pt-[108px]">
//       <section className="relative isolate overflow-hidden bg-[#30232F] text-[#FFF9EF]">
//         <div className="pointer-events-none absolute -right-28 -top-32 h-[30rem] w-[30rem] rounded-full border border-[#D9BE8B]/20" />
//         <div className="pointer-events-none absolute -right-12 -top-16 h-[22rem] w-[22rem] rounded-full border border-[#D9BE8B]/20" />
//         <div className="mx-auto grid min-h-[390px] max-w-[1500px] items-center gap-10 px-5 py-16 sm:px-10 sm:py-20 lg:min-h-[460px] lg:grid-cols-[1fr_0.85fr] lg:gap-16 lg:px-16">
//           <div className="relative z-10 max-w-2xl">
//             <p className="mb-5 flex items-center gap-3 text-[9px] font-medium tracking-[0.28em] text-[#D9BE8B] sm:text-[10px]"><span className="h-px w-9 bg-[#D9BE8B]" /> THE SOFT EDIT · SKIN RITUALS</p>
//             <h1 className="font-serif text-5xl font-normal leading-[1.04] tracking-[-0.04em] sm:text-6xl lg:text-[78px]">A softer kind<br /><em className="text-[#D9BE8B]">of glow.</em></h1>
//             <p className="mt-6 max-w-lg text-sm leading-7 text-white/75 sm:text-base sm:leading-8">Meet your skin where it is. Thoughtfully chosen serums for the everyday rituals that leave your complexion feeling cared for, comfortable and luminous.</p>
//             <a href="#serum-edit" className="group mt-8 inline-flex items-center gap-8 border border-[#D9BE8B]/70 px-6 py-4 text-[9px] font-semibold tracking-[0.18em] text-[#FFF9EF] transition-all duration-300 hover:bg-[#D9BE8B] hover:text-[#30232F]">EXPLORE THE SERUM EDIT <ArrowUpRight size={16} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" /></a>
//           </div>
//           <div className="relative mx-auto w-full max-w-[520px] lg:justify-self-end">
//             <div className="absolute -inset-4 border border-[#D9BE8B]/25" />
//             <div className="relative aspect-[5/4] overflow-hidden bg-[#E5D7C9]">
//               <img src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=90" alt="Elegant skincare serum bottles in a soft neutral setting" className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105" />
//               <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/45 via-transparent to-white/10" />
//               <p className="absolute bottom-5 left-5 font-serif text-2xl italic text-white sm:bottom-7 sm:left-7 sm:text-3xl">Your moment, bottled.</p>
//             </div>
//             <div className="absolute -bottom-5 -left-3 flex h-20 w-20 flex-col items-center justify-center rounded-full border border-[#D9BE8B]/70 bg-[#F7F2EA] text-[#4B165C] shadow-xl sm:-left-7 sm:h-24 sm:w-24"><Sparkles size={17} /><span className="mt-1 text-center text-[7px] tracking-[0.15em] sm:text-[8px]">THE DAILY RITUAL</span></div>
//           </div>
//         </div>
//       </section>

//       <section className="border-b border-[#D8C8B7] bg-[#FBF7F0] px-5 py-5 sm:px-10">
//         <div className="mx-auto flex max-w-[1500px] flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[8px] tracking-[0.16em] text-[#6D594D] sm:justify-between sm:text-[9px]"><span className="flex items-center gap-2"><Leaf size={14} className="text-[#7D8768]" /> THOUGHTFULLY SELECTED</span><span className="flex items-center gap-2"><Sparkles size={14} className="text-[#9A8061]" /> ROUTINE, REIMAGINED</span><span className="flex items-center gap-2"><ShieldCheck size={14} className="text-[#7D8768]" /> CARE THAT FEELS PERSONAL</span><span className="flex items-center gap-2"><Heart size={14} className="text-[#9A8061]" /> LITTLE LUXURIES, EVERY DAY</span></div>
//       </section>

//       <section id="serum-edit" className="scroll-mt-28 px-5 py-16 sm:px-10 sm:py-20 lg:px-14 lg:py-24">
//         <div className="mx-auto max-w-[1500px]">
//           <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
//             <div><p className="mb-3 text-[9px] tracking-[0.24em] text-[#9A8061]">FIND YOUR FORMULA</p><h2 className="font-serif text-4xl leading-tight text-[#4B165C] sm:text-5xl">The serum collection</h2><p className="mt-3 max-w-xl text-sm leading-6 text-[#806B5F]">Considered essentials for hydration, radiance and a little more confidence in your own skin.</p></div>
//             <label className="flex items-center gap-3 text-[10px] tracking-wide text-[#6D594D]">SORT BY <select value={sortBy} onChange={(event) => setSortBy(event.target.value)} className="min-w-[150px] border border-[#CDBBAA] bg-transparent px-3 py-3 text-xs outline-none focus:border-[#4B165C]"><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label>
//           </div>

//           <div className="grid gap-8 lg:grid-cols-[220px_1fr] lg:gap-10">
//             <aside className="h-fit border-y border-[#D8C8B7] py-6 lg:border-t-0 lg:pt-0">
//               <div className="flex items-center justify-between"><h3 className="font-serif text-2xl text-[#4B165C]">Refine your edit</h3><button type="button" onClick={() => { setActiveFilter("All serums"); setMinPrice("0"); setMaxPrice("100"); }} className="text-[9px] tracking-wide text-[#9A8061] underline underline-offset-4">RESET</button></div>
//               <p className="mb-4 mt-7 text-[9px] font-semibold tracking-[0.17em] text-[#9A8061]">SHOP BY CONCERN</p>
//               <div className="flex flex-wrap gap-2 lg:flex-col lg:items-start">{filters.map((filter) => <button key={filter} type="button" onClick={() => setActiveFilter(filter)} aria-pressed={activeFilter === filter} className={`border px-3 py-2.5 text-left text-xs transition-colors ${activeFilter === filter ? "border-[#4B165C] bg-[#4B165C] text-[#F7F2EA]" : "border-[#D8C8B7] text-[#6D594D] hover:border-[#4B165C] hover:text-[#4B165C]"}`}>{filter}</button>)}</div>
//               <div className="mt-8 border-t border-[#D8C8B7] pt-6"><p className="text-[9px] font-semibold tracking-[0.17em] text-[#9A8061]">FILTER BY PRICE</p><div className="mt-4 grid grid-cols-2 gap-2"><label className="text-[10px] text-[#806B5F]">Min (£)<input type="number" min="0" value={minPrice} onChange={(event) => setMinPrice(event.target.value)} className="mt-2 w-full border border-[#D8C8B7] bg-[#FBF7F0] px-3 py-2.5 text-sm outline-none focus:border-[#4B165C]" /></label><label className="text-[10px] text-[#806B5F]">Max (£)<input type="number" min="0" value={maxPrice} onChange={(event) => setMaxPrice(event.target.value)} className="mt-2 w-full border border-[#D8C8B7] bg-[#FBF7F0] px-3 py-2.5 text-sm outline-none focus:border-[#4B165C]" /></label></div><p className="mt-3 text-[10px] text-[#806B5F]">Price range: {formatPrice(Number(minPrice || 0))} – {formatPrice(Number(maxPrice || 100))}</p></div>
//               <div className="mt-8 border-t border-[#D8C8B7] pt-6"><p className="text-[9px] font-semibold tracking-[0.17em] text-[#9A8061]">OUR APPROACH</p><p className="mt-3 text-xs leading-6 text-[#806B5F]">A considered edit of textures and ingredients, selected to make daily skincare feel calm, simple and personal.</p></div>
//             </aside>

//             <div>
//               <div className="mb-5 flex items-center justify-between"><p className="text-xs text-[#806B5F]">Showing <span className="font-semibold text-[#4B165C]">{visibleProducts.length}</span> of {serumProducts.length} serums</p><span className="hidden text-[9px] tracking-[0.14em] text-[#9A8061] sm:block">THE SOFT EDIT · SERUMS</span></div>
//               <div className="grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 xl:grid-cols-3">
//                 {visibleProducts.map((product, index) => {
//                   const isSaved = saved.includes(product.id);
//                   return <SerumReveal key={product.id} delay={index * 60}><article id={`product-${product.id}`} className="group min-w-0">
//                     <div className="relative aspect-[4/5] overflow-hidden" style={{ backgroundColor: product.color }}><img src={product.image} alt={product.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.07]" /><div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#30232F]/15 via-transparent to-white/10" /><span className="absolute left-2 top-2 bg-[#F7F2EA]/95 px-2 py-2 text-[7px] tracking-[0.1em] text-[#4B165C] sm:left-4 sm:top-4 sm:px-3 sm:text-[8px]">{product.tag}</span><button type="button" onClick={() => onToggleSaved(product.id)} aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`} aria-pressed={isSaved} className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2EA]/95 text-[#4B165C] shadow-sm transition-all hover:scale-110 sm:right-4 sm:top-4 sm:h-10 sm:w-10"><Heart size={17} strokeWidth={1.5} fill={isSaved ? BRAND.purple : "none"} /></button><button type="button" onClick={() => onAddToBag(product)} className="absolute inset-x-2 bottom-2 flex items-center justify-center gap-2 bg-[#F7F2EA] px-2 py-3 text-[8px] font-semibold tracking-[0.1em] text-[#4B165C] shadow-sm transition-colors hover:bg-[#4B165C] hover:text-white sm:inset-x-4 sm:bottom-4 sm:py-4 sm:text-[10px]">ADD TO BAG <Plus size={14} /></button></div>
//                     <div className="pt-4 sm:pt-5"><p className="text-[8px] tracking-[0.1em] text-[#89766A] sm:text-[9px]">{product.category}</p><h3 className="mt-2 font-serif text-lg leading-snug text-[#4B165C] transition-colors group-hover:text-[#896B48] sm:text-xl">{product.name}</h3><p className="mt-2 min-h-10 text-[11px] leading-5 text-[#806B5F]">{product.id === 101 ? "A daily radiance ritual for skin that looks fresh and well-rested." : product.id === 102 ? "A comforting hydration step for a plump, dewy-looking finish." : product.id === 103 ? "A silky evening formula for a cared-for, supple-looking complexion." : product.id === 104 ? "A gentle-feeling daily layer to complement your skin barrier routine." : product.id === 105 ? "A bright, fresh-feeling addition to your morning skincare ritual." : product.id === 106 ? "A balanced everyday serum for a smooth, comfortable skin feel." : product.id === 107 ? "An evening ritual made for slow moments and soft-feeling skin." : "A lightweight layer that leaves skin feeling soft and replenished."}</p><div className="mt-3 flex items-center justify-between gap-2"><p className="text-sm font-medium text-[#5A4037]">{formatPrice(product.price)}</p><span className="hidden items-center gap-1 text-[8px] tracking-[0.1em] text-[#7D8768] sm:flex"><Sparkles size={12} /> THE EDIT</span></div><div className="mt-4 h-px w-full bg-[#D8C8B7]"><div className="h-px w-0 bg-[#4B165C] transition-all duration-700 group-hover:w-full" /></div></div>
//                   </article></SerumReveal>;
//                 })}
//               </div>
//               {visibleProducts.length === 0 && <div className="border border-[#D8C8B7] px-6 py-16 text-center"><p className="font-serif text-2xl text-[#4B165C]">Nothing in this edit just yet.</p><p className="mt-2 text-sm text-[#806B5F]">Try widening your price range or selecting another concern.</p></div>}
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="bg-[#EDE3D8] px-5 py-16 sm:px-10 sm:py-20"><div className="mx-auto grid max-w-[1250px] gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-center"><div><p className="text-[9px] tracking-[0.23em] text-[#9A8061]">A NOTE FROM THE SOFT EDIT</p><h2 className="mt-3 font-serif text-4xl leading-tight text-[#4B165C] sm:text-5xl">Make room for<br /><em className="text-[#9A8061]">yourself.</em></h2></div><div className="border-l border-[#B99A62] pl-6 sm:pl-8"><p className="max-w-2xl text-sm leading-7 text-[#6D594D]">Skincare should feel like a moment of care, not another thing to get through. Build a ritual that works for you, introduce new products thoughtfully, and give your skin time to settle into its rhythm.</p><p className="mt-5 font-serif text-xl italic text-[#4B165C]">A little care goes a long way.</p></div></div></section>
//     </main>
//   );
// }

import { useMemo, useState, type ReactNode } from "react";
import {
  ArrowDownUp,
  ArrowRight,
  Check,
  ChevronDown,
  Heart,
  LayoutGrid,
  List,
  Plus,
  RotateCcw,
  Search,
  ShoppingBag,
  SlidersHorizontal,
  Sparkles,
  X,
} from "lucide-react";

type SerumProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  tag: string;
  color: string;
};

type SerumCollectionPageProps = {
  onAddToBag: (product: SerumProduct) => void;
  saved: number[];
  onToggleSaved: (id: number) => void;
};

const BRAND = {
  purple: "#4B165C",
  ivory: "#F7F2EA",
  cocoa: "#5A4037",
  leaf: "#7D8768",
  gold: "#B99A62",
  muted: "#89776B",
  border: "#E3D8CB",
  white: "#FFFCF7",
};

const serumProducts: SerumProduct[] = [
  {
    id: 101,
    name: "The Daily Glow Serum",
    category: "Brightening",
    price: 28500,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
    tag: "BESTSELLER",
    color: "#E9D8C7",
  },
  {
    id: 102,
    name: "Dewdrop Hyaluronic Elixir",
    category: "Hydration",
    price: 32000,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    tag: "HYDRATION HERO",
    color: "#DDE4DF",
  },
  {
    id: 103,
    name: "Evening Calm Peptide Serum",
    category: "Firming",
    price: 36000,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    tag: "THE NIGHT RITUAL",
    color: "#E2D8E7",
  },
  {
    id: 104,
    name: "Petal Soft Barrier Serum",
    category: "Barrier Care",
    price: 30000,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    tag: "SKIN COMFORT",
    color: "#E7D8CD",
  },
  {
    id: 105,
    name: "Golden Hour Vitamin C",
    category: "Brightening",
    price: 34000,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
    tag: "RADIANCE EDIT",
    color: "#E9DCC2",
  },
  {
    id: 106,
    name: "Quiet Luxury Niacinamide",
    category: "Balancing",
    price: 29000,
    image:
      "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=900&q=85",
    tag: "DAILY ESSENTIAL",
    color: "#DCDDD2",
  },
  {
    id: 107,
    name: "Midnight Renewal Drops",
    category: "Firming",
    price: 38000,
    image:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=900&q=85",
    tag: "EVENING EDIT",
    color: "#D9D3DE",
  },
  {
    id: 108,
    name: "Silk Veil Hydrating Serum",
    category: "Hydration",
    price: 31000,
    image:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=900&q=85",
    tag: "SOFT SKIN FAVOURITE",
    color: "#E8DDD4",
  },
];

const categories = [
  "All Serums",
  "Hydration",
  "Brightening",
  "Firming",
  "Barrier Care",
  "Balancing",
];

const descriptions: Record<number, string> = {
  101: "A daily radiance ritual for a fresh, luminous-looking complexion.",
  102: "A lightweight hydration step for a plump, dewy-looking finish.",
  103: "A silky evening formula for a supple, cared-for skin feel.",
  104: "A comforting daily layer to complement your skin barrier routine.",
  105: "A bright addition to your morning skincare ritual.",
  106: "An everyday serum for a balanced, comfortable skin feel.",
  107: "An evening ritual made for slow moments and softer-feeling skin.",
  108: "A lightweight layer that leaves skin feeling soft and replenished.",
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(price);
}

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-4 text-[9px] font-semibold tracking-[0.2em] text-[#9A8061]">
      {children}
    </p>
  );
}

function SerumCollectionPage({
  onAddToBag,
  saved,
  onToggleSaved,
}: SerumCollectionPageProps) {
  const [activeCategory, setActiveCategory] = useState("All Serums");
  const [sortBy, setSortBy] = useState("featured");
  const [minPrice, setMinPrice] = useState("0");
  const [maxPrice, setMaxPrice] = useState("50000");
  const [search, setSearch] = useState("");
  const [selectedProduct, setSelectedProduct] =
    useState<SerumProduct | null>(null);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(8);

  const visibleProducts = useMemo(() => {
    const min = Number(minPrice || 0);
    const max = Number(maxPrice || 50000);
    const query = search.trim().toLowerCase();

    let result = serumProducts.filter((product) => {
      const matchesCategory =
        activeCategory === "All Serums" ||
        product.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesPrice = product.price >= min && product.price <= max;

      const matchesSearch =
        !query ||
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query);

      return matchesCategory && matchesPrice && matchesSearch;
    });

    if (sortBy === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === "name") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [activeCategory, minPrice, maxPrice, search, sortBy]);

  const productsToDisplay = visibleProducts.slice(0, visibleCount);

  function resetFilters() {
    setActiveCategory("All Serums");
    setMinPrice("0");
    setMaxPrice("50000");
    setSearch("");
    setSortBy("featured");
    setVisibleCount(8);
  }

  function chooseCategory(category: string) {
    setActiveCategory(category);
    setVisibleCount(8);
    setMobileFiltersOpen(false);
  }

  function handleAddToBag(product: SerumProduct) {
    onAddToBag(product);
    setSelectedProduct(null);
  }

  return (
    <main
      id="serums"
      className="min-h-screen bg-[#F7F2EA] pt-[100px] text-[#5A4037] sm:pt-[112px]"
    >
      {/* PAGE INTRODUCTION */}
      <section className="border-b border-[#E3D8CB] bg-[#FBF7F0]">
        <div className="mx-auto max-w-[1600px] px-5 pb-10 pt-5 sm:px-10 sm:pb-14 lg:px-16">
          <nav
            aria-label="Breadcrumb"
            className="mb-8 flex items-center gap-2 text-[14px] tracking-wide text-[#89776B]"
          >
            <a href="/" className="transition-colors hover:text-[#4B165C]">
              Home
            </a>
            <span>/</span>
            <span className="text-[#4B165C]">Serums</span>
          </nav>

          <div className="grid items-center gap-8 md:grid-cols-[1fr_0.65fr] lg:gap-16">
            <div>
              <p className="mb-4 flex items-center gap-3 text-[9px] tracking-[0.24em] text-[#9A8061]">
                <span className="h-px w-8 bg-[#B99A62]" />
                THE SOFT EDIT · THE SKIN COLLECTION
              </p>

              <h1 className="font-serif text-5xl font-normal leading-[1.06] tracking-[-0.04em] text-[#4B165C] sm:text-6xl lg:text-[76px]">
                Serums for
                <br />
                <em className="font-normal text-[#9A8061]">
                  your kind of glow.
                </em>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-[#806B5F] sm:text-base sm:leading-8">
                Thoughtful skincare, chosen for the everyday. Discover your
                next ritual in our considered collection of hydrating,
                brightening and skin-loving serums.
              </p>

              <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-[9px] tracking-[0.12em] text-[#6D594D]">
                <span className="flex items-center gap-2">
                  <Sparkles size={14} className="text-[#B99A62]" />
                  YOUR DAILY RITUAL
                </span>
                <span className="flex items-center gap-2">
                  <Check size={14} className="text-[#7D8768]" />
                  A CONSIDERED EDIT
                </span>
              </div>
            </div>

            <div className="relative hidden md:block">
              <div className="absolute -inset-3 border border-[#B99A62]/40" />
              <div className="relative aspect-[5/3] overflow-hidden bg-[#E9DCCF]">
                <img
                  src="https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=1200&q=85"
                  alt="Skincare products in a warm neutral setting"
                  className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/35 to-transparent" />
                <p className="absolute bottom-5 left-5 font-serif text-2xl italic text-white">
                  A little care goes a long way.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SHOP CONTENT */}
      <section
        id="serum-edit"
        className="mx-auto max-w-[1600px] px-5 py-10 sm:px-10 sm:py-14 lg:px-16"
      >
        {/* SHOP HEADING + SORT */}
        <div className="mb-7 flex flex-col gap-5 border-b border-[#E3D8CB] pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-2 text-[9px] tracking-[0.2em] text-[#9A8061]">
              FIND YOUR FORMULA
            </p>
            <h2 className="font-serif text-3xl text-[#4B165C] sm:text-4xl">
              The serum collection
            </h2>
            <p className="mt-2 text-xs leading-6 text-[#89776B]">
              Everyday essentials for your skin, selected with intention.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <label className="relative flex min-w-0 flex-1 items-center sm:w-[220px] sm:flex-none">
              <Search
                size={15}
                className="absolute left-3 text-[#89776B]"
              />
              <input
                type="search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                  setVisibleCount(8);
                }}
                placeholder="Search serums..."
                aria-label="Search serums"
                className="h-11 w-full border border-[#D8C8B7] bg-[#FBF7F0] pl-9 pr-3 text-xs outline-none transition-colors placeholder:text-[#A9998D] focus:border-[#4B165C]"
              />
            </label>

            <label className="flex h-11 items-center gap-2 border border-[#D8C8B7] bg-[#FBF7F0] px-3">
              <ArrowDownUp size={14} className="text-[#9A8061]" />
              <span className="hidden text-[9px] tracking-wide sm:inline">
                SORT:
              </span>
              <select
                value={sortBy}
                onChange={(event) => setSortBy(event.target.value)}
                aria-label="Sort products"
                className="max-w-[145px] bg-transparent text-xs outline-none"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: low to high</option>
                <option value="price-high">Price: high to low</option>
                <option value="name">Name</option>
              </select>
            </label>
          </div>
        </div>

        {/* MOBILE FILTER BUTTON */}
        <button
          type="button"
          onClick={() => setMobileFiltersOpen((open) => !open)}
          aria-expanded={mobileFiltersOpen}
          className="mb-6 flex w-full items-center justify-center gap-2 border border-[#D8C8B7] bg-[#FBF7F0] px-4 py-3 text-xs text-[#4B165C] lg:hidden"
        >
          <SlidersHorizontal size={15} />
          {mobileFiltersOpen ? "Hide filters" : "Filter products"}
          <ChevronDown
            size={14}
            className={`transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`}
          />
        </button>

        <div className="grid items-start gap-9 lg:grid-cols-[230px_minmax(0,1fr)] xl:grid-cols-[250px_minmax(0,1fr)] xl:gap-12">
          {/* FILTER SIDEBAR */}
          <aside
            className={`${mobileFiltersOpen ? "block" : "hidden"} lg:sticky lg:top-28 lg:block`}
          >
            <div className="border border-[#E3D8CB] bg-[#FBF7F0] p-5 sm:p-6">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-serif text-2xl text-[#4B165C]">
                  Shop serums
                </h3>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-[9px] tracking-wide text-[#89776B] transition-colors hover:text-[#4B165C]"
                >
                  <RotateCcw size={12} />
                  RESET
                </button>
              </div>

              <div className="border-t border-[#E3D8CB] py-6">
                <SectionLabel>PRODUCT CATEGORIES</SectionLabel>

                <div className="space-y-1">
                  {categories.map((category) => {
                    const active = activeCategory === category;
                    const count =
                      category === "All Serums"
                        ? serumProducts.length
                        : serumProducts.filter(
                            (product) =>
                              product.category.toLowerCase() ===
                              category.toLowerCase(),
                          ).length;

                    return (
                      <button
                        key={category}
                        type="button"
                        onClick={() => chooseCategory(category)}
                        aria-pressed={active}
                        className={`flex w-full items-center justify-between gap-2 border-b border-[#E3D8CB]/60 px-2 py-3 text-left text-xs transition-all ${
                          active
                            ? "bg-[#4B165C] px-3 text-[#F7F2EA]"
                            : "text-[#6D594D] hover:bg-[#F0E7DC] hover:text-[#4B165C]"
                        }`}
                      >
                        <span>{category}</span>
                        <span
                          className={`text-[10px] ${active ? "text-white/70" : "text-[#A9998D]"}`}
                        >
                          {count}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-[#E3D8CB] py-6">
                <SectionLabel>FILTER BY PRICE</SectionLabel>

                <div className="grid grid-cols-2 gap-3">
                  <label className="text-[10px] text-[#89776B]">
                    Minimum (₦)
                    <input
                      type="number"
                      min="0"
                      value={minPrice}
                      onChange={(event) => {
                        setMinPrice(event.target.value);
                        setVisibleCount(8);
                      }}
                      className="mt-2 w-full border border-[#D8C8B7] bg-[#F7F2EA] px-2 py-2.5 text-xs text-[#5A4037] outline-none focus:border-[#4B165C]"
                    />
                  </label>

                  <label className="text-[10px] text-[#89776B]">
                    Maximum (₦)
                    <input
                      type="number"
                      min="0"
                      value={maxPrice}
                      onChange={(event) => {
                        setMaxPrice(event.target.value);
                        setVisibleCount(8);
                      }}
                      className="mt-2 w-full border border-[#D8C8B7] bg-[#F7F2EA] px-2 py-2.5 text-xs text-[#5A4037] outline-none focus:border-[#4B165C]"
                    />
                  </label>
                </div>

                <p className="mt-3 text-[10px] leading-5 text-[#89776B]">
                  {formatPrice(Number(minPrice || 0))} –{" "}
                  {formatPrice(Number(maxPrice || 0))}
                </p>

                {Number(minPrice) > Number(maxPrice) && (
                  <p className="mt-2 text-[10px] text-red-700">
                    Minimum price must not exceed maximum price.
                  </p>
                )}
              </div>

              <div className="border-t border-[#E3D8CB] py-6">
                <SectionLabel>THE SOFT EDIT PROMISE</SectionLabel>
                <p className="text-xs leading-6 text-[#806B5F]">
                  Thoughtful choices, beautiful rituals and a little more
                  intention in your everyday skincare.
                </p>
                <div className="mt-4 flex items-center gap-2 text-[9px] tracking-wide text-[#7D8768]">
                  <Sparkles size={14} />
                  LESS RUSH. MORE RITUAL.
                </div>
              </div>
            </div>
          </aside>

          {/* PRODUCT RESULTS */}
          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-[#89776B]">
                Showing{" "}
                <span className="font-semibold text-[#4B165C]">
                  {productsToDisplay.length}
                </span>{" "}
                of{" "}
                <span className="font-semibold text-[#4B165C]">
                  {visibleProducts.length}
                </span>{" "}
                products
              </p>

              <div className="flex items-center gap-1">
                <button
                  type="button"
                  aria-label="Grid view"
                  aria-pressed={view === "grid"}
                  onClick={() => setView("grid")}
                  className={`flex h-9 w-9 items-center justify-center transition-colors ${
                    view === "grid"
                      ? "bg-[#4B165C] text-white"
                      : "border border-[#D8C8B7] text-[#89776B] hover:text-[#4B165C]"
                  }`}
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  type="button"
                  aria-label="List view"
                  aria-pressed={view === "list"}
                  onClick={() => setView("list")}
                  className={`flex h-9 w-9 items-center justify-center transition-colors ${
                    view === "list"
                      ? "bg-[#4B165C] text-white"
                      : "border border-[#D8C8B7] text-[#89776B] hover:text-[#4B165C]"
                  }`}
                >
                  <List size={16} />
                </button>
              </div>
            </div>

            {productsToDisplay.length > 0 ? (
              <div
                className={
                  view === "grid"
                    ? "grid grid-cols-2 gap-x-3 gap-y-9 sm:gap-x-5 sm:gap-y-12 xl:grid-cols-3"
                    : "grid grid-cols-1 gap-5"
                }
              >
                {productsToDisplay.map((product) => {
                  const isSaved = saved.includes(product.id);

                  return (
                    <article
                      key={product.id}
                      className={`group min-w-0 ${
                        view === "list"
                          ? "grid grid-cols-[120px_minmax(0,1fr)] gap-4 border-b border-[#E3D8CB] pb-5 sm:grid-cols-[180px_minmax(0,1fr)] sm:gap-6"
                          : ""
                      }`}
                    >
                      {/* PRODUCT IMAGE */}
                      <div
                        className={`relative overflow-hidden ${
                          view === "grid" ? "aspect-[4/5]" : "aspect-[4/5]"
                        }`}
                        style={{ backgroundColor: product.color }}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          aria-label={`View ${product.name}`}
                          className="absolute inset-0 z-0 h-full w-full cursor-pointer"
                        >
                          <img
                            src={product.image}
                            alt={product.name}
                            loading="lazy"
                            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                          />
                        </button>

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#30232F]/10 via-transparent to-white/10" />

                        <span className="absolute left-2 top-2 bg-[#F7F2EA]/95 px-2 py-2 text-[7px] tracking-[0.1em] text-[#4B165C] sm:left-3 sm:top-3 sm:px-3 sm:text-[8px]">
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
                          className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2EA]/95 text-[#4B165C] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-[#4B165C] hover:text-white sm:right-3 sm:top-3"
                        >
                          <Heart
                            size={16}
                            strokeWidth={1.5}
                            fill={isSaved ? BRAND.purple : "none"}
                            className={isSaved ? "text-[#4B165C]" : ""}
                          />
                        </button>

                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="absolute inset-x-2 bottom-14 z-10 hidden translate-y-2 items-center justify-center gap-2 bg-[#F7F2EA]/95 px-3 py-3 text-[9px] font-semibold tracking-[0.12em] text-[#4B165C] opacity-0 transition-all duration-300 hover:bg-white group-hover:translate-y-0 group-hover:opacity-100 sm:flex"
                        >
                          QUICK VIEW
                          <ArrowRight size={13} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleAddToBag(product)}
                          className="absolute inset-x-2 bottom-2 z-10 flex items-center justify-center gap-2 bg-[#4B165C] px-2 py-3 text-[8px] font-semibold tracking-[0.1em] text-white transition-colors duration-300 hover:bg-[#30232F] sm:inset-x-3 sm:bottom-3 sm:py-3.5 sm:text-[9px]"
                        >
                          <ShoppingBag size={13} />
                          ADD TO BAG
                          <Plus size={13} />
                        </button>
                      </div>

                      {/* PRODUCT DETAILS */}
                      <div className="min-w-0 pt-4 sm:pt-5">
                        <p className="text-[8px] tracking-[0.14em] text-[#9A8061] sm:text-[9px]">
                          {product.category.toUpperCase()} · 30ML
                        </p>

                        <button
                          type="button"
                          onClick={() => setSelectedProduct(product)}
                          className="mt-2 block text-left font-serif text-lg leading-snug text-[#4B165C] transition-colors hover:text-[#9A8061] sm:text-xl"
                        >
                          {product.name}
                        </button>

                        <p
                          className={`mt-2 text-[11px] leading-5 text-[#806B5F] ${
                            view === "grid" ? "min-h-10" : "max-w-xl"
                          }`}
                        >
                          {descriptions[product.id]}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
                          <p className="text-sm font-semibold text-[#5A4037]">
                            {formatPrice(product.price)}
                          </p>
                          <span className="flex items-center gap-1 text-[8px] tracking-[0.1em] text-[#7D8768]">
                            <Sparkles size={11} />
                            THE EDIT
                          </span>
                        </div>

                        <div className="mt-4 h-px w-full bg-[#E3D8CB]">
                          <div className="h-px w-0 bg-[#4B165C] transition-all duration-500 group-hover:w-full" />
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            ) : (
              <div className="border border-[#E3D8CB] bg-[#FBF7F0] px-5 py-16 text-center sm:py-24">
                <Sparkles
                  size={26}
                  strokeWidth={1.2}
                  className="mx-auto text-[#B99A62]"
                />
                <h3 className="mt-5 font-serif text-2xl text-[#4B165C]">
                  Nothing in this edit just yet.
                </h3>
                <p className="mx-auto mt-3 max-w-sm text-xs leading-6 text-[#806B5F]">
                  Try another category, search term or price range to discover
                  more of our collection.
                </p>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-6 inline-flex items-center gap-2 bg-[#4B165C] px-6 py-3.5 text-[9px] font-semibold tracking-[0.14em] text-white transition-colors hover:bg-[#30232F]"
                >
                  RESET FILTERS
                  <RotateCcw size={13} />
                </button>
              </div>
            )}

            {visibleProducts.length > visibleCount && (
              <div className="mt-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setVisibleCount((count) => count + 6)}
                  className="group inline-flex items-center gap-4 border border-[#4B165C] px-7 py-4 text-[9px] font-semibold tracking-[0.16em] text-[#4B165C] transition-all hover:bg-[#4B165C] hover:text-white"
                >
                  LOAD MORE SERUMS
                  <ArrowRight
                    size={15}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* BRAND CLOSING SECTION */}
      <section className="border-t border-[#E3D8CB] bg-[#EDE3D8] px-5 py-14 sm:px-10 sm:py-20">
        <div className="mx-auto grid max-w-[1250px] gap-8 lg:grid-cols-[0.7fr_1fr] lg:items-center">
          <div>
            <p className="text-[9px] tracking-[0.23em] text-[#9A8061]">
              A NOTE FROM THE SOFT EDIT
            </p>
            <h2 className="mt-3 font-serif text-4xl leading-tight text-[#4B165C] sm:text-5xl">
              Make room for
              <br />
              <em className="font-normal text-[#9A8061]">yourself.</em>
            </h2>
          </div>

          <div className="border-l border-[#B99A62] pl-6 sm:pl-8">
            <p className="max-w-2xl text-sm leading-7 text-[#6D594D]">
              Skincare should feel like a moment of care, not another thing
              to get through. Choose your products thoughtfully, build a
              routine that feels right for you, and give yourself time for
              the little things.
            </p>
            <p className="mt-5 font-serif text-xl italic text-[#4B165C]">
              A little care goes a long way.
            </p>
          </div>
        </div>
      </section>

      {/* QUICK VIEW MODAL */}
      {selectedProduct && (
        <div
          className="fixed inset-0 z-[200] flex items-center justify-center overflow-y-auto bg-[#211722]/70 p-4 backdrop-blur-sm sm:p-8"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelectedProduct(null);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="serum-quick-view-title"
            className="relative my-auto grid w-full max-w-3xl overflow-hidden bg-[#FBF7F0] shadow-2xl sm:grid-cols-2"
          >
            <button
              type="button"
              onClick={() => setSelectedProduct(null)}
              aria-label="Close quick view"
              className="absolute right-3 top-3 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F2EA] text-[#4B165C] shadow-sm transition-colors hover:bg-[#4B165C] hover:text-white"
            >
              <X size={18} />
            </button>

            <div
              className="relative min-h-[260px] sm:min-h-[430px]"
              style={{ backgroundColor: selectedProduct.color }}
            >
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <span className="absolute left-4 top-4 bg-[#F7F2EA]/95 px-3 py-2 text-[8px] tracking-[0.12em] text-[#4B165C]">
                {selectedProduct.tag}
              </span>
            </div>

            <div className="flex flex-col justify-center p-6 sm:p-9">
              <p className="text-[9px] tracking-[0.2em] text-[#9A8061]">
                THE SOFT EDIT · SERUMS
              </p>

              <p className="mt-4 text-[9px] tracking-[0.15em] text-[#89776B]">
                {selectedProduct.category.toUpperCase()} · 30ML
              </p>

              <h2
                id="serum-quick-view-title"
                className="mt-2 font-serif text-3xl leading-tight text-[#4B165C]"
              >
                {selectedProduct.name}
              </h2>

              <p className="mt-4 text-sm leading-7 text-[#806B5F]">
                {descriptions[selectedProduct.id]}
              </p>

              <p className="mt-6 font-serif text-2xl text-[#5A4037]">
                {formatPrice(selectedProduct.price)}
              </p>

              <button
                type="button"
                onClick={() => handleAddToBag(selectedProduct)}
                className="mt-7 flex w-full items-center justify-center gap-3 bg-[#4B165C] px-5 py-4 text-[10px] font-semibold tracking-[0.14em] text-white transition-colors hover:bg-[#30232F]"
              >
                <ShoppingBag size={16} />
                ADD TO BAG
                <ArrowRight size={15} />
              </button>

              <button
                type="button"
                onClick={() => onToggleSaved(selectedProduct.id)}
                className="mt-4 flex items-center justify-center gap-2 border border-[#D8C8B7] px-5 py-3.5 text-[9px] tracking-[0.12em] text-[#4B165C] transition-colors hover:border-[#4B165C]"
              >
                <Heart
                  size={15}
                  fill={
                    saved.includes(selectedProduct.id)
                      ? BRAND.purple
                      : "none"
                  }
                />
                {saved.includes(selectedProduct.id)
                  ? "SAVED TO WISHLIST"
                  : "ADD TO WISHLIST"}
              </button>

              <p className="mt-5 text-center text-[9px] leading-5 text-[#89776B]">
                Thoughtfully selected. Made for your everyday ritual.
              </p>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}

export default SerumCollectionPage;

