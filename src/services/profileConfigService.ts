import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface ProfileSettings {
  resumeUrl: string;
  calendlyUrl: string;
  targetRoles: string[];
  noticePeriod: string;
  locationPreference: string;
  isAvailable: boolean;
}

export const DEFAULT_PROFILE_SETTINGS: ProfileSettings = {
  resumeUrl: '',
  calendlyUrl: 'https://cal.com/mohitsharma',
  targetRoles: [
    'AI Engineer',
    'Computer Vision Specialist',
    'Deep Learning & MLOps Engineer',
  ],
  noticePeriod: 'Immediately Available / Active',
  locationPreference: 'Bhopal, India • Open to Worldwide Remote & Relocation',
  isAvailable: true,
};

const STORAGE_KEY = 'mohit_portfolio_profile_settings';

/**
 * Extracts the Google Drive File ID from any standard Google Drive URL.
 * Supports:
 * - https://drive.google.com/file/d/FILE_ID/view?usp=sharing
 * - https://drive.google.com/open?id=FILE_ID
 * - https://drive.google.com/uc?id=FILE_ID
 * - https://docs.google.com/document/d/FILE_ID/edit
 */
export function extractGoogleDriveId(url: string): string | null {
  if (!url || typeof url !== 'string') return null;
  const trimmed = url.trim();

  // Pattern 1: /file/d/ID or /d/ID
  const matchFileD = trimmed.match(/\/d\/([a-zA-Z0-9_-]+)/);
  if (matchFileD && matchFileD[1]) {
    return matchFileD[1];
  }

  // Pattern 2: id=ID
  const matchQueryId = trimmed.match(/[?&]id=([a-zA-Z0-9_-]+)/);
  if (matchQueryId && matchQueryId[1]) {
    return matchQueryId[1];
  }

  return null;
}

/**
 * Returns an embeddable Google Drive preview URL (for iframe rendering)
 */
export function getGoogleDrivePreviewUrl(url: string): string {
  const fileId = extractGoogleDriveId(url);
  if (fileId) {
    return `https://drive.google.com/file/d/${fileId}/preview`;
  }
  return url;
}

/**
 * Returns a direct download URL for Google Drive files
 */
export function getGoogleDriveDownloadUrl(url: string): string {
  const fileId = extractGoogleDriveId(url);
  if (fileId) {
    return `https://drive.google.com/uc?export=download&id=${fileId}`;
  }
  return url;
}

type SettingsListener = (settings: ProfileSettings) => void;
const listeners = new Set<SettingsListener>();

export const ProfileConfigService = {
  /**
   * Retrieves profile settings, trying Supabase first, then local storage, then defaults.
   */
  async getSettings(): Promise<ProfileSettings> {
    // 1. Try local cache first for instant synchronous render
    let cached: ProfileSettings = DEFAULT_PROFILE_SETTINGS;
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        cached = { ...DEFAULT_PROFILE_SETTINGS, ...JSON.parse(stored) };
      }
    } catch {
      // Ignore storage errors
    }

    // 2. Fetch fresh from Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('site_settings')
          .select('value')
          .eq('key', 'profile_settings')
          .maybeSingle();

        if (!error && data && data.value && typeof data.value === 'object') {
          const fresh: ProfileSettings = {
            ...DEFAULT_PROFILE_SETTINGS,
            ...data.value,
          };
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(fresh));
          } catch {
            // Ignore
          }
          return fresh;
        }
      } catch (err) {
        console.warn('ProfileConfigService: Supabase fetch error, using cache/defaults:', err);
      }
    }

    return cached;
  },

  /**
   * Saves settings to Supabase and local cache, notifying all live components.
   */
  async saveSettings(updates: Partial<ProfileSettings>): Promise<{ success: boolean; error?: string }> {
    const current = await this.getSettings();
    const updated: ProfileSettings = {
      ...current,
      ...updates,
    };

    // 1. Save to local storage
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch {
      // Ignore
    }

    // Notify listeners immediately
    listeners.forEach((fn) => fn(updated));

    // 2. Persist to Supabase
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase
          .from('site_settings')
          .upsert(
            {
              key: 'profile_settings',
              value: updated,
              updated_at: new Date().toISOString(),
            },
            { onConflict: 'key' }
          );

        if (error) {
          console.warn('ProfileConfigService: Supabase upsert error:', error.message);
          return { success: false, error: error.message };
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        return { success: false, error: msg };
      }
    }

    return { success: true };
  },

  /**
   * Subscribe to real-time settings changes
   */
  subscribe(listener: SettingsListener): () => void {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  },
};
