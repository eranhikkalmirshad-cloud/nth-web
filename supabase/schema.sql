-- ============================================
-- NILAMBUR TEAK HERITAGE™ — DATABASE SCHEMA
-- ============================================

-- Enable pgcrypto for UUID generation
create extension if not exists pgcrypto;

-- 1. CATEGORIES
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  base_category text,
  slug text unique not null,
  description text,
  image_url text,
  sort_order int default 0,
  is_featured boolean default false,
  created_at timestamptz default now()
);

-- 2. PRODUCTS
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  description text,
  short_description text,
  category_id uuid references categories(id) on delete set null,
  images text[] default '{}',              -- Array of image URLs
  features text[] default '{}',            -- Array of feature strings
  specifications jsonb default '[]',       -- JSON array of {label, value}
  price text,
  delivery_time text,
  material text,
  badge text,
  room text,                               -- Room type: Living Room, Dining Room, Bedroom, Sitout, Office
  is_new boolean default false,
  is_bestseller boolean default false,
  type text,
  is_featured boolean default false,
  is_active boolean default true,
  is_private boolean default false,
  access_token text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3. TESTIMONIALS
create table if not exists testimonials (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  client_image text,
  client_role text,
  quote text not null,
  rating int default 5 check (rating >= 1 and rating <= 5),
  is_active boolean default true,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 4. HERO SLIDES
create table if not exists hero_slides (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  video_url text,
  mobile_image_url text,
  alt_text text,
  eyebrow text default 'Experience the Pinnacle of Comfort',
  heading text not null,
  description text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 5. PROCESS STEPS (How It Works)
create table if not exists process_steps (
  id uuid primary key default gen_random_uuid(),
  step_number text not null,
  label text not null,
  title text not null,
  description text,
  tag text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 6. HOMEPAGE SECTIONS (CMS)
create table if not exists homepage_sections (
  id uuid primary key default gen_random_uuid(),
  section_key text unique not null,
  title text,
  subtitle text,
  description text,
  image_url text,
  video_url text,
  mobile_image_url text,
  cta_text text,
  cta_url text,
  is_active boolean default true,
  updated_at timestamptz default now()
);

-- 7. INSTAGRAM CONTENT
create table if not exists instagram_posts (
  id uuid primary key default gen_random_uuid(),
  image_url text not null,
  caption text,
  post_url text,
  sort_order int default 0,
  is_active boolean default true,
  created_at timestamptz default now()
);

-- 8. INQUIRIES (LEAD GENERATION)
create table if not exists inquiries (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text,
  phone text,
  subject text,
  message text,
  interest_category text,
  product_id uuid references products(id) on delete set null,
  status text default 'new' check (status in ('new', 'contacted', 'resolved', 'archived')),
  created_at timestamptz default now()
);

-- 9. SITE VISITS (Analytics)
create table if not exists site_visits (
  id uuid primary key default gen_random_uuid(),
  path text,
  user_agent text,
  created_at timestamptz default now()
);

-- ============================================
-- RLS POLICIES (Row Level Security)
-- ============================================

-- Categories: Public Read, Auth Write
alter table categories enable row level security;
create policy "Allow public read-only access to categories" on categories for select using (true);
create policy "Allow auth admin full access to categories" on categories for all using (true);

-- Products: Public Read, Auth Write
alter table products enable row level security;
create policy "Allow public read-only access to products" on products for select using (is_active = true);
create policy "Allow auth admin full access to products" on products for all using (true);

-- Testimonials: Public Read, Auth Write
alter table testimonials enable row level security;
create policy "Allow public read-only access to testimonials" on testimonials for select using (is_active = true);
create policy "Allow auth admin full access to testimonials" on testimonials for all using (true);

-- Hero Slides: Public Read, Auth Write
alter table hero_slides enable row level security;
create policy "Allow public read-only access to hero_slides" on hero_slides for select using (is_active = true);
create policy "Allow auth admin full access to hero_slides" on hero_slides for all using (true);

-- Process Steps: Public Read, Auth Write
alter table process_steps enable row level security;
create policy "Allow public read-only access to process_steps" on process_steps for select using (true);
create policy "Allow auth admin full access to process_steps" on process_steps for all using (true);

-- Homepage Sections: Public Read, Auth Write
alter table homepage_sections enable row level security;
create policy "Allow public read-only access to homepage_sections" on homepage_sections for select using (is_active = true);
create policy "Allow auth admin full access to homepage_sections" on homepage_sections for all using (true);

-- Instagram Posts: Public Read, Auth Write
alter table instagram_posts enable row level security;
create policy "Allow public read-only access to instagram_posts" on instagram_posts for select using (is_active = true);
create policy "Allow auth admin full access to instagram_posts" on instagram_posts for all using (true);

-- Inquiries: Public Insert, Auth Read/Write
alter table inquiries enable row level security;
create policy "Allow anyone to insert inquiries" on inquiries for insert with check (true);
create policy "Allow auth admin full access to inquiries" on inquiries for all using (true);

-- Site Visits: Public Insert, Auth Read
alter table site_visits enable row level security;
create policy "Allow public to log visits" on site_visits for insert with check (true);
create policy "Allow auth admin full access to site_visits" on site_visits for all using (true);

-- ============================================
-- SEED DATA (INITIAL NILAMBUR TEAK CONTENT)
-- ============================================

-- Seed 1: Categories
insert into categories (name, slug, description, image_url, sort_order, is_featured) values
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
on conflict (slug) do nothing;

-- Seed 2: Hero Slide
insert into hero_slides (heading, eyebrow, description, image_url, video_url, mobile_image_url, sort_order, is_active) values
('Comfort, Refined', 'Experience the Pinnacle of Comfort', 'Discover premium handcrafted teak furniture crafted with care, character and timeless design.', '/video/hero-video-poster.jpg', '/video/hero-video.mp4', '/video/hero-video-poster.jpg', 0, true)
on conflict do nothing;
