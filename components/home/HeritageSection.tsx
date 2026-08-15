// components/home/HeritageSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInView from "@/components/ui/FadeInView";
import { ArrowRight } from "lucide-react";

const pillars = [
  {
    num: "01",
    title: "100% Nilambur Teak",
    desc: "Sourced strictly from mature Nilambur heartwood, celebrated globally for its high natural oil density, rich golden grain, and natural pest resistance.",
  },
  {
    num: "02",
    title: "Master Craftsmanship",
    desc: "Traditional interlocking mortise-and-tenon wood joinery practiced by Kerala artisans whose lineage spans generations.",
  },
  {
    num: "03",
    title: "Government Certified",
    desc: "All timber is legally procured through authorized Kerala Forest Department auctions with official transit passes and certificates.",
  },
  {
    num: "04",
    title: "Pan-India White Glove Delivery",
    desc: "Insured doorstep transit with professional installation for private residences and architectural projects across India.",
  },
];

export default function HeritageSection() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#EBEBEA]">
      <div className="max-container">
        
        {/* ── Top Editorial Split ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-20">
          <div className="lg:col-span-6 space-y-6">
            <FadeInView direction="right">
              <span className="eyebrow text-[#7A4E2D]">Generational Provenance</span>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414] leading-[1.15] tracking-tight">
                Born in Nilambur. <br />
                Crafted in Teak. <br />
                Made to Last.
              </h2>

              <p className="text-base text-[#555555] font-light leading-relaxed">
                Home to the world’s oldest teak plantations, Nilambur’s distinctive climate and rich soil yield timber of rare density and timeless beauty. We honor this living heritage by creating furniture designed to remain in your family for decades.
              </p>

              <div className="pt-2">
                <Link
                  href="/contact"
                  className="btn-primary"
                >
                  Consult Master Artisan
                </Link>
              </div>
            </FadeInView>
          </div>

          <div className="lg:col-span-6">
            <FadeInView direction="left">
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-[#F5F5F3] shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop"
                  alt="Nilambur Teak Wood Legacy"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeInView>
          </div>
        </div>

        {/* ── 4 Pillars (Numbered Minimal Grid with Lots of Whitespace) ── */}
        <div className="pt-16 border-t border-[#EBEBEA] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {pillars.map((item, idx) => (
            <FadeInView key={item.num} delay={idx * 0.08}>
              <div className="space-y-3">
                <span className="font-serif text-2xl font-bold text-[#7A4E2D]">
                  {item.num}
                </span>
                <h3 className="text-lg font-serif font-bold text-[#141414]">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-[#666666] font-light leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>

      </div>
    </section>
  );
}