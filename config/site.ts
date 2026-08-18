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
      googleMapsEmbedUrl: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3913.673898234851!2d76.192305!3d11.238411!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba63a6c98695bc3%3A0x6b4f738b525890e1!2sMampad%2C%20Kerala%20676542!5e0!3m2!1sen!2sin!4v1718000000000!5m2!1sen!2sin",
      googleMapsDirectionsUrl: "https://maps.google.com/?q=Koolikkal,+Mampad+P.O.,+Malappuram+Dist.,+Kerala+676542",
    },
    geo: {
      latitude: "11.2384",
      longitude: "76.1923",
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
    { title: "100% Nilambur Teak", desc: "Genuine legal teak sourced directly from Nilambur forests", icon: "Tree" },
    { title: "Govt. Certified", desc: "Legally sourced with full government transit authorization", icon: "Award" },
    { title: "Pan-India Delivery", desc: "Safe, insured, and white-glove delivery across all Indian cities", icon: "Truck" },
    { title: "25+ Years Craftsmanship", desc: "Generational master woodworkers and artisan joinery", icon: "Shield" },
    { title: "Lifetime Guarantee", desc: "Unmatched durability backed by heirloom-grade warranty", icon: "CheckCircle" },
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
