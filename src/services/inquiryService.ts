import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  topic?: string;
  message: string;
  source: 'ai_agent' | 'contact_form';
  status: 'unread' | 'read' | 'replied';
  metadata?: Record<string, any>;
  created_at: string;
}

const LOCAL_STORAGE_KEY = 'portfolio_inquiries_store';

// Helper to get local stored inquiries
function getLocalInquiries(): Inquiry[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as Inquiry[];
  } catch (e) {
    console.warn('Failed to parse local inquiries:', e);
    return [];
  }
}

// Helper to save local stored inquiries
function saveLocalInquiries(inquiries: Inquiry[]) {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(inquiries));
  } catch (e) {
    console.warn('Failed to save inquiries to localStorage:', e);
  }
}

export const InquiryService = {
  /**
   * Submit a new inquiry from either the AI Chatbot or Contact Form
   */
  async submitInquiry(data: {
    name?: string;
    email: string;
    topic?: string;
    message: string;
    source: 'ai_agent' | 'contact_form';
    metadata?: Record<string, any>;
  }): Promise<{ success: boolean; inquiry: Inquiry; error?: string }> {
    const newInquiry: Inquiry = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      name: data.name?.trim() || 'Website Visitor',
      email: data.email.trim(),
      topic: data.topic?.trim() || (data.source === 'ai_agent' ? 'AI Copilot Inbound Lead' : 'General Inquiry'),
      message: data.message.trim(),
      source: data.source,
      status: 'unread',
      metadata: data.metadata || {},
      created_at: new Date().toISOString(),
    };

    // 1. Immediately buffer in localStorage so nothing is lost even if offline or table uninitialized
    const local = getLocalInquiries();
    local.unshift(newInquiry);
    saveLocalInquiries(local);

    // 2. Sync to Supabase if configured
    if (isSupabaseConfigured && supabase) {
      try {
        const { error } = await supabase.from('inquiries').insert([
          {
            id: newInquiry.id,
            name: newInquiry.name,
            email: newInquiry.email,
            topic: newInquiry.topic,
            message: newInquiry.message,
            source: newInquiry.source,
            status: newInquiry.status,
            metadata: newInquiry.metadata,
            created_at: newInquiry.created_at,
          },
        ]);

        if (error) {
          console.warn('Supabase inquiry insert notice (stored in local buffer):', error.message);
        }
      } catch (err) {
        console.warn('Network notice writing inquiry to Supabase:', err);
      }
    }

    return { success: true, inquiry: newInquiry };
  },

  /**
   * Fetch all inquiries (combining Supabase cloud database with local buffer)
   */
  async getInquiries(): Promise<Inquiry[]> {
    const localInquiries = getLocalInquiries();

    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase
          .from('inquiries')
          .select('*')
          .order('created_at', { ascending: false });

        if (!error && Array.isArray(data)) {
          // Merge Supabase entries with local entries (avoiding duplicates by id)
          const map = new Map<string, Inquiry>();
          data.forEach((item) => map.set(item.id, item as Inquiry));
          localInquiries.forEach((item) => {
            if (!map.has(item.id)) {
              map.set(item.id, item);
            }
          });
          const merged = Array.from(map.values()).sort(
            (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
          );
          // Update local cache
          saveLocalInquiries(merged);
          return merged;
        }
      } catch (err) {
        console.warn('Failed to load inquiries from Supabase, serving local cache:', err);
      }
    }

    return localInquiries.sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  },

  /**
   * Update the status of an inquiry ('unread', 'read', 'replied')
   */
  async updateStatus(id: string, status: 'unread' | 'read' | 'replied'): Promise<boolean> {
    const local = getLocalInquiries();
    const target = local.find((i) => i.id === id);
    if (target) {
      target.status = status;
      saveLocalInquiries(local);
    }

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('inquiries').update({ status }).eq('id', id);
      } catch (err) {
        console.warn('Failed to sync status update to Supabase:', err);
      }
    }

    return true;
  },

  /**
   * Delete an inquiry from Admin Panel
   */
  async deleteInquiry(id: string): Promise<boolean> {
    const local = getLocalInquiries().filter((i) => i.id !== id);
    saveLocalInquiries(local);

    if (isSupabaseConfigured && supabase) {
      try {
        await supabase.from('inquiries').delete().eq('id', id);
      } catch (err) {
        console.warn('Failed to delete inquiry from Supabase:', err);
      }
    }

    return true;
  },

  /**
   * Count unread inquiries
   */
  async getUnreadCount(): Promise<number> {
    const list = await this.getInquiries();
    return list.filter((i) => i.status === 'unread').length;
  },
};
