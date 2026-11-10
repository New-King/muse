"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { OWNER_EMAIL, setSession } from "@/lib/session";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function submit(event: React.FormEvent) {
    event.preventDefault();
    if (!email.trim() || !password) {
      setError("请填写邮箱和密码");
      return;
    }
    // 占位校验：接上 Supabase Auth 后删掉，改由服务端验证
    if (email.trim().toLowerCase() !== OWNER_EMAIL.toLowerCase()) {
      setError("该账号没有访问权限");
      return;
    }
    setSession({ email: email.trim() });
    router.push("/app");
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
        className="h-9 w-full rounded-lg bg-accent text-[13px] font-medium text-white transition-colors hover:bg-accent/90"
      >
        登录
      </button>
    </form>
  );
}
