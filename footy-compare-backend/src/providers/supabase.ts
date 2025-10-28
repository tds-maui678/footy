import { createClient, SupabaseClient } from "@supabase/supabase-js";

const url = process.env.SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_KEY; // service-role key (server only)

let sb: SupabaseClient | null = null;
if (url && key) {
  sb = createClient(url, key, {
    auth: { persistSession: false },
    global: { headers: { "X-Client-Info": "footy-compare-backend/1.0" } }
  });
}

export { sb };