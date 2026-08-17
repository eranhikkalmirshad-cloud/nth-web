// app/layout.tsx
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Cormorant_Garamond, Lato, Cinzel, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppFloating from "@/components/ui/WhatsAppFloating";
import MobileBottomBar from "@/components/layout/MobileBottomBar";
import Preloader from "@/components/ui/Preloader";
import FavoritesDrawer from "@/components/ui/FavoritesDrawer";
import { FavoritesProvider } from "@/lib/context/FavoritesContext";
import AdminExclusionWrapper from "@/components/layout/AdminExclusionWrapper";
import OrganizationSchema from "@/components/schemas/OrganizationSchema";
import LocalBusinessSchema from "@/components/schemas/LocalBusinessSchema";
import MainContentWrapper from "@/components/layout/MainContentWrapper";
import { Toaster } from "sonner";
import VisitTracker from "@/components/analytics/VisitTracker";
import { SITE_CONFIG } from "@/config/site";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  display: "swap",
  weight: ["100", "300", "400", "700", "900"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#8A572A",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Nilambur Teak Heritage™ — Kerala's Finest Teak Wood Furniture",
    template: "%s | Nilambur Teak Heritage™",
  },
  description:
    "Experience 100% genuine Nilambur teak wood furniture and bespoke architectural millwork. Handcrafted by generational master woodcrafters in Kerala with pan-India insured delivery.",
  keywords: [
    "nilambur teak furniture",
    "teak wood furniture kerala",
    "nilambur teak heritage",
    "genuine teak furniture india",
    "buy teak furniture online",
    "kerala teak wood furniture",
    "solid teak wood sofa",
    "heirloom teak dining tables",
    "teak wood bedroom cots",
    "carved kerala teak doors",
    "nilambur teak malappuram",
    "mampad teak furniture",
    "custom teak woodwork kerala",
    "nilambur woodcraft atelier",
  ],
  authors: [{ name: "Nilambur Teak Heritage™", url: SITE_CONFIG.url }],
  creator: "Nilambur Teak Heritage™",
  publisher: "Nilambur Teak Heritage™",
  icons: {
    icon: [
      { url: "/images/logo-proper.png", sizes: "any" },
      { url: "/images/logo-proper.png", type: "image/png" },
    ],
    shortcut: "/images/logo-proper.png",
    apple: [
      { url: "/images/logo-proper.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Nilambur Teak Heritage™ — Kerala's Finest Teak Wood Furniture",
    description:
      "Buy 100% genuine Nilambur teak wood furniture. Handcrafted by master artisans with generational Kerala joinery and pan-India delivery.",
    images: [
      {
        url: "/images/logo-proper.png",
        width: 800,
        height: 800,
        alt: "Nilambur Teak Heritage — Master Emblem",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilambur Teak Heritage™ | Kerala's Finest Teak Wood Furniture",
    description:
      "100% genuine Nilambur teak wood furniture handcrafted by generational master artisans. Pan-India delivery.",
    images: ["/images/logo-proper.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: SITE_CONFIG.url,
  },
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${cormorant.variable} ${cinzel.variable} ${lato.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="icon" href="/images/logo-proper.png" type="image/png" />
        <link rel="apple-touch-icon" href="/images/logo-proper.png" />
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Koolikkal, Mampad, Malappuram District, Kerala, India" />
        <meta name="geo.position" content="11.2384;76.1923" />
        <meta name="ICBM" content="11.2384, 76.1923" />
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-white text-[#111111] antialiased font-sans"
      >
        <VisitTracker />
        <FavoritesProvider>
          <Preloader />

          <AdminExclusionWrapper>
            <Navbar />
            <FavoritesDrawer />
          </AdminExclusionWrapper>

          <MainContentWrapper>{children}</MainContentWrapper>

          <AdminExclusionWrapper>
            <Footer />
            <WhatsAppFloating />
            <MobileBottomBar />
          </AdminExclusionWrapper>
        </FavoritesProvider>

        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              strategy="afterInteractive"
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
            />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', {
                  page_path: window.location.pathname,
                  send_page_view: true
                });
              `}
            </Script>
          </>
        )}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}