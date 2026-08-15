// app/products/sofas/layout.tsx
import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Solid Teak Sofas & Living Suites | Nilambur Teak Heritage™`,
  description:
    "Handcrafted solid Nilambur teak wood sofas, royal diwans, and living room suites handcrafted in Kerala.",
  openGraph: {
    title: `Solid Teak Sofas | Nilambur Teak Heritage™`,
    description: "Solid Nilambur teak sofas and living suites crafted in Kerala.",
    url: `${SITE_CONFIG.url}/products/sofas`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/products/sofas` },
};

export default function SofasLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
