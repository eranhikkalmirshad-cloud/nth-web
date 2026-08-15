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

export default async function HomePage() {
  const [products, heroSlides] = await Promise.all([
    getProducts(),
    getHeroSlides(),
  ]);

  return (
    <main className="min-h-screen bg-white text-[#111111]">
      {/* Schema Structured Data for SEO */}
      <OrganizationSchema />
      <LocalBusinessSchema />
      <FAQSchema faqs={HOMEPAGE_FAQS} />

      {/* 1. Hero Card (Inset rounded card with video background, left-aligned text & dual pills) */}
      <HomeHero slides={heroSlides} />

      {/* 2. "A Legacy of Excellence" Intro Section with 4 Stats */}
      <HeritageStatsSection />

      {/* 3. "Elite Home Collections" 4-Card Carousel */}
      <EliteCollections />

      {/* 4. "The Signature Selection" Elevated Product Cards */}
      <SignatureSelection products={products} />

      {/* 5. "Custom Woodwork & Heritage Doors" 2 Large Cards + Consultation Banner */}
      <CustomWoodworkSection />

      {/* 6. "How It Works" 4-Step Process Section */}
      <HowItWorksSection />

      {/* 7. "We're on Instagram" 5-Photo Feed */}
      <InstagramSection />
    </main>
  );
}
