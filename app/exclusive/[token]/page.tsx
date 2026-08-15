import { Metadata } from "next";
import { getProductByToken, getRelatedProducts } from "@/lib/api/products";
import ProductClientPage from "../../products/[slug]/ProductClientPage";
import { notFound } from "next/navigation";
import { SITE_CONFIG } from "@/config/site";

export async function generateMetadata({ params }: { params: Promise<{ token: string }> }): Promise<Metadata> {
  const { token } = await params;
  const product = await getProductByToken(token);

  if (!product) {
    return {
      title: `Private Collection | ${SITE_CONFIG.name}`,
      description: "Exclusive furniture preview by invitation only.",
    };
  }

  return {
    title: `Exclusive: ${product.name} | ${SITE_CONFIG.name}`,
    description: `Private preview of an exclusive ${SITE_CONFIG.name} masterpiece.`,
    robots: { index: false, follow: false },
  };
}

export default async function Page({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const product = await getProductByToken(token);
  
  if (!product) {
    notFound();
  }

  const relatedProducts = await getRelatedProducts(product.category_id || "", product.slug);

  return (
    <div className="exclusive-view">
      <div className="bg-[#2C1810] text-[#E8B84B] text-xs py-2.5 text-center font-bold tracking-[0.25em] uppercase border-b border-[#D4A96A]/20">
        Private Royal Collection • Invite Only
      </div>
      <ProductClientPage product={product} relatedProducts={relatedProducts} />
    </div>
  );
}
