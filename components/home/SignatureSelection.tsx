// components/home/SignatureSelection.tsx
"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Product } from "@/lib/types";

interface SignatureSelectionProps {
  products?: Product[];
}

export default function SignatureSelection({ products = [] }: SignatureSelectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const router = useRouter();

  // Deduplicate and ensure clean continuous loop items
  const items = useMemo(() => {
    if (!products || products.length === 0) return [];
    if (products.length < 5) {
      return [...products, ...products, ...products];
    }
    return products;
  }, [products]);

  const total = items.length;

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Keyboard navigation
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handlePrev, handleNext]);

  // Smooth auto-scroll (paused on hover)
  useEffect(() => {
    if (isHovered || total <= 1) return;
    const timer = setInterval(() => {
      handleNext();
    }, 5500);
    return () => clearInterval(timer);
  }, [isHovered, total, handleNext]);

  if (!items || total === 0) {
    return null;
  }

  const handleProductNavigate = (slug?: string) => {
    if (slug) {
      router.push(`/products/${slug}`);
    } else {
      router.push("/products");
    }
  };

  return (
    <section 
      className="py-14 sm:py-20 bg-[#FAF9F7] overflow-hidden font-sans"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* ── SECTION HEADER ── */}
        <div className="max-w-3xl mx-auto mb-10 sm:mb-14 space-y-2.5">
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
        <div className="relative max-w-6xl mx-auto flex items-center justify-center min-h-[500px] sm:min-h-[540px]">
          
          {/* Left Arrow Navigation Button */}
          <button
            type="button"
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 lg:left-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#8A572A] hover:bg-[#6E3F18] text-white flex items-center justify-center shadow-xl transition-transform duration-200 cursor-pointer hover:scale-105 active:scale-95 border border-[#8A572A]"
            aria-label="Previous product"
          >
            <ChevronLeft size={22} strokeWidth={2.5} />
          </button>

          {/* Right Arrow Navigation Button */}
          <button
            type="button"
            onClick={handleNext}
            className="absolute right-2 sm:right-4 lg:right-6 top-1/2 -translate-y-1/2 z-40 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#8A572A] hover:bg-[#6E3F18] text-white flex items-center justify-center shadow-xl transition-transform duration-200 cursor-pointer hover:scale-105 active:scale-95 border border-[#8A572A]"
            aria-label="Next product"
          >
            <ChevronRight size={22} strokeWidth={2.5} />
          </button>

          {/* 3D Perspective Stage */}
          <div 
            className="relative w-full h-[480px] sm:h-[510px] flex items-center justify-center"
            style={{ perspective: "1000px" }}
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

              // Ultra-smooth GPU transform values
              let translateX = 0;
              let translateY = 0;
              let translateZ = 0;
              let rotateY = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 30;

              if (isCenter) {
                translateX = 0;
                translateY = -20;
                translateZ = 40;
                rotateY = 0;
                scale = 1.05;
                opacity = 1;
                zIndex = 35;
              } else if (isLeft) {
                translateX = -310;
                translateY = 10;
                translateZ = -50;
                rotateY = 14;
                scale = 0.88;
                opacity = 0.75;
                zIndex = 20;
              } else if (isRight) {
                translateX = 310;
                translateY = 10;
                translateZ = -50;
                rotateY = -14;
                scale = 0.88;
                opacity = 0.75;
                zIndex = 20;
              } else if (diff === -2) {
                translateX = -520;
                translateY = 20;
                translateZ = -120;
                rotateY = 25;
                scale = 0.75;
                opacity = 0;
                zIndex = 10;
              } else if (diff === 2) {
                translateX = 520;
                translateY = 20;
                translateZ = -120;
                rotateY = -25;
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
                <div
                  key={`${item.id || item.slug}-${index}`}
                  style={{
                    transform: `translate3d(${translateX}px, ${translateY}px, ${translateZ}px) rotateY(${rotateY}deg) scale(${scale})`,
                    opacity,
                    zIndex,
                    willChange: "transform, opacity",
                    transition: "transform 0.42s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.42s ease-out",
                  }}
                  onClick={() => {
                    if (isLeft) handlePrev();
                    else if (isRight) handleNext();
                    else if (isCenter) handleProductNavigate(item.slug);
                  }}
                  className={`absolute w-[290px] sm:w-[330px] md:w-[350px] cursor-pointer select-none ${
                    !isCenter ? "hover:opacity-90" : ""
                  }`}
                >
                  {/* Card Container */}
                  <div
                    className={`w-full bg-white rounded-[2rem] p-5 sm:p-6 border flex flex-col justify-between min-h-[440px] sm:min-h-[470px] relative transition-shadow duration-300 ${
                      isCenter
                        ? "border-[#8A572A]/30 shadow-[0_16px_40px_rgba(138,87,42,0.12)] ring-1 ring-[#8A572A]/20"
                        : "border-slate-200/70 shadow-[0_8px_20px_rgba(0,0,0,0.04)]"
                    }`}
                  >
                    {/* Top Left Badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <span className="bg-[#8A572A] text-white text-[9px] font-bold tracking-wider uppercase px-3 py-1 rounded-md shadow-xs font-sans">
                        {badge}
                      </span>
                    </div>

                    {/* Product Image Stage */}
                    <div className="relative w-full aspect-[4/3] flex items-center justify-center my-2 pt-3">
                      <div className="relative w-full h-full transition-transform duration-300 hover:scale-105">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          sizes="(max-width: 768px) 80vw, 400px"
                          className="object-contain drop-shadow-[0_10px_20px_rgba(0,0,0,0.08)]"
                        />
                      </div>
                    </div>

                    {/* Product Details (Centered) */}
                    <div className="space-y-1 my-1.5 flex-1 flex flex-col justify-center text-center">
                      <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#8A572A] block font-sans">
                        {category}
                      </span>

                      <h3 className="text-base font-bold text-slate-900 leading-snug line-clamp-1">
                        {title}
                      </h3>

                      <p className="text-xs text-slate-500 font-normal line-clamp-2 leading-relaxed px-1 font-sans">
                        {desc}
                      </p>
                    </div>

                    {/* Action Button */}
                    <div className="pt-2 relative z-30">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (isCenter) {
                            handleProductNavigate(item.slug);
                          } else if (isLeft) {
                            handlePrev();
                          } else if (isRight) {
                            handleNext();
                          }
                        }}
                        className={`w-full inline-flex items-center justify-center text-[10px] font-bold tracking-[0.15em] uppercase py-3 px-6 rounded-full transition-all duration-200 shadow-sm active:scale-95 text-center cursor-pointer pointer-events-auto ${
                          isCenter
                            ? "bg-[#111111] hover:bg-[#8A572A] text-white"
                            : "bg-[#111111]/90 hover:bg-[#111111] text-white"
                        }`}
                      >
                        VIEW PRODUCT
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>

        {/* ── Slide Indicator Dots ── */}
        {products.length > 1 && (
          <div className="flex items-center justify-center gap-2 mt-6">
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
