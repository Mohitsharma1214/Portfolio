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
    canonical: 'https://mohitsharma1214.github.io/about/',
    breadcrumbName: 'About',
  },
  {
    path: 'projects',
    title: 'Projects & Case Studies | Mohit Sharma • AI Engineer',
    description: 'Production computer vision pipelines, edge ARM deployments on Raspberry Pi, and grounded LLM architectures evaluated with strict SLAs.',
    canonical: 'https://mohitsharma1214.github.io/projects/',
    breadcrumbName: 'Projects',
  },
  {
    path: 'experience',
    title: 'Work Experience | Mohit Sharma • AI Developer at Sodio Technologies',
    description: 'Verified engineering experience delivering production computer vision backends at Hairscope, Sodio Technologies, and Centilytics.',
    canonical: 'https://mohitsharma1214.github.io/experience/',
    breadcrumbName: 'Experience',
  },
  {
    path: 'skills',
    title: 'Skills & Technology Stack | Mohit Sharma • AI Engineer',
    description: 'Production skills in PyTorch, TensorRT, CUDA, OpenCV, FastAPI, ChromaDB, Edge AI on Raspberry Pi, and MLOps deployment.',
    canonical: 'https://mohitsharma1214.github.io/skills/',
    breadcrumbName: 'Skills',
  },
  {
    path: 'blogs',
    title: 'Technical Blogs & Engineering Notes | Mohit Sharma • AI Engineer',
    description: 'Deep technical articles, latency benchmarks, quantization analyses, and architectural breakdowns derived directly from production AI and edge deployments.',
    canonical: 'https://mohitsharma1214.github.io/blogs/',
    breadcrumbName: 'Blogs',
  },
  {
    path: 'writing',
    title: 'Technical Blogs & Engineering Notes | Mohit Sharma • AI Engineer',
    description: 'Deep technical articles, latency benchmarks, quantization analyses, and architectural breakdowns derived directly from production AI and edge deployments.',
    canonical: 'https://mohitsharma1214.github.io/blogs/',
    breadcrumbName: 'Writing',
  },
  {
    path: 'contact',
    title: 'Contact Mohit Sharma | AI Engineer • Computer Vision & LLM Systems',
    description: 'Direct contact information for AI Engineer Mohit Sharma. Available for engineering discussions, full-time AI roles, and consulting.',
    canonical: 'https://mohitsharma1214.github.io/contact/',
    breadcrumbName: 'Contact',
  },
  {
    path: 'admin',
    title: 'Blog Studio Admin | Mohit Sharma',
    description: 'Administrative portal for creating, editing, and publishing technical blog posts.',
    canonical: 'https://mohitsharma1214.github.io/admin/',
    breadcrumbName: 'Admin',
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
      : `https://mohitsharma1214.github.io/assets/blogs/${blog.id}.png`;

    return {
      path: `blogs/${blog.id}`,
      title: `${blog.title} | Mohit Sharma`,
      description: cleanDesc,
      canonical: `https://mohitsharma1214.github.io/blogs/${blog.id}/`,
      image: coverImage,
      type: 'article',
      blogData: blog,
    };
  });

  const allRoutes = [...staticRoutes, ...blogRoutes];

  console.log(`Generating static routes for ${allRoutes.length} pages (${blogRoutes.length} blog posts)...`);

  for (const route of allRoutes) {
    const routeDir = path.join(distDir, route.path);
    fs.mkdirSync(routeDir, { recursive: true });

    let routeHtml = baseHtml;

    // 1. Replace Title & Meta Title
    routeHtml = routeHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${route.title}</title>`
    );
    routeHtml = routeHtml.replace(
      /<meta name="title" content=".*?" \/>/i,
      `<meta name="title" content="${route.title}" />`
    );

    // 2. Replace Description
    routeHtml = routeHtml.replace(
      /<meta name="description" content=".*?" \/>/i,
      `<meta name="description" content="${route.description}" />`
    );

    // 3. Replace Canonical URL
    routeHtml = routeHtml.replace(
      /<link rel="canonical" href=".*?" \/>/i,
      `<link rel="canonical" href="${route.canonical}" />`
    );

    // 4. Replace OG & Twitter URLs
    routeHtml = routeHtml.replace(
      /<meta property="og:url" content=".*?" \/>/i,
      `<meta property="og:url" content="${route.canonical}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta name="twitter:url" content=".*?" \/>/i,
      `<meta name="twitter:url" content="${route.canonical}" />`
    );

    // 5. Replace OG & Twitter Title and Description
    routeHtml = routeHtml.replace(
      /<meta property="og:title" content=".*?" \/>/i,
      `<meta property="og:title" content="${route.title}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta property="og:description" content=".*?" \/>/i,
      `<meta property="og:description" content="${route.description}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta name="twitter:title" content=".*?" \/>/i,
      `<meta name="twitter:title" content="${route.title}" />`
    );
    routeHtml = routeHtml.replace(
      /<meta name="twitter:description" content=".*?" \/>/i,
      `<meta name="twitter:description" content="${route.description}" />`
    );

    // 6. Replace OG Type (article vs website)
    if (route.type === 'article') {
      routeHtml = routeHtml.replace(
        /<meta property="og:type" content=".*?" \/>/i,
        `<meta property="og:type" content="article" />`
      );
    }

    // 7. Replace OG / Twitter Image if specific image provided
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

    // 8. Inject Page-Specific Schema.org JSON-LD (Breadcrumbs + TechArticle)
    const extraSchemas = [];

    // BreadcrumbList Schema
    const breadcrumbItems = [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://mohitsharma1214.github.io/',
      },
    ];

    if (route.blogData) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: 'Blogs',
        item: 'https://mohitsharma1214.github.io/blogs/',
      });
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 3,
        name: route.blogData.title,
        item: route.canonical,
      });

      // TechArticle Rich Schema for Google
      const articleSchema = {
        '@context': 'https://schema.org',
        '@type': 'TechArticle',
        headline: route.blogData.title,
        description: route.description,
        image: route.image,
        datePublished: route.blogData.created_at || '2026-10-28T00:00:00Z',
        dateModified: route.blogData.updated_at || route.blogData.created_at || '2026-10-28T00:00:00Z',
        author: {
          '@type': 'Person',
          name: 'Mohit Sharma',
          url: 'https://mohitsharma1214.github.io/',
        },
        publisher: {
          '@type': 'Person',
          name: 'Mohit Sharma',
          url: 'https://mohitsharma1214.github.io/',
        },
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': route.canonical,
        },
      };
      extraSchemas.push(articleSchema);
    } else if (route.breadcrumbName) {
      breadcrumbItems.push({
        '@type': 'ListItem',
        position: 2,
        name: route.breadcrumbName,
        item: route.canonical,
      });
    }

    if (breadcrumbItems.length > 1) {
      extraSchemas.push({
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbItems,
      });
    }

    if (extraSchemas.length > 0) {
      const schemaScripts = extraSchemas
        .map((s) => `    <script type="application/ld+json">\n${JSON.stringify(s, null, 2)}\n    </script>`)
        .join('\n');
      routeHtml = routeHtml.replace('</head>', `${schemaScripts}\n  </head>`);
    }

    // 9. Semantic crawlable snapshot for web spiders inside <div id="root">
    const crawlableContent = `
    <div id="root">
      <main class="sr-only" style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border-width: 0;">
        <h1>${route.title}</h1>
        <p>${route.description}</p>
        ${route.blogData && route.blogData.summary ? `<p>${route.blogData.summary}</p>` : ''}
      </main>
    </div>`.trim();

    routeHtml = routeHtml.replace('<div id="root"></div>', crawlableContent);

    fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml, 'utf8');
  }

  console.log(`Successfully generated all ${allRoutes.length} clean static route pages with rich schemas and crawler fallbacks.`);

  // Ensure .nojekyll exists in dist/ to disable Jekyll on GitHub Pages
  fs.writeFileSync(path.join(distDir, '.nojekyll'), '', 'utf8');

  // Also synchronize sitemap and robots.txt in dist/ and public/
  await runSitemapRobot();
}

generateAllRoutes().catch((err) => {
  console.error('Error generating routes:', err);
  process.exit(1);
});
