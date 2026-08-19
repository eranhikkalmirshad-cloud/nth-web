// lib/constants/categories.ts
// Nilambur Teak Heritage™ — Master Categories & Rooms with Live User Cloudinary Assets

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
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786797985/nilambur-teak-heritage/cwntirpydqajymirpm6z.png",
    description: "Solid Nilambur teak 3-seater, L-shape, and classic living suites.",
    isPopular: true,
  },
  {
    name: "Chairs",
    slug: "chairs",
    href: "/products?category=chairs",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798077/nilambur-teak-heritage/hnbdukb7nbdyyetft0ob.png",
    description: "Ergonomic dining chairs, armchairs, and carved wooden seating.",
    isPopular: true,
  },
  {
    name: "Tables",
    slug: "tables",
    href: "/products?category=tables",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798361/nilambur-teak-heritage/n0fzbuf2b8p6667c7sf9.png",
    description: "Heavy solid teak console tables, side tables, and accent desks.",
  },
  {
    name: "Dining",
    slug: "dining",
    href: "/products?category=dining",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798465/nilambur-teak-heritage/a3cpwb5mbpkuvb6flu46.png",
    description: "Heirloom 4, 6, 8 & 10-seater solid teak dining table sets.",
    isPopular: true,
  },
  {
    name: "Lounge Chairs",
    slug: "lounge-chairs",
    href: "/products?category=lounge-chairs",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798556/nilambur-teak-heritage/hfv7hbazvfgharlm7lo9.png",
    description: "Comfort-engineered recliner chairs and plantation easy chairs.",
    isPopular: true,
  },
  {
    name: "Sitout",
    slug: "sitout",
    href: "/products?category=sitout",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798650/nilambur-teak-heritage/yzz3bxthdocmux45596a.png",
    description: "Traditional Kerala veranda benches, rocking chairs, and charupadi.",
  },
  {
    name: "Study and Office",
    slug: "study-and-office",
    href: "/products?category=study-and-office",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798773/nilambur-teak-heritage/rcaaxki3jaogj1kappm4.png",
    description: "Executive solid teak writing desks, office tables, and library units.",
  },
  {
    name: "Beds",
    slug: "beds",
    href: "/products?category=beds",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798882/nilambur-teak-heritage/daspcmkzvbsmghfddlts.png",
    description: "King & Queen size solid teak cots with hydraulic & box storage.",
    isPopular: true,
  },
  {
    name: "TV Units",
    slug: "tv-units",
    href: "/products?category=tv-units",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798972/nilambur-teak-heritage/ykra4xor9fx143w2lxb0.png",
    description: "Contemporary & classical teak media consoles and wall entertainment centers.",
  },
  {
    name: "Coffee Tables",
    slug: "coffee-tables",
    href: "/products?category=coffee-tables",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786799059/nilambur-teak-heritage/ddogc6bhbws6eg6imtuv.png",
    description: "Center tables with brass inlay, glass tops, and carved teak legs.",
  },
  {
    name: "Cabinet",
    slug: "cabinet",
    href: "/products?category=cabinet",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786799207/nilambur-teak-heritage/sndhoesxcbrfcby6oemp.png",
    description: "Crockery units, display vitrines, and storage sideboards.",
  },
  {
    name: "Bookshelves",
    slug: "bookshelves",
    href: "/products?category=bookshelves",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786799331/nilambur-teak-heritage/llim471wfclipqehcj0t.png",
    description: "Tall wooden book racks, library display cases, and open cubbies.",
  },
  {
    name: "Diwan Beds",
    slug: "diwan-beds",
    href: "/products?category=diwan-beds",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786799447/nilambur-teak-heritage/zvlgbgvloztlt2o95cdl.png",
    description: "Daybeds and traditional Kerala living diwans with bolsters.",
    isPopular: true,
  },
  {
    name: "Wardrobes",
    slug: "wardrobes",
    href: "/products?category=wardrobes",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786799552/nilambur-teak-heritage/zhv9la4yzjsn37nioptl.png",
    description: "2, 3 & 4-door solid teak almirahs with master joinery and mirrors.",
  },
  {
    name: "Benches",
    slug: "benches",
    href: "/products?category=benches",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786799661/nilambur-teak-heritage/dwdlsjigbcojjbrjmabz.png",
    description: "Dining benches, entryway benches, and garden teak seating.",
  },
  {
    name: "Shoes Racks",
    slug: "shoes-racks",
    href: "/products?category=shoes-racks",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786799824/nilambur-teak-heritage/zbdiw67ycroo7s46eot9.png",
    description: "Ventilated solid teak shoe cabinets and seating shoe benches.",
  },
  {
    name: "Outdoor Furniture",
    slug: "outdoor-furniture",
    href: "/products?category=outdoor-furniture",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786799967/nilambur-teak-heritage/repycfxvhtnqtbfeyqca.png",
    description: "Weather-resistant Nilambur teak patio sets and poolside loungers.",
  },
  {
    name: "Bedside Table",
    slug: "bedside-table",
    href: "/products?category=bedside-table",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786800200/nilambur-teak-heritage/yraoz1qfztutgyqp332m.png",
    description: "Nightstands with soft-close drawers and brass handles.",
  },
  {
    name: "Carved Teak Doors",
    slug: "doors",
    href: "/products?category=doors",
    image: "/images/og-datas/IMG_0558.PNG",
    description: "Traditional Kerala main entrance doors, pooja room panels, and heavy teak frames with brass accents.",
    isPopular: true,
  },
  {
    name: "Other Furniture",
    slug: "other-furniture",
    href: "/products?category=other-furniture",
    image: "/images/og-datas/IMG_0600.PNG",
    description: "Bespoke handcrafted architectural woodwork, custom consoles, mandapams, and heritage artifacts.",
  },
];

export const ROOM_COLLECTIONS: RoomItem[] = [
  {
    name: "Living Room",
    slug: "living-room",
    href: "/products?category=living-room",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786797985/nilambur-teak-heritage/cwntirpydqajymirpm6z.png",
    description: "Architectural solid teak sofas, coffee tables, and TV consoles for grand living spaces.",
  },
  {
    name: "Dining Room",
    slug: "dining-room",
    href: "/products?category=dining-room",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798465/nilambur-teak-heritage/a3cpwb5mbpkuvb6flu46.png",
    description: "Heirloom 6, 8, & 10-seater single-plank teak dining sets and display cabinets.",
  },
  {
    name: "Bedroom",
    slug: "bedroom",
    href: "/products?category=bedroom",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798882/nilambur-teak-heritage/daspcmkzvbsmghfddlts.png",
    description: "Serene solid teak king cots, matching nightstands, and grand wardrobes.",
  },
  {
    name: "Sitout",
    slug: "sitout",
    href: "/products?category=sitout",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798650/nilambur-teak-heritage/yzz3bxthdocmux45596a.png",
    description: "Traditional Kerala veranda furniture, rocking chairs, and charupadi.",
  },
  {
    name: "Study & Office",
    slug: "study-office",
    href: "/products?category=study-and-office",
    image: "https://res.cloudinary.com/xwpjhogd/image/upload/v1786798773/nilambur-teak-heritage/rcaaxki3jaogj1kappm4.png",
    description: "Executive desks, library bookcases, and ergonomic leather study chairs.",
  },
];

export const ROOM_CATEGORIES = ROOM_COLLECTIONS;

export const FEATURED_SHOWCASE_CATEGORIES = [
  "Sofas",
  "Dining",
  "Beds",
  "Lounge Chairs",
  "Diwan Beds",
];
