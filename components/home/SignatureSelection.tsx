// components/home/SignatureSelection.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { Product } from "@/lib/types";

interface SignatureSelectionProps {
  products?: Product[];
}

export default function SignatureSelection({ products = [] }: SignatureSelectionProps) {
  const displayProducts = products.slice(0, 3);

  // Fallback signature items if database list is short
  const items = displayProducts.length >= 3 ? displayProducts : [
    {
      slug: "nilambur-teak-accent-chair",
      name: "Armchair in Classic Teak",
      category: "LIVING ROOM",
      badge: "BESTSELLER",
      price: "₹38,000",
      description: "Solid Nilambur teak armchair with organic velvet upholstery.",
      image: "https://images.unsplash.com/photo-1580481077111-54f65c92842c?q=80&w=800&auto=format&fit=crop",
    },
    {
      slug: "heritage-nilambur-lounge-chair",
      name: "Handcrafted Lounge Chair",
      category: "SEATING SUITES",
      badge: "NEW ARRIVAL",
      price: "₹42,000",
      description: "Ergonomic solid wood curved backrest and natural oil finish.",
      image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=800&auto=format&fit=crop",
    },
    {
      slug: "royal-nilambur-dining-table",
      name: "Royal 6-Seater Dining Table",
      category: "DINING SUITES",
      badge: "HEIRLOOM PIECE",
      price: "₹85,000",
      description: "Massive solid teak tabletop with interlocking Kerala mortise joints.",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow & Headline */}
        <FadeInView>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B5E3C] block mb-2 font-sans">
            Signature Masterpieces
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#111111] tracking-tight mb-2 sm:mb-3">
            The Signature{" "}
            <span className="text-[#8B5E3C] italic font-serif font-normal">
              Selection
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#666666] font-light max-w-xl mx-auto mb-8 sm:mb-16 px-2">
            A premium selection of handcrafted solid teak furniture that redefines modern living.
          </p>
        </FadeInView>

        {/* 3-Card Carousel with Side Floating Arrows */}
        <div className="relative max-w-5xl mx-auto">
          {/* Left Arrow */}
          <button
            className="hidden md:flex absolute -left-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#F5F5F3] hover:bg-[#EAEAEA] text-[#555555] items-center justify-center shadow-md transition-all"
            aria-label="Previous product"
          >
            <ChevronLeft size={20} />
          </button>

          {/* Right Arrow (Solid Accent Circle) */}
          <button
            className="hidden md:flex absolute -right-6 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full bg-[#8B5E3C] hover:bg-[#7A4E2D] text-white items-center justify-center shadow-lg transition-all"
            aria-label="Next product"
          >
            <ChevronRight size={20} />
          </button>

          {/* Product Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 sm:gap-8">
            {items.map((item: any, idx: number) => {
              const image = item.images?.[0] || item.image || "/images/placeholder-furniture.jpg";
              const title = item.name;
              const category = item.categories?.name || item.category || "Solid Teak";
              const price = item.price || "Price on Request";
              const desc = item.short_description || item.description || "Handcrafted Nilambur teak masterpiece.";
              const badge = item.badge || "FEATURED";

              return (
                <FadeInView key={idx} delay={idx * 0.1}>
                  <div className="bg-white rounded-2xl p-4 sm:p-6 border border-[#EAEAEA] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center relative group">
                    {/* Badge */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="bg-[#8B5E3C] text-white text-[8px] sm:text-[9px] font-bold tracking-wider uppercase px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full">
                        {badge}
                      </span>
                    </div>

                    {/* Image */}
                    <div className="relative aspect-[4/3] w-full mb-3 sm:mb-4 overflow-hidden rounded-xl bg-[#FAFAF9]">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* Info */}
                    <div className="space-y-1 sm:space-y-1.5 mb-4 sm:mb-6">
                      <span className="text-[9px] sm:text-[10px] font-bold tracking-[0.15em] uppercase text-[#777777] block">
                        {category}
                      </span>

                      <div className="text-sm sm:text-base font-bold text-[#111111] font-sans">
                        {price}
                      </div>

                      <h3 className="text-sm sm:text-base font-serif font-bold text-[#111111] line-clamp-1">
                        {title}
                      </h3>

                      <p className="text-[11px] sm:text-xs text-[#666666] font-light line-clamp-2 leading-relaxed">
                        {desc}
                      </p>
                    </div>

                    {/* Button */}
                    <Link
                      href={`/products/${item.slug || ""}`}
                      className="w-full inline-flex items-center justify-center bg-[#111111] hover:bg-[#8B5E3C] text-white text-[10px] sm:text-[11px] font-semibold tracking-[0.12em] uppercase py-2.5 sm:py-3 rounded-full transition-colors"
                    >
                      Enquire Now
                    </Link>
                  </div>
                </FadeInView>
              );
            })}
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center gap-1.5 mt-8">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1D1CF]" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#D1D1CF]" />
          </div>
        </div>

      </div>
    </section>
  );
}
