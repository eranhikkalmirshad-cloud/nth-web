"use client";

import { useState } from "react";
import Link from "next/link";
import { Edit2, Trash2, ListTree, ExternalLink } from "lucide-react";
import { deleteCategory } from "@/app/actions/cms";
import { motion } from "framer-motion";
import { toast } from "sonner";
import { Categories } from "@/lib/types";

interface CategoryCardProps {
  category: Categories;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

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
      className="bg-white border border-[#EAE8E2] rounded-xl overflow-hidden hover:border-[#8A572A] hover:shadow-md transition-all group flex flex-col h-full shadow-xs"
    >
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

        <div className="absolute top-3 left-3">
          <span className="bg-[#1C130D]/80 backdrop-blur-xs text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md">
            Order: {category.sort_order || 1}
          </span>
        </div>

        {category.is_featured && (
          <div className="absolute top-3 right-3">
            <span className="bg-[#8A572A] text-white text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md shadow-xs">
              ★ Featured
            </span>
          </div>
        )}
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-cinzel text-base font-bold text-[#1C130D] mb-1.5">{category.name}</h3>
        <p className="text-xs text-[#7A6E65] leading-relaxed mb-4 line-clamp-2">
          {category.description || "Solid Nilambur teak wood handcrafted piece collection."}
        </p>

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
              className="p-1.5 text-[#7A6E65] hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"
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
