// components/home/SignatureSelection.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";

interface SignatureSelectionProps {
  products?: Product[];
}

export default function SignatureSelection({ products = [] }: SignatureSelectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Ensure minimum items for continuous smooth looping
  let items = products || [];
  if (items.length > 0 && items.length < 5) {
    items = [...items, ...items, ...items];
  }
  const total = items.length;

  const handleNext = () => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    if (total === 0) return;
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

  // Subtle auto-scroll every 5.5 seconds (paused on hover)
  useEffect(() => {
    if (isHovered || total <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [currentIndex, isHovered, total]);

  if (!items || total === 0) {
    return null;
  }

  return (
    <section 
      className="py-16 sm:py-24 bg-[#FAF9F7] overflow-hidden select-none font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* ── SECTION HEADER ── */}
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

        {/* ── 3D COVERFLOW PERSPECTIVE STAGE ── */}
        <div className="relative max-w-6xl mx-auto flex items-center justify-center min-h-[540px] sm:min-h-[580px]">
          
          {/* Left Arrow Navigation Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#8A572A] hover:bg-[#6E3F18] text-white flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 border border-[#8A572A]"
            aria-label="Previous product"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          {/* Right Arrow Navigation Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-12 h-12 rounded-full bg-[#8A572A] hover:bg-[#6E3F18] text-white flex items-center justify-center shadow-xl transition-all duration-300 cursor-pointer hover:scale-110 active:scale-95 border border-[#8A572A]"
            aria-label="Next product"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>

          {/* 3D Perspective Stage */}
          <div 
            className="relative w-full h-[500px] sm:h-[530px] flex items-center justify-center"
            style={{ perspective: 1200, transformStyle: "preserve-3d" }}
          >
            {items.map((item, index) => {
              // Calculate signed offset relative to currentIndex
              let diff = index - currentIndex;
              if (diff > total / 2) diff -= total;
              if (diff < -total / 2) diff += total;

              // Visible range [-2, -1, 0, 1, 2]
              const isVisible = Math.abs(diff) <= 2;
              if (!isVisible) return null;

              const isCenter = diff === 0;
              const isLeft = diff === -1;
              const isRight = diff === 1;

              // Calculate exact 3D positioning metrics matching the Magnat reference
              let xOffset = 0;
              let yOffset = 0;
              let zOffset = 0;
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;

              if (isCenter) {
                xOffset = 0;
                yOffset = -24;
                zOffset = 40;
                rotateY = 0;
                scale = 1.08;
                opacity = 1;
                zIndex = 30;
              } else if (isLeft) {
                xOffset = -320;
                yOffset = 10;
                zOffset = -60;
                rotateY = 12;
                scale = 0.88;
                opacity = 0.72;
                zIndex = 20;
              } else if (isRight) {
                xOffset = 320;
                yOffset = 10;
                zOffset = -60;
                rotateY = -12;
                scale = 0.88;
                opacity = 0.72;
                zIndex = 20;
              } else if (diff === -2) {
                xOffset = -540;
                yOffset = 20;
                zOffset = -150;
                rotateY = 24;
                scale = 0.75;
                opacity = 0;
                zIndex = 10;
              } else if (diff === 2) {
                xOffset = 540;
                yOffset = 20;
                zOffset = -150;
                rotateY = -24;
                scale = 0.75;
                opacity = 0;
                zIndex = 10;
              }

              const image = item.images?.[0] || "/images/placeholder-furniture.jpg";
              const title = item.name;
              const category =
                item.categories?.name || item.room || (item as any).category || "Solid Teak";
              const desc =
                item.short_description || "Handcrafted Nilambur teak masterpiece.";
              const badge = item.badge || (item.is_bestseller ? "BEST SELLER" : item.is_new ? "NEW ARRIVAL" : "BEST SELLER");

              return (
                <motion.div
                  key={`${item.id || item.slug}-${index}`}
                  initial={false}
                  animate={{
                    x: xOffset,
                    y: yOffset,
                    z: zOffset,
                    rotateY: rotateY,
                    scale: scale,
                    opacity: opacity,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 26,
                    mass: 0.8,
                  }}
                  style={{
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  onClick={() => {
                    if (isLeft) handlePrev();
                    if (isRight) handleNext();
                  }}
                  className={`absolute w-[300px] sm:w-[340px] md:w-[360px] transition-all duration-300 ${
                    !isCenter ? "cursor-pointer hover:opacity-90" : "cursor-default"
                  }`}
                >
                  {/* Magnat Card Container */}
                  <div
                    className={`w-full bg-white rounded-[2rem] p-6 sm:p-7 border transition-all duration-300 flex flex-col justify-between min-h-[460px] sm:min-h-[490px] relative ${
                      isCenter
                        ? "border-[#8A572A]/30 shadow-[0_20px_50px_rgba(138,87,42,0.15)] ring-1 ring-[#8A572A]/20"
                        : "border-slate-200/70 shadow-[0_10px_30px_rgba(0,0,0,0.05)]"
                    }`}
                  >
                    {/* Top Left Badge (Magnat Style) */}
                    <div className="absolute top-5 left-5 z-20">
                      <span className="bg-[#8A572A] text-white text-[9px] font-bold tracking-wider uppercase px-3.5 py-1.5 rounded-md shadow-xs font-sans">
                        {badge}
                      </span>
                    </div>

                    {/* Product Image Stage */}
                    <div className="relative w-full aspect-[4/3] flex items-center justify-center my-3 pt-4">
                      <div className="relative w-full h-full transform transition-transform duration-500 hover:scale-105">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          quality={95}
                          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 500px"
                          className="object-contain drop-shadow-[0_12px_24px_rgba(0,0,0,0.10)]"
                        />
                      </div>
                    </div>

                    {/* Product Details (Centered) */}
                    <div className="space-y-1.5 my-2 flex-1 flex flex-col justify-center text-center">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#8A572A] block font-sans">
                        {category}
                      </span>

                      <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug line-clamp-1">
                        {title}
                      </h3>

                      <p className="text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed px-2 font-sans">
                        {desc}
                      </p>
                    </div>

                    {/* Black Pill Action Button (Magnat Style) */}
                    <div className="pt-3">
                      <Link
                        href={`/products/${item.slug || ""}`}
                        className={`w-full inline-flex items-center justify-center text-[10px] sm:text-[11px] font-bold tracking-[0.15em] uppercase py-3.5 px-8 rounded-full transition-all duration-300 shadow-md active:scale-95 text-center ${
                          isCenter
                            ? "bg-[#111111] hover:bg-[#8A572A] text-white hover:shadow-lg"
                            : "bg-[#111111]/90 hover:bg-[#111111] text-white"
                        }`}
                      >
                        VIEW PRODUCT
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>

        {/* ── Slide Indicator Dots (Magnat Style) ── */}
        {total > 1 && (
          <div className="flex items-center justify-center gap-2 mt-8">
            {products.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCurrentIndex(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentIndex % products.length === i
                    ? "w-6 bg-[#8A572A]"
                    : "w-2 bg-slate-300 hover:bg-slate-400"
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
