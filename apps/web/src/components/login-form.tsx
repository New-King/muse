"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthError, signIn } from "@/lib/auth";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("请填写邮箱和密码");
      return;
    }

    setBusy(true);
    setError(null);
    try {
      await signIn(email, password);
      router.push("/app");
      router.refresh();
    } catch (err) {
      setError(err instanceof AuthError ? err.message : "登录失败，请稍后再试");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={submit} className="w-full space-y-5">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-[12px] text-muted">
          邮箱
        </label>
        <input
          id="email"
          type="email"
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-9 w-full rounded-lg border border-line bg-surface px-3 text-[13px] outline-none transition-colors focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-[12px] text-muted">
          密码
        </label>
        <input
          id="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="h-9 w-full rounded-lg border border-line bg-surface px-3 text-[13px] outline-none transition-colors focus:border-accent/40 focus:ring-2 focus:ring-accent/10"
        />
      </div>

      {error && <p className="text-[12px] text-danger">{error}</p>}

      <button
        type="submit"
        disabled={busy}
        className="h-9 w-full rounded-lg bg-accent text-[13px] font-medium text-white transition-colors hover:bg-accent/90 disabled:opacity-60"
      >
        {busy ? "登录中…" : "登录"}
      </button>
    </form>
  );
}
