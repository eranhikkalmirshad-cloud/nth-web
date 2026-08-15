// components/home/HomeTestimonials.tsx
"use client";

import FadeInView from "@/components/ui/FadeInView";

const testimonials = [
  {
    quote:
      "The 8-seater Nilambur teak dining table and chairs we commissioned exceeded every expectation. The grain of the mature wood and the joinery work are of true heirloom grade.",
    author: "Dr. K. Narayanan",
    location: "Bengaluru, Karnataka",
  },
  {
    quote:
      "Ordered a custom carved teak entrance door and living room suite for our villa. The wood quality, natural oil finish, and doorstep setup in Kochi were handled with perfection.",
    author: "Ananya Menon",
    location: "Kochi, Kerala",
  },
  {
    quote:
      "Finding genuine, government-certified Nilambur teak with authentic mortise joinery is rare today. Nilambur Teak Heritage delivered master craftsmanship directly to Mumbai.",
    author: "Rajesh Varma",
    location: "Mumbai, Maharashtra",
  },
];

export default function HomeTestimonials() {
  return (
    <section className="py-20 md:py-28 bg-white border-t border-[#EBEBEA]">
      <div className="max-container">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <span className="eyebrow text-[#7A4E2D]">Client Stories</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#141414] tracking-tight">
            Trusted Across Generations
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {testimonials.map((t, idx) => (
            <FadeInView key={idx} delay={idx * 0.1}>
              <div className="bg-[#FAFAF9] p-8 md:p-10 rounded-xs border border-[#EBEBEA] flex flex-col justify-between h-full space-y-6">
                <p className="text-base text-[#333333] font-light leading-relaxed italic">
                  "{t.quote}"
                </p>

                <div className="pt-4 border-t border-[#EBEBEA]">
                  <div className="font-serif font-bold text-base text-[#141414]">
                    {t.author}
                  </div>
                  <div className="text-xs uppercase tracking-wider text-[#777777] mt-0.5">
                    {t.location}
                  </div>
                </div>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </section>
  );
}