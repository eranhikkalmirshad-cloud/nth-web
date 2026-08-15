// components/layout/MobileBottomBar.tsx
"use client";

import Link from "next/link";
import { Phone, MessageCircle, Layers, Heart } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import { useFavorites } from "@/lib/context/FavoritesContext";

export default function MobileBottomBar() {
  const { favoritesCount, setDrawerOpen } = useFavorites();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-[90] bg-white/98 backdrop-blur-md text-[#141414] border-t border-[#EAEAEA] px-3 py-2 shadow-lg">
      <div className="grid grid-cols-4 gap-1 text-center items-center">
        {/* Call Button */}
        <a
          href={`tel:${SITE_CONFIG.contact.phone}`}
          className="flex flex-col items-center justify-center py-1 text-[#444444] hover:text-[#141414] transition-colors"
          aria-label="Call Nilambur Teak Heritage"
        >
          <Phone size={17} className="mb-0.5 text-[#141414]" />
          <span className="text-[10px] font-medium tracking-wider uppercase">Call</span>
        </a>

        {/* WhatsApp Button */}
        <a
          href={SITE_CONFIG.contact.whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1 text-[#444444] hover:text-[#25D366] transition-colors"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircle size={17} className="text-[#25D366] mb-0.5" />
          <span className="text-[10px] font-medium tracking-wider uppercase">WhatsApp</span>
        </a>

        {/* Collections */}
        <Link
          href="/products"
          className="flex flex-col items-center justify-center py-1 text-[#444444] hover:text-[#141414] transition-colors"
          aria-label="View Teak Collections"
        >
          <Layers size={17} className="mb-0.5 text-[#141414]" />
          <span className="text-[10px] font-medium tracking-wider uppercase">Catalog</span>
        </Link>

        {/* Saved / Favorites */}
        <button
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center justify-center py-1 text-[#444444] hover:text-[#141414] transition-colors relative"
          aria-label="View Saved Furniture"
        >
          <div className="relative">
            <Heart size={17} className="mb-0.5 text-[#141414]" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-[#7A4E2D] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] font-medium tracking-wider uppercase">Saved</span>
        </button>
      </div>
    </div>
  );
}
