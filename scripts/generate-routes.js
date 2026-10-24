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
    path: 'blogs',
    title: 'Technical Blogs & Engineering Notes | Mohit Sharma • AI Engineer',
    description: 'Deep technical articles, latency benchmarks, quantization analyses, and architectural breakdowns derived directly from production AI and edge deployments.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/',
  },
  {
    path: 'writing',
    title: 'Technical Blogs & Engineering Notes | Mohit Sharma • AI Engineer',
    description: 'Deep technical articles, latency benchmarks, quantization analyses, and architectural breakdowns derived directly from production AI and edge deployments.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/',
  },
  {
    path: 'contact',
    title: 'Contact Mohit Sharma | AI Engineer • Computer Vision & LLM Systems',
    description: 'Direct contact information for AI Engineer Mohit Sharma. Available for engineering discussions, full-time AI roles, and consulting.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/contact/',
  },
  {
    path: 'admin',
    title: 'Blog Studio Admin | Mohit Sharma',
    description: 'Administrative portal for creating, editing, and publishing technical blog posts.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/admin/',
  },
  // Individual Blog Post Routes
  {
    path: 'blogs/edge-fatigue-tracking-sub-150ms',
    title: 'Designing Low-Latency Edge Vision: Real-Time Fatigue Tracking Under 150ms | Mohit Sharma',
    description: 'Technical breakdown of the Driver Drowsiness Detection System on Raspberry Pi (Govt. of India SW-19841/2024). Eye Aspect Ratio geometry vs temporal 3D CNNs.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/edge-fatigue-tracking-sub-150ms/',
    image: 'https://mohitsharma1214.github.io/Portfolio/assets/blogs/edge-fatigue-tracking-sub-150ms.png',
  },
  {
    path: 'blogs/scaling-medical-cv-tensorrt-5000-images',
    title: 'Scaling Medical Computer Vision to 5,000 Images/Day with TensorRT & FastAPI | Mohit Sharma',
    description: 'Production lessons learned at Hairscope serving deep learning dermatology inference at 5,000+ daily images with <120ms P95 latency and async semaphores.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/scaling-medical-cv-tensorrt-5000-images/',
    image: 'https://mohitsharma1214.github.io/Portfolio/assets/blogs/scaling-medical-cv-tensorrt-5000-images.png',
  },
  {
    path: 'blogs/strictly-grounded-rag-logistics',
    title: 'Strictly Grounded RAG: Eliminating Hallucinations in Logistics Document Extraction | Mohit Sharma',
    description: 'System design choices behind Ultra-Doc-Intelligence: document UUID metadata isolation, 40/60 hybrid confidence scoring, and 0.35 runtime cutoff gates.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/strictly-grounded-rag-logistics/',
    image: 'https://mohitsharma1214.github.io/Portfolio/assets/blogs/strictly-grounded-rag-logistics.png',
  },
  {
    path: 'blogs/microscopic-hair-segmentation-yolov11-maskrcnn',
    title: 'Instance Segmentation at Scale: YOLOv11-seg vs Mask R-CNN in Microscopic Trichology | Mohit Sharma',
    description: 'Engineering breakdown on segmenting overlapping microscopic hair strands under polarized dermatological imaging with 0.84 mAP and sub-120ms TensorRT FP16.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/microscopic-hair-segmentation-yolov11-maskrcnn/',
    image: 'https://mohitsharma1214.github.io/Portfolio/assets/blogs/microscopic-hair-segmentation-yolov11-maskrcnn.png',
  },
  {
    path: 'blogs/autonomous-qa-agent-orchestration',
    title: 'Building Autonomous Testing Agents: Stateful Multi-Turn Planning with Function Calling | Mohit Sharma',
    description: 'State-machine transition loops, DOM action tool-calling definitions, and exponential backoff preventing reasoning loops in autonomous QA agents.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/autonomous-qa-agent-orchestration/',
    image: 'https://mohitsharma1214.github.io/Portfolio/assets/blogs/autonomous-qa-agent-orchestration.png',
  },
  {
    path: 'blogs/realtime-recommendation-systems-two-stage',
    title: 'Low-Latency Recommendation Engines: Two-Stage Candidate Retrieval and Real-Time Ranking | Mohit Sharma',
    description: 'Two-stage candidate retrieval and ranking pipeline achieving sub-68ms P95 recommendations using PyTorch embeddings, ANN search, and diversity penalty.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/realtime-recommendation-systems-two-stage/',
    image: 'https://mohitsharma1214.github.io/Portfolio/assets/blogs/realtime-recommendation-systems-two-stage.png',
  },
  {
    path: 'blogs/onnx-fp16-vs-int8-quantization-benchmarks',
    title: 'Model Quantization in Practice: FP16 vs INT8 Calibration for Real-Time Edge Vision | Mohit Sharma',
    description: 'Empirical benchmarks comparing FP32, FP16, and INT8 execution on NVIDIA GPUs and ARM edge processors with 48% VRAM reduction.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/onnx-fp16-vs-int8-quantization-benchmarks/',
    image: 'https://mohitsharma1214.github.io/Portfolio/assets/blogs/onnx-fp16-vs-int8-quantization-benchmarks.png',
  },
  {
    path: 'blogs/structuring-unstructured-healthkit-telemetry',
    title: 'Ingesting Apple HealthKit Telemetry: Automated Schema Normalization & Anomaly Gates | Mohit Sharma',
    description: 'Transforming multi-gigabyte irregular Apple HealthKit XML exports into normalized 5-minute time-series buckets for downstream clinical AI pipelines.',
    canonical: 'https://mohitsharma1214.github.io/Portfolio/blogs/structuring-unstructured-healthkit-telemetry/',
    image: 'https://mohitsharma1214.github.io/Portfolio/assets/blogs/structuring-unstructured-healthkit-telemetry.png',
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

  // Replace OG / Twitter Image if specific image provided
  if (route.image) {
    routeHtml = routeHtml.replace(
      /<meta property="og:image" content=".*?" \/>/i,
      `<meta property="og:image" content="${route.image}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta property="og:image:secure_url" content=".*?" \/>/i,
      `<meta property="og:image:secure_url" content="${route.image}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta name="twitter:image" content=".*?" \/>/i,
      `<meta name="twitter:image" content="${route.image}" />`
    );
  }

  fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
  console.log(`Generated clean static route: dist/${route.path}/index.html`);
}

console.log('Successfully generated all clean static route pages for GitHub Pages.');
