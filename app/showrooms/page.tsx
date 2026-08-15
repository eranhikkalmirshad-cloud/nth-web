// app/showrooms/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInView from "@/components/ui/FadeInView";
import { MapPin, Phone, MessageCircle, Navigation, ArrowRight } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function ShowroomsPage() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-container">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="eyebrow text-[#7A4E2D]">In-Person Experience</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141414] leading-tight">
            Our Nilambur Showroom
          </h1>
          <p className="text-base text-[#555555] font-light leading-relaxed">
            Step into the heart of Kerala’s teak woodcraft. Inspect living room suites, solid dining tables, and hand-carved heritage doors.
          </p>
        </div>

        {/* Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center max-w-6xl mx-auto">
          {/* Image */}
          <div className="lg:col-span-6">
            <FadeInView direction="right">
              <div className="relative aspect-[4/3] w-full rounded-xs overflow-hidden bg-[#F5F5F3] shadow-sm">
                <Image
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop"
                  alt="Nilambur Teak Heritage Experience Center"
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
            </FadeInView>
          </div>

          {/* Details */}
          <div className="lg:col-span-6 space-y-6">
            <FadeInView direction="left">
              <span className="eyebrow text-[#7A4E2D]">Nilambur Headquarters</span>

              <h2 className="text-2xl md:text-3xl font-serif font-bold text-[#141414]">
                Flagship Studio & Woodcraft Atelier
              </h2>

              <p className="text-sm md:text-base text-[#555555] font-light leading-relaxed">
                Welcome to our Nilambur studio. Here, you can examine wood seasoning, feel natural oil finishes, and work alongside our master carpenters to draft bespoke designs for your home.
              </p>

              <div className="space-y-3 py-4 border-y border-[#EBEBEA] text-sm text-[#444444]">
                <p>📍 <strong>Address:</strong> {SITE_CONFIG.contact.address.full}</p>
                <p>🕒 <strong>Hours:</strong> {SITE_CONFIG.contact.hours.weekdays} • {SITE_CONFIG.contact.hours.sunday}</p>
                <p>🚚 <strong>Transit:</strong> Doorstep white-glove delivery across all Indian cities.</p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
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
                  <span>WhatsApp Appointment</span>
                </a>
              </div>
            </FadeInView>
          </div>
        </div>

      </div>
    </main>
  );
}
