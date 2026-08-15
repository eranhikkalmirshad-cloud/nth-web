// components/home/HomeHero.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSlide } from "@/lib/types";

interface HomeHeroProps {
  slides?: HeroSlide[];
  videoUrl?: string;
  posterUrl?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function HomeHero({
  slides = [],
  videoUrl = "/video/hero-video.mp4",
  posterUrl = "/video/hero-video-poster.jpg",
  eyebrow = "Experience the Pinnacle of Comfort",
  title = "Comfort, Refined",
  description = "Discover premium handcrafted teak furniture crafted with care, character and timeless design.",
}: HomeHeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // If dynamic slides are provided, use them
  const activeSlide = slides.length > 0 ? slides[currentSlideIndex] : null;

  const currentVideo = activeSlide?.video_url || videoUrl;
  const currentPoster = activeSlide?.image_url || posterUrl;
  const currentEyebrow = activeSlide?.eyebrow || eyebrow;
  const currentHeading = activeSlide?.heading || title;
  const currentDescription = activeSlide?.description || description;

  // Auto-advance if multiple slides configured
  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 7000);
    return () => clearInterval(interval);
  }, [slides.length]);

  return (
    <section className="bg-white pt-2 sm:pt-3 pb-10 sm:pb-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Inset Rounded Hero Card ── */}
        <div className="relative w-full h-[460px] sm:h-[540px] lg:h-[600px] rounded-[20px] sm:rounded-[32px] overflow-hidden bg-[#1A1816] shadow-sm">
          
          {/* Background Video / Image Layer */}
          <div className="absolute inset-0 w-full h-full">
            {currentVideo ? (
              <video
                key={currentVideo}
                autoPlay
                loop
                muted
                playsInline
                preload="metadata"
                poster={currentPoster}
                className="w-full h-full object-cover object-center"
              >
                <source src={currentVideo} type="video/mp4" />
                {/* Fallback Image */}
                <Image
                  src={currentPoster}
                  alt={currentHeading}
                  fill
                  priority
                  sizes="(max-width: 1280px) 100vw, 1280px"
                  className="object-cover object-center"
                />
              </video>
            ) : (
              <Image
                src={currentPoster}
                alt={currentHeading}
                fill
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
                className="object-cover object-center"
              />
            )}
          </div>

          {/* Deep Contrast Overlay Gradient for Guaranteed Text Legibility */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/25 sm:to-transparent w-full sm:w-3/4 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-black/15 z-10 pointer-events-none" />

          {/* Text Content Aligned Left */}
          <div className="relative z-20 h-full flex flex-col justify-center px-5 sm:px-12 lg:px-16 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeSlide?.id || "default-hero"}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.6 }}
                className="space-y-3.5 sm:space-y-5 text-left"
              >
                <span className="inline-block text-[9px] sm:text-[11px] font-bold tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white/95 font-sans drop-shadow-sm">
                  {currentEyebrow}
                </span>

                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold !text-white leading-[1.1] tracking-tight drop-shadow-md">
                  {currentHeading}
                </h1>

                <p className="text-xs sm:text-sm md:text-base text-white/90 font-light leading-relaxed max-w-md drop-shadow-xs">
                  {currentDescription}
                </p>

                {/* Dual Pill Buttons */}
                <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 pt-2">
                  <Link
                    href="/products"
                    className="inline-flex items-center justify-center bg-[#111111] hover:bg-[#8B5E3C] text-white text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-all shadow-md"
                  >
                    Explore Now
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-white/15 hover:bg-white hover:text-[#111111] text-white border border-white/60 text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase px-5 sm:px-7 py-2.5 sm:py-3 rounded-full backdrop-blur-xs transition-all shadow-md"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Dots (Active if multiple slides) */}
          <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
            {slides.length > 1 ? (
              slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`transition-all ${
                    idx === currentSlideIndex
                      ? "w-5 sm:w-6 h-1 rounded-full bg-white"
                      : "w-1.5 h-1.5 rounded-full bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))
            ) : (
              <>
                <span className="w-5 sm:w-6 h-1 rounded-full bg-white transition-all" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 transition-all" />
                <span className="w-1.5 h-1.5 rounded-full bg-white/50 transition-all" />
              </>
            )}
          </div>

        </div>
      </div>
    </section>
  );
}
