"use client";

import { useState } from "react";
import { MessageSquare, Inbox, Clock, CheckCircle, Archive } from "lucide-react";
import InquiryCard from "./InquiryCard";
import { motion, AnimatePresence } from "framer-motion";

interface InquiriesDashboardProps {
  initialInquiries: any[];
}

const TABS = [
  { id: "all", label: "All Inquiries", icon: Inbox },
  { id: "new", label: "New Leads", icon: MessageSquare },
  { id: "contacted", label: "Contacted", icon: Clock },
  { id: "resolved", label: "Resolved", icon: CheckCircle },
  { id: "archived", label: "Archived", icon: Archive },
];

export default function InquiriesDashboard({ initialInquiries }: InquiriesDashboardProps) {
  const [inquiries, setInquiries] = useState(initialInquiries);
  const [activeTab, setActiveTab] = useState("all");

  const handleStatusChange = (id: string, newStatus: string) => {
    setInquiries((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
    );
  };

  const filteredInquiries = inquiries.filter((inq) => {
    if (activeTab === "all") return true;
    if (activeTab === "new") return inq.status === "new" || !inq.status;
    return inq.status === activeTab;
  });

  return (
    <div className="space-y-6">
      {/* ── Tabs Navigation ── */}
      <div className="flex overflow-x-auto gap-2 bg-white p-2 rounded-xl border border-[#EAE8E2] shadow-xs">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          const count = inquiries.filter((inq) => {
            if (tab.id === "all") return true;
            if (tab.id === "new") return inq.status === "new" || !inq.status;
            return inq.status === tab.id;
          }).length;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? "bg-[#1C130D] text-white shadow-xs"
                  : "text-[#7A6E65] hover:bg-[#F7F4F0] hover:text-[#1C130D]"
              }`}
            >
              <tab.icon size={14} className={isActive ? "text-[#E0AB76]" : "text-[#999999]"} />
              <span>{tab.label}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-[#F7F4F0] text-[#7A6E65]"
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Inquiries List ── */}
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {filteredInquiries.length > 0 ? (
            filteredInquiries.map((inquiry) => (
              <InquiryCard
                key={inquiry.id}
                inquiry={inquiry}
                onStatusChange={handleStatusChange}
              />
            ))
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="bg-white rounded-xl border border-[#EAE8E2] p-16 text-center shadow-xs"
            >
              <div className="w-12 h-12 rounded-full bg-[#F7F4F0] text-[#8A572A] mx-auto flex items-center justify-center mb-3">
                <Inbox size={22} />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#1C130D]">
                No inquiries in this folder
              </h3>
              <p className="text-xs text-[#7A6E65] max-w-sm mx-auto mt-1">
                Incoming quote requests and website inquiries will show up here.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
