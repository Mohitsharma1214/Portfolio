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
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/) with relative path resolution (`base: './'`) for seamless GitHub Pages hosting
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/) with custom design tokens (light-theme aesthetic, off-white background `#fafafb`, dark charcoal typography `#0f172a`, and electric blue accents `#026bc9`)
- **Icons**: [Lucide React](https://lucide.dev/) + custom vector SVGs
- **Deployment Target**: 100% Free on **GitHub Pages** (via GitHub Actions) or **Vercel** / **Cloudflare Pages**
- **Zero Paid Dependencies**: No backend server required, no external paid APIs, no databases, no paid fonts.

---

## 📂 Project Structure

```
├── .github/
│   └── workflows/
│       └── deploy.yml            # Automated GitHub Actions workflow for free GitHub Pages deployment
├── public/
│   ├── favicon.svg               # Custom monogram "MS" SVG favicon
│   ├── robots.txt                # Search engine crawlers index config
│   ├── sitemap.xml               # Standard XML sitemap
│   └── 404.html                  # Single Page App routing fallback for GitHub Pages
├── src/
│   ├── assets/                   # Static assets
│   ├── components/
│   │   ├── Navbar.tsx            # Sticky header with responsive drawer & "Explore My Work" CTA
│   │   ├── Hero.tsx              # High-impact value proposition & verified metrics strip
│   │   ├── AboutSection.tsx      # Verified biography, core engineering pillars & education
│   │   ├── ProjectsSection.tsx   # Filterable technical project cards with verified results
│   │   ├── CaseStudyModal.tsx    # 10-part deep-dive case study modal with hash deep-linking
│   │   ├── ArchitectureDiagram.tsx # Pixel-perfect SVG architecture diagrams for edge/model pipelines
│   │   ├── ExperienceSection.tsx # Chronological employment timeline (Sodio, Hairscope, Centilytics)
│   │   ├── SkillsSection.tsx     # Categorized skills matrix (zero meaningless percentage bars)
│   │   ├── TechnicalWritingSection.tsx # Engineering breakdowns & system architecture notes
│   │   ├── ArticleModal.tsx      # In-depth technical reader modal with code snippets
│   │   ├── ContactSection.tsx    # Direct mailto and 1-click clipboard copy with feedback
│   │   ├── SocialIcons.tsx       # Pixel-perfect GitHub & LinkedIn SVG icons
│   │   └── Footer.tsx            # Minimalist technical footer with dynamic year
│   ├── data/
│   │   └── portfolioData.ts      # Primary source of truth for resume data, projects, & writing
│   ├── App.tsx                   # Main application orchestrator & hash router
│   ├── index.css                 # Base Tailwind styles & technical dot grid
│   └── main.tsx                  # React entry point
├── Mohit-Sharma-Resume-S-Links.pdf # Primary resume document source
├── index.html                    # SEO meta tags, OpenGraph, JSON-LD schema, and font preconnects
├── tailwind.config.js            # Custom design tokens & typography
├── tsconfig.json                 # Strict TypeScript configuration
└── vite.config.ts                # Build configuration with base: './'
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

## 🚀 Free Deployment Guide

### Option 1: Automated GitHub Pages Deployment (Recommended & 100% Free)

This repository includes a preconfigured GitHub Actions workflow in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) that automatically builds and deploys your website every time you push to the `main` branch.

1. **Create a GitHub Repository**:
   - Go to [GitHub](https://github.com/new) and create a new repository (e.g. `Portfolio` or `mohitsharma1214.github.io`).

2. **Push your code to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete AI Engineer portfolio website"
   git branch -M main
   git remote add origin https://github.com/mohitsharma1214/Portfolio.git
   git push -u origin main
   ```

3. **Enable GitHub Pages via Actions**:
   - In your GitHub repository, go to **Settings** → **Pages** (under the "Code and automation" section).
   - Under **Build and deployment** → **Source**, select **GitHub Actions**.
   - That's it! GitHub will automatically trigger the workflow and publish your site at:
     ```
     https://mohitsharma1214.github.io/Portfolio/
     ```
     *(If the repo is named `mohitsharma1214.github.io`, it will be live directly at `https://mohitsharma1214.github.io/`).*

### Option 2: Deploy to Vercel (Free)

1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Select defaults (Vite framework preset).
4. Deploys in ~20 seconds to a free `*.vercel.app` domain.

---

## 🔍 Verified Source Information

All data displayed across the portfolio is strictly drawn from:
1. `Mohit-Sharma-Resume-S-Links.pdf` (Current resume file).
2. Public GitHub repositories under `https://github.com/Mohitsharma1214`:
   - `Driver-Drowsiness-Detection-System`
   - `Hair-Strand-Detection`
   - `Ultra-Doc-Intelligence`
3. Verified Live Deployment: `https://ultra-doc-intelligence-orpin.vercel.app/`

---

## 📝 Information You Can Supply to Further Enhance the Portfolio

If you would like to expand the portfolio further in the future:
1. **Public Demo for Driver Drowsiness**: Upload a short 10-second GIF or video recording of the Raspberry Pi test loop in action.
2. **Client Case Studies**: If any proprietary work at Sodio Technologies or Hairscope becomes public or open-source, add direct repository links in `src/data/portfolioData.ts`.
3. **Blog / Substack / Medium Links**: If you publish the technical breakdowns externally, you can add direct canonical publication URLs to `TECHNICAL_ARTICLES`.
