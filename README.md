# Mohit Sharma — AI Engineer Portfolio

A production-ready, light-themed personal portfolio website for an **AI Engineer**, built with **React**, **TypeScript**, **Tailwind CSS**, and **Vite**.

Positioned for technical decision-makers (startup founders, CTOs, engineering managers, and technical recruiters) with deep evidence-based project case studies, systems architecture diagrams, verified production metrics, and zero fabricated claims.

---

## 🌟 Key Highlights & Verified Credentials

- **Primary Specialization**: Real-time Computer Vision, Low-Latency AI Pipelines (<120ms SLA), and Agentic LLM Systems.
- **Production Metric**: Scaled clinical dermatology inference backend to **5,000+ daily images** with **sub-120ms latency**.
- **Intellectual Property**: Registered Software Copyright with Government of India (**SW-19841/2024**) for edge-based Driver Drowsiness Detection System on Raspberry Pi.
- **Microscopic Segmentation**: Mask R-CNN & YOLOv11-seg achieving **0.84 mAP** and **0.78 IoU** optimized with TensorRT FP16 quantization.
- **Grounded RAG System**: Ultra-Doc-Intelligence logistics extraction with ChromaDB document isolation and a **0.35 runtime hallucination cutoff gate**.
- **Privacy First**: Sensitive private details (personal phone number, residential address, postal PIN codes) are deliberately excluded from public presentation.

---

## 🛠️ Technology Stack

