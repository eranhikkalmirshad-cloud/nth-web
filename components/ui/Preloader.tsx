// components/ui/Preloader.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user already saw intro in this session
    if (sessionStorage.getItem("nilambur-intro-seen") === "true") {
      setIsLoading(false);
      return;
    }

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("nilambur-intro-seen", "true");
    }, 2100);

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              if (sessionStorage.getItem("nilambur-intro-seen") === "true") {
                document.documentElement.classList.add('hide-preloader');
              }
            } catch (e) {}
          `,
        }}
      />
      <style
        dangerouslySetInnerHTML={{
          __html: `
            html.hide-preloader #global-preloader {
              display: none !important;
              opacity: 0 !important;
              pointer-events: none !important;
              visibility: hidden !important;
            }
          `,
        }}
      />
      <AnimatePresence mode="wait">
        {isLoading && (
          <motion.div
            id="global-preloader"
            key="preloader-overlay"
            className="fixed inset-0 w-screen h-[100dvh] z-[99999] flex flex-col items-center justify-center bg-white text-[#141414] select-none touch-none overflow-hidden"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.6, ease: [0.65, 0, 0.35, 1] },
            }}
          >
            <div className="relative z-10 flex flex-col items-center justify-center text-center px-6 max-w-sm sm:max-w-md mx-auto">
              
              {/* ── Logo (Responsive scaling for Mobile & Desktop) ── */}
              <motion.div
                initial={{ opacity: 0, scale: 0.85, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-16 h-16 sm:w-22 sm:h-22 mb-4 sm:mb-5 shrink-0"
              >
                <Image
                  src="/images/logo-proper.png"
                  alt={SITE_CONFIG.name}
                  fill
                  priority
                  className="object-contain"
                />
              </motion.div>

              {/* ── Brand Title & Tagline ── */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-1 sm:space-y-1.5"
              >
                <h1 className="font-cinzel text-sm sm:text-lg md:text-xl font-bold tracking-[0.14em] uppercase text-[#141414] whitespace-nowrap">
                  NILAMBUR TEAK HERITAGE
                  <span className="text-[10px] sm:text-xs text-[#8A572A] font-normal align-top ml-0.5">™</span>
                </h1>
                
                <p className="text-[9px] sm:text-[11px] font-sans font-medium tracking-[0.22em] uppercase text-[#777777]">
                  Interior & Furniture Manufacturing
                </p>
              </motion.div>

              {/* ── Warm Teak Gold Hairline ── */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.6, delay: 0.7, ease: "easeOut" }}
                className="w-16 sm:w-24 h-[1.5px] bg-[#8A572A] my-3.5 sm:my-5 rounded-full"
              />

              {/* ── Heritage Location Subtext ── */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.75 }}
                transition={{ duration: 0.5, delay: 0.95 }}
                className="text-[8px] sm:text-[10px] font-sans font-semibold tracking-[0.25em] uppercase text-slate-400"
              >
                100% Genuine Solid Teak • Nilambur
              </motion.p>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}