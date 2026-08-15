// app/products/curtains/layout.tsx
import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Curtains & Drapes | Nilambur Teak Heritage™`,
  description: "Curated luxury interior draperies and home textiles.",
  openGraph: {
    title: `Curtains & Drapes | Nilambur Teak Heritage™`,
    url: `${SITE_CONFIG.url}/products/curtains`,
  },
  alternates: { canonical: `${SITE_CONFIG.url}/products/curtains` },
};

export default function CurtainsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
