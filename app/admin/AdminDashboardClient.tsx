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
  PlusCircle,
  FolderTree,
  Sparkles,
  Layers,
} from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

interface AdminDashboardClientProps {
  stats: any[];
  recentInquiries: any[];
}

const IconMap: Record<string, any> = {
  ShoppingBag,
  Eye,
  MessageSquare,
  Users,
};

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
      {/* ── STATS CARDS ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((stat, i) => {
          const Icon = IconMap[stat.icon] || ShoppingBag;
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, ease: "easeOut" }}
              className="bg-white p-6 rounded-xl border border-[#EAE8E2] shadow-xs hover:shadow-md transition-all relative overflow-hidden group hover:border-[#8A572A]"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-[#F7F4F0] text-[#8A572A] group-hover:bg-[#8A572A] group-hover:text-white transition-colors">
                  <Icon size={20} strokeWidth={1.75} />
                </div>
                <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                  <ArrowUpRight size={12} />
                  <span>{stat.change}</span>
                </span>
              </div>
              <p className="text-[11px] font-bold uppercase tracking-[0.15em] text-[#7A6E65] mb-1">
                {stat.label}
              </p>
              <h3 className="text-3xl font-black tracking-tight text-[#1C130D]">
                {stat.value}
              </h3>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* ── LEFT: RECENT INQUIRIES ── */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#EAE8E2]">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C130D]">
                Recent Customer Inquiries
              </h3>
              <p className="text-xs text-[#7A6E65]">Incoming product inquiries and quote requests</p>
            </div>
            <Link
              href="/admin/inquiries"
              className="text-xs font-bold uppercase tracking-wider text-[#8A572A] hover:text-[#1C130D] transition-colors flex items-center gap-1 group"
            >
              <span>View All</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="bg-white rounded-xl border border-[#EAE8E2] shadow-xs overflow-hidden">
            {recentInquiries.length > 0 ? (
              <div className="divide-y divide-[#F0EDE6]">
                {recentInquiries.map((inquiry, i) => (
                  <motion.div
                    key={inquiry.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + i * 0.06 }}
                    className="p-5 flex items-center justify-between hover:bg-[#FAF9F6] transition-colors"
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-full bg-[#1C130D] text-[#E0AB76] flex items-center justify-center text-xs font-bold uppercase shrink-0">
                        {inquiry.full_name?.charAt(0) || "U"}
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-[#1C130D] truncate">
                          {inquiry.full_name}
                        </h4>
                        <p className="text-xs text-[#7A6E65] truncate mt-0.5">
                          {inquiry.subject || inquiry.email || "Teak Furniture Inquiry"}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 shrink-0">
                      <span
                        className={`px-3 py-1 text-[10px] font-bold uppercase tracking-wider rounded-full ${
                          inquiry.status === "new"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : inquiry.status === "contacted"
                            ? "bg-blue-100 text-blue-900 border border-blue-300"
                            : "bg-[#F4F1EA] text-[#4A3B32]"
                        }`}
                      >
                        {inquiry.status || "New"}
                      </span>
                      <span className="text-xs text-[#999999] hidden sm:inline">
                        {mounted
                          ? new Date(inquiry.created_at).toLocaleDateString(undefined, {
                              month: "short",
                              day: "numeric",
                            })
                          : ""}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-12 text-center">
                <div className="w-12 h-12 rounded-full bg-[#F4F1EA] text-[#8A572A] mx-auto flex items-center justify-center mb-3">
                  <MessageSquare size={22} />
                </div>
                <h4 className="text-sm font-bold text-[#1C130D] mb-1">No Recent Inquiries Yet</h4>
                <p className="text-xs text-[#7A6E65] max-w-sm mx-auto">
                  When potential clients submit product inquiries or custom quote requests, they will appear here.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* ── RIGHT: QUICK ACTIONS & SHOWROOM LINK ── */}
        <div className="lg:col-span-4 space-y-6">
          <div className="pb-2 border-b border-[#EAE8E2]">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C130D]">
              Quick Management
            </h3>
            <p className="text-xs text-[#7A6E65]">Catalog & showcase shortcuts</p>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/products/new"
              className="flex items-center justify-between p-4 bg-[#1C130D] hover:bg-[#8A572A] text-white rounded-xl transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
                  <ShoppingBag size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider">Add New Product</h4>
                  <p className="text-[10px] text-white/70">Create piece with specs & photos</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-white/60 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/home"
              className="flex items-center justify-between p-4 bg-white hover:border-[#8A572A] border border-[#EAE8E2] rounded-xl transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F7F4F0] text-[#8A572A] flex items-center justify-center">
                  <Layers size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C130D]">
                    Home Video & Showcase
                  </h4>
                  <p className="text-[10px] text-[#7A6E65]">Hero video, stats, & highlights</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#999999] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/categories"
              className="flex items-center justify-between p-4 bg-white hover:border-[#8A572A] border border-[#EAE8E2] rounded-xl transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F7F4F0] text-[#8A572A] flex items-center justify-center">
                  <FolderTree size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C130D]">
                    Manage Categories
                  </h4>
                  <p className="text-[10px] text-[#7A6E65]">19 official teak categories</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#999999] group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/admin/media"
              className="flex items-center justify-between p-4 bg-white hover:border-[#8A572A] border border-[#EAE8E2] rounded-xl transition-all shadow-xs group"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-[#F7F4F0] text-[#8A572A] flex items-center justify-center">
                  <ImageIcon size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#1C130D]">
                    Cloudinary Media
                  </h4>
                  <p className="text-[10px] text-[#7A6E65]">Upload and manage assets</p>
                </div>
              </div>
              <ChevronRight size={16} className="text-[#999999] group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* ── EXCLUSIVE SHOWROOM CARD ── */}
          <div className="bg-gradient-to-br from-[#1C130D] to-[#2D1E15] p-6 rounded-xl text-white border border-[#3D2A1D] shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-15">
              <ShieldCheck size={70} className="text-[#E0AB76]" />
            </div>

            <div className="relative z-10 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#E0AB76] bg-[#8A572A]/40 px-2 py-0.5 rounded-full">
                  VIP Access Link
                </span>
              </div>
              <h4 className="font-cinzel text-base font-bold text-white">
                Exclusive Teak Showroom
              </h4>
              <p className="text-xs text-white/70 leading-relaxed">
                Share the private collection catalog with VIP clients via a direct link.
              </p>

              <div className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => {
                    const link = `${window.location.origin}/exclusive`;
                    navigator.clipboard.writeText(link);
                    toast.success("Exclusive Showroom link copied to clipboard!");
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-[#E0AB76] hover:bg-white text-[#1C130D] py-2.5 rounded-md text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-xs"
                >
                  <Copy size={13} /> Copy VIP Link
                </button>
                <Link
                  href="/admin/exclusive"
                  className="w-full flex items-center justify-center gap-2 border border-white/20 hover:bg-white/10 text-white py-2 rounded-md text-xs font-bold uppercase tracking-wider transition-all"
                >
                  Manage Private Items
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
