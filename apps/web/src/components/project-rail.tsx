import { Plus } from "lucide-react";

const projects = [
  { id: "p1", name: "秋季新品海报", time: "刚刚", active: true },
  { id: "p2", name: "个人主页草图", time: "昨天" },
  { id: "p3", name: "读书笔记", time: "3 天前" },
];

export function ProjectRail() {
  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-line bg-canvas">
      <div className="flex h-12 items-center gap-2 px-4">
        <span className="grid size-[22px] place-items-center rounded-[7px] bg-ink text-[11px] font-semibold text-canvas">
          m
        </span>
        <span className="text-[13px] font-medium tracking-tight">mylovart</span>
      </div>

      <button
        type="button"
        className="mx-3 mt-1 flex h-8 items-center gap-2 rounded-lg px-2.5 text-[13px] text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <Plus className="size-3.5" strokeWidth={2} />
        新建画布
      </button>

      <div className="px-4 pt-6 pb-1.5 text-[11px] tracking-[0.08em] text-faint">最近</div>

      <nav className="flex-1 px-2">
        {projects.map((p) => (
          <a
            key={p.id}
            href="#"
            className={
              p.active
                ? "mb-0.5 flex items-center gap-2 rounded-lg border border-line bg-surface px-2 py-[7px] text-[13px]"
                : "mb-0.5 flex items-center gap-2 rounded-lg px-2 py-[7px] text-[13px] text-muted transition-colors hover:bg-surface/70 hover:text-ink"
            }
          >
            <span className="min-w-0 flex-1 truncate">{p.name}</span>
            <span className="text-[11px] text-faint">{p.time}</span>
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-2 border-t border-line px-3 py-3">
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-medium text-accent">
          N
        </span>
        <span className="truncate text-[12px] text-muted">newking@example.com</span>
      </div>
    </aside>
  );
}
