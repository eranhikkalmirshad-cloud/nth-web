// app/about/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInView from "@/components/ui/FadeInView";
import { 
  Award, 
  Compass, 
  Trees, 
  Truck, 
  ArrowUpRight, 
  MessageCircle, 
  Sparkles,
  ShieldCheck,
  Hammer,
  Users,
  CheckCircle2,
  Quote
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#8A572A] selection:text-white">
      
      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 1. HERO SECTION (TWO-COLUMN EDITORIAL SPLIT) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <FadeInView direction="right">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block">
                  ABOUT NILAMBUR TEAK HERITAGE
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-[58px] font-serif font-bold text-[#141414] leading-[1.12] tracking-tight">
                  Our Story.<br />
                  <span className="italic font-serif font-normal text-[#2A2420]">Crafted in Heritage,</span><br />
                  <span className="italic font-serif font-normal text-[#8A572A]">Built to Last.</span>
                </h1>

                <p className="text-sm sm:text-base text-[#5A524C] font-normal leading-relaxed max-w-lg">
                  Established in 2001, Nilambur Teak Heritage began with a modest front-house workshop and a passion for creating timeless teak furniture.
                </p>

                {/* 4-Stat Horizontal Ribbon Grid */}
                <div className="pt-4 sm:pt-6 border-t border-[#EAE4DC] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  {/* Stat 1 */}
                  <div className="space-y-1.5">
                    <div className="text-[#8A572A]">
                      <Award size={20} strokeWidth={1.75} />
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-[#141414]">2001</div>
                    <div className="text-[11px] text-[#7A726A] font-medium leading-tight">Year Founded</div>
                  </div>

                  {/* Stat 2 */}
                  <div className="space-y-1.5">
                    <div className="text-[#8A572A]">
                      <Compass size={20} strokeWidth={1.75} />
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-[#141414]">25+</div>
                    <div className="text-[11px] text-[#7A726A] font-medium leading-tight">Years of Experience</div>
                  </div>

                  {/* Stat 3 */}
                  <div className="space-y-1.5">
                    <div className="text-[#8A572A]">
                      <Trees size={20} strokeWidth={1.75} />
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-[#141414]">100%</div>
                    <div className="text-[11px] text-[#7A726A] font-medium leading-tight">Pure Nilambur Teak</div>
                  </div>

                  {/* Stat 4 */}
                  <div className="space-y-1.5">
                    <div className="text-[#8A572A]">
                      <Truck size={20} strokeWidth={1.75} />
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-[#141414]">Pan-India</div>
                    <div className="text-[11px] text-[#7A726A] font-medium leading-tight">Delivery & Installation</div>
                  </div>
                </div>
              </FadeInView>
            </div>

            {/* Right Artisan Feature Portrait Column */}
            <div className="lg:col-span-6">
              <FadeInView direction="left">
                <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-2xl overflow-hidden shadow-2xl bg-[#1C130D]">
                  <Image
                    src="/images/heritage-artisan.jpg"
                    alt="Master Artisan Planing Solid Nilambur Teak Wood"
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />

                  {/* Luxury Floating Emblem Badge */}
                  <div className="absolute bottom-6 right-6 bg-[#18110B]/90 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl border border-[#8A572A]/40 shadow-2xl flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-[#8A572A]/30 border border-[#E5B56E]/40 flex items-center justify-center text-[#E5B56E] shrink-0">
                      <Sparkles size={18} />
                    </div>
                    <div>
                      <span className="text-base sm:text-lg font-serif font-bold text-[#E5B56E] tracking-tight block leading-none mb-1">
                        25+ YEARS
                      </span>
                      <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#CFC5B8] block">
                        OF TIMELESS CRAFTSMANSHIP
                      </span>
                    </div>
                  </div>
                </div>
              </FadeInView>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 2. ORIGIN & PASSION (STORY SECTION) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left Living Room Showcase Image */}
            <div className="lg:col-span-5">
              <FadeInView direction="right">
                <div className="relative aspect-[4/4.2] w-full rounded-2xl overflow-hidden bg-[#FAF8F5] shadow-lg border border-[#EAE6DF]">
                  <Image
                    src="/images/og-datas/IMG_0600.PNG"
                    alt="Nilambur Teak Heritage Living Room Suite"
                    fill
                    sizes="(min-width: 1024px) 45vw, 100vw"
                    className="object-cover"
                  />
                </div>
              </FadeInView>
            </div>

            {/* Right Story & Quote Text */}
            <div className="lg:col-span-7 space-y-6">
              <FadeInView direction="left">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block">
                  ORIGIN & PASSION
                </span>

                <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#141414] leading-[1.2]">
                  From a Modest Front-House Workshop to a Trusted Teak Specialist
                </h2>

                {/* Luxury Highlighted Quote Box */}
                <div className="bg-[#F7F3EE] p-5 sm:p-6 rounded-xl border-l-4 border-[#8A572A] relative">
                  <span className="text-3xl text-[#8A572A] font-serif absolute top-3 left-4 leading-none select-none opacity-40">
                    &ldquo;
                  </span>
                  <p className="text-xs sm:text-sm font-serif italic text-[#3A322B] leading-relaxed pl-5">
                    Established in 2001, Nilambur Teak Heritage began its journey in a modest front-house workshop with just two skilled craftsmen and a passion for quality woodworking.
                  </p>
                </div>

                <div className="space-y-4 text-xs sm:text-sm text-[#554D46] leading-relaxed font-normal">
                  <p>
                    Over the years, our dedication to craftsmanship, quality materials, and customer satisfaction has helped us grow into a trusted business specialising in teak wood furniture and building materials.
                  </p>
                  <p>
                    Today, we continue to combine the rich teak heritage of Nilambur with skilled craftsmanship and contemporary standards, serving residential, commercial, and project requirements.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center gap-1.5 bg-[#8A572A] hover:bg-[#6E3F18] text-white text-[11px] font-bold uppercase tracking-[0.14em] px-6 py-3.5 rounded-full transition-all shadow-md active:scale-95 border border-[#8A572A]"
                  >
                    <span>EXPLORE OUR COLLECTION</span>
                    <ArrowUpRight size={14} />
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white hover:bg-[#FAF8F5] text-[#141414] border border-[#D5CEC5] text-[11px] font-bold uppercase tracking-[0.14em] px-6 py-3.5 rounded-full transition-all shadow-xs active:scale-95"
                  >
                    <span>VISIT OUR WORKSHOP</span>
                  </Link>
                </div>
              </FadeInView>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 3. THE FOUR PILLARS (DEEP LUXURY WOODGRAIN TEXTURE) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#120D09] text-white relative overflow-hidden">
        {/* Subtle Radial Woodgrain Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8A572A]/20 via-transparent to-black pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#E5B56E] block font-sans">
              THE FOUR PILLARS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-white tracking-tight">
              Our Core Values Remain Unchanged
            </h2>
            <p className="text-xs sm:text-sm text-[#C8BFB5] font-light leading-relaxed">
              While we have grown over the years, our core values remain unchanged:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
            
            {/* Value 1: Quality */}
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#8A572A] flex items-center justify-center text-[#E5B56E]">
                  <Trees size={26} strokeWidth={1.5} />
                </div>
                <span className="absolute -bottom-2 bg-[#120D09] px-2 text-[9px] font-bold uppercase tracking-wider text-[#8A572A] border border-[#8A572A]/50 rounded-full">
                  01
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-white pt-1">
                01. Quality
              </h3>
              <p className="text-xs text-[#A89F95] leading-relaxed font-light font-sans max-w-xs mx-auto">
                100% genuine mature Nilambur teak wood with dense natural grain, rich oil content, and exceptional durability.
              </p>
            </div>

            {/* Value 2: Craftsmanship */}
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#8A572A] flex items-center justify-center text-[#E5B56E]">
                  <Hammer size={26} strokeWidth={1.5} />
                </div>
                <span className="absolute -bottom-2 bg-[#120D09] px-2 text-[9px] font-bold uppercase tracking-wider text-[#8A572A] border border-[#8A572A]/50 rounded-full">
                  02
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-white pt-1">
                02. Craftsmanship
              </h3>
              <p className="text-xs text-[#A89F95] leading-relaxed font-light font-sans max-w-xs mx-auto">
                Traditional interlocking joinery, handcrafted architectural details, and hand-rubbed organic finishes built to last generations.
              </p>
            </div>

            {/* Value 3: Reliability */}
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#8A572A] flex items-center justify-center text-[#E5B56E]">
                  <ShieldCheck size={26} strokeWidth={1.5} />
                </div>
                <span className="absolute -bottom-2 bg-[#120D09] px-2 text-[9px] font-bold uppercase tracking-wider text-[#8A572A] border border-[#8A572A]/50 rounded-full">
                  03
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-white pt-1">
                03. Reliability
              </h3>
              <p className="text-xs text-[#A89F95] leading-relaxed font-light font-sans max-w-xs mx-auto">
                Timely project fulfillment, transparent certification, and insured pan-India white-glove doorstep delivery.
              </p>
            </div>

            {/* Value 4: Customer Trust */}
            <div className="text-center space-y-4">
              <div className="relative mx-auto w-16 h-16 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full border border-[#8A572A] flex items-center justify-center text-[#E5B56E]">
                  <Users size={26} strokeWidth={1.5} />
                </div>
                <span className="absolute -bottom-2 bg-[#120D09] px-2 text-[9px] font-bold uppercase tracking-wider text-[#8A572A] border border-[#8A572A]/50 rounded-full">
                  04
                </span>
              </div>
              <h3 className="text-base font-serif font-bold text-white pt-1">
                04. Customer Trust
              </h3>
              <p className="text-xs text-[#A89F95] leading-relaxed font-light font-sans max-w-xs mx-auto">
                Decades of enduring customer relationships built on integrity, honest guidance, and unmatched post-delivery support.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 5. COMMISSION A MASTERPIECE BANNER (CONCENTRIC RINGS) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5] relative overflow-hidden">
        {/* Concentric Tree Rings Watermark Illustration */}
        <div className="absolute -right-20 -bottom-20 w-96 h-96 pointer-events-none opacity-20">
          <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-[#8A572A]">
            <circle cx="100" cy="100" r="20" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="40" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" />
            <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" />
            <circle cx="100" cy="100" r="100" fill="none" stroke="currentColor" strokeWidth="1" />
            <circle cx="100" cy="100" r="120" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="5 5" />
          </svg>
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-5 relative z-10">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            LET&apos;S CREATE TIMELESS SPACES
          </span>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-[#141414] leading-tight">
            Commission a Nilambur Teak Masterpiece
          </h2>

          <p className="text-xs sm:text-sm text-[#665E56] font-normal leading-relaxed max-w-xl mx-auto">
            Whether you require custom dining suites, heritage Kerala entrance doors, or comprehensive residential woodwork, consult directly with our master craftsmen.
          </p>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-1.5 bg-[#8A572A] hover:bg-[#6E3F18] text-white text-[11px] font-bold uppercase tracking-[0.14em] px-7 py-3.5 rounded-full transition-all shadow-md active:scale-95 border border-[#8A572A]"
            >
              <span>REQUEST CUSTOM CONSULTATION</span>
              <ArrowUpRight size={14} />
            </Link>

            <a
              href={SITE_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-white hover:bg-[#FAF8F5] text-[#141414] border border-[#D5CEC5] text-[11px] font-bold uppercase tracking-[0.14em] px-7 py-3.5 rounded-full transition-all shadow-xs active:scale-95"
            >
              <MessageCircle size={15} className="text-[#25D366]" />
              <span>WHATSAPP WITH ARTISAN</span>
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}