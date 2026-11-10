import Link from "next/link";
import { BackgroundArt } from "@/components/background-art";
import { LoginForm } from "@/components/login-form";

const steps = [
  ["01", "描述", "画面、尺寸、气质"],
  ["02", "成稿", "配色、构图、字体"],
  ["03", "修改", "拖动、改色、重组"],
];

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-canvas lg:grid lg:grid-cols-[1fr_480px]">
      <BackgroundArt />

      <div className="relative z-10 flex flex-col lg:min-h-dvh">
        <header className="flex h-20 shrink-0 items-center gap-2.5 px-6 lg:px-16">
          <span className="grid size-[26px] place-items-center rounded-[8px] bg-ink text-[12px] font-semibold text-canvas">
            m
          </span>
          <span className="text-[15px] font-medium tracking-[-0.01em]">mylovart</span>
        </header>

        <div className="flex flex-1 flex-col justify-center px-6 py-10 lg:px-16 lg:py-0">
          <p className="text-[11px] tracking-[0.16em] text-faint">AI 设计画布</p>

          <h1 className="mt-5 max-w-[640px] text-[clamp(38px,4.4vw,66px)] font-medium leading-[1.14] tracking-[-0.035em]">
            把想法说出来，
            <br />
            画布自己长出来。
          </h1>

          <p className="mt-6 max-w-[440px] text-[15px] leading-[1.85] text-muted">
            对话在右，画布在左。你描述想要的画面，AI 给出可执行的方案，最后落成一张能继续修改的画布。
          </p>

          <div className="art-float relative mt-12 hidden h-[320px] w-full max-w-[540px] overflow-hidden rounded-2xl border border-line bg-surface/80 backdrop-blur-[2px] lg:block">
            <div className="grid-dots h-full w-full p-7">
              <div className="w-[168px] rounded-lg bg-[#f2e8dc] p-4 shadow-[0_2px_10px_rgba(58,46,40,0.08)]">
                <div className="h-[3px] w-9 rounded-full bg-[#c8622f]" />
                <p className="mt-3.5 text-[15px] font-medium leading-[1.15] tracking-tight text-[#3a2e28]">
                  秋日
                  <br />
                  市集
                </p>
                <div className="mt-4 h-11 w-full rounded-sm bg-[#c8622f]" />
                <p className="mt-2 font-mono text-[7.5px] tracking-[0.12em] text-[#3a2e28]/55">
                  10.18 — 10.20
                </p>
              </div>
            </div>

            <div className="absolute bottom-7 right-7 max-w-[210px] rounded-xl border border-line bg-surface px-3.5 py-2.5 text-[12px] leading-relaxed shadow-[0_4px_16px_rgba(23,23,26,0.06)]">
              做一张秋季市集海报，暖色，留白多一点。
            </div>
          </div>
        </div>

        <footer className="flex shrink-0 flex-col gap-3 px-6 pb-10 sm:flex-row sm:gap-x-12 lg:px-16 lg:pb-14">
          {steps.map(([no, title, body]) => (
            <div key={no} className="flex items-baseline gap-2.5">
              <span className="font-mono text-[10px] text-faint">{no}</span>
              <div>
                <p className="text-[12.5px] font-medium tracking-tight">{title}</p>
                <p className="mt-1 text-[11px] text-muted">{body}</p>
              </div>
            </div>
          ))}
        </footer>
      </div>

      <aside className="relative z-10 flex items-center justify-center border-line bg-gradient-to-b from-[#f1f5f2] to-[#e8eeea] px-6 py-16 lg:min-h-dvh lg:border-l lg:px-10">
        <div className="w-full max-w-[364px] rounded-2xl border border-line bg-surface p-8 shadow-[0_10px_40px_rgba(23,23,26,0.07)]">
          <h2 className="text-[19px] font-medium tracking-tight">登录</h2>
          <p className="mt-1.5 mb-8 text-[13px] text-muted">使用你的账号进入工作台。</p>

          <LoginForm />

          <p className="mt-7 text-[12px] leading-relaxed text-faint">
            目前未开放注册，仅限已有账号登录。
          </p>
        </div>
      </aside>
    </div>
  );
}
