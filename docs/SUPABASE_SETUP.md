# Dynamic Blog Database Setup Guide (Supabase + PostgreSQL)

This portfolio uses a decoupled, high-performance database architecture:
- **Zero Frontend Bundle Bloat**: When you have 100 or 1,000+ blogs, only lightweight metadata (titles, tags, read times) is queried for the current page (6 per page) via PostgreSQL limits and offsets.
- **On-Demand Content Fetching**: The heavy `content_markdown` is fetched *only* when a visitor clicks into a specific blog post.
- **Graceful Fallback**: If no database credentials are provided, the site gracefully operates with the verified in-memory fallback dataset so it never breaks.

---

## 3-Minute Quick Setup

### Step 1: Create a Free Supabase Project
1. Go to [https://supabase.com](https://supabase.com) and sign in (free tier covers 500MB database, 50,000 monthly active users).
2. Click **New Project**, name it (e.g. `portfolio-blogs`), and choose a strong database password.

---

### Step 2: Run the Schema & Seed SQL Scripts
1. In the Supabase Dashboard, click on **SQL Editor** in the left sidebar.
2. Click **New Query**, copy the contents of `supabase/schema.sql`, paste it, and click **Run**.
   - This creates the `blogs` table, indexes, and sets public read-only Row Level Security (RLS) policies.
3. Next, open another query tab, copy the contents of `supabase/seed.sql`, paste it, and click **Run**.
   - This seeds your database with all 8 verified AI engineering blogs!

---

### Step 3: Connect to Your Portfolio
1. In Supabase, go to **Project Settings** (gear icon) &rarr; **API**.
2. Copy:
   - **Project URL** (e.g. `https://xyzcompany.supabase.co`)
   - **anon / public key** (safe for client-side browsers)
3. Create a `.env` file in the root of your portfolio:
   ```env
   VITE_SUPABASE_URL=https://xyzcompany.supabase.co
   VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
   ```
4. For GitHub Pages production builds:
   - Go to your GitHub repository &rarr; **Settings** &rarr; **Secrets and variables** &rarr; **Actions**.
   - Add two Repository Secrets:
     - `VITE_SUPABASE_URL`
     - `VITE_SUPABASE_ANON_KEY`

---

## How to Add or Edit Blogs Anytime
You no longer need to edit code or push git commits to publish blogs!
1. Go to your **Supabase Dashboard** &rarr; **Table Editor** &rarr; `blogs`.
2. Click **Insert Row** (or edit an existing row).
3. Fill in:
   - `id`: unique URL slug (e.g., `distributed-rag-pipelines`)
   - `title`: heading of your blog
   - `subtitle`: quick summary line
   - `category`: e.g. `Computer Vision`, `LLM Systems`, `Edge AI`
   - `read_time`: e.g. `6 min read`
   - `publish_date`: e.g. `Nov 2026`
   - `summary`: 2-line preview for the card
   - `cover_image`: image URL or path
   - `content_markdown`: full markdown text with code snippets, formulas, etc.
   - `published`: `true`
4. As soon as you save, it will immediately appear live on your portfolio blogs page!
