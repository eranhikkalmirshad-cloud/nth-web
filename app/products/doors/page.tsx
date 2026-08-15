// app/products/doors/page.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import ProductListWithFilter from "@/components/products/ProductListWithFilter";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Hand-Carved Teak Doors & Frames | Nilambur Teak Heritage™",
  description:
    "Explore traditional hand-carved Nilambur teak main doors, pooja room doors, and heavy timber frames with antique brass ornamentation.",
};

export default async function DoorsPage() {
  const allProducts = await getProducts();
  const doorProducts = allProducts.filter((p) => {
    const baseCat = p.categories?.base_category?.toLowerCase();
    const slug = p.categories?.slug?.toLowerCase();
    const name = p.name?.toLowerCase();
    return (
      baseCat === "doors" ||
      slug?.includes("door") ||
      name?.includes("door") ||
      name?.includes("frame")
    );
  });

  return (
    <main className="bg-white min-h-screen">
      <section className="pt-12 pb-12 md:pt-16 md:pb-16 bg-white border-b border-[#EBEBEA]">
        <div className="max-container max-w-3xl space-y-4">
          <span className="eyebrow text-[#7A4E2D]">Architectural Woodwork</span>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141414] leading-[1.15] tracking-tight">
            Hand-Carved Teak Doors & Frames
          </h1>

          <p className="text-base text-[#555555] font-light leading-relaxed">
            A grand entrance defines the character of your residence. Handcrafted from mature, thick Nilambur teak heartwood slabs with authentic antique brass hardware and weather-sealed lacquer coats.
          </p>

          <div className="pt-2 flex items-center gap-3">
            <a
              href={SITE_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center gap-2"
            >
              <MessageCircle size={15} />
              <span>Custom Door Consultation</span>
            </a>

            <Link
              href="/contact"
              className="btn-secondary"
            >
              Architectural Drawings
            </Link>
          </div>
        </div>
      </section>

      <ProductListWithFilter initialProducts={doorProducts} category="Doors & Frames" />
    </main>
  );
}
