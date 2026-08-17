// components/home/HowItWorksSection.tsx
"use client";

import { MessageSquare, PenTool, Wrench, Truck } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";

const steps = [
  {
    num: "01",
    title: "Crafting Your Vision",
    desc: "Our designers sit with you to understand your space, lifestyle, and aesthetic — translating ideas into detailed blueprints.",
    icon: MessageSquare,
  },
  {
    num: "02",
    title: "Only the Finest Materials",
    desc: "Mature solid Nilambur teak timber, precision hardware, and handpicked wood stock seasoned for generational durability.",
    icon: PenTool,
  },
  {
    num: "03",
    title: "Built by Master Hands",
    desc: "Each piece is hand-cut, joined with traditional mortise-and-tenon craftsmanship, and finished by Kerala master artisans.",
    icon: Wrench,
  },
  {
    num: "04",
    title: "Delivered with Care",
    desc: "We deliver, install, and position every piece personally — your satisfaction is the final signature on every project.",
    icon: Truck,
  },
];

export default function HowItWorksSection() {
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Eyebrow & Heading */}
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-16">
          <FadeInView>
            <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block mb-2 font-sans">
              OUR PROCESS
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-sans font-extrabold text-[#111111] tracking-tight mb-2 sm:mb-3">
              How It{" "}
              <span className="text-[#8A572A] italic font-sans font-extrabold ml-1">
                Works
              </span>
            </h2>

            <p className="text-xs sm:text-sm text-slate-500 font-normal max-w-xl mx-auto leading-relaxed px-2">
              From timber selection to white-glove doorstep delivery, experience seamless heirloom luxury.
            </p>
          </FadeInView>
        </div>

        {/* ── MOBILE VIEW: VERTICAL CONNECTED TIMELINE (Exact match to reference design) ── */}
        <div className="md:hidden max-w-md mx-auto px-2">
          <div className="space-y-0">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              const isLast = idx === steps.length - 1;

              return (
                <FadeInView key={step.num} delay={idx * 0.08}>
                  <div className="relative flex items-start gap-4 sm:gap-5 pb-8 sm:pb-10 group">
                    {/* Vertical Connecting Line */}
                    {!isLast && (
                      <div className="absolute left-[23px] top-[48px] bottom-0 w-[1.5px] bg-[#8A572A]/40" />
                    )}

                    {/* Timeline Node Icon */}
                    <div className="relative z-10 w-12 h-12 rounded-full bg-white border-2 border-[#8A572A] flex items-center justify-center text-[#8A572A] shrink-0 shadow-xs">
                      <Icon size={19} strokeWidth={1.75} />
                    </div>

                    {/* Step Content */}
                    <div className="flex-1 pt-0.5 text-left">
                      <span className="text-[11px] font-bold text-[#8A572A] tracking-[0.18em] uppercase font-mono block">
                        {step.num}
                      </span>
                      <h3 className="text-base font-bold font-sans text-slate-900 mt-0.5 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-xs text-slate-600 font-normal leading-relaxed mt-1.5 pr-2">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </FadeInView>
              );
            })}
          </div>
        </div>

        {/* ── DESKTOP VIEW: 4-COLUMN HORIZONTAL GRID (Preserved exact desktop layout) ── */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8 max-w-6xl mx-auto text-center">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <FadeInView key={step.num} delay={idx * 0.08}>
                <div className="bg-white rounded-3xl p-6 lg:p-7 border border-slate-200/80 shadow-xs text-center flex flex-col items-center justify-between h-full group hover:shadow-xl hover:border-[#8A572A]/40 transition-all duration-300">
                  {/* Step Number + Dot */}
                  <div className="flex items-center gap-1.5 mb-4">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#8A572A]" />
                    <span className="text-xs font-bold text-[#8A572A] tracking-wider uppercase font-mono">
                      {step.num}
                    </span>
                  </div>

                  {/* Icon Circle */}
                  <div className="w-13 h-13 rounded-full bg-[#FAF5EE] border border-[#E8DCCB] flex items-center justify-center text-[#8A572A] mb-5 group-hover:bg-[#8A572A] group-hover:text-white transition-colors shadow-2xs">
                    <Icon size={20} strokeWidth={1.75} />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2">
                    <h3 className="text-base font-bold font-sans text-slate-900 group-hover:text-[#8A572A] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-slate-500 font-normal leading-relaxed">
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
