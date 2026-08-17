// components/products/ProductsListClient.tsx
"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";
import { Search, SlidersHorizontal, CornerDownRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { Categories, Product } from "@/lib/types";

interface ProductsListClientProps {
  initialProducts: Product[];
  categories: Categories[];
}

export default function ProductsListClient({ initialProducts, categories }: ProductsListClientProps) {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All Products";

  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveCategory(categoryParam);
      setActiveSubCategory("all");
    }
  }, [searchParams]);

  // Separate Main Categories vs Sub-Categories
  const isSubcategory = (c: Categories) =>
    Boolean(
      c.base_category &&
      c.base_category !== "main" &&
      c.base_category !== "none" &&
      c.base_category !== c.slug
    );

  const dbMainCategories = categories.filter((c) => !isSubcategory(c));
  const dbSubCategories = categories.filter((c) => isSubcategory(c));

  // Primary navigation tabs
  const defaultCategoryNames = [
    "All Products",
    "Sofas",
    "Dining",
    "Beds",
    "Chairs",
    "Tables",
    "Lounge Chairs",
    "Sitout",
    "Study and Office",
    "TV Units",
    "Coffee Tables",
    "Cabinet",
    "Bookshelves",
    "Diwan Beds",
    "Wardrobes",
    "Benches",
    "Outdoor Furniture",
    "Living Room",
    "Dining Room",
    "Bedroom",
  ];

  // Combine DB main categories with fallback defaults
  const tabNames = [
    "All Products",
    ...Array.from(
      new Set([
        ...dbMainCategories.map((c) => c.name),
        ...defaultCategoryNames.slice(1),
      ])
    ),
  ];

  // Active Main Category Object (if matched in DB)
  const activeDbCategory = categories.find(
    (c) =>
      c.name.toLowerCase() === activeCategory.toLowerCase() ||
      c.slug.toLowerCase() === activeCategory.toLowerCase()
  );

  // Find Sub-Categories belonging to the currently active category
  const currentSubCategories = activeCategory === "All Products"
    ? []
    : dbSubCategories.filter((sub) => {
        const parentRef = (sub.base_category || "").toLowerCase();
        const activeName = activeCategory.toLowerCase();
        const activeSlug = activeDbCategory?.slug?.toLowerCase() || "";
        const activeId = activeDbCategory?.id?.toLowerCase() || "";
        return (
          parentRef === activeName ||
          parentRef === activeSlug ||
          parentRef === activeId ||
          activeName.includes(parentRef) ||
          parentRef.includes(activeName)
        );
      });

  const sortOptions = ["Featured", "Newest First", "Alphabetical (A-Z)"];

  // Filtered Products Logic
  const filteredProducts = initialProducts.filter((p) => {
    const mainTerm = activeCategory.toLowerCase();
    const subTerm = activeSubCategory.toLowerCase();

    // 1. Sub-Category specific matching if a sub-category chip is selected
    if (activeSubCategory !== "all") {
      const matchSub =
        p.name.toLowerCase().includes(subTerm) ||
        p.categories?.name?.toLowerCase().includes(subTerm) ||
        p.categories?.slug?.toLowerCase().includes(subTerm) ||
        p.category_id?.toLowerCase().includes(subTerm) ||
        p.type?.toLowerCase().includes(subTerm) ||
        (p.description?.toLowerCase().includes(subTerm) || false);

      const matchesSearch =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

      return matchSub && matchesSearch;
    }

    // 2. Main Category matching
    const matchesCategory =
      activeCategory === "All Products" ||
      p.name.toLowerCase().includes(mainTerm) ||
      p.categories?.name?.toLowerCase().includes(mainTerm) ||
      p.categories?.slug?.toLowerCase().includes(mainTerm) ||
      p.category_id?.toLowerCase().includes(mainTerm) ||
      p.type?.toLowerCase().includes(mainTerm) ||
      p.room?.toLowerCase().includes(mainTerm) ||
      (p.description?.toLowerCase().includes(mainTerm) || false);

    // 3. Search Term matching
    const matchesSearch =
      !searchTerm.trim() ||
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Newest First":
        return (b.created_at || "").localeCompare(a.created_at || "");
      case "Alphabetical (A-Z)":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <>
      {/* ── Search & Category Filter Bar ── */}
      <section className="bg-white border-b border-[#EBEBEA] shadow-xs">
        <div className="max-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-4 border-b border-[#F0F0EE]">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" size={16} />
              <input
                type="text"
                placeholder="Search teak furniture pieces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-[#FAFAF9] border border-[#E0E0DE] rounded-xl text-xs md:text-sm text-[#141414] focus:outline-none focus:border-[#8A572A] transition-colors"
              />
            </div>

            {/* Sort & View Modes */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2.5 bg-[#FAFAF9] border border-[#E0E0DE] rounded-xl text-xs font-semibold uppercase tracking-wider text-[#141414] focus:outline-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2 bg-[#FAFAF9] border border-[#E0E0DE] rounded-lg text-[#141414] cursor-pointer"
                aria-label="Toggle Filters"
              >
                <SlidersHorizontal size={15} />
              </button>
            </div>
          </div>

          {/* ── 1. Master Categories Tab Strip ── */}
          <div className={`${showFilters ? "block" : "hidden md:block"}`}>
            <div
              className="flex items-center gap-6 py-3 overflow-x-auto hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {tabNames.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setActiveCategory(cat);
                    setActiveSubCategory("all");
                  }}
                  className={`relative text-xs font-bold tracking-[0.1em] uppercase transition-all whitespace-nowrap pb-2 group cursor-pointer ${
                    activeCategory.toLowerCase() === cat.toLowerCase()
                      ? "text-[#141414]"
                      : "text-[#777777] hover:text-[#141414]"
                  }`}
                >
                  {cat}
                  {activeCategory.toLowerCase() === cat.toLowerCase() && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#8A572A]" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* ── 2. Nested Sub-Category Filter Chips Bar (Animated) ── */}
          {currentSubCategories.length > 0 && (
            <div className="py-2.5 border-t border-[#F0F0EE] flex items-center gap-2 overflow-x-auto hide-scrollbar">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#8A572A] whitespace-nowrap flex items-center gap-1 pl-1 pr-2">
                <CornerDownRight size={12} />
                <span>Sub-Categories:</span>
              </span>

              {/* All Subcategories Option */}
              <button
                type="button"
                onClick={() => setActiveSubCategory("all")}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeSubCategory === "all"
                    ? "bg-[#1C130D] text-white shadow-xs"
                    : "bg-[#FAFAF9] text-[#666666] hover:bg-[#EAE8E2] border border-[#E0E0DE]"
                }`}
              >
                All {activeCategory}
              </button>

              {/* Individual Sub-Category Chips */}
              {currentSubCategories.map((sub) => (
                <button
                  key={sub.id}
                  type="button"
                  onClick={() => setActiveSubCategory(sub.name)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeSubCategory.toLowerCase() === sub.name.toLowerCase()
                      ? "bg-[#8A572A] text-white shadow-xs ring-2 ring-[#8A572A]/20"
                      : "bg-[#FAFAF9] text-[#666666] hover:bg-[#EAE8E2] border border-[#E0E0DE]"
                  }`}
                >
                  {sub.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="py-10 sm:py-14 bg-[#FAFAF9]">
        <div className="max-container">
          <div className="flex items-center justify-between mb-6">
            <p className="text-xs text-[#777777]">
              Showing <span className="font-semibold text-[#141414]">{sortedProducts.length}</span> of {initialProducts.length} handcrafted pieces
              {activeSubCategory !== "all" && (
                <span className="text-[#8A572A] font-bold ml-1.5">
                  • Filtered by &quot;{activeSubCategory}&quot;
                </span>
              )}
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + activeSubCategory + searchTerm}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-6 md:gap-8"
            >
              {sortedProducts.map((product, index) => (
                <FadeInView key={product.slug} delay={index * 0.03}>
                  <ProductCard product={product} />
                </FadeInView>
              ))}
            </motion.div>
          </AnimatePresence>

          {sortedProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-2xl border border-[#EBEBEA] shadow-xs">
              <Sparkles className="mx-auto text-[#8A572A] mb-3" size={28} />
              <h3 className="text-lg font-serif font-bold text-[#141414] mb-2">No Teak Pieces Found</h3>
              <p className="text-xs text-[#777777] max-w-sm mx-auto mb-6">
                No items match your selected filters. Try choosing a different category or clearing your search term.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All Products");
                  setActiveSubCategory("all");
                  setSearchTerm("");
                }}
                className="bg-[#8A572A] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#1C130D] transition-colors cursor-pointer"
              >
                Reset Catalog Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
