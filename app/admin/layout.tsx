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
  Search,
  Bell,
  ChevronRight,
  TrendingUp,
  Instagram,
  Phone,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { handleLogout } from "@/app/actions/auth";
import { SITE_CONFIG } from "@/config/site";

const adminNavItems = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, badge: null },
  { label: "Home Showcase", href: "/admin/home", icon: Sparkles, badge: "Hero" },
  { label: "Products", href: "/admin/products", icon: Package, badge: null },
  { label: "Exclusive Catalog", href: "/admin/exclusive", icon: ShieldCheck, badge: "VIP" },
  { label: "Categories", href: "/admin/categories", icon: ListTree, badge: "19" },
  { label: "Instagram Feed", href: "/admin/instagram", icon: Instagram, badge: "Social" },
  { label: "Footer & Contact", href: "/admin/footer", icon: Phone, badge: "CMS" },
  { label: "Customer Enquiries", href: "/admin/inquiries", icon: MessageSquare, badge: "CRM" },
  { label: "Client Reviews", href: "/admin/testimonials", icon: Users, badge: null },
  { label: "Cloudinary Media", href: "/admin/media", icon: ImageIcon, badge: null },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (isLoginPage) {
    return <>{children}</>;
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-800 font-sans antialiased flex flex-col md:flex-row">
      {/* ── MOBILE NAVBAR ── */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-white/90 backdrop-blur-md border-b border-slate-200/80 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-slate-900 p-0.5 shadow-sm">
            <Image
              src="/images/logo-proper.png"
              alt={SITE_CONFIG.name}
              fill
              className="object-contain"
            />
          </div>
          <span className="font-cinzel text-xs font-bold tracking-wider text-slate-900">
            NILAMBUR TEAK
          </span>
        </Link>
        <button
          onClick={toggleMenu}
          className="p-2 text-slate-600 hover:text-slate-900 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* ── MOBILE BACKDROP ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-slate-950/50 backdrop-blur-xs z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── MODERN SLEEK SIDEBAR / DRAWER ── */}
      <aside
        className={`w-72 max-w-[85vw] md:w-68 bg-white border-l md:border-l-0 md:border-r border-slate-200/80 flex flex-col fixed inset-y-0 right-0 md:right-auto md:left-0 z-50 transition-transform duration-300 ease-in-out shadow-2xl md:shadow-xs ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full md:translate-x-0"
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 pb-4 border-b border-slate-100 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-xl overflow-hidden bg-gradient-to-br from-slate-900 to-slate-800 p-1 shadow-md group-hover:scale-105 transition-transform">
              <Image
                src="/images/logo-proper.png"
                alt={SITE_CONFIG.name}
                fill
                className="object-contain"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-cinzel text-xs font-black tracking-wider text-slate-900 truncate">
                Nilambur Teak
              </span>
              <span className="text-[10px] font-semibold text-amber-700 tracking-wider uppercase">
                Admin Studio
              </span>
            </div>
          </Link>

          <button
            onClick={toggleMenu}
            className="md:hidden p-1.5 text-slate-400 hover:text-slate-700 rounded-md hover:bg-slate-100"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Section */}
        <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Overview & Management
          </div>

          {adminNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all group ${
                  isActive
                    ? "bg-slate-900 text-white shadow-md shadow-slate-900/10 font-bold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon
                    size={16}
                    className={`transition-colors ${
                      isActive ? "text-amber-400" : "text-slate-400 group-hover:text-slate-700"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-600 group-hover:bg-slate-200"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* User / Logout Footer */}
        <div className="p-4 pb-6 border-t border-slate-100 bg-slate-50/60 space-y-2 mt-auto">
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:text-slate-950 hover:bg-white transition-all shadow-2xs border border-transparent hover:border-slate-200"
          >
            <span className="flex items-center gap-2">
              <ExternalLink size={13} className="text-amber-600" />
              <span>Live Website</span>
            </span>
            <span className="text-[10px] font-bold text-slate-400">↗</span>
          </Link>

          <form action={handleLogout} className="w-full">
            <button
              type="submit"
              className="flex items-center gap-2 px-3 py-2 w-full text-xs font-semibold text-rose-600 hover:text-white hover:bg-rose-600 rounded-lg transition-all cursor-pointer"
            >
              <LogOut size={13} />
              <span>Logout Portal</span>
            </button>
          </form>
        </div>
      </aside>

      {/* ── MAIN CONTENT AREA ── */}
      <main className="flex-1 md:ml-68 pt-16 md:pt-0 min-w-0 flex flex-col min-h-screen">
        {/* Top Header */}
        <header className="h-14 sm:h-16 px-4 sm:px-6 lg:px-8 bg-white/90 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-500 truncate max-w-[55%] sm:max-w-none">
            <span className="text-slate-900 font-bold font-cinzel hidden sm:inline">Nilambur Teak Heritage</span>
            <span className="hidden sm:inline">/</span>
            <span className="text-slate-900 sm:text-slate-700 font-bold sm:font-semibold capitalize truncate">
              {pathname === "/admin"
                ? "Dashboard"
                : pathname.replace("/admin/", "").replace("-", " ")}
            </span>
          </div>

          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-200/60 rounded-full">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                Supabase Connected
              </span>
            </div>

            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 bg-slate-900 hover:bg-amber-700 text-white text-[11px] sm:text-xs font-bold rounded-xl transition-colors shadow-xs active:scale-95"
            >
              <Package size={13} />
              <span>New Piece</span>
            </Link>
          </div>
        </header>

        {/* Page Inner Canvas */}
        <div className="p-3.5 sm:p-6 lg:p-8 flex-1 max-w-7xl w-full mx-auto">{children}</div>
      </main>
    </div>
  );
}
