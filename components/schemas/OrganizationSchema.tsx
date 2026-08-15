// components/schemas/OrganizationSchema.tsx
import { SITE_CONFIG } from "@/config/site";

export default function OrganizationSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    "@id": `${SITE_CONFIG.url}/#organization`,
    name: SITE_CONFIG.name,
    alternateName: [SITE_CONFIG.shortName, "Nilambur Teak Wood Furniture", "Nilambur Furniture Heritage"],
    url: SITE_CONFIG.url,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
      width: 400,
      height: 400,
    },
    image: `${SITE_CONFIG.url}/og-image.jpg`,
    description: SITE_CONFIG.description,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.street,
      addressLocality: SITE_CONFIG.contact.address.area,
      addressRegion: SITE_CONFIG.contact.address.state,
      postalCode: SITE_CONFIG.contact.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE_CONFIG.contact.geo.latitude,
      longitude: SITE_CONFIG.contact.geo.longitude,
    },
    priceRange: "₹₹₹–₹₹₹₹",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Bank Transfer",
    currenciesAccepted: "INR",
    areaServed: [
      { "@type": "City", name: "Nilambur" },
      { "@type": "City", name: "Malappuram" },
      { "@type": "City", name: "Kozhikode" },
      { "@type": "City", name: "Kochi" },
      { "@type": "City", name: "Bangalore" },
      { "@type": "City", name: "Mumbai" },
      { "@type": "City", name: "Delhi" },
      { "@type": "Country", name: "India" },
    ],
    sameAs: [
      SITE_CONFIG.social.facebook,
      SITE_CONFIG.social.instagram,
      SITE_CONFIG.social.youtube,
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
