import { createClient } from "@/lib/supabase";
import { HeroSlide } from "@/lib/types";

const FALLBACK_HERO_SLIDES: HeroSlide[] = [
  {
    id: "1",
    image_url: "/video/hero-video-poster.jpg",
    video_url: "/video/hero-video.mp4",
    mobile_image_url: "/video/hero-video-poster.jpg",
    alt_text: "Nilambur Teak Heritage Living Craft",
    eyebrow: "Experience the Pinnacle of Comfort",
    heading: "Comfort, Refined",
    description: "Discover premium handcrafted teak furniture crafted with care, character and timeless design.",
    sort_order: 0,
    is_active: true,
  },
  {
    id: "2",
    image_url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=2600&auto=format&fit=crop",
    mobile_image_url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=900&auto=format&fit=crop",
    alt_text: "Royal Teak Dining Collection",
    heading: "Royal Dining Masterpieces",
    description: "Solid Nilambur teak tables and handcrafted chairs carved for generational family gatherings.",
    sort_order: 1,
    is_active: true,
  },
  {
    id: "3",
    image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=2600&auto=format&fit=crop",
    mobile_image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=900&auto=format&fit=crop",
    alt_text: "Heirloom Teak Bedroom Sanctuary",
    heading: "Heirloom Bedroom Suites",
    description: "Timeless teak beds and wardrobes engineered with traditional mortise-and-tenon joinery.",
    sort_order: 2,
    is_active: true,
  },
];

export async function getHeroSlides(): Promise<HeroSlide[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("hero_slides")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_HERO_SLIDES;
    }
    return data;
  } catch (err) {
    return FALLBACK_HERO_SLIDES;
  }
}
