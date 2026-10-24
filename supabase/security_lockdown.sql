-- ==============================================================================
-- DATABASE-LEVEL SECURITY LOCKDOWN: RESTRICT BLOG WRITES EXCLUSIVELY TO OWNER
-- ==============================================================================
-- Run this script in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zxovekhtcajtefedkkee/sql/new
--
-- This guarantees that even if an attacker signs up or obtains a token,
-- PostgreSQL itself verifies the cryptographic JWT email before allowing any write!
-- ==============================================================================

-- 1. Drop existing permissive policies
DROP POLICY IF EXISTS "Authenticated users have full write access" ON public.blogs;
DROP POLICY IF EXISTS "Only Mohit Sharma can insert blogs" ON public.blogs;
DROP POLICY IF EXISTS "Only Mohit Sharma can update blogs" ON public.blogs;
DROP POLICY IF EXISTS "Only Mohit Sharma can delete blogs" ON public.blogs;

-- 2. Cryptographic Email Lock on INSERT
CREATE POLICY "Only Mohit Sharma can insert blogs" 
ON public.blogs FOR INSERT 
TO authenticated 
WITH CHECK (
    lower(auth.jwt() ->> 'email') = 'mohitxsharma09@gmail.com'
);

-- 3. Cryptographic Email Lock on UPDATE
CREATE POLICY "Only Mohit Sharma can update blogs" 
ON public.blogs FOR UPDATE 
TO authenticated 
USING (
    lower(auth.jwt() ->> 'email') = 'mohitxsharma09@gmail.com'
);

-- 4. Cryptographic Email Lock on DELETE
CREATE POLICY "Only Mohit Sharma can delete blogs" 
ON public.blogs FOR DELETE 
TO authenticated 
USING (
    lower(auth.jwt() ->> 'email') = 'mohitxsharma09@gmail.com'
);
