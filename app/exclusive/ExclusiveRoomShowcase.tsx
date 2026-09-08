"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const ROOM_SHOWCASE = [
  {
    room: "Living Room",
    title: "Royal Malabar Teak Sofa",
    description: "Handcrafted 3+1+1 solid Nilambur teak sofa set with brass detailing.",
    image: "/images/image copy 3.png",
    href: "/rooms/living-room",
  },
  {
    room: "Dining",
    title: "Imperial Nilambur Dining Table",
    description: "Massive solid teak plank dining table with ergonomic high-back teak chairs.",
    image: "/images/image.png",
    href: "/rooms/dining-room",
  },
  {
    room: "Bedroom",
    title: "Master Bedroom Teak Suite",
    description: "Complete bedroom sets with king-size cots, wardrobes, and bedside units.",
    image: "/images/image copy.png",
    href: "/rooms/bedroom",
  },
  {
    room: "Study and Office",
    title: "Executive Office Teak Collection",
    description: "Executive solid teak writing desks, office tables, and library units.",
    image: "/images/study-and-office.png",
    href: "/rooms/office",
  },
];

export default function ExclusiveRoomShowcase() {
  return (
    <>
      {/* Header */}
      <div className="flex items-end justify-between mb-8">
        <div>
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block mb-1">
            EXPLORE MORE
          </span>
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-slate-900">
            Complementary Teak Pieces
          </h2>
        </div>
        <Link
          href="/products"
          className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-[#8A572A] transition-colors"
        >
          <span>View All</span>
          <ArrowRight size={13} />
        </Link>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {ROOM_SHOWCASE.map((item, i) => (
          <motion.div
            key={item.room}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
          >
            <Link href={item.href} className="block h-full group no-underline">
              <article className="bg-white border border-[#EAE6DF] rounded-2xl sm:rounded-3xl overflow-hidden flex flex-col h-full shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_36px_rgba(138,87,42,0.12)] hover:border-[#8A572A]/40 transition-all duration-500">
                {/* Image */}
                <div className="relative w-full aspect-[4/3] bg-[#FAF8F5] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                </div>

                {/* Details */}
                <div className="flex flex-col flex-1 justify-between p-4 sm:p-5 md:p-6">
                  <div>
                    <span className="text-[10px] sm:text-[11px] font-sans font-bold tracking-[0.15em] uppercase text-[#8A572A] block mb-1.5 leading-normal">
                      {item.room}
                    </span>
                    <h3 className="font-serif text-base sm:text-lg md:text-xl font-bold text-[#141414] group-hover:text-[#8A572A] transition-colors duration-300 line-clamp-1 mb-1.5 leading-snug">
                      {item.title}
                    </h3>
                    <p className="text-[#666666] text-xs font-light line-clamp-2 leading-relaxed hidden sm:block mb-3">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-2 sm:pt-3 border-t border-[#F0F0EE] flex items-center justify-between mt-auto">
                    <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 tracking-wide">
                      Custom Made
                    </span>
                    <span className="inline-flex items-center gap-1 text-[9px] sm:text-[10px] font-bold tracking-wider uppercase text-[#8A572A] group-hover:translate-x-1 transition-transform">
                      <span>View Details</span>
                      <ArrowRight size={11} />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          </motion.div>
        ))}
      </div>
    </>
  );
}
