import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { fetchPublishedBlogs, runSitemapRobot } from './sitemap-robot.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const distDir = path.resolve(__dirname, '../dist');

const staticRoutes = [
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
];

async function generateAllRoutes() {
  const baseHtmlPath = path.join(distDir, 'index.html');
  if (!fs.existsSync(baseHtmlPath)) {
    console.error('dist/index.html does not exist. Run vite build first.');
    process.exit(1);
  }

  const baseHtml = fs.readFileSync(baseHtmlPath, 'utf8');

  // Fetch blogs dynamically from Supabase
  const blogs = await fetchPublishedBlogs();

  const blogRoutes = blogs.map((blog) => {
    const rawDesc = blog.subtitle || blog.summary || 'Technical breakdown and production engineering analysis by Mohit Sharma.';
    // Clean description to avoid HTML/quotes breaking attributes
    const cleanDesc = rawDesc.replace(/["\n\r]/g, ' ').substring(0, 160).trim();
    const coverImage = blog.cover_image
      ? (blog.cover_image.startsWith('http') ? blog.cover_image : `https://mohitsharma1214.github.io${blog.cover_image}`)
      : `https://mohitsharma1214.github.io/Portfolio/assets/blogs/${blog.id}.png`;

    return {
      path: `blogs/${blog.id}`,
      title: `${blog.title} | Mohit Sharma`,
      description: cleanDesc,
      canonical: `https://mohitsharma1214.github.io/Portfolio/blogs/${blog.id}/`,
      image: coverImage,
    };
  });

  const allRoutes = [...staticRoutes, ...blogRoutes];

  console.log(`Generating static routes for ${allRoutes.length} pages (${blogRoutes.length} blog posts)...`);

  for (const route of allRoutes) {
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
  }

  console.log(`Successfully generated all ${allRoutes.length} clean static route pages.`);

  // Also synchronize sitemap and robots.txt in dist/ and public/
  await runSitemapRobot();
}

generateAllRoutes().catch((err) => {
  console.error('Error generating routes:', err);
  process.exit(1);
});
