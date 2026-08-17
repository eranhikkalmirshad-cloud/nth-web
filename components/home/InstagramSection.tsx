// components/home/InstagramSection.tsx
"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { Instagram, ChevronLeft, ChevronRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";
import { InstagramPost } from "@/lib/types";
import { getInstagramPosts } from "@/lib/api/instagram";

interface InstagramSectionProps {
  initialPosts?: InstagramPost[];
}

export default function InstagramSection({ initialPosts = [] }: InstagramSectionProps) {
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (posts.length === 0) {
      getInstagramPosts().then((data) => {
        if (data && data.length > 0) {
          setPosts(data);
        }
      });
    }
  }, [posts.length]);

  // Mobile Auto-Slide Effect (every 3.5s when not paused by user)
  useEffect(() => {
    if (posts.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % Math.min(posts.length, 6));
    }, 3500);

    return () => clearInterval(timer);
  }, [posts.length, isPaused]);

  const activePosts = posts.slice(0, 6);

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (touchStartX.current !== null && touchEndX.current !== null) {
      const diff = touchStartX.current - touchEndX.current;
      if (diff > 50) {
        // Swipe Left -> Next
        setCurrentIndex((prev) => (prev + 1) % activePosts.length);
      } else if (diff < -50) {
        // Swipe Right -> Prev
        setCurrentIndex((prev) => (prev - 1 + activePosts.length) % activePosts.length);
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
    // Resume auto-slide after 5 seconds
    setTimeout(() => setIsPaused(false), 5000);
  };

  return (
    <section className="py-14 sm:py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Eyebrow & Heading */}
        <FadeInView>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block mb-2 font-sans">
            SOCIAL FEED
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-sans font-extrabold text-[#111111] tracking-tight mb-2">
            We're on{" "}
            <span className="text-[#8A572A] italic font-sans font-extrabold ml-1">
              Instagram
            </span>
          </h2>

          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#8A572A] hover:text-[#111111] hover:underline tracking-wider uppercase block mb-8 sm:mb-14 transition-colors font-sans"
          >
            @nilambur_teak_heritage
          </a>
        </FadeInView>

        {/* ── MOBILE VIEW: Smooth Auto-Slide Carousel with Touch-Swipe (Hidden on Desktop) ── */}
        <div 
          className="block sm:hidden relative max-w-sm mx-auto"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div className="overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {activePosts.map((post, idx) => (
                <div key={post.id || idx} className="w-full shrink-0 px-2">
                  <a
                    href={post.post_url || SITE_CONFIG.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white rounded-2xl p-3.5 border border-slate-200 shadow-sm block group text-left"
                  >
                    {/* User Header */}
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full overflow-hidden relative flex-shrink-0 bg-slate-100 border border-slate-200">
                          <Image
                            src="/images/logo-proper.png"
                            alt="Nilambur Teak"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <span className="text-xs font-bold text-slate-800 truncate font-sans">
                          nilambur_teak_heritage
                        </span>
                      </div>
                      <div className="p-1 bg-amber-50 rounded-full text-[#8A572A]">
                        <Instagram size={14} />
                      </div>
                    </div>

                    {/* Photo */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                      <Image
                        src={post.image_url || "/images/og-datas/IMG_0600.PNG"}
                        alt={post.caption || "Nilambur Teak Woodcraft"}
                        fill
                        sizes="90vw"
                        priority={idx === 0}
                        className="object-cover"
                      />
                    </div>

                    {/* Caption */}
                    {post.caption && (
                      <p className="text-xs text-slate-600 font-normal line-clamp-2 leading-relaxed px-0.5">
                        {post.caption}
                      </p>
                    )}
                  </a>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Controls & Indicator Dots */}
          <div className="flex items-center justify-center gap-4 mt-5">
            <button
              type="button"
              onClick={() => {
                setIsPaused(true);
                setCurrentIndex((prev) => (prev - 1 + activePosts.length) % activePosts.length);
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all cursor-pointer"
              aria-label="Previous Post"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {activePosts.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => {
                    setIsPaused(true);
                    setCurrentIndex(i);
                  }}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    currentIndex === i ? "w-6 bg-[#8A572A]" : "w-1.5 bg-slate-300"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                setIsPaused(true);
                setCurrentIndex((prev) => (prev + 1) % activePosts.length);
              }}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-700 active:scale-95 transition-all cursor-pointer"
              aria-label="Next Post"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* ── DESKTOP VIEW: Sleek 5-Item Grid (Hidden on Mobile) ── */}
        <div className="hidden sm:grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 lg:gap-6 max-w-6xl mx-auto">
          {activePosts.slice(0, 5).map((post, idx) => (
            <FadeInView key={post.id || idx} delay={idx * 0.06}>
              <a
                href={post.post_url || SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-2.5 sm:p-3 border border-slate-200 shadow-xs block group hover:shadow-lg hover:border-[#8A572A]/40 transition-all duration-300 transform hover:-translate-y-1 text-left"
              >
                {/* User Header */}
                <div className="flex items-center gap-1.5 sm:gap-2 mb-2 sm:mb-2.5">
                  <div className="w-5 h-5 rounded-full overflow-hidden relative flex-shrink-0 bg-slate-100 border border-slate-200">
                    <Image
                      src="/images/logo-proper.png"
                      alt="Nilambur Teak"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <span className="text-[10px] font-bold text-slate-800 truncate font-sans">
                    nilambur_teak_heritage
                  </span>
                </div>

                {/* Photo */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 mb-2 border border-slate-100">
                  <Image
                    src={post.image_url || "/images/og-datas/IMG_0600.PNG"}
                    alt={post.caption || "Nilambur Teak Woodcraft"}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white backdrop-blur-xs group-hover:bg-[#8A572A] transition-colors">
                    <Instagram size={11} />
                  </div>
                </div>

                {/* Caption / Tag */}
                {post.caption && (
                  <p className="text-[10px] text-slate-500 font-normal line-clamp-1 text-left px-0.5">
                    {post.caption}
                  </p>
                )}
              </a>
            </FadeInView>
          ))}
        </div>

      </div>
    </section>
  );
}
