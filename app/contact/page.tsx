// app/contact/page.tsx
"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/config/site";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Living Room",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.phone) {
      toast.error("Please provide your phone number");
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Inquiry received! Our artisan will contact you shortly.");

      const waMsg = encodeURIComponent(
        `Hello ${SITE_CONFIG.name},\nName: ${formData.name}\nPhone: ${formData.phone}\nInterested In: ${formData.category}\nRequirements: ${formData.message}`
      );
      window.open(`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${waMsg}`, "_blank");
    }, 500);
  };

  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-container">
        
        {/* Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <span className="eyebrow text-[#7A4E2D]">Get in Touch</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#141414] leading-tight tracking-tight">
            Discuss Custom Orders & Visits.
          </h1>
          <p className="text-base text-[#555555] font-light leading-relaxed">
            Connect directly with our master woodcraft studio in Nilambur for bespoke furniture commissions, architectural floor plan quotes, or showroom appointments.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column: Clean Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAFAF9] p-8 md:p-12 rounded-xs border border-[#EBEBEA]">
            <h2 className="text-2xl font-serif font-bold text-[#141414] mb-6">
              Request a Quotation
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-white border border-[#E0E0DE] rounded-xs px-4 py-3 text-sm text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
                    Phone / WhatsApp *
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 XXXXXXXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-white border border-[#E0E0DE] rounded-xs px-4 py-3 text-sm text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="yourname@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white border border-[#E0E0DE] rounded-xs px-4 py-3 text-sm text-[#141414] focus:outline-none focus:border-[#141414]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
                    Category of Interest
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-white border border-[#E0E0DE] rounded-xs px-4 py-3 text-sm text-[#141414] focus:outline-none focus:border-[#141414]"
                  >
                    <option value="Living Room">Living Room (Sofas, Diwans, Tables)</option>
                    <option value="Dining Suites">Dining Suites (6 to 12-Seater Tables)</option>
                    <option value="Bedroom">Bedroom (Teak Cots, Wardrobes)</option>
                    <option value="Doors & Frames">Carved Teak Doors & Frames</option>
                    <option value="Chairs & Accent">Chairs & Planter Easy Chairs</option>
                    <option value="Custom Woodwork">Custom Architectural Woodwork</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#333333] mb-2">
                  Requirements / Custom Dimensions
                </label>
                <textarea
                  rows={4}
                  placeholder="Describe your furniture requirements, room dimensions, or custom design ideas..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-white border border-[#E0E0DE] rounded-xs px-4 py-3 text-sm text-[#141414] focus:outline-none focus:border-[#141414]"
                ></textarea>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full sm:w-auto"
                >
                  <span>{isSubmitting ? "Sending..." : "Submit Inquiry"}</span>
                </button>

                <a
                  href={SITE_CONFIG.contact.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <MessageCircle size={15} className="text-[#25D366]" />
                  <span>Instant WhatsApp Chat</span>
                </a>
              </div>
            </form>
          </div>

          {/* Right Column: Workshop & Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-[#141414]">
                Workshop & Experience Center
              </h3>
              <p className="text-sm text-[#555555] font-light leading-relaxed">
                Visit our Nilambur workshop to inspect timber seasoning, traditional mortise joints, and finished heirloom collections.
              </p>
            </div>

            <div className="space-y-4 text-sm text-[#444444] border-t border-[#EBEBEA] pt-6">
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-[#7A4E2D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#141414] block mb-0.5">Address</strong>
                  <span>{SITE_CONFIG.contact.address.full}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone size={18} className="text-[#7A4E2D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#141414] block mb-0.5">Telephone</strong>
                  <a href={`tel:${SITE_CONFIG.contact.phone}`} className="hover:text-[#141414]">
                    {SITE_CONFIG.contact.phoneDisplay}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail size={18} className="text-[#7A4E2D] flex-shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#141414] block mb-0.5">Email</strong>
                  <a href={`mailto:${SITE_CONFIG.contact.email}`} className="hover:text-[#141414]">
                    {SITE_CONFIG.contact.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Simple Map Placeholder */}
            <div className="rounded-xs overflow-hidden border border-[#EBEBEA] bg-[#FAFAF9] aspect-[16/10] relative">
              <iframe
                title="Nilambur Teak Heritage Showroom Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15655.45785565191!2d76.220!3d11.277!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63a32f0c1cbb1%3A0x868bceef7cf1e4a!2sNilambur%2C%20Kerala!5e0!3m2!1sen!2sin!4v1680000000000!5m2!1sen!2sin"
                className="w-full h-full border-0"
                loading="lazy"
              ></iframe>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
