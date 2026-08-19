"use client";

import { useState } from "react";
import { saveFooterSettings } from "@/app/actions/cms";
import { toast } from "sonner";
import { 
  Phone, 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Instagram, 
  Facebook, 
  Youtube, 
  Sparkles, 
  Save, 
  ExternalLink,
  Compass
} from "lucide-react";
import { SITE_CONFIG } from "@/config/site";

interface FooterSettingsClientProps {
  initialSettings: any;
}

export default function FooterSettingsClient({ initialSettings }: FooterSettingsClientProps) {
  const [isPending, setIsPending] = useState(false);

  const [formData, setFormData] = useState({
    brand_name: initialSettings?.brand_name || "Nilambur Teak Heritage",
    brand_tagline: initialSettings?.brand_tagline || "Dealers In: Wooden Furniture & Building Materials",
    phone: initialSettings?.phone || SITE_CONFIG.contact.phone,
    phone_display: initialSettings?.phone_display || SITE_CONFIG.contact.phoneDisplay,
    whatsapp: initialSettings?.whatsapp || "+918591221994",
    email: initialSettings?.email || SITE_CONFIG.contact.email,
    address: initialSettings?.address || "Koolikkal, Mampad P.O., Malappuram Dist., Kerala - 676542",
    timing_weekdays: initialSettings?.timing_weekdays || "Mon – Sat: 9:00 AM – 7:30 PM",
    timing_sunday: initialSettings?.timing_sunday || "Sunday: By Prior Appointment",
    instagram_url: initialSettings?.instagram_url || SITE_CONFIG.social.instagram,
    facebook_url: initialSettings?.facebook_url || SITE_CONFIG.social.facebook,
    youtube_url: initialSettings?.youtube_url || SITE_CONFIG.social.youtube,
    pinterest_url: initialSettings?.pinterest_url || "https://pinterest.com/nilamburteakheritage",
    map_embed_url: initialSettings?.map_embed_url || SITE_CONFIG.contact.address.googleMapsEmbedUrl,
    map_directions_url: initialSettings?.map_directions_url || SITE_CONFIG.contact.address.googleMapsDirectionsUrl,
    copyright_text: initialSettings?.copyright_text || `© ${new Date().getFullYear()} Nilambur Teak Heritage™. All Rights Reserved.`,
    badge_text: initialSettings?.badge_text || "Crafted in Kerala, Delivered Across India",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsPending(true);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, val]) => {
        data.append(key, val as string);
      });

      const res = await saveFooterSettings(data);
      if (res?.error) {
        toast.error(res.error);
      } else {
        toast.success("Footer & contact settings saved successfully!");
      }
    } catch (err: any) {
      toast.error(err.message || "Failed to save footer settings");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="space-y-8 font-sans pb-12">
      
      {/* ── Top Header Banner ── */}
      <div className="bg-[#120E0A] p-6 sm:p-8 rounded-3xl text-white border border-[#2B221B] shadow-xl relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#2A1E14] border border-[#8A572A]/40 text-[#E5B56E] text-[10px] sm:text-xs font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E5B56E] animate-pulse" />
            <span>GLOBAL FOOTER CMS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-cinzel font-bold text-white tracking-tight">
            Footer & Contact Manager
          </h1>
          <p className="text-xs sm:text-sm text-[#C8BFB5] font-light max-w-xl">
            Update workshop contact details, phone numbers, WhatsApp link, physical address, and social media channels displayed on the website footer.
          </p>
        </div>

        <div className="flex items-center gap-3 relative z-10 shrink-0">
          <a
            href="/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-xl text-xs font-semibold backdrop-blur-md border border-white/15 transition-colors"
          >
            <ExternalLink size={13} />
            <span>View Live Footer</span>
          </a>
        </div>
      </div>

      {/* ── Form ── */}
      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Editable Fields */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Card 1: Primary Contact Information */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#8A572A] flex items-center justify-center">
                <Phone size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-cinzel">
                  Direct Contact & Communication
                </h3>
                <p className="text-[11px] text-slate-500">Phone numbers, WhatsApp and email addresses</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Phone (Dialing) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone (Dialing Number)
                </label>
                <input
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+918591221994"
                  className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Used for direct click-to-call link</span>
              </div>

              {/* Phone (Display Text) */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Phone (Display Text)
                </label>
                <input
                  type="text"
                  value={formData.phone_display}
                  onChange={(e) => setFormData({ ...formData, phone_display: e.target.value })}
                  placeholder="+91 85912 21994"
                  className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
                <span className="text-[10px] text-slate-400 mt-1 block">Visible formatted number in footer</span>
              </div>

              {/* WhatsApp Number */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  WhatsApp Number
                </label>
                <input
                  type="text"
                  value={formData.whatsapp}
                  onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                  placeholder="+918591221994"
                  className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Official Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="nilambur.teak.heritage@gmail.com"
                  className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card 2: Workshop Location & Timings */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#8A572A] flex items-center justify-center">
                <MapPin size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-cinzel">
                  Workshop Address & Working Hours
                </h3>
                <p className="text-[11px] text-slate-500">Physical atelier address in Kerala</p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Address */}
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Workshop & Atelier Address
                </label>
                <textarea
                  rows={2}
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="Koolikkal, Mampad P.O., Malappuram Dist., Kerala - 676542"
                  className="w-full bg-[#FAF9F7] border border-slate-200 p-3 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Weekday Timings */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Weekday Hours (Mon – Sat)
                  </label>
                  <input
                    type="text"
                    value={formData.timing_weekdays}
                    onChange={(e) => setFormData({ ...formData, timing_weekdays: e.target.value })}
                    placeholder="Mon – Sat: 9:00 AM – 7:30 PM"
                    className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                  />
                </div>

                {/* Sunday Timings */}
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Sunday / Holiday Schedule
                  </label>
                  <input
                    type="text"
                    value={formData.timing_sunday}
                    onChange={(e) => setFormData({ ...formData, timing_sunday: e.target.value })}
                    placeholder="Sunday: By Prior Appointment"
                    className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                  />
                </div>
              </div>

              {/* Google Maps Embed & Directions */}
              <div className="space-y-4 pt-2 border-t border-slate-100">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Google Maps Embed URL (Iframe Src)
                  </label>
                  <textarea
                    rows={2}
                    value={formData.map_embed_url}
                    onChange={(e) => setFormData({ ...formData, map_embed_url: e.target.value })}
                    placeholder="https://www.google.com/maps/embed?pb=..."
                    className="w-full bg-[#FAF9F7] border border-slate-200 p-3 text-xs text-slate-900 font-mono rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                  />
                  <span className="text-[10px] text-slate-400 mt-1 block">The embed iframe URL for the interactive map</span>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Google Maps Directions Link
                  </label>
                  <input
                    type="text"
                    value={formData.map_directions_url}
                    onChange={(e) => setFormData({ ...formData, map_directions_url: e.target.value })}
                    placeholder="https://maps.google.com/?q=11.2300958,76.1725671"
                    className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-mono rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Social Media Profiles */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#8A572A] flex items-center justify-center">
                <Instagram size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-cinzel">
                  Social Media Links
                </h3>
                <p className="text-[11px] text-slate-500">Links to official brand profiles</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Instagram Profile URL
                </label>
                <input
                  type="url"
                  value={formData.instagram_url}
                  onChange={(e) => setFormData({ ...formData, instagram_url: e.target.value })}
                  placeholder="https://instagram.com/nilambur_teak_heritage"
                  className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Facebook Page URL
                </label>
                <input
                  type="url"
                  value={formData.facebook_url}
                  onChange={(e) => setFormData({ ...formData, facebook_url: e.target.value })}
                  placeholder="https://facebook.com/nilamburteakheritage"
                  className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  YouTube Channel URL
                </label>
                <input
                  type="url"
                  value={formData.youtube_url}
                  onChange={(e) => setFormData({ ...formData, youtube_url: e.target.value })}
                  placeholder="https://youtube.com/@nilamburteakheritage"
                  className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Pinterest URL
                </label>
                <input
                  type="url"
                  value={formData.pinterest_url}
                  onChange={(e) => setFormData({ ...formData, pinterest_url: e.target.value })}
                  placeholder="https://pinterest.com/nilamburteakheritage"
                  className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
              </div>
            </div>
          </div>

          {/* Card 4: Brand Badges & Copyright */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
            <div className="flex items-center gap-2.5 pb-4 border-b border-slate-100">
              <div className="w-9 h-9 rounded-xl bg-amber-50 text-[#8A572A] flex items-center justify-center">
                <Sparkles size={18} />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 font-cinzel">
                  Brand Tagline & Copyright
                </h3>
                <p className="text-[11px] text-slate-500">Subtitle and bottom attribution text</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Brand Business Subtitle
                </label>
                <input
                  type="text"
                  value={formData.brand_tagline}
                  onChange={(e) => setFormData({ ...formData, brand_tagline: e.target.value })}
                  placeholder="Dealers In: Wooden Furniture & Building Materials"
                  className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Copyright Notice
                  </label>
                  <input
                    type="text"
                    value={formData.copyright_text}
                    onChange={(e) => setFormData({ ...formData, copyright_text: e.target.value })}
                    placeholder="© 2026 Nilambur Teak Heritage™. All Rights Reserved."
                    className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Delivery Origin Badge
                  </label>
                  <input
                    type="text"
                    value={formData.badge_text}
                    onChange={(e) => setFormData({ ...formData, badge_text: e.target.value })}
                    placeholder="Crafted in Kerala, Delivered Across India"
                    className="w-full bg-[#FAF9F7] border border-slate-200 px-4 py-2.5 text-xs text-slate-900 font-medium rounded-xl focus:outline-none focus:border-[#8A572A] focus:bg-white transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex items-center justify-center gap-2 bg-[#8A572A] hover:bg-[#1C130D] text-white text-xs font-bold uppercase tracking-wider px-8 py-4 rounded-xl shadow-lg transition-all active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <Save size={16} />
              <span>{isPending ? "Saving Footer Settings..." : "Save Footer Settings"}</span>
            </button>
          </div>

        </div>

        {/* Right Column: Live Footer Preview Snippet */}
        <div className="lg:col-span-4 space-y-6">
          <div className="sticky top-24 space-y-6">
            
            {/* Live Preview Card */}
            <div className="bg-[#0F0A06] rounded-3xl p-6 border border-[#251A10] text-[#D8D2C9] space-y-5 shadow-xl">
              <div className="flex items-center justify-between pb-3 border-b border-[#24190F]">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#E5B56E]">
                  LIVE FOOTER PREVIEW
                </span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              </div>

              {/* Brand Preview */}
              <div>
                <h4 className="text-sm font-bold font-cinzel text-[#E5B56E]">
                  {formData.brand_name}
                </h4>
                <p className="text-[9px] font-bold uppercase tracking-wider text-amber-200/60 mt-0.5">
                  {formData.brand_tagline}
                </p>
              </div>

              {/* Address Preview */}
              <div className="space-y-1 text-[11px] text-[#A89E92] leading-relaxed pt-1">
                <p className="flex items-start gap-1.5 text-white/90">
                  <MapPin size={13} className="text-[#E5B56E] shrink-0 mt-0.5" />
                  <span>{formData.address}</span>
                </p>
                <p className="pt-1.5">
                  <span className="text-[#E5B56E] font-semibold">Phone:</span> {formData.phone_display}
                </p>
                <p>
                  <span className="text-[#E5B56E] font-semibold">Email:</span> {formData.email}
                </p>
                <p className="text-[10px] text-slate-400 pt-1">
                  🕒 {formData.timing_weekdays}
                </p>
              </div>

              {/* Action Buttons Preview */}
              <div className="pt-2 space-y-2">
                <div className="p-2.5 bg-[#25D366]/20 border border-[#25D366]/30 rounded-xl text-[11px] font-bold text-emerald-400 flex items-center justify-center gap-2">
                  <MessageCircle size={14} />
                  <span>WhatsApp: {formData.whatsapp}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-[#24190F] text-center text-[10px] text-slate-400">
                {formData.copyright_text}
              </div>
            </div>

            {/* Quick Tips */}
            <div className="bg-amber-50/70 rounded-2xl p-5 border border-amber-200/60 text-xs text-amber-900 space-y-2">
              <span className="font-bold block uppercase text-[10px] tracking-wider text-amber-800">
                💡 Instant Updates
              </span>
              <p className="text-[11px] leading-relaxed text-amber-800/90 font-light">
                Changes saved here immediately update the website footer across all pages (Home, About, Products, Contact).
              </p>
            </div>

          </div>
        </div>

      </form>
    </div>
  );
}
