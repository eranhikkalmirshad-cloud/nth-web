// app/products/page.tsx
import { getProducts } from "@/lib/api/products";
import { createClient } from "@/lib/supabase-server";
import ProductsListClient from "@/components/products/ProductsListClient";
import FadeInView from "@/components/ui/FadeInView";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Teak Furniture Collection | Nilambur Teak Heritage™",
  description: "Browse 100% genuine solid Nilambur teak wood furniture. Royal dining sets, living suites, heirloom cots, and carved doors.",
};

export default async function ProductsPage() {
  const products = await getProducts();

  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <main className="min-h-screen bg-white">
      {/* ── Editorial Header ── */}
      <section className="pt-12 pb-12 md:pt-16 md:pb-16 bg-white border-b border-[#EBEBEA]">
        <div className="max-container">
          <FadeInView>
            <div className="max-w-3xl space-y-4">
              <span className="eyebrow text-[#7A4E2D]">
                Nilambur Teak Wood Collection
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#141414] leading-[1.1] tracking-tight">
                Our Teak Furniture Collection
              </h1>

              <p className="text-base text-[#555555] font-light leading-relaxed">
                Handcrafted from mature, legally sourced Nilambur teak. Explore solid dining suites, living room suites, carved cots, and architectural doors built for generations.
              </p>

              <div className="flex items-center gap-6 pt-2 text-xs font-medium text-[#777777]">
                <span>{products.length} Pieces Available</span>
                <span>•</span>
                <span>100% Genuine Nilambur Teak</span>
                <span>•</span>
                <span>Pan-India Insured Delivery</span>
              </div>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── Products List with Filters ── */}
      <Suspense fallback={<div className="h-96 flex items-center justify-center text-sm font-semibold uppercase tracking-wider text-[#777777]">Loading catalog...</div>}>
        <ProductsListClient initialProducts={products} categories={categories || []} />
      </Suspense>

      {/* ── Custom Commission CTA ── */}
      <section className="py-20 md:py-28 bg-[#FAFAF9] border-t border-[#EBEBEA]">
        <div className="max-container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="eyebrow text-[#7A4E2D]">Bespoke Craftsmanship</span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141414]">
              Can't find the exact dimensions?
            </h2>

            <p className="text-sm md:text-base text-[#555555] font-light leading-relaxed">
              Our Nilambur studio crafts bespoke furniture from your architectural drawings and custom dimensions. From temple doors to 12-seater dining suites, we bring your vision to life.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="btn-primary"
              >
                Request Custom Design
              </Link>

              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}