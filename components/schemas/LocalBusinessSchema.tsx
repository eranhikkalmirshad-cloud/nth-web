// components/schemas/LocalBusinessSchema.tsx
import { SITE_CONFIG } from "@/config/site";

export default function LocalBusinessSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE_CONFIG.url}/#localbusiness`,
    name: SITE_CONFIG.name,
    image: [
      `${SITE_CONFIG.url}/og-image.jpg`,
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE_CONFIG.contact.address.street,
      addressLocality: SITE_CONFIG.contact.address.area,
      addressRegion: "KL",
      postalCode: SITE_CONFIG.contact.address.pincode,
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: parseFloat(SITE_CONFIG.contact.geo.latitude),
      longitude: parseFloat(SITE_CONFIG.contact.geo.longitude),
    },
    url: SITE_CONFIG.url,
    telephone: SITE_CONFIG.contact.phone,
    email: SITE_CONFIG.contact.email,
    priceRange: "₹₹₹–₹₹₹₹",
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "09:00",
        closes: "19:00",
      },
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: "Sunday",
        opens: "10:00",
        closes: "17:00",
      },
    ],
    currenciesAccepted: "INR",
    paymentAccepted: "Cash, Credit Card, Debit Card, UPI, Bank Transfer",
    areaServed: "Pan-India, Kerala, Malappuram, Kozhikode, Bangalore, Mumbai, Delhi",
    keywords:
      "nilambur teak furniture, teak wood furniture kerala, genuine teak furniture india, buy teak furniture online, kerala teak wood",
    makesOffer: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Genuine Nilambur Teak Furniture Crafting",
          description: "100% genuine legal Nilambur teak wood handcrafted by generational master artisans.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Custom Bespoke Woodworking",
          description: "Custom built-to-order dining sets, sofas, cots, wardrobes, and carved doors.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Pan-India Secure Furniture Delivery",
          description: "Insured transit and white-glove setup across all Indian cities.",
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
