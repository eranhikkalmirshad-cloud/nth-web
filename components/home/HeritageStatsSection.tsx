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
    <section className="py-12 sm:py-16 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeInView>
          {/* 4-Item Stat Grid matching exact reference */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 max-w-5xl mx-auto text-center">
            {stats.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center justify-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8A572A]" />
                  <span className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-[#111111] tracking-tight">
                    {item.num}
                  </span>
                </div>
                <span className="text-xs sm:text-sm text-slate-500 font-normal tracking-wide">
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
