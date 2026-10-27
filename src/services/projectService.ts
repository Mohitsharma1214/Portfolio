import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { PROJECTS } from '../data/portfolioData';
import type { ProjectCaseStudy } from '../data/portfolioData';

// Helper to sort projects by user-defined rank / displayOrder
export function sortProjectsByRank(projects: ProjectCaseStudy[]): ProjectCaseStudy[] {
  return [...projects].sort((a, b) => {
    const rankA = typeof a.displayOrder === 'number' ? a.displayOrder : 999;
    const rankB = typeof b.displayOrder === 'number' ? b.displayOrder : 999;
    if (rankA !== rankB) return rankA - rankB;
    if (a.featured !== b.featured) return a.featured ? -1 : 1;
    return a.title.localeCompare(b.title);
  });
}

// Helper to map DB row to ProjectCaseStudy
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mapDbRowToProject(row: any): ProjectCaseStudy {
  const displayOrder =
    typeof row.display_order === 'number'
      ? row.display_order
      : typeof row.sections?.displayOrder === 'number'
      ? row.sections.displayOrder
      : undefined;

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
    displayOrder,
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
    sections: {
      ...(p.sections || {}),
      displayOrder: typeof p.displayOrder === 'number' ? p.displayOrder : 999,
    },
    architecture_diagram_svg: p.architectureDiagramSvg || null,
  };
}

export const ProjectService = {
  /**
   * Fetches all projects from Supabase.
   * If table does not exist or database is empty, falls back seamlessly to static PROJECTS.
   * Always sorts by user-defined rank / displayOrder.
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

          // SMART MERGE: Check if any static projects from PROJECTS are not yet in Supabase.
          // This guarantees that creating or editing one project never causes the other default projects to vanish!
          let deletedIds: string[] = [];
          try {
            deletedIds = JSON.parse(localStorage.getItem('portfolio_deleted_project_ids') || '[]');
          } catch {
            deletedIds = [];
          }

          const dbIds = new Set(mapped.map((p) => p.id));
          const missingStatic = PROJECTS.filter(
            (p) => !dbIds.has(p.id) && !deletedIds.includes(p.id)
          );

          const combined = [...mapped, ...missingStatic];
          return {
            projects: sortProjectsByRank(combined),
            isFromDatabase: true,
          };
        }

        if (error) {
          console.warn('Supabase projects table query notice:', error.message);
        }
      } catch (err) {
        console.warn('Network / client error fetching projects from Supabase:', err);
      }
    }

    // Fallback to static PROJECTS sorted by rank
    return { projects: sortProjectsByRank(PROJECTS), isFromDatabase: false };
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
      // Record in local deletion blacklist so static fallback never resurrects it
      try {
        const deletedIds: string[] = JSON.parse(
          localStorage.getItem('portfolio_deleted_project_ids') || '[]'
        );
        if (!deletedIds.includes(id)) {
          deletedIds.push(id);
          localStorage.setItem('portfolio_deleted_project_ids', JSON.stringify(deletedIds));
        }
      } catch {
        // ignore storage errors
      }

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
   * Admin: 1-Click Migrates / Seeds missing static PROJECTS into Supabase without overwriting existing edits
   */
  async seedProjectsFromStatic(): Promise<{ success: boolean; seededCount: number; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, seededCount: 0, error: 'Supabase client is not configured.' };
    }

    try {
      // Fetch existing project IDs so we NEVER overwrite user edits or custom cover images
      const { data: existingRows, error: fetchError } = await supabase
        .from('projects')
        .select('id');

      if (fetchError) {
        return { success: false, seededCount: 0, error: fetchError.message };
      }

      const existingIds = new Set((existingRows || []).map((r: { id: string }) => r.id));
      const missingProjects = PROJECTS.filter((p) => !existingIds.has(p.id));

      if (missingProjects.length === 0) {
        return { success: true, seededCount: 0 };
      }

      const rows = missingProjects.map(mapProjectToDbRow);
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

  /**
   * Admin: Fast batch reorder of projects with automatic cloud persistence
   */
  async updateProjectsOrder(
    orderedList: { id: string; displayOrder: number }[]
  ): Promise<{ success: boolean; error?: string }> {
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase client is not configured.' };
    }

    try {
      for (const item of orderedList) {
        const { data } = await supabase
          .from('projects')
          .select('*')
          .eq('id', item.id)
          .single();

        if (data) {
          const currentSections = data.sections || {};
          await supabase
            .from('projects')
            .update({
              sections: {
                ...currentSections,
                displayOrder: item.displayOrder,
              },
            })
            .eq('id', item.id);
        } else {
          // If not yet in Supabase, seed from static with the new displayOrder
          const staticP = PROJECTS.find((p) => p.id === item.id);
          if (staticP) {
            await ProjectService.upsertProject({
              ...staticP,
              displayOrder: item.displayOrder,
            });
          }
        }
      }
      return { success: true };
    } catch (err: unknown) {
      return {
        success: false,
        error: err instanceof Error ? err.message : 'Failed to update order in Supabase',
      };
    }
  },
};
