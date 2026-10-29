import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { TECHNICAL_ARTICLES } from '../data/portfolioData';

export class CategoryService {
  /**
   * Fetches all categories directly from the database.
   * Pulls from:
   * 1. `blog_categories` table (if created via SQL)
   * 2. `site_settings` table (key: 'blog_categories')
   * 3. Distinct categories used across `blogs` in Supabase
   * Combines all database sources with NO hardcoded frontend presets.
   */
  static async getCategories(): Promise<string[]> {
    const categorySet = new Set<string>();

    if (isSupabaseConfigured && supabase) {
      // 1. Try fetching from blog_categories table
      try {
        const { data, error } = await supabase
          .from('blog_categories')
          .select('name')
          .order('name', { ascending: true });

        if (!error && data && data.length > 0) {
          data.forEach((row: { name?: string }) => {
            if (row.name?.trim()) categorySet.add(row.name.trim());
          });
        }
      } catch {
        // Table may not be created yet, proceed to other DB sources
      }

      // 2. Try fetching from site_settings (key: 'blog_categories')
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'blog_categories')
          .maybeSingle();

        if (!error && data?.value && Array.isArray(data.value.categories)) {
          data.value.categories.forEach((cat: unknown) => {
            if (typeof cat === 'string' && cat.trim()) {
              categorySet.add(cat.trim());
            }
          });
        }
      } catch {
        // Site settings query failed or table not ready
      }

      // 3. Query all categories present in the blogs table in the database
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('category');

        if (!error && data && data.length > 0) {
          data.forEach((row: { category?: string }) => {
            if (row.category?.trim()) categorySet.add(row.category.trim());
          });
        }
      } catch {
        // Blogs query failed
      }
    }

    // If database returned categories, return them sorted
    if (categorySet.size > 0) {
      return Array.from(categorySet).sort((a, b) => a.localeCompare(b));
    }

    // Only if completely offline with no network/db access, fallback to local articles categories
    TECHNICAL_ARTICLES.forEach((a) => {
      if (a.category?.trim()) categorySet.add(a.category.trim());
    });

    return Array.from(categorySet).sort((a, b) => a.localeCompare(b));
  }

  /**
   * Adds a new category directly to the database.
   */
  static async addCategory(newCategoryName: string): Promise<{ success: boolean; error?: string; categories: string[] }> {
    const name = newCategoryName.trim();
    if (!name) {
      return { success: false, error: 'Category name cannot be empty', categories: await this.getCategories() };
    }

    if (!isSupabaseConfigured || !supabase) {
      return { success: false, error: 'Supabase is not configured', categories: await this.getCategories() };
    }

    let savedToAtLeastOneSource = false;

    // 1. Attempt insert into blog_categories table
    try {
      const slug = name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '');

      const { error } = await supabase
        .from('blog_categories')
        .insert([{ id: slug, name }]);

      if (!error) {
        savedToAtLeastOneSource = true;
      }
    } catch {
      // blog_categories table may not exist yet
    }

    // 2. Also persist to site_settings (key: 'blog_categories')
    try {
      // Get current list from DB
      const currentList = await this.getCategories();
      const updatedList = Array.from(new Set([...currentList, name])).sort((a, b) => a.localeCompare(b));

      const { error } = await supabase
        .from('site_settings')
        .upsert(
          {
            key: 'blog_categories',
            value: { categories: updatedList },
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'key' }
        );

      if (!error) {
        savedToAtLeastOneSource = true;
      }
    } catch (err: unknown) {
      console.warn('Failed to save category to site_settings:', err);
    }

    const updatedCategories = await this.getCategories();
    return {
      success: savedToAtLeastOneSource || updatedCategories.includes(name),
      categories: updatedCategories,
    };
  }

  /**
   * Deletes a category from the database settings.
   */
  static async deleteCategory(categoryNameToDelete: string): Promise<{ success: boolean; categories: string[] }> {
    const name = categoryNameToDelete.trim();
    if (!isSupabaseConfigured || !supabase) {
      return { success: false, categories: await this.getCategories() };
    }

    // 1. Delete from blog_categories table
    try {
      await supabase
        .from('blog_categories')
        .delete()
        .eq('name', name);
    } catch {
      // Ignore
    }

    // 2. Remove from site_settings
    try {
      const currentList = await this.getCategories();
      const filtered = currentList.filter((c) => c !== name);

      await supabase
        .from('site_settings')
        .upsert(
          {
            key: 'blog_categories',
            value: { categories: filtered },
            updated_at: new Date().toISOString(),
          },
          { onConflict: 'key' }
        );
    } catch {
      // Ignore
    }

    const remaining = await this.getCategories();
    return { success: true, categories: remaining };
  }
}
