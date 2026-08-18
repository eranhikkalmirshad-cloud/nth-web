// app/products/[slug]/ProductClientPage.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Heart,
  Truck,
  ArrowRight,
  Phone,
  ShoppingBag,
  Sparkles,
  Ruler,
  CheckCircle2,
} from "lucide-react";

import { Product } from "@/lib/types";
import { SITE_CONFIG } from "@/config/site";

export default function ProductClientPage({
  product,
  relatedProducts,
}: {
  product: Product | null;
  relatedProducts: Product[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { isFavorite, toggleFavorite } = useFavorites();
  const liked = product ? isFavorite(product.slug) : false;

  if (!product) {
    return (
      <div className="pt-32 pb-32 bg-white min-h-[60vh] flex flex-col items-center justify-center font-sans">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-serif font-bold text-[#141414] mb-3">
            Piece Not Found
          </h1>
          <p className="text-[#666666] text-sm mb-6 leading-relaxed">
            The furniture piece you are looking for is currently unavailable or being custom restored.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center justify-center px-6 py-3 bg-[#8A572A] text-white text-xs font-bold uppercase tracking-wider rounded-xl hover:bg-[#6E3F18] transition-all"
          >
            Explore Collections
          </Link>
        </div>
      </div>
    );
  }

  const whatsappMessage = encodeURIComponent(
    `Hello ${SITE_CONFIG.name}, I am inquiring about the ${product.name} (100% Genuine Nilambur Teak). Please share pricing, custom dimensions, and delivery timeline.`
  );
  const whatsappLink = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${whatsappMessage}`;
  
  const images =
    product.images && product.images.length > 0
      ? product.images
      : ["/images/placeholder-furniture.jpg"];

  // Extract dimensions and weight from specifications if present
  const dimensionsSpec = product.specifications?.find(
    (s) => s.label.toLowerCase().includes("dimen") || s.label.toLowerCase().includes("size")
  )?.value || "Custom Made to Order";

  const weightSpec = product.specifications?.find(
    (s) => s.label.toLowerCase().includes("weight")
  )?.value || "Solid Mature Teak";

  // Other specifications excluding dimensions and weight
  const otherSpecs = product.specifications?.filter(
    (s) => !s.label.toLowerCase().includes("dimen") && !s.label.toLowerCase().includes("weight")
  ) || [];

  // Default highlights fallback if none set in admin
  const highlights =
    product.features && product.features.length > 0
      ? product.features
      : [
          "Crafted from 100% genuine mature Nilambur teak wood",
          "Finished with natural hand-rubbed organic teak oil",
          "Custom dimensions and architectural millwork available",
          "Naturally termite-proof, borer-proof, and moisture resistant",
        ];

  return (
    <div className="bg-white min-h-screen pb-24 font-sans selection:bg-[#8A572A] selection:text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 md:pt-10">
        
        {/* ── Breadcrumbs ── */}
        <nav className="flex items-center gap-2 text-xs text-slate-400 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-slate-900 transition-colors">
            {product.categories?.name || "Collections"}
          </Link>
          <span>/</span>
          <span className="text-slate-900 font-semibold truncate max-w-[200px] sm:max-w-none">
            {product.name}
          </span>
        </nav>

        {/* ── Main Product Two-Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start mb-20">
          
          {/* ══════ LEFT: Magnat Style Large Gallery Card ══════ */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-[4/3] sm:aspect-[4/3.2] w-full bg-[#FAF9F7] rounded-3xl overflow-hidden border border-slate-200/80 shadow-xs flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="relative w-full h-full p-4 sm:p-6 flex items-center justify-center"
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain object-center"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Magnat Floating Pill Counter Badge (Bottom Right) */}
              <div className="absolute bottom-4 right-4 bg-[#141414]/90 backdrop-blur-md text-white text-[11px] font-bold px-3.5 py-1 rounded-full shadow-md">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails Strip */}
            {images.length > 1 && (
              <div
                className="flex gap-3 overflow-x-auto pb-2 hide-scrollbar"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              >
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-20 aspect-square rounded-2xl overflow-hidden border-2 transition-all shrink-0 bg-[#FAF9F7] ${
                      currentImageIndex === i
                        ? "border-[#8A572A] ring-2 ring-[#8A572A]/20"
                        : "border-slate-200 opacity-60 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`Thumbnail ${i + 1}`} fill className="object-contain p-1.5" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ══════ RIGHT: Magnat Style Clean Information Column ══════ */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Category Eyebrow & Wishlist Save Button */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block">
                {product.categories?.name || "Solid Teak Heritage"}
              </span>

              <button
                onClick={() => toggleFavorite(product.slug)}
                className="w-10 h-10 rounded-full bg-slate-50 hover:bg-slate-100 border border-slate-200/80 flex items-center justify-center text-slate-600 hover:text-slate-900 transition-colors"
                title={liked ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart
                  size={18}
                  fill={liked ? "#8A572A" : "none"}
                  className={liked ? "text-[#8A572A]" : ""}
                />
              </button>
            </div>

            {/* Big Bold Clean Title */}
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-bold text-slate-900 leading-[1.15] tracking-tight uppercase">
                {product.name}
              </h1>

              {/* Excerpt / Subtitle */}
              <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed mt-3 max-w-xl">
                {product.short_description || product.description || "Handcrafted from 100% mature Nilambur teak wood with generational joinery and natural satin polish."}
              </p>
            </div>

            {/* KEY HIGHLIGHTS (2-Column Bullet Grid) */}
            <div className="pt-2">
              <h3 className="text-xs font-bold uppercase tracking-[0.18em] text-slate-900 mb-3.5">
                KEY HIGHLIGHTS
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
                {highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A572A] mt-1.5 shrink-0" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bespoke Customization Callout Box */}
            <div className="bg-[#FAF9F7] p-4 sm:p-5 rounded-2xl border border-slate-200/70 flex items-start gap-4 shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-[#8A572A] shrink-0">
                <ShoppingBag size={18} />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-bold text-slate-900 tracking-tight">
                  Bespoke Customization
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                  Available in custom dimensions, architectural floor plans, and different hand-rubbed Nilambur teak finishes to match your interior.
                </p>
              </div>
            </div>

            {/* Dimensions & Weight Grid (Magnat Separator Style) */}
            <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-200">
              <div className="space-y-1">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  DIMENSIONS (W×D×H)
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 font-mono tracking-tight">
                  {dimensionsSpec}
                </p>
              </div>

              <div className="space-y-1 pl-4 border-l border-slate-200">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                  WEIGHT APPROX.
                </span>
                <p className="text-sm sm:text-base font-bold text-slate-900 font-mono tracking-tight">
                  {weightSpec}
                </p>
              </div>
            </div>

            {/* Additional Custom Specifications if defined */}
            {otherSpecs.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-1">
                {otherSpecs.map((spec, i) => (
                  <div key={i} className="bg-slate-50 p-2.5 rounded-xl border border-slate-200/60">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 block">
                      {spec.label}
                    </span>
                    <span className="text-xs font-semibold text-slate-900 block truncate">
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Rich Detailed Description if long text is provided */}
            {product.description && product.description !== product.short_description && (
              <div className="pt-2 text-xs sm:text-sm text-slate-600 leading-relaxed whitespace-pre-line bg-[#FAF9F7] p-4 rounded-2xl border border-slate-200/60">
                <span className="font-bold text-slate-900 block mb-1 uppercase tracking-wider text-[10px]">
                  Piece Background & Craftsmanship
                </span>
                {product.description}
              </div>
            )}

            {/* Actions: Big Full-Width Button */}
            <div className="space-y-3 pt-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-[#141414] hover:bg-[#8A572A] text-white font-bold text-xs uppercase tracking-widest py-4 px-6 rounded-xl flex items-center justify-center gap-2.5 transition-all shadow-lg active:scale-95 text-center"
                >
                  <MessageCircle size={17} />
                  <span>ENQUIRE VIA WHATSAPP</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold text-xs uppercase tracking-wider py-4 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-xs active:scale-95 text-center"
                >
                  <Phone size={15} />
                  <span>CALL STUDIO</span>
                </a>
              </div>

              {/* Delivery Strip */}
              <div className="flex items-center justify-between text-xs text-slate-500 p-3 bg-slate-50 rounded-xl border border-slate-200/70">
                <span className="flex items-center gap-1.5 font-medium">
                  <Truck size={14} className="text-[#8A572A]" />
                  <span>Pan-India White Glove Insured Delivery</span>
                </span>
                <span className="font-semibold text-slate-700">Direct from Nilambur Workshop</span>
              </div>
            </div>

          </div>

        </div>

        {/* ── Related Pieces ── */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-slate-200">
            <div className="flex items-end justify-between mb-8">
              <div>
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block mb-1">
                  EXPLORE MORE
                </span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
                  Complementary Teak Pieces
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-[#8A572A] transition-colors"
              >
                <span>View All</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.slice(0, 4).map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
