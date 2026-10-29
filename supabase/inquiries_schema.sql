-- ==============================================================================
-- SUPABASE DATABASE SCHEMA FOR MOHIT SHARMA'S INQUIRIES & AI AGENT LEADS
-- ==============================================================================
-- Run this in your Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zxovekhtcajtefedkkee/sql
-- ==============================================================================

-- 1. Create inquiries table
CREATE TABLE IF NOT EXISTS public.inquiries (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL DEFAULT 'Website Visitor',
    email TEXT NOT NULL,
    topic TEXT DEFAULT 'General Inquiry',
    message TEXT NOT NULL,
    source TEXT NOT NULL DEFAULT 'ai_agent', -- 'ai_agent' | 'contact_form'
    status TEXT NOT NULL DEFAULT 'unread',   -- 'unread' | 'read' | 'replied'
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.inquiries ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Anyone can insert inquiries (from portfolio contact form or AI agent)
DROP POLICY IF EXISTS "Anyone can insert inquiries" ON public.inquiries;
CREATE POLICY "Anyone can insert inquiries" 
ON public.inquiries 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- 4. Policy: Authenticated admin (Mohit) has full access to read, update status, and delete
DROP POLICY IF EXISTS "Authenticated users have full access to inquiries" ON public.inquiries;
CREATE POLICY "Authenticated users have full access to inquiries" 
ON public.inquiries 
FOR ALL 
TO authenticated 
USING (true) 
WITH CHECK (true);

-- 5. Fallback policy for anon read (optional fallback)
DROP POLICY IF EXISTS "Public read fallback" ON public.inquiries;
CREATE POLICY "Public read fallback" 
ON public.inquiries 
FOR SELECT 
TO anon 
USING (true);

-- Create index on created_at for fast descending queries
CREATE INDEX IF NOT EXISTS idx_inquiries_created_at ON public.inquiries(created_at DESC);
