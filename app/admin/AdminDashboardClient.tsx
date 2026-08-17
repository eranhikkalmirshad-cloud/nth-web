"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShoppingBag,
  Eye,
  MessageSquare,
  Users,
  ImageIcon,
  ArrowUpRight,
  ChevronRight,
  ShieldCheck,
  Copy,
  Plus,
  FolderTree,
  Sparkles,
  Layers,
  ArrowRight,
  Video,
  ExternalLink,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { PRODUCT_CATEGORIES } from "@/lib/constants/categories";

interface AdminDashboardClientProps {
  stats: any[];
  recentInquiries: any[];
}

const statCardsData = [
  {
    icon: ShoppingBag,
    label: "Active Teak Pieces",
    valueIndex: 0,
    tag: "Catalog",
    href: "/admin/products",
    bg: "bg-amber-50",
    text: "text-[#8A572A]",
    border: "border-amber-100 hover:border-amber-400",
  },
  {
    icon: FolderTree,
    label: "Master Categories",
    valueIndex: 1,
    tag: "Taxonomy",
    href: "/admin/categories",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-100 hover:border-emerald-400",
  },
  {
    icon: MessageSquare,
    label: "Customer Inquiries",
    valueIndex: 2,
    tag: "Live CRM",
    href: "/admin/inquiries",
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-100 hover:border-blue-400",
  },
  {
    icon: Users,
    label: "Client Testimonials",
    valueIndex: 3,
    tag: "Verified",
    href: "/admin/testimonials",
    bg: "bg-purple-50",
    text: "text-purple-700",
    border: "border-purple-100 hover:border-purple-400",
  },
];

