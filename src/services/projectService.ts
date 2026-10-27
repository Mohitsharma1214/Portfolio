import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PROJECTS } from '../data/portfolioData';
import type { ProjectCaseStudy } from '../data/portfolioData';

// Helper to map DB row to ProjectCaseStudy
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbRowToProject(row: any): ProjectCaseStudy {
  return {
    id: row.id,
    title: row.title,
    subtitle: row.subtitle || '',
    category: row.category || 'Computer Vision & Edge',
    problemStatement: row.problem_statement || '',
    solution: row.solution || '',
    technologies: Array.isArray(row.technologies) ? row.technologies : [],
    metrics: Array.isArray(row.metrics) ? row.metrics : [],
    featured: Boolean(row.featured),
    repoUrl: row.repo_url || undefined,
    demoUrl: row.demo_url || undefined,
    docUrl: row.doc_url || undefined,
    isProprietary: Boolean(row.is_proprietary),
    coverImage: row.cover_image || undefined,
    sections: row.sections && typeof row.sections === 'object' ? row.sections : {
      overview: row.problem_statement || '',
      problem: row.problem_statement || '',
      myContribution: row.solution || '',
      architectureDescription: '',
      implementation: '',
      engineeringDecisions: [],
      challengesAndFailureModes: [],
      evaluation: [],
      lessonsLearned: [],
    },
    architectureDiagramSvg: row.architecture_diagram_svg || undefined,
  };
}

// Helper to map ProjectCaseStudy to DB row
function mapProjectToDbRow(p: ProjectCaseStudy) {
  return {
    id: p.id,
    title: p.title,
    subtitle: p.subtitle || '',
    category: p.category || 'Computer Vision & Edge',
    problem_statement: p.problemStatement || '',
    solution: p.solution || '',
    technologies: p.technologies || [],
    metrics: p.metrics || [],
    featured: Boolean(p.featured),
    repo_url: p.repoUrl || null,
    demo_url: p.demoUrl || null,
    doc_url: p.docUrl || null,
    is_proprietary: Boolean(p.isProprietary),
    cover_image: p.coverImage || null,
    sections: p.sections || {},
    architecture_diagram_svg: p.architectureDiagramSvg || null,
  };
}

export const ProjectService = {
  /**
   * Fetches all projects from Supabase.
   * If table does not exist or database is empty, falls back seamlessly to static PROJECTS.
   */
  async getAllProjects(): Promise<{ projects: ProjectCaseStudy[]; isFromDatabase: boolean; error?: string }> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('featured', { ascending: false })
          .order('created_at', { ascending: false });

        if (!error && data && data.length > 0) {
          const mapped = data.map(mapDbRowToProject);
          return { projects: mapped, isFromDatabase: true };
        }

        if (error) {
          console.warn('Supabase projects table query notice:', error.message);
        }
      } catch (err) {
        console.warn('Network / client error fetching projects from Supabase:', err);
      }
    }

    // Fallback to static PROJECTS
    return { projects: PROJECTS, isFromDatabase: false };
  },

  /**
   * Fetches a single project by ID / slug
   */
  async getProjectById(id: string): Promise<ProjectCaseStudy | null> {
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('id', id)
          .single();

        if (!error && data) {
          return mapDbRowToProject(data);
        }
      } catch {
        // Fallback to static array
      }
    }

    return PROJECTS.find((p) => p.id === id) || null;
  },

  /**
   * Admin: Creates or updates a project in Supabase
   */
  async upsertProject(project: ProjectCaseStudy): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase client is not configured.' };
    }

    try {
      const dbRow = mapProjectToDbRow(project);
      const { error } = await supabase
        .from('projects')
        .upsert(dbRow, { onConflict: 'id' });

      if (error) {
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error saving project',
      };
    }
  },

  /**
   * Admin: Deletes a project by ID
   */
  async deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase client is not configured.' };
    }

    try {
      const { error } = await supabase.from('projects').delete().eq('id', id);
      if (error) {
        return { success: false, error: error.message };
      }
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Unknown error deleting project',
      };
    }
  },

  /**
   * Admin: 1-Click Migrates / Seeds all existing static PROJECTS into Supabase
   */
  async seedProjectsFromStatic(): Promise<{ success: boolean; seededCount: number; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, seededCount: 0, error: 'Supabase client is not configured.' };
    }

    try {
      const rows = PROJECTS.map(mapProjectToDbRow);
      const { error } = await supabase
        .from('projects')
        .upsert(rows, { onConflict: 'id' });

      if (error) {
        return { success: false, seededCount: 0, error: error.message };
      }

      return { success: true, seededCount: rows.length };
    } catch (err: unknown) {
      return {
        success: false,
        seededCount: 0,
        error: err instanceof Error ? err.message : 'Unknown error seeding projects',
      };
    }
  },

  /**
   * Admin: Uploads a project screenshot to Supabase Storage bucket
   */
  async uploadScreenshot(file: File): Promise<{ success: boolean; url?: string; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase client is not configured.' };
    }

    try {
      const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
      const cleanName = file.name
        .substring(0, file.name.lastIndexOf('.'))
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '-');
      const timestamp = Date.now();
      const filePath = `projects/${timestamp}-${cleanName}.${ext}`;

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
