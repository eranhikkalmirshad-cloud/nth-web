import { createClient } from "@/lib/supabase";
import { ProcessStep } from "@/lib/types";

const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
  {
    id: "1",
    step_number: "01",
    label: "Step 01",
    title: "Choose Design",
    description: "Explore our royal catalog or share your architectural floor plans and custom dimension requirements with our designers.",
    tag: "Design Consultation",
    image_url: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=800&auto=format&fit=crop",
    sort_order: 0,
  },
  {
    id: "2",
    step_number: "02",
    label: "Step 02",
    title: "Select Wood",
    description: "We handpick seasoned logs from government-certified Nilambur teak auctions, ensuring optimal grain density and oil retention.",
    tag: "Certified Teak",
    image_url: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800&auto=format&fit=crop",
    sort_order: 1,
  },
  {
    id: "3",
    step_number: "03",
    label: "Step 03",
    title: "Master Crafting",
    description: "Generational woodworkers precision-carve, hand-join, and polish each piece with traditional Kerala joinery techniques.",
    tag: "Artisan Joinery",
    image_url: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    sort_order: 2,
  },
  {
    id: "4",
    step_number: "04",
    label: "Step 04",
    title: "Delivered to You",
    description: "Insured multi-layer protective packaging and pan-India white-glove delivery directly to your home or estate.",
    tag: "Pan-India Delivery",
    image_url: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=800&auto=format&fit=crop",
    sort_order: 3,
  },
];

export async function getProcessSteps(): Promise<ProcessStep[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("process_steps")
      .select("*")
      .order("sort_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return FALLBACK_PROCESS_STEPS;
    }
    return data;
  } catch (err) {
    return FALLBACK_PROCESS_STEPS;
  }
}
