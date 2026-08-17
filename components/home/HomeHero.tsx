// components/home/HomeHero.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { HeroSlide, HomepageSection } from "@/lib/types";

interface HomeHeroProps {
  slides?: HeroSlide[];
  heroSection?: HomepageSection | null;
  videoUrl?: string;
  posterUrl?: string;
  eyebrow?: string;
  title?: string;
  description?: string;
}

export default function HomeHero({
  slides = [],
  heroSection = null,
  videoUrl = "/video/hero-video.mp4",
  posterUrl = "/video/hero-video-poster.jpg",
  eyebrow = "Experience the Pinnacle of Comfort",
  title = "Comfort, Refined",
  description = "Discover premium handcrafted teak furniture crafted with care, character and timeless design.",
}: HomeHeroProps) {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  // Check if hero is configured as "video" only or "image_carousel"
  const isVideoMode = heroSection?.mobile_image_url === "video" || (!heroSection && slides.length <= 1);
  const isCarouselMode = !isVideoMode;

  // Active slide if carousel mode
  const activeSlide = slides.length > 0 ? slides[currentSlideIndex] : null;

  const currentVideo = isVideoMode ? (heroSection?.video_url || videoUrl) : null;
  const currentPoster = isVideoMode 
    ? (heroSection?.image_url || posterUrl)
    : (activeSlide?.image_url || heroSection?.image_url || posterUrl);
    
  const currentEyebrow = isVideoMode
    ? (heroSection?.subtitle || eyebrow)
    : (activeSlide?.eyebrow || heroSection?.subtitle || eyebrow);
    
  const currentHeading = isVideoMode
    ? (heroSection?.title || title)
    : (activeSlide?.heading || heroSection?.title || title);
    
  const currentDescription = isVideoMode
    ? (heroSection?.description || description)
    : (activeSlide?.description || heroSection?.description || description);

  const exploreUrl = heroSection?.cta_url || "/products";
  const exploreText = heroSection?.cta_text || "Explore Now";

  // Auto-advance if Image Carousel mode is active with multiple slides
  useEffect(() => {
    if (!isCarouselMode || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlideIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, [isCarouselMode, slides.length]);

  return (
    <section className="bg-white pt-2 sm:pt-3 pb-8 sm:pb-16 px-3 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* ── Inset Rounded Hero Card ── */}
        <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] rounded-[24px] sm:rounded-[32px] overflow-hidden bg-[#1A1816] shadow-sm">
          
          {/* Background Layer: Video Mode OR Image Carousel Mode */}
          <div className="absolute inset-0 w-full h-full">
            {isVideoMode && currentVideo ? (
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentPoster}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={currentPoster}
                    alt={currentHeading}
                    fill
                    priority
                    sizes="(max-width: 1280px) 100vw, 1280px"
                    className="object-cover object-center"
                  />
                </motion.div>
              </AnimatePresence>
            )}
          </div>

          {/* Deep High-Contrast Overlay Gradient For Ultra-Crisp Mobile & Desktop Text Visibility */}
          <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/30 sm:bg-gradient-to-r sm:from-black/90 sm:via-black/65 sm:to-black/10 sm:w-3/4 z-10 pointer-events-none" />

          {/* Text Content Aligned Left with Generous Mobile Touch Space */}
          <div className="relative z-20 h-full flex flex-col justify-center px-6 sm:px-12 lg:px-16 max-w-xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={isCarouselMode ? (activeSlide?.id || currentSlideIndex) : "video-hero"}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-3.5 sm:space-y-5 text-left"
              >
                {/* Eyebrow in Radiant Gold */}
                <div className="inline-flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E]" />
                  <span className="text-[10px] sm:text-xs font-bold tracking-[0.22em] uppercase text-[#E5B56E] font-sans drop-shadow-md">
                    {currentEyebrow}
                  </span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-bold !text-white leading-[1.12] tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]">
                  {currentHeading}
                </h1>

                {/* Description Body */}
                <p className="text-xs sm:text-sm md:text-base text-white/95 font-normal leading-relaxed max-w-md drop-shadow-[0_2px_8px_rgba(0,0,0,0.85)]">
                  {currentDescription}
                </p>

                {/* Dual High-Contrast Buttons */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href={exploreUrl}
                    className="inline-flex items-center justify-center bg-[#8A572A] hover:bg-[#6E3F18] text-white text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase px-6 sm:px-7 py-3 sm:py-3.5 rounded-full transition-all shadow-[0_4px_16px_rgba(0,0,0,0.4)] active:scale-95 border border-[#B37B47]/60"
                  >
                    {exploreText}
                  </Link>

                  <Link
                    href="/contact"
                    className="inline-flex items-center justify-center bg-black/45 hover:bg-white hover:text-[#111111] text-white border border-white/80 text-[11px] sm:text-xs font-bold tracking-[0.14em] uppercase px-6 sm:px-7 py-3 sm:py-3.5 rounded-full backdrop-blur-md transition-all shadow-[0_4px_16px_rgba(0,0,0,0.3)] active:scale-95"
                  >
                    Contact Us
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Carousel Dots (Active when in Image Carousel mode with multiple slides) */}
          {isCarouselMode && slides.length > 1 && (
            <div className="absolute bottom-5 sm:bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`transition-all cursor-pointer ${
                    idx === currentSlideIndex
                      ? "w-6 h-1.5 rounded-full bg-[#E5B56E]"
                      : "w-2 h-2 rounded-full bg-white/50 hover:bg-white"
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>
          )}

        </div>
      </div>
    </section>
  );
}
