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
  logo: "/images/logo.png",
  logoHeader: "/images/logo.png",
  logoFooter: "/images/logo.png",
  favicon: "/images/logo.png",

  // Business Contact (Placeholder values configurable via .env or client input)
  contact: {
    phone: process.env.NEXT_PUBLIC_PHONE || "+91 XXXXXXXXXX",
    phoneDisplay: "+91 XXXXXXXXXX",
    whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX",
    whatsappDisplay: "+91 XXXXXXXXXX",
    whatsappLink: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX"}?text=${encodeURIComponent(
      "Hello Nilambur Teak Heritage! I'm interested in your handcrafted teak wood furniture. Please share more details and a custom quote."
    )}`,
    email: process.env.NEXT_PUBLIC_EMAIL || "info@nilamburteakheritage.com",
    address: {
      street: "Main Road, Near Nilambur Teak Museum",
      area: "Nilambur",
      district: "Malappuram",
      state: "Kerala",
      country: "India",
      pincode: "679329",
      full: "Nilambur, Malappuram District, Kerala, India",
    },
    geo: {
      latitude: "11.2778",
      longitude: "76.2241",
    },
    hours: {
      weekdays: "Monday – Saturday: 9:00 AM – 7:00 PM",
      sunday: "Sunday: 10:00 AM – 5:00 PM",
    },
    gstin: "[CLIENT WILL PROVIDE]",
  },

  // Social Links
  social: {
    instagram: "https://instagram.com/nilamburteakheritage",
    facebook: "https://facebook.com/nilamburteakheritage",
    youtube: "https://youtube.com/@nilamburteakheritage",
    whatsapp: `https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "91XXXXXXXXXX"}`,
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
    {
      label: "Collections",
      href: "/products",
      children: [
        { label: "Living Room", href: "/rooms/living-room", desc: "Sofa sets, diwans, coffee tables, TV units" },
        { label: "Bedroom", href: "/rooms/bedroom", desc: "Teak cots, wardrobes, dressing tables, side tables" },
        { label: "Dining Sets", href: "/rooms/dining-room", desc: "6-8 seater royal dining tables & chairs" },
        { label: "Office Furniture", href: "/rooms/office", desc: "Executive desks, library shelves, conference tables" },
        { label: "Doors & Windows", href: "/products/doors", desc: "Carved main doors, pooja room doors, frames" },
        { label: "Custom Woodwork", href: "/contact", desc: "Bespoke architectural woodwork & custom orders" },
      ],
    },
    { label: "Our Story", href: "/about" },
    { label: "Process", href: "/#process" },
    { label: "Showrooms", href: "/showrooms" },
    { label: "Contact", href: "/contact" },
  ],

  // Categories
  categories: [
    {
      id: "living-room",
      name: "Living Room",
      slug: "living-room",
      tagline: "Handcrafted Teak Sofas, Diwans & Accent Tables",
      image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      itemCount: "24+ Pieces",
    },
    {
      id: "bedroom",
      name: "Bedroom Furniture",
      slug: "bedroom",
      tagline: "Heirloom Teak Beds, Wardrobes & Dressers",
      image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      itemCount: "18+ Pieces",
    },
    {
      id: "dining",
      name: "Dining Sets",
      slug: "dining",
      tagline: "Solid Teak Dining Tables & Artisan Chairs",
      image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop",
      itemCount: "16+ Pieces",
    },
    {
      id: "office",
      name: "Office Furniture",
      slug: "office",
      tagline: "Executive Teak Desks, Cabinets & Bookcases",
      image: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
      itemCount: "12+ Pieces",
    },
    {
      id: "doors-windows",
      name: "Doors & Windows",
      slug: "doors-windows",
      tagline: "Intricately Carved Teak Entrance Doors & Frames",
      image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
      itemCount: "15+ Pieces",
    },
    {
      id: "custom-woodwork",
      name: "Custom Woodwork",
      slug: "custom-woodwork",
      tagline: "Bespoke Heritage Crafting Tailored to Your Architecture",
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?q=80&w=1200&auto=format&fit=crop",
      itemCount: "Unlimited",
    },
  ],
};
