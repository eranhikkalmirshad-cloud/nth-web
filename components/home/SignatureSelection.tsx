// components/home/SignatureSelection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ArrowUpRight } from "lucide-react";
import { Product } from "@/lib/types";

interface SignatureSelectionProps {
  products?: Product[];
}

export default function SignatureSelection({ products = [] }: SignatureSelectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"left" | "right">("right");

  const items = products || [];
  const total = items.length;

  const handleNext = () => {
    if (total === 0) return;
    setDirection("right");
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    if (total === 0) return;
    setDirection("left");
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [total]);

  if (!items || total === 0) {
    return null;
  }

  // Get the 3 items for desktop coverflow (Left, Center Elevated, Right)
  const leftItem = items[(currentIndex - 1 + total) % total];
  const centerItem = items[currentIndex];
  const rightItem = items[(currentIndex + 1) % total];

  const visibleCards = [
    { item: leftItem, position: "left", isCenter: false },
    { item: centerItem, position: "center", isCenter: true },
    { item: rightItem, position: "right", isCenter: false },
  ];

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* ── HEADER ── */}
        <div className="max-w-3xl mx-auto mb-14 sm:mb-18 space-y-3">
          <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            FEATURED MASTERPIECES
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#111111] tracking-tight">
            The Signature{" "}
            <span className="text-[#8A572A] italic font-serif font-normal ml-1">
              Selection
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl mx-auto leading-relaxed px-2">
            A curated selection of our most-loved solid Nilambur teak pieces, ready for your home. Crafted with generational joinery and enduring style.
          </p>
        </div>

        {/* ── 3-CARD DESKTOP ELEVATED COVERFLOW SLIDER ── */}
        <div className="relative max-w-6xl mx-auto flex items-center justify-center min-h-[500px]">
          
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-0 sm:left-2 lg:-left-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#F7EFE8] hover:bg-[#EEDFD2] text-[#8A572A] flex items-center justify-center shadow-md transition-all cursor-pointer hover:scale-105 active:scale-95 border border-[#EAD7C7]"
            aria-label="Previous product"
          >
            <ChevronLeft size={22} />
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-0 sm:right-2 lg:-right-2 top-1/2 -translate-y-1/2 z-30 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#8A572A] hover:bg-[#1C130D] text-white flex items-center justify-center shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95 border border-[#8A572A]"
            aria-label="Next product"
          >
            <ChevronRight size={22} />
          </button>

          {/* 3 Visible Cards Grid (Desktop: 3 Cards, Mobile: Center Focus Card) */}
          <div className="w-full flex items-center justify-center gap-4 sm:gap-6 lg:gap-8 px-6 sm:px-12">
            {visibleCards.map(({ item, position, isCenter }) => {
              if (!item) return null;

              const image = item.images?.[0] || "/images/placeholder-furniture.jpg";
              const title = item.name;
              const category =
                item.categories?.name || item.room || (item as any).category || "Solid Teak";
              const desc =
                item.short_description || "Handcrafted Nilambur teak masterpiece.";
              const badge = item.badge || (item.is_bestseller ? "BEST SELLER" : item.is_new ? "NEW ARRIVAL" : null);

              return (
                <div
                  key={`${item.id || item.slug}-${position}`}
                  onClick={() => {
                    if (position === "left") handlePrev();
                    if (position === "right") handleNext();
                  }}
                  className={`transition-all duration-500 ease-out flex flex-col justify-between items-center text-center relative ${
                    isCenter
                      ? "w-full max-w-[320px] sm:max-w-[340px] z-20 md:-translate-y-6 scale-100 sm:scale-105 opacity-100"
                      : "hidden md:flex md:w-[280px] lg:w-[300px] z-10 scale-95 opacity-70 hover:opacity-90 cursor-pointer"
                  }`}
                >
                  {/* Card Container Box */}
                  <div className={`w-full bg-white rounded-3xl p-6 sm:p-7 border transition-all duration-500 flex flex-col justify-between min-h-[440px] relative ${
                    isCenter
                      ? "border-[#8A572A]/30 shadow-[0_20px_50px_rgba(138,87,42,0.12)]"
                      : "border-slate-100 shadow-[0_8px_30px_rgba(0,0,0,0.05)]"
                  }`}>
                    
                    {/* Top Golden Badge */}
                    {badge && (
                      <div className="absolute top-4 left-4 z-20">
                        <span className="bg-[#8A572A] text-white text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-sm shadow-xs font-sans">
                          {badge}
                        </span>
                      </div>
                    )}

                    {/* Pop-Out Product Image Stage */}
                    <div className="relative w-full aspect-[4/3] flex items-center justify-center my-2">
                      <div className="relative w-full h-full transform transition-transform duration-500 group-hover:scale-105">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          quality={95}
                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
                          className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.15)]"
                        />
                      </div>
                    </div>

                    {/* Product Typography */}
                    <div className="space-y-1.5 my-3 flex-1 flex flex-col justify-center">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A572A] block font-sans">
                        {category}
                      </span>

                      <h3 className="text-base sm:text-lg font-serif font-bold text-[#111111] uppercase tracking-wide line-clamp-1 group-hover:text-[#8A572A] transition-colors">
                        {title}
                      </h3>

                      <p className="text-xs text-slate-400 font-normal line-clamp-2 leading-relaxed px-1 font-sans">
                        {desc}
                      </p>
                    </div>

                    {/* Black Pill Action Button */}
                    <Link
                      href={`/products/${item.slug || ""}`}
                      className="w-full max-w-[220px] mx-auto inline-flex items-center justify-center bg-[#111111] hover:bg-[#8A572A] text-white text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase py-3.5 px-6 rounded-full transition-all duration-300 shadow-md hover:shadow-lg active:scale-95"
                    >
                      VIEW PRODUCT
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Slide Indicator Dots ── */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-2 mt-10">
            {items.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex === i ? "w-6 bg-[#8A572A]" : "w-2 bg-slate-200"
                }`}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
