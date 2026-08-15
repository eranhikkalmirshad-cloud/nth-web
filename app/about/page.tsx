// app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInView from "@/components/ui/FadeInView";
import { MessageCircle, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* ── Editorial Hero ── */}
      <section className="pt-12 pb-16 md:pt-20 md:pb-24 bg-white border-b border-[#EBEBEA]">
        <div className="max-container text-center max-w-3xl mx-auto space-y-6">
          <span className="eyebrow text-[#7A4E2D]">Our Story & Lineage</span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-[#141414] leading-[1.12] tracking-tight">
            Born in the Teak Capital of the World.
          </h1>

          <p className="text-base md:text-lg text-[#555555] font-light leading-relaxed">
            From the historic forests of Nilambur in Kerala to distinguished homes across India, we create solid teak wood furniture designed to be cherished for generations.
          </p>
        </div>
      </section>

      {/* ── Section 1: The Nilambur Forest Heritage (Split) ── */}
      <section className="py-20 md:py-28 bg-[#FAFAF9]">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <FadeInView direction="right">
                <span className="eyebrow text-[#7A4E2D]">Living Legacy</span>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141414] leading-tight">
                  Where Nature & Heritage Converge
                </h2>

                <p className="text-base text-[#555555] font-light leading-relaxed">
                  Nilambur in Kerala is world-renowned as the cradle of teak forestry, home to the historic Conolly’s Plot established in the 1840s. The unique microclimate, monsoon rains, and mineral-rich riverbed soil produce teak wood with superior natural oil concentration, exceptional tensile strength, and lustrous golden grain.
                </p>

                <p className="text-base text-[#555555] font-light leading-relaxed">
                  At {SITE_CONFIG.name}, we participate strictly in official Kerala Forest Department auctions. Every log carries verified provenance certificates, ensuring our furniture supports legal, sustainable forestry.
                </p>
              </FadeInView>
            </div>

            <div className="lg:col-span-6">
              <FadeInView direction="left">
                <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-[#F5F5F3] shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=1200&auto=format&fit=crop"
                    alt="Nilambur Teak Forests"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </FadeInView>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 2: Master Woodcraft & Traditional Joinery ── */}
      <section className="py-20 md:py-28 bg-white border-t border-[#EBEBEA]">
        <div className="max-container">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            <div className="lg:col-span-6 order-2 lg:order-1">
              <FadeInView direction="right">
                <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-[#F5F5F3] shadow-sm">
                  <Image
                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1200&auto=format&fit=crop"
                    alt="Traditional Kerala Joinery"
                    fill
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </FadeInView>
            </div>

            <div className="lg:col-span-6 order-1 lg:order-2 space-y-6">
              <FadeInView direction="left">
                <span className="eyebrow text-[#7A4E2D]">Generational Artistry</span>

                <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141414] leading-tight">
                  Handcrafted by Master Artisans
                </h2>

                <p className="text-base text-[#555555] font-light leading-relaxed">
                  Every curve, dovetail joint, and hand-rubbed oil polish is executed by Kerala craftsmen whose families have passed down this noble woodworking tradition through generations.
                </p>

                <p className="text-base text-[#555555] font-light leading-relaxed">
                  We reject quick composite materials and nails in structural joints. By relying on interlocking mortise-and-tenon construction, our furniture naturally expands and breathes across seasons without warping.
                </p>

                <div className="pt-2 flex items-center gap-4">
                  <Link
                    href="/products"
                    className="btn-primary"
                  >
                    View Collections
                  </Link>

                  <a
                    href={SITE_CONFIG.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary"
                  >
                    Discuss Custom Piece
                  </a>
                </div>
              </FadeInView>
            </div>

          </div>
        </div>
      </section>

      {/* ── Section 3: 4 Core Principles ── */}
      <section className="py-20 md:py-28 bg-[#FAFAF9] border-t border-[#EBEBEA]">
        <div className="max-container">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="eyebrow text-[#7A4E2D]">Our Standards</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#141414]">
              The Four Guiding Principles
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                num: "01",
                title: "100% Solid Heartwood",
                desc: "Never composite board, veneer, or secondary woods. Pure mature Nilambur teak throughout.",
              },
              {
                num: "02",
                title: "Traditional Joinery",
                desc: "Interlocking mortise-and-tenon craftsmanship engineered for lifetime structural integrity.",
              },
              {
                num: "03",
                title: "Government Certified",
                desc: "Ethically procured through legal Kerala Forest Department timber auctions.",
              },
              {
                num: "04",
                title: "White Glove Delivery",
                desc: "Insured pan-India transit and professional room setup direct from our workshop.",
              },
            ].map((p, i) => (
              <div key={p.num} className="bg-white p-8 rounded-xs border border-[#EBEBEA] space-y-3">
                <span className="font-serif text-2xl font-bold text-[#7A4E2D]">
                  {p.num}
                </span>
                <h3 className="text-base font-serif font-bold text-[#141414]">
                  {p.title}
                </h3>
                <p className="text-xs md:text-sm text-[#666666] font-light leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}