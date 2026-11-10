import { LoginForm } from "@/components/login-form";
import { PosterArt } from "@/components/poster-art";

const steps = [
  ["01", "描述", "画面、尺寸、气质"],
  ["02", "成稿", "配色、构图、字体"],
  ["03", "修改", "拖动、改色、重组"],
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-paper lg:grid lg:grid-cols-[1fr_420px]">
      <section className="relative flex flex-col overflow-hidden lg:min-h-dvh">
        <header className="flex h-24 shrink-0 items-center justify-between px-8 lg:px-16">
          <div className="flex items-center gap-2.5">
            <span className="grid size-[26px] place-items-center rounded-[8px] bg-ink text-[12px] font-semibold text-paper">
              m
            </span>
            <span className="text-[15px] font-medium tracking-[-0.01em]">mylovart</span>
          </div>
          <span className="font-mono text-[10px] tracking-[0.18em] text-faint">AI DESIGN CANVAS</span>
        </header>

        <div className="relative flex flex-1 flex-col justify-center px-8 py-12 lg:px-16 lg:py-0">
          <div className="relative z-10 max-w-[560px]">
            <h1 className="font-serif text-[clamp(40px,4.8vw,72px)] font-medium leading-[1.16] tracking-[-0.02em] text-ink">
              把想法说出来，
              <br />
              画布自己长出来。
            </h1>

            <div className="mt-9 h-px w-full max-w-[440px] bg-line-warm" />

            <p className="mt-7 max-w-[380px] text-[14px] leading-[1.9] text-muted">
              对话在右，画布在左。你描述想要的画面，AI 给出可执行的方案，最后落成一张能继续修改的画布。
            </p>
          </div>

          <PosterArt className="pointer-events-none absolute right-8 top-1/2 hidden -translate-y-1/2 rotate-[-4deg] lg:block" />
        </div>

        <footer className="flex shrink-0 flex-col gap-3 px-8 pb-10 sm:flex-row sm:gap-x-14 lg:px-16 lg:pb-14">
          {steps.map(([no, title, body]) => (
            <div key={no} className="flex items-baseline gap-2.5">
              <span className="font-mono text-[10px] text-faint">{no}</span>
              <div>
                <p className="text-[12.5px] font-medium tracking-tight text-ink">{title}</p>
                <p className="mt-1 text-[11px] text-muted">{body}</p>
              </div>
            </div>
          ))}
        </footer>
      </section>

      <aside className="flex flex-col border-line-warm bg-surface lg:min-h-dvh lg:border-l">
        <div className="flex flex-1 flex-col justify-center px-8 py-14 lg:px-14">
          <div className="mx-auto w-full max-w-[320px]">
            <p className="font-mono text-[10px] tracking-[0.18em] text-faint">SIGN IN</p>
            <h2 className="mt-3 font-serif text-[26px] font-medium tracking-tight text-ink">登录</h2>
            <p className="mt-2 mb-9 text-[13px] leading-relaxed text-muted">
              使用你的账号进入工作台。
            </p>

            <LoginForm />

            <p className="mt-8 text-[11.5px] leading-relaxed text-faint">
              目前未开放注册，仅限已有账号登录。
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center justify-between border-t border-line-warm px-8 py-5 lg:px-14">
          <span className="font-mono text-[10px] tracking-[0.14em] text-faint">MYLOVART</span>
          <span className="font-mono text-[10px] tracking-[0.14em] text-faint">2026</span>
        </div>
      </aside>
    </div>
  );
}
