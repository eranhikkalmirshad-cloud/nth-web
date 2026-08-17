"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, ArrowLeft, Layers, FolderTree, Sparkles, CornerDownRight } from "lucide-react";
import { saveCategory } from "@/app/actions/cms";
import { Categories } from "@/lib/types";
import ImageUploadField from "@/components/ui/ImageUploadField";
import { toast } from "sonner";

interface CategoryFormProps {
  category?: Categories;
  allCategories?: Categories[];
}

export default function CategoryForm({ category, allCategories = [] }: CategoryFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Determine if editing an existing subcategory or main category
  const initialIsSubcategory = Boolean(
    category?.base_category && 
    category.base_category !== "main" && 
    category.base_category !== "none" &&
    category.base_category !== category.slug
  );

  const [isSubcategory, setIsSubcategory] = useState(initialIsSubcategory);
  const [selectedParent, setSelectedParent] = useState(
    initialIsSubcategory ? (category?.base_category || "") : ""
  );

  // Filter available main categories to select as parent
  const masterCategories = allCategories.length > 0 
    ? allCategories.filter(c => c.id !== category?.id && (!c.base_category || c.base_category === "main" || c.base_category === c.slug))
    : [
        { id: "sofas", name: "Sofas & Diwans", slug: "sofas" },
        { id: "chairs", name: "Chairs & Recliners", slug: "chairs" },
        { id: "dining", name: "Solid Teak Dining", slug: "dining" },
        { id: "tables", name: "Tables & Desks", slug: "tables" },
        { id: "beds", name: "Heirloom Beds & Cots", slug: "beds" },
        { id: "doors", name: "Heritage Doors & Panels", slug: "doors" },
        { id: "wardrobes", name: "Wardrobes & Almirahs", slug: "wardrobes" },
        { id: "tv-units", name: "TV & Entertainment Units", slug: "tv-units" },
        { id: "cabinet", name: "Storage & Crockery Cabinets", slug: "cabinet" },
        { id: "sitout", name: "Sitout & Verandah", slug: "sitout" },
        { id: "study-and-office", name: "Office & Study Workstations", slug: "study-and-office" },
        { id: "coffee-tables", name: "Coffee & Center Tables", slug: "coffee-tables" },
        { id: "benches", name: "Teak Benches", slug: "benches" },
        { id: "outdoor-furniture", name: "Outdoor & Patio", slug: "outdoor-furniture" },
        { id: "wall-decors", name: "Architectural & Wall Decor", slug: "wall-decors" },
      ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    
    // Set base_category based on whether it's a Sub-Category or Main Category
    if (isSubcategory) {
      if (!selectedParent) {
        setError("Please select a Parent Category for this Sub-Category.");
        toast.error("Parent category required");
        setLoading(false);
        return;
      }
      formData.set("base_category", selectedParent);
    } else {
      formData.set("base_category", "main");
    }

    const result = await saveCategory(formData);

    if (result?.error) {
      setError(result.error);
      toast.error("Error saving category", { description: result.error });
      setLoading(false);
    } else {
      toast.success(category ? "Category updated!" : "New category created!");
      router.push("/admin/categories");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Top Action Bar */}
      <div className="flex items-center justify-between pb-6 border-b border-[#EAE8E2]">
        <button
          type="button"
          onClick={() => router.back()}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-950 transition-colors cursor-pointer"
        >
          <ArrowLeft size={16} /> Back to Categories
        </button>
        <button
          type="submit"
          disabled={loading}
          className="bg-[#8A572A] hover:bg-[#1C130D] text-white px-8 py-3 rounded-xl flex items-center gap-2 font-bold text-xs uppercase tracking-wider transition-all disabled:opacity-50 cursor-pointer shadow-md active:scale-95"
        >
          <Save size={16} /> {loading ? "Saving..." : "Save Category"}
        </button>
      </div>

      {error && (
        <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl text-xs font-medium">
          {error}
        </div>
      )}

      <input type="hidden" name="id" value={category?.id || "new"} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Core Metadata Column */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. Hierarchy / Category Type Selector */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A]">
              <FolderTree size={14} />
              <span>TAXONOMY LEVEL</span>
            </div>
            
            <h3 className="text-base font-bold font-cinzel text-slate-900">
              Category Hierarchy & Level
            </h3>

            {/* Category Level Toggle Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => {
                  setIsSubcategory(false);
                  setSelectedParent("");
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  !isSubcategory
                    ? "border-[#8A572A] bg-amber-50/60 ring-2 ring-[#8A572A]/20"
                    : "border-slate-200 bg-[#FAF9F7] hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900">1. Main / Primary Category</span>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    !isSubcategory ? "bg-[#8A572A] text-white" : "border border-slate-300 text-transparent"
                  }`}>
                    ✓
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Top-level collection (e.g. <strong>Sofas</strong>, <strong>Dining</strong>, <strong>Beds</strong>). Appears in main store navigation.
                </p>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSubcategory(true);
                  if (!selectedParent && masterCategories.length > 0) {
                    setSelectedParent(masterCategories[0].slug || masterCategories[0].id);
                  }
                }}
                className={`p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isSubcategory
                    ? "border-[#8A572A] bg-amber-50/60 ring-2 ring-[#8A572A]/20"
                    : "border-slate-200 bg-[#FAF9F7] hover:border-slate-300"
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-slate-900 flex items-center gap-1">
                    <CornerDownRight size={13} className="text-[#8A572A]" />
                    <span>2. Sub-Category</span>
                  </span>
                  <span className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                    isSubcategory ? "bg-[#8A572A] text-white" : "border border-slate-300 text-transparent"
                  }`}>
                    ✓
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 leading-relaxed">
                  Nested under a parent (e.g. <strong>L-Shape Sofas</strong> under <em>Sofas</em>, <strong>Live Edge Tables</strong> under <em>Dining</em>).
                </p>
              </button>
            </div>

            {/* Parent Category Dropdown (Appears if Sub-Category is active) */}
            {isSubcategory && (
              <div className="pt-3 border-t border-slate-100 animate-in fade-in duration-200">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Select Parent Category
                </label>
                <select
                  value={selectedParent}
                  onChange={(e) => setSelectedParent(e.target.value)}
                  required={isSubcategory}
                  className="w-full px-4 py-3 bg-[#FAF9F7] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8A572A] text-xs font-semibold text-slate-900"
                >
                  <option value="" disabled>-- Choose Master Parent Category --</option>
                  {masterCategories.map((parent) => (
                    <option key={parent.id} value={parent.slug || parent.id}>
                      📁 {parent.name} (/{parent.slug || parent.id})
                    </option>
                  ))}
                </select>
                <p className="text-[10px] text-slate-500 mt-1.5">
                  This subcategory will appear inside the parent collection's filter chips on the storefront.
                </p>
              </div>
            )}
          </div>

          {/* 2. Collection Details */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5">
            <h3 className="text-base font-bold font-cinzel text-slate-900">
              Collection Details
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  {isSubcategory ? "Sub-Category Name" : "Category Name"}
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={category?.name}
                  required
                  placeholder={isSubcategory ? "e.g., L-Shape Sectional Sofas" : "e.g., Royal Living Room Sofas"}
                  className="w-full px-4 py-3 bg-[#FAF9F7] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8A572A] transition-all text-sm font-semibold text-slate-900"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Description
                </label>
                <textarea
                  name="description"
                  defaultValue={category?.description || ""}
                  rows={3}
                  placeholder="Summary of this teak wood collection..."
                  className="w-full px-4 py-3 bg-[#FAF9F7] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8A572A] transition-all text-xs resize-none text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* 3. Visual Identity */}
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-4">
            <h3 className="text-base font-bold font-cinzel text-slate-900">
              Visual Showcase Photo
            </h3>

            <ImageUploadField
              name="image_url"
              defaultValue={category?.image_url || ""}
              label="Collection Featured Photo"
              dimensions="800 x 1000px (4:5 Portrait recommended)"
            />
          </div>
        </div>

        {/* Sidebar Settings Column */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-7 rounded-2xl border border-slate-200 shadow-xs space-y-5 sticky top-8">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A]">
              SETTINGS & VISIBILITY
            </h3>

            <div className="space-y-5">
              <div>
                <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Display Sort Order
                </label>
                <input
                  type="number"
                  name="sort_order"
                  defaultValue={category?.sort_order || 0}
                  className="w-full px-4 py-2.5 bg-[#FAF9F7] border border-slate-200 rounded-xl focus:outline-none focus:border-[#8A572A] text-xs font-semibold"
                />
                <p className="text-[10px] text-slate-400 mt-1">Lower numbers appear first in lists.</p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-4">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <div className="relative inline-flex items-center">
                    <input
                      type="checkbox"
                      name="is_featured_check"
                      defaultChecked={category?.is_featured ?? true}
                      className="sr-only peer"
                      onChange={(e) => {
                        const hiddenInput = document.getElementById('is_featured_hidden') as HTMLInputElement;
                        if (hiddenInput) hiddenInput.value = e.target.checked ? "true" : "false";
                      }}
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#8A572A]"></div>
                  </div>
                  <input type="hidden" id="is_featured_hidden" name="is_featured" value={category ? String(category.is_featured) : "true"} />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-700 group-hover:text-slate-950 transition-colors">
                    Feature in Showcase
                  </span>
                </label>
              </div>
            </div>

            <div className="p-4 bg-[#FAF9F7] rounded-xl border border-dashed border-slate-200 text-center mt-4">
              <Layers className="mx-auto text-[#8A572A]/40 mb-2" size={24} />
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                {isSubcategory 
                  ? `Sub-category of "${selectedParent || 'Parent'}" — allows customers to filter catalog items with precision.`
                  : "Main collections appear across homepage banners, rooms, and primary filter tabs."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
