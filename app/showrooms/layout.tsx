import { Metadata } from "next";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Our Nilambur Showroom & Atelier | ${SITE_CONFIG.name}`,
  description: `Visit our Nilambur workshop and experience center in Koolikkal, Mampad, Malappuram, Kerala. Inspect wood seasoning, joinery, and custom architectural woodwork.`,
  alternates: { canonical: `${SITE_CONFIG.url}/showrooms` },
  openGraph: {
    title: `Our Nilambur Showroom & Atelier | ${SITE_CONFIG.name}`,
    description: `Experience center in Koolikkal, Mampad, Malappuram, Kerala. Doorstep insured pan-India delivery.`,
    url: `${SITE_CONFIG.url}/showrooms`,
  },
};

export default function ShowroomsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
