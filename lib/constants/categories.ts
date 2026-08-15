// lib/constants/categories.ts
// Nilambur Teak Heritage™ — Master Categories & Rooms

export interface CategoryItem {
  name: string;
  slug: string;
  href: string;
  image: string;
  description?: string;
  isPopular?: boolean;
}

export interface RoomItem {
  name: string;
  slug: string;
  href: string;
  image: string;
  description?: string;
}

export const PRODUCT_CATEGORIES: CategoryItem[] = [
  {
    name: "Sofas",
    slug: "sofas",
    href: "/products?category=sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop",
    description: "Solid Nilambur teak 3-seater, L-shape, and classic living suites.",
    isPopular: true,
  },
  {
    name: "Chairs",
    slug: "chairs",
    href: "/products?category=chairs",
    image: "https://images.unsplash.com/photo-1580481077111-54f65c92842c?q=80&w=600&auto=format&fit=crop",
    description: "Ergonomic dining chairs, armchairs, and carved wooden seating.",
    isPopular: true,
  },
  {
    name: "Tables",
    slug: "tables",
    href: "/products?category=tables",
    image: "https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop",
    description: "Heavy solid teak console tables, side tables, and accent desks.",
  },
  {
    name: "Dining",
    slug: "dining",
    href: "/products?category=dining",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=600&auto=format&fit=crop",
    description: "Heirloom 4, 6, 8 & 10-seater solid teak dining table sets.",
    isPopular: true,
  },
  {
    name: "Lounge Chairs",
    slug: "lounge-chairs",
    href: "/products?category=lounge-chairs",
    image: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop",
    description: "Comfort-engineered recliner chairs and plantation easy chairs.",
    isPopular: true,
  },
  {
    name: "Sitout",
    slug: "sitout",
    href: "/products?category=sitout",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop",
    description: "Traditional Kerala veranda benches, rocking chairs, and charupadi.",
  },
  {
    name: "Study and Office",
    slug: "study-and-office",
    href: "/products?category=study-and-office",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&auto=format&fit=crop",
    description: "Executive solid teak writing desks, office tables, and library units.",
  },
  {
    name: "Beds",
    slug: "beds",
    href: "/products?category=beds",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop",
    description: "King & Queen size solid teak cots with hydraulic & box storage.",
    isPopular: true,
  },
  {
    name: "TV Units",
    slug: "tv-units",
    href: "/products?category=tv-units",
    image: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop",
    description: "Contemporary & classical teak media consoles and wall entertainment centers.",
  },
  {
    name: "Coffee Tables",
    slug: "coffee-tables",
    href: "/products?category=coffee-tables",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=600&auto=format&fit=crop",
    description: "Center tables with brass inlay, glass tops, and carved teak legs.",
  },
  {
    name: "Cabinet",
    slug: "cabinet",
    href: "/products?category=cabinet",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop",
    description: "Crockery units, display vitrines, and storage sideboards.",
  },
  {
    name: "Bookshelves",
    slug: "bookshelves",
    href: "/products?category=bookshelves",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop",
    description: "Tall wooden book racks, library display cases, and open cubbies.",
  },
  {
    name: "Diwan Beds",
    slug: "diwan-beds",
    href: "/products?category=diwan-beds",
    image: "https://images.unsplash.com/photo-1540518614846-7ede433c4550?q=80&w=600&auto=format&fit=crop",
    description: "Daybeds and traditional Kerala living diwans with bolsters.",
  },
  {
    name: "Wardrobes",
    slug: "wardrobes",
    href: "/products?category=wardrobes",
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop",
    description: "2, 3 & 4-door solid teak almirahs with master joinery and mirrors.",
  },
  {
    name: "Benches",
    slug: "benches",
    href: "/products?category=benches",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=600&auto=format&fit=crop",
    description: "Dining benches, entryway benches, and garden teak seating.",
  },
  {
    name: "Shoes Racks",
    slug: "shoes-racks",
    href: "/products?category=shoes-racks",
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop",
    description: "Ventilated solid teak shoe cabinets and seating shoe benches.",
  },
  {
    name: "Outdoor Furniture",
    slug: "outdoor-furniture",
    href: "/products?category=outdoor-furniture",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop",
    description: "Weather-resistant Nilambur teak patio sets and poolside loungers.",
  },
  {
    name: "Bedside Table",
    slug: "bedside-table",
    href: "/products?category=bedside-table",
    image: "https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=600&auto=format&fit=crop",
    description: "Nightstands with soft-close drawers and brass handles.",
  },
  {
    name: "Wall Decors",
    slug: "wall-decors",
    href: "/products?category=wall-decors",
    image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop",
    description: "Carved teak wood wall panels, mirror frames, and jali art.",
  },
];

export const ROOM_CATEGORIES: RoomItem[] = [
  {
    name: "Living Room",
    slug: "living-room",
    href: "/rooms/living-room",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=800&auto=format&fit=crop",
    description: "Sofas, Diwans, Coffee Tables, and TV Consoles.",
  },
  {
    name: "Dining Room",
    slug: "dining-room",
    href: "/rooms/dining-room",
    image: "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=800&auto=format&fit=crop",
    description: "Heirloom Dining Sets, Sideboards, and Benches.",
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    href: "/rooms/bedroom",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=800&auto=format&fit=crop",
    description: "Solid Teak Beds, Wardrobes, and Bedside Nightstands.",
  },
  {
    name: "Sitout",
    slug: "sitout",
    href: "/rooms/sitout",
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=800&auto=format&fit=crop",
    description: "Veranda Chairs, Easy Chairs, and Outdoor Teak Furniture.",
  },
  {
    name: "Study & Office",
    slug: "office",
    href: "/rooms/office",
    image: "https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=800&auto=format&fit=crop",
    description: "Executive Desks, Bookshelves, and Study Seating.",
  },
];
