import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  Coffee,
  Droplets,
  Flame,
  Flower2,
  Gem,
  Home,
  Moon,
  Pause,
  Play,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import {
  COLLECTIONS,
  LOVER_VIDEOS,
  MARQUEE_ITEMS,
  QUOTES,
  SHOP_BANNERS,
  STORE_PRODUCTS,
  slugify,
} from "../data/catalog";
import {
  ArrowButton,
  CARD_WIDTH,
  Carousel,
  Eyebrow,
  ProductCard,
  Reveal,
  SectionHead,
  SeeMoreLink,
  type CommerceProps,
} from "./ui";

export const INSTAGRAM_URL = "https://www.instagram.com/cristiano/"; // TODO: replace with the CEO's page
export const WHATSAPP_URL = "https://wa.me/2348139333832";

/* ================= 1. MOVING STRIP ================= */

const ICONS: Record<string, typeof Flower2> = {
  Pots: Flower2,
  Bags: ShoppingBag,
  Mirrors: Gem,
  Creams: Droplets,
  Serums: Sparkles,
  Candles: Flame,
  "Home Decor": Home,
  "Throws & Linen": Moon,
  Tableware: Coffee,
  "Self-care Basics": Sparkles,
};

export function MarqueeStrip({ go }: Pick<CommerceProps, "go">) {
  const items = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];
  return (
    <section
      aria-label="Everything in the store"
      className="group/strip relative overflow-hidden border-y border-[#B99A62]/50 bg-[#4B165C] py-4 sm:py-5"
    >
      <div className="soft-marquee flex w-max items-center gap-10 whitespace-nowrap group-hover/strip:[animation-play-state:paused]">
        {items.map((label, i) => {
          const Icon = ICONS[label] ?? Sparkles;
          return (
            <button
              key={`${label}-${i}`}
              type="button"
              onClick={() => go(`/collection/${slugify(label)}`)}
              className="group/item flex items-center gap-3 text-[#F7F2EA] transition-colors duration-300 hover:text-[#E8D2A7]"
            >
              <Icon size={17} strokeWidth={1.3} className="text-[#D9BE8B]" />
              <span className="font-serif text-lg italic sm:text-xl">{label}</span>
              <span className="ml-7 text-[#B99A62]">✦</span>
            </button>
          );
        })}
      </div>
      <style>{`
        @keyframes softMarquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .soft-marquee { animation: softMarquee 38s linear infinite; }
        @media (prefers-reduced-motion: reduce) { .soft-marquee { animation-duration: 120s; } }
      `}</style>
    </section>
  );
}

/* ================= 2. THE SOFT EDIT PRODUCT LINE ================= */

export function ProductLine({ onAddToBag, saved, onToggleSaved, go }: CommerceProps) {
  return (
    <section id="product-line" className="scroll-mt-36 relative overflow-hidden bg-[#EFE6DC] px-5 py-20 sm:px-10 sm:py-28 lg:py-32">
      <div className="pointer-events-none absolute -right-40 top-10 h-96 w-96 rounded-full border border-[#B99A62]/20" />
      <div className="pointer-events-none absolute -right-28 top-22 h-72 w-72 rounded-full border border-[#B99A62]/20" />

      <div className="relative mx-auto max-w-[1500px]">
        <Reveal>
          <SectionHead
            eyebrow="CONSIDER THIS YOUR LIFESTYLE SHELF"
            title="The Soft Edit"
            italic="Product Line."
            text="Pots, bags, mirrors, candles and skincare, gathered into one softly curated edit. Live beautifully, one lovely thing at a time."
            action={<SeeMoreLink onClick={() => go("/product-line")} />}
          />
        </Reveal>

        <div className="mt-12 sm:mt-16">
          <Carousel interval={1800}>
            {STORE_PRODUCTS.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onAddToBag={onAddToBag}
                isSaved={saved.includes(p.id)}
                onToggleSaved={onToggleSaved}
                go={go}
                className={CARD_WIDTH}
              />
            ))}
          </Carousel>
        </div>

        <Reveal delay={150}>
          <div className="mt-14 flex items-center justify-center gap-4 text-center">
            <span className="h-px w-10 bg-[#B99A62]/70" />
            <p className="font-serif text-base italic text-[#7D8768] sm:text-lg">{QUOTES[1]}</p>
            <span className="h-px w-10 bg-[#B99A62]/70" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ================= 3. FEATURED COLLECTIONS ================= */

