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
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface AdminDashboardClientProps {
  stats: any[];
  recentInquiries: any[];
}

const statStyles = [
  {
    icon: ShoppingBag,
    gradient: "from-amber-500/10 to-amber-500/5",
    iconBg: "bg-amber-500 text-white",
    border: "hover:border-amber-400",
    badge: "19 Categories",
  },
  {
    icon: MessageSquare,
    gradient: "from-blue-500/10 to-blue-500/5",
    iconBg: "bg-blue-600 text-white",
    border: "hover:border-blue-400",
    badge: "Real-time",
  },
  {
    icon: Eye,
    gradient: "from-emerald-500/10 to-emerald-500/5",
    iconBg: "bg-emerald-600 text-white",
    border: "hover:border-emerald-400",
    badge: "Analytics",
  },
  {
    icon: Users,
    gradient: "from-purple-500/10 to-purple-500/5",
    iconBg: "bg-purple-600 text-white",
    border: "hover:border-purple-400",
    badge: "Social Proof",
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
    <div className="space-y-8">
      {/* ── WELCOME BANNER ── */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-amber-950 p-6 sm:p-8 text-white shadow-lg">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-amber-300 text-xs font-semibold">
              <Sparkles size={13} />
              <span>Nilambur Teak Heritage Studio</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold font-cinzel text-white tracking-tight">
              Furniture Management Portal
            </h1>
            <p className="text-sm text-slate-300 max-w-xl">
              Manage your solid Nilambur teak catalog, customize hero video banners, and respond to incoming bespoke quotation inquiries.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/products/new"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-md shadow-amber-500/20"
            >
              <Plus size={15} />
              <span>Add Teak Piece</span>
            </Link>
            <Link
              href="/admin/home"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl backdrop-blur-md transition-colors"
            >
              <span>Edit Hero Video</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>

      {/* ── METRIC STATS CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const style = statStyles[i % statStyles.length];
          const Icon = style.icon;

          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              className={`bg-white rounded-2xl p-6 border border-slate-200/80 shadow-xs hover:shadow-md transition-all group ${style.border}`}
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center ${style.iconBg} shadow-sm group-hover:scale-110 transition-transform`}
                >
                  <Icon size={20} strokeWidth={2} />
                </div>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
                  <ArrowUpRight size={12} />
                  <span>{style.badge}</span>
                </span>
              </div>

              <p className="text-xs font-semibold text-slate-500 tracking-wide uppercase">
                {stat.label}
              </p>
              <h3 className="text-3xl font-extrabold text-slate-900 mt-1 tracking-tight">
                {stat.value}
              </h3>
            </motion.div>
          );
        })}
      </div>

      {/* ── 2-COLUMN DASHBOARD SECTION ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Recent Customer Inquiries */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">Recent Customer Leads</h3>
              <p className="text-xs text-slate-500">Live requests from website visitors and clients</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold text-amber-700 hover:text-amber-800 flex items-center gap-1 group"
            >
              <span>View All</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden">
            {recentInquiries && recentInquiries.length > 0 ? (
              <div className="divide-y divide-slate-100">
                {recentInquiries.map((inquiry, i) => (
                  <div
                    key={inquiry.id || i}
                    className="p-5 flex items-center justify-between hover:bg-slate-50/70 transition-colors group"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-sm shrink-0 border border-slate-200">
                        {inquiry.full_name?.charAt(0) || "U"}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 truncate group-hover:text-amber-800 transition-colors">
                          {inquiry.full_name}
                        </h4>
                        <p className="text-xs text-slate-500 truncate mt-0.5">
                          {inquiry.subject || inquiry.email || "Teak Furniture Quote"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span
                        className={`px-3 py-1 text-[10px] font-bold uppercase rounded-full ${
                          inquiry.status === "new"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : inquiry.status === "contacted"
                            ? "bg-blue-100 text-blue-900 border border-blue-300"
                            : "bg-emerald-100 text-emerald-900 border border-emerald-300"
                        }`}
                      >
                        {inquiry.status || "New"}
                      </span>
                      <span className="text-xs text-slate-400 hidden sm:inline font-mono">
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
                <h4 className="text-sm font-bold text-slate-900 mb-1">No Inquiries Yet</h4>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  When potential clients submit inquiries or custom quote requests, they will show up here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right: Quick Action Hub */}
        <div className="lg:col-span-4 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900">Quick Shortcuts</h3>
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
                  <h4 className="text-xs font-bold text-slate-900">Add New Teak Product</h4>
                  <p className="text-[11px] text-slate-500">Upload photos, specs, & prices</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center justify-between p-4 bg-white hover:bg-slate-50 border border-slate-200/80 rounded-2xl transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
                  <FolderTree size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900">19 Master Categories</h4>
                  <p className="text-[11px] text-slate-500">Living, Dining, Beds, Sofas, etc.</p>
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
                  <h4 className="text-xs font-bold text-slate-900">Cloudinary Media Library</h4>
                  <p className="text-[11px] text-slate-500">Direct cloud uploads</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-slate-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Exclusive VIP Box */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-2xl text-white shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <ShieldCheck size={65} className="text-amber-400" />
            </div>

            <div className="relative z-10 space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-white/10 px-2.5 py-1 rounded-full">
                VIP Private Showroom
              </span>
              <h4 className="font-cinzel text-sm font-bold text-white">
                Exclusive Teak Gallery Link
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Send private preview collections to high-value clients via a direct link.
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const link = `${window.location.origin}/exclusive`;
                    navigator.clipboard.writeText(link);
                    toast.success("VIP Showroom link copied!");
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
