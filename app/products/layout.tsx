// app/products/layout.tsx
import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Teak Furniture Catalog | ${SITE_CONFIG.name}`,
  description:
    "Browse our complete solid Nilambur teak wood furniture catalog. Royal dining sets, living suites, heirloom cots, and hand-carved doors.",
  keywords: [
    "nilambur teak furniture",
    "teak wood catalog kerala",
    "solid teak dining table",
    "handcrafted teak sofa",
    "teak cot nilambur",
  ],
  openGraph: {
    title: `Teak Furniture Catalog | ${SITE_CONFIG.name}`,
    description:
      "Explore 100% genuine legal Nilambur teak furniture. Direct from master artisans in Nilambur.",
    url: `${SITE_CONFIG.url}/products`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/products` },
};

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
