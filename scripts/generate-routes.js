import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const routes = [
  {
    path: 'about',
    title: 'About Mohit Sharma | AI Engineer & Systems Specialist',
    description: 'Verified background, engineering philosophy, and track record of AI Engineer Mohit Sharma specializing in low-latency computer vision and edge AI.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/about/',
  },
  {
    path: 'projects',
    title: 'Projects & Case Studies | Mohit Sharma • AI Engineer',
    description: 'Production computer vision pipelines, edge ARM deployments on Raspberry Pi, and grounded LLM architectures evaluated with strict SLAs.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/projects/',
  },
  {
    path: 'experience',
    title: 'Work Experience | Mohit Sharma • AI Developer at Sodio Technologies',
    description: 'Verified engineering experience delivering production computer vision backends at Hairscope, Sodio Technologies, and Centilytics.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/experience/',
  },
  {
    path: 'skills',
    title: 'Skills & Technology Stack | Mohit Sharma • AI Engineer',
    description: 'Production skills in PyTorch, TensorRT, CUDA, OpenCV, FastAPI, ChromaDB, Edge AI on Raspberry Pi, and MLOps deployment.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/skills/',
  },
  {
    path: 'writing',
    title: 'Technical Writing & Architecture Notes | Mohit Sharma',
    description: 'Technical breakdowns, latency tradeoffs, and failure mode analyses derived directly from production and edge AI implementations.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/writing/',
  },
  {
    path: 'contact',
    title: 'Contact Mohit Sharma | AI Engineer • Computer Vision & LLM Systems',
    description: 'Direct contact information for AI Engineer Mohit Sharma. Available for engineering discussions, full-time AI roles, and consulting.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/contact/',
  },
];

const baseHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(baseHtmlPath)) {
  console.error('dist/index.html does not exist. Run vite build first.');
  process.exit(1);
}

const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

for (const route of routes) {
  const routeDir = path.join(distDir, route.path);
  fs.mkdirSync(routeDir, { recursive: true });

  let routeHtml = baseHtml;

  // Replace Title
  routeHtml = routeHtml.replace(
    /<title>.*?<\/title>/i,
    `<title>${route.title}</title>`
  );
  routeHtml = routeHtml.replace(
    /<meta name="title" content=".*?" \/>/i,
    `<meta name="title" content="${route.title}" />`
  );

  // Replace Description
  routeHtml = routeHtml.replace(
    /<meta name="description" content=".*?" \/>/i,
    `<meta name="description" content="${route.description}" />`
  );

  // Replace Canonical URL
  routeHtml = routeHtml.replace(
    /<link rel="canonical" href=".*?" \/>/i,
    `<link rel="canonical" href="${route.canonical}" />`
  );

  // Replace OG / Twitter URL
  routeHtml = routeHtml.replace(
    /<meta property="og:url" content=".*?" \/>/i,
    `<meta property="og:url" content="${route.canonical}" />`
  );
  routeHtml = routeHtml.replace(
    /<meta name="twitter:url" content=".*?" \/>/i,
    `<meta name="twitter:url" content="${route.canonical}" />`
  );

  fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
  console.log(`Generated clean static route: dist/${route.path}/index.html`);
}

console.log('Successfully generated all clean static route pages for GitHub Pages.');
