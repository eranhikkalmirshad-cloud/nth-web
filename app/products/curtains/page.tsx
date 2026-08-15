// app/products/curtains/page.tsx
export const dynamic = "force-dynamic";

import type { Metadata } from "next";
import { MessageCircle } from "lucide-react";
import { getProducts } from "@/lib/api/products";
import ProductListWithFilter from "@/components/products/ProductListWithFilter";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: "Interior Textiles & Drapes | Nilambur Teak Heritage™",
  description: "Explore curated luxury draperies and upholstery fabrics crafted to complement our solid teak wood furniture.",
};

export default async function CurtainsPage() {
  const allProducts = await getProducts();
  const curtainProducts = allProducts.filter((p) => {
    const baseCat = p.categories?.base_category?.toLowerCase();
    const slug = p.categories?.slug?.toLowerCase();
    const name = p.name?.toLowerCase();
    return baseCat === "curtains" || slug?.includes("curtain") || name?.includes("curtain");
  });

  return (
    <main className="bg-[#FDFAF5] min-h-screen">
      <section className="hidden md:block bg-white border-b border-[#D4A96A]/30 py-16">
        <div className="max-container px-4 md:px-8">
          <div className="flex items-center gap-3 mb-8 text-[11px] font-bold tracking-[0.25em] uppercase text-[#C9922A] font-lato">
            Luxury Textiles & Draperies
            <span className="flex-1 h-px bg-[#D4A96A]/30" aria-hidden="true" />
          </div>

          <div className="grid grid-cols-2 gap-12">
            <div className="pr-8 border-r border-[#D4A96A]/30">
              <h1 className="text-3xl lg:text-4xl font-bold leading-tight text-[#2C1810] font-playfair mb-4">
                Curated Interior Draperies
              </h1>
              <div className="w-12 h-0.5 bg-[#C9922A] mb-4" />
              <p className="text-xs md:text-sm text-[#6B4226] leading-relaxed font-lato mb-4">
                Premium fabrics and sheer linens designed to harmoniously pair with our hand-carved Nilambur teak wood collections.
              </p>
            </div>

            <div className="flex flex-col justify-center">
              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-[#4A7C59] hover:bg-[#3D6649] text-white text-xs font-bold tracking-wider uppercase py-3.5 px-6 rounded-lg transition-colors shadow"
              >
                <MessageCircle size={15} />
                <span>Textile Consultation on WhatsApp</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <ProductListWithFilter initialProducts={curtainProducts} category="Curtains & Textiles" />
    </main>
  );
}
