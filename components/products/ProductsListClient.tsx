// components/products/ProductsListClient.tsx
"use client";

import { useState, useEffect, useMemo, useCallback } from "react";
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

const clean = (str?: string | null) => (str || "").toLowerCase().replace(/[^a-z0-9]/g, "");

const roomCategories = [
  "living-room",
  "dining-room",
  "bedroom",
  "sitout",
  "study-office",
  "study-and-office",
];

export default function ProductsListClient({ initialProducts, categories }: ProductsListClientProps) {
  const searchParams = useSearchParams();

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

  // Curated category order
  const priorityOrder = [
    "All Products",
    "Sofas",
    "Chairs",
    "Dining",
    "Tables",
    "Lounge Chairs",
    "Beds",
    "Carved Teak Doors",
    "Diwan Beds",
    "Sitout",
    "TV Units",
    "Coffee Tables",
    "Study and Office",
    "Wardrobes",
    "Cabinet",
    "Bookshelves",
    "Benches",
    "Outdoor Furniture",
    "Bedside Table",
    "Wall Decors",
    "Other Furniture",
    "Living Room",
    "Dining Room",
    "Bedroom",
  ];

  // Combine and sort tabs by priority
  const tabNames = useMemo(() => {
    const allSet = new Set([
      ...priorityOrder,
      ...dbMainCategories.map((c) => c.name),
    ]);
    const list = Array.from(allSet);
    return list.sort((a, b) => {
      const idxA = priorityOrder.indexOf(a);
      const idxB = priorityOrder.indexOf(b);
      if (idxA !== -1 && idxB !== -1) return idxA - idxB;
      if (idxA !== -1) return -1;
      if (idxB !== -1) return 1;
      return a.localeCompare(b);
    });
  }, [dbMainCategories]);

  // Resolver for URL params
  const resolveCategoryFromParam = useCallback(
    (paramValue: string | null) => {
      if (!paramValue || paramValue.toLowerCase() === "all" || paramValue.toLowerCase() === "all-products") {
        return "All Products";
      }
      const cleanParam = clean(paramValue);
      const exact = tabNames.find((t) => clean(t) === cleanParam);
      if (exact) return exact;

      const fuzzy = tabNames.find(
        (t) => clean(t).includes(cleanParam) || cleanParam.includes(clean(t))
      );
      if (fuzzy) return fuzzy;

      return paramValue;
    },
    [tabNames]
  );

  const [activeCategory, setActiveCategory] = useState(() => {
    const p = searchParams.get("category") || searchParams.get("room");
    return resolveCategoryFromParam(p);
  });
  const [activeSubCategory, setActiveSubCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Sync with searchParams
  useEffect(() => {
    const p = searchParams.get("category") || searchParams.get("room");
    setActiveCategory(resolveCategoryFromParam(p));
    setActiveSubCategory("all");
  }, [searchParams, resolveCategoryFromParam]);

  // Tab switch handler with URL update
  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setActiveSubCategory("all");
    setSearchTerm("");

    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (cat === "All Products") {
        url.searchParams.delete("category");
        url.searchParams.delete("room");
      } else {
        const slug = cat.toLowerCase().replace(/\s+/g, "-");
        url.searchParams.set("category", slug);
        url.searchParams.delete("room");
      }
      window.history.pushState({}, "", url.toString());
    }
  };

  // Active Main Category Object (if matched in DB)
  const activeDbCategory = categories.find(
    (c) =>
      clean(c.name) === clean(activeCategory) ||
      clean(c.slug) === clean(activeCategory)
  );

  // Sub-Categories belonging to the active category
  const currentSubCategories = activeCategory === "All Products"
    ? []
    : dbSubCategories.filter((sub) => {
        const parentClean = clean(sub.base_category);
        const activeClean = clean(activeCategory);
        const slugClean = clean(activeDbCategory?.slug);
        const idClean = clean(activeDbCategory?.id);

        return (
          parentClean === activeClean ||
          parentClean === slugClean ||
          parentClean === idClean ||
          activeClean.includes(parentClean) ||
          parentClean.includes(activeClean)
        );
      });

  const sortOptions = ["Featured", "Newest First", "Alphabetical (A-Z)"];

  // Helper to match a product to a category strictly
  const matchProductCategory = useCallback((p: Product, catName: string) => {
    if (!catName || clean(catName) === "allproducts" || clean(catName) === "all") return true;
    const catClean = clean(catName);

    const pCatName = clean(p.categories?.name);
    const pCatSlug = clean(p.categories?.slug);
    const pRoom = clean(p.room);

    // 1. Direct match on Category Name or Slug
    if (pCatName === catClean || pCatSlug === catClean) return true;

    // 2. Room category check (e.g. "Dining Room", "Living Room", "Bedroom", "Sitout")
    const isRoomFilter = roomCategories.some((r) => clean(r) === catClean) || catClean.includes("room");
    if (isRoomFilter) {
      if (pRoom === catClean) return true;
      if (catClean.includes("dining") && pRoom.includes("dining")) return true;
      if (catClean.includes("living") && pRoom.includes("living")) return true;
      if (catClean.includes("bedroom") && pRoom.includes("bedroom")) return true;
      if (catClean.includes("sitout") && pRoom.includes("sitout")) return true;
      if (catClean.includes("office") && pRoom.includes("office")) return true;
    }

    // 3. For "Dining" collection tab: includes items in Dining category OR Dining Room
    if (catClean === "dining") {
      if (pCatName === "dining" || pCatSlug === "dining" || pRoom.includes("dining")) return true;
    }

    // 4. Doors matching (Carved Teak Doors / doors)
    if (catClean.includes("door")) {
      return pCatName.includes("door") || pCatSlug.includes("door");
    }

    return false;
  }, []);

  // Filtered Products Logic
  const filteredProducts = useMemo(() => {
    return initialProducts.filter((p) => {
      const subClean = clean(activeSubCategory);

      // 1. Sub-Category specific matching
      if (activeSubCategory !== "all" && subClean) {
        const productFields = [
          p.name,
          p.categories?.name,
          p.categories?.slug,
          p.room,
          p.type,
          p.material,
          p.short_description,
        ].filter(Boolean) as string[];

        const matchSub = productFields.some(
          (f) => clean(f).includes(subClean) || subClean.includes(clean(f))
        );
        const matchesSearch =
          !searchTerm.trim() ||
          p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (p.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

        return matchSub && matchesSearch;
      }

      // 2. Main Category Strict Matching
      const matchesCategory = matchProductCategory(p, activeCategory);

      // 3. Search Term matching
      const matchesSearch =
        !searchTerm.trim() ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (p.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);

      return matchesCategory && matchesSearch;
    });
  }, [initialProducts, activeCategory, activeSubCategory, searchTerm, matchProductCategory]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      switch (sortBy) {
        case "Newest First":
          return (b.created_at || "").localeCompare(a.created_at || "");
        case "Alphabetical (A-Z)":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });
  }, [filteredProducts, sortBy]);

  // Helper to count available items per category
  const getCategoryCount = useCallback((catName: string) => {
    if (catName === "All Products") return initialProducts.length;
    return initialProducts.filter((p) => matchProductCategory(p, catName)).length;
  }, [initialProducts, matchProductCategory]);

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
              className="flex items-center gap-6 py-3.5 overflow-x-auto hide-scrollbar"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {tabNames.map((cat) => {
                const isActive = clean(activeCategory) === clean(cat);
                const count = getCategoryCount(cat);

                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => handleSelectCategory(cat)}
                    className={`relative text-xs font-bold tracking-[0.1em] uppercase transition-all whitespace-nowrap pb-2 group cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? "text-[#141414]"
                        : "text-[#777777] hover:text-[#141414]"
                    }`}
                  >
                    <span>{cat}</span>
                    {count > 0 && (
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                        isActive ? "bg-[#8A572A] text-white" : "bg-slate-100 text-slate-500"
                      }`}>
                        {count}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2.5px] bg-[#8A572A]" />
                    )}
                  </button>
                );
              })}
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
              {currentSubCategories.map((sub) => {
                const isSubActive = clean(activeSubCategory) === clean(sub.name);
                return (
                  <button
                    key={sub.id}
                    type="button"
                    onClick={() => setActiveSubCategory(sub.name)}
                    className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                      isSubActive
                        ? "bg-[#8A572A] text-white shadow-xs ring-2 ring-[#8A572A]/20"
                        : "bg-[#FAFAF9] text-[#666666] hover:bg-[#EAE8E2] border border-[#E0E0DE]"
                    }`}
                  >
                    {sub.name}
                  </button>
                );
              })}
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
              <h3 className="text-lg font-serif font-bold text-[#141414] mb-2">
                No &quot;{activeCategory}&quot; Pieces Found
              </h3>
              <p className="text-xs text-[#777777] max-w-sm mx-auto mb-6">
                No products are currently cataloged under {activeCategory}. You can add pieces for this category anytime in the Admin panel.
              </p>
              <button
                type="button"
                onClick={() => handleSelectCategory("All Products")}
                className="bg-[#8A572A] text-white px-6 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider shadow-md hover:bg-[#1C130D] transition-colors cursor-pointer"
              >
                View All {initialProducts.length} Pieces
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
