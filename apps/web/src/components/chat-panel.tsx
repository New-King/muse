import { ArrowUp, ChevronDown, Image as ImageIcon } from "lucide-react";

export function ChatPanel() {
  return (
    <section className="flex w-[360px] shrink-0 flex-col border-l border-line bg-canvas">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        <span className="text-[13px] font-medium tracking-tight">对话</span>
        <button
          type="button"
          className="rounded-md border border-line bg-surface px-2 py-0.5 text-[11px] text-muted transition-colors hover:text-ink"
        >
          默认模型
        </button>
      </header>

      <div className="flex-1 space-y-5 overflow-y-auto px-4 py-5">
        <p className="text-[13.5px] leading-[1.7] text-ink">
          画布已就绪。你可以说「画一张极简海报，米色底，留白多一点」，或者直接把手里的草图拖进来。
        </p>

        <div className="ml-auto max-w-[85%] rounded-xl border border-line bg-surface px-3 py-2 text-[13px] leading-relaxed">
          帮我做一张秋季新品海报，暖色调。
        </div>

        <div>
          <p className="text-[13.5px] leading-[1.7] text-ink">
            好，我先读一下当前画布，再生成一张 3:4 的竖版海报。
          </p>
          <div className="mt-2 flex items-center gap-2 rounded-lg border border-line bg-surface/60 px-2.5 py-1.5">
            <ImageIcon className="size-3 shrink-0 text-muted" strokeWidth={1.75} />
            <span className="font-mono text-[11px] text-ink">generate_image</span>
            <span className="text-[11px] text-faint">完成 · 6.2s</span>
            <ChevronDown className="ml-auto size-3 text-faint" strokeWidth={2} />
          </div>
        </div>
      </div>

      <div className="shrink-0 border-t border-line p-3">
        <div className="rounded-xl border border-line bg-surface transition-[border-color,box-shadow] focus-within:border-accent/40 focus-within:ring-2 focus-within:ring-accent/10">
          <textarea
            rows={2}
            placeholder="描述你想要的画面…"
            className="block w-full resize-none bg-transparent px-3 py-2.5 text-[13px] leading-relaxed outline-none placeholder:text-faint"
          />
          <div className="flex items-center justify-between px-2 pb-2">
            <span className="text-[11px] text-faint">⏎ 发送 · ⇧⏎ 换行</span>
            <button
              type="button"
              aria-label="发送"
              className="grid size-7 place-items-center rounded-lg bg-accent text-white transition-opacity hover:opacity-90"
            >
              <ArrowUp className="size-3.5" strokeWidth={2.25} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
