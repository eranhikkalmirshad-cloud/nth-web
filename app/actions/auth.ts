"use server";

import { createClient } from "@/lib/supabase-server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = await cookies();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@nilamburteakheritage.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "admin@nilambur2026";

  if (email.trim().toLowerCase() !== adminEmail.trim().toLowerCase() || password !== adminPassword) {
    return { error: "Invalid admin email or password." };
  }

  // Set secure admin session cookie
  cookieStore.set("nth_admin_session", "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });

  // Try Supabase auth if user is registered in Supabase
  try {
    const supabase = await createClient();
    await supabase.auth.signInWithPassword({
      email,
      password,
    });
  } catch {
    // Supabase auth user optional fallback
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}

export async function handleLogout() {
  const cookieStore = await cookies();
  cookieStore.delete("nth_admin_session");

  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch {
    // Optional
  }

  revalidatePath("/", "layout");
  redirect("/admin/login");
}
