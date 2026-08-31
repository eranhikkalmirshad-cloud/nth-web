"use server";

import { createClient } from "@/lib/supabase-server";
import { revalidatePath } from "next/cache";

export interface InquiryPayload {
  name: string;
  phone: string;
  email?: string;
  category?: string;
  message?: string;
  productId?: string;
}

export async function submitInquiry(payload: InquiryPayload | FormData) {
  try {
    const supabase = await createClient();

    let full_name = "";
    let phone = "";
    let email = "";
    let interest_category = "";
    let message = "";
    let product_id: string | null = null;

    if (payload instanceof FormData) {
      full_name = (payload.get("name") || payload.get("fullName") || "") as string;
      phone = (payload.get("phone") || "") as string;
      email = (payload.get("email") || "") as string;
      interest_category = (payload.get("category") || payload.get("interest_category") || "") as string;
      message = (payload.get("message") || "") as string;
      product_id = (payload.get("productId") || payload.get("product_id") || null) as string | null;
    } else {
      full_name = payload.name || "";
      phone = payload.phone || "";
      email = payload.email || "";
      interest_category = payload.category || "";
      message = payload.message || "";
      product_id = payload.productId || null;
    }

    full_name = full_name.trim();
    phone = phone.trim();
    email = email.trim();
    message = message.trim();

    if (!full_name) {
      return { error: "Please enter your full name." };
    }
    if (!phone) {
      return { error: "Please enter your phone number." };
    }

    const subject = interest_category
      ? `Enquiry: ${interest_category}`
      : "Bespoke Teak Furniture Enquiry";

    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          full_name,
          phone,
          email: email || null,
          interest_category: interest_category || null,
          subject,
          message: message || "Customer submitted quotation enquiry on website.",
          product_id: product_id || null,
          status: "new",
        },
      ])
      .select()
      .single();

    if (error) {
      console.error("Error inserting customer inquiry:", error);
      return { error: "Failed to store enquiry. Please try again or message via WhatsApp." };
    }

    revalidatePath("/admin/inquiries");
    revalidatePath("/admin");

    return { success: true, data };
  } catch (err: any) {
    console.error("Unexpected error in submitInquiry:", err);
    return { error: err?.message || "Internal server error. Please try again." };
  }
}

