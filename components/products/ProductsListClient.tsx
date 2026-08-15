// components/products/ProductsListClient.tsx
"use client";

import { useState, useEffect } from "react";
import ProductCard from "@/components/ui/ProductCard";
import FadeInView from "@/components/ui/FadeInView";
import { Search, SlidersHorizontal, Grid3x3, LayoutGrid } from "lucide-react";
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
  const [viewMode, setViewMode] = useState<"grid" | "compact">("grid");
  const [sortBy, setSortBy] = useState("Featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      setActiveCategory(categoryParam);
    }
  }, [searchParams]);

  const categoryNames = [
    "All Products",
    "Sofas",
    "Chairs",
    "Tables",
    "Dining",
    "Lounge Chairs",
    "Sitout",
    "Study and Office",
    "Beds",
    "TV Units",
    "Coffee Tables",
    "Cabinet",
    "Bookshelves",
    "Diwan Beds",
    "Wardrobes",
    "Benches",
    "Shoes Racks",
    "Outdoor Furniture",
    "Bedside Table",
    "Wall Decors",
    "Living Room",
    "Dining Room",
    "Bedroom",
  ];
  const sortOptions = ["Featured", "Newest First", "Price: Low to High", "Price: High to Low"];

  const filteredProducts = initialProducts.filter((p) => {
    const term = activeCategory.toLowerCase();
    const matchesCategory =
      activeCategory === "All Products" ||
      p.name.toLowerCase().includes(term) ||
      p.categories?.name?.toLowerCase().includes(term) ||
      p.category_id?.toLowerCase().includes(term) ||
      p.type?.toLowerCase().includes(term) ||
      p.room?.toLowerCase().includes(term) ||
      (p.description?.toLowerCase().includes(term) || false);
    const matchesSearch =
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.short_description?.toLowerCase().includes(searchTerm.toLowerCase()) || false);
    return matchesCategory && matchesSearch;
  });

  const parsePrice = (price: string | null | undefined): number => {
    if (!price) return 0;
    return parseFloat(price.replace(/[^\d.]/g, "")) || 0;
  };

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "Newest First":
        return (b.created_at || "").localeCompare(a.created_at || "");
      case "Price: Low to High":
        return parsePrice(a.price) - parsePrice(b.price);
      case "Price: High to Low":
        return parsePrice(b.price) - parsePrice(a.price);
      default:
        return 0;
    }
  });

  return (
    <>
      {/* ── Search & Category Filter Bar (Sticky) ── */}
      <section className="sticky top-16 md:top-20 z-40 bg-white/95 backdrop-blur-md border-b border-[#EBEBEA]">
        <div className="max-container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-3 border-b border-[#F0F0EE]">
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#888888]" size={16} />
              <input
                type="text"
                placeholder="Search teak furniture pieces..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-[#FAFAF9] border border-[#E0E0DE] rounded-xs text-xs md:text-sm text-[#141414] focus:outline-none focus:border-[#141414] transition-colors"
              />
            </div>

            {/* Sort & View Modes */}
            <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 bg-[#FAFAF9] border border-[#E0E0DE] rounded-xs text-xs font-semibold uppercase tracking-wider text-[#141414] focus:outline-none cursor-pointer"
              >
                {sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <div className="flex items-center gap-1 p-1 bg-[#FAFAF9] rounded-xs border border-[#E0E0DE]">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-xs transition-colors ${
                    viewMode === "grid" ? "bg-white shadow-xs text-[#141414]" : "text-[#888888] hover:text-[#141414]"
                  }`}
                  aria-label="Grid view"
                >
                  <LayoutGrid size={15} />
                </button>
                <button
                  onClick={() => setViewMode("compact")}
                  className={`p-1.5 rounded-xs transition-colors ${
                    viewMode === "compact" ? "bg-white shadow-xs text-[#141414]" : "text-[#888888] hover:text-[#141414]"
                  }`}
                  aria-label="Compact view"
                >
                  <Grid3x3 size={15} />
                </button>
              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden p-2 bg-[#FAFAF9] border border-[#E0E0DE] rounded-xs text-[#141414]"
                aria-label="Toggle Filters"
              >
                <SlidersHorizontal size={15} />
              </button>
            </div>
          </div>

          {/* Categories Tab Strip */}
          <div className={`${showFilters ? "block" : "hidden md:block"}`}>
            <div className="flex items-center gap-6 py-3 overflow-x-auto no-scrollbar">
              {categoryNames.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative text-xs font-semibold tracking-[0.1em] uppercase transition-all whitespace-nowrap pb-2 group ${
                    activeCategory === cat ? "text-[#141414]" : "text-[#777777] hover:text-[#141414]"
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-[#141414]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Product Grid ── */}
      <section className="py-12 md:py-16 bg-[#FAFAF9]">
        <div className="max-container">
          <div className="flex items-center justify-between mb-8">
            <p className="text-xs text-[#777777]">
              Showing <span className="font-semibold text-[#141414]">{sortedProducts.length}</span> of {initialProducts.length} handcrafted pieces
            </p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchTerm + viewMode}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className={`grid gap-6 md:gap-8 ${
                viewMode === "grid"
                  ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                  : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
              }`}
            >
              {sortedProducts.map((product, index) => (
                <FadeInView key={product.slug} delay={index * 0.03}>
                  <ProductCard product={product} compact={viewMode === "compact"} />
                </FadeInView>
              ))}
            </motion.div>
          </AnimatePresence>

          {sortedProducts.length === 0 && (
            <div className="py-24 text-center">
              <h3 className="text-2xl font-serif font-bold text-[#141414] mb-2">
                No pieces found
              </h3>
              <p className="text-[#666666] text-sm mb-6 max-w-md mx-auto">
                Try adjusting your search filters or contact our Nilambur workshop directly for bespoke furniture commissions.
              </p>
              <button
                onClick={() => {
                  setActiveCategory("All Products");
                  setSearchTerm("");
                  setSortBy("Featured");
                }}
                className="btn-primary"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
