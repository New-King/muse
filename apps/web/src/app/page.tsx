import Link from "next/link";

const features = [
  {
    title: "说清楚，就有方案",
    body: "描述画面、尺寸和气质，AI 给出配色、构图、字体的具体建议，不是泛泛而谈。",
  },
  {
    title: "画布和对话在同一屏",
    body: "不用在工具之间来回切。左边画，右边说，改完立刻看到结果。",
  },
  {
    title: "一切都是可编辑的",
    body: "画布上的每个元素都能拖动、改色、再组合，AI 给的是起点，不是终点。",
  },
];

export default function Home() {
  return (
    <div className="min-h-dvh bg-canvas">
      <header className="mx-auto flex h-16 max-w-[1080px] items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <span className="grid size-[22px] place-items-center rounded-[7px] bg-ink text-[11px] font-semibold text-canvas">
            m
          </span>
          <span className="text-[13px] font-medium tracking-tight">mylovart</span>
        </div>
        <Link
          href="/login"
          className="rounded-lg px-3 py-1.5 text-[13px] text-muted transition-colors hover:bg-surface hover:text-ink"
        >
          登录
        </Link>
      </header>

      <main className="mx-auto max-w-[1080px] px-6">
        <section className="grid gap-12 pb-20 pt-10 md:grid-cols-[1fr_1fr] md:items-center md:pt-16">
          <div>
            <p className="text-[11px] tracking-[0.14em] text-faint">AI 设计画布</p>
            <h1 className="mt-4 text-[34px] font-medium leading-[1.25] tracking-[-0.02em] md:text-[40px]">
              把想法说出来，
              <br />
              画布自己长出来。
            </h1>
            <p className="mt-5 max-w-[420px] text-[14px] leading-[1.8] text-muted">
              对话在右，画布在左。你描述想要的画面，AI 给出可执行的方案，最后落成一张可以继续修改的画布。
            </p>
            <div className="mt-8 flex items-center gap-3">
              <Link
                href="/login"
                className="inline-flex h-9 items-center rounded-lg bg-accent px-4 text-[13px] font-medium text-white transition-colors hover:bg-accent/90"
              >
                进入工作台
              </Link>
              <a
                href="#how"
                className="inline-flex h-9 items-center rounded-lg px-4 text-[13px] text-muted transition-colors hover:bg-surface hover:text-ink"
              >
                它怎么工作
              </a>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface p-4">
            <div className="grid-dots flex aspect-[4/3] items-center justify-center rounded-xl border border-line">
              <div className="w-[150px] rounded-md bg-[#f2e8dc] p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div className="h-[3px] w-8 rounded-full bg-[#c8622f]" />
                <p className="mt-3 text-[13px] font-medium leading-tight tracking-tight text-[#3a2e28]">
                  秋日
                  <br />
                  市集
                </p>
                <div className="mt-4 h-10 w-full rounded-sm bg-[#c8622f]" />
                <p className="mt-2 font-mono text-[7px] tracking-wider text-[#3a2e28]/60">
                  10.18 — 10.20
                </p>
              </div>
            </div>
            <div className="absolute bottom-6 right-6 max-w-[190px] rounded-xl border border-line bg-surface px-3 py-2 text-[11.5px] leading-relaxed shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
              做一张秋季市集海报，暖色，留白多一点。
            </div>
          </div>
        </section>

        <section id="how" className="grid gap-px border-t border-line pb-24 pt-10 md:grid-cols-3">
          {features.map((f) => (
            <div key={f.title} className="px-0 py-6 md:px-8 md:first:pl-0 md:last:pr-0">
              <h2 className="text-[13px] font-medium tracking-tight">{f.title}</h2>
              <p className="mt-2 text-[13px] leading-[1.75] text-muted">{f.body}</p>
            </div>
          ))}
        </section>
      </main>

      <footer className="mx-auto flex max-w-[1080px] items-center justify-between border-t border-line px-6 py-6 text-[11px] text-faint">
        <span>mylovart</span>
        <Link href="/login" className="transition-colors hover:text-ink">
          登录
        </Link>
      </footer>
    </div>
  );
}
