import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/config/site";
import { createClient } from "@/lib/supabase";
import { PRODUCT_CATEGORIES } from "@/lib/constants/categories";

const BASE = SITE_CONFIG.url;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${BASE}/products`, lastModified: new Date(), changeFrequency: "daily", priority: 0.95 },
    { url: `${BASE}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/contact`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.85 },
    { url: `${BASE}/shipping-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/return-policy`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/custom-orders`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/privacy`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE}/terms`, lastModified: new Date(), changeFrequency: "yearly", priority: 0.3 },
  ];

  // Category routes
  const categoryRoutes: MetadataRoute.Sitemap = PRODUCT_CATEGORIES.map((cat) => ({
    url: `${BASE}/products?category=${cat.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  // Dynamic Product routes from Supabase
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const supabase = createClient();
    const { data: products } = await supabase
      .from("products")
      .select("slug, created_at")
      .eq("is_active", true)
      .eq("is_private", false);

    if (products && products.length > 0) {
      productRoutes = products.map((p) => ({
        url: `${BASE}/products/${p.slug}`,
        lastModified: new Date(p.created_at || Date.now()),
        changeFrequency: "weekly",
        priority: 0.9,
      }));
    }
  } catch (e) {
    // Graceful fallback
  }

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
