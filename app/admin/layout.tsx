"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
  LayoutDashboard,
  Package,
  ListTree,
  MessageSquare,
  Image as ImageIcon,
  Users,
  LogOut,
  ExternalLink,
  ShieldCheck,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { handleLogout } from "@/app/actions/auth";
import { SITE_CONFIG } from "@/config/site";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { label: "Home Showcase", href: "/admin/home", icon: ImageIcon },
  { label: "Teak Products", href: "/admin/products", icon: Package },
  { label: "Exclusive Catalog", href: "/admin/exclusive", icon: ShieldCheck },
  { label: "Categories", href: "/admin/categories", icon: ListTree },
  { label: "Customer Inquiries", href: "/admin/inquiries", icon: MessageSquare },
  { label: "Client Reviews", href: "/admin/testimonials", icon: Users },
  { label: "Media Assets", href: "/admin/media", icon: ImageIcon },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoginPage) {
    return (
      <div className="min-h-screen bg-[#FBFBF9] flex items-center justify-center">
        {children}
      </div>
    );
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex min-h-screen bg-[#FBFBF9] font-sans antialiased text-[#1A1A1A]">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#1C130D] text-white border-b border-[#3A2A1E] z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden border border-[#8A572A]/50 bg-black/40">
            <Image
              src="/images/logo-proper.png"
              alt={SITE_CONFIG.name}
              fill
              className="object-contain p-0.5"
            />
          </div>
          <span className="font-cinzel text-xs font-bold tracking-wider text-[#E0AB76]">
            NILAMBUR TEAK
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          className="p-2 text-[#E0AB76] hover:text-white transition-colors"
          aria-label="Toggle Navigation"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-xs z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`w-72 bg-[#1C130D] text-white flex flex-col fixed inset-y-0 z-50 border-r border-[#2C1F16] shadow-xl transition-transform duration-300 ease-out ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 pb-6 border-b border-[#2C1F16]">
          <Link
            href="/"
            className="flex items-center gap-3 group"
          >
            <div className="relative w-11 h-11 rounded-full overflow-hidden border border-[#8A572A] bg-black/50 p-1 shrink-0 shadow-md group-hover:border-[#E0AB76] transition-colors">
              <Image
                src="/images/logo-proper.png"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-cinzel text-sm font-bold text-[#E0AB76] tracking-wider leading-tight truncate group-hover:text-white transition-colors">
                NILAMBUR TEAK
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#9A7D60] mt-1">
                Admin Console
              </span>
            </div>
            <button
              onClick={toggleMenu}
              className="md:hidden ml-auto p-1.5 text-[#9A7D60] hover:text-white"
            >
              <X size={18} />
            </button>
          </Link>
        </div>

        {/* Nav Links */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-1.5">
          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive
                    ? "bg-[#8A572A] text-white shadow-md font-semibold"
                    : "text-[#BDB1A5] hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <item.icon size={16} className={isActive ? "text-white" : "text-[#8A572A]"} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#2C1F16] space-y-2">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3.5 py-2 rounded-md text-[11px] font-semibold text-[#BDB1A5] hover:text-white hover:bg-white/[0.05] transition-colors"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={14} className="text-[#8A572A]" />
              View Live Website
            </span>
            <span className="text-[9px] text-[#8A572A] uppercase font-bold tracking-widest">↗</span>
          </Link>

          <form action={handleLogout} className="w-full">
            <button
              type="submit"
              className="flex items-center gap-2.5 px-3.5 py-2.5 w-full text-xs font-bold uppercase tracking-wider text-[#E0AB76] bg-[#2A1D14] hover:bg-[#8A572A] hover:text-white rounded-lg transition-all cursor-pointer border border-[#3D291C]"
            >
              <LogOut size={15} />
              <span>Logout Portal</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 min-w-0 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 px-6 md:px-10 py-5 bg-white border-b border-[#EAE8E2] sticky top-0 z-30 shadow-xs">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A]">
              <span>Nilambur Teak Heritage™</span>
              <span>•</span>
              <span className="text-[#888888]">Portal</span>
            </div>
            <h2 className="font-cinzel text-xl sm:text-2xl font-bold text-[#1C130D] mt-0.5">
              Management Dashboard
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-[#F4F1EA] border border-[#E0DACE] rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-bold text-[#4A3B32] uppercase tracking-wider">
                Live Production
              </span>
            </div>
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1C130D] hover:bg-[#8A572A] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shadow-xs"
            >
              <Package size={14} />
              <span>+ Add Teak Product</span>
            </Link>
          </div>
        </header>

        {/* Page Inner Container */}
        <div className="p-5 md:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
