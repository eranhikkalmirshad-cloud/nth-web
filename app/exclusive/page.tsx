import { Metadata } from "next";
import { getPrivateProducts } from "@/lib/api/products";
import ExclusiveShowroomClient from "./ExclusiveShowroomClient";
import { SITE_CONFIG } from "@/config/site";

export const metadata: Metadata = {
  title: `Private Collection | ${SITE_CONFIG.name}`,
  description: "An exclusive invitation to view prestigious, private royal teak commissions.",
  robots: { index: false, follow: false },
};

export default async function ExclusiveShowroomPage() {
  const products = await getPrivateProducts();

  return (
    <div className="bg-[#2C1810] min-h-screen text-[#F5ECD7]">
      {/* Header */}
      <div className="bg-[#1A0E0A] border-b border-[#D4A96A]/20 py-3 text-center">
        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-[#C9922A] font-cinzel">
          Private Royal Collection • Nilambur Teak Heritage
        </span>
      </div>

      <ExclusiveShowroomClient products={products} />

      {/* Footer Branding */}
      <div className="py-20 text-center border-t border-[#D4A96A]/20 mt-20">
        <div className="flex flex-col items-center gap-3">
          <span className="font-cinzel text-xl font-bold tracking-wider text-[#E8B84B]">
            {SITE_CONFIG.name}
          </span>
          <p className="text-[10px] uppercase tracking-[0.3em] text-[#EAD5B0]/70 font-lato">
            Kerala's Finest Teak Wood Furniture Since Generations
          </p>
        </div>
      </div>
    </div>
  );
}
