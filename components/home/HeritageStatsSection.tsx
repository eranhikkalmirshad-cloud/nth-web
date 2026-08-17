// components/home/HeritageStatsSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Landmark, Users, ShieldCheck, Leaf, ArrowRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { HomepageSection } from "@/lib/types";

interface HeritageStatsSectionProps {
  section?: HomepageSection | null;
}

export default function HeritageStatsSection({ section }: HeritageStatsSectionProps) {
  // Parse data or use defaults from the reference design
  const eyebrow = section?.subtitle || "01 — OUR HERITAGE";
  const title = section?.title || "A Legacy of Excellence.";
  const description =
    section?.description ||
    "For over 25 years, Nilambur Teak Heritage has been the benchmark for premium furniture craftsmanship in Kerala, blending traditional artistry with modern design.";
  const imageUrl = section?.image_url || "/images/heritage-artisan.jpg";
  const ctaText = section?.cta_text || "DISCOVER OUR STORY";
  const ctaUrl = section?.cta_url || "/about";

  // Badge data (from mobile_image_url field or default)
  const badgeRaw = section?.mobile_image_url || "NILAMBUR TEAK|Crafted to last generations";
  const [badgeTitle, badgeSubtitle] = badgeRaw.includes("|")
    ? badgeRaw.split("|")
    : ["NILAMBUR TEAK", "Crafted to last generations"];

  // 4 Default stats from the exact design
  const defaultStats = [
    {
      icon: Landmark,
      value: "25+",
      label: "YEARS OF CRAFTSMANSHIP",
    },
    {
      icon: Users,
      value: "5,000+",
      label: "HOMES TRANSFORMED",
    },
    {
      icon: ShieldCheck,
      value: "10",
      label: "YEAR WARRANTY",
    },
    {
      icon: Leaf,
      value: "100%",
      label: "GENUINE TEAK WOOD",
    },
  ];

  return (
    <section className="relative py-12 sm:py-20 lg:py-28 bg-[#FCFAF7] overflow-hidden">
      {/* Subtle topographic / wood grain contour background lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[radial-gradient(#8A572A_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Decorative Woodgrain Contour SVGs on left and right borders */}
      <svg
        className="absolute -left-20 top-1/4 w-96 h-96 text-[#8A572A]/[0.04] pointer-events-none hidden sm:block"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 50,0 C 150,100 0,250 100,400 M 100,0 C 200,120 50,280 150,400 M 150,0 C 250,140 100,310 200,400"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <svg
        className="absolute -right-20 bottom-10 w-96 h-96 text-[#8A572A]/[0.04] pointer-events-none hidden sm:block"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M 350,0 C 250,100 400,250 300,400 M 300,0 C 200,120 350,280 250,400 M 250,0 C 150,140 300,310 200,400"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Top 2-Column Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14 items-center mb-10 sm:mb-16 lg:mb-20">
          
          {/* Left Column: Story & Typography */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            <FadeInView direction="right">
              {/* Eyebrow with horizontal line */}
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-5">
                <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] uppercase text-[#8A572A] font-sans">
                  {eyebrow}
                </span>
                <div className="h-[1px] flex-1 bg-[#8A572A]/25 max-w-[100px] sm:max-w-[140px]" />
              </div>

              {/* Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-serif text-[#1C130D] leading-[1.15] tracking-tight mb-4 sm:mb-6">
                A Legacy of{" "}
                <span className="italic font-normal text-[#8A572A] block sm:inline font-serif">
                  Excellence.
                </span>
              </h2>

              {/* Description Body */}
              <p className="text-xs sm:text-sm lg:text-[15px] text-[#5A524C] font-normal leading-relaxed mb-6 sm:mb-8 max-w-lg">
                {description}
              </p>

              {/* Discover Our Story Button */}
              <div>
                <Link
                  href={ctaUrl}
                  className="inline-flex items-center gap-2.5 sm:gap-3 bg-gradient-to-r from-[#7A471C] via-[#8A5222] to-[#6A3914] hover:from-[#5C300E] hover:to-[#5C300E] text-white px-6 sm:px-7 py-3 sm:py-3.5 rounded-lg text-xs font-bold uppercase tracking-[0.16em] transition-all duration-300 shadow-[0_8px_20px_-6px_rgba(122,71,28,0.45)] hover:shadow-lg transform hover:-translate-y-0.5 active:scale-95 group font-sans"
                >
                  <span>{ctaText}</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </FadeInView>
          </div>

          {/* Right Column: Master Carving Craftsmanship Image & Floating Badge */}
          <div className="lg:col-span-7 mt-4 lg:mt-0">
            <FadeInView direction="left">
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_16px_40px_-12px_rgba(28,19,13,0.18)] border border-[#E7DFD5]">
                <Image
                  src={imageUrl}
                  alt="Master woodworker carving Nilambur teak"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                />

                {/* Floating Glassmorphic Teak Seal Badge in Top-Right Corner */}
                <div className="absolute top-3 sm:top-6 right-3 sm:right-6 bg-[#160E08]/85 backdrop-blur-md border border-amber-500/35 rounded-xl sm:rounded-2xl p-2.5 sm:p-4 text-white shadow-2xl flex items-center gap-2.5 sm:gap-3.5 max-w-[200px] sm:max-w-[280px]">
                  {/* Gold Outlined Teak Leaf Emblem */}
                  <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-lg sm:rounded-xl bg-amber-950/70 border border-amber-500/40 flex items-center justify-center text-[#E5B56E] shrink-0">
                    <Leaf size={16} strokeWidth={1.5} className="text-[#E5B56E] sm:w-5 sm:h-5" />
                  </div>

                  {/* Badge Text */}
                  <div className="flex flex-col text-left">
                    <span className="text-[9px] sm:text-[11px] font-bold tracking-[0.15em] sm:tracking-[0.18em] uppercase text-[#E5B56E] font-sans leading-tight">
                      {badgeTitle}
                    </span>
                    <span className="text-[8px] sm:text-[10px] italic font-serif text-amber-100/90 leading-tight mt-0.5">
                      {badgeSubtitle}
                    </span>
                  </div>
                </div>
              </div>
            </FadeInView>
          </div>

        </div>

        {/* Bottom 4-Column Stat Box (2x2 Grid on Mobile, 4-Col on Desktop) */}
        <FadeInView delay={0.15}>
          <div className="bg-white/95 backdrop-blur-xs rounded-2xl sm:rounded-3xl p-5 sm:p-8 lg:p-10 border border-[#EAE3D9] shadow-[0_12px_35px_-10px_rgba(138,87,42,0.08)]">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-0">
              {defaultStats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col sm:flex-row items-center sm:items-center text-center sm:text-left gap-2.5 sm:gap-4 lg:px-6 xl:px-8 ${
                      idx !== defaultStats.length - 1 ? "lg:border-r lg:border-[#ECE4DA]" : ""
                    }`}
                  >
                    {/* Circle Icon Container */}
                    <div className="w-11 h-11 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-full bg-[#FAF5EE] border border-[#E8DCCB] flex items-center justify-center text-[#8A572A] shrink-0 shadow-2xs">
                      <Icon size={20} strokeWidth={1.5} className="text-[#8A572A] sm:w-6 sm:h-6" />
                    </div>

                    {/* Number & Label */}
                    <div className="flex flex-col">
                      <span className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold font-sans text-[#1C130D] tracking-tight">
                        {stat.value}
                      </span>
                      <span className="text-[8px] sm:text-[10px] font-bold tracking-[0.1em] uppercase text-[#7D736A] font-sans mt-0.5 leading-tight">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeInView>

      </div>
    </section>
  );
}
