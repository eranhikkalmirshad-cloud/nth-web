// app/page.tsx
export const dynamic = "force-dynamic";

import { getProducts } from "@/lib/api/products";
import { getHeroSlides } from "@/lib/api/hero";

// Magnat Design Reference Match Components
import HomeHero from "@/components/home/HomeHero";
import HeritageStatsSection from "@/components/home/HeritageStatsSection";
import EliteCollections from "@/components/home/EliteCollections";
import SignatureSelection from "@/components/home/SignatureSelection";
import CustomWoodworkSection from "@/components/home/CustomWoodworkSection";
import HowItWorksSection from "@/components/home/HowItWorksSection";
import InstagramSection from "@/components/home/InstagramSection";

// Schemas
import OrganizationSchema from "@/components/schemas/OrganizationSchema";
import LocalBusinessSchema from "@/components/schemas/LocalBusinessSchema";
import FAQSchema, { HOMEPAGE_FAQS } from "@/components/schemas/FAQSchema";

import { createClient } from "@/lib/supabase-server";

export default async function HomePage() {
  const supabase = await createClient();

  const [products, heroSlides, { data: dbCategories }, { data: dbInstagramPosts }, { data: dbHomepageSections }] = await Promise.all([
    getProducts(),
    getHeroSlides(),
    supabase
      .from("categories")
      .select("*")
      .order("sort_order", { ascending: true }),
    supabase
      .from("instagram_posts")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true }),
    supabase
      .from("homepage_sections")
      .select("*"),
  ]);

  const heroSection = dbHomepageSections?.find((s) => s.section_key === "hero_section");
  const legacyHeritage = dbHomepageSections?.find((s) => s.section_key === "legacy_heritage");

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Schema Structured Data for SEO */}
      <OrganizationSchema />
      <LocalBusinessSchema />
      <FAQSchema faqs={HOMEPAGE_FAQS} />

      {/* 1. Hero Card (Supports both Video Mode and Multiple Image Carousel Mode) */}
      <HomeHero slides={heroSlides} heroSection={heroSection} />

      {/* 2. "A Legacy of Excellence" Intro Section with 4 Stats */}
      <HeritageStatsSection section={legacyHeritage} />

      {/* 3. "Elite Home Collections" Category Carousel */}
      <EliteCollections categories={dbCategories || []} />

      {/* 4. "The Signature Selection" Elevated Product Cards */}
      <SignatureSelection products={products} />

      {/* 5. "Custom Woodwork & Heritage Doors" 2 Large Cards + Consultation Banner */}
      <CustomWoodworkSection sections={dbHomepageSections || []} />

      {/* 6. "How It Works" 4-Step Process Section */}
      <HowItWorksSection />

      {/* 7. "We're on Instagram" 5-Photo Feed */}
      <InstagramSection initialPosts={dbInstagramPosts || []} />
    </main>
  );
}
