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
  weight: ["300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#5C3D1E",
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_CONFIG.url),
  title: {
    default: "Nilambur Teak Heritage™ - Kerala's Finest Teak Wood Furniture",
    template: "%s | Nilambur Teak Heritage™",
  },
  description:
    "Buy 100% genuine Nilambur teak wood furniture. Handcrafted by master artisans. Government certified teak. Pan-India delivery. Custom orders welcome.",
  keywords: [
    "nilambur teak furniture",
    "teak wood furniture kerala",
    "genuine teak furniture india",
    "buy teak furniture online",
    "nilambur teak heritage",
    "kerala teak furniture",
    "solid teak wood sofa",
    "teak dining table sets",
    "teak wood bedroom cots",
    "kerala teak wood doors",
    "heirloom teak furniture",
    "custom teak woodwork",
    "nilambur teak malappuram",
  ],
  authors: [{ name: "Nilambur Teak Heritage™" }],
  creator: "Nilambur Teak Heritage™",
  publisher: "Nilambur Teak Heritage™",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_CONFIG.url,
    siteName: SITE_CONFIG.name,
    title: "Nilambur Teak Heritage™ - Kerala's Finest Teak Wood Furniture",
    description:
      "Buy 100% genuine Nilambur teak wood furniture. Handcrafted by master artisans. Government certified teak. Pan-India delivery.",
    images: [
      {
        url: SITE_CONFIG.ogImage,
        width: 1200,
        height: 630,
        alt: "Nilambur Teak Heritage - Kerala's Finest Teak Wood Furniture",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nilambur Teak Heritage™ | Kerala's Finest Teak Wood Furniture",
    description:
      "100% genuine Nilambur teak wood furniture handcrafted by master artisans. Pan-India delivery.",
    images: [SITE_CONFIG.ogImage],
  },
  robots: {
    index: true,
    follow: true,
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
        <meta name="geo.region" content="IN-KL" />
        <meta name="geo.placename" content="Nilambur, Malappuram District, Kerala, India" />
        <meta name="geo.position" content="11.2778;76.2241" />
        <meta name="ICBM" content="11.2778, 76.2241" />
        <OrganizationSchema />
        <LocalBusinessSchema />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-screen flex flex-col bg-white text-[#111111] antialiased"
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