// components/products/ProductListWithFilter.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Filter, X } from "lucide-react";
import ProductCard from "@/components/ui/ProductCard";
import { Product } from "@/lib/types";
import FilterSection from "./FilterSection";

interface ProductListWithFilterProps {
  initialProducts: Product[];
  category: string;
}

export default function ProductListWithFilter({
  initialProducts,
  category,
}: ProductListWithFilterProps) {
  const [activeType, setActiveType] = useState("All");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 20);
    if (latest > previous && latest > 150) {
      setIsNavbarVisible(false);
    } else if (latest < previous) {
      setIsNavbarVisible(true);
    }
    if (latest < 50) {
      setIsNavbarVisible(true);
    }
  });

  useEffect(() => {
    if (isFilterOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFilterOpen]);

  const uniqueTypes = useMemo(() => {
    const types = initialProducts
      .map((p) => p.type)
      .filter((t): t is string => !!t);
    return Array.from(new Set(types)).sort();
  }, [initialProducts]);

  const filteredProducts = useMemo(() => {
    if (activeType === "All") return initialProducts;
    return initialProducts.filter((p) => p.type === activeType);
  }, [activeType, initialProducts]);

  const stickyTop = isNavbarVisible
    ? (scrolled ? "68px" : "80px")
    : "0px";

  return (
    <>
      {/* Count Bar */}
      <motion.div
        animate={{ top: stickyTop }}
        transition={{ duration: 0.3 }}
        className="sticky z-30 bg-white/95 backdrop-blur-md border-b border-[#EBEBEA] py-3.5 shadow-xs"
      >
        <div className="max-container flex items-center justify-between">
          <p className="text-xs tracking-wider uppercase text-[#777777] m-0">
            Showing <strong className="text-[#141414] font-semibold">{filteredProducts.length} pieces</strong>
            {activeType !== "All" && (
              <span className="hidden sm:inline"> — Filtered by <strong className="text-[#7A4E2D]">{activeType}</strong></span>
            )}
          </p>

          {uniqueTypes.length > 0 && (
            <button
              onClick={() => setIsFilterOpen(true)}
              className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase text-[#141414] hover:text-[#7A4E2D] transition-colors"
            >
              <span>Filter</span>
              <Filter size={13} />
            </button>
          )}
        </div>
      </motion.div>

      {/* Filter Sidebar Drawer */}
      <AnimatePresence>
        {isFilterOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsFilterOpen(false)}
              className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[100]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-white z-[101] shadow-2xl"
            >
              <FilterSection
                types={uniqueTypes}
                activeType={activeType}
                onTypeChange={(type) => {
                  setActiveType(type);
                  setIsFilterOpen(false);
                }}
                onClose={() => setIsFilterOpen(false)}
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Product Grid */}
      <section className="py-12 md:py-16 bg-[#FAFAF9] min-h-[400px]">
        <div className="max-container">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
            {filteredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[#777777] text-sm">
                No products found in this category.
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
