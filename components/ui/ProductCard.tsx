// components/ui/ProductCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Pick<Product, "name" | "slug" | "images"> & Partial<Product>;
  compact?: boolean;
}

export default function ProductCard({ product, compact = false }: ProductCardProps) {
  const {
    slug,
    name,
    description,
    short_description,
    images,
    material,
    categories,
    price,
  } = product;

  const mainImage = images?.[0] || "/images/placeholder-furniture.jpg";
  const hoverImage = images?.[1];
  const displayDescription = short_description || description;
  const displayCategory = categories?.name || material || "Teak Furniture";

  return (
    <Link href={`/products/${slug}`} className="block h-full group no-underline">
      <article className="bg-white border border-[#EBEBEA] rounded-xs overflow-hidden flex flex-col h-full product-card-hover">
        {/* ── Image Container ── */}
        <div className="relative w-full aspect-[4/3] bg-[#F5F5F3] overflow-hidden">
          <Image
            src={mainImage}
            alt={name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {hoverImage && (
            <Image
              src={hoverImage}
              alt={`${name} alternative view`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 ease-out"
            />
          )}
        </div>

        {/* ── Details ── */}
        <div className={`flex flex-col flex-1 justify-between ${compact ? "p-3.5" : "p-4 sm:p-5 md:p-6"}`}>
          <div>
            <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#8A572A] block mb-1.5 leading-normal">
              {displayCategory}
            </span>

            <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#141414] group-hover:text-[#8A572A] transition-colors duration-300 line-clamp-1 mb-1.5 leading-snug">
              {name}
            </h3>

            {displayDescription && (
              <p className="text-[#666666] text-xs font-light line-clamp-2 leading-relaxed hidden sm:block mb-3">
                {displayDescription}
              </p>
            )}
          </div>

          <div className="pt-2 sm:pt-3 border-t border-[#F0F0EE] flex items-center justify-between mt-auto">
            <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide">
              Custom Made
            </span>

            <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#8A572A] group-hover:translate-x-1 transition-transform">
              <span>View Details</span>
              <ArrowRight size={11} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}