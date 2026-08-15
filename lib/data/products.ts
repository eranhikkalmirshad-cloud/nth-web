// lib/data/products.ts
// Nilambur Teak Heritage™ Product Catalog

export interface Product {
  slug: string;
  name: string;
  category: string;
  type?: string;
  price: string;
  deliveryTime: string;
  short_description: string;
  description: string;
  features: string[];
  specifications: { label: string; value: string }[];
  images: string[];
  badge: string | null;
  room: string;
  material: string;
  isNew: boolean;
  isBestseller: boolean;
}

export const allProducts: Product[] = [
  // ── LIVING ROOM ──
  {
    slug: "royal-malabar-teak-sofa-set",
    name: "Royal Malabar Teak Sofa Set",
    category: "Living Room",
    type: "Teak Sofa Set",
    price: "₹2,45,000",
    deliveryTime: "4-6 weeks",
    short_description: "Handcrafted 3+1+1 solid Nilambur teak sofa set with brass detailing.",
    description:
      "Crafted from government-certified mature Nilambur teak wood. Hand-carved armrests and backrests paired with high-density premium fabric upholstery. Naturally resistant to termites and seasoned for lifetime durability.",
    images: [
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=1200&auto=format&fit=crop",
    ],
    badge: "Bestseller",
    material: "100% Nilambur Teak Wood",
    room: "Living Room",
    isNew: false,
    isBestseller: true,
    features: [
      "100% Solid Nilambur Teak Frame",
      "Traditional Mortise-and-Tenon Joinery",
      "Natural Wood Grain High-Lustre Finish",
      "High Density Upholstery Foam",
      "Lifetime Craftsmanship Warranty",
    ],
    specifications: [
      { label: "Configuration", value: "3 Seater + 2 Single Armchairs" },
      { label: "Wood Type", value: "A-Grade Nilambur Teak" },
      { label: "Finish", value: "Satin Lacquer / Natural Teak" },
      { label: "Cushioning", value: "High Resilience 40 Density" },
    ],
  },
  {
    slug: "nilambur-heritage-diwan-daybed",
    name: "Nilambur Heritage Diwan Daybed",
    category: "Living Room",
    type: "Diwan / Daybed",
    price: "₹1,15,000",
    deliveryTime: "3-5 weeks",
    short_description: "Classic Kerala royal diwan with turned teak wood legs and bolster cushions.",
    description:
      "A timeless piece of Kerala living heritage. Features turned solid teak posts, intricate border moldings, and a spacious daybed configuration suitable for royal living spaces.",
    images: [
      "https://images.unsplash.com/photo-1540574163026-643ea20ade25?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=1200&auto=format&fit=crop",
    ],
    badge: "Heritage Classic",
    material: "Nilambur Teak",
    room: "Living Room",
    isNew: true,
    isBestseller: false,
    features: [
      "Carved Floral Rail Motifs",
      "Turned Solid Teak Spindles",
      "Includes 2 Bolster & 2 Throw Pillows",
      "Eco-friendly Plant-based Polish",
    ],
    specifications: [
      { label: "Dimensions", value: "210 cm x 90 cm x 75 cm" },
      { label: "Weight", value: "68 kg" },
      { label: "Wood Grade", value: "Seasoned Heartwood Teak" },
    ],
  },
  {
    slug: "imperial-carved-teak-coffee-table",
    name: "Imperial Carved Teak Coffee Table",
    category: "Living Room",
    type: "Center Table",
    price: "₹48,000",
    deliveryTime: "2-4 weeks",
    short_description: "Solid teak center table with fluted edges and beveled glass inlay.",
    description:
      "A stunning centerpiece for your living room crafted from thick Nilambur teak logs. Showcases rich natural wood grain with brass corner reinforcements.",
    images: [
      "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?q=80&w=1200&auto=format&fit=crop",
    ],
    badge: null,
    material: "Nilambur Teak",
    room: "Living Room",
    isNew: false,
    isBestseller: false,
    features: [
      "Thick Solid Teak Slab Construction",
      "Toughened Beveled Glass Insert",
      "Lower Storage Shelf for Books & Artifacts",
    ],
    specifications: [
      { label: "Dimensions", value: "120 cm x 75 cm x 45 cm" },
      { label: "Finish", value: "Walnut Teak Polish" },
    ],
  },

  // ── DINING ROOM ──
  {
    slug: "imperial-nilambur-8-seater-dining-suite",
    name: "Imperial Nilambur 8-Seater Dining Suite",
    category: "Dining",
    type: "Dining Set",
    price: "₹3,20,000",
    deliveryTime: "4-8 weeks",
    short_description: "Massive solid teak plank dining table with 8 ergonomic high-back teak chairs.",
    description:
      "The pinnacle of heritage dining. Constructed from single-plank seasoned Nilambur teak slabs with traditional butterfly joint accents and 8 handcrafted royal dining chairs.",
    images: [
      "https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1200&auto=format&fit=crop",
    ],
    badge: "Masterpiece",
    material: "Solid Nilambur Teak",
    room: "Dining Room",
    isNew: false,
    isBestseller: true,
    features: [
      "Heavyweight 40mm Thick Solid Teak Top",
      "8 Handcrafted High-Back Chairs Included",
      "Natural Wood Grain Preservation Polish",
      "Lifetime Structural Stability Guarantee",
    ],
    specifications: [
      { label: "Table Dimensions", value: "245 cm x 105 cm x 78 cm" },
      { label: "Seating Capacity", value: "8 Persons" },
      { label: "Chair Height", value: "105 cm" },
      { label: "Total Set Weight", value: "185 kg" },
    ],
  },
  {
    slug: "monarch-6-seater-teak-dining-table",
    name: "Monarch 6-Seater Teak Dining Table",
    category: "Dining",
    type: "Dining Set",
    price: "₹2,10,000",
    deliveryTime: "4-6 weeks",
    short_description: "Elegant 6-seater dining ensemble with cushioned cane-back teak chairs.",
    description:
      "Harmonious blend of solid teak timber and natural cane weaving for a breathable, regal dining experience.",
    images: [
      "https://images.unsplash.com/photo-1577140917170-285929fb55b7?q=80&w=1200&auto=format&fit=crop",
    ],
    badge: "Popular",
    material: "Nilambur Teak & Natural Cane",
    room: "Dining Room",
    isNew: true,
    isBestseller: false,
    features: [
      "Natural Cane Weave Chair Backs",
      "Rounded Safety Edge Profiles",
      "Stain-resistant Protective Topcoat",
    ],
    specifications: [
      { label: "Table Dimensions", value: "180 cm x 90 cm x 76 cm" },
      { label: "Seating", value: "6 Persons" },
    ],
  },

  // ── BEDROOM ──
  {
    slug: "travancore-heritage-teak-cot",
    name: "Travancore Heritage Teak Cot",
    category: "Bedroom",
    type: "King Bed",
    price: "₹1,85,000",
    deliveryTime: "4-7 weeks",
    short_description: "King size solid teak bed with carved royal headboard and solid timber slats.",
    description:
      "Crafted for generations of restful slumber. Features hand-carved cresting on the headboard, heavy teak posts, and reinforced cross-beams supporting any mattress type.",
    images: [
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1540518614846-7ede433c4b49?q=80&w=1200&auto=format&fit=crop",
    ],
    badge: "Signature",
    material: "100% Nilambur Teak",
    room: "Bedroom",
    isNew: true,
    isBestseller: true,
    features: [
      "Solid Heavyweight Teak Construction",
      "Zero-Squeak Mortise Jointing",
      "Hydraulic or Manual Storage Option Available",
      "Termite and Borer Proof for Life",
    ],
    specifications: [
      { label: "Mattress Size", value: "78 x 72 inches (King Size)" },
      { label: "Headboard Height", value: "135 cm" },
      { label: "Footboard Height", value: "55 cm" },
    ],
  },
  {
    slug: "kerala-royal-4-door-teak-wardrobe",
    name: "Kerala Royal 4-Door Teak Wardrobe",
    category: "Bedroom",
    type: "Wardrobe",
    price: "₹2,60,000",
    deliveryTime: "5-8 weeks",
    short_description: "Grand 4-door seasoned teak almirah with antique brass hinges and internal drawers.",
    description:
      "Ample luxury storage engineered entirely from seasoned Nilambur teak wood panels. Features cedar-lined internal drawers, hanging rods, and hidden security vault.",
    images: [
      "https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=1200&auto=format&fit=crop",
    ],
    badge: null,
    material: "Solid Nilambur Teak",
    room: "Bedroom",
    isNew: false,
    isBestseller: false,
    features: [
      "Full Solid Teak Paneling",
      "Antique Cast Brass Lock Sets & Handles",
      "Customizable Internal Shelf Layout",
    ],
    specifications: [
      { label: "Dimensions", value: "210 cm x 180 cm x 60 cm" },
      { label: "Weight", value: "145 kg" },
    ],
  },

  // ── OFFICE ──
  {
    slug: "governor-executive-teak-desk",
    name: "Governor Executive Teak Desk",
    category: "Office",
    type: "Executive Desk",
    price: "₹1,45,000",
    deliveryTime: "3-6 weeks",
    short_description: "Stately executive work desk handcrafted from mature Nilambur teak wood.",
    description:
      "Designed for leaders and connoisseurs. Includes soft-close drawer slides, leather writing pad insert, wire management routing, and heavy pedestal cabinets.",
    images: [
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=1200&auto=format&fit=crop",
    ],
    badge: "Executive",
    material: "Nilambur Teak & Top-Grain Leather",
    room: "Office",
    isNew: false,
    isBestseller: true,
    features: [
      "Generous 6-Foot Desktop Workspace",
      "Lockable Central and Pedestal Drawers",
      "Integrated Concealed Cable Tray",
    ],
    specifications: [
      { label: "Dimensions", value: "180 cm x 90 cm x 76 cm" },
      { label: "Wood Thickness", value: "35 mm Top Slab" },
    ],
  },

  // ── DOORS & WINDOWS ──
  {
    slug: "aalayam-heritage-carved-main-door",
    name: "Aalayam Heritage Carved Main Door",
    category: "Doors",
    type: "Main Entrance Door",
    price: "₹1,75,000",
    deliveryTime: "4-8 weeks",
    short_description: "Traditional Kerala temple-inspired teak entrance door with antique brass work.",
    description:
      "A grand entrance statement for your luxury villa. Hand-carved with traditional auspicious motifs, heavy brass fittings, and heavy-duty Nilambur teak door frame.",
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop",
    ],
    badge: "Master Carving",
    material: "Seasoned Heartwood Nilambur Teak",
    room: "Architecture",
    isNew: true,
    isBestseller: true,
    features: [
      "45mm Solid Teak Door Shutter",
      "Antique Brass Bosses, Knockers & Tower Bolts",
      "Complete Matching Teak Frame Included",
      "Weather-Shield Exterior Polyurethane Coat",
    ],
    specifications: [
      { label: "Standard Size", value: "210 cm x 105 cm (Custom sizes available)" },
      { label: "Frame Thickness", value: "125 mm x 75 mm" },
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(
    (p) => p.category.toLowerCase() === category.toLowerCase() || p.room.toLowerCase() === category.toLowerCase()
  );
}
