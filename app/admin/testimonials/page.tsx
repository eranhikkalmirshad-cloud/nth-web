import { createClient } from "@/lib/supabase-server";
import { Users, Plus, Star } from "lucide-react";
import Link from "next/link";
import TestimonialCard from "./TestimonialCard";
import { getTestimonials } from "@/lib/api/testimonials";

export default async function AdminTestimonialsPage() {
  const supabase = await createClient();
  const { data: testimonials, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching testimonials:", error);
  }

  const displayTestimonials =
    testimonials && testimonials.length > 0
      ? testimonials
      : await getTestimonials();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-xl border border-[#EAE8E2] shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] mb-1">
            <Users size={14} />
            <span>Client Reviews & Social Proof ({displayTestimonials.length})</span>
          </div>
          <h2 className="text-xl font-bold font-cinzel text-[#1C130D]">Client Reviews</h2>
          <p className="text-xs text-[#7A6E65] mt-0.5">
            Manage public testimonials and artisan reviews displayed across the website.
          </p>
        </div>
        <Link
          href="/admin/testimonials/new"
          className="inline-flex items-center justify-center gap-2 bg-[#8A572A] hover:bg-[#1C130D] text-white px-5 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-all shadow-xs"
        >
          <Plus size={15} /> <span>Add New Review</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {displayTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
    </div>
  );
}
