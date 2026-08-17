import { createClient } from "@/lib/supabase-server";
import { Plus, FolderTree } from "lucide-react";
import Link from "next/link";
import CategoriesListClient from "./CategoriesListClient";
import { PRODUCT_CATEGORIES } from "@/lib/constants/categories";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const { data: categories, error } = await supabase
    .from("categories")
    .select("*")
    .order("sort_order", { ascending: true });

  if (error) {
    console.error("Error fetching categories:", error);
  }

  // Use database categories or fallback to master categories
  const displayCategories =
    categories && categories.length > 0
      ? categories
      : PRODUCT_CATEGORIES.map((cat, i) => ({
          id: cat.slug,
          name: cat.name,
          base_category: "main",
          slug: cat.slug,
          description: cat.description || "Heirloom handcrafted Nilambur teak collection.",
          image_url: cat.image,
          sort_order: i + 1,
          is_featured: cat.isPopular || false,
          created_at: new Date().toISOString(),
        }));

  return (
    <div className="space-y-6 font-inter max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 sm:p-8 rounded-2xl border border-[#EAE8E2] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] mb-1">
            <FolderTree size={14} />
            <span>TAXONOMY & SUB-CATEGORY SYSTEM</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold font-cinzel text-[#1C130D]">
            Master Categories & Sub-Categories
          </h2>
          <p className="text-xs text-[#7A6E65] mt-1">
            Create primary furniture collections (e.g. <em>Sofas</em>, <em>Dining</em>) and nested sub-categories (e.g. <em>L-Shape Sofas</em>, <em>Live Edge Tables</em>) to empower user filtering.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center justify-center gap-2 bg-[#8A572A] hover:bg-[#1C130D] text-white px-6 py-3 text-xs font-bold uppercase tracking-wider rounded-xl transition-all shadow-md active:scale-95 self-start sm:self-auto cursor-pointer"
        >
          <Plus size={16} /> <span>Add Category / Sub-Category</span>
        </Link>
      </div>

      {/* Interactive Filterable Categories List */}
      <CategoriesListClient categories={displayCategories} />
    </div>
  );
}
