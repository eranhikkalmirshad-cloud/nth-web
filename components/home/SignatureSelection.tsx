// components/home/SignatureSelection.tsx
"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { Product } from "@/lib/types";

interface SignatureSelectionProps {
  products?: Product[];
}

export default function SignatureSelection({ products = [] }: SignatureSelectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);

  // Purely dynamic from database — zero hardcoded fallbacks
  const items = products || [];

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // If no products in database yet, hide section until admin adds items
  if (!items || items.length === 0) {
    return null;
  }

  return (
    <section className="py-20 sm:py-28 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow & Headline */}
        <FadeInView>
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block mb-3 font-sans">
            SIGNATURE MASTERPIECES
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-[#111111] tracking-tight mb-3">
            The Signature{" "}
            <span className="text-[#8A572A] italic font-sans font-extrabold ml-1">
              Selection
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl mx-auto mb-12 sm:mb-16 px-2 leading-relaxed">
            A premium selection of handcrafted solid teak furniture that redefines modern living.
          </p>
        </FadeInView>

        {/* Carousel Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Left Arrow Button */}
          {items.length > 3 && (
            <button
              type="button"
              onClick={() => handleScroll("left")}
              className="hidden sm:flex absolute -left-4 md:-left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-rose-50/90 hover:bg-rose-100/90 border border-rose-200/60 text-[#8A572A] items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Previous product"
            >
              <ChevronLeft size={20} />
            </button>
          )}

          {/* Right Arrow Button */}
          {items.length > 3 && (
            <button
              type="button"
              onClick={() => handleScroll("right")}
              className="hidden sm:flex absolute -right-4 md:-right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 md:w-12 md:h-12 rounded-full bg-[#8A572A] hover:bg-[#1C130D] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all cursor-pointer hover:scale-105 active:scale-95"
              aria-label="Next product"
            >
              <ChevronRight size={20} />
            </button>
          )}

          {/* Carousel Scroll Area (Scrollbars 100% hidden) */}
          <div
            ref={scrollRef}
            className="flex gap-4 sm:gap-7 overflow-x-auto scroll-smooth py-4 sm:py-6 px-3 sm:px-4 hide-scrollbar snap-x snap-mandatory justify-start md:justify-center"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {items.map((item: any, idx: number) => {
              const image =
                item.images?.[0] ||
                "/images/placeholder-furniture.jpg";
              const title = item.name;
              const category =
                item.categories?.name || item.room || item.category || "Solid Teak";
              const desc =
                item.short_description || item.description || "Handcrafted Nilambur teak masterpiece.";
              const badge = item.badge || (item.is_bestseller ? "BEST SELLER" : item.is_new ? "NEW ARRIVAL" : null);

              return (
                <div
                  key={item.id || item.slug || idx}
                  className="w-[82vw] max-w-[290px] sm:w-[320px] shrink-0 snap-center bg-white rounded-3xl p-4 sm:p-6 border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_45px_rgba(0,0,0,0.12)] transition-all duration-300 flex flex-col justify-between text-center relative group"
                >
                  {/* Top Badge */}
                  {badge && (
                    <div className="absolute top-4 left-4 z-10">
                      <span className="bg-[#8A572A] text-white text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full shadow-xs">
                        {badge}
                      </span>
                    </div>
                  )}

                  {/* Clean Image Showcase */}
                  <div className="relative aspect-[4/3] w-full mb-5 overflow-hidden rounded-2xl bg-slate-50 border border-slate-100/80">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      sizes="(max-width: 768px) 280px, 320px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Info Content */}
                  <div className="space-y-1.5 mb-6 flex-1 flex flex-col justify-center">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A572A] block font-sans">
                      {category}
                    </span>

                    <h3 className="text-base sm:text-lg font-bold font-sans text-slate-900 line-clamp-1 group-hover:text-[#8A572A] transition-colors">
                      {title}
                    </h3>

                    <p className="text-xs text-slate-400 font-normal line-clamp-2 leading-relaxed px-1">
                      {desc}
                    </p>
                  </div>

                  {/* View Product Button */}
                  <Link
                    href={`/products/${item.slug || ""}`}
                    className="w-full max-w-[200px] mx-auto inline-flex items-center justify-center bg-[#141414] hover:bg-[#8A572A] text-white text-[10px] font-bold tracking-[0.15em] uppercase py-3.5 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                  >
                    VIEW PRODUCT
                  </Link>
                </div>
              );
            })}
          </div>

          {/* Dots Indicator */}
          {items.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-8">
              {items.slice(0, 4).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    if (scrollRef.current) {
                      scrollRef.current.scrollTo({
                        left: i * 340,
                        behavior: "smooth",
                      });
                      setScrollIndex(i);
                    }
                  }}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    scrollIndex === i ? "w-6 bg-[#8A572A]" : "w-2 bg-slate-200"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
