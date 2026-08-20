// app/locations/[location]/page.tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { KEYWORDS } from "@/lib/keywords";
import FAQSchema from "@/components/schemas/FAQSchema";
import BreadcrumbSchema from "@/components/schemas/BreadcrumbSchema";
import { SITE_CONFIG } from "@/config/site";
import Link from "next/link";
import { MessageCircle, Phone, MapPin, TreeDeciduous } from "lucide-react";

const LOCATIONS = [
  { slug: "nilambur",        name: "Nilambur",         district: "Malappuram", pincode: "679329", nearbyAreas: ["Manjeri", "Perinthalmanna", "Wandoor", "Kozhikode"] },
  { slug: "manjeri",         name: "Manjeri",          district: "Malappuram", pincode: "676121", nearbyAreas: ["Nilambur", "Malappuram", "Wandoor"] },
  { slug: "malappuram",      name: "Malappuram",       district: "Malappuram", pincode: "676505", nearbyAreas: ["Nilambur", "Manjeri", "Perinthalmanna", "Tirur"] },
  { slug: "kozhikode",       name: "Kozhikode",        district: "Kozhikode",  pincode: "673001", nearbyAreas: ["Nilambur", "Calicut", "Feroke", "Ramanattukara"] },
  { slug: "calicut",         name: "Calicut",          district: "Kozhikode",  pincode: "673001", nearbyAreas: ["Nilambur", "Kozhikode", "Feroke"] },
  { slug: "perinthalmanna",  name: "Perinthalmanna",   district: "Malappuram", pincode: "679322", nearbyAreas: ["Nilambur", "Manjeri", "Malappuram"] },
  { slug: "bengaluru",       name: "Bengaluru",        district: "Karnataka",  pincode: "560001", nearbyAreas: ["Mysuru", "Hosur"] },
  { slug: "mumbai",          name: "Mumbai",           district: "Maharashtra", pincode: "400001", nearbyAreas: ["Thane", "Navi Mumbai", "Pune"] },
  { slug: "chennai",         name: "Chennai",          district: "Tamil Nadu", pincode: "600001", nearbyAreas: ["Kanchipuram", "Coimbatore"] },
  { slug: "hyderabad",       name: "Hyderabad",        district: "Telangana",  pincode: "500001", nearbyAreas: ["Secunderabad", "Warangal"] },
  { slug: "delhi",           name: "Delhi NCR",        district: "Delhi",      pincode: "110001", nearbyAreas: ["Noida", "Gurgaon", "Faridabad"] },
  { slug: "kochi",           name: "Kochi",            district: "Ernakulam",  pincode: "682001", nearbyAreas: ["Thrissur", "Alappuzha", "Kottayam"] },
];

