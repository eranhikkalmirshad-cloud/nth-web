import { createClient } from "@/lib/supabase-server";
import CategoryForm from "../CategoryForm";

export default async function NewCategoryPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name", { ascending: true });

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto font-inter">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C130D]">
          Create New Category or Sub-Category
        </h2>
        <p className="text-xs text-[#8A572A] uppercase tracking-[0.2em] mt-1 font-bold">
          Define top-level collections or nested sub-categories for precision catalog filtering
        </p>
      </div>
      
      <CategoryForm allCategories={categories || []} />
    </div>
  );
}
