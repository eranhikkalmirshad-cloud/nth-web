// components/ui/Preloader.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (sessionStorage.getItem("nilambur-preloaded") === "true") {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
      sessionStorage.setItem("nilambur-preloaded", "true");
    }, 1400);

    return () => clearTimeout(timer);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              if (sessionStorage.getItem("nilambur-preloaded") === "true") {
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
            className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white"
            initial={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 0.6, ease: "easeInOut" },
            }}
          >
            <div className="flex flex-col items-center justify-center text-center space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 relative rounded-full overflow-hidden"
              >
                <img
                  src={SITE_CONFIG.logo}
                  alt={SITE_CONFIG.name}
                  className="w-full h-full object-contain"
                />
              </motion.div>

              <div className="space-y-1">
                <span className="block font-serif text-xl font-bold tracking-tight text-[#141414]">
                  Nilambur Teak
                </span>
                <span className="block text-[9px] font-sans font-semibold tracking-[0.25em] uppercase text-[#7A4E2D]">
                  Heritage Woodcraft
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}