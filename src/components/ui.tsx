import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Heart, Plus } from "lucide-react";
import { ngn, type StoreProduct } from "../data/catalog";

export type Go = (path: string) => void;

export type CommerceProps = {
  onAddToBag: (product: StoreProduct) => void;
  saved: number[];
  onToggleSaved: (id: number) => void;
  go: Go;
};

/* ---------- Reveal (same behaviour as the one in App.tsx) ---------- */
export function Reveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), {
      threshold: 0.08,
      rootMargin: "0px 0px -25px 0px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const hidden = {
    up: "translate3d(0, 38px, 0)",
    left: "translate3d(-38px, 0, 0)",
    right: "translate3d(38px, 0, 0)",
    none: "scale(0.97)",
  }[direction];

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translate3d(0,0,0) scale(1)" : hidden,
        transition: `opacity 850ms ease ${visible ? delay : 0}ms, transform 1000ms cubic-bezier(0.2,0.7,0.2,1) ${visible ? delay : 0}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function Eyebrow({ children, light = false }: { children: ReactNode; light?: boolean }) {
  return (
    <div
      className={`flex items-center gap-3 text-[9px] font-medium uppercase tracking-[0.24em] sm:text-[10px] ${
        light ? "text-[#E8D2A7]" : "text-[#7D8768]"
      }`}
    >
      <span className="h-px w-8 bg-[#B99A62]" />
      {children}
    </div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  italic,
  text,
  action,
  light = false,
}: {
  eyebrow: string;
  title: string;
  italic: string;
  text?: string;
  action?: ReactNode;
  light?: boolean;
}) {
  return (
    <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
      <div className="max-w-2xl">
        <Eyebrow light={light}>{eyebrow}</Eyebrow>
        <h2
          className={`mt-5 font-serif text-4xl font-normal leading-[1.08] tracking-[-0.045em] sm:text-5xl md:text-6xl ${
            light ? "text-[#F7F2EA]" : "text-[#4B165C]"
          }`}
        >
          {title}
          <br />
          <em className={`font-normal ${light ? "text-[#E8D2A7]" : "text-[#9A8061]"}`}>{italic}</em>
        </h2>
        {text && (
          <p className={`mt-5 max-w-lg text-sm leading-7 sm:text-base sm:leading-8 ${light ? "text-white/75" : "text-[#7A685E]"}`}>
            {text}
          </p>
        )}
      </div>
      {action}
    </div>
  );
}

export function SeeMoreLink({ onClick, children = "SEE MORE" }: { onClick: () => void; children?: ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group inline-flex items-center gap-4 self-start border-b border-[#B99A62] pb-3 text-[10px] font-semibold tracking-[0.17em] text-[#4B165C] transition-colors hover:text-[#7D8768] sm:self-auto"
    >
      {children}
      <ArrowUpRight
        size={17}
        className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
      />
    </button>
  );
}

/* ---------- Luxurious arrow button ---------- */
export function ArrowButton({
  dir,
  onClick,
  className = "",
  dark = false,
}: {
  dir: "left" | "right";
  onClick: () => void;
  className?: string;
  dark?: boolean;
}) {
  const Icon = dir === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={dir === "left" ? "Scroll left" : "Scroll right"}
      className={`group/arrow flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-500 hover:scale-110 sm:h-14 sm:w-14 ${
        dark
          ? "border-[#D9BE8B]/70 bg-[#30232F]/70 text-[#F7F2EA] backdrop-blur-md hover:border-[#D9BE8B] hover:bg-[#B99A62] hover:text-[#30232F]"
          : "border-[#B99A62]/70 bg-[#F7F2EA]/95 text-[#4B165C] shadow-[0_10px_30px_rgba(75,22,92,0.14)] hover:border-[#4B165C] hover:bg-[#4B165C] hover:text-[#F7F2EA]"
      } ${className}`}
    >
      <Icon size={22} strokeWidth={1.5} className="transition-transform duration-300 group-hover/arrow:scale-110" />
    </button>
  );
}

/* ---------- Auto scrolling horizontal carousel ---------- */
export function Carousel({
  children,
  interval = 3200,
  gap = 20,
}: {
  children: ReactNode;
  interval?: number;
  gap?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const paused = useRef(false);

  function scroll(dir: 1 | -1) {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const amount = (first?.offsetWidth ?? 280) + gap;
    const max = el.scrollWidth - el.clientWidth;

    if (dir === 1 && el.scrollLeft >= max - 6) el.scrollTo({ left: 0, behavior: "smooth" });
    else if (dir === -1 && el.scrollLeft <= 6) el.scrollTo({ left: max, behavior: "smooth" });
    else el.scrollBy({ left: dir * amount, behavior: "smooth" });
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      if (!paused.current) scroll(1);
    }, interval);
    return () => window.clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interval]);

  return (
    <div
      className="group/carousel relative"
      onMouseEnter={() => (paused.current = true)}
      onMouseLeave={() => (paused.current = false)}
      onTouchStart={() => (paused.current = true)}
      onTouchEnd={() => window.setTimeout(() => (paused.current = false), 4000)}
    >
      <div
        ref={ref}
        className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto scroll-smooth pb-2"
        style={{ gap, scrollbarWidth: "none" }}
      >
        {children}
      </div>
      <ArrowButton dir="left" onClick={() => scroll(-1)} className="absolute -left-2 top-[38%] z-10 sm:-left-5" />
      <ArrowButton dir="right" onClick={() => scroll(1)} className="absolute -right-2 top-[38%] z-10 sm:-right-5" />
      <style>{`.no-scrollbar::-webkit-scrollbar{display:none}`}</style>
    </div>
  );
}

/* ---------- Product card ---------- */
type CardProps = {
  product: StoreProduct;
  onAddToBag: (p: StoreProduct) => void;
  isSaved: boolean;
  onToggleSaved: (id: number) => void;
  go: Go;
  variant?: "classic" | "overlay";
  shopNow?: boolean;
  className?: string;
};

export function ProductCard({
  product,
  onAddToBag,
  isSaved,
  onToggleSaved,
  go,
  variant = "classic",
  shopNow = false,
  className = "",
}: CardProps) {
  const heart = (
    <button
      type="button"
      onClick={() => onToggleSaved(product.id)}
      aria-label={isSaved ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      aria-pressed={isSaved}
      className="absolute right-2 top-2 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-[#F7F2EA]/95 text-[#4B165C] shadow-sm transition-all duration-300 hover:scale-110 hover:bg-white sm:right-4 sm:top-4 sm:h-10 sm:w-10"
    >
      <Heart
        size={17}
        strokeWidth={1.5}
        fill={isSaved ? "#4B165C" : "none"}
        className={isSaved ? "scale-110" : "transition-transform duration-300"}
      />
    </button>
  );

  const tag = product.tag && (
    <span className="absolute left-2 top-2 z-10 bg-[#F7F2EA]/95 px-2.5 py-2 text-[7px] font-medium tracking-[0.12em] text-[#4B165C] sm:left-4 sm:top-4 sm:px-3 sm:text-[9px]">
      {product.tag}
    </span>
  );

  const lowStock = product.stock <= 5 && (
    <span className="text-[9px] tracking-[0.1em] text-[#9A8061]">ONLY {product.stock} LEFT</span>
  );

  if (variant === "overlay") {
    return (
      <article id={`product-${product.id}`} className={`group min-w-0 scroll-mt-40 ${className}`}>
        <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DCD1]">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            onClick={() => go(`/product/${product.id}`)}
            className="h-full w-full cursor-pointer object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]"
          />
          {tag}
          {heart}

          {/* hover veil (desktop) */}
          <div className="pointer-events-none absolute inset-0 hidden bg-gradient-to-t from-[#2D1038]/90 via-[#4B165C]/20 to-transparent opacity-0 transition-opacity duration-700 group-hover:opacity-100 lg:block" />
          <div className="absolute inset-x-0 bottom-0 hidden translate-y-6 flex-col gap-2 p-5 opacity-0 transition-all duration-700 group-hover:translate-y-0 group-hover:opacity-100 lg:flex">
            <p className="text-[9px] tracking-[0.2em] text-[#E8D2A7]">{product.category.toUpperCase()}</p>
            <h3 className="font-serif text-2xl leading-tight text-white">{product.name}</h3>
            <p className="font-serif text-xl italic text-[#E8D2A7]">{ngn(product.price)}</p>
            <button
              type="button"
              onClick={() => onAddToBag(product)}
              className="mt-2 flex items-center justify-center gap-2 bg-[#F7F2EA] px-3 py-3.5 text-[10px] font-semibold tracking-[0.14em] text-[#4B165C] transition-all duration-300 hover:bg-[#B99A62] hover:text-[#30232F]"
            >
              ADD TO CART <Plus size={14} />
            </button>
          </div>

          {/* mobile quick add */}
          <button
            type="button"
            onClick={() => onAddToBag(product)}
            aria-label={`Add ${product.name} to cart`}
            className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F2EA] text-[#4B165C] shadow-md lg:hidden"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="pt-4 lg:hidden">
          <h3 className="font-serif text-lg leading-snug text-[#4B165C]">{product.name}</h3>
          <p className="mt-1 text-sm font-medium text-[#5A4037]">{ngn(product.price)}</p>
        </div>
      </article>
    );
  }

  /* classic: same hover behaviour as the original product grid */
  return (
    <article id={`product-${product.id}`} className={`group min-w-0 scroll-mt-40 ${className}`}>
      <div className="relative aspect-[4/5] overflow-hidden bg-[#E8DCD1]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          onClick={() => go(`/product/${product.id}`)}
          className="h-full w-full cursor-pointer object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.08]"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#30232F]/15 via-transparent to-white/10 opacity-60" />
        {tag}
        {heart}
        <button
          type="button"
          onClick={() => onAddToBag(product)}
          className="absolute inset-x-2 bottom-2 flex translate-y-2 items-center justify-center gap-2 bg-[#F7F2EA] px-2 py-3 text-[9px] font-semibold tracking-[0.1em] text-[#4B165C] opacity-100 shadow-sm transition-all duration-500 hover:bg-[#4B165C] hover:text-white sm:inset-x-4 sm:bottom-4 sm:translate-y-3 sm:py-4 sm:text-[10px] sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100"
        >
          ADD TO BAG
          <Plus size={15} />
        </button>
      </div>

      <div className="pt-4 sm:pt-5">
        <p className="text-[8px] tracking-[0.12em] text-[#89766A] sm:text-[9px]">{product.category.toUpperCase()}</p>
        <h3 className="mt-2 font-serif text-lg leading-snug text-[#4B165C] transition-colors duration-300 group-hover:text-[#896B48] sm:text-xl">
          {product.name}
        </h3>
        <div className="mt-3 flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-[#5A4037]">{ngn(product.price)}</p>
          {lowStock}
        </div>
        <div className="mt-4 h-px w-full bg-[#D8C8B7]">
          <div className="h-px w-0 bg-[#4B165C] transition-all duration-700 group-hover:w-full" />
        </div>
        {shopNow && (
          <button
            type="button"
            onClick={() => go(`/product/${product.id}`)}
            className="group/shop mt-5 flex w-full items-center justify-center gap-3 border border-[#4B165C] px-4 py-3.5 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition-all duration-500 hover:bg-[#4B165C] hover:text-[#F7F2EA]"
          >
            SHOP NOW
            <ArrowUpRight size={15} className="transition-transform duration-300 group-hover/shop:-translate-y-0.5 group-hover/shop:translate-x-0.5" />
          </button>
        )}
      </div>
    </article>
  );
}

export const CARD_WIDTH = "w-[62vw] max-w-[300px] shrink-0 snap-start sm:w-[260px] lg:w-[285px]";
