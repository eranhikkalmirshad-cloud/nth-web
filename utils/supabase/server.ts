import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eoscwzkfidgotdjwlokw.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_VM44jGsb7yku4C4wVFNqyQ_dXYWNsUb";

export const createClient = (cookieStore?: Awaited<ReturnType<typeof cookies>>) => {
  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        async getAll() {
          const store = cookieStore || (await cookies());
          return store.getAll();
        },
        async setAll(cookiesToSet) {
          try {
            const store = cookieStore || (await cookies());
            cookiesToSet.forEach(({ name, value, options }) => store.set(name, value, options));
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing user sessions.
          }
        },
      },
    },
  );
};
