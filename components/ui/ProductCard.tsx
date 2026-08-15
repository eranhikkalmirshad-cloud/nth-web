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
        <div className={`flex flex-col flex-1 justify-between ${compact ? "p-4" : "p-5 md:p-6"}`}>
          <div>
            <span className="text-[10px] md:text-[11px] font-sans font-semibold tracking-[0.15em] uppercase text-[#777777] block mb-1.5">
              {displayCategory}
            </span>

            <h3 className="text-lg md:text-xl font-serif font-bold text-[#141414] group-hover:text-[#7A4E2D] transition-colors line-clamp-1">
              {name}
            </h3>

            {displayDescription && (
              <p className="text-xs md:text-sm text-[#666666] font-light line-clamp-2 mt-1.5 leading-relaxed">
                {displayDescription}
              </p>
            )}
          </div>

          <div className="mt-5 pt-3 border-t border-[#F0F0EE] flex items-center justify-between">
            <span className="text-xs md:text-sm font-semibold text-[#141414]">
              {price || "Custom Quote"}
            </span>

            <span className="text-xs font-semibold tracking-wider uppercase text-[#141414] group-hover:text-[#7A4E2D] flex items-center gap-1 transition-colors">
              View <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}