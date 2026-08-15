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
      <div className="pt-32 pb-32 bg-white min-h-[60vh] flex flex-col items-center justify-center">
        <div className="text-center max-w-md px-4">
          <h1 className="text-3xl font-serif font-bold text-[#141414] mb-3">
            Piece Not Found
          </h1>
          <p className="text-[#666666] text-sm mb-6 leading-relaxed">
            The furniture piece you are looking for is currently unavailable or being restored.
          </p>
          <Link
            href="/products"
            className="btn-primary"
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

  return (
    <div className="bg-white min-h-screen pb-24">
      <div className="max-container pt-6 md:pt-10">
        
        {/* ── Breadcrumbs ── */}
        <nav className="flex items-center gap-2 text-xs text-[#777777] mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-[#141414] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link href="/products" className="hover:text-[#141414] transition-colors">
            {product.categories?.name || "Collections"}
          </Link>
          <span>/</span>
          <span className="text-[#141414] font-semibold">{product.name}</span>
        </nav>

        {/* ── Main Product Layout ── */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-24">
          
          {/* ══════ LEFT: Large Gallery ══════ */}
          <div className="w-full lg:w-[55%] space-y-4">
            <div className="relative aspect-[4/3] w-full bg-[#F5F5F3] rounded-xs overflow-hidden border border-[#EBEBEA]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={images[currentImageIndex]}
                    alt={product.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 55vw, 100vw"
                    className="object-cover"
                  />
                </motion.div>
              </AnimatePresence>

              <div className="absolute bottom-4 right-4 bg-black/70 text-white text-[10px] font-bold px-3 py-1 rounded-sm">
                {currentImageIndex + 1} / {images.length}
              </div>
            </div>

            {/* Thumbnails */}
            {images.length > 1 && (
              <div className="flex gap-3 overflow-x-auto pb-2">
                {images.map((img: string, i: number) => (
                  <button
                    key={i}
                    onClick={() => setCurrentImageIndex(i)}
                    className={`relative w-20 aspect-square rounded-xs overflow-hidden border transition-all ${
                      currentImageIndex === i
                        ? "border-[#141414] ring-1 ring-[#141414]"
                        : "border-[#EBEBEA] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img} alt={`View ${i + 1}`} fill className="object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ══════ RIGHT: Clean Product Information ══════ */}
          <div className="w-full lg:w-[45%] flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="eyebrow text-[#7A4E2D] mb-0">
                    {product.categories?.name || "Nilambur Teak Collection"}
                  </span>

                  <button
                    onClick={() => toggleFavorite(product.slug)}
                    className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-[#555555] hover:text-[#141414] transition-colors"
                  >
                    <Heart
                      size={18}
                      fill={liked ? "#7A4E2D" : "none"}
                      className={liked ? "text-[#7A4E2D]" : ""}
                    />
                    <span>{liked ? "Saved" : "Save"}</span>
                  </button>
                </div>

                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414] leading-tight mb-3">
                  {product.name}
                </h1>

                <div className="text-xl font-sans font-semibold text-[#141414]">
                  {product.price || "Price on Request"}
                </div>
              </div>

              <p className="text-sm md:text-base text-[#555555] font-light leading-relaxed">
                {product.short_description || product.description}
              </p>

              {/* Specifications */}
              <div className="py-6 border-y border-[#EBEBEA] space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-[#141414]">
                  Specifications & Details
                </h3>
                <div className="grid grid-cols-2 gap-y-2.5 text-xs">
                  <div className="text-[#777777]">Timber Origin:</div>
                  <div className="text-[#141414] font-medium">100% Genuine Nilambur Teak</div>

                  <div className="text-[#777777]">Joinery:</div>
                  <div className="text-[#141414] font-medium">Traditional Mortise & Tenon</div>

                  <div className="text-[#777777]">Finish:</div>
                  <div className="text-[#141414] font-medium">Natural Satin Teak Oil / Matte</div>

                  <div className="text-[#777777]">Delivery:</div>
                  <div className="text-[#141414] font-medium">Pan-India Insured Transit</div>

                  <div className="text-[#777777]">Warranty:</div>
                  <div className="text-[#141414] font-medium">Lifetime Craftsmanship Guarantee</div>
                </div>
              </div>

              {/* Features List */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-[#333333]">
                  <CheckCircle2 size={14} className="text-[#7A4E2D]" />
                  <span>Legally sourced through Kerala Forest Department auctions</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#333333]">
                  <CheckCircle2 size={14} className="text-[#7A4E2D]" />
                  <span>Custom dimensions & architectural millwork available</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-[#333333]">
                  <CheckCircle2 size={14} className="text-[#7A4E2D]" />
                  <span>Naturally termite-proof & moisture resistant mature heartwood</span>
                </div>
              </div>

            </div>

            {/* Actions */}
            <div className="space-y-3 pt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 btn-primary flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  <span>WhatsApp Inquiry</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <Phone size={15} />
                  <span>Call Studio</span>
                </a>
              </div>

              <div className="flex items-center justify-between text-xs text-[#777777] p-3 bg-[#FAFAF9] rounded-xs border border-[#EBEBEA]">
                <span className="flex items-center gap-1.5">
                  <Truck size={14} /> Pan-India White Glove Delivery
                </span>
                <span>Direct from Nilambur</span>
              </div>
            </div>

          </div>

        </div>

        {/* ── Related Pieces ── */}
        {relatedProducts && relatedProducts.length > 0 && (
          <div className="pt-16 border-t border-[#EBEBEA]">
            <div className="flex items-end justify-between mb-10">
              <div>
                <span className="eyebrow text-[#7A4E2D]">Explore More</span>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#141414]">
                  Complementary Teak Pieces
                </h2>
              </div>
              <Link
                href="/products"
                className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-[#141414] hover:text-[#7A4E2D]"
              >
                <span>View All</span>
                <ArrowRight size={13} />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
