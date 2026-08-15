// app/products/sofas/page.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import Link from "next/link";
import { getProducts } from "@/lib/api/products";
import ProductListWithFilter from "@/components/products/ProductListWithFilter";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Solid Teak Sofas & Living Suites | Nilambur Teak Heritage™",
  description:
    "Explore handcrafted solid Nilambur teak sofa sets, royal diwans, and living room suites. Handcrafted in Kerala with pan-India delivery.",
};

export default async function SofasPage() {
  const allProducts = await getProducts();
  const sofaProducts = allProducts.filter((p) => {
    const baseCat = p.categories?.base_category?.toLowerCase();
    const slug = p.categories?.slug?.toLowerCase();
    const name = p.name?.toLowerCase();
    const room = p.room?.toLowerCase();
    return (
      baseCat === "sofas" ||
      baseCat === "living room" ||
      slug?.includes("sofa") ||
      name?.includes("sofa") ||
      name?.includes("diwan") ||
      room?.includes("living")
    );
  });

  return (
    <main className="bg-white min-h-screen">
      {/* ── Editorial Header ── */}
      <section className="pt-12 pb-12 md:pt-16 md:pb-16 bg-white border-b border-[#EBEBEA]">
        <div className="max-container max-w-3xl space-y-4">
          <span className="eyebrow text-[#7A4E2D]">Living Room Collections</span>

          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141414] leading-[1.15] tracking-tight">
            Solid Teak Sofas & Living Suites
          </h1>

          <p className="text-base text-[#555555] font-light leading-relaxed">
            Handcrafted solid Nilambur teak sofa sets, diwans, and accent coffee tables built with traditional Kerala interlocking joinery for lifelong durability.
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
              Custom Dimensions
            </Link>
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <ProductListWithFilter initialProducts={sofaProducts} category="Living Room" />
    </main>
  );
}