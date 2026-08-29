// app/rooms/kitchen/page.tsx
import { getProducts } from "@/lib/api/products";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Kitchen Collection & Cabinetry | Nilambur Teak Heritage™",
  description: "Explore solid Nilambur teak modular kitchen cabinets, crockery units, pantry cupboards, and architectural teak joinery.",
};

export default async function KitchenRoomPage() {
  const products = await getProducts();
  const roomProducts = products.filter(
    (p) =>
      (typeof p.room === "string" && p.room.toLowerCase().includes("kitchen")) ||
      (typeof p.category_id === "string" && (p.category_id.toLowerCase().includes("kitchen") || p.category_id.toLowerCase().includes("cabinet"))) ||
      (p.categories?.name && (p.categories.name.toLowerCase().includes("kitchen") || p.categories.name.toLowerCase().includes("cabinet"))) ||
      (p.categories?.slug && (p.categories.slug.toLowerCase().includes("kitchen") || p.categories.slug.toLowerCase().includes("cabinet"))) ||
      (p.name && (p.name.toLowerCase().includes("kitchen") || p.name.toLowerCase().includes("cabinet") || p.name.toLowerCase().includes("crockery") || p.name.toLowerCase().includes("cupboard")))
  );

  return (
    <div className="bg-[#FAFAF9] min-h-screen py-16 md:py-20 font-sans">
      <div className="max-container">
        <div className="max-w-2xl mb-12 space-y-3">
          <span className="eyebrow text-[#8A572A]">Culinary Woodwork</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141414]">
            Kitchen Collection
          </h1>
          <p className="text-sm md:text-base text-[#555555] font-light leading-relaxed">
            Moisture-resistant, 100% genuine mature solid Nilambur teak modular cabinetry, crockery units, and bespoke pantry millwork.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {roomProducts.map((product, index) => (
            <FadeInView key={`${product.slug}-${index}`} delay={index * 0.04}>
              <ProductCard product={product} />
            </FadeInView>
          ))}
        </div>

        {roomProducts.length === 0 && (
          <div className="py-20 text-center bg-white rounded-2xl border border-slate-200 p-8">
            <h3 className="text-lg font-serif font-bold text-slate-900 mb-2">
              Bespoke Kitchen Cabinetry Available
            </h3>
            <p className="text-xs text-slate-600 max-w-md mx-auto mb-6">
              All Nilambur teak kitchen cabinets, island counters, and pantry units are custom-commissioned based on your floor plan dimensions.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-6 py-3 bg-[#8A572A] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#1C130D] transition-colors"
            >
              Request Custom Kitchen Estimation
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