export function FeaturedCollections({ go }: Pick<CommerceProps, "go">) {
  const cols = COLLECTIONS.map((c) => ({
    ...c,
    left: STORE_PRODUCTS.filter((p) => p.category === c.name).reduce((n, p) => n + p.stock, 0),
  }));

  return (
    <section id="collections" className="scroll-mt-36 overflow-hidden bg-[#F7F2EA] px-5 py-20 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <SectionHead
            eyebrow="A MORE PERSONAL KIND OF STORE"
            title="Featured"
            italic="collections."
            text="Every corner of a beautiful life, in one place. Pick a collection and wander in."
          />
        </Reveal>

        <div className="mt-12 sm:mt-16">
          <Carousel interval={3400}>
            {cols.map((c, i) => (
              <button
                key={c.slug}
                type="button"
                onClick={() => go(`/collection/${c.slug}`)}
                className="group w-[62vw] max-w-[300px] shrink-0 snap-start text-left sm:w-[260px] lg:w-[285px]"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-[#E8DCD1]">
                  <img
                    src={c.image}
                    alt={c.name}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-[1400ms] ease-out group-hover:scale-[1.12]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#30232F]/80 via-[#30232F]/5 to-transparent opacity-80 transition-opacity duration-700 group-hover:opacity-100" />
                  <div className="absolute inset-3 border border-white/0 transition-all duration-700 group-hover:inset-4 group-hover:border-white/50" />
                  <span className="absolute left-5 top-5 font-serif text-sm italic text-white/90">
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  <div className="absolute inset-x-5 bottom-6 text-white">
                    <h3 className="font-serif text-3xl leading-tight">
                      {c.name}
                      <span className="ml-2 font-sans text-base italic text-[#E8D2A7]">({c.left})</span>
                    </h3>
                    <p className="mt-2 text-[10px] tracking-[0.18em] text-[#E8D2A7]">{c.left} LEFT</p>
                    <span className="mt-4 flex h-0 items-center gap-3 overflow-hidden text-[10px] font-semibold tracking-[0.16em] opacity-0 transition-all duration-500 group-hover:h-9 group-hover:opacity-100">
                      SHOP THE COLLECTION <ArrowUpRight size={15} />
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

// /* ================= 4. SHOP BANNERS (3s auto slide) ================= */

// export function ShopBanners({ go }: Pick<CommerceProps, "go">) {
//   const [active, setActive] = useState(0);
//   const paused = useRef(false);
//   const total = SHOP_BANNERS.length;

//   useEffect(() => {
//     const t = window.setInterval(() => {
//       if (!paused.current) setActive((a) => (a + 1) % total);
//     }, 3000);
//     return () => window.clearInterval(t);
//   }, [total]);

//   return (
//     <section
//       className="relative isolate overflow-hidden bg-[#2D1038]"
//       onMouseEnter={() => (paused.current = true)}
//       onMouseLeave={() => (paused.current = false)}
//     >
//       <div className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[620px]">
//         {SHOP_BANNERS.map((b, i) => (
//           <div
//             key={b.collection}
//             aria-hidden={i !== active}
//             className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
//               i === active ? "opacity-100" : "pointer-events-none opacity-0"
//             }`}
//           >
//             <img
//               src={`https://loremflickr.com/1800/1000/${b.kw}?lock=${500 + i}`}
//               alt={b.collection}
//               loading="lazy"
//               className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
//                 i === active ? "scale-100" : "scale-110"
//               }`}
//             />
//             <div className="absolute inset-0 bg-gradient-to-r from-[#2D1038]/95 via-[#4B165C]/70 to-[#4B165C]/20" />
//             <div className="pointer-events-none absolute inset-4 border border-white/15 sm:inset-8" />

//             <div className="relative mx-auto flex h-full max-w-[1440px] items-center px-10 sm:px-20 lg:px-28">
//               <div className="max-w-xl py-16">
//                 <div className="mb-5 flex items-center gap-3">
//                   <span className="h-px w-10 bg-[#B99A62]" />
//                   <p className="text-[10px] uppercase tracking-[0.28em] text-[#E8D2A7]">
//                     The Soft Edit · {b.collection}
//                   </p>
//                 </div>
//                 <h2 className="font-serif text-4xl italic leading-[1.1] tracking-[-0.03em] text-[#F7F2EA] sm:text-5xl lg:text-6xl">
//                   {b.headline}
//                 </h2>
//                 <p className="mt-5 max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">{b.text}</p>
//                 <button
//                   type="button"
//                   onClick={() => go(`/collection/${slugify(b.collection)}`)}
//                   className="group mt-8 inline-flex items-center gap-6 border border-[#F7F2EA] bg-[#F7F2EA] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4B165C] transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#32103D]"
//                 >
//                   Shop now
//                   <ArrowUpRight size={17} className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}

//         <ArrowButton dark dir="left" onClick={() => setActive((a) => (a - 1 + total) % total)} className="absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6" />
//         <ArrowButton dark dir="right" onClick={() => setActive((a) => (a + 1) % total)} className="absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6" />

//         <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2">
//           {SHOP_BANNERS.map((b, i) => (
//             <button
//               key={b.collection}
//               type="button"
//               aria-label={`Show ${b.collection} banner`}
//               onClick={() => setActive(i)}
//               className={`h-[3px] rounded-full transition-all duration-500 ${i === active ? "w-10 bg-[#D9BE8B]" : "w-5 bg-white/40"}`}
//             />
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }


/* ================= 4. SHOP BANNERS (3s auto slide) ================= */

export function ShopBanners({ go }: Pick<CommerceProps, "go">) {
  const [active, setActive] = useState(0);
  const paused = useRef(false);
  const total = SHOP_BANNERS.length;

  const bannerImages: Record<string, string> = {
    skincare:
      "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=2000&q=85",
    serum:
      "https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?auto=format&fit=crop&w=2000&q=85",
    makeup:
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=2000&q=85",
    candle:
      "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&w=2000&q=85",
    bag:
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=2000&q=85",
    mirror:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85",
    plant:
      "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=2000&q=85",
    home:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85",
    linen:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85",
    gift:
      "https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=2000&q=85",
    default:
      "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=2000&q=85",
  };

  function getBannerImage(collection: string, keyword: string) {
    const description = `${collection} ${keyword}`.toLowerCase();

    if (/serum|skincare|skin care|cream|moisturi[sz]er|cleanser/.test(description)) {
      return bannerImages.serum;
    }

    if (/makeup|cosmetic|beauty/.test(description)) {
      return bannerImages.makeup;
    }

    if (/candle|aroma|fragrance/.test(description)) {
      return bannerImages.candle;
    }

    if (/bag|tote|handbag|purse/.test(description)) {
      return bannerImages.bag;
    }

    if (/mirror|interior|furniture|decor|decoration/.test(description)) {
      return bannerImages.mirror;
    }

    if (/plant|pot|flower|greenery/.test(description)) {
      return bannerImages.plant;
    }

    if (/throw|linen|blanket|bedding|bedroom/.test(description)) {
      return bannerImages.linen;
    }

    if (/gift|present|bundle|set/.test(description)) {
      return bannerImages.gift;
    }

    if (/home|living|tableware|homeware/.test(description)) {
      return bannerImages.home;
    }

    return bannerImages.default;
  }

  useEffect(() => {
    if (total <= 1) return;

    const timer = window.setInterval(() => {
      if (!paused.current) {
        setActive((current) => (current + 1) % total);
      }
    }, 2300);

    return () => window.clearInterval(timer);
  }, [total]);

  if (total === 0) return null;

  return (
    <section
      className="relative isolate overflow-hidden bg-[#2D1038]"
    //   onMouseEnter={() => {
    //     paused.current = true;
    //   }}
    //   onMouseLeave={() => {
    //     paused.current = false;
    //   }}
    >
      <div className="relative min-h-[460px] sm:min-h-[540px] lg:min-h-[620px]">
        {SHOP_BANNERS.map((banner, index) => (
          <div
            key={banner.collection}
            aria-hidden={index !== active}
            className={`absolute inset-0 transition-opacity duration-[1400ms] ease-in-out ${
              index === active
                ? "opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <img
              src={getBannerImage(banner.collection, banner.kw)}
              alt={`${banner.collection} lifestyle collection`}
              loading={index === 0 ? "eager" : "lazy"}
              fetchPriority={index === 0 ? "high" : "auto"}
              onError={(event) => {
                event.currentTarget.src = bannerImages.default;
              }}
              className={`absolute inset-0 h-full w-full object-cover transition-transform duration-[6000ms] ease-out ${
                index === active ? "scale-105" : "scale-110"
              }`}
            />

            <div className="absolute inset-0 bg-gradient-to-r from-[#2D1038]/95 via-[#4B165C]/70 to-[#4B165C]/20" />

            <div className="pointer-events-none absolute inset-4 border border-white/15 sm:inset-8" />

            <div className="relative mx-auto flex min-h-[460px] max-w-[1440px] items-center px-10 sm:min-h-[540px] sm:px-20 lg:min-h-[620px] lg:px-28">
              <div className="max-w-xl py-16">
                <div className="mb-5 flex items-center gap-3">
                  <span className="h-px w-10 bg-[#B99A62]" />

                  <p className="text-[10px] uppercase tracking-[0.28em] text-[#E8D2A7]">
                    The Soft Edit · {banner.collection}
                  </p>
                </div>

                <h2 className="font-serif text-4xl italic leading-[1.1] tracking-[-0.03em] text-[#F7F2EA] sm:text-5xl lg:text-6xl">
                  {banner.headline}
                </h2>

                <p className="mt-5 max-w-md text-sm leading-7 text-white/85 sm:text-base sm:leading-8">
                  {banner.text}
                </p>

                <button
                  type="button"
                  onClick={() =>
                    go(`/collection/${slugify(banner.collection)}`)
                  }
                  className="group mt-8 inline-flex items-center gap-6 border border-[#F7F2EA] bg-[#F7F2EA] px-7 py-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#4B165C] transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#32103D]"
                >
                  Shop now

                  <ArrowUpRight
                    size={17}
                    className="transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </button>
              </div>
            </div>
          </div>
        ))}

        <ArrowButton
          dark
          dir="left"
          onClick={() =>
            setActive((current) => (current - 1 + total) % total)
          }
          className="absolute left-3 top-1/2 z-10 -translate-y-1/2 sm:left-6"
        />

        <ArrowButton
          dark
          dir="right"
          onClick={() => setActive((current) => (current + 1) % total)}
          className="absolute right-3 top-1/2 z-10 -translate-y-1/2 sm:right-6"
        />

        <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center gap-2">
          {SHOP_BANNERS.map((banner, index) => (
            <button
              key={banner.collection}
              type="button"
              aria-label={`Show ${banner.collection} banner`}
              aria-current={index === active ? "true" : undefined}
              onClick={() => setActive(index)}
              className={`h-[3px] rounded-full transition-all duration-500 ${
                index === active
                  ? "w-10 bg-[#D9BE8B]"
                  : "w-5 bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}


/* ================= 5. FREQUENTLY ORDERED ================= */

export function FrequentlyOrdered({ onAddToBag, saved, onToggleSaved, go }: CommerceProps) {
  const list = STORE_PRODUCTS.filter((p) => p.frequent);
  return (
    <section className="overflow-hidden bg-[#FBF7F0] px-5 py-20 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <SectionHead
            eyebrow="THE ONES YOU KEEP COMING BACK FOR"
            title="Frequently"
            italic="ordered."
            text="Small repeat rituals and everyday favourites, restocked again and again."
          />
        </Reveal>
        <div className="mt-12 sm:mt-16">
          <Carousel interval={3000}>
            {list.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                variant="overlay"
                onAddToBag={onAddToBag}
                isSaved={saved.includes(p.id)}
                onToggleSaved={onToggleSaved}
                go={go}
                className={CARD_WIDTH}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

/* ================= 6. BEST SELLERS ================= */

export function BestSellers({ onAddToBag, saved, onToggleSaved, go }: CommerceProps) {
  const list = STORE_PRODUCTS.filter((p) => p.bestSeller);
  return (
    <section className="overflow-hidden bg-[#EDE3E9] px-5 py-20 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <SectionHead
            eyebrow="LOVED MOST, ORDERED MOST"
            title="Best"
            italic="sellers."
            text="The pieces everyone is talking about. Quietly beautiful, always in demand."
          />
        </Reveal>
        <div className="mt-12 sm:mt-16">
          <Carousel interval={3200}>
            {list.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                shopNow
                onAddToBag={onAddToBag}
                isSaved={saved.includes(p.id)}
                onToggleSaved={onToggleSaved}
                go={go}
                className={CARD_WIDTH}
              />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

/* ================= 7. SOFT EDIT LOVERS (videos) ================= */

function LoverVideo({
  src,
  title,
  product,
}: {
  src: string;
  title: string;
  product: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoReady, setVideoReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          void video
            .play()
            .then(() => setPlaying(true))
            .catch(() => {
              // The play button remains available if autoplay is blocked.
              setPlaying(false);
            });
        } else {
          video.pause();
          setPlaying(false);
        }
      },
      {
        threshold: 0.25,
      },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [src]);

  async function toggle() {
    const video = ref.current;
    if (!video) return;

    if (video.paused) {
      try {
        await video.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
      }
    } else {
      video.pause();
      setPlaying(false);
    }
  }

  return (
    <div className="group relative aspect-[9/16] w-[62vw] max-w-[270px] shrink-0 snap-start overflow-hidden bg-[#30232F] sm:w-[240px] lg:w-[255px]">
      <video
        ref={ref}
        src={src}
        muted
        loop
        playsInline
        autoPlay
        preload="auto"
        onLoadedData={() => {
          setVideoReady(true);
          setVideoError(false);
        }}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => {
          setVideoError(true);
          setPlaying(false);
        }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
      />

      {!videoReady && !videoError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 px-5 text-center text-[#F7F2EA]">
          <Sparkles size={26} className="text-[#D9BE8B]" />
          <p className="font-serif text-lg italic">A little moment of softness</p>
          <p className="text-[10px] tracking-[0.15em] text-white/60">
            LOADING VIDEO…
          </p>
        </div>
      )}

      {videoError && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-5 text-center text-[#F7F2EA]">
          <Play size={28} className="text-[#D9BE8B]" />
          <p className="font-serif text-lg italic">
            {title}
          </p>
          <p className="text-xs leading-6 text-white/70">
            This video could not be loaded. Please check the video file path.
          </p>
        </div>
      )}

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2D1038]/85 via-transparent to-[#2D1038]/20" />

      {!videoError && (
        <button
          type="button"
          onClick={() => void toggle()}
          aria-label={playing ? `Pause ${title}` : `Play ${title}`}
          className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/10 text-white backdrop-blur-sm transition-all duration-500 hover:bg-[#B99A62] hover:text-[#30232F]"
        >
          {playing ? (
            <Pause size={20} />
          ) : (
            <Play size={20} className="ml-0.5" />
          )}
        </button>
      )}

      <div className="pointer-events-none absolute inset-x-4 bottom-4 text-white">
        <p className="text-[9px] tracking-[0.2em] text-[#E8D2A7]">
          {product.toUpperCase()}
        </p>
        <p className="mt-1 font-serif text-lg italic">{title}</p>
      </div>
    </div>
  );
}


// function LoverVideo({ src, title, product }: { src: string; title: string; product: string }) {
//   const ref = useRef<HTMLVideoElement>(null);
//   const [playing, setPlaying] = useState(false);

//   function toggle() {
//     const v = ref.current;
//     if (!v) return;
//     if (v.paused) void v.play().then(() => setPlaying(true)).catch(() => {});
//     else {
//       v.pause();
//       setPlaying(false);
//     }
//   }

//   return (
//     <div
//       className="group relative aspect-[9/16] w-[62vw] max-w-[270px] shrink-0 snap-start overflow-hidden bg-[#30232F] sm:w-[240px] lg:w-[255px]"
//       onMouseEnter={() => {
//         void ref.current?.play().then(() => setPlaying(true)).catch(() => {});
//       }}
//       onMouseLeave={() => {
//         ref.current?.pause();
//         setPlaying(false);
//       }}
//     >
//       <video
//         ref={ref}
//         src={src}
//         muted
//         loop
//         playsInline
//         preload="metadata"
//         className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105"
//       />
//       <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#2D1038]/85 via-transparent to-[#2D1038]/20" />
//       <button
//         type="button"
//         onClick={toggle}
//         aria-label={playing ? `Pause ${title}` : `Play ${title}`}
//         className="absolute left-1/2 top-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/70 bg-white/10 text-white backdrop-blur-sm transition-all duration-500 hover:bg-[#B99A62] hover:text-[#30232F]"
//       >
//         {playing ? <Pause size={20} /> : <Play size={20} className="ml-0.5" />}
//       </button>
//       <div className="absolute inset-x-4 bottom-4 text-white">
//         <p className="text-[9px] tracking-[0.2em] text-[#E8D2A7]">{product.toUpperCase()}</p>
//         <p className="mt-1 font-serif text-lg italic">{title}</p>
//       </div>
//     </div>
//   );
// }

export function LoversVideos() {
  return (
    <section id="lovers" className="scroll-mt-36 overflow-hidden bg-[#30232F] px-5 py-20 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1500px]">
        <Reveal>
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionHead
              light
              eyebrow="REAL RITUALS, REAL HOMES"
              title="The Soft Edit lovers"
              italic="use our products daily."
              text="A peek at how our community lives beautifully, in their own words and their own rooms."
            />

            <div className="flex items-center gap-3">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Follow The Soft Edit on Instagram"
                className="group flex items-center gap-3 border border-[#D9BE8B]/60 px-5 py-3 text-[10px] font-semibold tracking-[0.16em] text-[#F7F2EA] transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F]"
              >
                <FaInstagram size={18} /> INSTAGRAM
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat with The Soft Edit on WhatsApp"
                className="group flex items-center gap-3 border border-[#D9BE8B]/60 px-5 py-3 text-[10px] font-semibold tracking-[0.16em] text-[#F7F2EA] transition-all duration-300 hover:-translate-y-1 hover:border-[#B99A62] hover:bg-[#B99A62] hover:text-[#30232F]"
              >
                <FaWhatsapp size={18} /> WHATSAPP
              </a>
            </div>
          </div>
        </Reveal>

        <div className="mt-12 sm:mt-16">
          <Carousel interval={3600}>
            {LOVER_VIDEOS.map((v) => (
              <LoverVideo key={v.id} src={v.src} title={v.title} product={v.product} />
            ))}
          </Carousel>
        </div>
      </div>
    </section>
  );
}

/* ================= 8. BRAND PHILOSOPHY + WHY CHOOSE ================= */

export function BrandPhilosophy({ go }: Pick<CommerceProps, "go">) {
  const [open, setOpen] = useState(false);

  const reasons = [
    ["Thoughtfully curated", "Every pot, bag, mirror and cream is chosen because it earns its place in your life."],
    ["Beauty with intention", "We believe the things you live with should make you feel looked after."],
    ["Self-care, everywhere", "From your skin to your shelf, softness belongs in every part of your day."],
    ["A lovely delivery", "Carefully packed and sent from our edit to your door."],
  ];

  return (
    <section className="relative overflow-hidden bg-[#FBF7F0] px-5 py-20 sm:px-10 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-4xl text-center">
        <div className="flex justify-center">
          <Eyebrow>OUR PHILOSOPHY</Eyebrow>
        </div>
        <h2 className="mt-6 font-serif text-4xl leading-[1.1] tracking-[-0.04em] text-[#4B165C] sm:text-5xl md:text-6xl">
          It's literally
          <br />
          <em className="text-[#9A8061]">The Soft Edit.</em>
        </h2>
        <p className="mx-auto mt-7 max-w-2xl text-sm leading-8 text-[#7A685E] sm:text-base">
          The Soft Edit is a lifestyle store for the woman who believes beauty lives in the details: the plant pot by the
          window, the bag on your arm, the mirror that catches the morning light, the cream you reach for at night.
          We gather considered essentials that turn everyday moments into small rituals, because looking after yourself
          should feel like a kindness, never another thing on your to-do list.
        </p>
        <p className="mx-auto mt-6 font-serif text-xl italic text-[#7D8768] sm:text-2xl">{QUOTES[3]}</p>

        <div className="mt-12 border-t border-[#E6D9CA] pt-10">
          <h3 className="font-serif text-2xl text-[#4B165C] sm:text-3xl">Why choose The Soft Edit</h3>

          <div
            className={`mx-auto grid max-w-3xl overflow-hidden transition-all duration-700 ease-in-out ${
              open ? "mt-10 max-h-[1400px] opacity-100" : "max-h-0 opacity-0"
            }`}
            aria-hidden={!open}
          >
            <div className="grid gap-x-10 gap-y-8 text-left sm:grid-cols-2">
              {reasons.map(([t, d]) => (
                <div key={t}>
                  <p className="font-serif text-xl text-[#4B165C]">{t}</p>
                  <p className="mt-2 text-sm leading-7 text-[#7A685E]">{d}</p>
                </div>
              ))}
            </div>

            <div className="mt-12 border border-[#D9C5A4] bg-[#F7F2EA] px-6 py-9 sm:px-12">
              <p className="text-[10px] tracking-[0.24em] text-[#7D8768]">OUR PROMISE</p>
              <p className="mt-4 font-serif text-2xl italic leading-snug text-[#4B165C] sm:text-3xl">
                To keep it soft, honest and beautiful. Quality you can feel, service that cares, and a store that
                helps you live beautifully.
              </p>
              <button
                type="button"
                onClick={() => go("/waitlist")}
                className="mt-7 inline-flex items-center gap-4 border-b border-[#B99A62] pb-2 text-[10px] font-semibold tracking-[0.16em] text-[#4B165C] transition-colors hover:text-[#7D8768]"
              >
                JOIN THE WAITLIST <ArrowUpRight size={15} />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            className="group mt-8 inline-flex items-center gap-4 border border-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.16em] text-[#4B165C] transition-all duration-500 hover:bg-[#4B165C] hover:text-[#F7F2EA]"
          >
            {open ? "READ LESS" : "READ MORE"}
            <ArrowUpRight size={16} className={`transition-transform duration-500 ${open ? "rotate-90" : "group-hover:-translate-y-1 group-hover:translate-x-1"}`} />
          </button>
        </div>
      </div>
    </section>
  );
}
