// components/home/EliteCollections.tsx
"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { PRODUCT_CATEGORIES } from "@/lib/constants/categories";
import { Categories } from "@/lib/types";

interface EliteCollectionsProps {
  categories?: Categories[];
}

export default function EliteCollections({ categories = [] }: EliteCollectionsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  // If database categories exist, filter by is_featured (or all if none featured)
  const featuredDbCategories = categories.filter((c) => c.is_featured);
  
  const displayItems =
    featuredDbCategories.length > 0
      ? featuredDbCategories.map((c) => ({
          name: c.name,
          slug: c.slug,
          href: `/products?category=${c.slug}`,
          image: c.image_url || "/images/og-datas/IMG_0432.PNG",
          description: c.description || c.name,
        }))
      : categories.length > 0
      ? categories.map((c) => ({
          name: c.name,
          slug: c.slug,
          href: `/products?category=${c.slug}`,
          image: c.image_url || "/images/og-datas/IMG_0432.PNG",
          description: c.description || c.name,
        }))
      : PRODUCT_CATEGORIES;

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 280;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-12 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Centered Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block mb-2 font-sans">
            SHOP BY CATEGORY
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-extrabold text-[#111111] tracking-tight">
            Elite Home{" "}
            <span className="text-[#8A572A] italic font-sans font-extrabold ml-1">
              Collections
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 font-normal mt-2.5 max-w-xl mx-auto leading-relaxed px-2">
            Explore our signature collections tailored for every corner of your home, from architectural sofas to serene bedroom suites.
          </p>
        </div>

        {/* Sub-Header Bar with 'Explore All' & Navigation Arrows */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <Link
            href="/products"
            className="text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#8A572A] hover:text-[#111111] transition-all inline-flex items-center gap-1.5 group cursor-pointer"
          >
            <span className="border-b-2 border-[#8A572A] pb-0.5 group-hover:border-[#111111] transition-colors">
              EXPLORE ALL
            </span>
          </Link>

          {/* Carousel Interactive Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => scroll("left")}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-[#8A572A] bg-white hover:bg-amber-50 flex items-center justify-center text-slate-600 hover:text-[#8A572A] transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Previous categories"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-slate-200 hover:border-[#8A572A] bg-[#8A572A] hover:bg-[#1C130D] flex items-center justify-center text-white transition-all cursor-pointer shadow-md active:scale-95"
              aria-label="Next categories"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Scrollable Category Carousel with Mobile Edge-to-Edge Padding */}
        <div
          ref={scrollRef}
          className="flex gap-4 sm:gap-6 overflow-x-auto scroll-smooth py-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {displayItems.map((cat, idx) => (
            <div
              key={cat.slug || idx}
              className="w-[200px] sm:w-[260px] lg:w-[280px] shrink-0 snap-start group"
            >
              <Link href={cat.href} className="block">
                {/* Image Container with rounded-3xl */}
                <div className="relative aspect-[3/4] w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-100 shadow-xs mb-3 border border-slate-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    quality={95}
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 50vw, 450px"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Text Labels */}
                <div className="text-center px-1">
                  <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-[#8A572A] block mb-0.5">
                    {cat.name}
                  </span>
                  <h3 className="text-xs sm:text-base font-bold text-slate-900 group-hover:text-[#8A572A] transition-colors line-clamp-1">
                    {cat.description?.split(".")[0] || cat.name}
                  </h3>
                </div>
              </Link>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
