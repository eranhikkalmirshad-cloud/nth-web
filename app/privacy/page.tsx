import { Shield, Lock, Eye, FileText, CheckCircle2 } from "lucide-react";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";

export const metadata = {
  title: "Privacy Policy | Nilambur Teak Heritage",
  description: `Learn how ${SITE_CONFIG.name} collects, uses, and safeguards your personal data during orders and enquiries.`,
};

const privacySections = [
  {
    num: "1",
    title: "Information We Collect",
    content: `When you visit our website, consult with our workshop, or place an order with ${SITE_CONFIG.name}, we may collect personal information including your full name, contact phone number, email address, physical delivery address, and architectural room specifications. This data is collected solely when you submit an enquiry, request a quotation, or place an order. We never sell, rent, or trade your personal data to third parties.`,
  },
  {
    num: "2",
    title: "How We Use Your Information",
    content: "Your information is used strictly to: (a) Provide design consultation and architectural woodworking blueprints; (b) Process custom orders, invoices, and payments; (c) Coordinate white-glove transport and installation logistics; and (d) Provide post-delivery customer support and warranty services.",
  },
  {
    num: "3",
    title: "Data Security & Protection",
    content: "We implement industry-standard administrative, technical, and physical security measures to protect your personal details against unauthorized access, loss, or misuse across all electronic records and cloud infrastructure.",
  },
  {
    num: "4",
    title: "Third-Party Logistics & Payment Providers",
    content: "We only share necessary delivery information (such as recipient name, contact number, and delivery address) with trusted transportation and logistics partners to ensure safe doorstep delivery of your furniture.",
  },
  {
    num: "5",
    title: "Cookies & Analytics",
    content: "Our website uses standard security and performance cookies to maintain user session integrity, provide responsive browsing, and improve website performance. You may disable cookies in your browser settings if desired.",
  },
  {
    num: "6",
    title: "Your Data Rights & Enquiries",
    content: `You have the right to request access to, correction of, or deletion of your personal data stored with us. For any privacy-related enquiries, please contact our data team at ${SITE_CONFIG.contact.email} or call ${SITE_CONFIG.contact.phoneDisplay}.`,
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F5] py-14 sm:py-20 font-sans">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-[#8A572A] block font-sans">
            LEGAL & TRUST
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif font-bold text-[#141414]">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[#665E56] max-w-xl mx-auto leading-relaxed">
            Your privacy and trust are paramount at {SITE_CONFIG.name}. Learn how we safeguard your information.
          </p>
        </div>

        {/* Policy Points */}
        <div className="space-y-6">
          {privacySections.map((sec) => (
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
            Have Privacy Questions?
          </h3>
          <p className="text-xs text-[#C8BFB5] max-w-lg mx-auto leading-relaxed">
            Reach out directly to our privacy officer at {SITE_CONFIG.contact.email}.
          </p>
        </div>

      </div>
    </main>
  );
}
