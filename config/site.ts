// config/site.ts
// Centralized configuration for Nilambur Teak Heritage™

export const SITE_CONFIG = {
  name: "Nilambur Teak Heritage™",
  shortName: "Nilambur Teak Heritage",
  tagline: "Crafted from the Heart of Nilambur Forests",
  subTagline: "Kerala's Finest Teak Wood Furniture Since Generations",
  description:
    "Experience the unmatched quality of 100% genuine Nilambur teak wood furniture. Government certified teak, handcrafted by master artisans with pan-India delivery and custom order capabilities.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://nilamburteakheritage.com",
  ogImage: "/og-image.jpg",
  logo: "/images/logo-proper.png",
  logoHeader: "/images/logo-proper.png",
  logoFooter: "/images/logo-proper.png",
  favicon: "/images/logo-proper.png",

  // Business Contact & Official Location
  contact: {
    phone: "+918891221994",
    phoneDisplay: "+91 88912 21994",
    whatsappNumber: "918891221994",
    whatsappDisplay: "+91 88912 21994",
    whatsappLink: `https://wa.me/918891221994?text=${encodeURIComponent(
      "Hello Nilambur Teak Heritage! I am interested in your handcrafted teak wood furniture and interior woodwork. Please share more details and a quote."
    )}`,
    email: process.env.NEXT_PUBLIC_EMAIL || "nilambur.teak.heritage@gmail.com",
    address: {
      businessName: "NILAMBUR TEAK HERITAGE",
      tagline: "DEALERS IN: WOODEN FURNITURE & BUILDING MATERIALS",
      street: "Koolikkal, Mampad P.O.",
      area: "Mampad",
      district: "Malappuram Dist.",
      state: "Kerala",
      country: "India",
      pincode: "676542",
      full: "Koolikkal, Mampad P.O., Malappuram Dist., Kerala - 676542",
      googleMapsQuery: "Nilambur Teak Heritage, Koolikkal, Mampad, Kerala 676542",
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3913.4252467435276!2d76.17256707504852!3d11.230095788947576!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDEzJzQ4LjMiTiA3NsKwMTAnMzAuNSJF!5e0!3m2!1sen!2sin!4v1787119850483!5m2!1sen!2sin",
      googleMapsDirectionsUrl: "https://maps.google.com/?q=11.2300958,76.1725671",
    },
    geo: {
      latitude: "11.230096",
      longitude: "76.172567",
    },
    hours: {
      weekdays: "Monday – Saturday: 9:00 AM – 7:30 PM",
      sunday: "Sunday: 10:00 AM – 5:00 PM",
    },
    gstin: "[AVAILABLE ON REQUEST]",
  },

  // Social Links
  social: {
    instagram: "https://www.instagram.com/nilambur_teak_heritage?igsh=MXdudnM3aXRsZ2U0",
    facebook: "https://facebook.com/nilamburteakheritage",
    youtube: "https://youtube.com/@nilamburteakheritage",
    whatsapp: "https://wa.me/918891221994",
  },

  // USP Badges
  usps: [
    { title: "100% Nilambur Teak", desc: "Genuine mature teak wood handcrafted in Nilambur", icon: "Tree" },
    { title: "Master Craftsmanship", desc: "Hand-rubbed organic finishes & traditional joinery", icon: "Award" },
    { title: "Pan-India Delivery", desc: "Safe, insured, and white-glove delivery across all Indian cities", icon: "Truck" },
    { title: "25+ Years Mastery", desc: "Generational master woodworkers and artisan joinery", icon: "Shield" },
    { title: "5-Year Warranty", desc: "Unmatched durability backed by structural warranty", icon: "CheckCircle" },
    { title: "Custom Orders", desc: "Bespoke dimensions, wood finishes, and carved details", icon: "Sparkles" },
  ],

  // Navigation Links
  navigation: [
    { label: "Home", href: "/" },
    { label: "Collections", href: "/products" },
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
};
