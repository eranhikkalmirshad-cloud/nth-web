// components/home/HowItWorksSection.tsx
"use client";

import { MessageSquare, Trees, Hammer, Truck } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";

const steps = [
  {
    num: "01",
    title: "Consultation & Design",
    desc: "Share your room requirements, architectural drawings, or select from our catalog.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "Timber Selection",
    desc: "Mature solid Nilambur teak heartwood is seasoned to optimal moisture levels.",
    icon: Trees,
  },
  {
    num: "03",
    title: "Master Craftsmanship",
    desc: "Traditional interlocking joints and hand-carving by Kerala master artisans.",
    icon: Hammer,
  },
  {
    num: "04",
    title: "White-Glove Delivery",
    desc: "Insured pan-India transit, careful handling, and professional in-room setup.",
    icon: Truck,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-12 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow & Heading */}
        <FadeInView>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.2em] uppercase text-[#8A572A] block mb-2 font-sans">
            Our Process
          </span>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-[#111111] tracking-tight mb-2 sm:mb-3">
            How It{" "}
            <span className="text-[#8A572A] italic font-sans font-extrabold ml-1">
              Works
            </span>
          </h2>

          <p className="text-xs sm:text-sm text-[#666666] font-light max-w-xl mx-auto mb-8 sm:mb-16 px-2">
            From timber selection to white-glove doorstep delivery, experience seamless heirloom luxury.
          </p>
        </FadeInView>

        {/* 4 Cards Grid (2x2 on mobile, 4 across on desktop) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-8 max-w-6xl mx-auto">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <FadeInView key={step.num} delay={idx * 0.08}>
                <div className="bg-white rounded-2xl p-4 sm:p-7 border border-[#EAEAEA] shadow-xs text-center flex flex-col items-center justify-between h-full group hover:shadow-md transition-shadow">
                  {/* Step Number + Dot */}
                  <div className="flex items-center gap-1 mb-2.5 sm:mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8B5E3C]" />
                    <span className="text-[10px] sm:text-xs font-bold text-[#8B5E3C] tracking-wider uppercase">
                      {step.num}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FAFAF9] border border-[#EAEAEA] flex items-center justify-center text-[#111111] mb-3 sm:mb-5 group-hover:border-[#8B5E3C] group-hover:text-[#8B5E3C] transition-colors">
                    <Icon size={18} />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-1 sm:space-y-2">
                    <h3 className="text-xs sm:text-base font-serif font-bold text-[#111111]">
                      {step.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-[#666666] font-light leading-relaxed hidden sm:block">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </FadeInView>
            );
          })}
        </div>

      </div>
    </section>
  );
}