export default function AdminDashboardClient({
  stats,
  recentInquiries,
}: AdminDashboardClientProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="space-y-8 font-sans">
      {/* ── TOP HERO BANNER ── */}
      <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl bg-[#120E0A] p-5 sm:p-8 text-white shadow-xl border border-[#2B221B]">
        <div className="absolute right-0 top-0 w-96 h-96 bg-[#8A572A]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5 sm:gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1E14] border border-[#8A572A]/40 text-[#E5B56E] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E] animate-pulse" />
              <span>Nilambur Teak Heritage • Studio Management</span>
            </div>
            <h1 className="text-xl sm:text-3xl font-cinzel font-bold text-white tracking-tight !text-white">
              Furniture Management Portal
            </h1>
            <p className="text-xs sm:text-sm text-[#C8BFB5] leading-relaxed font-light">
              Manage your solid Nilambur teak catalog, customize hero video & image showcases, and respond to incoming customer quote inquiries.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 shrink-0 pt-2 sm:pt-0">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-[#8A572A] hover:bg-[#A36C38] text-white font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 text-center"
            >
              <Plus size={15} />
              <span>Add Teak Piece</span>
            </Link>
            <Link
              href="/admin/home"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl backdrop-blur-md border border-white/15 transition-colors text-center active:scale-95"
            >
              <Video size={14} className="text-[#E5B56E]" />
              <span>Hero Showcase</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ── STATS CARDS (Clickable Real Metrics) ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {statCardsData.map((card, i) => {
          const Icon = card.icon;
          const statValue = stats[card.valueIndex]?.value ?? 0;

          return (
            <Link
              key={card.label}
              href={card.href}
              className="block group"
            >
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white rounded-2xl p-6 border shadow-xs transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-0.5 ${card.border}`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${card.bg} ${card.text} shadow-xs`}>
                    <Icon size={20} strokeWidth={2} />
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold tracking-wider uppercase text-slate-700 bg-slate-100 group-hover:bg-[#8A572A] group-hover:text-white px-2.5 py-0.5 rounded-full border border-slate-200 group-hover:border-[#8A572A] transition-colors">
                    <ArrowUpRight size={11} />
                    <span>{card.tag}</span>
                  </span>
                </div>

                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {card.label}
                </p>
                <h3 className="text-3xl font-black text-slate-900 tracking-tight mt-1 font-sans !text-slate-900 group-hover:text-[#8A572A] transition-colors">
                  {statValue}
                </h3>
              </motion.div>
            </Link>
          );
        })}
      </div>

      {/* ── CATEGORIES QUICK STRIP ── */}
      <div className="bg-white rounded-2xl p-5 border border-slate-200/80 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderTree size={16} className="text-amber-700" />
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900 !text-slate-900">
              19 Master Categories
            </h3>
          </div>
          <Link
            href="/admin/categories"
            className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
          >
            <span>Manage All Categories</span>
            <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-wrap gap-2 pt-1">
          {PRODUCT_CATEGORIES.slice(0, 10).map((cat) => (
            <Link
              key={cat.slug}
              href={`/admin/products`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-amber-50 hover:text-amber-900 border border-slate-200/70 text-xs font-semibold text-slate-700 transition-colors"
            >
              <span>{cat.name}</span>
            </Link>
          ))}
          <Link
            href="/admin/categories"
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-amber-50 text-amber-800 border border-amber-200 text-xs font-bold"
          >
            <span>+9 More</span>
          </Link>
        </div>
      </div>

      {/* ── 2-COLUMN MAIN CONTENT ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Customer Leads */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 !text-slate-900">
                Recent Customer Leads & Inquiries
              </h3>
              <p className="text-xs text-slate-500">Live requests from website visitors</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
            >
              <span>View All CRM</span>
              <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {recentInquiries && recentInquiries.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {recentInquiries.map((inquiry, i) => (
                  <div
                    key={inquiry.id || i}
                    className="p-5 flex items-center justify-between hover:bg-slate-50/80 transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                        {inquiry.full_name?.charAt(0) || "U"}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate !text-slate-900">
                          {inquiry.full_name}
                        </h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {inquiry.subject || inquiry.email || "Bespoke Teak Furniture Quote"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span
                        className={`px-2.5 py-1 text-[10px] font-bold uppercase rounded-full ${
                          inquiry.status === "new"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : inquiry.status === "contacted"
                            ? "bg-blue-100 text-blue-900 border border-blue-300"
                            : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        }`}
                      >
                        {inquiry.status || "New"}
                      </span>
                      <span className="text-xs text-slate-400 font-mono hidden sm:inline">
                        {mounted && inquiry.created_at
                          ? new Date(inquiry.created_at).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 mx-auto flex items-center justify-center mb-3">
                  <MessageSquare size={22} />
                </div>
                <h4 className="text-sm font-bold text-slate-900 mb-1 !text-slate-900">
                  No Inquiries in Inbox Yet
                </h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When potential clients submit product inquiries or custom quote requests, they will show up here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick Action Hub */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 !text-slate-900">Quick Shortcuts</h3>
            <p className="text-xs text-slate-500">Catalog and media controls</p>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 !text-slate-900">Add New Product</h4>
                  <p className="text-[11px] text-slate-500">Upload photos, specs, & details</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/home"
              className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <Video size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 !text-slate-900">Hero Video & Banners</h4>
                  <p className="text-[11px] text-slate-500">Update video background & text</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/media"
              className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
                  <ImageIcon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 !text-slate-900">Cloudinary Assets</h4>
                  <p className="text-[11px] text-slate-500">Manage high-res photography</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* VIP Private Showroom Card */}
          <div className="bg-gradient-to-br from-slate-950 to-slate-900 p-6 rounded-2xl text-white shadow-lg border border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={65} className="text-amber-400" />
            </div>

            <div className="relative z-10 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/20 px-2.5 py-1 rounded-full border border-amber-400/30">
                VIP Private Showroom
              </span>
              <h4 className="text-sm font-bold text-white !text-white">
                Exclusive Teak Gallery Link
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed font-normal">
                Share the private collection catalog with VIP clients via a direct link.
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const link = `${window.location.origin}/exclusive`;
                    navigator.clipboard.writeText(link);
                    toast.success("VIP Showroom link copied to clipboard!");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-xs cursor-pointer"
                >
                  <Copy size={13} /> Copy VIP Link
                </button>
                <Link
                  href="/admin/exclusive"
                  className="w-full text-center py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
                >
                  Manage Private Items →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
