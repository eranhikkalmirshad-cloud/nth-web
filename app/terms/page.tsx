import SectionHeading from "@/components/ui/SectionHeading";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Terms of Service",
  description: `Review the terms and conditions governing the purchase of ${SITE_CONFIG.name} products.`,
};

const sections = [
  {
    title: "Acceptance of Terms",
    content: `By browsing our catalog or ordering custom woodwork from ${SITE_CONFIG.name}, you agree to these Terms of Service. These terms apply to all visitors, buyers, and bespoke commission clients.`,
  },
  {
    title: "Genuine Teak & Natural Wood Characteristics",
    content: "All our products are crafted from 100% genuine Nilambur teak wood. Because solid wood is a natural organic material, natural grain variations, organic figure, and subtle tone differences are celebrated hallmarks of genuine teak.",
  },
  {
    title: "Custom & Bespoke Commissions",
    content: "Bespoke orders are handcrafted to your custom dimensions and drawings. Production begins after timber selection and advance deposit. Production timelines typically range from 4 to 8 weeks.",
  },
  {
    title: "Pan-India Delivery & Inspection",
    content: "We provide insured white-glove delivery across all major Indian cities. We request that you inspect the piece upon arrival alongside our logistics specialists.",
  },
  {
    title: "Lifetime Craftsmanship Warranty",
    content: "We provide a lifetime warranty covering the structural integrity of our traditional joinery and natural protection against termites and borers.",
  },
];

export default function TermsPage() {
  return (
    <div className="pt-24 pb-32 bg-[#FDFAF5] min-h-screen">
      <div className="max-container px-4 md:px-8">
        <SectionHeading
          label="Legal & Policies"
          title="Terms of Service"
          subtitle={`Please review the terms governing orders and commissions at ${SITE_CONFIG.name}.`}
          className="mb-16 max-w-3xl"
        />

        <div className="max-w-3xl space-y-12">
          {sections.map((section, i) => (
            <FadeInView key={i} delay={i * 0.05}>
              <div className="border-l-2 border-[#C9922A] pl-6 bg-white p-6 rounded-r-xl border-y border-r border-[#D4A96A]/20">
                <h3 className="text-xl font-bold text-[#2C1810] font-playfair mb-3">
                  {section.title}
                </h3>
                <p className="text-[#6B4226] font-light leading-relaxed text-sm font-lato">
                  {section.content}
                </p>
              </div>
            </FadeInView>
          ))}
        </div>
      </div>
    </div>
  );
}
