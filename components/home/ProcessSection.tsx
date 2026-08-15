// components/home/ProcessSection.tsx
"use client";

import { Compass, Sparkles, Hammer, Truck } from "lucide-react";
import { motion } from "framer-motion";

const STEPS = [
  {
    step: "01",
    icon: Compass,
    title: "Choose Design",
    desc: "Browse our heritage collections or submit your architectural dimensions and custom ideas.",
  },
  {
    step: "02",
    icon: Sparkles,
    title: "Select Wood",
    desc: "We handpick seasoned Nilambur teak logs with government certification and optimal grain density.",
  },
  {
    step: "03",
    icon: Hammer,
    title: "Master Crafting",
    desc: "Artisans shape, join, and multi-coat lacquer your piece using time-tested Kerala woodworking techniques.",
  },
  {
    step: "04",
    icon: Truck,
    title: "Delivered to You",
    desc: "Insured transit and white-glove doorstep assembly anywhere across India for an heirloom placement.",
  },
];

export default function ProcessSection() {
  return (
    <section id="process" className="py-24 md:py-32 bg-[#FDFAF5] relative overflow-hidden">
      <div className="max-container px-4 md:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
          <span className="heading-label">The Art of Woodcraft</span>
          <h2 className="text-3xl md:text-5xl font-bold text-[#2C1810] font-playfair">
            How We Create Your Dream Furniture
          </h2>
          <p className="text-sm md:text-base text-[#6B4226] font-lato max-w-xl mx-auto">
            From mature Nilambur forests into a treasured heirloom in your home.
          </p>
          <div className="w-16 h-0.5 bg-[#C9922A] mx-auto mt-4" />
        </div>

        {/* 4-Step Horizontal Timeline Grid */}
        <div className="relative">
          {/* Gold Connection Line on Desktop */}
          <div className="hidden lg:block absolute top-1/3 left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-[#C9922A] via-[#E8B84B] to-[#C9922A] z-0 -translate-y-1/2 opacity-60" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 relative z-10">
            {STEPS.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.15 }}
                  className="flex flex-col items-center text-center group"
                >
                  {/* Numbered Gold Circle with Icon */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-[#FDFAF5] border-2 border-[#C9922A] flex items-center justify-center text-[#C9922A] group-hover:bg-[#C9922A] group-hover:text-[#2C1810] transition-all duration-300 shadow-[0_8px_20px_rgba(201,146,42,0.2)]">
                      <Icon size={30} />
                    </div>

                    {/* Step Number Tag */}
                    <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-[#3D1F0D] text-[#E8B84B] text-xs font-bold font-lato flex items-center justify-center border border-[#C9922A]">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#2C1810] group-hover:text-[#8B5E3C] transition-colors font-playfair mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs md:text-sm text-[#6B4226] leading-relaxed font-lato max-w-xs">
                    {item.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
