export type Session = { email: string };

const KEY = "mylovart.session";

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function setSession(session: Session) {
  window.localStorage.setItem(KEY, JSON.stringify(session));
}

export function clearSession() {
  window.localStorage.removeItem(KEY);
}

/** 目前只有这一个账号可以进；接 Supabase Auth 后由服务端校验取代 */
export const OWNER_EMAIL = process.env.NEXT_PUBLIC_OWNER_EMAIL ?? "newking@example.com";
