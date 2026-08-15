import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `About ${SITE_CONFIG.name} | 25+ Years of Generational Teak Woodcraft`,
  description: `Discover ${SITE_CONFIG.name} — Kerala's finest teak wood furniture handcrafted in Nilambur. 100% legal government-certified timber with lifetime warranty.`,
  alternates: { canonical: `${SITE_CONFIG.url}/about` },
};
