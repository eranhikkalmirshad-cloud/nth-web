import { ShieldCheck, CheckCircle2, AlertOctagon, HelpCircle } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: "Warranty Policy | Nilambur Teak Heritage",
  description: "Learn about our 5-Year structural integrity warranty, timber coverage, terms, and maintenance guidelines for Nilambur teak wood furniture.",
};

const warrantySections = [
  {
    num: "1",
    title: "Warranty Coverage",
    content: "Our furniture is covered against manufacturing defects and structural defects arising from workmanship or materials during the applicable warranty period. The warranty covers issues such as: Structural failure caused by manufacturing defects; Defects in mortise-and-tenon joints or frame construction; Manufacturing-related defects in components; and other defects specifically covered by the warranty document provided with the product.",
  },
  {
    num: "2",
    title: "Warranty Period",
    content: "Unless otherwise specified for a particular bespoke piece, our standard structural warranty period is 5 Years from the date of delivery. The applicable warranty period for each product is specified on the quotation, invoice, or warranty certificate.",
  },
  {
    num: "3",
    title: "Natural Wood Characteristics",
    content: "Furniture made from natural teak and solid wood may naturally vary in colour shade, wood grain patterns, knots, natural markings, and minor movement caused by seasonal temperature and humidity changes. These natural characteristics are authentic hallmarks of genuine wood and are not considered manufacturing defects.",
  },
  {
    num: "4",
    title: "What Is Not Covered",
    content: "The warranty does not cover damage or defects caused by: (a) Normal wear and tear; (b) Accidental damage or impact; (c) Improper use or handling; (d) Excessive moisture or water exposure; (e) Direct prolonged outdoor sunlight or extreme environmental conditions unless designed for outdoor use; (f) Improper installation by unauthorised third parties; (g) Modification or repair by unauthorised persons; (h) Scratches, dents, or chemical stains after delivery; and (i) Use of unsuitable abrasive cleaning products.",
  },
  {
    num: "5",
    title: "How to Make a Warranty Claim",
    content: "To make a warranty claim, customers should contact us with: Order number or invoice; Customer name and contact details; Clear description of the issue; and Photographs or videos showing the defect. Our master woodworking team may inspect the product before approving a warranty claim.",
  },
  {
    num: "6",
    title: "Warranty Resolution",
    content: "If a claim is determined to be covered under this warranty, we may, at our discretion: Repair the affected part; Replace the defective component; Restore the product; or Replace the product where repair is not reasonably possible.",
  },
  {
    num: "7",
    title: "Warranty Transferability",
    content: "The warranty is applicable to the original purchaser and is non-transferable unless otherwise approved in writing on the invoice or warranty document.",
  },
  {
    num: "8",
    title: "Maintenance & Care Guidelines",
    content: "Proper care and maintenance are essential for the generational performance of solid teak furniture. Customers should follow the care and maintenance instructions provided with the product (e.g. keeping away from damp walls, using coasters, and conditioning with natural beeswax / wood oils).",
  },
  {
    num: "9",
    title: "Limitation & Legal Framework",
    content: "This warranty applies only to defects covered under the stated terms. It does not cover issues arising from circumstances outside the manufacturer's control. Note: This warranty policy is subject to applicable Indian consumer protection laws and regulations.",
  },
];

export default function WarrantyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-14 sm:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            GENERATIONAL CRAFTSMANSHIP
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414]">
            Warranty Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#665E56] max-w-xl mx-auto leading-relaxed">
            We take immense pride in the durability and craftsmanship of our solid teak furniture. Every piece is carefully built and inspected to ensure enduring customer confidence.
          </p>
        </div>

        {/* Policy Points */}
        <div className="space-y-6">
          {warrantySections.map((sec) => (
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
            Have a Warranty Enquiry?
          </h3>
          <p className="text-xs text-[#C8BFB5] max-w-lg mx-auto leading-relaxed">
            Reach out to our Nilambur master atelier with your invoice and photos for rapid assistance.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-[#8A572A] hover:bg-[#6E3F18] text-white text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all"
            >
              Submit Warranty Claim
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
