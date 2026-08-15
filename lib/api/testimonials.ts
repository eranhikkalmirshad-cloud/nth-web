import { createClient } from "@/lib/supabase";
import { Testimonial } from "@/lib/types";

const FALLBACK_TESTIMONIALS: Testimonial[] = [
  {
    id: "1",
    client_name: "Rajesh Varma",
    client_role: "Mumbai, Maharashtra",
    quote: "Ordered a custom 8-seater dining table and living set for our Mumbai penthouse. The grain pattern and golden lustre of the Nilambur teak is simply unmatched. Delivered in pristine condition.",
    rating: 5,
    is_active: true,
    sort_order: 0,
    created_at: new Date().toISOString(),
    client_image: null,
  },
  {
    id: "2",
    client_name: "Dr. Ananya Sen",
    client_role: "Bengaluru, Karnataka",
    quote: "Nilambur Teak Heritage crafted a bespoke King size bed and matching wardrobes. The generational mortise-and-tenon craftsmanship and satin lacquer finish exceeded all expectations.",
    rating: 5,
    is_active: true,
    sort_order: 1,
    created_at: new Date().toISOString(),
    client_image: null,
  },
  {
    id: "3",
    client_name: "Col. Vikram Malhotra",
    client_role: "New Delhi",
    quote: "Finding 100% legal, certified Nilambur teak with government documentation is rare. The weight, stability, and natural oils of the wood prove its authenticity. True heirloom furniture.",
    rating: 5,
    is_active: true,
    sort_order: 2,
    created_at: new Date().toISOString(),
    client_image: null,
  },
  {
    id: "4",
    client_name: "Suresh Menon",
    client_role: "Kochi, Kerala",
    quote: "We commissioned traditional carved temple doors and living room diwans for our heritage villa. The master artisans in Nilambur preserve centuries of Kerala woodworking traditions.",
    rating: 5,
    is_active: true,
    sort_order: 3,
    created_at: new Date().toISOString(),
    client_image: null,
  },
];

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_TESTIMONIALS;
    }
    return data;
  } catch (err) {
    return FALLBACK_TESTIMONIALS;
  }
}
