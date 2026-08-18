import { Truck, ShieldCheck, Clock, MapPin, PackageCheck, AlertCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: "Shipping Policy | Nilambur Teak Heritage",
  description: "Learn about delivery locations, packaging, dispatch timelines, and shipping charges for handcrafted Nilambur teak furniture across India.",
};

const shippingSections = [
  {
    num: "1",
    title: "Delivery Locations",
    content: "We deliver handcrafted solid teak furniture across India. Delivery availability may vary depending on the product size, destination accessibility, and local logistics infrastructure.",
  },
  {
    num: "2",
    title: "Processing & Dispatch",
    content: "Furniture is carefully prepared, quality-checked, and packed before dispatch. Ready-to-ship products are generally dispatched within 7–15 business days. Custom-made or made-to-order furniture may require additional production time, which will be communicated at the time of purchase.",
  },
  {
    num: "3",
    title: "Delivery Time",
    content: "Estimated delivery time is generally 7–21 business days after dispatch, depending on the destination and transportation conditions. Remote locations may require additional time.",
  },
  {
    num: "4",
    title: "Shipping Charges",
    content: "Shipping charges depend on the product, order value, destination, size, weight, and delivery method. Any applicable delivery charges will be communicated transparently before order confirmation.",
  },
  {
    num: "5",
    title: "Safe & Secure Packaging",
    content: "All furniture is packed using multi-layer protective materials, corner guards, and weatherproof wooden crating to minimise the risk of damage during transportation. Larger furniture items are transported using specialised furniture logistics services.",
  },
  {
    num: "6",
    title: "Delivery & Inspection Requirement",
    content: "Customers are requested to inspect the furniture and packaging carefully at the time of delivery. Any visible damage should be photographed and reported to us immediately, preferably within 24 hours of delivery, along with the order details and photographs.",
  },
  {
    num: "7",
    title: "Delays",
    content: "Delivery timelines are estimates and may be affected by weather, transportation disruptions, festivals, strikes, remote locations, or other circumstances beyond our control. We will make reasonable efforts to keep customers informed of significant delays.",
  },
  {
    num: "8",
    title: "Address & Contact Details",
    content: "Customers are responsible for providing a complete and accurate delivery address and active contact number. Additional charges may apply for re-delivery caused by an incorrect or incomplete address or the recipient being unavailable.",
  },
  {
    num: "9",
    title: "Installation & Assembly",
    content: "Where installation or assembly is required, the availability and charges for such services will depend on the product and delivery location and will be communicated separately.",
  },
  {
    num: "10",
    title: "Order Tracking",
    content: "Where tracking is available, customers will receive the relevant shipment or delivery details after dispatch.",
  },
];

export default function ShippingPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-14 sm:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            CUSTOMER ASSURANCE
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414]">
            Shipping Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#665E56] max-w-xl mx-auto leading-relaxed">
            We are committed to delivering our furniture safely, securely, and on time. Each product is carefully inspected and packed to ensure it reaches you in excellent condition.
          </p>
        </div>

        {/* Policy Points */}
        <div className="space-y-6">
          {shippingSections.map((sec) => (
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
            Questions Regarding Delivery or Shipping?
          </h3>
          <p className="text-xs text-[#C8BFB5] max-w-lg mx-auto leading-relaxed">
            Please contact our customer support team with your order details for assistance.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#8A572A] hover:bg-[#6E3F18] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all"
            >
              Contact Support
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
