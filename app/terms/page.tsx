import { FileText, ShieldCheck, Scale, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: "Terms and Conditions | Nilambur Teak Heritage",
  description: `Review the official terms and conditions governing bespoke orders, purchases, and warranties with ${SITE_CONFIG.name}.`,
};

const termsSections = [
  {
    num: "1",
    title: "Acceptance of Terms",
    content: `By browsing our website, commissioning custom furniture, or purchasing pieces from ${SITE_CONFIG.name}, you agree to be bound by these Terms and Conditions. These terms apply to all online and offline clients, residential projects, and commercial orders.`,
  },
  {
    num: "2",
    title: "Genuine Nilambur Teak & Natural Variations",
    content: "All our solid wood furniture is handcrafted using 100% genuine, certified Nilambur teak wood. Because solid wood is a natural organic material, variations in grain figure, organic knots, natural tone gradients, and seasonal wood movement are celebrated hallmarks of authentic teak and are not considered manufacturing defects.",
  },
  {
    num: "3",
    title: "Custom Orders & Advance Payments",
    content: "Custom orders are manufactured specifically to customer blueprints. Production commences only after 50% advance deposit and technical drawing approval. Because custom pieces are tailored exclusively for you, custom orders cannot be cancelled once production has started.",
  },
  {
    num: "4",
    title: "Pricing & Quotation Validity",
    content: "Quotations provided for bespoke projects are valid for 30 days from the date of issue. Prices include timber selection, hand-carving, and finishing, with shipping charges itemized transparently prior to confirmation.",
  },
  {
    num: "5",
    title: "Pan-India Logistics & Delivery Inspection",
    content: "We provide insured white-glove logistics across all major Indian cities. Customers are requested to inspect packaging and furniture upon arrival and report any transit damage within 24 hours.",
  },
  {
    num: "6",
    title: "5-Year Structural Warranty",
    content: "Every piece of furniture is backed by our 5-Year Structural Warranty covering joints, frames, and manufacturing defects. Natural wear and tear or exposure to extreme water/sunlight conditions are excluded.",
  },
  {
    num: "7",
    title: "Intellectual Property",
    content: `All design sketches, logos, photographs, and architectural woodwork designs published by ${SITE_CONFIG.name} are the proprietary intellectual property of Nilambur Teak Heritage™ and may not be reproduced without prior written authorization.`,
  },
  {
    num: "8",
    title: "Governing Law & Jurisdiction",
    content: "These Terms and Conditions are governed by and construed in accordance with the laws of India. Any disputes arising in connection with orders shall be subject to the exclusive jurisdiction of the courts in Malappuram / Nilambur, Kerala.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-14 sm:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            LEGAL FRAMEWORK
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414]">
            Terms and Conditions
          </h1>
          <p className="text-xs sm:text-sm text-[#665E56] max-w-xl mx-auto leading-relaxed">
            Please review the terms and conditions governing purchases and custom commissions with {SITE_CONFIG.name}.
          </p>
        </div>

        {/* Policy Points */}
        <div className="space-y-6">
          {termsSections.map((sec) => (
            <div
              key={sec.num}
              className="bg-white rounded-2xl p-6 sm:p-8 border border-[#EAE4DC] shadow-xs space-y-2 hover:border-[#8A572A]/40 transition-colors"
            >
              <div className="flex items-center gap-3">
                <span className="w-7 h-7 rounded-lg bg-[#FAF4ED] text-[#8A572A] font-serif font-bold text-sm flex items-center justify-center border border-[#8A572A]/20 shrink-0">
                  {sec.num}
                </span>
                <h2 className="text-base sm:text-lg font-serif font-bold text-[#141414]">
                  {sec.title}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-[#554D46] leading-relaxed pl-10">
                {sec.content}
              </p>
            </div>
          ))}
        </div>

        {/* Contact Support Note */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#120E0A] text-white border border-[#2B221B] text-center space-y-3">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#E5B56E]">
            Questions on Terms or Commissions?
          </h3>
          <p className="text-xs text-[#C8BFB5] max-w-lg mx-auto leading-relaxed">
            Our team is available to assist you with any legal, order, or warranty clarifications.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#8A572A] hover:bg-[#6E3F18] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all"
            >
              Contact Us
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
