"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { OWNER_EMAIL, setSession } from "@/lib/session";

export default function LoginPage() {
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
    <div className="grid min-h-dvh place-items-center bg-canvas px-6">
      <div className="w-full max-w-[340px]">
        <Link href="/" className="mb-10 flex items-center gap-2">
          <span className="grid size-[22px] place-items-center rounded-[7px] bg-ink text-[11px] font-semibold text-canvas">
            m
          </span>
          <span className="text-[13px] font-medium tracking-tight">mylovart</span>
        </Link>

        <h1 className="text-[20px] font-medium tracking-tight">登录</h1>
        <p className="mt-1.5 text-[13px] text-muted">使用你的账号进入工作台。</p>

        <form onSubmit={submit} className="mt-8 space-y-4">
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

        <p className="mt-6 text-[12px] leading-relaxed text-faint">
          目前未开放注册，仅限已有账号登录。
        </p>
      </div>
    </div>
  );
}
