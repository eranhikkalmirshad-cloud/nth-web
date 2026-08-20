// app/favorites/page.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { getProductBySlug } from "@/lib/api/products";
import { Product } from "@/lib/types";
import { Trash2, HeartCrack, ArrowRight, MessageCircle } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadFavorites() {
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
        const validProducts = loaded.filter((p): p is Product => p !== null && p !== undefined);
        if (isMounted) {
          setFavoriteProducts(validProducts);
          setIsLoading(false);
        }
      } catch (e) {
        console.error("Error loading favorites:", e);
        if (isMounted) setIsLoading(false);
      }
    }

    loadFavorites();
    return () => {
      isMounted = false;
    };
  }, [favorites]);

  const waInquiryMsg = encodeURIComponent(
    `Hello ${SITE_CONFIG.name}, I have saved the following pieces from your catalog:\n${favoriteProducts.map((p) => `- ${p.name}`).join("\n")}\n\nPlease share custom quotation and delivery timelines.`
  );

  return (
    <div className="pt-24 pb-32 bg-[#FAF9F7] min-h-screen font-sans">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <FadeInView>
          <div className="mb-12">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block mb-2 font-sans">
              YOUR CURATED SELECTION
            </span>
            <h1 className="text-3xl md:text-5xl font-serif font-bold text-slate-900">
              Saved Teak Pieces
            </h1>
            <p className="text-slate-500 text-sm mt-2">
              {favorites.length} {favorites.length === 1 ? "piece" : "pieces"} saved in your personal Nilambur collection.
            </p>
          </div>
        </FadeInView>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#8A572A] border-t-transparent animate-spin" />
          </div>
        ) : favoriteProducts.length === 0 ? (
          <FadeInView delay={0.1}>
            <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-xs flex flex-col items-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF4ED] border border-[#8A572A]/20 flex items-center justify-center text-[#8A572A]">
                <HeartCrack size={36} strokeWidth={1.5} />
              </div>
              <div className="space-y-1">
                <h2 className="text-xl font-serif font-bold text-slate-900">
                  Your saved collection is empty
                </h2>
                <p className="text-slate-500 text-xs md:text-sm max-w-sm">
                  Browse our handcrafted teak furniture catalog and click the heart icon on any piece to save it here.
                </p>
              </div>
              <Link
                href="/products"
                className="bg-[#111111] hover:bg-[#8A572A] text-white px-8 py-3.5 text-xs font-bold tracking-wider uppercase rounded-xl transition-all shadow-md inline-flex items-center gap-2"
              >
                <span>Browse All Collections</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeInView>
        ) : (
          <div className="flex flex-col gap-4">
            {favoriteProducts.map((product, i) => {
              const img = product.images?.[0] || "/images/placeholder-furniture.jpg";
              const catName = product.categories?.name || product.room || "Solid Teak";

              return (
                <FadeInView key={product.slug} delay={i * 0.05}>
                  <div className="bg-white rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-5 border border-slate-200/80 shadow-xs hover:border-[#8A572A]/40 transition-all group">
                    {/* Image */}
                    <Link
                      href={`/products/${product.slug}`}
                      className="relative w-full sm:w-40 aspect-square bg-[#FAF9F7] rounded-xl shrink-0 overflow-hidden border border-slate-100"
                    >
                      <Image
                        src={img}
                        alt={product.name}
                        fill
                        className="object-contain p-2 group-hover:scale-105 transition-transform duration-500"
                      />
                    </Link>

                    {/* Info */}
                    <div className="flex-1 flex flex-col justify-between py-1 w-full">
                      <div>
                        <div className="flex justify-between items-start w-full">
                          <div>
                            <span className="block text-[10px] uppercase tracking-wider text-[#8A572A] font-bold mb-1">
                              {catName}
                            </span>
                            <Link href={`/products/${product.slug}`}>
                              <h3 className="text-lg md:text-xl font-bold text-slate-900 hover:text-[#8A572A] transition-colors">
                                {product.name}
                              </h3>
                            </Link>
                          </div>

                          <button
                            onClick={() => toggleFavorite(product.slug)}
                            className="text-slate-400 hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors shrink-0 cursor-pointer"
                            title="Remove from saved"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>

                        <p className="text-slate-500 text-xs line-clamp-2 mt-2 leading-relaxed">
                          {product.short_description || product.description}
                        </p>
                      </div>

                      <div className="mt-4 flex items-center justify-between pt-3 border-t border-slate-100">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Bespoke Made-to-Order
                        </span>
                        <Link
                          href={`/products/${product.slug}`}
                          className="text-xs font-bold uppercase tracking-wider text-[#8A572A] hover:text-[#111111] transition-colors flex items-center gap-1"
                        >
                          <span>View Details</span>
                          <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </FadeInView>
              );
            })}

            <FadeInView delay={0.2}>
              <div className="mt-6 flex justify-end">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${waInquiryMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#111111] hover:bg-[#8A572A] text-white px-8 py-4 text-xs font-bold tracking-widest uppercase transition-all shadow-lg flex items-center gap-2.5 rounded-xl active:scale-95"
                >
                  <MessageCircle size={18} />
                  <span>Enquire Saved Pieces on WhatsApp</span>
                </a>
              </div>
            </FadeInView>
          </div>
        )}
      </div>
    </div>
  );
}
