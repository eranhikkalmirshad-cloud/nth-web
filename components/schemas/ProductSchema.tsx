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
  availability = "PreOrder",
  sku,
  brand = SITE_CONFIG.name,
  category,
  ratingValue = 4.9,
  reviewCount = 28,
  url,
}: ProductSchemaProps) {
  const priceValidUntil = new Date(Date.now() + 180 * 24 * 60 * 60 * 1000)
    .toISOString()
    .split("T")[0];

  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    image: images.length > 0 ? images : [`${SITE_CONFIG.url}/images/logo-proper.png`],
    description: description || "Handcrafted 100% genuine Nilambur teak wood furniture.",
    ...(sku && { sku }),
    brand: { "@type": "Brand", name: brand },
    manufacturer: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
      telephone: SITE_CONFIG.contact.phone,
    },
    ...(category && { category }),
    offers: {
      "@type": "Offer",
      url: url ?? `${SITE_CONFIG.url}/products`,
      priceCurrency,
      price: price || "0",
      priceValidUntil,
      availability: `https://schema.org/${availability}`,
      itemCondition: "https://schema.org/NewCondition",
      priceSpecification: {
        "@type": "PriceSpecification",
        priceCurrency: "INR",
        valueAddedTaxIncluded: true,
      },
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
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
          },
          cutoffTime: "17:00:00Z",
          handlingTime: {
            "@type": "QuantitativeValue",
            minValue: 7,
            maxValue: 21,
            unitCode: "d",
          },
          transitTime: {
            "@type": "QuantitativeValue",
            minValue: 3,
            maxValue: 7,
            unitCode: "d",
          },
        },
      },
      hasMerchantReturnPolicy: {
        "@type": "MerchantReturnPolicy",
        applicableCountry: "IN",
        returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
        merchantReturnDays: 30,
        returnMethod: "https://schema.org/ReturnByMail",
        returnFees: "https://schema.org/FreeReturn",
      },
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: ratingValue.toString(),
      reviewCount: reviewCount.toString(),
      bestRating: "5",
      worstRating: "1",
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
