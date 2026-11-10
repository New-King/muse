import { HazeCanvas } from "@/components/haze-canvas";
import { LoginForm } from "@/components/login-form";

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-canvas">
      <HazeCanvas />

      <div className="relative z-10 flex min-h-dvh flex-col">
        <header className="flex h-20 shrink-0 items-center justify-between px-7 lg:px-14">
          <div className="flex items-center gap-2.5">
            <span className="grid size-[24px] place-items-center rounded-[7px] bg-ink text-[11px] font-semibold text-white">
              m
            </span>
            <span className="text-[14px] font-medium tracking-[-0.01em] text-ink">mylovart</span>
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] text-faint">BETA</span>
        </header>

        <main className="mx-auto grid w-full max-w-[1160px] flex-1 items-center gap-14 px-7 lg:grid-cols-[1fr_348px] lg:gap-20 lg:px-14">
          <div>
            <h1 className="max-w-[560px] text-[clamp(40px,5.1vw,72px)] font-light leading-[1.12] tracking-[-0.035em] text-ink">
              把想法，
              <br />
              做成作品。
            </h1>

            <p className="mt-8 max-w-[330px] text-[13.5px] leading-[1.95] text-muted">
              图像、视频、版式，在同一张画布上完成。
            </p>
          </div>

          <div className="w-full">
            <div className="rounded-2xl border border-line bg-surface p-7 shadow-[0_22px_54px_-36px_rgba(24,24,27,0.28)] lg:p-8">
              <h2 className="text-[17px] font-medium tracking-tight text-ink">登录</h2>
              <p className="mt-1 mb-7 text-[12.5px] text-muted">使用你的账号进入工作台。</p>

              <LoginForm />

              <p className="mt-6 text-[11px] leading-relaxed text-faint">
                目前未开放注册，仅限已有账号登录。
              </p>
            </div>
          </div>
        </main>

        <footer className="flex shrink-0 items-center justify-between px-7 pb-8 lg:px-14 lg:pb-10">
          <span className="font-mono text-[9px] tracking-[0.2em] text-faint">
            MYLOVART — AI CREATIVE CANVAS
          </span>
          <span className="font-mono text-[9px] tracking-[0.2em] text-faint">© 2026</span>
        </footer>
      </div>
    </div>
  );
}
