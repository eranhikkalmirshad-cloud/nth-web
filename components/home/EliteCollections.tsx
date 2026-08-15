// components/home/EliteCollections.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { useRef } from "react";

const collections = [
  {
    category: "LIVING ROOM",
    title: "Charming Accent Chairs",
    href: "/products/chairs",
    image: "https://images.unsplash.com/photo-1580481077111-54f65c92842c?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "BEDROOM",
    title: "Modern & Graceful Comfort",
    href: "/rooms/bedroom",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "DINING",
    title: "Opulent Seating",
    href: "/products/dining",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "HERITAGE DOORS",
    title: "Signature Teak Entrance",
    href: "/products/doors",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=800&auto=format&fit=crop",
  },
];

export default function EliteCollections() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.75;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header with Navigation Arrows */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 sm:mb-12 gap-4 text-center sm:text-left">
          <div className="mx-auto sm:mx-0 max-w-xl">
            <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B5E3C] block mb-2 font-sans">
              Curated Living Spaces
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#111111] tracking-tight">
              Elite Home{" "}
              <span className="text-[#8B5E3C] italic font-serif font-normal">
                Collections
              </span>
            </h2>
            <p className="text-xs sm:text-sm text-[#666666] font-light mt-2">
              Discover our handcrafted pieces tailored for elegance, warmth, and enduring quality.
            </p>
          </div>

          {/* Carousel Arrows */}
          <div className="hidden sm:flex items-center gap-2 self-end">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-[#E0E0DE] hover:border-[#111111] flex items-center justify-center text-[#444444] hover:text-[#111111] transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-[#E0E0DE] hover:border-[#111111] flex items-center justify-center text-[#444444] hover:text-[#111111] transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 4-Card Grid (2 columns on mobile, 4 columns on desktop) */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-8"
        >
          {collections.map((col, idx) => (
            <FadeInView key={idx} delay={idx * 0.08}>
              <Link href={col.href} className="group block text-center">
                {/* Image with rounded-2xl */}
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F5F5F3] shadow-xs mb-4">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text Labels underneath */}
                <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#8B5E3C] block mb-1">
                  {col.category}
                </span>

                <h3 className="text-base font-serif font-bold text-[#111111] group-hover:text-[#8B5E3C] transition-colors">
                  {col.title}
                </h3>
              </Link>
            </FadeInView>
          ))}
        </div>

      </div>
    </section>
  );
}
