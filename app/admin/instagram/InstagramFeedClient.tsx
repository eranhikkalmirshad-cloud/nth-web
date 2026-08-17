// app/admin/instagram/InstagramFeedClient.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { Instagram, Plus, Trash2, ExternalLink, Sparkles, Upload, Link as LinkIcon, RefreshCw, CheckCircle2 } from "lucide-react";
import { toast } from "sonner";
import { saveInstagramPost, deleteInstagramPost } from "@/app/actions/cms";
import ImageUploadField from "@/components/ui/ImageUploadField";
import { InstagramPost } from "@/lib/types";

interface InstagramFeedClientProps {
  initialPosts: InstagramPost[];
}

export default function InstagramFeedClient({ initialPosts }: InstagramFeedClientProps) {
  const [posts, setPosts] = useState<InstagramPost[]>(initialPosts);
  const [isAdding, setIsAdding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("/images/og-datas/IMG_0600.PNG");
  const [caption, setCaption] = useState("");
  const [postUrl, setPostUrl] = useState("https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0");

  const sampleOgImages = [
    { label: "Living Suite", path: "/images/og-datas/IMG_0600.PNG" },
    { label: "Dining Table", path: "/images/og-datas/IMG_0628.PNG" },
    { label: "King Bed", path: "/images/og-datas/IMG_0638.PNG" },
    { label: "Lounge Chair", path: "/images/og-datas/IMG_0452.PNG" },
    { label: "Diwan Bed", path: "/images/og-datas/IMG_0515.PNG" },
    { label: "Teak Sofa", path: "/images/og-datas/IMG_0432.PNG" },
    { label: "Coffee Table", path: "/images/og-datas/IMG_0501.PNG" },
    { label: "Bookshelf", path: "/images/og-datas/IMG_0514.PNG" },
  ];

  const handleAddPost = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("Please provide an image URL or upload a photo");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("id", "new");
    formData.append("image_url", imageUrl);
    formData.append("caption", caption || "Nilambur Teak Woodcraft Piece");
    formData.append("post_url", postUrl || "https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0");

    const res = await saveInstagramPost(formData);
    if (res?.error) {
      toast.error("Failed to save post", { description: res.error });
    } else {
      toast.success("Instagram post added successfully!");
      setIsAdding(false);
      setCaption("");
      // Refresh local list
      setPosts([
        {
          id: `new-${Date.now()}`,
          image_url: imageUrl,
          caption: caption || "Nilambur Teak Woodcraft Piece",
          post_url: postUrl,
          sort_order: posts.length + 1,
          is_active: true,
        },
        ...posts,
      ]);
    }
    setLoading(false);
  };

  const handleDeletePost = async (id: string, idx: number) => {
    toast.warning("Delete this post from the homepage feed?", {
      action: {
        label: "Delete",
        onClick: async () => {
          const res = await deleteInstagramPost(id);
          if (res?.error) {
            toast.error("Failed to delete post");
          } else {
            toast.success("Post removed");
            setPosts(posts.filter((p, i) => p.id !== id && i !== idx));
          }
        },
      },
      cancel: { label: "Cancel", onClick: () => {} },
    });
  };

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] mb-1">
            <Instagram size={15} />
            <span>HOMEPAGE SOCIAL FEED MANAGER</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-slate-900">
            Instagram Feed Showcase
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Control the live 5-post photo grid shown in the "We're on Instagram" section of your homepage.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <a
            href="https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-[#8A572A] transition-colors"
          >
            <Instagram size={14} />
            <span>@nilambur_teak_heritage</span>
            <ExternalLink size={12} />
          </a>

          <button
            type="button"
            onClick={() => setIsAdding(!isAdding)}
            className="inline-flex items-center gap-2 bg-[#8A572A] hover:bg-[#1C130D] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <Plus size={16} />
            <span>{isAdding ? "Cancel" : "Add Feed Photo"}</span>
          </button>
        </div>
      </div>

      {/* Add New Post Form */}
      {isAdding && (
        <form
          onSubmit={handleAddPost}
          className="bg-white p-6 sm:p-8 rounded-2xl border-2 border-[#8A572A]/30 shadow-lg space-y-6"
        >
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Sparkles size={16} className="text-[#8A572A]" />
              <span>Add New Instagram Showcase Photo</span>
            </h3>
            <span className="text-xs text-slate-400 font-medium">Auto-synced to Homepage</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Quick Pick from Authentic Assets */}
            <div className="md:col-span-5 space-y-3">
              <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700">
                1. Select from Real Teak Photos
              </label>
              <div className="grid grid-cols-4 gap-2">
                {sampleOgImages.map((sample, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setImageUrl(sample.path)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                      imageUrl === sample.path
                        ? "border-[#8A572A] ring-2 ring-[#8A572A]/30 scale-95"
                        : "border-slate-200 hover:border-slate-400 opacity-80 hover:opacity-100"
                    }`}
                  >
                    <Image src={sample.path} alt={sample.label} fill className="object-cover" />
                  </button>
                ))}
              </div>
              <p className="text-[10px] text-slate-400">Click any image to select it instantly.</p>
            </div>

            {/* Right: Custom Upload or URL + Details */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Selected Image Path / Cloudinary URL
                </label>
                <input
                  type="text"
                  required
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="/images/og-datas/IMG_0600.PNG or https://..."
                  className="w-full bg-[#FBFBFA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 font-mono text-xs focus:outline-none focus:border-[#8A572A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Caption / Short Tag
                </label>
                <input
                  type="text"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="e.g., Solid Nilambur Teak Dining Table ready for shipping."
                  className="w-full bg-[#FBFBFA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-[#8A572A]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Target Instagram URL
                </label>
                <input
                  type="text"
                  value={postUrl}
                  onChange={(e) => setPostUrl(e.target.value)}
                  placeholder="https://www.instagram.com/nilambur_teak_heritage?igsh=..."
                  className="w-full bg-[#FBFBFA] border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-900 text-xs font-mono focus:outline-none focus:border-[#8A572A]"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 bg-[#8A572A] hover:bg-[#1C130D] text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Publishing..." : "Publish to Feed"}
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Grid of Current Posts */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {posts.map((post, idx) => (
          <div
            key={post.id || idx}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs flex flex-col justify-between group hover:shadow-md transition-shadow relative"
          >
            <div>
              {/* Header Preview */}
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 text-[#8A572A] border border-amber-200/60">
                  Position #{idx + 1}
                </span>
                <button
                  type="button"
                  onClick={() => handleDeletePost(post.id, idx)}
                  className="text-slate-400 hover:text-red-600 p-1 transition-colors cursor-pointer"
                  title="Remove from feed"
                >
                  <Trash2 size={15} />
                </button>
              </div>

              {/* Photo */}
              <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-100 mb-3 border border-slate-100">
                <Image
                  src={post.image_url}
                  alt={post.caption || "Instagram Feed"}
                  fill
                  sizes="200px"
                  className="object-cover"
                />
                <div className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white">
                  <Instagram size={12} />
                </div>
              </div>

              {/* Caption */}
              <p className="text-xs text-slate-700 font-medium line-clamp-2 mb-3 leading-snug">
                {post.caption || "Nilambur Teak Craftsmanship"}
              </p>
            </div>

            {/* Post Link */}
            <a
              href={post.post_url || "https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0"}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 text-[10px] font-bold text-[#8A572A] hover:underline flex items-center justify-between pt-2 border-t border-slate-100"
            >
              <span>View On Instagram</span>
              <ExternalLink size={12} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
