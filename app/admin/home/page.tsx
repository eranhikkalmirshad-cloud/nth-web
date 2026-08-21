import { createClient } from "@/lib/supabase-server";
import HomeSettingsClient from "./HomeSettingsClient";

export default async function AdminHomePage() {
  const supabase = await createClient();

  // Parallel fetch for lightning-fast response
  const [
    { data: sections },
    { data: heroSlides },
    { data: categories },
    { data: instagramPosts }
  ] = await Promise.all([
    supabase.from("homepage_sections").select("*").order("section_key"),
    supabase.from("hero_slides").select("*").order("sort_order"),
    supabase.from("categories").select("*").order("name"),
    supabase.from("instagram_posts").select("*").order("sort_order"),
  ]);

  return (
    <div className="font-inter max-w-7xl mx-auto">
      <div className="mb-12">
        <h2 className="text-2xl font-playfair font-black text-[#111111] tracking-tight">Home Page Architecture</h2>
        <p className="text-[10px] text-[#C9922A] uppercase tracking-[0.2em] mt-2 font-bold">Orchestrate the showcase experience of Nilambur Teak Heritage</p>
      </div>

      <HomeSettingsClient 
        initialSections={sections || []}
        heroSlides={heroSlides || []}
        categories={categories || []}
        instagramPosts={instagramPosts || []}
      />
    </div>
  );
}
