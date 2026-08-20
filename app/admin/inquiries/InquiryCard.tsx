"use client";

import { useState } from "react";
import { Mail, Phone, Calendar, MessageSquare, ArchiveRestore, Check, Clock, User } from "lucide-react";
import { updateInquiryStatus } from "@/app/actions/cms";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface InquiryCardProps {
  inquiry: any;
  onStatusChange: (id: string, newStatus: string) => void;
}

export default function InquiryCard({ inquiry, onStatusChange }: InquiryCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);
  const currentStatus = inquiry.status || "new";

  const handleStatusChange = async (newStatus: string) => {
    setIsUpdating(true);
    const result = await updateInquiryStatus(inquiry.id, newStatus);
    if (result.success) {
      onStatusChange(inquiry.id, newStatus);
      toast.success(`Enquiry marked as ${newStatus}`);
    } else {
      toast.error("Failed to update status");
    }
    setIsUpdating(false);
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white border border-[#EAE8E2] rounded-xl p-6 hover:border-[#8A572A] hover:shadow-md transition-all shadow-xs"
    >
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
        <div className="space-y-4 flex-1 min-w-0">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-full bg-[#1C130D] text-[#E0AB76] flex items-center justify-center font-bold text-sm shrink-0">
              {inquiry.full_name?.charAt(0) || "U"}
            </div>
            <div className="min-w-0">
              <h3 className="font-bold text-[#1C130D] text-base truncate">
                {inquiry.full_name}
              </h3>
              <p className="text-[11px] text-[#8A572A] uppercase tracking-wider font-bold mt-0.5">
                {inquiry.subject || inquiry.interest_category || "Teak Furniture Enquiry"}
              </p>
            </div>
          </div>

          <div className="bg-[#FAF9F6] p-4 rounded-lg border border-[#EAE8E2]">
            <p className="text-xs sm:text-sm text-[#333333] leading-relaxed italic">
              "{inquiry.message || "Customer requested a product quote & availability check."}"
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-1 text-xs text-[#7A6E65]">
            {inquiry.email && (
              <a
                href={`mailto:${inquiry.email}`}
                className="flex items-center gap-1.5 hover:text-[#8A572A] transition-colors"
              >
                <Mail size={13} className="text-[#8A572A]" />
                <span>{inquiry.email}</span>
              </a>
            )}
            {inquiry.phone && (
              <a
                href={`tel:${inquiry.phone}`}
                className="flex items-center gap-1.5 hover:text-[#8A572A] transition-colors"
              >
                <Phone size={13} className="text-[#8A572A]" />
                <span className="font-mono">{inquiry.phone}</span>
              </a>
            )}
            <div className="flex items-center gap-1.5">
              <Calendar size={13} className="text-[#999999]" />
              <span>{new Date(inquiry.created_at).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Actions Column */}
        <div className="flex flex-col gap-2.5 shrink-0 sm:min-w-[180px]">
          <div
            className={`px-3 py-2 rounded-md text-center text-[10px] font-bold uppercase tracking-wider ${
              currentStatus === "new"
                ? "bg-amber-100 text-amber-900 border border-amber-300"
                : currentStatus === "contacted"
                ? "bg-blue-100 text-blue-900 border border-blue-300"
                : currentStatus === "resolved"
                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                : "bg-[#F7F4F0] text-[#7A6E65]"
            }`}
          >
            {isUpdating ? "Updating..." : `Status: ${currentStatus}`}
          </div>

          {currentStatus === "new" && (
            <button
              onClick={() => handleStatusChange("contacted")}
              disabled={isUpdating}
              className="w-full py-2 px-3 bg-[#1C130D] hover:bg-[#8A572A] text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              Mark Contacted
            </button>
          )}

          {currentStatus === "contacted" && (
            <button
              onClick={() => handleStatusChange("resolved")}
              disabled={isUpdating}
              className="w-full py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer shadow-xs disabled:opacity-50"
            >
              Mark Resolved
            </button>
          )}

          {currentStatus !== "archived" ? (
            <button
              onClick={() => handleStatusChange("archived")}
              disabled={isUpdating}
              className="w-full py-2 px-3 bg-white hover:bg-gray-100 border border-[#EAE8E2] text-[#7A6E65] hover:text-[#1C130D] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50"
            >
              Archive
            </button>
          ) : (
            <button
              onClick={() => handleStatusChange("contacted")}
              disabled={isUpdating}
              className="w-full py-2 px-3 bg-white hover:bg-[#F7F4F0] border border-[#EAE8E2] text-[#1C130D] text-xs font-bold uppercase tracking-wider rounded-lg transition-colors cursor-pointer disabled:opacity-50 flex items-center justify-center gap-1.5"
            >
              <ArchiveRestore size={13} /> <span>Restore</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
