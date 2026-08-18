import { Ruler, ShieldCheck, Hammer, CheckCircle2, Clock, FileCheck } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: "Custom Order Policy | Nilambur Teak Heritage",
  description: "Read our custom order policy covering bespoke measurements, design approval, 50% advance payment terms, and delivery guidelines.",
};

const customOrderSections = [
  {
    num: "1",
    title: "Custom Order Confirmation",
    content: `At ${SITE_CONFIG.name}, we create bespoke furniture tailored to individual requirements. A custom order is confirmed only after: (a) The customer approves the final design and blueprints; (b) Exact dimensions and wood grades are confirmed; (c) The quotation is formally accepted; and (d) The required advance payment is received. Production begins only after final specifications are signed off.`,
  },
  {
    num: "2",
    title: "Advance Payment Terms",
    content: "A minimum 50% advance payment is required to commence timber selection and production of a custom order. Depending on the size, value, materials, or complexity of the order, a higher advance may be required. The remaining balance must be cleared before dispatch or white-glove installation, unless otherwise agreed in writing.",
  },
  {
    num: "3",
    title: "Design & Specification Approval",
    content: "Before production begins, the customer must carefully verify and approve all relevant details, including: Dimensions, Architectural design, Timber grain selection, Colour/finish shade, Hardware & brass fittings, Upholstery fabrics, and any other custom modifications. Once approved, production is carried out precisely to these specifications.",
  },
  {
    num: "4",
    title: "Changes After Production Commences",
    content: "Changes requested after timber cutting or assembly has started may not always be feasible. Where modifications are possible, the customer will be responsible for any additional costs relating to raw materials, labour, redesign, or re-transportation. Such changes will also naturally extend the delivery timeline.",
  },
  {
    num: "5",
    title: "Cancellation Policy for Bespoke Pieces",
    content: "Because custom furniture is manufactured specifically for the individual customer's dimensions and preferences, custom orders cannot be cancelled once production has commenced. If cancellation is requested before production begins, the request will be reviewed based on costs already incurred (e.g. design drafting, timber procurement).",
  },
  {
    num: "6",
    title: "No Return for Change of Preference",
    content: "Custom-made furniture is not eligible for return or exchange due to a change of mind, change in preference, or incorrect dimensions supplied by the client, unless there is a verified deviation from the approved technical specifications.",
  },
  {
    num: "7",
    title: "Customer-Provided Measurements",
    content: "Where the customer provides measurements, the customer is responsible for ensuring their accuracy. We strongly recommend verifying room dimensions, doorways, stairways, lifts, and installation corridors before confirming the order. We are not responsible for fitting or access issues resulting from incorrect measurements provided by the client.",
  },
  {
    num: "8",
    title: "Natural Teak & Grain Variations",
    content: "Our furniture is crafted using 100% genuine natural Nilambur teak. Natural variations in colour shades, grain patterns, textures, knots, and organic figure are inherent characteristics of real wood and are not considered defects. The final piece may therefore possess unique organic nuances compared to digital mockups.",
  },
  {
    num: "9",
    title: "Production & Delivery Timeline",
    content: "The estimated production and delivery timeline (typically 3 to 6 weeks) is communicated at order confirmation. Custom furniture may require additional time depending on the carving complexity, seasoning requirements, and delivery destination. Delivery dates are estimates provided in good faith.",
  },
  {
    num: "10",
    title: "Quality Inspection Before Dispatch",
    content: "Every custom product undergoes a multi-point quality inspection before leaving our Nilambur workshop. We make reasonable efforts to ensure the finished piece conforms strictly to the approved drawings and our high heirloom standards.",
  },
  {
    num: "11",
    title: "Delivery & Delayed Collection",
    content: "The customer must ensure the delivery premises are ready and accessible when furniture is scheduled for delivery. If delivery is delayed at the customer's request after the furniture is ready, nominal storage or re-handling charges may apply.",
  },
  {
    num: "12",
    title: "Final Agreement & Acknowledgment",
    content: `By confirming a custom commission, the customer acknowledges and accepts the approved design, dimensions, timber selection, finish, pricing, payment schedule, and terms of this Custom Order Policy.`,
  },
];

export default function CustomOrderPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-14 sm:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            BESPOKE COMMISSIONS
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414]">
            Custom Order Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#665E56] max-w-xl mx-auto leading-relaxed">
            We create furniture according to individual customer requirements, combining quality materials, skilled craftsmanship, and personalised design.
          </p>
        </div>

        {/* Policy Points */}
        <div className="space-y-6">
          {customOrderSections.map((sec) => (
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

        {/* Start Custom Order Banner */}
        <div className="mt-12 p-6 sm:p-8 rounded-2xl bg-[#120E0A] text-white border border-[#2B221B] text-center space-y-3">
          <h3 className="font-serif text-lg sm:text-xl font-bold text-[#E5B56E]">
            Ready to Start a Custom Commission?
          </h3>
          <p className="text-xs text-[#C8BFB5] max-w-lg mx-auto leading-relaxed">
            Consult directly with our master craftsmen to bring your architectural teak vision to life.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#8A572A] hover:bg-[#6E3F18] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all"
            >
              Request Custom Quote
            </Link>
            <a
              href={SITE_CONFIG.contact.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full border border-white/20 transition-all"
            >
              WhatsApp Us
            </a>
          </div>
        </div>

      </div>
    </main>
  );
}
