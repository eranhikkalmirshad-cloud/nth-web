// components/home/BrandStrip.tsx
"use client";

import { Trees, Award, Truck, Star, ShieldCheck, PackageCheck } from "lucide-react";

const TRUST_ITEMS = [
  { icon: Trees, text: "100% Nilambur Teak" },
  { icon: Award, text: "Govt. Certified Source" },
  { icon: Truck, text: "Pan-India Insured Delivery" },
  { icon: Star, text: "25+ Years Craftsmanship" },
  { icon: ShieldCheck, text: "Lifetime Guarantee" },
  { icon: PackageCheck, text: "Custom Orders Welcome" },
];

export default function BrandStrip() {
  return (
    <section id="trust-bar" className="w-full bg-[#C9922A] text-[#2C1810] py-4 overflow-hidden border-y border-[#9A6E1A] shadow-md">
      <div className="flex w-full overflow-hidden select-none">
        {/* Continuous Marquee Track */}
        <div className="marquee-track flex items-center gap-12 text-sm md:text-base font-bold uppercase tracking-wider font-lato whitespace-nowrap">
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className="flex items-center gap-3 shrink-0">
                <div className="w-8 h-8 rounded-full bg-[#2C1810]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#2C1810]" />
                </div>
                <span>{item.text}</span>
                <span className="text-[#2C1810]/40 ml-8 text-xs">◆</span>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
