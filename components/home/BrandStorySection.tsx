// components/home/BrandStorySection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";

export default function BrandStorySection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAF9] border-t border-[#EBEBEA]">
      <div className="max-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Editorial Photo */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <FadeInView direction="right">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden bg-[#EBEBEA] shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
                  alt="Nilambur Teak Artisan Craftsmanship"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeInView>
          </div>

          {/* Right Column: Editorial Copy */}
          <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
            <FadeInView direction="left">
              <span className="eyebrow text-[#7A4E2D]">Our Philosophy</span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414] leading-[1.18] tracking-tight">
                Crafted from nature. <br />
                Designed for generations.
              </h2>

              <p className="text-base text-[#555555] font-light leading-relaxed">
                Nilambur in Kerala is universally celebrated for yielding the world’s finest teak timber — dense in natural oils, rich in golden grain, and inherently resistant to termites and seasonal weather shifts.
              </p>

              <p className="text-base text-[#555555] font-light leading-relaxed">
                At {SITE_CONFIG.name}, we do not use veneer, composite boards, or shortcuts. Every dining table, sofa frame, and heritage cot is carved strictly from solid seasoned teak by generational artisans using interlocking joinery.
              </p>

              <div className="pt-4">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.15em] text-[#141414] hover:text-[#7A4E2D] pb-1 border-b border-[#141414] transition-colors"
                >
                  <span>Read Our Full Heritage Story</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </FadeInView>
          </div>

        </div>
      </div>
    </section>
  );
}
