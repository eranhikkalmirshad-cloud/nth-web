import { getProducts } from "@/lib/api/products";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "All Teak Pieces | Nilambur Teak Heritage™",
  description: "Browse the complete collection of 100% genuine Nilambur teak wood furniture.",
};

export default async function AllPiecesPage() {
  const products = await getProducts();

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-16 md:py-20">
      <div className="max-container">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="eyebrow text-[#7A4E2D]">Masterpiece Catalog</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141414]">
            All Handcrafted Teak Pieces
          </h1>
          <p className="text-sm md:text-base text-[#555555] font-light">
            Explore every handcrafted teak creation made with pride in Nilambur, Kerala.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {products.map((product, index) => (
            <FadeInView key={`${product.slug}-${index}`} delay={index * 0.03}>
              <ProductCard product={product} />
            </FadeInView>
          ))}
        </div>
      </div>
    </div>
  );
}
