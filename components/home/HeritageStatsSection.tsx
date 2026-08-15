// components/home/HeritageStatsSection.tsx
"use client";

import FadeInView from "@/components/ui/FadeInView";

const stats = [
  { num: "25+", label: "Years of Legacy" },
  { num: "5000+", label: "Happy Homes" },
  { num: "15+", label: "Master Craftsmen" },
  { num: "100%", label: "Genuine Teak" },
];

export default function HeritageStatsSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow */}
        <FadeInView>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#8B5E3C] block mb-2 sm:mb-3 font-sans">
            Our Heritage
          </span>

          {/* Heading with Italic Accent */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#111111] tracking-tight mb-3 sm:mb-4">
            A Legacy of{" "}
            <span className="text-[#8B5E3C] italic font-serif font-normal">
              Excellence
            </span>
          </h2>

          {/* Short Subtitle */}
          <p className="text-xs sm:text-sm md:text-base text-[#666666] font-light max-w-2xl mx-auto leading-relaxed mb-8 sm:mb-16 px-2">
            Handcrafted with decades of master woodcraft tradition in the teak capital of Nilambur, bringing timeless character to distinguished homes.
          </p>

          {/* 4-Item Stat Grid (2x2 on mobile, 4 in a row on desktop) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-12 max-w-4xl mx-auto border-t border-[#F0F0EE] pt-6 sm:pt-10">
            {stats.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center space-y-0.5 sm:space-y-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
                  <span className="text-xl sm:text-3xl font-serif font-bold text-[#111111]">
                    {item.num}
                  </span>
                </div>
                <span className="text-[11px] sm:text-xs text-[#777777] font-medium tracking-wide">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </FadeInView>

      </div>
    </section>
  );
}
