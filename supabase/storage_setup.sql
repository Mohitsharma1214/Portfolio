-- ==============================================================================
-- SUPABASE STORAGE BUCKET CONFIGURATION FOR BLOG IMAGES
-- ==============================================================================
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zxovekhtcajtefedkkee/sql/new
--
-- This creates a public storage bucket named 'blog-images' and applies RLS
-- policies so images can be publicly viewed on your blog, while uploads are
-- restricted to your authenticated owner account.
-- ==============================================================================

-- 1. Create the 'blog-images' bucket if it doesn't already exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images',
  'blog-images',
  true,
  52428800, -- 50 MB max file size
  ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml']
)
ON CONFLICT (id) DO UPDATE SET
  public = true,
  file_size_limit = 52428800,
  allowed_mime_types = ARRAY['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'image/gif', 'image/svg+xml'];

-- 2. Drop any previous conflicting policies for blog-images
DROP POLICY IF EXISTS "Public Read Blog Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Owner Can Upload Blog Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Owner Can Update Blog Images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated Owner Can Delete Blog Images" ON storage.objects;

-- 3. Policy: Anyone can view / read blog images (needed for public blog readers)
CREATE POLICY "Public Read Blog Images"
ON storage.objects FOR SELECT
USING (bucket_id = 'blog-images');

-- 4. Policy: Authenticated admin (you) can upload new images
CREATE POLICY "Authenticated Owner Can Upload Blog Images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'blog-images'
  AND (auth.jwt() ->> 'email') = 'mohitxsharma09@gmail.com'
);

-- 5. Policy: Authenticated admin (you) can update images
CREATE POLICY "Authenticated Owner Can Update Blog Images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'blog-images'
  AND (auth.jwt() ->> 'email') = 'mohitxsharma09@gmail.com'
);

-- 6. Policy: Authenticated admin (you) can delete images
CREATE POLICY "Authenticated Owner Can Delete Blog Images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'blog-images'
  AND (auth.jwt() ->> 'email') = 'mohitxsharma09@gmail.com'
);
