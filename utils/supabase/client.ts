import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eoscwzkfidgotdjwlokw.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_VM44jGsb7yku4C4wVFNqyQ_dXYWNsUb";

export const createClient = () =>
  createBrowserClient(
    supabaseUrl,
    supabaseKey,
  );
