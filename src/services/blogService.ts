import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { TECHNICAL_ARTICLES } from '../data/portfolioData';

export interface BlogMetadata {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  readTime: string;
  status: string;
  coverImage: string;
  publishDate: string;
  summary: string;
  createdAt?: string;
}

export interface BlogFull extends BlogMetadata {
  contentMarkdown: string;
}

export interface GetBlogsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  searchQuery?: string;
}

export interface GetBlogsResponse {
  blogs: BlogMetadata[];
  totalCount: number;
  totalPages: number;
  currentPage: number;
  pageSize: number;
  isFromDatabase: boolean;
}

// Convert snake_case database row to camelCase TypeScript model
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbRowToMetadata(row: any): BlogMetadata {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle || '',
    category: row.category || 'General',
    readTime: row.read_time || '5 min read',
    status: row.status || 'Published',
    coverImage: row.cover_image || `/Portfolio/assets/blogs/${row.id}.png`,
    publishDate: row.publish_date || 'Oct 2026',
    summary: row.summary || '',
    createdAt: row.created_at,
  };
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbRowToFull(row: any): BlogFull {
  return {
    ...mapDbRowToMetadata(row),
    contentMarkdown: row.content_markdown || '',
  };
}

export const BlogService = {
  /**
   * Fetches lightweight paginated blog metadata.
   * Does NOT transfer the heavy content_markdown over the wire,
   * keeping network payloads tiny even with 10,000+ blogs.
   */
  async getPaginatedBlogs({
    page = 1,
    pageSize = 6,
    category = 'All',
    searchQuery = '',
  }: GetBlogsParams = {}): Promise<GetBlogsResponse> {
    const currentPage = Math.max(1, page);
    const from = (currentPage - 1) * pageSize;
    const to = from + pageSize - 1;

    // 1. Try fetching from Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        let query = supabase
          .from('blogs')
          .select(
            'id, title, subtitle, category, read_time, status, cover_image, publish_date, summary, created_at',
            { count: 'exact' }
          )
          .eq('published', true);

        if (category && category !== 'All') {
          query = query.eq('category', category);
        }

        if (searchQuery.trim()) {
          const cleanQuery = searchQuery.trim();
          query = query.or(
            `title.ilike.%${cleanQuery}%,summary.ilike.%${cleanQuery}%,subtitle.ilike.%${cleanQuery}%`
          );
        }

        query = query.order('created_at', { ascending: false }).range(from, to);

        const { data, count, error } = await query;

        if (!error && data) {
          const totalCount = count || 0;
          const totalPages = Math.ceil(totalCount / pageSize) || 1;
          return {
            blogs: data.map(mapDbRowToMetadata),
            totalCount,
            totalPages,
            currentPage,
            pageSize,
            isFromDatabase: true,
          };
        }
        console.warn('Supabase query failed, falling back to local dataset:', error?.message);
      } catch (err) {
        console.warn('Network or Supabase error, falling back to local dataset:', err);
      }
    }

    // 2. Graceful In-Memory Fallback: filters and paginates TECHNICAL_ARTICLES
    let filtered = TECHNICAL_ARTICLES;

    if (category && category !== 'All') {
      filtered = filtered.filter((b) => b.category === category);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.title.toLowerCase().includes(q) ||
          b.subtitle.toLowerCase().includes(q) ||
          b.summary.toLowerCase().includes(q) ||
          b.category.toLowerCase().includes(q)
      );
    }

    const totalCount = filtered.length;
    const totalPages = Math.ceil(totalCount / pageSize) || 1;
    const paged = filtered.slice(from, to + 1).map((a) => ({
      id: a.id,
      title: a.title,
      subtitle: a.subtitle,
      category: a.category,
      readTime: a.readTime,
      status: a.status,
      coverImage: a.coverImage || `/Portfolio/assets/blogs/${a.id}.png`,
      publishDate: a.publishDate || 'Oct 2026',
      summary: a.summary,
    }));

    return {
      blogs: paged,
      totalCount,
      totalPages,
      currentPage,
      pageSize,
      isFromDatabase: false,
    };
  },

  /**
   * Fetches a single blog post on-demand including the full markdown content.
   */
  async getBlogById(id: string): Promise<BlogFull | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .eq('id', id)
          .eq('published', true)
          .single();

        if (!error && data) {
          return mapDbRowToFull(data);
        }
      } catch (err) {
        console.warn('Error fetching blog from Supabase:', err);
      }
    }

    // Fallback search
    const local = TECHNICAL_ARTICLES.find((a) => a.id === id);
    if (!local) return null;

    return {
      id: local.id,
      title: local.title,
      subtitle: local.subtitle,
      category: local.category,
      readTime: local.readTime,
      status: local.status,
      coverImage: local.coverImage || `/Portfolio/assets/blogs/${local.id}.png`,
      publishDate: local.publishDate || 'Oct 2026',
      summary: local.summary,
      contentMarkdown: local.contentMarkdown,
    };
  },

  /**
   * Fetches unique categories available across blogs.
   */
  async getCategories(): Promise<string[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('category')
          .eq('published', true);

        if (!error && data && data.length > 0) {
          const uniqueCats = Array.from(new Set(data.map((r) => r.category).filter(Boolean)));
          return ['All', ...uniqueCats];
        }
      } catch (err) {
        console.warn('Error fetching categories from Supabase:', err);
      }
    }

    const uniqueCats = Array.from(new Set(TECHNICAL_ARTICLES.map((a) => a.category)));
    return ['All', ...uniqueCats];
  },

  /**
   * Admin: Fetches all blogs (including unpublished drafts)
   */
  async getAllBlogsForAdmin(): Promise<BlogMetadata[]> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('id, title, subtitle, category, read_time, status, cover_image, publish_date, summary, created_at, published')
          .order('created_at', { ascending: false });

        if (!error && data) {
          return data.map((r) => ({
            ...mapDbRowToMetadata(r),
            published: r.published ?? true,
          }));
        }
      } catch (err) {
        console.warn('Error fetching admin blogs:', err);
      }
    }

    return TECHNICAL_ARTICLES.map((a) => ({
      id: a.id,
      title: a.title,
      subtitle: a.subtitle,
      category: a.category,
      readTime: a.readTime,
      status: a.status,
      coverImage: a.coverImage || `/Portfolio/assets/blogs/${a.id}.png`,
      publishDate: a.publishDate || 'Oct 2026',
      summary: a.summary,
    }));
  },

  /**
   * Admin: Creates or updates a blog post in Supabase using UPSERT.
   * If an article with the same unique id/slug already exists, it updates it
   * instead of throwing duplicate key error.
   */
  async createBlog(
    blog: BlogFull & { published?: boolean }
  ): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase client is not configured.' };
    }

    try {
      const dbRow = {
        id: blog.id,
        title: blog.title,
        subtitle: blog.subtitle || '',
        category: blog.category || 'Engineering',
        read_time: blog.readTime || '5 min read',
        status: blog.status || 'Published Breakdown',
        cover_image: blog.coverImage || null,
        publish_date: blog.publishDate || 'Oct 2026',
        summary: blog.summary || '',
        content_markdown: blog.contentMarkdown || '',
        published: blog.published ?? true,
      };

      const { error } = await supabase
        .from('blogs')
        .upsert(dbRow, { onConflict: 'id' });

      if (error) {
        if (
          error.code === '23505' ||
          error.message.toLowerCase().includes('duplicate key') ||
          error.message.toLowerCase().includes('unique constraint')
        ) {
          return {
            success: false,
            error: `An article with the slug URL "/blogs/${blog.id}" already exists. Please choose a different URL slug or edit the existing article.`,
          };
        }
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown database error',
      };
    }
  },

  /**
   * Admin: Updates an existing blog post in Supabase
   */
  async updateBlog(
    id: string,
    updates: Partial<BlogFull> & { published?: boolean }
  ): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase client is not configured.' };
    }

    try {
      const dbRow: Record<string, unknown> = {};
      if (updates.title !== undefined) dbRow.title = updates.title;
      if (updates.subtitle !== undefined) dbRow.subtitle = updates.subtitle;
      if (updates.category !== undefined) dbRow.category = updates.category;
      if (updates.readTime !== undefined) dbRow.read_time = updates.readTime;
      if (updates.status !== undefined) dbRow.status = updates.status;
      if (updates.coverImage !== undefined) dbRow.cover_image = updates.coverImage;
      if (updates.publishDate !== undefined) dbRow.publish_date = updates.publishDate;
      if (updates.summary !== undefined) dbRow.summary = updates.summary;
      if (updates.contentMarkdown !== undefined) dbRow.content_markdown = updates.contentMarkdown;
      if (updates.published !== undefined) dbRow.published = updates.published;

      const { error } = await supabase.from('blogs').update(dbRow).eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown database error',
      };
    }
  },

  /**
   * Admin: Deletes a blog post from Supabase
   */
  async deleteBlog(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase client is not configured.' };
    }

    try {
      const { error } = await supabase.from('blogs').delete().eq('id', id);

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown database error',
      };
    }
  },

  /**
   * Admin: Uploads an image to Supabase Storage bucket 'blog-images'
   * and returns the public CDN URL.
   */
  async uploadImage(
    file: File,
    folder: string = 'covers'
  ): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase client is not configured.' };
    }

    try {
      // Clean and sanitize file name
      const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
      const cleanName = file.name
        .substring(0, file.name.lastIndexOf('.'))
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-');
      const timestamp = Date.now();
      const filePath = `${folder}/${timestamp}-${cleanName}.${ext}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        });

      if (error) {
        return { success: false, error: error.message };
      }

      const { data: publicUrlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(data.path);

      return {
        success: true,
        url: publicUrlData.publicUrl,
      };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown storage error',
      };
    }
  },
};

