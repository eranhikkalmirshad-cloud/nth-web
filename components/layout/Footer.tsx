// components/layout/Footer.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  MessageCircle, 
  Phone, 
  Mail, 
  Instagram, 
  Facebook, 
  Youtube, 
  ChevronDown, 
  MapPin, 
  Clock, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (id: string) => {
    setOpenSection(openSection === id ? null : id);
  };

  const footerGroups = [
    {
      id: "collections",
      title: "COLLECTIONS",
      links: [
        { label: "Teak Sofas & Diwans", href: "/products?category=sofas" },
        { label: "Solid Teak Dining Sets", href: "/products?category=dining" },
        { label: "Heirloom Teak Beds", href: "/products?category=beds" },
        { label: "Designer Lounge Chairs", href: "/products?category=chairs" },
        { label: "Carved Teak Doors", href: "/products?category=doors" },
        { label: "Living Room Suites", href: "/products?category=living-room" },
        { label: "Teak Wardrobes & Cabinets", href: "/products?category=wardrobes" },
        { label: "Outdoor & Sitout Furniture", href: "/products?category=outdoor-furniture" },
      ],
    },
    {
      id: "rooms",
      title: "SHOP BY ROOM",
      links: [
        { label: "Living Room", href: "/rooms/living-room" },
        { label: "Dining Room", href: "/rooms/dining-room" },
        { label: "Master Bedroom", href: "/rooms/bedroom" },
        { label: "Executive Office", href: "/rooms/office" },
        { label: "Sitout & Verandah", href: "/rooms/sitout" },
        { label: "All Curated Suites", href: "/rooms/all-pieces" },
      ],
    },
    {
      id: "brand",
      title: "THE BRAND",
      links: [
        { label: "About Nilambur Heritage", href: "/about" },
        { label: "Nilambur Showroom & Studio", href: "/showrooms" },
        { label: "Bespoke Custom Enquiries", href: "/contact" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  return (
    <footer className="bg-[#0F0A06] text-[#D8D2C9] pt-14 sm:pt-20 pb-28 md:pb-12 border-t border-[#251A10] relative overflow-hidden font-sans">
      {/* Subtle Woodgrain Ambient Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-950/20 via-transparent to-black pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ── TOP HERO BRAND BAR ── */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-10 sm:pb-14 border-b border-[#24190F]">
          <div className="flex items-center gap-3.5 sm:gap-4">
            <div className="relative h-13 w-13 sm:h-16 sm:w-16 rounded-2xl overflow-hidden bg-white/95 p-1 shadow-lg shrink-0 border border-amber-500/20">
              <Image
                src="/images/logo-proper.png"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="font-cinzel text-lg sm:text-2xl font-bold tracking-[0.06em] uppercase text-[#E5B56E] leading-tight">
                Nilambur Teak Heritage<span className="text-[10px] sm:text-xs align-top font-sans ml-0.5 font-normal text-[#E5B56E]">™</span>
              </span>
              <span className="text-[9px] sm:text-[11px] font-sans font-bold tracking-[0.2em] uppercase text-amber-200/60 mt-0.5">
                Solid Teak Furniture & Architectural Millwork
              </span>
            </div>
          </div>

          {/* Quick Contact & WhatsApp Pill */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <a
              href={SITE_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-[#25D366] hover:bg-[#1EBE5B] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Us</span>
            </a>

            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="inline-flex items-center gap-2 bg-[#24170E] hover:bg-[#342215] text-[#E5B56E] border border-amber-500/30 px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Phone size={14} />
              <span>{SITE_CONFIG.contact.phoneDisplay}</span>
            </a>
          </div>
        </div>

        {/* ── DESKTOP 4-COLUMN GRID (Visible on md+) ── */}
        <div className="hidden md:grid md:grid-cols-4 gap-8 lg:gap-12 py-12 border-b border-[#24190F] text-xs">
          
          {/* Col 1: Collections */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E]" />
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5B56E] font-sans">
                COLLECTIONS
              </h4>
            </div>
            <ul className="space-y-2.5 text-[#A89E92]">
              {footerGroups[0].links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-white transition-colors block py-0.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 2: Shop By Room */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E]" />
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5B56E] font-sans">
                SHOP BY ROOM
              </h4>
            </div>
            <ul className="space-y-2.5 text-[#A89E92]">
              {footerGroups[1].links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-white transition-colors block py-0.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: The Heritage Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E]" />
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5B56E] font-sans">
                THE BRAND
              </h4>
            </div>
            <ul className="space-y-2.5 text-[#A89E92]">
              {footerGroups[2].links.map((link, i) => (
                <li key={i}>
                  <Link href={link.href} className="hover:text-white transition-colors block py-0.5">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Address & Workshop */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E]" />
              <h4 className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#E5B56E] font-sans">
                OFFICIAL WORKSHOP
              </h4>
            </div>
            <div className="space-y-2.5 text-[#A89E92] leading-relaxed">
              <div>
                <p className="font-bold text-white tracking-wide">NILAMBUR TEAK HERITAGE</p>
                <p className="text-[10px] text-amber-200/60 uppercase tracking-wider mt-0.5">
                  Dealers In: Wooden Furniture & Building Materials
                </p>
                <p className="text-[#C0B7AB] mt-1.5 text-[11px] flex items-start gap-1.5">
                  <MapPin size={14} className="text-[#E5B56E] shrink-0 mt-0.5" />
                  <span>Koolikkal, Mampad P.O., Malappuram Dist., Kerala - 676542</span>
                </p>
              </div>

              <div className="pt-1 space-y-1">
                <p className="text-[11px]">
                  <span className="text-[#E5B56E] font-semibold">Phone:</span>{" "}
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:text-white text-white">
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                </p>
                <p className="text-[11px]">
                  <span className="text-[#E5B56E] font-semibold">Email:</span>{" "}
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white">
                    {SITE_CONFIG.contact.email}
                  </a>
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex items-center gap-3 pt-3">
                <a
                  href={SITE_CONFIG.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#24170E] border border-amber-500/20 flex items-center justify-center text-amber-200/80 hover:text-white hover:border-[#E5B56E] transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram size={15} />
                </a>
                <a
                  href={SITE_CONFIG.social.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#24170E] border border-amber-500/20 flex items-center justify-center text-amber-200/80 hover:text-white hover:border-[#E5B56E] transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook size={15} />
                </a>
                <a
                  href={SITE_CONFIG.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 rounded-lg bg-[#24170E] border border-amber-500/20 flex items-center justify-center text-amber-200/80 hover:text-white hover:border-[#E5B56E] transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube size={15} />
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* ── MOBILE ACCORDION UX (Visible on Mobile) ── */}
        <div className="md:hidden divide-y divide-[#24190F] py-4 border-b border-[#24190F]">
          {footerGroups.map((group) => {
            const isOpen = openSection === group.id;
            return (
              <div key={group.id} className="py-3.5">
                <button
                  type="button"
                  onClick={() => toggleSection(group.id)}
                  className="w-full flex items-center justify-between text-left py-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E]" />
                    <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E5B56E] font-sans">
                      {group.title}
                    </span>
                  </div>
                  <ChevronDown
                    size={16}
                    className={`text-[#E5B56E] transition-transform duration-300 ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.ul
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden space-y-2.5 pt-3 pl-3.5 text-xs text-[#A89E92]"
                    >
                      {group.links.map((link, i) => (
                        <li key={i}>
                          <Link
                            href={link.href}
                            className="block py-1 hover:text-white active:text-[#E5B56E] transition-colors"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {/* Mobile Workshop & Social Strip */}
          <div className="py-5 space-y-3 pl-1">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E]" />
              <span className="text-xs font-bold uppercase tracking-[0.18em] text-[#E5B56E] font-sans">
                WORKSHOP & STUDIO
              </span>
            </div>
            
            <p className="text-xs text-[#C0B7AB] leading-relaxed">
              📍 <span className="font-bold text-white">NILAMBUR TEAK HERITAGE</span>, Koolikkal, Mampad P.O., Malappuram Dist., Kerala - 676542
            </p>

            <div className="flex items-center gap-3 pt-1">
              <a
                href={SITE_CONFIG.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#24170E] border border-amber-500/25 text-xs font-bold text-amber-200/90"
              >
                <Instagram size={14} className="text-[#E5B56E]" />
                <span>Instagram</span>
              </a>

              <a
                href={SITE_CONFIG.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#24170E] border border-amber-500/25 text-xs font-bold text-amber-200/90"
              >
                <Facebook size={14} className="text-[#E5B56E]" />
                <span>Facebook</span>
              </a>
            </div>
          </div>
        </div>

        {/* ── BOTTOM COPYRIGHT & ATTRIBUTION BAR ── */}
        <div className="pt-6 sm:pt-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8C8276] text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.</p>
            <span className="hidden sm:inline text-[#443629]">•</span>
            <p>
              Crafted by{" "}
              <a
                href="https://ekodrix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#E5B56E] hover:text-white font-bold transition-colors underline-offset-2 hover:underline"
              >
                ekodrix
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-[#8C8276]">
            <Link href="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
            <span>•</span>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

      </div>
    </footer>
  );
}