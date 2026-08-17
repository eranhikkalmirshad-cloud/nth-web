// components/home/InstagramSection.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Instagram } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";
import { InstagramPost } from "@/lib/types";
import { getInstagramPosts } from "@/lib/api/instagram";

interface InstagramSectionProps {
  initialPosts?: InstagramPost[];
}

export default function InstagramSection({ initialPosts = [] }: InstagramSectionProps) {
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts);

  useEffect(() => {
    if (posts.length === 0) {
      getInstagramPosts().then((data) => {
        if (data && data.length > 0) {
          setPosts(data);
        }
      });
    }
  }, [posts.length]);

  const activePosts = posts.length > 0 ? posts : [
    { id: "1", image_url: "/images/og-datas/IMG_0600.PNG", caption: "Bespoke Nilambur Teak Living Suite." },
    { id: "2", image_url: "/images/og-datas/IMG_0628.PNG", caption: "Handcrafted 8-Seater Teak Dining Table." },
    { id: "3", image_url: "/images/og-datas/IMG_0638.PNG", caption: "Royal Heritage Teak King Bedstead." },
    { id: "4", image_url: "/images/og-datas/IMG_0432.PNG", caption: "Signature Carved Teak Lounge Sofa." },
    { id: "5", image_url: "/images/og-datas/IMG_0452.PNG", caption: "Solid Nilambur Teak Easy Chair." },
    { id: "6", image_url: "/images/heritage-artisan.jpg", caption: "Master Craftsmen Precision Joinery." },
  ];

  // Quadruple for smooth endless loop
  const marqueeItems = [...activePosts, ...activePosts, ...activePosts, ...activePosts];

  return (
    <section className="py-16 sm:py-24 bg-white overflow-hidden border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-10 sm:mb-14">
        
        {/* Eyebrow & Heading */}
        <FadeInView>
          <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block mb-2 font-sans">
            SOCIAL FEED
          </span>

          <h2 className="text-2xl sm:text-4xl md:text-5xl font-serif font-bold text-[#111111] tracking-tight mb-2">
            We&apos;re on{" "}
            <span className="text-[#8A572A] italic font-serif font-normal ml-1">
              Instagram
            </span>
          </h2>

          <a
            href={SITE_CONFIG.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-bold text-[#8A572A] hover:text-[#111111] hover:underline tracking-wider uppercase inline-flex items-center gap-1.5 transition-colors font-sans"
          >
            <Instagram size={14} />
            <span>@nilambur_teak_heritage</span>
          </a>
        </FadeInView>
      </div>

      {/* ── SMOOTH CONTINUOUS AUTO-SCROLLING TICKER (NO BUTTONS) ── */}
      <div className="relative w-full overflow-hidden py-4 group">
        
        {/* Subtle Fade Edges */}
        <div className="absolute left-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-12 sm:w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        {/* Endless Running Track */}
        <div className="flex w-max animate-instagram-scroll hover:[animation-play-state:paused] cursor-grab active:cursor-grabbing">
          {marqueeItems.map((post, idx) => (
            <div 
              key={`${post.id || idx}-${idx}`}
              className="w-[240px] sm:w-[280px] shrink-0 px-2.5 sm:px-3.5"
            >
              <a
                href={(post as any).post_url || SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white rounded-2xl p-3 sm:p-3.5 border border-slate-200 shadow-xs block group/card hover:shadow-xl hover:border-[#8A572A]/40 transition-all duration-300 transform hover:-translate-y-1 text-left"
              >
                {/* Header */}
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <div className="flex items-center gap-1.5 min-w-0">
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
                  <div className="text-[#8A572A] opacity-70 group-hover/card:opacity-100 transition-opacity">
                    <Instagram size={13} />
                  </div>
                </div>

                {/* Photo Stage */}
                <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 mb-2.5 border border-slate-100">
                  <Image
                    src={post.image_url || "/images/og-datas/IMG_0600.PNG"}
                    alt={post.caption || "Nilambur Teak Woodcraft"}
                    fill
                    sizes="(max-width: 640px) 240px, 280px"
                    className="object-cover transition-transform duration-700 ease-out group-hover/card:scale-105"
                  />
                </div>

                {/* Caption */}
                {post.caption && (
                  <p className="text-[11px] text-slate-600 font-normal line-clamp-2 leading-relaxed px-0.5 font-sans">
                    {post.caption}
                  </p>
                )}
              </a>
            </div>
          ))}
        </div>

      </div>

      {/* Embedded Smooth Marquee Keyframe */}
      <style jsx global>{`
        @keyframes instagramScroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-instagram-scroll {
          animation: instagramScroll 40s linear infinite;
        }
        .animate-instagram-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
