import type { BlogMetadata } from './blogService';
import { BlogService } from './blogService';
import { TECHNICAL_ARTICLES } from '../data/portfolioData';

export interface RecommendedBlog extends BlogMetadata {
  matchScore: number;       // e.g. 96 (%)
  matchReason: string;      // AI explanation of why it was recommended
  affinityScore?: number;
}

// User reading history key in localStorage
const READING_HISTORY_KEY = 'mohit_user_reading_profile';

interface UserReadingProfile {
  readBlogIds: string[];
  categoryCounts: Record<string, number>;
  topicKeywords: Record<string, number>;
  lastVisited: string;
}

// Helper to retrieve user profile from localStorage
export function getUserReadingProfile(): UserReadingProfile {
  try {
    const raw = localStorage.getItem(READING_HISTORY_KEY);
    if (raw) {
      return JSON.parse(raw);
    }
  } catch (e) {
    console.warn('Could not read user profile from storage', e);
  }
  return {
    readBlogIds: [],
    categoryCounts: {},
    topicKeywords: {},
    lastVisited: new Date().toISOString(),
  };
}

// Helper to record a blog read event
export function recordBlogRead(blog: { id: string; category: string; title: string }) {
  try {
    const profile = getUserReadingProfile();
    if (!profile.readBlogIds.includes(blog.id)) {
      profile.readBlogIds.push(blog.id);
    }

    // Increment category count
    profile.categoryCounts[blog.category] = (profile.categoryCounts[blog.category] || 0) + 1;

    // Extract technical keywords from title
    const terms = blog.title.toLowerCase().match(/\b[a-z]{3,}\b/g) || [];
    terms.forEach((t) => {
      if (!['the', 'and', 'for', 'with', 'from', 'into', 'how'].includes(t)) {
        profile.topicKeywords[t] = (profile.topicKeywords[t] || 0) + 1;
      }
    });

    profile.lastVisited = new Date().toISOString();
    localStorage.setItem(READING_HISTORY_KEY, JSON.stringify(profile));
  } catch (e) {
    console.warn('Could not save user profile', e);
  }
}

// Core Technical Domain Keyword dictionary for AI semantic scoring
const DOMAIN_CLUSTERS: Record<string, string[]> = {
  'Computer Vision': ['vision', 'yolo', 'detection', 'segmentation', 'dlib', 'opencv', 'facial', 'landmarks', 'ear', 'images'],
  'Edge AI & Hardware': ['edge', 'raspberry', 'arm', 'hardware', 'telematics', 'offline', 'iot', 'embedded', 'tensorrt', 'fp16'],
  'Production & MLOps': ['latency', 'sla', 'optimization', 'cuda', 'onnx', 'docker', 'concurrency', 'p95', 'throughput', 'batching'],
  'LLM & Agents': ['llm', 'rag', 'agent', 'guardrails', 'pydantic', 'chromadb', 'embeddings', 'schema', 'hallucination', 'prompts'],
};

/**
 * AI-driven recommendation engine:
 * Evaluates candidate blogs against the current reading article and the user's personal reading history.
 */
export async function getAiBlogRecommendations(
  currentBlogId: string,
  limit: number = 3
): Promise<RecommendedBlog[]> {
  // 1. Fetch available blogs (from DB or fallback)
  const res = await BlogService.getPaginatedBlogs({ page: 1, pageSize: 30 });
  const allBlogs: BlogMetadata[] = res.blogs.length > 0 
    ? res.blogs 
    : TECHNICAL_ARTICLES.map((a) => ({
        id: a.id,
        title: a.title,
        subtitle: a.subtitle,
        category: a.category,
        readTime: a.readTime,
        status: a.status,
        coverImage: a.coverImage || `/assets/blogs/${a.id}.png`,
        publishDate: a.publishDate || 'Oct 2026',
        summary: a.summary,
      }));

  // Find current blog
  const currentBlog = allBlogs.find((b) => b.id === currentBlogId);
  const candidates = allBlogs.filter((b) => b.id !== currentBlogId);

  if (candidates.length === 0) return [];

  const userProfile = getUserReadingProfile();
  const currentText = `${currentBlog?.title || ''} ${currentBlog?.summary || ''} ${currentBlog?.category || ''}`.toLowerCase();

  // 2. Score each candidate
  const scored = candidates.map((candidate) => {
    let score = 50; // Base score
    const reasons: string[] = [];

    // Category Affinity
    if (currentBlog && candidate.category === currentBlog.category) {
      score += 26;
      reasons.push(`Direct continuation in ${candidate.category}`);
    }

    // User Reading Profile Affinity
    const userCategoryAffinity = userProfile.categoryCounts[candidate.category] || 0;
    if (userCategoryAffinity > 0) {
      score += Math.min(userCategoryAffinity * 5, 15);
      reasons.push(`Matches your interest in ${candidate.category}`);
    }

    // Technical Keyword Semantic Overlap
    const candidateText = `${candidate.title} ${candidate.summary} ${candidate.category}`.toLowerCase();
    
    // Check domain clusters
    let domainOverlapCount = 0;
    for (const [domain, keywords] of Object.entries(DOMAIN_CLUSTERS)) {
      const currentHas = keywords.some((kw) => currentText.includes(kw));
      const candidateHas = keywords.some((kw) => candidateText.includes(kw));
      if (currentHas && candidateHas) {
        score += 8;
        domainOverlapCount++;
        reasons.push(`Shares deep ${domain} architecture`);
      }
    }

    // Direct token overlap
    const tokensA = new Set(currentText.match(/\b[a-z]{4,}\b/g) || []);
    const tokensB = candidateText.match(/\b[a-z]{4,}\b/g) || [];
    let tokenMatches = 0;
    tokensB.forEach((t) => {
      if (tokensA.has(t)) tokenMatches++;
    });

    score += Math.min(tokenMatches * 2, 12);

    // Normalize match score to realistic AI percentage [85% - 99%]
    const finalMatchScore = Math.min(Math.max(Math.round(score), 86), 99);

    // Primary AI Recommendation Reason
    const matchReason = reasons.length > 0 
      ? reasons[0]
      : 'Architectural companion for production AI systems';

    return {
      ...candidate,
      matchScore: finalMatchScore,
      matchReason,
    };
  });

  // Sort descending by matchScore
  scored.sort((a, b) => b.matchScore - a.matchScore);

  return scored.slice(0, Math.min(limit, 4));
}
