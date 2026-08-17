// app/showrooms/page.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import FadeInView from "@/components/ui/FadeInView";
import { MapPin, Phone, MessageCircle, Navigation, Clock, ShieldCheck, Truck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function ShowroomsPage() {
  return (
    <main className="min-h-screen bg-[#FCFAF8] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            IN-PERSON EXPERIENCE & ATELIER
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-[#111111] leading-tight">
            Our Showroom &{" "}
            <span className="text-[#8A572A] italic font-sans font-extrabold ml-1">
              Woodcraft Studio
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Step into the heart of Kerala’s teak woodcraft. Inspect living room suites, solid dining tables, and hand-carved heritage doors.
          </p>
        </div>

        {/* Split Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center max-w-6xl mx-auto mb-16">
          {/* Image */}
          <div className="lg:col-span-6">
            <FadeInView direction="right">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-slate-100 shadow-md border border-slate-200">
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
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] block mb-1">
                MALAPPURAM DISTRICT, KERALA
              </span>

              <h2 className="text-2xl md:text-3xl font-bold font-sans text-slate-900">
                NILAMBUR TEAK HERITAGE
              </h2>
              <p className="text-xs font-bold uppercase tracking-wider text-slate-500">
                DEALERS IN: WOODEN FURNITURE & BUILDING MATERIALS
              </p>

              <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-2">
                Welcome to our Nilambur studio. Here, you can examine wood seasoning, feel natural grain finishes, and work alongside our master craftsmen to draft bespoke designs for your home.
              </p>

              <div className="space-y-3 py-4 border-y border-slate-200 text-xs sm:text-sm text-slate-700">
                <p className="flex items-start gap-2.5">
                  <MapPin size={16} className="text-[#8A572A] shrink-0 mt-0.5" />
                  <span><strong>Address:</strong> Koolikkal, Mampad P.O., Malappuram Dist., Kerala - 676542</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Clock size={16} className="text-[#8A572A] shrink-0 mt-0.5" />
                  <span><strong>Hours:</strong> {SITE_CONFIG.contact.hours.weekdays}</span>
                </p>
                <p className="flex items-start gap-2.5">
                  <Truck size={16} className="text-[#8A572A] shrink-0 mt-0.5" />
                  <span><strong>Transit:</strong> Doorstep insured white-glove delivery across all Indian cities.</span>
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="inline-flex items-center gap-2 bg-[#8A572A] hover:bg-[#1C130D] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <Phone size={15} />
                  <span>Call {SITE_CONFIG.contact.phoneDisplay}</span>
                </a>

                <a
                  href={SITE_CONFIG.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Appointment</span>
                </a>
              </div>
            </FadeInView>
          </div>
        </div>

        {/* Live Interactive Map Preview Card */}
        <div className="max-w-6xl mx-auto bg-white p-6 sm:p-8 rounded-3xl border border-slate-200 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] block mb-0.5">
                LIVE LOCATION PREVIEW
              </span>
              <h3 className="text-lg sm:text-xl font-bold font-sans text-slate-900">
                Koolikkal, Mampad P.O., Malappuram, Kerala
              </h3>
            </div>
            <a
              href={SITE_CONFIG.contact.address.googleMapsDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-slate-900 hover:bg-[#8A572A] text-white text-xs font-bold uppercase tracking-wider px-5 py-3 rounded-xl transition-all shadow-sm active:scale-95 self-start sm:self-auto"
            >
              <Navigation size={14} />
              <span>Get Driving Directions</span>
            </a>
          </div>

          <div className="rounded-2xl overflow-hidden border border-slate-200 aspect-[16/9] sm:aspect-[21/9] relative w-full">
            <iframe
              title="Nilambur Teak Heritage Showroom Map"
              src={SITE_CONFIG.contact.address.googleMapsEmbedUrl}
              className="w-full h-full border-0"
              loading="lazy"
              allowFullScreen
            ></iframe>
          </div>
        </div>

      </div>
    </main>
  );
}
