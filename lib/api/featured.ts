import { createClient } from "@/lib/supabase";
import { FeaturedItem } from "@/lib/types";

const FALLBACK_FEATURED_ITEMS: FeaturedItem[] = [
  {
    id: "1",
    category: "Living Room",
    name: "Royal Malabar Teak Sofa Set",
    slug: "royal-malabar-teak-sofa-set",
    subtitle: "Hand-carved Nilambur teak 3+1+1 living suite with royal brass accents.",
    image_url: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    sort_order: 0,
    is_active: true,
    is_featured: true,
    is_bestseller: true,
  },
  {
    id: "2",
    category: "Dining Sets",
    name: "Imperial Nilambur 8-Seater Dining Suite",
    slug: "imperial-nilambur-8-seater-dining-suite",
    subtitle: "Solid seasoned Nilambur teak slab table with handcrafted ergonomic chairs.",
    image_url: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop",
    sort_order: 1,
    is_active: true,
    is_featured: true,
    is_bestseller: true,
  },
  {
    id: "3",
    category: "Bedroom",
    name: "Travancore Heritage Teak Cot",
    slug: "travancore-heritage-teak-cot",
    subtitle: "King size solid teak bed with intricate headboard wood carvings and heirloom joinery.",
    image_url: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
    sort_order: 2,
    is_active: true,
    is_featured: true,
    is_new: true,
  },
  {
    id: "4",
    category: "Office Furniture",
    name: "Governor Executive Teak Desk",
    slug: "governor-executive-teak-desk",
    subtitle: "Stately executive work desk handcrafted from premium seasoned teak wood.",
    image_url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    sort_order: 3,
    is_active: true,
    is_featured: true,
  },
  {
    id: "5",
    category: "Doors & Windows",
    name: "Aalayam Heritage Carved Main Door",
    slug: "aalayam-heritage-carved-main-door",
    subtitle: "Traditional Kerala temple-inspired teak entrance door with antique brass work.",
    image_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    sort_order: 4,
    is_active: true,
    is_featured: true,
  },
];

export async function getFeaturedItems(): Promise<FeaturedItem[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select(`
        id,
        name,
        slug,
        subtitle:short_description,
        image_url:images,
        sort_order:price,
        is_active,
        is_new,
        is_bestseller,
        is_featured,
        categories (
          name
        )
      `)
      .eq("is_featured", true)
      .eq("is_active", true)
      .eq("is_private", false)
      .limit(8);

    if (error || !data || data.length === 0) {
      return FALLBACK_FEATURED_ITEMS;
    }

    return data.map((item: any) => ({
      id: item.id.toString(),
      slug: item.slug,
      category: item.categories?.name || "Nilambur Teak Collection",
      name: item.name,
      subtitle: item.subtitle || "Handcrafted from 100% genuine Nilambur teak wood.",
      image_url: Array.isArray(item.image_url) ? item.image_url[0] : item.image_url || "/images/placeholder-furniture.jpg",
      sort_order: 0,
      is_active: item.is_active,
      is_new: item.is_new,
      is_bestseller: item.is_bestseller,
      is_featured: item.is_featured,
    }));
  } catch (err) {
    return FALLBACK_FEATURED_ITEMS;
  }
}
