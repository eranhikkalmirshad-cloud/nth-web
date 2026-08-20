// components/ui/FavoritesDrawer.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { getProductBySlug } from "@/lib/api/products";
import { Product } from "@/lib/types";
import { X, Trash2, HeartCrack, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

export default function FavoritesDrawer() {
  const { favorites, toggleFavorite, isDrawerOpen, setDrawerOpen } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isDrawerOpen) return;

    let isMounted = true;
    async function loadFavorites() {
      setIsLoading(true);
      if (favorites.length === 0) {
        if (isMounted) {
          setFavoriteProducts([]);
          setIsLoading(false);
        }
        return;
      }

      try {
        const loaded = await Promise.all(
          favorites.map((slug) => getProductBySlug(slug))
        );
        const validProducts = loaded.filter((p): p is Product => p !== undefined && p !== null);
        if (isMounted) {
          setFavoriteProducts(validProducts);
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Failed to load wishlist items:", e);
        if (isMounted) setIsLoading(false);
      }
    }

    loadFavorites();
    return () => {
      isMounted = false;
    };
  }, [favorites, isDrawerOpen]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  const inquiryMessage = encodeURIComponent(
    `Hello ${SITE_CONFIG.name}, I have saved the following Nilambur teak pieces and would like custom quotation & dimensions:\n` +
      favoriteProducts.map((p) => `- ${p.name} (${p.categories?.name || p.room || "Teak Furniture"})`).join("\n")
  );

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[300] flex justify-end font-sans">
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-xs cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 26, stiffness: 220 }}
            className="relative w-full max-w-md h-full bg-[#FAF9F7] shadow-2xl flex flex-col z-10 border-l border-slate-200"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#24190F] bg-[#120E0A] text-white">
              <div>
                <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#E5B56E] block mb-1">
                  CURATED SELECTION
                </span>
                <h2 className="text-lg font-serif font-bold text-white tracking-tight">
                  Saved Teak Pieces
                </h2>
                <p className="text-[#A89E94] text-xs mt-0.5">
                  {favorites.length} {favorites.length === 1 ? "piece" : "pieces"} in your wishlist
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
                aria-label="Close Favorites"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {isLoading ? (
                <div className="flex justify-center items-center py-24">
                  <div className="w-8 h-8 rounded-full border-2 border-[#8A572A] border-t-transparent animate-spin"></div>
                </div>
              ) : favoriteProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center pb-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FAF4ED] border border-[#8A572A]/20 flex items-center justify-center text-[#8A572A]">
                    <HeartCrack size={30} strokeWidth={1.5} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-serif font-bold text-slate-900">
                      Your wishlist is empty
                    </h3>
                    <p className="text-slate-500 text-xs max-w-xs mx-auto leading-relaxed">
                      Explore our handcrafted Nilambur teak pieces and tap the heart icon on any piece to save it for custom quotation.
                    </p>
                  </div>
                  <Link
                    href="/products"
                    onClick={() => setDrawerOpen(false)}
                    className="bg-[#111111] hover:bg-[#8A572A] text-white px-6 py-3.5 text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md active:scale-95"
                  >
                    Browse Teak Collection
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {favoriteProducts.map((product) => {
                    const img = product.images?.[0] || "/images/placeholder-furniture.jpg";
                    const catName = product.categories?.name || product.room || "Solid Teak";

                    return (
                      <div
                        key={product.slug}
                        className="group relative flex gap-4 bg-white p-3.5 border border-slate-200/80 rounded-2xl hover:border-[#8A572A]/40 transition-all shadow-xs"
                      >
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => setDrawerOpen(false)}
                          className="relative w-20 h-20 bg-[#FAF9F7] rounded-xl shrink-0 overflow-hidden block border border-slate-100"
                        >
                          <Image
                            src={img}
                            alt={product.name}
                            fill
                            className="object-contain p-1 group-hover:scale-105 transition-transform"
                          />
                        </Link>

                        <div className="flex-1 flex flex-col justify-center pr-6">
                          <span className="text-[9px] uppercase tracking-[0.2em] text-[#8A572A] font-bold block mb-0.5">
                            {catName}
                          </span>
                          <Link
                            href={`/products/${product.slug}`}
                            onClick={() => setDrawerOpen(false)}
                            className="text-xs sm:text-sm font-bold text-slate-900 leading-snug hover:text-[#8A572A] transition-colors line-clamp-1"
                          >
                            {product.name}
                          </Link>
                          <p className="text-slate-400 text-[10px] uppercase tracking-wider mt-1 font-semibold">
                            Bespoke Made-to-Order
                          </p>
                        </div>

                        <button
                          onClick={() => toggleFavorite(product.slug)}
                          className="absolute top-3 right-3 text-slate-400 hover:text-red-600 transition-colors p-1 cursor-pointer"
                          aria-label="Remove item"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Footer Action */}
            {favoriteProducts.length > 0 && (
              <div className="p-5 border-t border-slate-200 bg-white space-y-2">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${inquiryMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#111111] hover:bg-[#8A572A] text-white px-6 py-4 text-xs font-bold tracking-widest uppercase shadow-lg flex justify-center items-center gap-2 rounded-xl transition-all active:scale-95"
                >
                  <MessageCircle size={16} />
                  <span>Enquire Pieces on WhatsApp</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
