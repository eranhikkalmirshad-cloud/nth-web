import { createClient } from "@/lib/supabase-server";
import InquiriesDashboard from "./InquiriesDashboard";
import { MessageSquare } from "lucide-react";

export default async function AdminInquiriesPage() {
  const supabase = await createClient();
  const { data: inquiries } = await supabase
    .from("inquiries")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-xl border border-[#EAE8E2] shadow-xs">
        <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A572A] mb-1">
          <MessageSquare size={14} />
          <span>Customer CRM & Leads</span>
        </div>
        <h2 className="text-xl font-bold font-cinzel text-[#1C130D]">Customer Inquiries</h2>
        <p className="text-xs text-[#7A6E65] mt-0.5">
          Manage product inquiries, custom teak furniture quotation requests, and client communications.
        </p>
      </div>

      <InquiriesDashboard initialInquiries={inquiries || []} />
    </div>
  );
}
