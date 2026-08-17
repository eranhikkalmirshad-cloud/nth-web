// app/admin/page.tsx
import { createClient } from "@/lib/supabase-server";
import AdminDashboardClient from "./AdminDashboardClient";

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch real counts from database tables
  const [
    { count: productCount },
    { count: categoryCount },
    { count: inquiryCount },
    { count: testimonialCount },
    { data: recentInquiries }
  ] = await Promise.all([
    supabase.from("products").select("*", { count: "exact", head: true }),
    supabase.from("categories").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*", { count: "exact", head: true }),
    supabase.from("testimonials").select("*", { count: "exact", head: true }),
    supabase.from("inquiries").select("*").order("created_at", { ascending: false }).limit(4)
  ]);

  const stats = [
    { label: "Active Teak Pieces", value: productCount || 0, href: "/admin/products" },
    { label: "Master Categories", value: categoryCount || 19, href: "/admin/categories" },
    { label: "Customer Inquiries", value: inquiryCount || 0, href: "/admin/inquiries" },
    { label: "Client Testimonials", value: testimonialCount || 0, href: "/admin/testimonials" },
  ];

  return <AdminDashboardClient stats={stats} recentInquiries={recentInquiries || []} />;
}
