import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Our Story & Teak Heritage | ${SITE_CONFIG.name}`,
  description: `Discover the 25+ year heritage of ${SITE_CONFIG.name}, born in the world teak capital of Nilambur, Kerala. Master craftsmen and 100% government-certified timber.`,
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
