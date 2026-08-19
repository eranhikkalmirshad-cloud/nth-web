// app/products/page.tsx
import { getProducts } from "@/lib/api/products";
import { createClient } from "@/lib/supabase-server";
import ProductsListClient from "@/components/products/ProductsListClient";
import FadeInView from "@/components/ui/FadeInView";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, MessageCircle, Factory, HeartHandshake, Palette, ShieldCheck } from "lucide-react";
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

  const trustPillars = [
    {
      icon: "🏭",
      title: "Workshop Direct",
      desc: "No middlemen. You commission and buy directly from our Nilambur manufacturing workshop at honest, transparent prices.",
    },
    {
      icon: "🤝",
      title: "Lifetime Support",
      desc: "Every piece comes with our commitment. We're here for repairs, natural refinishing, and generational care—always.",
    },
    {
      icon: "🎨",
      title: "Kerala Craftsmanship",
      desc: "Made by local Nilambur master artisans who've perfected their woodworking over generations. Supporting authentic heritage talent.",
    },
  ];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#8A572A] selection:text-white">
      {/* ── Editorial Header ── */}
      <section className="pt-12 pb-12 md:pt-16 md:pb-16 bg-white border-b border-[#EBEBEA]">
        <div className="max-container">
          <FadeInView>
            <div className="max-w-3xl space-y-4">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
                NILAMBUR TEAK WOOD COLLECTION
              </span>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#141414] leading-[1.1] tracking-tight">
                Our Teak Furniture Collection
              </h1>

              <p className="text-base text-[#555555] font-light leading-relaxed">
                Handcrafted from mature, seasoned solid Nilambur teak. Explore luxury dining suites, living room sets, carved cots, and architectural doors built for generations.
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

      {/* ── WHY NILAMBUR FAMILIES TRUST US (THE NILAMBUR DIFFERENCE) ── */}
      <section className="py-16 sm:py-24 bg-[#FAF9F7] border-t border-[#EAE6DF]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <FadeInView>
            <div className="max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5">
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
                THE NILAMBUR HERITAGE™ DIFFERENCE
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#111111] tracking-tight">
                Why Families Trust Us
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 font-normal leading-relaxed">
                From our front-house workshop to residences across India, authentic woodworking built on honesty and heirloom quality.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
              {trustPillars.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-3xl p-7 sm:p-8 border border-slate-200/80 shadow-xs hover:shadow-xl hover:border-[#8A572A]/40 transition-all duration-300 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-[#FAF4ED] border border-[#8A572A]/20 flex items-center justify-center text-2xl">
                      <span>{pillar.icon}</span>
                    </div>

                    <h3 className="text-lg font-serif font-bold text-[#111111]">
                      {pillar.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed font-normal">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ── Custom Commission CTA ── */}
      <section className="py-16 md:py-24 bg-white border-t border-[#EBEBEA]">
        <div className="max-container text-center">
          <div className="max-w-2xl mx-auto space-y-6">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
              BESPOKE CRAFTSMANSHIP
            </span>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141414]">
              Can&apos;t find the exact dimensions?
            </h2>

            <p className="text-sm md:text-base text-[#555555] font-light leading-relaxed">
              Our Nilambur studio crafts bespoke furniture from your architectural drawings and custom dimensions. From temple doors to 12-seater dining suites, we bring your vision to life.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 bg-[#8A572A] hover:bg-[#6E3F18] text-white text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-md active:scale-95"
              >
                Request Custom Design
              </Link>

              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-[#141414] border border-[#D5CEC5] text-xs font-bold uppercase tracking-wider px-7 py-3.5 rounded-full transition-all shadow-xs active:scale-95"
              >
                <MessageCircle size={16} className="text-[#25D366]" />
                <span>WhatsApp Quote</span>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}