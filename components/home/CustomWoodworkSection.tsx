// components/home/CustomWoodworkSection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";

export default function CustomWoodworkSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow & Heading */}
        <FadeInView>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B5E3C] block mb-2 font-sans">
            Bespoke Craftsmanship
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#111111] tracking-tight mb-2 sm:mb-3">
            Custom Woodwork &{" "}
            <span className="text-[#8B5E3C] italic font-serif font-normal">
              Heritage Doors
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#666666] font-light max-w-xl mx-auto mb-8 sm:mb-16 px-2">
            Dress your home with architectural precision, custom floor plan sizing, and handmade solid teak millwork.
          </p>
        </FadeInView>

        {/* 2 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-6xl mx-auto mb-8 sm:mb-10 text-left">
          
          {/* Card 1 */}
          <FadeInView direction="right">
            <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#EAEAEA] shadow-xs group">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#F5F5F3] mb-3.5 sm:mb-5">
                <Image
                  src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=1200&auto=format&fit=crop"
                  alt="Bespoke Teak Millwork"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="px-1 sm:px-2 pb-1 sm:pb-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111] mb-1">
                  Bespoke Teak Millwork
                </h3>
                <p className="text-[11px] sm:text-xs text-[#666666] font-light mb-3 sm:mb-4 leading-relaxed">
                  Tailor-made solid teak dining tables, wall panels, and living suites created from your floor plans.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#8B5E3C] hover:text-[#111111] uppercase tracking-wider transition-colors"
                >
                  <span>Explore Custom Design</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </FadeInView>

          {/* Card 2 */}
          <FadeInView direction="left">
            <div className="bg-white rounded-2xl p-3.5 sm:p-5 border border-[#EAEAEA] shadow-xs group">
              <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#F5F5F3] mb-3.5 sm:mb-5">
                <Image
                  src="https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop"
                  alt="Carved Teak Doors"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="px-1 sm:px-2 pb-1 sm:pb-2">
                <h3 className="text-lg sm:text-xl font-serif font-bold text-[#111111] mb-1">
                  Carved Teak Doors
                </h3>
                <p className="text-[11px] sm:text-xs text-[#666666] font-light mb-3 sm:mb-4 leading-relaxed">
                  Traditional Kerala main entrance doors, pooja room panels, and heavy teak frames with brass accents.
                </p>
                <Link
                  href="/products/doors"
                  className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#8B5E3C] hover:text-[#111111] uppercase tracking-wider transition-colors"
                >
                  <span>Explore Door Collection</span>
                  <ChevronRight size={14} />
                </Link>
              </div>
            </div>
          </FadeInView>

        </div>

        {/* Horizontal Consultation Banner Strip */}
        <FadeInView>
          <div className="max-w-6xl mx-auto bg-white rounded-2xl p-4 sm:p-6 border border-[#EAEAEA] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
            <div>
              <p className="text-xs sm:text-sm font-semibold text-[#111111]">
                Need custom measurements or architectural sizing?
              </p>
              <p className="text-[11px] sm:text-xs text-[#666666] font-light mt-0.5">
                Speak directly with our master woodcraft studio in Nilambur.
              </p>
            </div>

            <a
              href={SITE_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center bg-[#111111] hover:bg-[#8B5E3C] text-white text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase px-6 py-2.5 sm:py-3 rounded-full transition-all whitespace-nowrap shadow-xs"
            >
              Schedule Consultation
            </a>
          </div>
        </FadeInView>

      </div>
    </section>
  );
}
