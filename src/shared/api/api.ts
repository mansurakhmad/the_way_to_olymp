import { createClient } from '@supabase/supabase-js';

import { KEEP_USER_LOGIN } from '../config';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

const customStorage = {
  getItem: (key: string) => {
    const rememberMe = localStorage.getItem(KEEP_USER_LOGIN) === 'true';
    return rememberMe ? localStorage.getItem(key) : sessionStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    const rememberMe = localStorage.getItem(KEEP_USER_LOGIN) === 'true';
    if (rememberMe) localStorage.setItem(key, value);
    else sessionStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  },
};

export const api = createClient(supabaseUrl, supabaseKey, {
  auth: {
    storage: customStorage,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
