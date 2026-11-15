
import { useMemo } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Heart,
  ShoppingBag,
  Trash2,
} from "lucide-react";

type FavouriteProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  tag?: string;
  color?: string;
};

type Props = {
  products: FavouriteProduct[];
  saved: number[];
  onToggleSaved: (id: number) => void | Promise<void>;
  onAddToBag: (product: FavouriteProduct) => void;
  onContinueShopping: () => void;
};

const money = (value: number) =>
  new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);

export default function MyFavouritesPage({
  products,
  saved,
  onToggleSaved,
  onAddToBag,
  onContinueShopping,
}: Props) {
  const favourites = useMemo(
    () =>
      products.filter((product) =>
        saved.includes(Number(product.id))
      ),
    [products, saved]
  );

  return (
    <main className="min-h-[70vh] bg-[#F7F2EA] text-[#5A4037]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-[#211625] px-5 py-16 text-[#F7F2EA] sm:px-10 sm:py-24">
        <div className="pointer-events-none absolute -right-24 -top-32 h-96 w-96 rounded-full border border-[#B99A62]/20" />
        <div className="pointer-events-none absolute -right-10 -top-16 h-64 w-64 rounded-full border border-[#B99A62]/20" />

        <div className="relative mx-auto max-w-[1400px]">
          <button
            type="button"
            onClick={onContinueShopping}
            className="mb-10 inline-flex items-center gap-2 text-[10px] font-semibold tracking-[.18em] text-white/65 transition hover:text-[#E6D3AD]"
          >
            <ArrowLeft size={15} />
            CONTINUE SHOPPING
          </button>

          <p className="text-[10px] font-semibold tracking-[.28em] text-[#D9BE8B]">
            YOUR PERSONAL EDIT
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <h1 className="font-serif text-5xl leading-[1.05] sm:text-6xl lg:text-7xl">
                My <em className="text-[#D9BE8B]">Favourites.</em>
              </h1>

              <p className="mt-5 max-w-xl text-sm leading-7 text-white/65">
                A considered collection of the pieces you love. Keep your
                most-loved rituals close, all in one beautiful place.
              </p>
            </div>

            <div className="flex items-center gap-3 self-start rounded-full border border-[#D9BE8B]/30 px-5 py-3 md:self-auto">
              <Heart size={17} className="text-[#D9BE8B]" />
              <span className="text-xs tracking-wide">
                {favourites.length} saved{" "}
                {favourites.length === 1 ? "piece" : "pieces"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* FAVOURITES */}
      <section className="mx-auto max-w-[1400px] px-5 py-14 sm:px-10 sm:py-20">
        {favourites.length === 0 ? (
          <div className="mx-auto flex max-w-2xl flex-col items-center py-16 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#EDE3E9] text-[#4B165C]">
              <Heart size={30} strokeWidth={1.25} />
            </div>

            <p className="mt-8 text-[10px] font-semibold tracking-[.25em] text-[#9A8061]">
              A LITTLE SPACE FOR LOVE
            </p>

            <h2 className="mt-3 font-serif text-4xl text-[#4B165C]">
              Your edit is waiting.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#806D61]">
              Tap the heart on any product to save it here. Your favourites
              will be ready whenever you are.
            </p>

            <button
              type="button"
              onClick={onContinueShopping}
              className="mt-8 inline-flex items-center gap-3 bg-[#4B165C] px-7 py-4 text-[10px] font-semibold tracking-[.16em] text-white transition hover:bg-[#35203B]"
            >
              DISCOVER THE EDIT
              <ArrowUpRight size={15} />
            </button>
          </div>
        ) : (
          <>
            <div className="mb-8 flex items-end justify-between gap-4 border-b border-[#DCCFC2] pb-5">
              <div>
                <p className="text-[9px] tracking-[.22em] text-[#9A8061]">
                  SAVED WITH LOVE
                </p>

                <h2 className="mt-2 font-serif text-3xl text-[#4B165C]">
                  Your selected pieces
                </h2>
              </div>

              <p className="text-xs text-[#8A776B]">
                {favourites.length}{" "}
                {favourites.length === 1 ? "item" : "items"}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-x-4 gap-y-10 sm:gap-x-6 lg:grid-cols-4">
              {favourites.map((product) => (
                <article key={product.id} className="group min-w-0">
                  <div
                    className="relative aspect-[4/5] overflow-hidden bg-[#EDE3E9]"
                    style={{
                      backgroundColor: product.color || "#EDE3E9",
                    }}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.06]"
                    />

                    <button
                      type="button"
                      aria-label={`Remove ${product.name} from favourites`}
                      onClick={() => void onToggleSaved(product.id)}
                      className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-[#F7F2EA] text-[#4B165C] shadow-md transition hover:scale-105"
                      title="Remove from favourites"
                    >
                      <Heart
                        size={18}
                        fill="#4B165C"
                        strokeWidth={1.5}
                      />
                    </button>

                    {product.tag && (
                      <span className="absolute bottom-3 left-3 bg-[#F7F2EA]/95 px-3 py-2 text-[8px] tracking-[.14em] text-[#4B165C]">
                        {product.tag}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 text-[8px] tracking-[.14em] text-[#9A8061]">
                    {product.category || "THE SOFT EDIT"}
                  </p>

                  <h3 className="mt-2 font-serif text-lg leading-snug text-[#4B165C] sm:text-xl">
                    {product.name}
                  </h3>

                  <div className="mt-3 flex items-center justify-between gap-2">
                    <span className="text-sm font-medium text-[#5A4037]">
                      {money(product.price)}
                    </span>

                    <button
                      type="button"
                      onClick={() => void onToggleSaved(product.id)}
                      className="inline-flex items-center gap-1 text-[9px] tracking-wide text-[#8A776B] transition hover:text-[#4B165C]"
                    >
                      <Trash2 size={13} />
                      REMOVE
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => onAddToBag(product)}
                    className="mt-4 flex w-full items-center justify-center gap-2 bg-[#4B165C] px-3 py-3.5 text-[9px] font-semibold tracking-[.15em] text-white transition hover:bg-[#35203B]"
                  >
                    <ShoppingBag size={14} />
                    ADD TO BAG
                  </button>
                </article>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
