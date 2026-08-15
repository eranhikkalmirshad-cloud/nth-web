// components/home/EliteCollections.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { useRef } from "react";

const collections = [
  {
    category: "CHAIRS & ACCENTS",
    title: "Charming Accent Chairs",
    href: "/products?category=chairs",
    image: "https://images.unsplash.com/photo-1580481077111-54f65c92842c?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "BEDROOM SUITES",
    title: "Modern & Graceful Comfort",
    href: "/products?category=beds",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "LIVING SUITES",
    title: "Signature Solid Teak Sofas",
    href: "/products?category=sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
  },
  {
    category: "DINING SPACES",
    title: "Heirloom Teak Dining Sets",
    href: "/products?category=dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop",
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
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Centered Header Matching Exact Reference */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#C0001A] block mb-3 font-sans">
            SHOP BY CATEGORY
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-sans font-bold text-slate-900 tracking-tight">
            Elite Home{" "}
            <span className="text-[#C0001A] italic font-serif font-normal">
              Collections
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-3.5 leading-relaxed">
            Explore our signature collections tailored for every corner of your home, from architectural sofas to serene bedroom suites.
          </p>
        </div>

        {/* Sub-Header Bar with 'Explore All' & Navigation Arrows */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/products"
            className="text-[11px] font-bold tracking-[0.2em] uppercase text-slate-400 hover:text-slate-900 transition-colors"
          >
            EXPLORE ALL
          </Link>

          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => scroll("left")}
              className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-900 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer hover:bg-slate-50"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-10 h-10 rounded-full border border-slate-200 hover:border-slate-900 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-all cursor-pointer hover:bg-slate-50"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* 4-Card Grid Matching Exact Reference */}
        <div
          ref={scrollRef}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 overflow-x-auto scroll-smooth hide-scrollbar"
        >
          {collections.map((col, idx) => (
            <FadeInView key={idx} delay={idx * 0.08}>
              <Link href={col.href} className="group block">
                {/* Image with rounded-3xl */}
                <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-xs mb-3.5 border border-slate-100">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text Labels */}
                <div className="text-center px-1">
                  <span className="text-[10px] font-bold tracking-[0.15em] uppercase text-[#C0001A] block mb-0.5">
                    {col.category}
                  </span>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 group-hover:text-[#C0001A] transition-colors">
                    {col.title}
                  </h3>
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>

      </div>
    </section>
  );
}
