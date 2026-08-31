// app/contact/page.tsx
"use client";

import { useState } from "react";
import { MessageCircle, Phone, Mail, MapPin, Send, Instagram, ExternalLink, Navigation, Clock, CheckCircle2, RefreshCw } from "lucide-react";
import { toast } from "sonner";
import { SITE_CONFIG } from "@/config/site";
import { submitInquiry } from "@/app/actions/contact";
import { createClient } from "@/lib/supabase";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{ name: string; phone: string; category: string } | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    category: "Living Room (Sofas, Diwans, Tables)",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = formData.name.trim();
    const cleanPhone = formData.phone.trim();

    if (!cleanName) {
      toast.error("Please enter your full name");
      return;
    }
    if (!cleanPhone) {
      toast.error("Please provide your phone or WhatsApp number");
      return;
    }

    setIsSubmitting(true);
    try {
      // 1. Direct Supabase Client Insertion for 100% instant client-side reliability
      let saved = false;
      try {
        const supabase = createClient();
        const { error: dbError } = await supabase
          .from("inquiries")
          .insert([
            {
              full_name: cleanName,
              phone: cleanPhone,
              email: formData.email.trim() || null,
              interest_category: formData.category || null,
              subject: formData.category ? `Enquiry: ${formData.category}` : "Bespoke Quotation Request",
              message: formData.message.trim() || "Customer submitted quotation enquiry on website.",
              status: "new",
            },
          ]);

        if (!dbError) {
          saved = true;
        }
      } catch (clientErr) {
        console.warn("Client insertion notice, trying server action:", clientErr);
      }

      // 2. Fallback to Server Action if needed
      if (!saved) {
        const res = await submitInquiry({
          name: cleanName,
          phone: cleanPhone,
          email: formData.email,
          category: formData.category,
          message: formData.message,
        });

        if (res?.error) {
          toast.error(res.error);
          setIsSubmitting(false);
          return;
        }
      }

      // Store submitted data for confirmation screen
      setSubmittedData({
        name: cleanName,
        phone: cleanPhone,
        category: formData.category,
      });
      setIsSubmitted(true);
      toast.success("Enquiry submitted successfully! Our team will contact you shortly.");

      // Reset form fields
      setFormData({
        name: "",
        phone: "",
        email: "",
        category: "Living Room (Sofas, Diwans, Tables)",
        message: "",
      });
    } catch (err) {
      console.error("Submission error:", err);
      toast.error("Something went wrong. Please connect with us directly on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#FCFAF8] py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14 space-y-3">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            GET IN TOUCH WITH MASTER ARTISANS
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-sans font-extrabold text-[#111111] leading-tight tracking-tight">
            Discuss Custom Orders &{" "}
            <span className="text-[#8A572A] italic font-sans font-extrabold ml-1">
              Showroom Visits
            </span>
          </h1>
          <p className="text-sm sm:text-base text-slate-600 font-normal leading-relaxed">
            Connect directly with our master woodcraft studio in Mampad, Nilambur for bespoke furniture commissions, architectural floor plan quotes, or material inspection appointments.
          </p>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          
          {/* Left Column: Clean Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)]">
            <h2 className="text-xl sm:text-2xl font-bold font-sans text-slate-900 mb-2">
              Request a Bespoke Quotation
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mb-8 font-normal">
              Fill in your requirement below or chat instantly with our craftsmen via WhatsApp.
            </p>

            {isSubmitted ? (
              <div className="py-8 px-2 sm:px-4 text-center space-y-6 animate-in fade-in zoom-in duration-300">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-sm">
                  <CheckCircle2 size={36} />
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-[#8A572A] block">
                    Enquiry Registered Successfully
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 font-sans">
                    Thank You, {submittedData?.name}!
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                    Your bespoke furniture enquiry has been recorded in our workshop system. Our master craftsmen will review your requirement and reach out to you directly at <strong className="text-slate-900 font-semibold">{submittedData?.phone}</strong>.
                  </p>
                </div>

                <div className="bg-[#FAF9F7] p-4 sm:p-5 rounded-2xl border border-slate-200/80 max-w-md mx-auto text-left space-y-2.5 text-xs">
                  <div className="flex justify-between text-slate-600">
                    <span>Category:</span>
                    <strong className="text-slate-900">{submittedData?.category}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-600 pt-1 border-t border-slate-200/60">
                    <span>CRM Status:</span>
                    <span className="text-emerald-700 font-bold uppercase tracking-wider bg-emerald-50 px-2.5 py-0.5 rounded-md border border-emerald-200 text-[10px]">
                      Received & Logged
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
                      `*New Enquiry Follow-up — Nilambur Teak Heritage*\n\n*Name:* ${submittedData?.name}\n*Phone:* ${submittedData?.phone}\n*Category:* ${submittedData?.category}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all shadow-md active:scale-95"
                  >
                    <MessageCircle size={16} />
                    <span>Connect on WhatsApp Now</span>
                  </a>

                  <button
                    type="button"
                    onClick={() => setIsSubmitted(false)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold uppercase tracking-wider px-6 py-3.5 rounded-xl transition-all cursor-pointer"
                  >
                    <RefreshCw size={14} />
                    <span>Submit Another Enquiry</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2 font-sans">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-[#FBFBFA] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2 font-sans">
                      Phone / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 88912 21994"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-[#FBFBFA] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2 font-sans">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="yourname@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-[#FBFBFA] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2 font-sans">
                      Category of Interest
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full bg-[#FBFBFA] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                    >
                      <option value="Living Room (Sofas, Diwans, Tables)">Living Room (Sofas, Diwans, Tables)</option>
                      <option value="Dining Suites (4, 6, 8, 10-Seater Tables)">Dining Suites (4, 6, 8, 10-Seater Tables)</option>
                      <option value="Bedroom (King/Queen Cots, Wardrobes)">Bedroom (King/Queen Cots, Wardrobes)</option>
                      <option value="Chairs & Lounge Seating">Chairs & Lounge Seating</option>
                      <option value="Sitout & Veranda Furniture">Sitout & Veranda Furniture</option>
                      <option value="Kitchen (Modular Cabinets, Crockery Units)">Kitchen (Modular Cabinets, Crockery Units)</option>
                      <option value="Carved Teak Doors & Frames">Carved Teak Doors & Frames</option>
                      <option value="Other Furniture & Bespoke Enquiries">Other Furniture & Bespoke Enquiries</option>
                      <option value="Full Villa Custom Woodwork">Full Villa Custom Woodwork</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2 font-sans">
                    Custom Requirements & Dimensions
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Describe your desired timber finish, room dimensions, or specific design preferences..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-[#FBFBFA] border border-slate-200 rounded-xl px-4 py-3.5 text-sm text-slate-900 focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all resize-none"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3.5 pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#8A572A] hover:bg-[#1C130D] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                  >
                    <Send size={15} />
                    <span>{isSubmitting ? "Sending..." : "Submit Enquiry"}</span>
                  </button>

                  <a
                    href={SITE_CONFIG.contact.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
                  >
                    <MessageCircle size={17} />
                    <span>Instant WhatsApp (+91 88912 21994)</span>
                  </a>
                </div>
              </form>
            )}
          </div>

          {/* Right Column: Workshop & Contact Information (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Business Details Card */}
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] block mb-1">
                  OFFICIAL BUSINESS LOCATION
                </span>
                <h3 className="text-xl font-bold font-sans text-slate-900">
                  {SITE_CONFIG.contact.address.businessName}
                </h3>
                <p className="text-[11px] font-bold tracking-wider text-slate-500 uppercase mt-0.5">
                  {SITE_CONFIG.contact.address.tagline}
                </p>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-slate-600 border-t border-slate-100 pt-5">
                {/* Address (Clickable Map Link) */}
                <a
                  href={SITE_CONFIG.contact.address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-3.5 group cursor-pointer"
                >
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/60 text-[#8A572A] flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-[#8A572A] group-hover:text-white transition-colors">
                    <MapPin size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <strong className="text-slate-900 block font-semibold mb-0.5 group-hover:text-[#8A572A] transition-colors">
                        Showroom & Workshop
                      </strong>
                      <span className="text-[10px] text-[#8A572A] font-bold uppercase tracking-wider underline">
                        View Map ↗
                      </span>
                    </div>
                    <span className="leading-relaxed block text-slate-600 group-hover:text-slate-900 transition-colors">
                      KOOLIKKAL, MAMPAD P.O.,<br />
                      MALAPPURAM DIST., KERALA - 676542
                    </span>
                  </div>
                </a>

                {/* Direct Telephone & WhatsApp */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/60 text-[#8A572A] flex items-center justify-center shrink-0 mt-0.5">
                    <Phone size={16} />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Call / WhatsApp</strong>
                    <a
                      href={`tel:${SITE_CONFIG.contact.phone}`}
                      className="text-base font-bold text-[#8A572A] hover:underline"
                    >
                      {SITE_CONFIG.contact.phoneDisplay}
                    </a>
                  </div>
                </div>

                {/* Email Address */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-200/60 text-[#8A572A] flex items-center justify-center shrink-0 mt-0.5">
                    <Mail size={16} />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Email Support</strong>
                    <a
                      href={`mailto:${SITE_CONFIG.contact.email}`}
                      className="text-xs font-bold text-[#8A572A] hover:underline"
                    >
                      {SITE_CONFIG.contact.email}
                    </a>
                  </div>
                </div>

                {/* Instagram */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-50 border border-rose-200/60 text-[#E1306C] flex items-center justify-center shrink-0 mt-0.5">
                    <Instagram size={16} />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Official Instagram</strong>
                    <a
                      href={SITE_CONFIG.social.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#8A572A] hover:underline inline-flex items-center gap-1"
                    >
                      <span>@nilambur_teak_heritage</span>
                      <ExternalLink size={12} />
                    </a>
                  </div>
                </div>

                {/* Working Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 text-slate-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock size={16} />
                  </div>
                  <div>
                    <strong className="text-slate-900 block font-semibold mb-0.5">Operating Hours</strong>
                    <span className="text-slate-600">{SITE_CONFIG.contact.hours.weekdays}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Interactive Map Preview Card */}
            <div className="bg-white p-4 sm:p-5 rounded-3xl border border-slate-200/80 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-3">
              <div className="flex items-center justify-between px-1 pt-1">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-800 block">
                    Workshop Location
                  </span>
                  <span className="text-[10px] text-slate-500 font-medium">
                    Koolikkal, Mampad (Nilambur)
                  </span>
                </div>
                <a
                  href={SITE_CONFIG.contact.address.googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-white bg-[#8A572A] hover:bg-[#1C130D] px-3.5 py-1.5 rounded-full shadow-xs inline-flex items-center gap-1.5 transition-colors"
                >
                  <Navigation size={12} />
                  <span>Get Directions</span>
                </a>
              </div>

              <div className="rounded-2xl overflow-hidden border border-slate-200 relative w-full h-60 sm:h-72 group">
                <iframe
                  title="Nilambur Teak Heritage Mampad Location"
                  src={SITE_CONFIG.contact.address.googleMapsEmbedUrl}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                ></iframe>

                {/* Mobile Floating Direct Action Button */}
                <div className="absolute bottom-3 right-3 pointer-events-auto z-10">
                  <a
                    href={SITE_CONFIG.contact.address.googleMapsDirectionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/95 hover:bg-white text-slate-900 border border-slate-300 text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-md inline-flex items-center gap-1.5 backdrop-blur-xs transition-transform active:scale-95"
                  >
                    <ExternalLink size={12} className="text-[#8A572A]" />
                    <span>Open in Maps</span>
                  </a>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </main>
  );
}
