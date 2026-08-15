// components/home/ShowroomSection.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Phone, MessageCircle, MapPin, ArrowRight } from "lucide-react";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";

export default function ShowroomSection() {
  return (
    <section className="py-20 md:py-28 bg-[#FAFAF9] border-t border-[#EBEBEA]">
      <div className="max-container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Content */}
          <div className="lg:col-span-6 space-y-6">
            <FadeInView direction="right">
              <span className="eyebrow text-[#7A4E2D]">Experience In Person</span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414] leading-[1.18] tracking-tight">
                Visit Our Showroom & Studio in Nilambur.
              </h2>

              <p className="text-base text-[#555555] font-light leading-relaxed">
                Step inside our flagship experience center in the teak capital of Kerala. Touch and feel the natural oils, inspect interlocking joint details, and discuss custom designs directly with our artisans.
              </p>

              <div className="space-y-2 text-sm text-[#444444] pt-2">
                <p className="font-semibold text-[#141414]">
                  📍 {SITE_CONFIG.contact.address.full}
                </p>
                <p className="text-xs text-[#777777]">
                  {SITE_CONFIG.contact.hours.weekdays} • {SITE_CONFIG.contact.hours.sunday}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="btn-primary flex items-center gap-2"
                >
                  <Phone size={15} />
                  <span>Call {SITE_CONFIG.contact.phoneDisplay}</span>
                </a>

                <a
                  href={SITE_CONFIG.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary flex items-center gap-2"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>WhatsApp</span>
                </a>

                <a
                  href="https://maps.google.com/?q=Nilambur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#141414] hover:text-[#7A4E2D] p-2"
                >
                  <MapPin size={15} />
                  <span>Directions</span>
                </a>
              </div>
            </FadeInView>
          </div>

          {/* Large Image */}
          <div className="lg:col-span-6">
            <FadeInView direction="left">
              <div className="relative aspect-[4/3] rounded-xs overflow-hidden bg-[#F5F5F3] shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop"
                  alt="Nilambur Teak Heritage Showroom"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeInView>
          </div>

        </div>
      </div>
    </section>
  );
}
