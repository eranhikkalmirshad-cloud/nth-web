import SectionHeading from "@/components/ui/SectionHeading";
import FadeInView from "@/components/ui/FadeInView";
import { SITE_CONFIG } from "@/config/site";

export const metadata = {
  title: "Privacy Policy",
  description: `Learn how ${SITE_CONFIG.name} collects, uses, and protects your personal information.`,
};

const sections = [
  {
    title: "Information We Collect",
    content: `When you visit our website or Nilambur showroom, we may collect personal information such as your name, email address, phone number, and delivery address. This information is collected when you submit a custom quote inquiry form, place an order, or contact us directly. We never sell, trade, or share your data.`,
  },
  {
    title: "How We Use Your Information",
    content: "Your personal information is used strictly to process and fulfill your bespoke teak furniture orders, provide architectural design consultation, send delivery updates, and offer customer support.",
  },
  {
    title: "Data Protection & Security",
    content: "We implement rigorous security standards to safeguard your contact and order data across all electronic and physical records.",
  },
  {
    title: "Contact Us About Privacy",
    content: `For any questions regarding your privacy, contact our team at ${SITE_CONFIG.contact.email} or call ${SITE_CONFIG.contact.phoneDisplay}.`,
  },
];

export default function PrivacyPage() {
  return (
    <div className="pt-24 pb-32 bg-[#FDFAF5] min-h-screen">
      <div className="max-container px-4 md:px-8">
        <SectionHeading
          label="Legal & Trust"
          title="Privacy Policy"
          subtitle={`Your privacy and trust are paramount at ${SITE_CONFIG.name}.`}
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
