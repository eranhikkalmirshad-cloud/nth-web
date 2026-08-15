// components/ui/ContactQuickActions.tsx
"use client";

import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { SITE_CONFIG } from "@/config/site";

export default function ContactQuickActions() {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 0.6 }}
      className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
    >
      <div className="bg-[#2C1810] border-t border-[#D4A96A]/30 text-[#F5ECD7] shadow-2xl">
        <div className="grid grid-cols-4 divide-x divide-[#D4A96A]/20">
          {/* WhatsApp */}
          <a
            href={SITE_CONFIG.contact.whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-3 hover:bg-[#4A7C59] transition-colors group"
          >
            <MessageCircle size={18} className="mb-1 text-[#25D366] group-hover:text-white" />
            <span className="text-[10px] font-bold uppercase tracking-wider">WhatsApp</span>
          </a>

          {/* Call */}
          <a
            href={`tel:${SITE_CONFIG.contact.phone}`}
            className="flex flex-col items-center justify-center py-3 hover:bg-[#5C3D1E] transition-colors group"
          >
            <Phone size={18} className="mb-1 text-[#E8B84B] group-hover:text-white" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Call</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:${SITE_CONFIG.contact.email}`}
            className="flex flex-col items-center justify-center py-3 hover:bg-[#5C3D1E] transition-colors group"
          >
            <Mail size={18} className="mb-1 text-[#D4A96A] group-hover:text-white" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Email</span>
          </a>

          {/* Location */}
          <a
            href="https://maps.google.com/?q=Nilambur"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-3 hover:bg-[#5C3D1E] transition-colors group"
          >
            <MapPin size={18} className="mb-1 text-[#C9922A] group-hover:text-white" />
            <span className="text-[10px] font-bold uppercase tracking-wider">Nilambur</span>
          </a>
        </div>
      </div>
    </motion.div>
  );
}