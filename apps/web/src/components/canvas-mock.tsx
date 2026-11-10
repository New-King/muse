import { Image as ImageIcon, MousePointer2, Square, Type, ZoomIn } from "lucide-react";
import { PosterArt } from "./poster-art";

const tools = [
  { icon: MousePointer2, active: true },
  { icon: Square, active: false },
  { icon: Type, active: false },
  { icon: ImageIcon, active: false },
];

const handles = [
  "-left-[5px] -top-[5px]",
  "-right-[5px] -top-[5px]",
  "-bottom-[5px] -left-[5px]",
  "-bottom-[5px] -right-[5px]",
];

export function CanvasMock() {
  return (
    <div className="relative w-full overflow-hidden rounded-xl border border-[#e6e3da] bg-surface shadow-[0_1px_2px_rgba(35,29,23,0.04),0_20px_40px_-24px_rgba(35,29,23,0.2)]">
      <div className="canvas-dots relative h-[320px] w-full sm:h-[370px] lg:h-[440px]">
        {/* 工具栏 */}
        <div className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-0.5 rounded-full border border-[#e6e3da] bg-surface/95 px-1.5 py-1 shadow-[0_2px_8px_rgba(35,29,23,0.06)]">
          {tools.map((tool, i) => (
            <span
              key={i}
              className={
                tool.active
                  ? "grid size-6 place-items-center rounded-full bg-accent-soft text-accent"
                  : "grid size-6 place-items-center rounded-full text-muted"
              }
            >
              <tool.icon className="size-3" strokeWidth={1.75} />
            </span>
          ))}
        </div>

        {/* 作品 + 选中框 */}
        <div className="absolute left-[5%] top-[19%] w-[108px] sm:w-[130px] lg:top-[11%] lg:w-[152px]">
          <div className="relative">
            <PosterArt className="aspect-[297/420] w-full" />
            <div className="pointer-events-none absolute -inset-[5px] border-[1.5px] border-accent" />
            {handles.map((pos) => (
              <span
                key={pos}
                className={`pointer-events-none absolute ${pos} size-[6px] rounded-[1px] border-[1.5px] border-accent bg-surface`}
              />
            ))}
          </div>
          <div className="mt-2">
            <span className="inline-block rounded-[3px] bg-accent px-1.5 py-0.5 font-mono text-[8px] tracking-[0.04em] text-white">
              海报 · 297×420
            </span>
          </div>
        </div>

        {/* 文字图层 */}
        <div className="absolute left-[27%] top-[19%] hidden w-[134px] sm:block">
          <div className="relative border border-dashed border-[#c9c4b6] px-2 py-1.5">
            <p className="font-serif text-[17px] leading-[1.25] tracking-[0.02em] text-[#231d17]">
              秋日市集
              <br />
              AUTUMN FAIR
            </p>
          </div>
          <span className="mt-1.5 block font-mono text-[7px] tracking-[0.12em] text-faint">
            TEXT · 思源宋体
          </span>
        </div>

        {/* 生成中 */}
        <div className="absolute left-[46%] top-[17%] hidden w-[104px] sm:block">
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[3px] border border-dashed border-[#cfcab9] bg-[#fbf9f4]">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="size-4 animate-spin rounded-full border-[1.5px] border-[#c8622f]/25 border-t-[#c8622f]" />
            </div>
            <div className="absolute inset-x-0 bottom-0 bg-surface/95 px-1.5 py-1">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[6.5px] tracking-[0.08em] text-muted">生成中</span>
                <span className="font-mono text-[6.5px] text-faint">62%</span>
              </div>
              <div className="mt-1 h-[2px] w-full rounded-full bg-[#eee9dd]">
                <div className="h-full w-[62%] rounded-full bg-[#c8622f]" />
              </div>
            </div>
          </div>
          <span className="mt-1.5 block font-mono text-[7px] tracking-[0.12em] text-faint">
            IMAGE · 3:4
          </span>
        </div>

        {/* 色板 */}
        <div className="absolute bottom-[13%] left-[5%] hidden w-[152px] rounded-lg border border-[#e6e3da] bg-surface px-2.5 py-2 shadow-[0_2px_8px_rgba(35,29,23,0.05)] sm:block">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[7px] tracking-[0.14em] text-faint">PALETTE</p>
            <p className="font-mono text-[7px] text-faint">4</p>
          </div>
          <div className="mt-1.5 flex gap-1">
            {["#f7f0e3", "#c8622f", "#2f5d50", "#231d17"].map((c) => (
              <span key={c} className="h-4 flex-1 rounded-[2px]" style={{ background: c }} />
            ))}
          </div>
        </div>

        {/* 光标 */}
        <div className="absolute left-[40%] top-[63%] hidden items-start gap-0.5 sm:flex">
          <svg width="12" height="14" viewBox="0 0 14 16" fill="none">
            <path
              d="M1 1L1 12.5L4.4 9.4L6.8 14.4L9 13.4L6.6 8.5L11.4 8.5L1 1Z"
              fill="#2F5D50"
              stroke="#fff"
              strokeWidth="1"
            />
          </svg>
          <span className="rounded-[3px] bg-accent px-1 py-px text-[7.5px] font-medium text-white">
            你
          </span>
        </div>

        {/* 对话气泡 */}
        <div className="absolute bottom-[11%] right-[4%] w-[42%] max-w-[224px] rounded-lg border border-[#e6e3da] bg-surface px-2.5 py-2 shadow-[0_3px_12px_rgba(35,29,23,0.06)]">
          <p className="text-[10px] leading-relaxed text-ink">
            做一张秋季市集海报，暖色，留白多一点。
          </p>
          <div className="mt-1.5 flex items-center justify-between">
            <span className="font-mono text-[7px] tracking-[0.1em] text-faint">DEEPSEEK</span>
            <span className="grid size-3.5 place-items-center rounded-[3px] bg-accent text-[8px] leading-none text-white">
              ↑
            </span>
          </div>
        </div>

        {/* 缩放 */}
        <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1 rounded border border-[#e6e3da] bg-surface px-1.5 py-0.5">
          <ZoomIn className="size-2.5 text-muted" strokeWidth={2} />
          <span className="font-mono text-[7.5px] text-muted">100%</span>
        </div>
      </div>
    </div>
  );
}