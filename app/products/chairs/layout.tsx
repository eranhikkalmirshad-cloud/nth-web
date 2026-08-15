import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Handcrafted Teak Chairs | Nilambur Teak Heritage™`,
  description: "Ergonomic dining chairs, easy chairs, and executive seating handcrafted from solid Nilambur teak wood.",
  alternates: { canonical: `${SITE_CONFIG.url}/products/chairs` },
};

export default function ChairsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
