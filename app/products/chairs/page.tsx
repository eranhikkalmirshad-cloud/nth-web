// app/products/chairs/page.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import ProductListWithFilter from "@/components/products/ProductListWithFilter";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Handcrafted Teak Chairs | Nilambur Teak Heritage™",
  description:
    "Explore handcrafted solid Nilambur teak chairs, dining chairs, royal easy chairs, and executive armchairs.",
};

export default async function ChairsPage() {
  const allProducts = await getProducts();
  const chairProducts = allProducts.filter((p) => {
    const baseCat = p.categories?.base_category?.toLowerCase();
    const slug = p.categories?.slug?.toLowerCase();
    const name = p.name?.toLowerCase();
    return (
      baseCat === "chairs" ||
      slug?.includes("chair") ||
      name?.includes("chair") ||
      name?.includes("armchair") ||
      name?.includes("bench")
    );
  });

  return (
    <main className="bg-white min-h-screen">
      <section className="pt-12 pb-12 md:pt-16 md:pb-16 bg-white border-b border-[#EBEBEA]">
        <div className="max-container max-w-3xl space-y-4">
          <span className="eyebrow text-[#7A4E2D]">Artisan Seating</span>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141414] leading-[1.15] tracking-tight">
            Handcrafted Teak Chairs & Seating
          </h1>

          <p className="text-base text-[#555555] font-light leading-relaxed">
            From traditional Kerala cane-back planter easy chairs to ergonomic executive armchairs, every piece is sculpted from solid seasoned Nilambur teak wood.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a
              href={SITE_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Inquiry</span>
            </a>

            <Link
              href="/contact"
              className="btn-secondary"
            >
              Custom Fabric / Cane
            </Link>
          </div>
        </div>
      </section>

      <ProductListWithFilter initialProducts={chairProducts} category="Chairs" />
    </main>
  );
}
