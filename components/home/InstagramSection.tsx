// components/home/InstagramSection.tsx
"use client";

import Image from "next/image";
import { Instagram } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";

const instaPosts = [
  {
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=600&auto=format&fit=crop",
    caption: "Solid Nilambur Teak Dining Table ready for shipping.",
  },
  {
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
    caption: "Artisan living suite with natural teak oil polish.",
  },
  {
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
    caption: "Heirloom king cot crafted for a private villa in Kochi.",
  },
  {
    image: "https://images.unsplash.com/photo-1580481077111-54f65c92842c?q=80&w=600&auto=format&fit=crop",
    caption: "Traditional Kerala cane planter easy chair.",
  },
  {
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    caption: "Custom hand-carved temple entrance door in teak.",
  },
];

export default function InstagramSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow & Heading */}
        <FadeInView>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B5E3C] block mb-2 font-sans">
            Social Feed
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#111111] tracking-tight mb-1.5 sm:mb-2">
            We're on{" "}
            <span className="text-[#8B5E3C] italic font-serif font-normal">
              Instagram
            </span>
          </h2>

          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[11px] sm:text-xs font-semibold text-[#8B5E3C] hover:underline uppercase tracking-wider block mb-8 sm:mb-16"
          >
            @nilamburteakheritage
          </a>
        </FadeInView>

        {/* 5-Item Horizontal Feed with Frame */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
          {instaPosts.map((post, idx) => (
            <FadeInView key={idx} delay={idx * 0.06}>
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-xl p-2.5 sm:p-3 border border-[#EAEAEA] shadow-xs block group hover:shadow-md transition-shadow"
              >
                {/* User Header */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
                  <div className="w-4 h-4 sm:w-5 sm:h-5 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image
                      src="/images/logo-proper.png"
                      alt="Nilambur Teak"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#111111] truncate">
                    nilamburteakheritage
                  </span>
                </div>

                {/* Photo */}
                <div className="relative aspect-square w-full rounded-lg overflow-hidden bg-[#F5F5F3] mb-2">
                  <Image
                    src={post.image}
                    alt={post.caption}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white">
                    <Instagram size={11} />
                  </div>
                </div>
              </a>
            </FadeInView>
          ))}
        </div>

      </div>
    </section>
  );
}
