// components/home/BannerSection.tsx
"use client";

import Link from "next/link";
import { MessageCircle, ArrowRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";

export default function BannerSection() {
  return (
    <section className="py-24 md:py-32 bg-white border-t border-[#EBEBEA] text-center">
      <div className="max-container px-4">
        <FadeInView>
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="eyebrow text-[#7A4E2D]">Nilambur Teak Heritage</span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414] leading-tight tracking-tight">
              Bring the warmth of natural teak into your home.
            </h2>

            <p className="text-base md:text-lg text-[#555555] font-light leading-relaxed max-w-xl mx-auto">
              From signature living suites to bespoke pooja doors and royal dining tables, discover furniture crafted to be loved for generations.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/products"
                className="btn-primary flex items-center gap-2"
              >
                <span>Explore Collection</span>
                <ArrowRight size={15} />
              </Link>

              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <MessageCircle size={15} className="text-[#25D366]" />
                <span>WhatsApp Consultation</span>
              </a>
            </div>
          </div>
        </FadeInView>
      </div>
    </section>
  );
}
