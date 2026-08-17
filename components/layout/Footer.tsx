// components/layout/Footer.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { MessageCircle, Phone, Mail, Instagram, Facebook, Youtube } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-[#CCCCCC] pt-16 pb-10 border-t border-[#1F1F1F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Brand Header */}
        <div className="flex items-center gap-3.5 mb-12">
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-full overflow-hidden bg-white p-0.5 shadow-sm flex-shrink-0">
            <Image
              src="/images/logo-proper.png"
              alt={SITE_CONFIG.name}
              fill
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="font-cinzel text-base sm:text-lg font-bold tracking-[0.08em] uppercase text-[#E0AB76] leading-none">
              Nilambur Teak Heritage<span className="text-[10px] align-top font-sans ml-0.5 font-normal text-[#E0AB76]">™</span>
            </span>
            <span className="text-[8px] font-sans font-medium tracking-[0.15em] uppercase text-[#999999] mt-1">
              Interior & Furniture Manufacturing
            </span>
          </div>
        </div>

        {/* 4-Column Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 pb-14 border-b border-[#222222] text-xs">
          
          {/* Col 1 */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white font-sans">
              Collections
            </h4>
            <ul className="space-y-2 text-[#999999]">
              <li>
                <Link href="/products?category=sofas" className="hover:text-white transition-colors">
                  Teak Sofas & Diwans
                </Link>
              </li>
              <li>
                <Link href="/products?category=dining" className="hover:text-white transition-colors">
                  Solid Teak Dining
                </Link>
              </li>
              <li>
                <Link href="/products?category=beds" className="hover:text-white transition-colors">
                  Heirloom Teak Beds
                </Link>
              </li>
              <li>
                <Link href="/products?category=chairs" className="hover:text-white transition-colors">
                  Chairs & Lounge Chairs
                </Link>
              </li>
              <li>
                <Link href="/products?category=tv-units" className="hover:text-white transition-colors">
                  TV Units & Cabinets
                </Link>
              </li>
              <li>
                <Link href="/products?category=wardrobes" className="hover:text-white transition-colors">
                  Teak Wardrobes
                </Link>
              </li>
              <li>
                <Link href="/products?category=outdoor-furniture" className="hover:text-white transition-colors">
                  Outdoor & Sitout
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2 */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white font-sans">
              Company
            </h4>
            <ul className="space-y-2 text-[#999999]">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/showrooms" className="hover:text-white transition-colors">
                  Nilambur Showroom
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Custom Orders
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms & Warranty
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white font-sans">
              Services
            </h4>
            <ul className="space-y-2 text-[#999999]">
              <li>
                <span className="text-[#999999]">Custom Architectural Millwork</span>
              </li>
              <li>
                <span className="text-[#999999]">Government Certified Teak</span>
              </li>
              <li>
                <span className="text-[#999999]">Pan-India Insured Transit</span>
              </li>
              <li>
                <span className="text-[#999999]">Lifetime Joinery Guarantee</span>
              </li>
              <li>
                <span className="text-[#999999]">In-Room White Glove Setup</span>
              </li>
            </ul>
          </div>

          {/* Col 4 */}
          <div className="space-y-3">
            <h4 className="text-[11px] font-bold uppercase tracking-[0.15em] text-white font-sans">
              Connect
            </h4>
            <div className="space-y-2 text-[#999999]">
              <div>
                <p className="font-bold text-white tracking-wide">NILAMBUR TEAK HERITAGE</p>
                <p className="text-[10px] text-[#888888] uppercase tracking-wider mt-0.5">Dealers In: Wooden Furniture & Building Materials</p>
                <p className="text-[#AAAAAA] mt-1">📍 Koolikkal, Mampad P.O., Malappuram Dist., Kerala - 676542</p>
              </div>
              <p className="pt-1">📞 <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:text-white font-medium text-white">{SITE_CONFIG.contact.phoneDisplay}</a></p>
              <p>✉️ <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-white">{SITE_CONFIG.contact.email}</a></p>
            </div>

            <div className="flex items-center gap-3 pt-2 text-[#999999]">
              <a href={SITE_CONFIG.social.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href={SITE_CONFIG.social.facebook} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href={SITE_CONFIG.social.youtube} target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors" aria-label="YouTube">
                <Youtube size={16} />
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#777777]">
          <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2.5">
            <p>© {new Date().getFullYear()} {SITE_CONFIG.name}. All Rights Reserved.</p>
            <span className="hidden sm:inline text-[#444444]">•</span>
            <p>
              Crafted by{" "}
              <a
                href="https://ekodrix.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#C9922A] hover:text-white font-semibold transition-colors underline-offset-2 hover:underline"
              >
                ekodrix
              </a>
            </p>
          </div>
          <div className="flex items-center gap-4">
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