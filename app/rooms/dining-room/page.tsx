import { getProducts } from "@/lib/api/products";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Dining Room Teak Collection | Nilambur Teak Heritage™",
  description: "Explore handcrafted solid Nilambur teak dining tables, 6-seater and 8-seater sets, and ergonomic chairs.",
};

export default async function DiningRoomPage() {
  const products = await getProducts();
  const roomProducts = products.filter(
    (p) =>
      (typeof p.room === "string" && p.room.toLowerCase().includes("dining")) ||
      (typeof p.category_id === "string" && p.category_id.toLowerCase().includes("dining")) ||
      (p.categories?.name && p.categories.name.toLowerCase().includes("dining"))
  );

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-16 md:py-20">
      <div className="max-container">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="eyebrow text-[#7A4E2D]">Feasts & Gatherings</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141414]">
            Dining Room Collection
          </h1>
          <p className="text-sm md:text-base text-[#555555] font-light">
            Massive solid teak slab dining tables and handcrafted chairs carved for generational family memories.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {roomProducts.map((product, index) => (
            <FadeInView key={`${product.slug}-${index}`} delay={index * 0.04}>
              <ProductCard product={product} />
            </FadeInView>
          ))}
        </div>
      </div>
    </div>
  );
}
