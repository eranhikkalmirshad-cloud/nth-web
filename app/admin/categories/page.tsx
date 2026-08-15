import { createClient } from "@/lib/supabase-server";
import { ListTree, Plus, FolderTree } from "lucide-react";
import Link from "next/link";
import CategoryCard from "./CategoryCard";
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

  // Use database categories or fallback to the master 19 Nilambur Teak categories
  const displayCategories =
    categories && categories.length > 0
      ? categories
      : PRODUCT_CATEGORIES.map((cat, i) => ({
          id: cat.slug,
          name: cat.name,
          slug: cat.slug,
          description: cat.description || "Heirloom handcrafted Nilambur teak collection.",
          image_url: cat.image,
          sort_order: i + 1,
          is_featured: cat.isPopular || false,
          created_at: new Date().toISOString(),
        }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#EAE8E2] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] mb-1">
            <FolderTree size={14} />
            <span>Product Taxonomy ({displayCategories.length} Categories)</span>
          </div>
          <h2 className="text-xl font-bold font-cinzel text-[#1C130D]">Master Categories</h2>
          <p className="text-xs text-[#7A6E65] mt-0.5">
            Organize solid teak furniture pieces by type and customer collections.
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center justify-center gap-2 bg-[#8A572A] hover:bg-[#1C130D] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs"
        >
          <Plus size={15} /> <span>Add Category</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayCategories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </div>
  );
}
