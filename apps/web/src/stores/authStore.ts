import { create } from 'zustand';
import { fetchJson } from '../lib/api.js';

export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,

  checkAuth: async () => {
    try {
      const res = await fetchJson<{ user: User }>('/auth/me');
      if (res.success && res.user) {
        set({ user: res.user, isLoading: false });
      } else {
        set({ user: null, isLoading: false });
      }
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  login: async (email, password) => {
    const res = await fetchJson<{ user: User; token: string }>('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (res.success && res.user) {
      if (res.token) {
        localStorage.setItem('framecraft_auth_token', res.token);
      }
      set({ user: res.user });
      return { success: true };
    }
    return { success: false, error: res.error || 'Login failed' };
  },

  register: async (name, email, password) => {
    const res = await fetchJson<{ user: User; token: string }>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
    });

    if (res.success && res.user) {
      if (res.token) {
        localStorage.setItem('framecraft_auth_token', res.token);
      }
      set({ user: res.user });
      return { success: true };
    }
    return { success: false, error: res.error || 'Registration failed' };
  },

  logout: async () => {
    await fetchJson('/auth/logout', { method: 'POST' });
    localStorage.removeItem('framecraft_auth_token');
    set({ user: null });
  },
}));
