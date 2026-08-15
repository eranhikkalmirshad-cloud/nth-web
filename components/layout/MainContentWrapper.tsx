"use client";

import { usePathname } from "next/navigation";

interface MainContentWrapperProps {
  children: React.ReactNode;
}

/**
 * A wrapper component that applies conditional top padding to the main content area.
 * It removes the padding on admin routes to prevent an unwanted white gap.
 */
export default function MainContentWrapper({ children }: MainContentWrapperProps) {
  const pathname = usePathname();

  // Check if we are on an admin route
  const isAdmin = pathname?.startsWith("/admin");

  // Navbar is sticky top-0, so no top padding is needed
  return (
    <main className="flex-1">
      {children}
    </main>
  );
}
