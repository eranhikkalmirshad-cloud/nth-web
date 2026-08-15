import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Terms & Conditions | ${SITE_CONFIG.name}`,
  description: `Terms and conditions for commissions, delivery, and lifetime craftsmanship warranty at ${SITE_CONFIG.name}.`,
  alternates: { canonical: `${SITE_CONFIG.url}/terms` },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
