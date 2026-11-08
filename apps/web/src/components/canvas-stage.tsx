import { Download, Image as ImageIcon, MousePointer2, Share2, Sparkles, Type } from "lucide-react";

const tools = [
  { icon: MousePointer2, label: "选择", active: true },
  { icon: Type, label: "文字", active: false },
  { icon: ImageIcon, label: "图片", active: false },
];

export function CanvasStage() {
  return (
    <main className="flex min-w-0 flex-1 flex-col bg-canvas">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        <div className="flex items-baseline gap-2">
          <h1 className="text-[13px] font-medium tracking-tight">未命名画布</h1>
          <span className="text-[11px] text-faint">已保存</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            aria-label="分享"
            className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <Share2 className="size-4" strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="导出"
            className="grid size-8 place-items-center rounded-lg text-muted transition-colors hover:bg-surface hover:text-ink"
          >
            <Download className="size-4" strokeWidth={1.75} />
          </button>
        </div>
      </header>

      <div className="grid-dots relative flex-1 bg-surface">
        <div className="absolute inset-0 grid place-items-center px-6">
          <div className="max-w-[360px] text-center">
            <h2 className="text-[15px] font-medium tracking-tight">画布是空的</h2>
            <p className="mt-1.5 text-[13px] leading-relaxed text-muted text-pretty">
              在右侧描述你想要的画面，生成的图片会直接落在画布上。
            </p>
            <button
              type="button"
              className="mt-5 inline-flex h-8 items-center gap-1.5 rounded-lg bg-accent px-3 text-[13px] font-medium text-white transition-colors hover:bg-accent/90"
            >
              <Sparkles className="size-3.5" strokeWidth={2} />
              生成一张示例海报
            </button>
          </div>
        </div>

        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-line bg-surface p-1 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
          {tools.map((tool) => (
            <button
              key={tool.label}
              type="button"
              aria-label={tool.label}
              className={
                tool.active
                  ? "grid size-8 place-items-center rounded-full bg-accent-soft text-accent"
                  : "grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-canvas hover:text-ink"
              }
            >
              <tool.icon className="size-4" strokeWidth={1.75} />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
}
