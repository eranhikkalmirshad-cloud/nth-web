// app/products/dining/page.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import ProductListWithFilter from "@/components/products/ProductListWithFilter";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Solid Teak Dining Sets | Nilambur Teak Heritage™",
  description:
    "Explore solid Nilambur teak dining tables and handcrafted chairs. 6-seater and 8-seater suites handcrafted from legal Kerala teak wood.",
};

export default async function DiningPage() {
  const allProducts = await getProducts();
  const diningProducts = allProducts.filter((p) => {
    const baseCat = p.categories?.base_category?.toLowerCase();
    const slug = p.categories?.slug?.toLowerCase();
    const name = p.name?.toLowerCase();
    const room = p.room?.toLowerCase();
    return (
      baseCat === "dining" ||
      slug?.includes("dining") ||
      name?.includes("dining") ||
      room?.includes("dining")
    );
  });

  return (
    <main className="bg-white min-h-screen">
      <section className="pt-12 pb-12 md:pt-16 md:pb-16 bg-white border-b border-[#EBEBEA]">
        <div className="max-container max-w-3xl space-y-4">
          <span className="eyebrow text-[#7A4E2D]">Dining Room Suites</span>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141414] leading-[1.15] tracking-tight">
            Royal Nilambur Teak Dining Sets
          </h1>

          <p className="text-base text-[#555555] font-light leading-relaxed">
            From intimate 4-seater breakfast sets to grand 12-seater solid teak slab banquet tables, our dining collections celebrate family gatherings and artisan woodworking.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a
              href={SITE_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <MessageCircle size={15} />
              <span>Request Dining Quote</span>
            </a>

            <Link
              href="/contact"
              className="btn-secondary"
            >
              Custom Table Sizing
            </Link>
          </div>
        </div>
      </section>

      <ProductListWithFilter initialProducts={diningProducts} category="Dining" />
    </main>
  );
}
