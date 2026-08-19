// components/ui/WhatsAppFloating.tsx
"use client";

import { MessageCircle, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { SITE_CONFIG } from "@/config/site";

export default function WhatsAppFloating() {
  const [isExpanded, setIsExpanded] = useState(false);
  const phoneNumber = SITE_CONFIG.contact.whatsappNumber;
  const message = `Hello ${SITE_CONFIG.name}, I'd like to enquire about your 100% genuine Nilambur teak wood furniture and custom quotes.`;

  return (
    <>
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100]"
            />

            {/* Expanded Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="fixed bottom-24 md:bottom-28 right-4 md:right-6 z-[102] w-80 bg-white rounded-3xl shadow-2xl border border-[#EAEAEA] overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#25D366] p-4 relative text-white">
                <button
                  onClick={() => setIsExpanded(false)}
                  className="absolute top-3 right-3 text-white/80 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={20} />
                </button>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                    <MessageCircle size={22} className="text-white" fill="white" />
                  </div>
                  <div>
                    <h3 className="text-white font-bold text-sm">{SITE_CONFIG.name}</h3>
                    <p className="text-white/80 text-xs">Nilambur Teak Specialists</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4 text-left">
                <p className="text-xs text-[#555555] leading-relaxed">
                  Looking for custom dimensions or genuine Nilambur teak pricing? Connect with our master craftsmen directly.
                </p>

                {/* Quick Actions */}
                <div className="space-y-2">
                  <a
                    href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full bg-[#25D366] hover:bg-[#1EBE5B] text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow-sm cursor-pointer"
                  >
                    <MessageCircle size={16} />
                    Chat on WhatsApp
                  </a>

                  <a
                    href={`tel:${SITE_CONFIG.contact.phone}`}
                    className="flex items-center justify-center gap-2 w-full bg-[#111111] hover:bg-[#333333] text-white py-3.5 px-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    <Phone size={15} />
                    Call Studio
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Clean Circular WhatsApp Floating Icon Button */}
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="fixed bottom-20 right-3.5 sm:bottom-6 sm:right-6 z-[85] group cursor-pointer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 260, damping: 20 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Contact Nilambur Teak Heritage on WhatsApp"
      >
        <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] hover:bg-[#20BA5A] text-white flex items-center justify-center shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-all">
          <MessageCircle size={28} fill="currentColor" />
        </div>
      </motion.button>
    </>
  );
}