import { createClient } from "@/lib/supabase";
import { allProducts as fallbackProducts, Product as FallbackProduct } from "@/lib/data/products";
import { Product } from "@/lib/types";

// Helper to map DB Product to Frontend Product
function mapProduct(dbProduct: any): Product {
  return {
    ...dbProduct,
    category: dbProduct.categories || dbProduct.category,
    images: dbProduct.images || [],
    features: dbProduct.features || [],
    specifications: dbProduct.specifications || [],
  };
}

// Convert fallback data to new Product type
function mapFallbackProduct(p: FallbackProduct): Product {
  return {
    id: p.slug,
    name: p.name,
    slug: p.slug,
    description: p.description,
    short_description: p.short_description,
    category_id: p.category,
    images: p.images,
    features: p.features || [],
    specifications: p.specifications || [],
    price: p.price,
    delivery_time: p.deliveryTime,
    material: p.material,
    badge: p.badge,
    room: p.room,
    is_new: p.isNew,
    is_bestseller: p.isBestseller,
    is_active: true,
    is_featured: false,
    is_private: false,
    access_token: null,
    type: p.type || null,
    sort_order: 0,
    created_at: new Date().toISOString(),
    categories: {
      id: p.category,
      name: p.category,
      base_category: p.category.toLowerCase(),
      slug: p.category.toLowerCase(),
      description: null,
      image_url: null,
      is_featured: false,
      sort_order: 0,
      created_at: new Date().toISOString(),
    },
  };
}

export async function getPrivateProducts(): Promise<Product[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*)")
      .eq("is_private", true)
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data) return [];
    return data.map(mapProduct);
  } catch (err) {
    return [];
  }
}

export async function getProducts(includePrivate: boolean = false): Promise<Product[]> {
  try {
    const supabase = createClient();
    let query = supabase
      .from("products")
      .select("*, categories(*)")
      .eq("is_active", true);

    if (!includePrivate) {
      query = query.eq("is_private", false);
    }

    const { data, error } = await query.order("sort_order", { ascending: true });

    if (error || !data) {
      return [];
    }

    return data.map(mapProduct);
  } catch (err) {
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*)")
      .eq("slug", slug)
      .eq("is_private", false)
      .single();

    if (error || !data) {
      return null;
    }

    return mapProduct(data);
  } catch (err) {
    return null;
  }
}

export async function getRelatedProducts(categorySlug: string, excludeSlug: string): Promise<Product[]> {
  try {
    const supabase = createClient();
    if (categorySlug) {
      const { data: categoryData } = await supabase
        .from("categories")
        .select("id")
        .eq("slug", categorySlug.toLowerCase())
        .single();

      if (categoryData) {
        const { data, error } = await supabase
          .from("products")
          .select("*, categories(*)")
          .eq("category_id", categoryData.id)
          .eq("is_private", false)
          .neq("slug", excludeSlug)
          .limit(4);

        if (!error && data && data.length > 0) return data.map(mapProduct);
      }
    }

    return fallbackProducts
      .filter((p) => p.slug !== excludeSlug)
      .slice(0, 4)
      .map(mapFallbackProduct);
  } catch (err) {
    return fallbackProducts
      .filter((p) => p.slug !== excludeSlug)
      .slice(0, 4)
      .map(mapFallbackProduct);
  }
}

export async function getProductByToken(token: string): Promise<Product | null> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("products")
      .select("*, categories(*)")
      .eq("access_token", token)
      .single();

    if (error || !data) return null;
    return mapProduct(data);
  } catch (err) {
    return null;
  }
}