- **Framework**: [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/) with user root base path resolution (`base: '/'`) tailored for GitHub Pages User Site
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with modern light design tokens (off-white `#f8fafc`, slate `#0f172a`, and clean electric blue accents `#2563eb`)
- **Icons**: [Lucide React](https://lucide.dev/) + custom vector SVGs
- **Animations**: [Framer Motion](https://www.framer.com/motion/) with reduced motion support
- **Deployment Target**: 100% Free on **GitHub Pages** (via automated GitHub Actions) with custom domain at `https://mohitsharma.is-a.dev/`

---

## 🔍 SEO, Metadata & Discoverability Architecture

The repository incorporates modern SEO standards, structured data, and search crawler fallbacks:

### 1. Canonical URLs & Meta Configuration
- **Deployed Site Root**: `https://mohitsharma.is-a.dev/`
- **Canonical Tag**: `<link rel="canonical" href="https://mohitsharma.is-a.dev/" />`
- **Primary Keywords**: Naturally integrated without keyword stuffing for queries such as:
  - *Mohit Sharma AI Engineer*
  - *Machine Learning Engineer*
  - *Computer Vision Engineer*
  - *PyTorch, TensorRT, FastAPI, OpenCV, Edge AI, ChromaDB, RAG*
- **Page Titles**: Dynamic document title updater (`PageMetadataUpdater` in `src/App.tsx`) updates `<title>` on route navigation.

### 2. Social Media Preview Cards (Open Graph & Twitter Cards)
- **Image URL**: `https://mohitsharma.is-a.dev/og-image.png`
- **Resolution**: 1200 × 630 pixels (standard high-contrast PNG format compatible with LinkedIn, Twitter/X, Discord, Slack, and Facebook).
- **Twitter Card**: `summary_large_image`.

### 3. Search Engine Crawlers & Sitemaps
- **Robots.txt** (`public/robots.txt`):
  ```
  User-agent: *
  Allow: /
  Sitemap: https://mohitsharma.is-a.dev/sitemap.xml
  ```
- **Sitemap XML** (`public/sitemap.xml`):
  - Compliant with `sitemaps.org` schema.
  - Points to the canonical URL `https://mohitsharma.is-a.dev/`.
  - Excludes `#` hash fragments (as per Google Search Central specifications, URL fragments are client-side only and not permitted in XML sitemaps).

### 4. Structured Data (Schema.org JSON-LD)
Structured semantic `@graph` is embedded in `index.html` featuring:
- **`WebSite`**: Canonical URL, site name, and description.
- **`ProfilePage`**: Linked to person entity and primary image object.
- **`Person`**: Verified credentials:
  - Name: Mohit Sharma
  - Job Title: AI Engineer
  - Organization: Sodio Technologies
  - Alma Mater: Rajiv Gandhi Proudyogiki Vishwavidyalaya (RGPV)
  - Credential: Government of India Registered Software Copyright SW-19841/2024
  - SameAs: LinkedIn (`https://www.linkedin.com/in/mohitsharmas-`) and GitHub (`https://github.com/mohitsharma1214`).

### 5. Crawlable Initial HTML (SSR-Equivalent Fallback)
For search engine bots, Lynx, or assistive technologies that parse raw HTML before executing client-side JavaScript, `index.html` includes a structured semantic HTML hierarchy inside `<div id="root">` containing:
- Single primary `<h1>` heading.
- Verified telemetry overview and professional summary.
- Links to major projects and navigation landmarks.
- `<noscript>` banner explaining that JavaScript provides the interactive application.
When React boots, `createRoot` seamlessly replaces this initial DOM tree.

### 6. GitHub Pages Client-Side Routing Architecture & Fallback
- **Router**: Clean HTML5 history routing (`BrowserRouter`) with SSG route generation and `404.html` redirect fallback for deep links.
- **Direct Link Redirector** (`public/404.html`): If an external user enters a clean path URL without a hash (e.g. `https://mohitsharma.is-a.dev/projects`), `404.html` detects the route and preserves the clean URL while preventing the 404 page itself from being indexed via `<meta name="robots" content="noindex, follow" />`.

---

## 📈 Google Search Console & Indexing Verification Steps

> [!NOTE]
> Search engine indexing cannot be automatically completed by build tools. As the website owner, you must complete domain ownership verification and submit your sitemap manually through Google Search Console.

Follow these steps once your GitHub Pages site is live:

1. **Open Google Search Console**:
   - Visit [search.google.com/search-console](https://search.google.com/search-console).
2. **Add Property**:
   - Choose **URL prefix** and enter `https://mohitsharma.is-a.dev/`.
3. **Verify Ownership**:
   - **Method A (HTML Tag)**: Copy the verification meta tag provided by Google (e.g. `<meta name="google-site-verification" content="..." />`) and add it to the `<head>` of `index.html`, commit, and push.
   - **Method B (GitHub Pages / Google Account)**: If using Google Analytics or domain DNS, select that option.
4. **Submit Sitemap**:
   - In the left sidebar of Google Search Console, click **Sitemaps**.
   - Under **Add a new sitemap**, type `sitemap.xml` (or full URL `https://mohitsharma.is-a.dev/sitemap.xml`) and click **Submit**.
5. **Request Indexing**:
   - Use the **URL Inspection** bar at the top and paste `https://mohitsharma.is-a.dev/`.
   - Click **Test Live URL**.
   - Once the live test passes, click **Request Indexing**.

---

## 📂 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions workflow for free GitHub Pages deployment
├── public/
│   ├── favicon.svg               # Custom monogram "MS" SVG favicon
│   ├── og-image.png              # 1200x630 Open Graph & Twitter preview card
│   ├── robots.txt                # Search engine crawlers index directive pointing to /sitemap.xml
│   ├── sitemap.xml               # Standard sitemap.xml pointing to canonical /
│   └── 404.html                  # Single Page App routing fallback preserving subpaths
├── src/
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky header with responsive drawer & navigation
│   │   ├── Footer.tsx            # Minimalist technical footer with aria-labels & dynamic year
│   │   ├── CaseStudyModal.tsx    # 10-part deep-dive case study modal
│   │   ├── ArticleModal.tsx      # In-depth technical reader modal with code snippets
│   │   ├── ArchitectureDiagram.tsx # SVG architecture diagrams for edge/model pipelines
│   │   ├── InteractivePipelineExplorer.tsx # Interactive visual model pipeline
│   │   └── SocialIcons.tsx       # Accessible GitHub & LinkedIn SVG icons
│   ├── pages/
│   │   ├── HomePage.tsx          # Hero, telemetry ticker, featured projects, and CTA
│   │   ├── AboutPage.tsx         # Verified biography, credentials & engineering philosophy
│   │   ├── ProjectsPage.tsx      # Filterable technical project case studies
│   │   ├── ExperiencePage.tsx    # Chronological employment timeline (Sodio, Hairscope, Centilytics)
│   │   ├── SkillsPage.tsx        # Categorized skills matrix (zero progress-bar gimmicks)
│   │   ├── WritingPage.tsx       # Engineering breakdowns & system architecture notes
│   │   └── ContactPage.tsx       # Direct mailto and 1-click clipboard copy
│   ├── data/
│   │   └── portfolioData.ts      # Primary source of truth for resume data, projects, & articles
│   ├── App.tsx                   # BrowserRouter orchestrator & PageMetadataUpdater
│   ├── index.css                 # Base Tailwind styles & dot grid pattern
│   └── main.tsx                  # React entry point
├── Mohit-Sharma-Resume-S-Links.pdf # Primary resume document source
├── index.html                    # SEO meta tags, OpenGraph, JSON-LD schema, fallback HTML
├── tailwind.config.js            # Custom design tokens & typography
├── tsconfig.json                 # Strict TypeScript configuration
└── vite.config.ts                # Build configuration with base: '/'
```

---

## 💻 Local Development

### 1. Prerequisites
- **Node.js**: v18.0.0 or higher (v20+ recommended)
- **npm**: v9.0.0 or higher

### 2. Install Dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173/](http://localhost:5173/) in your browser.

### 4. Build Production Bundle
```bash
npm run build
```
The compiled, optimized production bundle will be generated in the `dist/` folder.

### 5. Preview Production Build Locally
```bash
npm run preview
```

---

## 🚀 Deployment to GitHub Pages

This repository is preconfigured to deploy automatically via GitHub Actions:

1. Push your changes to the `main` branch of `https://github.com/Mohitsharma1214/mohitsharma1214.github.io`.
2. In your GitHub repository, ensure **Settings** → **Pages** → **Source** is set to **GitHub Actions**.
3. The workflow in `.github/workflows/deploy.yml` builds the site and publishes it to:
   ```
   https://mohitsharma.is-a.dev/
   ```

---

## 🔍 Verified Source Information

All data displayed across the portfolio is strictly drawn from:
1. `Mohit-Sharma-Resume-S-Links.pdf` (Current resume file).
2. Public GitHub repositories under `https://github.com/Mohitsharma1214`:
   - `Driver-Drowsiness-Detection-System`
   - `Hair-Strand-Detection`
   - `Ultra-Doc-Intelligence`
3. Verified Live Deployment: `https://ultra-doc-intelligence-orpin.vercel.app/`
