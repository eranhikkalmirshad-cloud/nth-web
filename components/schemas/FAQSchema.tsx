// components/schemas/FAQSchema.tsx
interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSchemaProps {
  faqs: FAQItem[];
}

export default function FAQSchema({ faqs }: FAQSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

// ─── Nilambur Teak Heritage FAQs ─────────────────────────────
export const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "Where is Nilambur Teak Heritage showroom located?",
    answer:
      "Nilambur Teak Heritage is situated in Nilambur, Malappuram District, Kerala, India – in the historic heartland of world-renowned Nilambur teak plantations.",
  },
  {
    question: "Why is Nilambur Teak considered the best wood in the world?",
    answer:
      "Nilambur teak is globally celebrated for its unmatched grain density, rich golden-brown hue, natural oil content preventing termites, and generational durability. It was used historically in global shipping and royal palaces.",
  },
  {
    question: "Is your teak wood 100% genuine Nilambur teak?",
    answer:
      "Yes! 100% of our furniture is crafted exclusively from mature, genuine Nilambur teak wood with dense natural grain, rich oil content, and traditional joinery.",
  },
  {
    question: "Do you deliver teak furniture across India?",
    answer:
      "Yes, we provide insured, pan-India white-glove delivery across all major cities including Mumbai, Delhi, Bengaluru, Chennai, Hyderabad, and Kochi.",
  },
  {
    question: "Can I place custom orders with specific dimensions and designs?",
    answer:
      "Absolutely. Our master artisans specialize in bespoke dining sets, bedroom cots, carved temple/main doors, and living room collections tailored precisely to your architectural drawings.",
  },
  {
    question: "How long does custom teak furniture crafting take?",
    answer:
      "Handcrafted custom teak pieces typically require 4 to 8 weeks depending on the intricacy of carving, seasoning, and multi-coat lacquer finishing.",
  },
];