export async function generateStaticParams() {
  return LOCATIONS.map((loc) => ({ location: loc.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ location: string }>;
}): Promise<Metadata> {
  const { location } = await params;
  const loc = LOCATIONS.find((l) => l.slug === location);
  if (!loc) return {};

  const title = `Solid Nilambur Teak Furniture in ${loc.name} | ${SITE_CONFIG.name}`;
  const desc = `Handcrafted 100% genuine Nilambur teak wood furniture delivered to ${loc.name}, ${loc.district}. Custom royal dining sets, living suites, and carved doors with insured pan-India delivery.`;

  return {
    title,
    description: desc,
    keywords: [
      `nilambur teak furniture ${loc.slug}`,
      `solid teak wood ${loc.slug}`,
      `teak wood dining table ${loc.slug}`,
      `teak sofa ${loc.slug}`,
      `teak furniture delivery ${loc.slug}`,
      ...KEYWORDS.primary,
    ],
    openGraph: {
      title,
      description: desc,
      url: `${SITE_CONFIG.url}/locations/${loc.slug}`,
    },
    alternates: {
      canonical: `${SITE_CONFIG.url}/locations/${loc.slug}`,
    },
  };
}

export default async function LocationPage({
  params,
}: {
  params: Promise<{ location: string }>;
}) {
  const { location } = await params;
  const loc = LOCATIONS.find((l) => l.slug === location);
  if (!loc) notFound();

  const breadcrumbs = [
    { name: "Home", url: SITE_CONFIG.url },
    { name: "Locations", url: `${SITE_CONFIG.url}/locations` },
    { name: loc.name, url: `${SITE_CONFIG.url}/locations/${loc.slug}` },
  ];

  const locationFAQs = [
    {
      question: `Do you deliver genuine Nilambur teak furniture to ${loc.name}?`,
      answer: `Yes! ${SITE_CONFIG.name} provides insured white-glove delivery directly from our Nilambur workshop to ${loc.name} and surrounding areas.`,
    },
    {
      question: `Is the furniture made of genuine Nilambur teak?`,
      answer: `Every piece created at ${SITE_CONFIG.name} is handcrafted from 100% genuine mature Nilambur teak wood with lifetime structural integrity.`,
    },
    {
      question: `Can I customize the dimensions and finish for my home in ${loc.name}?`,
      answer: `Yes, all our pieces can be custom-crafted according to your floor plans, dimensions, and preferred wood finishes.`,
    },
  ];

  return (
    <div className="bg-[#FDFAF5] min-h-screen py-16 md:py-24">
      <BreadcrumbSchema items={breadcrumbs} />
      <FAQSchema faqs={locationFAQs} />

      <main className="max-container px-4 md:px-8">
        <article className="max-w-4xl mx-auto space-y-10">
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3D1F0D] border border-[#C9922A]/40 text-[#E8B84B] text-xs font-bold uppercase tracking-[0.2em]">
              <TreeDeciduous size={14} />
              <span>Pan-India Delivery Service</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-[#2C1810] font-playfair">
              Solid Nilambur Teak Furniture in {loc.name}, {loc.district}
            </h1>
            <p className="text-[#6B4226] text-sm md:text-base leading-relaxed font-lato max-w-2xl mx-auto">
              Direct from the world’s teak capital to your doorstep in <strong>{loc.name}</strong>. Experience handcrafted heirlooms made from 100% legal Nilambur teak wood.
            </p>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-2xl border border-[#D4A96A]/30 shadow-sm space-y-6 text-[#6B4226] text-sm leading-relaxed font-lato">
            <h2 className="text-2xl font-bold text-[#2C1810] font-playfair">
              Heirloom Craftsmanship Delivered to {loc.name}
            </h2>
            <p>
              Homeowners and interior designers in <strong>{loc.name}</strong> choose {SITE_CONFIG.name} for our unyielding commitment to mature Nilambur heartwood, traditional mortise-and-tenon joinery, and transparent legal sourcing.
            </p>

            <h3 className="text-lg font-bold text-[#2C1810] font-playfair pt-4">
              Our Teak Collections Available in {loc.name}:
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs md:text-sm text-[#2C1810]">
              <li className="flex items-center gap-2">✔ Hand-carved solid teak sofa sets & diwans</li>
              <li className="flex items-center gap-2">✔ 6 to 12-seater royal teak dining suites</li>
              <li className="flex items-center gap-2">✔ King-size heritage cots and wardrobes</li>
              <li className="flex items-center gap-2">✔ Traditional Kerala temple & entrance doors</li>
              <li className="flex items-center gap-2">✔ Executive office desks & library bookcases</li>
              <li className="flex items-center gap-2">✔ Custom architectural wood commissions</li>
            </ul>

            <div className="pt-6 flex flex-col sm:flex-row items-center gap-4">
              <a
                href={SITE_CONFIG.contact.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#4A7C59] hover:bg-[#3D6649] text-white px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors shadow"
              >
                <MessageCircle size={16} />
                <span>WhatsApp Delivery Enquiry</span>
              </a>
              <Link
                href="/contact"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#3D1F0D] hover:bg-[#5C3D1E] text-[#F5ECD7] px-8 py-4 rounded-xl font-bold text-xs uppercase tracking-wider transition-colors"
              >
                <span>Request Custom Quote</span>
              </Link>
            </div>
          </div>
        </article>
      </main>
    </div>
  );
}
