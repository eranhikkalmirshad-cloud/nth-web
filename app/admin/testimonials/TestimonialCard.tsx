"use client";

import { useState } from "react";
import Link from "next/link";
import { Star, Edit2, Trash2, Quote } from "lucide-react";
import { deleteTestimonial } from "@/app/actions/cms";
import { Testimonial } from "@/lib/types";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export default function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!testimonial.id || testimonial.id.length < 5) {
      toast.info("Default System Review", {
        description: "Add a database review in the Supabase table or admin form to customize.",
      });
      return;
    }

    toast.warning(`Delete review?`, {
      description: `From ${testimonial.client_name}`,
      action: {
        label: "Delete",
        onClick: async () => {
          setIsDeleting(true);
          const result = await deleteTestimonial(testimonial.id);
          if (result?.error) {
            toast.error("Error", { description: result.error });
            setIsDeleting(false);
          } else {
            toast.success("Testimonial deleted");
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
      className="bg-white border border-[#EAE8E2] rounded-xl p-6 hover:border-[#8A572A] hover:shadow-md transition-all group relative flex flex-col h-full shadow-xs"
    >
      <div className="absolute top-4 right-4 p-2 opacity-5 pointer-events-none group-hover:opacity-10 transition-opacity">
        <Quote size={60} />
      </div>

      <div className="flex items-start justify-between mb-4">
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={13}
              className={
                i < (testimonial.rating || 5)
                  ? "fill-[#8A572A] text-[#8A572A]"
                  : "text-[#EAE8E2]"
              }
            />
          ))}
        </div>
        <div className="flex items-center gap-1">
          <Link
            href={`/admin/testimonials/${testimonial.id}`}
            className="p-1.5 text-[#7A6E65] hover:text-[#1C130D] hover:bg-[#F7F4F0] rounded-md transition-all"
            title="Edit review"
          >
            <Edit2 size={14} />
          </Link>
          <button
            onClick={handleDelete}
            className="p-1.5 text-[#7A6E65] hover:text-red-600 hover:bg-red-50 rounded-md transition-all"
            title="Delete review"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <blockquote className="text-xs sm:text-sm text-[#333333] leading-relaxed italic mb-6 flex-1 bg-[#FAF9F6] p-4 rounded-lg border border-[#EAE8E2]">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center gap-3.5 pt-4 border-t border-[#F0EDE6] mt-auto">
        <div className="w-10 h-10 rounded-full bg-[#1C130D] text-[#E0AB76] flex items-center justify-center font-bold text-xs shrink-0">
          {testimonial.client_image ? (
            <img
              src={testimonial.client_image}
              alt={testimonial.client_name}
              className="w-full h-full object-cover rounded-full"
            />
          ) : (
            testimonial.client_name?.charAt(0) || "C"
          )}
        </div>
        <div>
          <h4 className="text-sm font-bold text-[#1C130D]">{testimonial.client_name}</h4>
          <p className="text-[10px] text-[#8A572A] font-bold uppercase tracking-wider mt-0.5">
            {testimonial.client_role || "Nilambur Teak Client"}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
