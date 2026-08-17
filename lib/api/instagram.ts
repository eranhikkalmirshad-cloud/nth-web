import { createClient } from "@/lib/supabase";
import { InstagramPost } from "@/lib/types";

const FALLBACK_INSTAGRAM_POSTS: InstagramPost[] = [
  {
    id: "ig-1",
    image_url: "/images/og-datas/IMG_0600.PNG",
    caption: "Signature Living Suite in 100% mature Nilambur Teak.",
    post_url: "https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "ig-2",
    image_url: "/images/og-datas/IMG_0628.PNG",
    caption: "Single-plank solid teak heirloom dining table.",
    post_url: "https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0",
    sort_order: 2,
    is_active: true,
  },
  {
    id: "ig-3",
    image_url: "/images/og-datas/IMG_0638.PNG",
    caption: "Architectural master bedroom suite with natural high-lustre finish.",
    post_url: "https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0",
    sort_order: 3,
    is_active: true,
  },
  {
    id: "ig-4",
    image_url: "/images/og-datas/IMG_0452.PNG",
    caption: "Artisan Nilambur lounge armchair with traditional joinery.",
    post_url: "https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0",
    sort_order: 4,
    is_active: true,
  },
  {
    id: "ig-5",
    image_url: "/images/og-datas/IMG_0515.PNG",
    caption: "Royal heritage diwan daybed with hand-carved details.",
    post_url: "https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0",
    sort_order: 5,
    is_active: true,
  },
];

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("instagram_posts")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_INSTAGRAM_POSTS;
    }
    return data;
  } catch (err) {
    return FALLBACK_INSTAGRAM_POSTS;
  }
}
