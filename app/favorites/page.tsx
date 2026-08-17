"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { getProductBySlug, Product } from "@/lib/data/products";
import { Trash2, HeartCrack, ArrowRight, MessageCircle, Sparkles } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";

export default function FavoritesPage() {
  const { favorites, toggleFavorite } = useFavorites();
  const [favoriteProducts, setFavoriteProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadFavorites() {
      if (favorites.length === 0) {
        setFavoriteProducts([]);
        setIsLoading(false);
        return;
      }

      const loaded = await Promise.all(
        favorites.map((slug) => getProductBySlug(slug))
      );
      
      const validProducts = loaded.filter((p): p is Product => p !== null);
      setFavoriteProducts(validProducts);
      setIsLoading(false);
    }

    loadFavorites();
  }, [favorites]);

  const waInquiryMsg = encodeURIComponent(
    `Hello ${SITE_CONFIG.name}, I have saved the following pieces from your catalog:\n${favoriteProducts.map((p) => `- ${p.name}`).join("\n")}\n\nPlease share quotation and delivery timelines.`
  );

  return (
    <div className="pt-24 pb-32 bg-[#FDFAF5] min-h-screen">
      <div className="max-w-4xl mx-auto px-4 md:px-8">
        <FadeInView>
          <div className="mb-12">
            <span className="heading-label">
              Your Curated Selection
            </span>
            <h1 className="text-3xl md:text-5xl font-bold text-[#2C1810] font-playfair">
              Saved Teak Pieces
            </h1>
            <p className="text-[#6B4226] text-sm mt-2 font-lato">
              {favorites.length} {favorites.length === 1 ? "piece" : "pieces"} saved in your personal Nilambur collection.
            </p>
          </div>
        </FadeInView>

        {isLoading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 rounded-full border-2 border-[#C9922A] border-t-transparent animate-spin" />
          </div>
        ) : favoriteProducts.length === 0 ? (
          <FadeInView delay={0.2}>
            <div className="bg-white rounded-2xl p-12 text-center border border-[#D4A96A]/30 shadow-sm flex flex-col items-center">
              <HeartCrack size={48} className="text-[#D4A96A] mb-4" strokeWidth={1} />
              <h2 className="text-xl font-bold text-[#2C1810] font-playfair mb-2">
                Your saved collection is empty
              </h2>
              <p className="text-[#6B4226] text-xs md:text-sm mb-6 max-w-sm font-lato">
                Browse our handcrafted teak furniture catalog and click the heart icon on any piece to save it here.
              </p>
              <Link
                href="/products"
                className="bg-[#C9922A] hover:bg-[#E8B84B] text-[#2C1810] px-8 py-3.5 text-xs font-bold tracking-wider uppercase rounded-lg transition-colors inline-flex items-center gap-2 shadow"
              >
                <span>Browse All Collections</span>
                <ArrowRight size={14} />
              </Link>
            </div>
          </FadeInView>
        ) : (
          <div className="flex flex-col gap-4">
            {favoriteProducts.map((product, i) => (
              <FadeInView key={product.slug} delay={i * 0.05}>
                <div className="bg-white rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-stretch gap-5 border border-[#D4A96A]/30 shadow-sm transition-all hover:shadow-md group">
                  {/* Image */}
                  <Link
                    href={`/products/${product.slug}`}
                    className="relative w-full sm:w-40 aspect-square bg-[#2C1810] rounded-lg flex-shrink-0 overflow-hidden"
                  >
                    <Image
                      src={product.images[0] || "/images/placeholder-furniture.jpg"}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between py-1 w-full">
                    <div>
                      <div className="flex justify-between items-start w-full">
                        <div>
                          <span className="block text-[10px] uppercase tracking-wider text-[#C9922A] font-bold mb-1">
                            100% Genuine Nilambur Teak
                          </span>
                          <Link href={`/products/${product.slug}`}>
                            <h3 className="text-lg md:text-xl font-bold text-[#2C1810] font-playfair hover:text-[#C9922A] transition-colors">
                              {product.name}
                            </h3>
                          </Link>
                        </div>

                        <button
                          onClick={() => toggleFavorite(product.slug)}
                          className="text-[#6B4226] hover:text-red-600 p-2 rounded-full hover:bg-red-50 transition-colors shrink-0"
                          title="Remove from saved"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>

                      <p className="text-[#6B4226] text-xs line-clamp-2 mt-2 font-lato">
                        {product.short_description || product.description}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between pt-2 border-t border-[#D4A96A]/20">
                      <span className="text-xs font-bold uppercase tracking-wider text-[#8A572A]">
                        Custom Made
                      </span>
                      <Link
                        href={`/products/${product.slug}`}
                        className="text-xs font-bold uppercase tracking-wider text-[#C9922A] hover:text-[#9A6E1A] transition-colors flex items-center gap-1"
                      >
                        <span>View Piece</span>
                        <ArrowRight size={12} />
                      </Link>
                    </div>
                  </div>
                </div>
              </FadeInView>
            ))}

            <FadeInView delay={0.3}>
              <div className="mt-6 flex justify-end">
                <a
                  href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${waInquiryMsg}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#4A7C59] hover:bg-[#3D6649] text-white px-8 py-4 text-xs font-bold tracking-wider uppercase transition-colors shadow-lg flex items-center gap-2.5 rounded-xl"
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
