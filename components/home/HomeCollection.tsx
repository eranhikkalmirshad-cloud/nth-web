// components/home/HomeCollection.tsx
"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";
import { Product } from "@/lib/types";

interface HomeCollectionProps {
  products?: Product[];
}

export default function HomeCollection({ products = [] }: HomeCollectionProps) {
  const displayProducts = products.slice(0, 4);

  return (
    <section className="py-20 md:py-28 bg-[#FAFAF9] border-t border-[#EBEBEA]">
      <div className="max-container">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-4">
          <div>
            <span className="eyebrow text-[#7A4E2D]">Signature Selection</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#141414] tracking-tight">
              Featured Teak Masterpieces
            </h2>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#141414] hover:text-[#7A4E2D] pb-1 border-b border-[#141414] transition-colors self-start md:self-auto"
          >
            <span>Explore Full Catalog</span>
            <ArrowRight size={14} />
          </Link>
        </div>

        {/* 4-Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {displayProducts.map((product, idx) => (
            <FadeInView key={product.slug} delay={idx * 0.06}>
              <ProductCard product={product} />
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}