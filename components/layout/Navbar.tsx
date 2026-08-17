// components/layout/Navbar.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  Heart,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  MessageCircle,
  ArrowRight,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { SITE_CONFIG } from "@/config/site";
import { PRODUCT_CATEGORIES, ROOM_CATEGORIES, CategoryItem } from "@/lib/constants/categories";
import { createClient } from "@/lib/supabase";

export default function Navbar() {
  const [categories, setCategories] = useState<CategoryItem[]>(PRODUCT_CATEGORIES);
  const [exploreOpen, setExploreOpen] = useState(false);
  const [mobileExploreOpen, setMobileExploreOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const { favoritesCount, setDrawerOpen } = useFavorites();

  // Dynamically sync latest categories and image URLs from Supabase DB
  useEffect(() => {
    try {
      const supabase = createClient();
      supabase
        .from("categories")
        .select("*")
        .order("sort_order", { ascending: true })
        .then(({ data }) => {
          if (data && data.length > 0) {
            setCategories(
              data.map((c) => ({
                name: c.name,
                slug: c.slug,
                href: `/products?category=${c.slug}`,
                image: c.image_url || "/images/placeholder-furniture.jpg",
                description: c.description || c.name,
                isPopular: c.is_featured,
              }))
            );
          }
        });
    } catch (e) {
      // Fallback to updated PRODUCT_CATEGORIES
    }
  }, []);

  const featuredExploreCategories =
    categories.filter((c) => c.isPopular).length >= 6
      ? categories.filter((c) => c.isPopular).slice(0, 6)
      : categories.slice(0, 6);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setExploreOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Close on route change
  useEffect(() => {
    setExploreOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-[100] w-full bg-white transition-all duration-200 border-b border-[#EAEAEA] ${
        isScrolled ? "py-2 sm:py-2.5 shadow-xs" : "py-2.5 sm:py-3.5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* ── LEFT: Logo ── */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3 group min-w-0">
          <div className="relative h-9 w-9 sm:h-11 sm:w-11 flex-shrink-0">
            <Image
              src="/images/logo-proper.png"
              alt={SITE_CONFIG.name}
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col justify-center min-w-0">
            <span className="font-cinzel text-[13px] xs:text-sm sm:text-base md:text-[17px] font-bold tracking-[0.04em] sm:tracking-[0.08em] uppercase text-[#8A572A] leading-tight truncate">
              Nilambur Teak Heritage<span className="text-[9px] sm:text-[10px] align-top font-sans ml-0.5 font-normal text-[#8A572A]">™</span>
            </span>
            <span className="hidden sm:block text-[8px] sm:text-[9px] text-[#777777] font-medium tracking-[0.05em] mt-0.5 whitespace-nowrap">
              Interior & Furniture Manufacturing
            </span>
          </div>
        </Link>

        {/* ── CENTER: Navigation Links (SHOP, EXPLORE v, SHOWROOMS, ABOUT US) ── */}
        <nav className="hidden md:flex items-center gap-7 lg:gap-10">
          <Link
            href="/products"
            className="text-[11px] font-bold tracking-[0.15em] uppercase text-[#111111] hover:text-[#8B5E3C] transition-colors"
          >
            Shop
          </Link>

          {/* EXPLORE Mega Menu Dropdown */}
          <div
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setExploreOpen(true)}
            onMouseLeave={() => setExploreOpen(false)}
          >
            <button
              onClick={() => setExploreOpen(!exploreOpen)}
              className={`flex items-center gap-1 text-[11px] font-bold tracking-[0.15em] uppercase transition-colors py-1 cursor-pointer ${
                exploreOpen ? "text-[#8B5E3C]" : "text-[#111111] hover:text-[#8B5E3C]"
              }`}
            >
              <span>Explore</span>
              {exploreOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
            </button>

            <AnimatePresence>
              {exploreOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18 }}
                  className="absolute top-full left-1/2 -translate-x-[45%] mt-3 w-[620px] bg-white border border-[#EAEAEA] rounded-[24px] shadow-2xl p-7 z-50"
                >
                  <div className="grid grid-cols-12 gap-7">
                    {/* Left Column: FURNITURE CATEGORIES */}
                    <div className="col-span-7 pr-6 border-r border-[#F0F0EE]">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#999999]">
                          Furniture Categories
                        </span>
                        <Link 
                          href="/products" 
                          className="text-[10px] font-bold uppercase tracking-wider text-[#8A572A] hover:underline"
                        >
                          View All ({categories.length}) →
                        </Link>
                      </div>

                      <div className="grid grid-cols-3 gap-3">
                        {featuredExploreCategories.map((cat) => (
                          <Link
                            key={cat.name}
                            href={cat.href}
                            className="group block text-left"
                          >
                            <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden bg-[#F5F5F3] mb-1.5 p-1 border border-[#EAEAEA]/60 group-hover:border-[#8B5E3C] transition-colors">
                              <Image
                                src={cat.image}
                                alt={cat.name}
                                fill
                                sizes="120px"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                              />
                            </div>
                            <span className="text-[11px] font-bold text-[#111111] group-hover:text-[#8B5E3C] transition-colors block truncate">
                              {cat.name}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: SHOP BY ROOM */}
                    <div className="col-span-5 flex flex-col justify-center text-left">
                      <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-[#999999] block mb-4">
                        Shop by Room
                      </span>

                      <div className="flex flex-col space-y-3">
                        {ROOM_CATEGORIES.map((room) => (
                          <Link
                            key={room.slug}
                            href={room.href}
                            className="text-sm font-bold text-[#111111] hover:text-[#8B5E3C] transition-colors flex items-center justify-between group"
                          >
                            <span>{room.name}</span>
                            <ArrowRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity text-[#8B5E3C]" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link
            href="/about"
            className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-colors relative py-1 ${
              pathname === "/about" ? "text-[#8A572A]" : "text-[#111111] hover:text-[#8B5E3C]"
            }`}
          >
            <span>About Us</span>
            {pathname === "/about" && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8A572A]" />
            )}
          </Link>

          <Link
            href="/contact"
            className={`text-[11px] font-bold tracking-[0.15em] uppercase transition-colors relative py-1 ${
              pathname === "/contact" ? "text-[#8A572A]" : "text-[#111111] hover:text-[#8B5E3C]"
            }`}
          >
            <span>Contact</span>
            {pathname === "/contact" && (
              <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#8A572A]" />
            )}
          </Link>
        </nav>

        {/* ── RIGHT: Heart Icon + [ENQUIRE] Button + Hamburger ── */}
        <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
          {/* Wishlist / Heart Icon */}
          <button
            onClick={() => setDrawerOpen(true)}
            className="p-1.5 text-[#111111] hover:text-[#8B5E3C] transition-colors relative"
            aria-label="Wishlist"
          >
            <Heart size={19} strokeWidth={1.75} />
            {favoritesCount > 0 && (
              <span className="absolute 0 right-0 w-3.5 h-3.5 bg-[#8B5E3C] text-white text-[8px] font-bold rounded-full flex items-center justify-center">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Enquire Button */}
          <a
            href={SITE_CONFIG.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex items-center justify-center bg-[#111111] hover:bg-[#8B5E3C] text-white text-[11px] font-bold tracking-[0.12em] uppercase px-5 py-2.5 rounded-md transition-all shadow-xs"
          >
            Enquire
          </a>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="p-1.5 text-[#111111] md:hidden focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* ── MOBILE DRAWER ── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-xs z-[150] md:hidden"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-[340px] bg-white z-[160] p-5 sm:p-6 flex flex-col justify-between shadow-2xl overflow-y-auto md:hidden"
            >
              <div>
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-[#EAEAEA]">
                  <div className="flex items-center gap-2">
                    <div className="relative h-7 w-7">
                      <Image
                        src="/images/logo-proper.png"
                        alt={SITE_CONFIG.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <span className="font-cinzel text-xs font-bold uppercase text-[#8A572A]">
                      Nilambur Teak
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 text-[#555555] hover:text-[#111111]"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1 pt-4 text-left">
                  <Link
                    href="/"
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-bold tracking-[0.15em] uppercase text-[#111111] py-2.5 border-b border-[#F9F9F8] flex items-center justify-between"
                  >
                    <span>Home</span>
                    <ArrowRight size={13} className="text-[#AAAAAA]" />
                  </Link>

                  <Link
                    href="/products"
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-bold tracking-[0.15em] uppercase text-[#111111] py-2.5 border-b border-[#F9F9F8] flex items-center justify-between"
                  >
                    <span>All Products ({PRODUCT_CATEGORIES.length} Categories)</span>
                    <ArrowRight size={13} className="text-[#AAAAAA]" />
                  </Link>

                  {/* Mobile Accordion for Explore */}
                  <div className="py-2.5 border-b border-[#F9F9F8]">
                    <button
                      onClick={() => setMobileExploreOpen(!mobileExploreOpen)}
                      className="w-full flex items-center justify-between text-xs font-bold tracking-[0.15em] uppercase text-[#111111]"
                    >
                      <span>Explore Categories</span>
                      {mobileExploreOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {mobileExploreOpen && (
                      <div className="pt-3 space-y-3 pl-1">
                        <div className="grid grid-cols-2 gap-1.5 max-h-56 overflow-y-auto pr-1">
                          {PRODUCT_CATEGORIES.map((cat) => (
                            <Link
                              key={cat.slug}
                              href={cat.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-[11px] font-semibold text-[#444444] hover:text-[#8A572A] py-1 bg-[#FAFAF9] px-2 rounded-sm truncate"
                            >
                              {cat.name}
                            </Link>
                          ))}
                        </div>

                        <span className="text-[9px] font-bold tracking-[0.2em] uppercase text-[#999999] block mt-3 mb-1">
                          Shop by Room
                        </span>
                        <div className="grid grid-cols-2 gap-1.5">
                          {ROOM_CATEGORIES.map((room) => (
                            <Link
                              key={room.slug}
                              href={room.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-[11px] text-[#666666] hover:text-[#111111] py-0.5 font-medium"
                            >
                              {room.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>


                  <Link
                    href="/about"
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-bold tracking-[0.15em] uppercase text-[#111111] py-2.5 border-b border-[#F9F9F8] flex items-center justify-between"
                  >
                    <span>About Us</span>
                    <ArrowRight size={13} className="text-[#AAAAAA]" />
                  </Link>

                  <Link
                    href="/contact"
                    onClick={() => setMobileOpen(false)}
                    className="text-xs font-bold tracking-[0.15em] uppercase text-[#111111] py-2.5 border-b border-[#F9F9F8] flex items-center justify-between"
                  >
                    <span>Contact & Quotes</span>
                    <ArrowRight size={13} className="text-[#AAAAAA]" />
                  </Link>
                </nav>
              </div>

              {/* Bottom Actions */}
              <div className="pt-5 border-t border-[#EAEAEA] space-y-2 mt-4">
                <a
                  href={SITE_CONFIG.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#25D366] text-white py-2.5 rounded-md text-xs font-bold uppercase tracking-wider shadow-sm"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Inquiry</span>
                </a>

                <a
                  href={`tel:${SITE_CONFIG.contact.phone}`}
                  className="w-full flex items-center justify-center gap-2 bg-[#F5F5F3] text-[#111111] py-2.5 rounded-md text-xs font-bold uppercase tracking-wider"
                >
                  <Phone size={14} />
                  <span>Call {SITE_CONFIG.contact.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
