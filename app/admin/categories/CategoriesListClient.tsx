"use client";

import { useState } from "react";
import { Categories } from "@/lib/types";
import CategoryCard from "./CategoryCard";
import { Search, FolderTree, CornerDownRight, Filter } from "lucide-react";

interface CategoriesListClientProps {
  categories: Categories[];
}

export default function CategoriesListClient({ categories }: CategoriesListClientProps) {
  const [filterMode, setFilterMode] = useState<"all" | "main" | "sub">("all");
  const [selectedParentFilter, setSelectedParentFilter] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Separate main categories vs sub-categories
  const isSubcategory = (c: Categories) =>
    Boolean(
      c.base_category &&
      c.base_category !== "main" &&
      c.base_category !== "none" &&
      c.base_category !== c.slug
    );

  const mainCategories = categories.filter((c) => !isSubcategory(c));
  const subCategories = categories.filter((c) => isSubcategory(c));

  // Map of parent slugs to parent names
  const parentNameMap: Record<string, string> = {};
  mainCategories.forEach((m) => {
    parentNameMap[m.slug] = m.name;
    parentNameMap[m.id] = m.name;
  });

  // Count subcategories for each main category
  const subCategoryCounts: Record<string, number> = {};
  subCategories.forEach((s) => {
    const p = s.base_category || "";
    subCategoryCounts[p] = (subCategoryCounts[p] || 0) + 1;
  });

  // Filtered list
  const filtered = categories.filter((cat) => {
    const isSub = isSubcategory(cat);
    
    // Tab filter
    if (filterMode === "main" && isSub) return false;
    if (filterMode === "sub" && !isSub) return false;

    // Parent filter
    if (selectedParentFilter !== "all") {
      if (isSub && cat.base_category !== selectedParentFilter) return false;
      if (!isSub && cat.slug !== selectedParentFilter && cat.id !== selectedParentFilter) return false;
    }

    // Search query
    if (searchTerm.trim()) {
      const q = searchTerm.toLowerCase();
      const matchName = cat.name.toLowerCase().includes(q);
      const matchSlug = cat.slug.toLowerCase().includes(q);
      const matchDesc = (cat.description || "").toLowerCase().includes(q);
      const matchParent = isSub && (parentNameMap[cat.base_category || ""] || "").toLowerCase().includes(q);
      return matchName || matchSlug || matchDesc || matchParent;
    }

    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="bg-white p-4 sm:p-5 rounded-2xl border border-[#EAE8E2] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input
            type="text"
            placeholder="Search categories or sub-categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-[#FAF9F7] border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-900 focus:outline-none focus:border-[#8A572A]"
          />
        </div>

        {/* Tab Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          <div className="flex items-center p-1 bg-[#FAF9F7] rounded-xl border border-slate-200">
            <button
              onClick={() => {
                setFilterMode("all");
                setSelectedParentFilter("all");
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filterMode === "all" ? "bg-[#8A572A] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              All ({categories.length})
            </button>

            <button
              onClick={() => setFilterMode("main")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filterMode === "main" ? "bg-[#8A572A] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              📁 Main ({mainCategories.length})
            </button>

            <button
              onClick={() => setFilterMode("sub")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-all cursor-pointer ${
                filterMode === "sub" ? "bg-[#8A572A] text-white shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              ↳ Sub-Cats ({subCategories.length})
            </button>
          </div>

          {/* Filter by Specific Parent */}
          {mainCategories.length > 0 && (
            <select
              value={selectedParentFilter}
              onChange={(e) => setSelectedParentFilter(e.target.value)}
              className="px-3 py-2 bg-[#FAF9F7] border border-slate-200 rounded-xl text-xs font-bold text-slate-700 focus:outline-none focus:border-[#8A572A] cursor-pointer"
            >
              <option value="all">All Parent Groups</option>
              {mainCategories.map((m) => (
                <option key={m.id} value={m.slug || m.id}>
                  {m.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Categories Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((category) => (
          <CategoryCard
            key={category.id}
            category={category}
            parentName={category.base_category ? parentNameMap[category.base_category] : undefined}
            subCategoryCount={subCategoryCounts[category.slug] || subCategoryCounts[category.id] || 0}
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="p-12 text-center bg-white rounded-2xl border border-slate-200">
          <FolderTree className="mx-auto text-slate-300 mb-3" size={32} />
          <h4 className="text-base font-bold text-slate-900 mb-1">No categories match your criteria</h4>
          <p className="text-xs text-slate-500">Try changing your search term or filter selection.</p>
        </div>
      )}
    </div>
  );
}
