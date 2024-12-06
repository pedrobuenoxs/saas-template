import { create } from "zustand";
import { User } from "@supabase/supabase-js";
import { supabase } from "../supabase/index";

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => Promise<void>;
  login: (email: string, password: string) => void;
  loginOTP: (email: string) => void;
}

const userStore = create<UserStore>((set, get) => ({
  user: null,
  setUser: (user: User) => set({ user }),

  signIn: async (email: string, password: string) => {
    try {
      let { data, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      const { user } = data;
      let { error: errorAuth } = await supabase
        .from("user_auth")
        .insert({ user_auth_id: user?.id });

      if (error) throw error;
      if (errorAuth) throw errorAuth;

      return;
    } catch (error: any) {
      throw error;
    }
  },

  signOut: async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      set({ user: null });
    } catch (error: any) {
      throw error;
    }
  },

  login: async (email: string, password: string) => {
    try {
      let { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      });
      if (error) throw error;
      const user = data?.user;

      set({ user });
      return;
    } catch (error: any) {
      throw error;
    }
  },

  loginOTP: async (email: string) => {
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      if (error) throw error;
      return;
    } catch (error: any) {
      throw error;
    }
  },
}));

export { userStore };
