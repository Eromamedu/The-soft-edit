import { ArrowLeft } from "lucide-react";
import { COLLECTIONS, STORE_PRODUCTS } from "../data/catalog";
import { Eyebrow, type CommerceProps } from "../components/ui";
import { FilterableGrid } from "./ProductLinePage";

export default function CollectionPage({ slug, ...props }: CommerceProps & { slug: string }) {
  const collection = COLLECTIONS.find((c) => c.slug === slug);

  if (!collection) {
    return (
      <section className="bg-[#EFE6DC] px-5 pb-32 pt-48 text-center">
        <h1 className="font-serif text-5xl italic text-[#4B165C]">We couldn't find that collection.</h1>
        <button type="button" onClick={() => props.go("/product-line")} className="mt-8 border border-[#4B165C] px-8 py-4 text-[10px] font-semibold tracking-[0.15em] text-[#4B165C] hover:bg-[#4B165C] hover:text-[#F7F2EA]">
          VIEW THE FULL EDIT
        </button>
      </section>
    );
  }

  const left = STORE_PRODUCTS.filter((p) => p.category === collection.name).reduce((n, p) => n + p.stock, 0);

  return (
    <div className="bg-[#EFE6DC]">
      <div className="relative isolate overflow-hidden bg-[#2D1038]">
        <img src={collection.image} alt="" aria-hidden="true" className="absolute inset-0 -z-20 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#2D1038]/95 via-[#4B165C]/80 to-[#4B165C]/40" />
        <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-40 sm:px-10 sm:pb-20 sm:pt-48">
          <button type="button" onClick={() => props.go("/product-line")} className="mb-8 flex items-center gap-2 text-[10px] tracking-[0.16em] text-[#E8D2A7] hover:text-white">
            <ArrowLeft size={14} /> THE FULL EDIT
          </button>
          <Eyebrow light>{left} LEFT IN STOCK</Eyebrow>
          <h1 className="mt-5 font-serif text-5xl italic leading-[1.05] tracking-[-0.04em] text-[#F7F2EA] sm:text-6xl lg:text-7xl">
            {collection.name}
          </h1>
          <p className="mt-5 max-w-lg text-sm leading-8 text-white/85 sm:text-base">{collection.blurb}</p>
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-5 pb-24 pt-10 sm:px-10 lg:pb-32">
        <FilterableGrid {...props} fixedCategory={collection.name} />
      </div>
    </div>
  );
}
