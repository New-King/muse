import { CanvasMock } from "@/components/canvas-mock";
import { LoginForm } from "@/components/login-form";

const mediums = ["图像", "视频", "版式"];

export default function Home() {
  return (
    <div className="min-h-dvh bg-[#f7f6f2] lg:grid lg:grid-cols-[1fr_400px]">
      <section className="flex flex-col lg:min-h-dvh">
        <header className="flex h-16 shrink-0 items-center justify-between px-6 lg:px-10">
          <div className="flex items-center gap-2.5">
            <span className="grid size-[24px] place-items-center rounded-[7px] bg-ink text-[11px] font-semibold text-white">
              m
            </span>
            <span className="text-[14px] font-medium tracking-[-0.01em]">mylovart</span>
          </div>
          <span className="rounded-full border border-[#e6e3da] bg-surface px-2.5 py-1 font-mono text-[9px] tracking-[0.14em] text-faint">
            BETA
          </span>
        </header>

        <div className="flex flex-1 flex-col justify-center px-6 pb-10 pt-6 lg:px-10 lg:pb-14">
          <h1 className="max-w-[560px] text-[clamp(30px,3.6vw,48px)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
            一句话，
            <br />
            做图、做片、做设计。
          </h1>

          <p className="mt-4 max-w-[430px] text-[13.5px] leading-[1.85] text-muted">
            左边画布，右边对话。AI 生成图像、视频和版式，直接落到画布上，你接着改。
          </p>

          <div className="mt-5 flex items-center gap-2">
            {mediums.map((m) => (
              <span
                key={m}
                className="rounded-full border border-[#e3e0d7] bg-surface px-2.5 py-1 text-[11px] text-muted"
              >
                {m}
              </span>
            ))}
          </div>

          <div className="mt-8">
            <CanvasMock />
          </div>
        </div>
      </section>

      <aside className="flex flex-col border-[#e6e3da] bg-surface lg:min-h-dvh lg:border-l">
        <div className="flex flex-1 flex-col justify-center px-7 py-12 lg:px-10">
          <div className="mx-auto w-full max-w-[300px]">
            <h2 className="text-[20px] font-medium tracking-tight text-ink">登录</h2>
            <p className="mt-1.5 mb-8 text-[13px] text-muted">使用你的账号进入工作台。</p>

            <LoginForm />

            <p className="mt-7 text-[11.5px] leading-relaxed text-faint">
              目前未开放注册，仅限已有账号登录。
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-[#ece9e2] px-7 py-4 lg:px-10">
          <span className="font-mono text-[9px] tracking-[0.14em] text-faint">MYLOVART</span>
          <span className="font-mono text-[9px] tracking-[0.14em] text-faint">2026</span>
        </div>
      </aside>
    </div>
  );
}
