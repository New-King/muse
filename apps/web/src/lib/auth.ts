"use client";

import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "";

let client: SupabaseClient | null = null;

function sb(): SupabaseClient {
  client ??= createClient(url, anonKey, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
  return client;
}

const MESSAGES: Record<string, string> = {
  "Invalid login credentials": "邮箱或密码不正确",
  "Email not confirmed": "邮箱还没验证",
};

export class AuthError extends Error {}

export async function signIn(email: string, password: string) {
  const { error } = await sb().auth.signInWithPassword({ email: email.trim(), password });
  if (error) throw new AuthError(MESSAGES[error.message] ?? error.message);
}

export async function signOut() {
  await sb().auth.signOut();
}

export async function getAccessToken(): Promise<string | null> {
  const { data } = await sb().auth.getSession();
  return data.session?.access_token ?? null;
}

export async function getCurrentEmail(): Promise<string | null> {
  const { data } = await sb().auth.getSession();
  return data.session?.user.email ?? null;
}
