"use client";

import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from 'react';
import { getBrowserClient } from '@/lib/auth';

type User = {
  id: string;
  email: string;
  created_at: string;
} | null;

type AuthState = {
  user: User;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, locale?: string, name?: string) => Promise<{ success: boolean; requiresEmailVerification?: boolean }>;
  logout: () => Promise<void>;
  clearError: () => void;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSession = useCallback(async () => {
    try {
      const supabase = getBrowserClient();
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
      return session?.user ?? null;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchSession().then((u) => setLoading(false));

    const supabase = getBrowserClient();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (
      event: string,
      session: { user?: { id: string; email: string; created_at: string } | null } | null,
    ) => {
      setUser(session?.user ?? null);
      if (event === 'SIGNED_OUT') {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, [fetchSession]);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getBrowserClient();
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) {
        setError(error instanceof Error ? error.message : String(error));
        return false;
      }
      return true;
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : String(err)) ?? 'Ein unerwarteter Fehler ist aufgetreten');
      return false;
    } finally {
      setLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, locale = 'de', name?: string) => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getBrowserClient();
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            preferred_locale: locale,
            full_name: name,
          },
        },
      });
      if (error) {
        if ((error instanceof Error ? error.message : String(error)).includes('already registered')) {
          setError('Diese E-Mail ist bereits registriert');
        } else {
          setError(error instanceof Error ? error.message : String(error));
        }
        return { success: false, requiresEmailVerification: false };
      }
      return { success: true, requiresEmailVerification: true };
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : String(err)) ?? 'Ein unerwarteter Fehler ist aufgetreten');
      return { success: false, requiresEmailVerification: false };
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const supabase = getBrowserClient();
      await supabase.auth.signOut();
      setUser(null);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : String(err)) ?? 'Ein unerwarteter Fehler ist aufgetreten');
    } finally {
      setLoading(false);
    }
  }, []);

  const clearError = useCallback(() => setError(null), []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        signup,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth muss innerhalb von AuthProvider genutzt werden');
  return ctx;
}
