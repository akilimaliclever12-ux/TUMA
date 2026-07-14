import { createClient } from "@supabase/supabase-js";

// Client Supabase côté serveur uniquement (clé service role).
// Ne jamais importer ce fichier dans un composant client.
export function getAdminClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return createClient(url, key, { auth: { persistSession: false } });
}
