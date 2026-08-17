import { createClient } from "@/lib/supabase-server";
import { notFound } from "next/navigation";
import CategoryForm from "../CategoryForm";

export default async function EditCategoryPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params;
  const supabase = await createClient();
  
  const [{ data: category, error }, { data: allCategories }] = await Promise.all([
    supabase
      .from("categories")
      .select("*")
      .eq("id", id)
      .single(),
    supabase
      .from("categories")
      .select("*")
      .order("name", { ascending: true })
  ]);

  if (error || !category) {
    notFound();
  }

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto font-inter">
      <div className="mb-8">
        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-[#1C130D]">
          Modify Collection: {category.name}
        </h2>
        <p className="text-xs text-[#8A572A] uppercase tracking-[0.2em] mt-1 font-bold">
          Update hierarchy, parent category, metadata, or showcase photo
        </p>
      </div>
      
      <CategoryForm category={category} allCategories={allCategories || []} />
    </div>
  );
}
