import { RotateCcw, ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: "Return & Cancellation Policy | Nilambur Teak Heritage",
  description: "Read our comprehensive return, replacement, and cancellation policies for bespoke and ready-to-ship teak wood furniture.",
};

const returnSections = [
  {
    num: "1",
    title: "Order Cancellation",
    content: "Orders for ready-to-ship products may be cancelled before dispatch. Cancellation requests must be made through our customer support team. For custom-made, personalised, or made-to-order furniture, cancellation may not be possible once production has started, as the product is manufactured specifically according to the customer's requirements.",
  },
  {
    num: "2",
    title: "Returns & Eligibility",
    content: "Returns are accepted only in cases where: (1) The product arrives significantly damaged during transportation; (2) The wrong product or substantially incorrect product is delivered; or (3) The product has a verified manufacturing defect. The customer should notify us within 24 hours of delivery and provide clear photographs or videos of the product, packaging, and damage.",
  },
  {
    num: "3",
    title: "Non-Returnable Products",
    content: "The following products are generally not eligible for return or cancellation after production has commenced: Custom-made furniture; Personalised furniture; Furniture manufactured according to specific customer dimensions or designs; Products modified at the customer's request; and Products damaged after delivery due to improper handling, installation, use, or maintenance.",
  },
  {
    num: "4",
    title: "Quality & Natural Wood Characteristics",
    content: "Furniture made from natural wood, including teak, may have variations in grain, colour, knots, texture, and minor natural characteristics. These are inherent features of genuine wood and are not considered manufacturing defects or valid reasons for return.",
  },
  {
    num: "5",
    title: "Replacement or Resolution",
    content: "After reviewing the complaint, we may, at our discretion, offer: (a) Repair of the affected product; (b) Replacement of the damaged or defective component; (c) Replacement of the product, where appropriate; or (d) Another mutually agreed resolution. The resolution will depend on the nature and extent of the issue.",
  },
  {
    num: "6",
    title: "Refunds",
    content: "Where a refund is approved, it will generally be processed to the original payment method after the return or cancellation is verified. The time taken for the amount to reflect in the customer's account may depend on the payment provider or bank.",
  },
  {
    num: "7",
    title: "Return Shipping",
    content: "If a return is approved because of a verified manufacturing defect, incorrect product, or transportation damage, we will determine the appropriate return or collection arrangement. Returns requested for reasons not covered by this policy may be subject to applicable transportation, handling, or other charges.",
  },
  {
    num: "8",
    title: "Important Delivery Requirement",
    content: "Customers are strongly advised to inspect the furniture at the time of delivery. If there is visible damage, please photograph or record the condition of the package and furniture before accepting or unpacking the product, wherever reasonably possible.",
  },
  {
    num: "9",
    title: "How to Request a Return or Cancellation",
    content: "Please contact our customer support team with: (1) Order number; (2) Customer name and contact number; (3) Reason for cancellation or return; (4) Photographs/videos where applicable; and (5) Any other relevant information requested by our team. All requests will be reviewed individually in accordance with this policy.",
  },
];

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-14 sm:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            TRANSPARENT TERMS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414]">
            Return & Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#665E56] max-w-xl mx-auto leading-relaxed">
            We take great care to ensure that every piece of furniture is manufactured, inspected, and packed to meet our rigorous standards.
          </p>
        </div>

        {/* Policy Points */}
        <div className="space-y-6">
          {returnSections.map((sec) => (
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

        {/* Consumer Notice */}
        <div className="mt-8 text-center text-xs text-slate-500 max-w-2xl mx-auto leading-relaxed">
          <em>Note: This policy is intended as a general customer policy. Nothing in this policy limits any rights or remedies available to customers under applicable Indian consumer protection laws.</em>
        </div>

        {/* Contact Support Note */}
        <div className="mt-8 p-6 sm:p-8 rounded-2xl bg-[#120E0A] text-white border border-[#2B221B] text-center space-y-3">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#E5B56E]">
            Need Assistance with an Order?
          </h3>
          <p className="text-xs text-[#C8BFB5] max-w-lg mx-auto leading-relaxed">
            Contact our dedicated support team with your order number and photographs.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#8A572A] hover:bg-[#6E3F18] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all"
            >
              Contact Support Team
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
