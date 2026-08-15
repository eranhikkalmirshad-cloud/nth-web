import Link from "next/link";
import { ArrowRight, Trees } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center px-6 py-24">
      <div className="text-center max-w-xl">
        <div className="relative inline-block mb-6 select-none">
          <span
            className="font-cinzel font-black text-[140px] md:text-[180px] leading-none opacity-10 text-[#2C1810]"
          >
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-[#2C1810] font-playfair mb-2">
                Piece Not Found
              </h1>
              <div className="h-[2px] w-16 bg-[#C9922A] mx-auto" />
            </div>
          </div>
        </div>

        <p className="text-[#6B4226] font-light text-base leading-relaxed mb-10 max-w-md mx-auto font-lato">
          The page or furniture piece you are looking for has been moved or is undergoing artisan restoration. Let us guide you back to our collections.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-[#C9922A] hover:bg-[#E8B84B] text-[#2C1810] px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors shadow"
          >
            <span>Back to Home</span>
            <ArrowRight size={14} />
          </Link>
          <Link
            href="/products"
            className="inline-flex items-center justify-center gap-2 border border-[#D4A96A] text-[#2C1810] px-8 py-3.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#F5ECD7] transition-colors"
          >
            <span>Browse Collections</span>
          </Link>
        </div>

        <div className="mt-16 flex items-center justify-center gap-3">
          <span className="h-[1px] w-12 bg-[#D4A96A] opacity-40" />
          <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9922A] font-cinzel">
            {SITE_CONFIG.name}
          </span>
          <span className="h-[1px] w-12 bg-[#D4A96A] opacity-40" />
        </div>
      </div>
    </div>
  );
}
