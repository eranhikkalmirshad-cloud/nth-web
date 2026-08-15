"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { getProductBySlug, Product } from "@/lib/data/products";
import { X, Trash2, HeartCrack, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

export default function FavoritesDrawer() {
  const { favorites, toggleFavorite, isDrawerOpen, setDrawerOpen } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isDrawerOpen) return;

    async function loadFavorites() {
      setIsLoading(true);
      if (favorites.length === 0) {
        setFavoriteProducts([]);
        setIsLoading(false);
        return;
      }

      const loaded = await Promise.all(
        favorites.map((slug) => getProductBySlug(slug))
      );

      const validProducts = loaded.filter((p): p is Product => p !== undefined && p !== null);
      setFavoriteProducts(validProducts);
      setIsLoading(false);
    }

    loadFavorites();
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
    `Hello ${SITE_CONFIG.name}, I have saved the following Nilambur teak pieces and would like pricing and custom dimension details:\n` +
      favoriteProducts.map((p) => `- ${p.name} (${p.category})`).join("\n")
  );

  return (
    <AnimatePresence>
      {isDrawerOpen && (
        <div className="fixed inset-0 z-[300] flex justify-end">
          {/* Overlay Background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="relative w-full max-w-md h-full bg-[#FDFAF5] shadow-2xl flex flex-col z-10 border-l border-[#D4A96A]/30"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-6 border-b border-[#D4A96A]/30 bg-[#3D1F0D] text-[#F5ECD7]">
              <div>
                <h2 className="text-[18px] font-bold text-[#E8B84B] font-cinzel">
                  Saved Teak Pieces
                </h2>
                <p className="text-[#EAD5B0] text-xs">
                  {favorites.length} {favorites.length === 1 ? "item" : "items"} in your custom list
                </p>
              </div>
              <button
                onClick={() => setDrawerOpen(false)}
                className="w-9 h-9 rounded-full bg-[#2C1810] hover:bg-[#5C3D1E] flex items-center justify-center text-[#F5ECD7] transition-colors"
                aria-label="Close Favorites"
              >
                <X size={18} strokeWidth={1.5} />
              </button>
            </div>

            {/* Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              {isLoading ? (
                <div className="flex justify-center py-20">
                  <div className="w-8 h-8 rounded-full border-2 border-[#C9922A] border-t-transparent animate-spin"></div>
                </div>
              ) : favoriteProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center pb-20">
                  <HeartCrack size={40} className="text-[#C4956A]/50 mb-4" strokeWidth={1.5} />
                  <h3 className="text-lg font-bold text-[#2C1810] mb-2 font-playfair">
                    Your collection is empty
                  </h3>
                  <p className="text-[#6B4226] text-xs mb-8 px-4 leading-relaxed">
                    Explore our handcrafted Nilambur teak catalog and tap the heart icon on any piece to save it for custom quotation.
                  </p>
                  <Link
                    href="/products"
                    onClick={() => setDrawerOpen(false)}
                    className="bg-[#C9922A] hover:bg-[#E8B84B] text-[#2C1810] px-6 py-3 text-[11px] font-bold tracking-[0.15em] uppercase rounded-md transition-colors"
                  >
                    Explore Teak Collection
                  </Link>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {favoriteProducts.map((product) => (
                    <div
                      key={product.slug}
                      className="group relative flex gap-4 bg-white p-3 border border-[#D4A96A]/30 rounded-lg hover:border-[#C9922A] transition-colors shadow-sm"
                    >
                      <Link
                        href={`/products/${product.slug}`}
                        onClick={() => setDrawerOpen(false)}
                        className="relative w-22 h-22 bg-[#f9f9f9] rounded-md shrink-0 overflow-hidden block"
                      >
                        <Image
                          src={product.images[0] || "/images/placeholder-furniture.jpg"}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </Link>

                      <div className="flex-1 flex flex-col pt-0.5">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-[#C9922A] font-bold mb-1">
                          {product.category}
                        </span>
                        <Link
                          href={`/products/${product.slug}`}
                          onClick={() => setDrawerOpen(false)}
                          className="text-[13px] font-bold text-[#2C1810] leading-tight hover:text-[#8B5E3C] transition-colors pr-6 font-playfair"
                        >
                          {product.name}
                        </Link>
                        <p className="text-[#8B5E3C] text-[12px] font-bold mt-1">
                          {product.price}
                        </p>

                        <button
                          onClick={() => toggleFavorite(product.slug)}
                          className="absolute top-3 right-3 text-[#6B4226]/50 hover:text-red-600 transition-colors p-1"
                          aria-label="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Action */}
            {favoriteProducts.length > 0 && (
              <div className="p-5 border-t border-[#D4A96A]/30 bg-[#FDFAF5] space-y-2.5">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${inquiryMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#4A7C59] hover:bg-[#3D6649] text-white px-6 py-3.5 text-xs font-bold tracking-[0.1em] uppercase shadow-md flex justify-center items-center gap-2 rounded-lg transition-colors"
                >
                  <MessageCircle size={16} />
                  <span>Enquire Collection via WhatsApp</span>
                </a>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
