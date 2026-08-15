"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
      <div className="min-h-screen bg-[#FDFAF5] flex items-center justify-center">
        {children}
      </div>
    );
  }

  const toggleMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <div className="flex min-h-screen bg-[#FDFAF5] font-lato max-w-[100vw] overflow-x-hidden">
      {/* Mobile Header (Hidden on Desktop) */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-[#2C1810] text-[#F5ECD7] border-b border-[#D4A96A]/30 z-40 flex items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src={SITE_CONFIG.logo} alt="Logo" className="w-8 h-8 rounded-full border border-[#C9922A]" />
          <span className="font-cinzel text-sm font-bold text-[#E8B84B]">
            NILAMBUR TEAK
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <button onClick={toggleMenu} className="p-2 text-[#F5ECD7]">
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Backdrop Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`w-72 bg-[#2C1810] text-[#F5ECD7] flex flex-col fixed inset-y-0 z-50 border-r border-[#D4A96A]/30 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0`}
      >
        <div className="p-6 pb-8">
          <Link
            href="/"
            className="flex items-center gap-3 mb-8 group relative pb-2 border-b border-[#D4A96A]/20"
          >
            <img src={SITE_CONFIG.logo} alt="Logo" className="w-10 h-10 rounded-full border border-[#C9922A]" />
            <div className="flex flex-col">
              <span className="font-cinzel text-sm font-bold text-[#E8B84B] leading-none">
                NILAMBUR TEAK
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#C4956A] mt-1">
                Admin Console
              </span>
            </div>
            <button onClick={toggleMenu} className="md:hidden absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#F5ECD7]">
              <X size={18} />
            </button>
          </Link>

          <nav className="space-y-1 mt-6">
            {adminNavItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${
                    isActive
                      ? "bg-[#C9922A] text-[#2C1810] shadow-md"
                      : "text-[#EAD5B0] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <item.icon size={16} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 space-y-4">
          <form action={handleLogout} className="w-full">
            <button
              type="submit"
              className="flex items-center gap-3 px-4 py-3 w-full text-xs font-bold uppercase tracking-wider text-[#E8B84B] bg-[#3D1F0D] hover:bg-[#5C3D1E] rounded-lg transition-all cursor-pointer border border-[#D4A96A]/20"
            >
              <LogOut size={16} />
              <span>Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 md:ml-72 pt-16 md:pt-0 w-full md:w-[calc(100%-18rem)]">
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 px-6 md:px-10 py-6 md:py-8 bg-white border-b border-[#D4A96A]/20">
          <div>
            <h1 className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#C9922A] mb-1">
              Nilambur Teak Heritage™
            </h1>
            <h2 className="font-playfair text-2xl font-bold text-[#2C1810]">
              Management Portal
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-xs font-bold text-[#6B4226] uppercase tracking-wider">
              Authorized Artisan
            </span>
          </div>
        </header>

        <div className="p-4 md:p-8 w-full overflow-x-hidden">{children}</div>
      </main>
    </div>
  );
}
