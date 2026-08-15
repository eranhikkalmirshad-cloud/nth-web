// app/products/dining/layout.tsx
import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Dining Tables & Chairs | Nilambur Teak Heritage™`,
  description:
    "Handcrafted solid Nilambur teak dining tables, 6-seater and 8-seater dining sets made in Nilambur, Kerala.",
  openGraph: {
    title: `Premium Teak Dining Sets | Nilambur Teak Heritage™`,
    description: "Solid Nilambur teak dining furniture crafted for heirloom longevity.",
    url: `${SITE_CONFIG.url}/products/dining`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/products/dining` },
};

export default function DiningLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
