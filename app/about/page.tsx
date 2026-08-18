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
  Ruler, 
  Eye, 
  CheckCircle2, 
  BadgeCheck, 
  Clock,
  ChevronRight,
  HeartHandshake
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function AboutPage() {
  const processSteps = [
    {
      num: "01",
      icon: Ruler,
      title: "We Visit & Measure",
      desc: "Our team visits your home or consults digitally, measures the exact space, and discusses your functional needs. We verify doorways, ceiling heights, and room flow so every piece is noted down with precision.",
      bullets: [
        "Free design consultation",
        "Detailed precision measurements",
        "Architectural space planning",
        "Teak grade & fabric selection",
      ],
    },
    {
      num: "02",
      icon: Hammer,
      title: "We Manufacture",
      desc: "Back at our Nilambur workshop, master craftsmen hand-build your furniture from mature, seasoned teak. We cut, plane, join with traditional mortise & tenon, and hand-rub organic finishes. You are always welcome to visit anytime to see your pieces taking shape.",
      bullets: [
        "Handcrafted in Nilambur",
        "100% solid mature teak",
        "Regular video & photo updates",
        "Workshop visit welcome",
      ],
    },
    {
      num: "03",
      icon: Truck,
      title: "We Deliver & Install",
      desc: "Once thoroughly inspected, we carefully crate and transport your furniture with white-glove logistics. Our crew installs it directly in your room, ensuring it sits level, fits flawlessly, and looks exactly as envisioned.",
      bullets: [
        "Careful pan-India delivery",
        "White-glove room installation",
        "Perfect fit guaranteed",
        "5-Year warranty & lifetime support",
      ],
    },
  ];

  const milestones = [
    {
      year: "2001",
      title: "The Beginning",
      desc: "Started with a modest front-house workshop and 2 skilled craftsmen dedicated to authentic Nilambur teak woodworking.",
      side: "left",
    },
    {
      year: "2008",
      title: "Growing Trust",
      desc: "Word spread across Kerala as families and architects sought out our enduring joinery and honest teak selection.",
      side: "right",
    },
    {
      year: "2015",
      title: "Master Workshop Facility",
      desc: "Expanded to a dedicated modern-traditional atelier in Nilambur to handle custom residential and architectural demands.",
      side: "left",
    },
    {
      year: "2020",
      title: "Pan-India Bespoke Projects",
      desc: "Launched direct custom consultations and insured doorstep delivery for luxury homes and commercial projects nationwide.",
      side: "right",
    },
    {
      year: "2026",
      title: "25 Years Strong",
      desc: "Celebrating a quarter-century of uncompromising Nilambur teak heritage, master craftsmanship, and client relationships.",
      side: "left",
    },
  ];

  const differentiators = [
    {
      title: "Perfect Fit, Always",
      desc: "Because we custom-build to your exact room blueprints and architectural drawings, every wardrobe, cot, and dining table fits seamlessly.",
      badge: "Bespoke Precision",
    },
    {
      title: "Fair All-Inclusive Pricing",
      desc: "Direct from our Nilambur workshop with no retail middleman markups. Transparent timber grading, premium hardware, and honest estimates.",
      badge: "Direct from Workshop",
    },
    {
      title: "Transparent Craftsmanship",
      desc: "We believe in complete openness. Visit our workshop floor, inspect the raw teak logs, and review video updates as your pieces are hand-carved.",
      badge: "Open Atelier",
    },
  ];

  return (
    <main className="min-h-screen bg-white font-sans selection:bg-[#8A572A] selection:text-white">
      
      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 1. HERO SECTION (TWO-COLUMN EDITORIAL SPLIT) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="bg-[#FAF8F5] border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left Content Column */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8">
              <FadeInView direction="right">
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
                  ABOUT NILAMBUR TEAK HERITAGE
                </span>

                <h1 className="text-4xl sm:text-5xl lg:text-[56px] font-serif font-bold text-[#141414] leading-[1.12] tracking-tight">
                  Our Story.<br />
                  <span className="italic font-serif font-normal text-[#2A2420]">Crafted in Heritage,</span><br />
                  <span className="italic font-serif font-normal text-[#8A572A]">Built to Last.</span>
                </h1>

                <p className="text-sm sm:text-base text-[#5A524C] font-normal leading-relaxed max-w-lg">
                  Established in 2001, Nilambur Teak Heritage began with a modest front-house workshop, two master artisans, and a deep passion for heirloom-quality woodworking.
                </p>

                {/* 4-Stat Horizontal Ribbon Grid */}
                <div className="pt-4 sm:pt-6 border-t border-[#EAE4DC] grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
                  <div className="space-y-1.5">
                    <div className="text-[#8A572A]">
                      <Award size={20} strokeWidth={1.75} />
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-[#141414]">2001</div>
                    <div className="text-[11px] text-[#7A726A] font-medium leading-tight">Year Founded</div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[#8A572A]">
                      <Compass size={20} strokeWidth={1.75} />
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-[#141414]">25+</div>
                    <div className="text-[11px] text-[#7A726A] font-medium leading-tight">Years Mastery</div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[#8A572A]">
                      <Trees size={20} strokeWidth={1.75} />
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-[#141414]">100%</div>
                    <div className="text-[11px] text-[#7A726A] font-medium leading-tight">Nilambur Teak</div>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-[#8A572A]">
                      <Truck size={20} strokeWidth={1.75} />
                    </div>
                    <div className="text-xl sm:text-2xl font-serif font-bold text-[#141414]">Pan-India</div>
                    <div className="text-[11px] text-[#7A726A] font-medium leading-tight">White-Glove Delivery</div>
                  </div>
                </div>
              </FadeInView>
            </div>

            {/* Right Artisan Feature Portrait Column */}
            <div className="lg:col-span-6">
              <FadeInView direction="left">
                <div className="relative aspect-[4/5] sm:aspect-[1/1] lg:aspect-[4/5] w-full rounded-3xl overflow-hidden shadow-2xl bg-[#1C130D]">
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
      {/* ── 2. VISION STATEMENT SECTION (BRAND PILLAR) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-14 sm:py-20 bg-white border-b border-[#EAE6DF]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <FadeInView>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF4ED] border border-[#8A572A]/30 text-[#8A572A] text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em]">
              <HeartHandshake size={14} />
              <span>OUR VISION</span>
            </div>

            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#141414] leading-snug mt-3">
              Building an Enduring Brand from the Heart of Nilambur
            </h2>

            <div className="bg-[#FAF8F5] p-6 sm:p-10 rounded-3xl border border-[#EAE4DC] shadow-xs relative mt-6">
              <span className="text-4xl text-[#8A572A] font-serif absolute top-4 left-6 opacity-30 select-none">“</span>
              <p className="text-sm sm:text-base md:text-lg font-serif italic text-[#3A322B] leading-relaxed relative z-10 px-2 sm:px-6">
                To become a trusted and respected furniture manufacturer known for exceptional craftsmanship, premium teak wood, timeless design, and uncompromising quality. We aim to preserve the heritage of traditional woodworking while embracing modern designs and manufacturing standards, delivering durable and elegant furniture to customers across India and building a strong, enduring brand from the heart of Nilambur.
              </p>
              <span className="text-4xl text-[#8A572A] font-serif absolute bottom-2 right-6 opacity-30 select-none">”</span>
            </div>
          </FadeInView>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 3. OUR SIMPLE PROCESS (3-CARD CAROUSEL / GRID) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2.5">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
              OUR SIMPLE PROCESS
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#111111] tracking-tight">
              From Your Living Room to Our Workshop, and Back
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              We keep it simple. Three steps, and you get bespoke solid teak furniture made exactly for your space.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <FadeInView key={step.num} delay={idx * 0.1}>
                  <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#EAE6DF] shadow-xs hover:shadow-xl hover:border-[#8A572A]/40 transition-all duration-300 flex flex-col justify-between h-full relative group">
                    <div>
                      {/* Header with Icon & Step Number */}
                      <div className="flex items-center justify-between mb-5">
                        <div className="w-12 h-12 rounded-2xl bg-[#FAF4ED] text-[#8A572A] border border-[#8A572A]/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                          <Icon size={22} />
                        </div>
                        <span className="text-3xl sm:text-4xl font-serif font-bold text-[#8A572A]/20 group-hover:text-[#8A572A]/40 transition-colors">
                          {step.num}
                        </span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-serif font-bold text-[#141414] mb-3">
                        {step.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed font-normal mb-5">
                        {step.desc}
                      </p>
                    </div>

                    {/* Feature Bullets */}
                    <div className="pt-4 border-t border-[#F0EBE3] space-y-2">
                      {step.bullets.map((bullet, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs font-medium text-[#443D37]">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#8A572A]" />
                          <span>{bullet}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </FadeInView>
              );
            })}
          </div>

          {/* Average Timeline Banner */}
          <div className="text-center mt-10 sm:mt-12">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#E0D8CC] shadow-xs text-xs font-semibold text-[#443D37]">
              <Clock size={15} className="text-[#8A572A]" />
              <span><strong>Average timeline:</strong> 3–6 weeks from measurement to installation</span>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 4. 25 YEARS IN NILAMBUR (TIMELINE ON DARK CANVAS) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-20 sm:py-28 bg-[#120E0A] text-white relative overflow-hidden">
        {/* Subtle Ambient Woodgrain Lighting */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#8A572A]/20 via-transparent to-black pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-2.5">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#E5B56E] block font-sans">
              OUR JOURNEY
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold text-white tracking-tight">
              25 Years in Nilambur
            </h2>
            <p className="text-xs sm:text-sm text-[#C8BFB5] font-light leading-relaxed">
              From a modest workshop to Kerala&apos;s trusted solid teak woodcraft destination.
            </p>
          </div>

          {/* Vertical Stepped Milestone Timeline */}
          <div className="relative max-w-3xl mx-auto">
            {/* Center Golden Timeline Track */}
            <div className="absolute left-1/2 -translate-x-1/2 top-4 bottom-4 w-0.5 bg-gradient-to-b from-[#8A572A]/40 via-[#E5B56E]/60 to-[#8A572A]/40 hidden md:block" />

            <div className="space-y-8 sm:space-y-12">
              {milestones.map((item, idx) => {
                const isLeft = idx % 2 === 0;
                return (
                  <FadeInView key={item.year} delay={idx * 0.08}>
                    <div className="relative flex flex-col md:flex-row items-center">
                      
                      {/* Left Box (Desktop) */}
                      <div className={`w-full md:w-1/2 ${isLeft ? "md:pr-10 md:text-right" : "md:pl-10 md:order-2 md:text-left"}`}>
                        <div className="bg-[#1A140F] border border-[#3A2A1D] hover:border-[#8A572A] rounded-2xl p-5 sm:p-6 shadow-xl transition-all duration-300 group">
                          <span className="text-xl sm:text-2xl font-serif font-bold text-[#E5B56E] block mb-1">
                            {item.year}
                          </span>
                          <h3 className="text-sm sm:text-base font-bold text-white mb-1.5 font-cinzel">
                            {item.title}
                          </h3>
                          <p className="text-xs text-[#A89F95] font-light leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>

                      {/* Center Node Badge (Desktop) */}
                      <div className="absolute left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#120E0A] border-2 border-[#E5B56E] hidden md:flex items-center justify-center text-[10px] font-bold text-[#E5B56E] z-20 shadow-lg">
                        <span className="w-2 h-2 rounded-full bg-[#E5B56E] animate-ping" />
                      </div>

                      {/* Empty Opposite Column for Desktop Alignment */}
                      <div className={`hidden md:block w-1/2 ${isLeft ? "order-2" : "order-1"}`} />

                    </div>
                  </FadeInView>
                );
              })}
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 5. WHAT MAKES US DIFFERENT (3 HIGHLIGHT CARDS) ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-2">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
              WHY OUR CLIENTS TRUST US
            </span>
            <h2 className="text-2xl sm:text-4xl font-serif font-bold text-[#141414] tracking-tight">
              What Makes Us Different
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {differentiators.map((diff, i) => (
              <FadeInView key={diff.title} delay={i * 0.08}>
                <div className="bg-[#FAF8F5] rounded-3xl p-6 sm:p-8 border border-[#EAE4DC] shadow-xs hover:shadow-lg transition-all duration-300 h-full flex flex-col justify-between">
                  <div className="space-y-3">
                    <span className="inline-block text-[9px] font-bold uppercase tracking-wider text-[#8A572A] bg-[#FAF4ED] px-3 py-1 rounded-full border border-[#8A572A]/20">
                      {diff.badge}
                    </span>
                    <h3 className="text-lg font-serif font-bold text-[#141414]">
                      {diff.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed font-normal">
                      {diff.desc}
                    </p>
                  </div>
                </div>
              </FadeInView>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 6. THE FOUR UNCHANGING PILLARS ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FAF8F5] border-b border-[#EAE6DF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
              CORE PHILOSOPHY
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#141414]">
              Our Four Core Values
            </h2>
            <p className="text-xs sm:text-sm text-[#665E56]">
              Quality, Craftsmanship, Reliability, and Customer Trust.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div className="bg-white p-6 rounded-2xl border border-[#EAE4DC] text-center space-y-2.5 shadow-xs">
              <Trees className="mx-auto text-[#8A572A]" size={26} />
              <h3 className="font-serif font-bold text-base text-[#141414]">1. Quality</h3>
              <p className="text-xs text-[#665E56] leading-relaxed">
                100% genuine mature Nilambur teak wood with dense natural grain, rich oil content, and exceptional durability.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EAE4DC] text-center space-y-2.5 shadow-xs">
              <Hammer className="mx-auto text-[#8A572A]" size={26} />
              <h3 className="font-serif font-bold text-base text-[#141414]">2. Craftsmanship</h3>
              <p className="text-xs text-[#665E56] leading-relaxed">
                Traditional interlocking joinery, handcrafted architectural details, and hand-rubbed organic finishes built to last.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EAE4DC] text-center space-y-2.5 shadow-xs">
              <ShieldCheck className="mx-auto text-[#8A572A]" size={26} />
              <h3 className="font-serif font-bold text-base text-[#141414]">3. Reliability</h3>
              <p className="text-xs text-[#665E56] leading-relaxed">
                Timely project fulfillment, transparent certification, and insured pan-India white-glove doorstep delivery.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-[#EAE4DC] text-center space-y-2.5 shadow-xs">
              <Users className="mx-auto text-[#8A572A]" size={26} />
              <h3 className="font-serif font-bold text-base text-[#141414]">4. Customer Trust</h3>
              <p className="text-xs text-[#665E56] leading-relaxed">
                Decades of enduring customer relationships built on integrity, honest guidance, and unmatched post-delivery support.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* ── 7. COMMISSION A MASTERPIECE BANNER ── */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-white relative overflow-hidden">
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