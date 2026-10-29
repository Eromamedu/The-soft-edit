import { useState } from "react";
import { ArrowLeft, Heart, Minus, Plus, ShieldCheck, Sparkles, Truck } from "lucide-react";
import { STORE_PRODUCTS, ngn, slugify } from "../data/catalog";
import { Carousel, CARD_WIDTH, Eyebrow, ProductCard, type CommerceProps } from "../components/ui";

export default function ProductDetailPage({
  productId,
  onBuyNow,
  ...props
}: CommerceProps & { productId: number; onBuyNow: (p: (typeof STORE_PRODUCTS)[number], qty: number) => void }) {
  const product = STORE_PRODUCTS.find((p) => p.id === productId);
  const [qty, setQty] = useState(1);

  if (!product) {
    return (
      <section className="bg-[#EFE6DC] px-5 pb-32 pt-48 text-center">
        <h1 className="font-serif text-5xl italic text-[#4B165C]">That piece has wandered off.</h1>
        <button type="button" onClick={() => props.go("/product-line")} className="mt-8 border border-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] hover:bg-[#4B165C] hover:text-[#F7F2EA]">
          BACK TO THE EDIT
        </button>
      </section>
    );
  }

  const saved = props.saved.includes(product.id);
  const soldOut = product.stock <= 0;
  const related = STORE_PRODUCTS.filter((p) => p.category === product.category && p.id !== product.id);

  function addMany() {
    for (let i = 0; i < qty; i++) props.onAddToBag(product!);
  }

  return (
    <div className="bg-[#FBF7F0]">
      <div className="mx-auto max-w-[1400px] px-5 pb-20 pt-36 sm:px-10 sm:pt-44">
        <button type="button" onClick={() => props.go(`/collection/${slugify(product.category)}`)} className="mb-8 flex items-center gap-2 text-[10px] tracking-[0.16em] text-[#7D8768] hover:text-[#4B165C]">
          <ArrowLeft size={14} /> {product.category.toUpperCase()}
        </button>

        <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="relative overflow-hidden bg-[#E8DCD1]">
            <img src={product.image} alt={product.name} className="aspect-[4/5] w-full object-cover" />
            {product.tag && (
              <span className="absolute left-4 top-4 bg-[#F7F2EA]/95 px-3 py-2 text-[9px] font-medium tracking-[0.12em] text-[#4B165C]">{product.tag}</span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <Eyebrow>{product.category.toUpperCase()}</Eyebrow>
            <h1 className="mt-5 font-serif text-4xl leading-[1.1] tracking-[-0.03em] text-[#4B165C] sm:text-5xl">{product.name}</h1>
            <p className="mt-5 font-serif text-3xl italic text-[#896B48]">{ngn(product.price)}</p>
            <p className="mt-6 max-w-md text-sm leading-8 text-[#7A685E] sm:text-base">
              {product.blurb} Thoughtfully chosen for The Soft Edit, so everyday moments feel like a small ritual. Live beautifully.
            </p>

            <p className={`mt-5 text-[11px] tracking-[0.14em] ${soldOut ? "text-[#9A4B4B]" : product.stock <= 5 ? "text-[#9A8061]" : "text-[#7D8768]"}`}>
              {soldOut ? "SOLD OUT" : product.stock <= 5 ? `ONLY ${product.stock} LEFT` : `${product.stock} IN STOCK`}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center border border-[#D8C8B7]">
                <button type="button" aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))} className="flex h-12 w-12 items-center justify-center hover:bg-[#EFE6DC]">
                  <Minus size={15} />
                </button>
                <span className="min-w-10 text-center text-sm">{qty}</span>
                <button type="button" aria-label="Increase quantity" onClick={() => setQty((q) => Math.min(product.stock || 1, q + 1))} className="flex h-12 w-12 items-center justify-center hover:bg-[#EFE6DC]">
                  <Plus size={15} />
                </button>
              </div>

              <button
                type="button"
                onClick={() => props.onToggleSaved(product.id)}
                aria-pressed={saved}
                aria-label={saved ? "Remove from wishlist" : "Add to wishlist"}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-[#B99A62] text-[#4B165C] transition-all duration-300 hover:scale-110"
              >
                <Heart size={19} strokeWidth={1.5} fill={saved ? "#4B165C" : "none"} />
              </button>
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <button
                type="button"
                disabled={soldOut}
                onClick={addMany}
                className="flex items-center justify-center gap-3 border border-[#4B165C] px-6 py-5 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] transition-all duration-500 hover:bg-[#4B165C] hover:text-[#F7F2EA] disabled:opacity-40"
              >
                ADD TO BAG <Plus size={15} />
              </button>
              <button
                type="button"
                disabled={soldOut}
                onClick={() => onBuyNow(product, qty)}
                className="flex items-center justify-center gap-3 bg-[#4B165C] px-6 py-5 text-[10px] font-semibold tracking-[0.15em] text-white transition-all duration-500 hover:bg-[#351043] disabled:opacity-40"
              >
                BUY NOW <Sparkles size={15} />
              </button>
            </div>

            <div className="mt-10 space-y-4 border-t border-[#E6D9CA] pt-7 text-xs text-[#7A685E]">
              <p className="flex items-center gap-3"><Truck size={17} className="text-[#B99A62]" /> Carefully packed and delivered to your door.</p>
              <p className="flex items-center gap-3"><ShieldCheck size={17} className="text-[#B99A62]" /> Secure payment by card, bank transfer, USSD or Paystack.</p>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-24">
            <h2 className="font-serif text-3xl text-[#4B165C] sm:text-4xl">
              More from <em className="text-[#9A8061]">{product.category}</em>
            </h2>
            <div className="mt-10">
              <Carousel interval={3500}>
                {related.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onAddToBag={props.onAddToBag}
                    isSaved={props.saved.includes(p.id)}
                    onToggleSaved={props.onToggleSaved}
                    go={props.go}
                    className={CARD_WIDTH}
                  />
                ))}
              </Carousel>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
