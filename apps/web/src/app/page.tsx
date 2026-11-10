import { LoginForm } from "@/components/login-form";

const steps = [
  ["01", "描述", "说清楚画面、尺寸和气质"],
  ["02", "成稿", "AI 给出配色、构图与字体方案"],
  ["03", "修改", "在画布上继续拖动、改色、重组"],
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-canvas lg:grid lg:grid-cols-[1fr_460px]">
      <div className="flex flex-col border-line lg:min-h-dvh lg:border-r">
        <header className="flex h-16 shrink-0 items-center gap-2 px-6 lg:px-12">
          <span className="grid size-[22px] place-items-center rounded-[7px] bg-ink text-[11px] font-semibold text-canvas">
            m
          </span>
          <span className="text-[13px] font-medium tracking-tight">mylovart</span>
        </header>

        <div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-12">
          <p className="text-[11px] tracking-[0.14em] text-faint">AI 设计画布</p>
          <h1 className="mt-4 max-w-[520px] text-[32px] font-medium leading-[1.28] tracking-[-0.02em] lg:text-[40px]">
            把想法说出来，
            <br />
            画布自己长出来。
          </h1>
          <p className="mt-5 max-w-[400px] text-[14px] leading-[1.8] text-muted">
            对话在右，画布在左。你描述想要的画面，AI 给出可执行的方案，最后落成一张能继续修改的画布。
          </p>

          <div className="relative mt-10 hidden h-[260px] w-full max-w-[460px] overflow-hidden rounded-xl border border-line bg-surface lg:block">
            <div className="grid-dots h-full w-full p-5">
              <div className="w-[132px] rounded-md bg-[#f2e8dc] p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div className="h-[3px] w-7 rounded-full bg-[#c8622f]" />
                <p className="mt-2.5 text-[12px] font-medium leading-tight tracking-tight text-[#3a2e28]">
                  秋日
                  <br />
                  市集
                </p>
                <div className="mt-3 h-9 w-full rounded-sm bg-[#c8622f]" />
                <p className="mt-1.5 font-mono text-[6.5px] tracking-wider text-[#3a2e28]/60">
                  10.18 — 10.20
                </p>
              </div>
            </div>
            <div className="absolute bottom-5 right-5 max-w-[180px] rounded-lg border border-line bg-surface px-3 py-2 text-[11px] leading-relaxed shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              做一张秋季市集海报，暖色，留白多一点。
            </div>
          </div>
        </div>

        <footer className="hidden shrink-0 flex-wrap gap-x-10 gap-y-3 px-6 pb-10 lg:flex lg:px-12">
          {steps.map(([no, title, body]) => (
            <div key={no} className="flex items-baseline gap-2">
              <span className="font-mono text-[10px] text-faint">{no}</span>
              <div>
                <p className="text-[12px] font-medium tracking-tight">{title}</p>
                <p className="mt-0.5 text-[11px] text-muted">{body}</p>
              </div>
            </div>
          ))}
        </footer>
      </div>

      <aside className="flex flex-col justify-center bg-surface px-6 py-12 lg:min-h-dvh lg:px-12 lg:py-16">
        <div className="mx-auto w-full max-w-[300px]">
          <h2 className="text-[19px] font-medium tracking-tight">登录</h2>
          <p className="mt-1.5 mb-8 text-[13px] text-muted">使用你的账号进入工作台。</p>
          <LoginForm />
          <p className="mt-6 text-[12px] leading-relaxed text-faint">
            目前未开放注册，仅限已有账号登录。
          </p>
        </div>
      </aside>
    </div>
  );
}
