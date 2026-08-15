// components/home/FeaturedCategories.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";

const collections = [
  {
    title: "Living Room",
    subtitle: "Solid Teak Sofas, Diwans & Accent Tables",
    href: "/products/sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Dining Suites",
    subtitle: "6 & 8-Seater Solid Teak Dining Tables",
    href: "/products/dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Bedroom Collections",
    subtitle: "Heirloom Teak Cots, Wardrobes & Dressers",
    href: "/rooms/bedroom",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Handcrafted Chairs",
    subtitle: "Artisan Armchairs, Planter Chairs & Benches",
    href: "/products/chairs",
    image: "https://images.unsplash.com/photo-1580481077111-54f65c92842c?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Carved Teak Doors",
    subtitle: "Traditional Heritage Entrance & Pooja Doors",
    href: "/products/doors",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1000&auto=format&fit=crop",
  },
  {
    title: "Bespoke Commissions",
    subtitle: "Custom Architectural Woodwork & Millwork",
    href: "/contact",
    image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1000&auto=format&fit=crop",
  },
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 md:py-28 bg-white">
      <div className="max-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <span className="eyebrow text-[#7A4E2D]">Curated Categories</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#141414] tracking-tight">
              Explore Our Teak Collections
            </h2>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#141414] hover:text-[#7A4E2D] pb-1 border-b border-[#141414] transition-colors self-start md:self-auto"
          >
            <span>View All Pieces</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 3-Column Image-First Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
          {collections.map((col, idx) => (
            <FadeInView key={col.title} delay={idx * 0.05}>
              <Link href={col.href} className="group block space-y-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F5F3] rounded-xs shadow-xs">
                  <Image
                    src={col.image}
                    alt={col.title}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl md:text-2xl font-serif font-bold text-[#141414] group-hover:text-[#7A4E2D] transition-colors">
                      {col.title}
                    </h3>
                    <ArrowRight
                      size={16}
                      className="text-[#888888] group-hover:text-[#141414] group-hover:translate-x-1 transition-all"
                    />
                  </div>
                  <p className="text-xs md:text-sm text-[#666666] font-light mt-1">
                    {col.subtitle}
                  </p>
                </div>
              </Link>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}
