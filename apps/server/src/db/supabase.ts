import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { env } from "../lib/env.js";

let client: SupabaseClient | null = null;

/** 服务端用 service_role，绕过 RLS；所有查询必须显式带 user_id 过滤。 */
export function getDb(): SupabaseClient {
  if (!env.supabaseUrl || !env.supabaseServiceKey) {
    throw new Error("缺少 SUPABASE_URL 或 SUPABASE_SERVICE_ROLE_KEY");
  }
  client ??= createClient(env.supabaseUrl, env.supabaseServiceKey, {
    auth: { persistSession: false },
  });
  return client;
}
