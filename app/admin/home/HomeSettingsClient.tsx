// app/admin/home/HomeSettingsClient.tsx
"use client";

import { useState, useRef } from "react";
import { 
  Image as ImageIcon, 
  Settings, 
  Instagram, 
  Plus, 
  Trash2, 
  Save, 
  Layers, 
  ArrowRight,
  ExternalLink,
  PlusCircle,
  LayoutGrid,
  Sparkles,
  CheckCircle2,
  Upload,
  Loader2,
  X,
  Landmark,
  ShieldCheck,
  Leaf,
  Users
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { HomepageSection, HeroSlide, InstagramPost, Categories } from "@/lib/types";
import { 
  saveHomepageSection, 
  updateFeaturedCategories, 
  deleteInstagramPost, 
  saveInstagramPost, 
  saveHeroSlide, 
  deleteHeroSlide,
  uploadImage
} from "@/app/actions/cms";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

interface Props {
  initialSections: HomepageSection[];
  heroSlides: HeroSlide[];
  categories: Categories[];
  instagramPosts: InstagramPost[];
}

export default function HomeSettingsClient({ 
  initialSections, 
  heroSlides, 
  categories, 
  instagramPosts 
}: Props) {
  const [activeTab, setActiveTab] = useState<"hero" | "legacy_heritage" | "elite" | "custom_woodwork" | "instagram">("legacy_heritage");
  const [sections, setSections] = useState<HomepageSection[]>(initialSections);

  // ─── TABS DEFINITION ───
  const tabs = [
    { id: "hero", label: "Hero Video & Banner", icon: ImageIcon },
    { id: "legacy_heritage", label: "Heritage & Excellence", icon: Landmark },
    { id: "elite", label: "Elite Collections", icon: LayoutGrid },
    { id: "custom_woodwork", label: "Custom Woodwork & Doors", icon: Layers },
    { id: "instagram", label: "Instagram Gallery", icon: Instagram },
  ] as const;

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-xs min-h-[600px] flex flex-col md:flex-row overflow-hidden">
      
      {/* Sidebar Tabs */}
      <div className="w-full md:w-64 bg-[#FAF9F7] border-r border-slate-200 py-6 flex flex-col">
        <div className="px-6 mb-6">
          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Content Sections</span>
        </div>
        
        <div className="flex-1 space-y-1">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3.5 px-6 py-3.5 transition-all relative text-left cursor-pointer ${
                  isActive 
                    ? "bg-white text-[#1C130D] font-bold border-y border-slate-200 shadow-[4px_0_0_#8A572A_inset]" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-100/60"
                }`}
              >
                <tab.icon size={17} className={isActive ? "text-[#8A572A]" : "text-slate-400"} />
                <span className="text-[11px] font-bold uppercase tracking-wider">{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="p-6 mt-auto border-t border-slate-200/60">
          <Link 
            href="/" 
            target="_blank"
            className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-wider text-[#8A572A] hover:underline"
          >
            <span>Live Site Preview</span>
            <ExternalLink size={12} />
          </Link>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-6 md:p-10 bg-white">
        <AnimatePresence mode="wait">
          {activeTab === "hero" && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <HeroManagement 
                slides={heroSlides} 
                onSaveSuccess={() => toast.success("Hero slides updated successfully.")} 
              />
            </motion.div>
          )}

          {activeTab === "legacy_heritage" && (
            <motion.div
              key="legacy_heritage"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <LegacyHeritageEditor 
                sections={sections}
                onSaved={(updated) => {
                  setSections((prev) => {
                    const idx = prev.findIndex((s) => s.section_key === updated.section_key);
                    if (idx > -1) {
                      const copy = [...prev];
                      copy[idx] = updated;
                      return copy;
                    }
                    return [...prev, updated];
                  });
                  toast.success("Legacy of Excellence section updated!");
                }}
              />
            </motion.div>
          )}

          {activeTab === "elite" && (
            <motion.div
              key="elite"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <EliteCategorySelector categories={categories} />
            </motion.div>
          )}

          {activeTab === "custom_woodwork" && (
            <motion.div
              key="custom_woodwork"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <CustomWoodworkEditor 
                sections={sections}
                onSaved={(updated) => {
                  setSections((prev) => {
                    const idx = prev.findIndex((s) => s.section_key === updated.section_key);
                    if (idx > -1) {
                      const copy = [...prev];
                      copy[idx] = updated;
                      return copy;
                    }
                    return [...prev, updated];
                  });
                  toast.success("Woodwork & Doors section updated!");
                }}
              />
            </motion.div>
          )}

          {activeTab === "instagram" && (
            <motion.div
              key="instagram"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <InstagramManagement posts={instagramPosts} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}

// ─── 0. LEGACY OF EXCELLENCE / OUR HERITAGE EDITOR ───
function LegacyHeritageEditor({
  sections,
  onSaved,
}: {
  sections: HomepageSection[];
  onSaved: (section: HomepageSection) => void;
}) {
  const heritage = sections.find((s) => s.section_key === "legacy_heritage");

  const [eyebrow, setEyebrow] = useState(heritage?.subtitle || "01 — OUR HERITAGE");
  const [title, setTitle] = useState(heritage?.title || "A Legacy of Excellence.");
  const [description, setDescription] = useState(
    heritage?.description ||
      "For over 25 years, Nilambur Teak Heritage has been the benchmark for premium furniture craftsmanship in Kerala, blending traditional artistry with modern design."
  );
  const [image, setImage] = useState(heritage?.image_url || "/images/heritage-artisan.jpg");
  const [ctaText, setCtaText] = useState(heritage?.cta_text || "DISCOVER OUR STORY");
  const [ctaUrl, setCtaUrl] = useState(heritage?.cta_url || "/about");

  const badgeRaw = heritage?.mobile_image_url || "NILAMBUR TEAK|Crafted to last generations";
  const [badgeTitle, setBadgeTitle] = useState(badgeRaw.split("|")[0] || "NILAMBUR TEAK");
  const [badgeSubtitle, setBadgeSubtitle] = useState(badgeRaw.split("|")[1] || "Crafted to last generations");

  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const sampleImages = [
    { label: "Master Carver", path: "/images/heritage-artisan.jpg" },
    { label: "Teak Suite", path: "/images/og-datas/IMG_0600.PNG" },
    { label: "Dining Craft", path: "/images/og-datas/IMG_0628.PNG" },
    { label: "Lounge Armchair", path: "/images/og-datas/IMG_0452.PNG" },
  ];

  const handleDeviceUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await uploadImage(fd);
      if (res?.error) {
        toast.error(res.error);
      } else if (res?.url) {
        setImage(res.url);
        toast.success("Artisan photo uploaded successfully!");
      }
    } catch {
      toast.error("Failed to upload photo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fd = new FormData();
    fd.append("section_key", "legacy_heritage");
    fd.append("subtitle", eyebrow);
    fd.append("title", title);
    fd.append("description", description);
    fd.append("image_url", image);
    fd.append("cta_text", ctaText);
    fd.append("cta_url", ctaUrl);
    fd.append("mobile_image_url", `${badgeTitle}|${badgeSubtitle}`);

    const res = await saveHomepageSection(fd);
    setLoading(false);

    if (res?.error) {
      toast.error(res.error);
    } else {
      onSaved({
        id: heritage?.id || "legacy_heritage",
        section_key: "legacy_heritage",
        title,
        subtitle: eyebrow,
        description,
        image_url: image,
        cta_text: ctaText,
        cta_url: ctaUrl,
        mobile_image_url: `${badgeTitle}|${badgeSubtitle}`,
        video_url: null,
        is_active: true,
        updated_at: new Date().toISOString(),
      });
    }
  };

  return (
    <form onSubmit={handleSave} className="space-y-8">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] block mb-1">
          HOMEPAGE FEATURE SECTION
        </span>
        <h3 className="text-xl font-bold font-cinzel text-slate-900">
          A Legacy of Excellence (Our Heritage)
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Control the 2-column split craftsmanship story, the master artisan carving photo, and the teak seal badge.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Text & CTA Controls */}
        <div className="lg:col-span-7 space-y-5 bg-[#FAF9F7] p-6 sm:p-7 rounded-2xl border border-slate-200">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Eyebrow Tagline
            </label>
            <input
              type="text"
              required
              value={eyebrow}
              onChange={(e) => setEyebrow(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 font-bold focus:outline-none focus:border-[#8A572A]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Main Headline
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-base font-bold text-slate-900 focus:outline-none focus:border-[#8A572A]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Story Paragraph
            </label>
            <textarea
              rows={4}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 leading-relaxed focus:outline-none focus:border-[#8A572A] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                CTA Button Label
              </label>
              <input
                type="text"
                value={ctaText}
                onChange={(e) => setCtaText(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                CTA Link URL
              </label>
              <input
                type="text"
                value={ctaUrl}
                onChange={(e) => setCtaUrl(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800"
              />
            </div>
          </div>

          {/* Floating Badge Settings */}
          <div className="pt-3 border-t border-slate-200 grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Seal Badge Title
              </label>
              <input
                type="text"
                value={badgeTitle}
                onChange={(e) => setBadgeTitle(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-[#8A572A]"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                Seal Badge Subtitle
              </label>
              <input
                type="text"
                value={badgeSubtitle}
                onChange={(e) => setBadgeSubtitle(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs text-slate-700 italic"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Artisan Photo Box */}
        <div className="lg:col-span-5 space-y-5 bg-[#FAF9F7] p-6 sm:p-7 rounded-2xl border border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A572A]">
              Craftsmanship Hero Image
            </span>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleDeviceUpload}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-[#8A572A] text-[#8A572A] hover:text-white border border-amber-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            >
              {isUploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
              <span>{isUploading ? "Uploading..." : "Upload Photo"}</span>
            </button>
          </div>

          <div className="relative aspect-[16/10] w-full rounded-xl overflow-hidden bg-slate-100 border border-slate-200 shadow-xs">
            {image ? (
              <img src={image} alt="Artisan Preview" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-xs text-slate-400">No Image</div>
            )}
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Image URL / Path
            </label>
            <input
              type="text"
              required
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800 focus:outline-none focus:border-[#8A572A]"
            />
          </div>

          {/* Quick Presets */}
          <div className="pt-2 border-t border-slate-200">
            <span className="text-[10px] text-slate-400 block mb-2 font-medium">Or Pick From Presets:</span>
            <div className="grid grid-cols-4 gap-2">
              {sampleImages.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setImage(img.path)}
                  className={`relative aspect-[4/3] rounded-md overflow-hidden border transition-all cursor-pointer ${
                    image === img.path ? "border-[#8A572A] ring-2 ring-[#8A572A]/30 scale-95" : "border-slate-200 opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image src={img.path} alt={img.label} fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-[#8A572A] hover:bg-[#1C130D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2 mt-4"
          >
            <Save size={15} />
            <span>{loading ? "Saving..." : "Save Heritage Section"}</span>
          </button>
        </div>
      </div>
    </form>
  );
}

// ─── 1. CUSTOM WOODWORK & HERITAGE DOORS EDITOR ───
function CustomWoodworkEditor({ 
  sections, 
  onSaved 
}: { 
  sections: HomepageSection[]; 
  onSaved: (section: HomepageSection) => void; 
}) {
  const millwork = sections.find((s) => s.section_key === "custom_millwork");
  const doors = sections.find((s) => s.section_key === "heritage_doors");

  const [card1Image, setCard1Image] = useState(millwork?.image_url || "/images/og-datas/IMG_0600.PNG");
  const [card1Title, setCard1Title] = useState(millwork?.title || "Bespoke Teak Millwork");
  const [card1Desc, setCard1Desc] = useState(millwork?.subtitle || "Tailor-made solid teak dining tables, wall panels, and living suites created from your floor plans.");
  const [card1Cta, setCard1Cta] = useState(millwork?.cta_text || "Explore Custom Design");
  const [card1Url, setCard1Url] = useState(millwork?.cta_url || "/contact");
  const [loading1, setLoading1] = useState(false);
  const [isUploading1, setIsUploading1] = useState(false);
  const fileInputRef1 = useRef<HTMLInputElement>(null);

  const [card2Image, setCard2Image] = useState(doors?.image_url || "/images/og-datas/IMG_0558.PNG");
  const [card2Title, setCard2Title] = useState(doors?.title || "Carved Teak Doors");
  const [card2Desc, setCard2Desc] = useState(doors?.subtitle || "Traditional Kerala main entrance doors, pooja room panels, and heavy teak frames with brass accents.");
  const [card2Cta, setCard2Cta] = useState(doors?.cta_text || "Explore Door Collection");
  const [card2Url, setCard2Url] = useState(doors?.cta_url || "/products");
  const [loading2, setLoading2] = useState(false);
  const [isUploading2, setIsUploading2] = useState(false);
  const fileInputRef2 = useRef<HTMLInputElement>(null);

  const sampleImages = [
    { label: "Living Millwork", path: "/images/og-datas/IMG_0600.PNG" },
    { label: "Carved Door", path: "/images/og-datas/IMG_0558.PNG" },
    { label: "Dining Suite", path: "/images/og-datas/IMG_0628.PNG" },
    { label: "Bedroom Suite", path: "/images/og-datas/IMG_0638.PNG" },
    { label: "Lounge Seating", path: "/images/og-datas/IMG_0452.PNG" },
  ];

  const handleDeviceUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setImage: (url: string) => void,
    setUploading: (val: boolean) => void
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File is too large. Max 5MB allowed.");
      return;
    }

    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await uploadImage(fd);
      if (res.error) {
        toast.error(res.error);
      } else if (res.url) {
        setImage(res.url);
        toast.success("Photo uploaded to Cloudinary successfully!");
      }
    } catch (err: any) {
      toast.error("Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSaveCard1 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading1(true);
    const fd = new FormData();
    fd.append("section_key", "custom_millwork");
    fd.append("title", card1Title);
    fd.append("subtitle", card1Desc);
    fd.append("description", "Bespoke Craftsmanship");
    fd.append("image_url", card1Image);
    fd.append("cta_text", card1Cta);
    fd.append("cta_url", card1Url);

    const res = await saveHomepageSection(fd);
    setLoading1(false);
    if (res?.error) {
      toast.error(res.error);
    } else {
      onSaved({
        id: millwork?.id || "custom_millwork",
        section_key: "custom_millwork",
        title: card1Title,
        subtitle: card1Desc,
        description: "Bespoke Craftsmanship",
        image_url: card1Image,
        cta_text: card1Cta,
        cta_url: card1Url,
        video_url: null,
        mobile_image_url: null,
        is_active: true,
        updated_at: new Date().toISOString(),
      });
    }
  };

  const handleSaveCard2 = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading2(true);
    const fd = new FormData();
    fd.append("section_key", "heritage_doors");
    fd.append("title", card2Title);
    fd.append("subtitle", card2Desc);
    fd.append("description", "Bespoke Craftsmanship");
    fd.append("image_url", card2Image);
    fd.append("cta_text", card2Cta);
    fd.append("cta_url", card2Url);

    const res = await saveHomepageSection(fd);
    setLoading2(false);
    if (res?.error) {
      toast.error(res.error);
    } else {
      onSaved({
        id: doors?.id || "heritage_doors",
        section_key: "heritage_doors",
        title: card2Title,
        subtitle: card2Desc,
        description: "Bespoke Craftsmanship",
        image_url: card2Image,
        cta_text: card2Cta,
        cta_url: card2Url,
        video_url: null,
        mobile_image_url: null,
        is_active: true,
        updated_at: new Date().toISOString(),
      });
    }
  };

  return (
    <div className="space-y-10">
      <div>
        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] block mb-1">
          HOMEPAGE EDITORIAL CARDS
        </span>
        <h3 className="text-xl font-bold font-cinzel text-slate-900">
          Custom Woodwork & Heritage Doors
        </h3>
        <p className="text-xs text-slate-500 mt-1">
          Upload custom photos or choose from presets to showcase in the 2 editorial cards on your homepage.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* CARD 1 FORM: BESPOKE MILLWORK */}
        <form onSubmit={handleSaveCard1} className="bg-[#FAF9F7] p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A572A]">
              Card 1: Left Showcase
            </span>
            <span className="text-[10px] font-mono text-slate-400">custom_millwork</span>
          </div>

          {/* Photo Preview & Device Upload Box */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                Card Photo
              </label>
              <input
                ref={fileInputRef1}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleDeviceUpload(e, setCard1Image, setIsUploading1)}
              />
              <button
                type="button"
                onClick={() => fileInputRef1.current?.click()}
                disabled={isUploading1}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-[#8A572A] text-[#8A572A] hover:text-white border border-amber-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
              >
                {isUploading1 ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                <span>{isUploading1 ? "Uploading..." : "Upload from Device"}</span>
              </button>
            </div>

            <div className="flex gap-3.5 items-center">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                {card1Image ? (
                  <img src={card1Image} alt="Card 1 Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold">No Img</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  required
                  value={card1Image}
                  onChange={(e) => setCard1Image(e.target.value)}
                  placeholder="/images/... or https://res.cloudinary..."
                  className="w-full bg-[#FAF9F7] border border-slate-200 rounded-lg px-3 py-2 text-[11px] font-mono text-slate-800 focus:outline-none focus:border-[#8A572A]"
                />
              </div>
            </div>

            {/* Presets Row */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 block mb-1.5 font-medium">Or Pick From Presets:</span>
              <div className="grid grid-cols-5 gap-1.5">
                {sampleImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCard1Image(img.path)}
                    className={`relative aspect-[4/3] rounded-md overflow-hidden border transition-all cursor-pointer ${
                      card1Image === img.path ? "border-[#8A572A] ring-2 ring-[#8A572A]/30 scale-95" : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.path} alt={img.label} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Card Headline
            </label>
            <input
              type="text"
              required
              value={card1Title}
              onChange={(e) => setCard1Title(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8A572A]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Description Text
            </label>
            <textarea
              rows={3}
              value={card1Desc}
              onChange={(e) => setCard1Desc(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#8A572A] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={card1Cta}
                onChange={(e) => setCard1Cta(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                CTA Link URL
              </label>
              <input
                type="text"
                value={card1Url}
                onChange={(e) => setCard1Url(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading1}
            className="w-full py-3 bg-[#8A572A] hover:bg-[#1C130D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save size={14} />
            <span>{loading1 ? "Saving..." : "Save Card 1"}</span>
          </button>
        </form>

        {/* CARD 2 FORM: CARVED DOORS */}
        <form onSubmit={handleSaveCard2} className="bg-[#FAF9F7] p-6 sm:p-7 rounded-2xl border border-slate-200 space-y-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200">
            <span className="text-xs font-bold uppercase tracking-wider text-[#8A572A]">
              Card 2: Right Showcase
            </span>
            <span className="text-[10px] font-mono text-slate-400">heritage_doors</span>
          </div>

          {/* Photo Preview & Device Upload Box */}
          <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-800">
                Card Photo
              </label>
              <input
                ref={fileInputRef2}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleDeviceUpload(e, setCard2Image, setIsUploading2)}
              />
              <button
                type="button"
                onClick={() => fileInputRef2.current?.click()}
                disabled={isUploading2}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-50 hover:bg-[#8A572A] text-[#8A572A] hover:text-white border border-amber-200 text-xs font-bold uppercase tracking-wider transition-all cursor-pointer shadow-2xs"
              >
                {isUploading2 ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
                <span>{isUploading2 ? "Uploading..." : "Upload from Device"}</span>
              </button>
            </div>

            <div className="flex gap-3.5 items-center">
              <div className="relative w-24 h-16 rounded-lg overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                {card2Image ? (
                  <img src={card2Image} alt="Card 2 Preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-xs text-slate-400 font-bold">No Img</div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <input
                  type="text"
                  required
                  value={card2Image}
                  onChange={(e) => setCard2Image(e.target.value)}
                  placeholder="/images/... or https://res.cloudinary..."
                  className="w-full bg-[#FAF9F7] border border-slate-200 rounded-lg px-3 py-2 text-[11px] font-mono text-slate-800 focus:outline-none focus:border-[#8A572A]"
                />
              </div>
            </div>

            {/* Presets Row */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-400 block mb-1.5 font-medium">Or Pick From Presets:</span>
              <div className="grid grid-cols-5 gap-1.5">
                {sampleImages.map((img, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setCard2Image(img.path)}
                    className={`relative aspect-[4/3] rounded-md overflow-hidden border transition-all cursor-pointer ${
                      card2Image === img.path ? "border-[#8A572A] ring-2 ring-[#8A572A]/30 scale-95" : "border-slate-200 opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image src={img.path} alt={img.label} fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Card Headline
            </label>
            <input
              type="text"
              required
              value={card2Title}
              onChange={(e) => setCard2Title(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-sm font-bold text-slate-900 focus:outline-none focus:border-[#8A572A]"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
              Description Text
            </label>
            <textarea
              rows={3}
              value={card2Desc}
              onChange={(e) => setCard2Desc(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2.5 text-xs text-slate-700 focus:outline-none focus:border-[#8A572A] resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                CTA Button Text
              </label>
              <input
                type="text"
                value={card2Cta}
                onChange={(e) => setCard2Cta(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-bold text-slate-800"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                CTA Link URL
              </label>
              <input
                type="text"
                value={card2Url}
                onChange={(e) => setCard2Url(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-xl px-3.5 py-2 text-xs font-mono text-slate-800"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading2}
            className="w-full py-3 bg-[#8A572A] hover:bg-[#1C130D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm active:scale-95 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <Save size={14} />
            <span>{loading2 ? "Saving..." : "Save Card 2"}</span>
          </button>
        </form>

      </div>
    </div>
  );
}

// ─── 2. ELITE CATEGORY SELECTOR ───
function EliteCategorySelector({ categories }: { categories: Categories[] }) {
  const [selectedIds, setSelectedIds] = useState<string[]>(
    categories.filter(c => c.is_featured).map(c => c.id)
  );
  const [isSaving, setIsSaving] = useState(false);

  const toggleCategory = (id: string) => {
    setSelectedIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleSave = async () => {
    setIsSaving(true);
    const result = await updateFeaturedCategories(selectedIds);
    setIsSaving(false);
    if (result.success) {
      toast.success("Elite Collections updated on homepage.");
    } else {
      toast.error("Failed to update collections.");
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] block mb-1">HOMEPAGE CATEGORIES</span>
          <h3 className="text-xl font-bold font-cinzel text-slate-900">Featured in Elite Collections</h3>
          <p className="text-xs text-slate-500 mt-1">Select the categories you wish to feature in the carousel.</p>
        </div>
        <button
          onClick={handleSave}
          disabled={isSaving}
          className="bg-[#8A572A] hover:bg-[#1C130D] text-white px-6 py-3 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50 self-start sm:self-auto"
        >
          <Save size={14} />
          <span>{isSaving ? "Saving..." : "Save Selection"}</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((cat) => {
          const isSelected = selectedIds.includes(cat.id);
          return (
            <div
              key={cat.id}
              onClick={() => toggleCategory(cat.id)}
              className={`p-4 border rounded-xl cursor-pointer transition-all flex items-center gap-4 ${
                isSelected
                  ? "border-[#8A572A] bg-amber-50/40 shadow-xs"
                  : "border-slate-200 bg-white hover:border-slate-300"
              }`}
            >
              <div className="w-12 h-12 rounded-lg bg-slate-100 relative overflow-hidden shrink-0 border border-slate-200">
                {cat.image_url && <Image src={cat.image_url} alt={cat.name} fill className="object-cover" />}
              </div>
              <div className="min-w-0 flex-1">
                <h4 className="text-sm font-bold text-slate-900 truncate">{cat.name}</h4>
                <p className="text-[11px] text-slate-400 font-mono">/{cat.slug}</p>
              </div>
              <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold ${
                isSelected ? "bg-[#8A572A] text-white" : "border border-slate-300 text-transparent"
              }`}>
                ✓
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── 3. HERO SLIDES MANAGEMENT ───
function HeroManagement({ slides, onSaveSuccess }: { slides: HeroSlide[]; onSaveSuccess: () => void }) {
  const [slideList, setSlideList] = useState<HeroSlide[]>(slides);
  const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [heroImage, setHeroImage] = useState(editingSlide?.image_url || "/images/og-datas/IMG_0600.PNG");
  const heroFileInputRef = useRef<HTMLInputElement>(null);

  const handleDelete = async (id: string) => {
    toast.warning("Delete this hero slide?", {
      action: {
        label: "Delete",
        onClick: async () => {
          await deleteHeroSlide(id);
          setSlideList(slideList.filter(s => s.id !== id));
          toast.success("Slide removed");
        }
      },
      cancel: { label: "Cancel", onClick: () => {} }
    });
  };

  const handleHeroFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setIsUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    try {
      const res = await uploadImage(fd);
      if (res?.url) {
        setHeroImage(res.url);
        toast.success("Hero image uploaded to Cloudinary!");
      } else {
        toast.error(res?.error || "Upload failed");
      }
    } catch {
      toast.error("Upload error");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] block mb-1">HOMEPAGE HERO</span>
          <h3 className="text-xl font-bold font-cinzel text-slate-900">Hero Carousel & Banners</h3>
          <p className="text-xs text-slate-500 mt-1">Manage video banners and cinematic slide cards.</p>
        </div>
        <button
          onClick={() => {
            setHeroImage("/images/og-datas/IMG_0600.PNG");
            setIsAdding(true);
          }}
          className="bg-[#8A572A] hover:bg-[#1C130D] text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer self-start sm:self-auto"
        >
          <Plus size={15} />
          <span>Add Hero Slide</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {slideList.map((slide) => (
          <div key={slide.id} className="bg-[#FAF9F7] p-5 rounded-2xl border border-slate-200 flex flex-col justify-between group">
            <div>
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden bg-slate-200 mb-3 border border-slate-200">
                <Image src={slide.image_url} alt={slide.heading} fill className="object-cover" />
              </div>
              <h4 className="text-base font-bold text-slate-900">{slide.heading}</h4>
              <p className="text-xs text-slate-500 mt-1 line-clamp-1">{slide.description || slide.eyebrow}</p>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 mt-4">
              <button
                onClick={() => {
                  setHeroImage(slide.image_url);
                  setEditingSlide(slide);
                }}
                className="text-xs font-bold text-[#8A572A] hover:underline cursor-pointer"
              >
                Edit Slide
              </button>
              <button
                onClick={() => handleDelete(slide.id)}
                className="text-slate-400 hover:text-red-600 p-1 cursor-pointer"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Slide Modal */}
      {(isAdding || editingSlide) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto">
          <div className="bg-white p-8 max-w-2xl w-full rounded-3xl animate-in zoom-in-95 duration-200 my-8 shadow-2xl border border-slate-200">
            <h4 className="text-xl font-cinzel font-bold text-slate-900 mb-6">
              {editingSlide ? "Edit Hero Slide" : "Add Hero Slide"}
            </h4>
            
            <form onSubmit={async (e) => {
              e.preventDefault();
              const formData = new FormData(e.currentTarget);
              await saveHeroSlide(formData);
              setIsAdding(false);
              setEditingSlide(null);
              onSaveSuccess();
            }} className="space-y-5">
              <input type="hidden" name="id" value={editingSlide?.id || "new"} />
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                      Image / Poster URL
                    </label>
                    <input
                      ref={heroFileInputRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleHeroFileUpload}
                    />
                    <button
                      type="button"
                      onClick={() => heroFileInputRef.current?.click()}
                      disabled={isUploading}
                      className="text-[11px] font-bold uppercase tracking-wider text-[#8A572A] hover:underline inline-flex items-center gap-1 cursor-pointer"
                    >
                      {isUploading ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}
                      <span>{isUploading ? "Uploading..." : "Upload from Device"}</span>
                    </button>
                  </div>
                  <input
                    name="image_url"
                    required
                    value={heroImage}
                    onChange={(e) => setHeroImage(e.target.value)}
                    className="w-full bg-[#FAF9F7] border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Heading
                  </label>
                  <input
                    name="heading"
                    required
                    defaultValue={editingSlide?.heading || "Comfort, Refined"}
                    className="w-full bg-[#FAF9F7] border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Description
                  </label>
                  <textarea
                    name="description"
                    rows={2}
                    defaultValue={editingSlide?.description || ""}
                    className="w-full bg-[#FAF9F7] border border-slate-200 rounded-xl px-4 py-2.5 text-xs resize-none"
                  />
                </div>
              </div>

              <input type="hidden" name="is_active" value="true" />
              <input type="hidden" name="sort_order" value="0" />

              <div className="flex gap-3 pt-4 border-t border-slate-100">
                <button
                  type="submit"
                  className="flex-1 bg-[#8A572A] hover:bg-[#1C130D] text-white py-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  Save Slide
                </button>
                <button
                  type="button"
                  onClick={() => { setIsAdding(false); setEditingSlide(null); }}
                  className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold uppercase tracking-wider"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── 4. INSTAGRAM MANAGEMENT ───
function InstagramManagement({ posts }: { posts: InstagramPost[] }) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] block mb-1">SOCIAL MEDIA</span>
          <h3 className="text-xl font-bold font-cinzel text-slate-900">Instagram Feed Showcase</h3>
          <p className="text-xs text-slate-500 mt-1">Manage the live photos appearing in the "We're on Instagram" homepage block.</p>
        </div>
        <Link
          href="/admin/instagram"
          className="inline-flex items-center gap-2 bg-[#8A572A] hover:bg-[#1C130D] text-white text-xs font-bold uppercase tracking-wider px-5 py-2.5 rounded-xl transition-all shadow-md"
        >
          <span>Open Social Manager</span>
          <ArrowRight size={14} />
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 pt-4">
        {posts.slice(0, 5).map((post, idx) => (
          <div key={post.id || idx} className="bg-[#FAF9F7] p-3 rounded-xl border border-slate-200 space-y-2">
            <div className="relative aspect-square rounded-lg overflow-hidden bg-slate-200">
              <Image src={post.image_url} alt={post.caption || "Post"} fill className="object-cover" />
            </div>
            <p className="text-[11px] text-slate-600 font-medium line-clamp-1">{post.caption || "Craftsmanship piece"}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
