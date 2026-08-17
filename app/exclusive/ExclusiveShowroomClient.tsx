"use client";

import { Product } from "@/lib/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Lock, TreeDeciduous } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface ExclusiveShowroomClientProps {
  products: Product[];
}

export default function ExclusiveShowroomClient({ products }: ExclusiveShowroomClientProps) {
  return (
    <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
      {/* ── HERO ── */}
      <div className="mb-20 text-center max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#3D1F0D] border border-[#C9922A]/40 text-[#E8B84B] text-xs font-bold uppercase tracking-[0.2em] mb-4">
            <TreeDeciduous size={14} />
            <span>Master Craftsman Atelier</span>
          </div>
          <h1 className="font-cinzel text-4xl md:text-6xl font-bold mb-6 tracking-tight text-[#E8B84B]">
            Private Royal Commissions
          </h1>
          <p className="text-[#EAD5B0] text-base md:text-lg font-light leading-relaxed mb-8 font-lato">
            Welcome to {SITE_CONFIG.name}'s private sanctuary. Featuring bespoke teak creations and limited-run architectural woodwork reserved for private clients.
          </p>
          <div className="h-px w-20 bg-[#C9922A] mx-auto" />
        </motion.div>
      </div>

      {/* ── PRODUCT GRID ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="group bg-[#3D1F0D] p-4 rounded-xl border border-[#D4A96A]/20 hover:border-[#C9922A] transition-colors"
          >
            <Link href={`/exclusive/${product.access_token}`} className="block space-y-4">
              <div className="aspect-[4/3] bg-[#2C1810] rounded-lg overflow-hidden relative border border-[#D4A96A]/20">
                {product.images?.[0] ? (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-[#D4A96A]/40">
                    <Lock size={40} strokeWidth={1} />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold font-playfair text-[#F5ECD7] group-hover:text-[#E8B84B] transition-colors">
                    {product.name}
                  </h3>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#E8B84B] bg-[#2A2018] px-2.5 py-1 rounded-md border border-[#E8B84B]/30">VIP Private Access</span>
                </div>
                <p className="text-[#EAD5B0]/70 text-xs line-clamp-2 leading-relaxed font-lato">
                  {product.description || "A masterfully crafted piece for the luxury estate, available only through private invitation."}
                </p>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C9922A] pt-2">
                  <span>View Private Preview</span>
                  <ArrowRight size={14} />
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      {products.length === 0 && (
        <div className="py-32 text-center border border-dashed border-[#D4A96A]/30 rounded-2xl">
          <Lock className="mx-auto text-[#C9922A] mb-4" size={48} strokeWidth={1} />
          <p className="text-[#E8B84B] uppercase tracking-[0.2em] text-xs font-bold font-cinzel">The private atelier is currently being curated.</p>
          <p className="text-[#EAD5B0]/70 text-xs mt-2 font-lato">Please contact our Nilambur master craftsman for private commissions.</p>
        </div>
      )}
    </div>
  );
}
