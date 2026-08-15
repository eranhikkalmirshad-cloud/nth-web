// components/schemas/ProductSchema.tsx
import { SITE_CONFIG } from "@/config/site";

interface ProductSchemaProps {
  name: string;
  description: string;
  images: string[];
  price?: number;
  priceCurrency?: string;
  availability?: "InStock" | "OutOfStock" | "PreOrder";
  sku?: string;
  brand?: string;
  category?: string;
  ratingValue?: number;
  reviewCount?: number;
  url?: string;
}

export default function ProductSchema({
  name,
  description,
  images,
  price,
  priceCurrency = "INR",
  availability = "InStock",
  sku,
  brand = SITE_CONFIG.name,
  category,
  ratingValue,
  reviewCount,
  url,
}: ProductSchemaProps) {
  const priceValidUntil = new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: images,
    description,
    ...(sku && { sku }),
    brand: { "@type": "Brand", name: brand },
    manufacturer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    ...(category && { category }),
    ...(price && {
      offers: {
        "@type": "Offer",
        url: url ?? `${SITE_CONFIG.url}/products`,
        priceCurrency,
        price,
        priceValidUntil,
        availability: `https://schema.org/${availability}`,
        itemCondition: "https://schema.org/NewCondition",
        seller: {
          "@type": "Organization",
          name: SITE_CONFIG.name,
          url: SITE_CONFIG.url,
        },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: {
            "@type": "MonetaryAmount",
            value: "0",
            currency: "INR",
          },
          shippingDestination: {
            "@type": "DefinedRegion",
            addressCountry: "IN",
          },
        },
      },
    }),
    ...(ratingValue && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue,
        reviewCount: reviewCount ?? 0,
        bestRating: "5",
        worstRating: "1",
      },
    }),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
