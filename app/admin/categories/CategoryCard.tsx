"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, ListTree, ExternalLink, CornerDownRight, Folder } from "lucide-react";
import { deleteCategory, toggleCategoryFeatured } from "@/app/actions/cms";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Categories } from "@/lib/types";

interface CategoryCardProps {
  category: Categories;
  parentName?: string;
  subCategoryCount?: number;
}

export default function CategoryCard({ category, parentName, subCategoryCount }: CategoryCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const isSubcategory = Boolean(
    category.base_category &&
    category.base_category !== "main" &&
    category.base_category !== "none" &&
    category.base_category !== category.slug
  );

  const handleDelete = async () => {
    if (!category.id || category.id.length < 10) {
      toast.info("Master Category Default", {
        description: "This is a core master category. Create a database record to modify it.",
      });
      return;
    }

    toast.warning(`Delete "${category.name}"?`, {
      description: "This will affect linked products.",
      action: {
        label: "Delete",
        onClick: async () => {
          setIsDeleting(true);
          const result = await deleteCategory(category.id);
          if (result?.error) {
            toast.error("Error", { description: result.error });
            setIsDeleting(false);
          } else {
            toast.success("Category deleted");
          }
        },
      },
      cancel: {
        label: "Cancel",
        onClick: () => {},
      },
    });
  };

  if (isDeleting) return null;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border border-[#EAE8E2] rounded-2xl overflow-hidden hover:border-[#8A572A] hover:shadow-md transition-all group flex flex-col h-full shadow-xs"
    >
      {/* Category Image Header */}
      <div className="relative h-44 bg-[#F7F4F0] overflow-hidden">
        {category.image_url ? (
          <img
            src={category.image_url}
            alt={category.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-[#8A572A]/30">
            <ListTree size={40} />
          </div>
        )}

        {/* Level Badge (Main vs Sub-category) */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          <span className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs backdrop-blur-md flex items-center gap-1 ${
            isSubcategory
              ? "bg-amber-900/85 text-amber-200 border border-amber-500/30"
              : "bg-[#1C130D]/85 text-white"
          }`}>
            {isSubcategory ? (
              <>
                <CornerDownRight size={10} />
                <span>Sub-Category</span>
              </>
            ) : (
              <>
                <Folder size={10} />
                <span>Main Category</span>
              </>
            )}
          </span>

          {typeof subCategoryCount === "number" && subCategoryCount > 0 && (
            <span className="bg-emerald-900/85 text-emerald-200 border border-emerald-500/30 text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md backdrop-blur-md">
              {subCategoryCount} Sub-{subCategoryCount === 1 ? "Cat" : "Cats"}
            </span>
          )}
        </div>

        {/* Featured Toggle Button */}
        <div className="absolute top-3 right-3">
          <button
            type="button"
            onClick={async () => {
              const newStatus = !category.is_featured;
              const res = await toggleCategoryFeatured(category.id, newStatus);
              if (res?.error) {
                toast.error("Failed to update status");
              } else {
                toast.success(newStatus ? "Featured on Home" : "Removed from Featured");
              }
            }}
            className={`text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs transition-all cursor-pointer ${
              category.is_featured
                ? "bg-[#8A572A] text-white hover:bg-slate-900"
                : "bg-white/90 text-slate-600 hover:bg-[#8A572A] hover:text-white border border-slate-200"
            }`}
            title="Click to toggle featured status on homepage"
          >
            {category.is_featured ? "★ Featured" : "+ Feature"}
          </button>
        </div>
      </div>

      {/* Body Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Parent Breadcrumb if Subcategory */}
        {isSubcategory && (
          <div className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#8A572A] mb-1">
            <span>Parent:</span>
            <span className="bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              {parentName || category.base_category}
            </span>
          </div>
        )}

        <h3 className="font-cinzel text-base font-bold text-[#1C130D] mb-1.5">{category.name}</h3>
        <p className="text-xs text-[#7A6E65] leading-relaxed mb-4 line-clamp-2">
          {category.description || "Solid Nilambur teak wood handcrafted piece collection."}
        </p>

        {/* Footer Actions */}
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-[#F0EDE6]">
          <span className="text-[11px] font-mono font-bold text-[#8A572A]">
            /{category.slug}
          </span>

          <div className="flex items-center gap-1">
            <Link
              href={`/products?category=${category.slug}`}
              target="_blank"
              className="p-1.5 text-[#7A6E65] hover:text-[#8A572A] hover:bg-[#F7F4F0] rounded-md transition-colors"
              title="View on site"
            >
              <ExternalLink size={14} />
            </Link>

            <Link
              href={`/admin/categories/${category.id}`}
              className="p-1.5 text-[#7A6E65] hover:text-[#1C130D] hover:bg-[#F7F4F0] rounded-md transition-colors"
              title="Edit Category"
            >
              <Edit2 size={14} />
            </Link>

            <button
              onClick={handleDelete}
              className="p-1.5 text-[#7A6E65] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
              title="Delete Category"
            >
              <Trash2 size={14} />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
