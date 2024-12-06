import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl) {
  throw new Error("Missing env var: SUPABASE_URL");
}

if (!supabaseAnonKey) {
  throw new Error("Missing env var: SUPABASE_ANON_KEY");
}

// Create a single supabase client for interacting with your database
const supabase = createClient(supabaseUrl, supabaseAnonKey);

const newClient = (key: string | null) =>
  createClient(supabaseUrl, key || supabaseAnonKey);

export { supabase, newClient };
