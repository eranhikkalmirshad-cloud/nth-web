import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Contact Us & Showroom Visit | ${SITE_CONFIG.name}`,
  description: `Contact ${SITE_CONFIG.name} in Nilambur, Kerala. Call ${SITE_CONFIG.contact.phoneDisplay} or WhatsApp for custom teak orders and design consultations.`,
  alternates: { canonical: `${SITE_CONFIG.url}/contact` },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
