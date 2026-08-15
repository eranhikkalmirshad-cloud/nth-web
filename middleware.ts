import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://eoscwzkfidgotdjwlokw.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  "sb_publishable_VM44jGsb7yku4C4wVFNqyQ_dXYWNsUb";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Admin authentication check
  const adminSessionCookie = request.cookies.get("nth_admin_session")?.value;
  let isUserAuthenticated = false;

  try {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@nilamburteakheritage.com").toLowerCase();
    if (user && user.email?.toLowerCase() === adminEmail) {
      isUserAuthenticated = true;
    }
  } catch {
    // Graceful catch if Supabase is initializing
  }

  const isAuthenticatedAdmin = adminSessionCookie === "authenticated" || isUserAuthenticated;

  // Admin route protection
  if (request.nextUrl.pathname.startsWith("/admin")) {
    if (request.nextUrl.pathname === "/admin/login") {
      if (isAuthenticatedAdmin) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return response;
    }

    if (!isAuthenticatedAdmin) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|mp4)$).*)",
  ],
};
