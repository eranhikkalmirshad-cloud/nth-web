// components/home/CustomWoodworkSection.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { HomepageSection } from "@/lib/types";

interface CustomWoodworkSectionProps {
  sections?: HomepageSection[];
}

export default function CustomWoodworkSection({ sections = [] }: CustomWoodworkSectionProps) {
  const millwork = sections.find((s) => s.section_key === "custom_millwork");
  const doors = sections.find((s) => s.section_key === "heritage_doors");

  const [millworkImg, setMillworkImg] = useState(
    millwork?.image_url || "/images/bespoke-teak-millwork-preview.png"
  );
  const [doorsImg, setDoorsImg] = useState(
    doors?.image_url || "/images/carved-teak-doors-preview.png"
  );

  const card1 = {
    title: millwork?.title || "Bespoke Teak Millwork",
    desc: millwork?.subtitle || "Tailor-made solid teak dining tables, wall panels, and living suites created from your floor plans.",
    image: millworkImg,
    cta: millwork?.cta_text || "Explore Custom Design",
    url: millwork?.cta_url || "/contact",
  };

  const card2 = {
    title: doors?.title || "Carved Teak Doors",
    desc: doors?.subtitle || "Traditional Kerala main entrance doors, pooja room panels, and heavy teak frames with brass accents.",
    image: doorsImg,
    cta: doors?.cta_text || "Explore Door Collection",
    url: doors?.cta_url && doors?.cta_url !== "/products" ? doors.cta_url : "/products?category=doors",
  };

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white overflow-hidden font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow & Heading */}
        <FadeInView>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block mb-2 font-sans">
            BESPOKE CRAFTSMANSHIP
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-[#111111] tracking-tight mb-2 sm:mb-3">
            Custom Woodwork &{" "}
            <span className="text-[#8A572A] italic font-sans font-extrabold ml-1">
              Heritage Doors
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl mx-auto mb-8 sm:mb-14 px-2 leading-relaxed">
            Dress your home with architectural precision, custom floor plan sizing, and handmade solid teak millwork.
          </p>
        </FadeInView>

        {/* 2 Large Editorial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-8 max-w-6xl mx-auto mb-8 sm:mb-12 text-left">
          
          {/* Card 1: Millwork */}
          <FadeInView direction="right">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full">
              <div>
                <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF9F7] mb-4 sm:mb-5 border border-slate-100">
                  <Image
                    src={card1.image}
                    alt={card1.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={() => setMillworkImg("/images/bespoke-teak-millwork-preview.png")}
                    unoptimized={card1.image.startsWith("http")}
                  />
                </div>

                <div className="px-1">
                  <h3 className="text-lg sm:text-2xl font-bold font-sans text-slate-900 mb-1.5 sm:mb-2 group-hover:text-[#8A572A] transition-colors">
                    {card1.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mb-4 sm:mb-5 leading-relaxed">
                    {card1.desc}
                  </p>
                </div>
              </div>

              <div className="px-1 pt-1">
                <Link
                  href={card1.url}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A572A] hover:text-[#111111] uppercase tracking-wider transition-colors group/link"
                >
                  <span className="border-b border-[#8A572A] group-hover/link:border-[#111111] pb-0.5">{card1.cta}</span>
                  <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeInView>

          {/* Card 2: Doors */}
          <FadeInView direction="left">
            <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col justify-between h-full">
              <div>
                <div className="relative aspect-[16/10] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-[#FAF9F7] mb-4 sm:mb-5 border border-slate-100">
                  <Image
                    src={card2.image}
                    alt={card2.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    onError={() => setDoorsImg("/images/carved-teak-doors-preview.png")}
                    unoptimized={card2.image.startsWith("http")}
                  />
                </div>

                <div className="px-1">
                  <h3 className="text-lg sm:text-2xl font-bold font-sans text-slate-900 mb-1.5 sm:mb-2 group-hover:text-[#8A572A] transition-colors">
                    {card2.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 font-normal mb-4 sm:mb-5 leading-relaxed">
                    {card2.desc}
                  </p>
                </div>
              </div>

              <div className="px-1 pt-1">
                <Link
                  href={card2.url}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8A572A] hover:text-[#111111] uppercase tracking-wider transition-colors group/link"
                >
                  <span className="border-b border-[#8A572A] group-hover/link:border-[#111111] pb-0.5">{card2.cta}</span>
                  <ChevronRight size={14} className="group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </FadeInView>

        </div>

        {/* Horizontal Consultation Banner Strip */}
        <div className="max-w-6xl mx-auto bg-gradient-to-r from-amber-50/70 via-white to-amber-50/70 p-5 sm:p-8 rounded-2xl border border-amber-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm sm:text-lg font-bold font-sans text-slate-900">
              Have Architectural Blueprints or Custom Dimensions?
            </h4>
            <p className="text-[11px] sm:text-xs text-slate-600 mt-1 leading-relaxed">
              Our Nilambur craftsmen calculate wood yield, timber seasoning, and fabrication estimates directly from your CAD or hand sketches.
            </p>
          </div>

          <Link
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-[#8A572A] hover:bg-[#1C130D] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95 shrink-0"
          >
            Request Free Estimation
          </Link>
        </div>

      </div>
    </section>
  );
}
