-- Seed Master Categories for Nilambur Teak Heritage Admin & Frontend Sync

INSERT INTO categories (name, slug, description, image_url, sort_order, is_featured) 
VALUES 
  ('Sofas', 'sofas', 'Solid Nilambur teak 3-seater, L-shape, and classic living suites.', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop', 1, true),
  ('Chairs', 'chairs', 'Ergonomic dining chairs, armchairs, and carved wooden seating.', 'https://images.unsplash.com/photo-1580481077111-54f65c92842c?q=80&w=600&auto=format&fit=crop', 2, true),
  ('Tables', 'tables', 'Heavy solid teak console tables, side tables, and accent desks.', 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?q=80&w=600&auto=format&fit=crop', 3, false),
  ('Dining', 'dining', 'Heirloom 4, 6, 8 & 10-seater solid teak dining table sets.', 'https://images.unsplash.com/photo-1617806118233-18e1de247200?q=80&w=600&auto=format&fit=crop', 4, true),
  ('Lounge Chairs', 'lounge-chairs', 'Comfort-engineered recliner chairs and plantation easy chairs.', 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?q=80&w=600&auto=format&fit=crop', 5, true),
  ('Sitout', 'sitout', 'Traditional Kerala veranda benches, rocking chairs, and charupadi.', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?q=80&w=600&auto=format&fit=crop', 6, false),
  ('Study and Office', 'study-and-office', 'Executive solid teak writing desks, office tables, and library units.', 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?q=80&w=600&auto=format&fit=crop', 7, false),
  ('Beds', 'beds', 'King & Queen size solid teak cots with hydraulic & box storage.', 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop', 8, true),
  ('TV Units', 'tv-units', 'Contemporary & classical teak media consoles and wall entertainment centers.', 'https://images.unsplash.com/photo-1595428774223-ef52624120d2?q=80&w=600&auto=format&fit=crop', 9, false),
  ('Coffee Tables', 'coffee-tables', 'Center tables with brass inlay, glass tops, and carved teak legs.', 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=600&auto=format&fit=crop', 10, false),
  ('Cabinet', 'cabinet', 'Crockery units, display vitrines, and storage sideboards.', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop', 11, false),
  ('Bookshelves', 'bookshelves', 'Tall wooden book racks, library display cases, and open cubbies.', 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600&auto=format&fit=crop', 12, false),
  ('Diwan Beds', 'diwan-beds', 'Daybeds and traditional Kerala living diwans with bolsters.', 'https://images.unsplash.com/photo-1540518614846-7ede433c4550?q=80&w=600&auto=format&fit=crop', 13, false),
  ('Wardrobes', 'wardrobes', '2, 3 & 4-door solid teak almirahs with master joinery and mirrors.', 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=600&auto=format&fit=crop', 14, false),
  ('Benches', 'benches', 'Dining benches, entryway benches, and garden teak seating.', 'https://images.unsplash.com/photo-1503602642458-232111445657?q=80&w=600&auto=format&fit=crop', 15, false),
  ('Shoes Racks', 'shoes-racks', 'Ventilated solid teak shoe cabinets and seating shoe benches.', 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?q=80&w=600&auto=format&fit=crop', 16, false),
  ('Outdoor Furniture', 'outdoor-furniture', 'Weather-resistant Nilambur teak patio sets and poolside loungers.', 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=600&auto=format&fit=crop', 17, false),
  ('Bedside Table', 'bedside-table', 'Nightstands with soft-close drawers and brass handles.', 'https://images.unsplash.com/photo-1532372320572-cda25653a26d?q=80&w=600&auto=format&fit=crop', 18, false),
  ('Wall Decors', 'wall-decors', 'Carved teak wood wall panels, mirror frames, and jali art.', 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=600&auto=format&fit=crop', 19, false)
ON CONFLICT (slug) 
DO UPDATE SET 
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  is_featured = EXCLUDED.is_featured,
  image_url = EXCLUDED.image_url;
