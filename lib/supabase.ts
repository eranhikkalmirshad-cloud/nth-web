import { createClient as createBrowserSupabaseClient } from "@/utils/supabase/client";

export function createClient() {
  return createBrowserSupabaseClient();
}

export const supabase = createClient();
