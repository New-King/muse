"use client";

import { Plus } from "lucide-react";
import type { Project } from "@/lib/api";

function relativeTime(iso: string) {
  const diff = Date.now() - new Date(iso).getTime();
  const day = 86_400_000;
  if (diff < 60_000) return "刚刚";
  if (diff < 3_600_000) return `${Math.floor(diff / 60_000)} 分钟前`;
  if (diff < day) return `${Math.floor(diff / 3_600_000)} 小时前`;
  if (diff < day * 2) return "昨天";
  return `${Math.floor(diff / day)} 天前`;
}

type Props = {
  projects: Project[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onLogout: () => void;
};

export function ProjectRail({ projects, activeId, onSelect, onCreate, onLogout }: Props) {
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
        onClick={onCreate}
        className="mx-3 mt-1 flex h-8 items-center gap-2 rounded-lg px-2.5 text-[13px] text-muted transition-colors hover:bg-surface hover:text-ink"
      >
        <Plus className="size-3.5" strokeWidth={2} />
        新建项目
      </button>

      <div className="px-4 pt-6 pb-1.5 text-[11px] tracking-[0.08em] text-faint">项目</div>

      <nav className="flex-1 overflow-y-auto px-2">
        {projects.length === 0 ? (
          <p className="px-2 py-1 text-[13px] leading-relaxed text-faint">
            还没有项目，点上面的「新建项目」开始。
          </p>
        ) : (
          projects.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => onSelect(p.id)}
              className={
                p.id === activeId
                  ? "mb-0.5 flex w-full items-center gap-2 rounded-lg border border-line bg-surface px-2 py-[7px] text-left text-[13px]"
                  : "mb-0.5 flex w-full items-center gap-2 rounded-lg px-2 py-[7px] text-left text-[13px] text-muted transition-colors hover:bg-surface/70 hover:text-ink"
              }
            >
              <span className="min-w-0 flex-1 truncate">{p.name}</span>
              <span className="text-[11px] text-faint">
                {p.isDraft ? "未保存" : relativeTime(p.updatedAt)}
              </span>
            </button>
          ))
        )}
      </nav>

      <button
        type="button"
        onClick={onLogout}
        className="flex items-center gap-2 border-t border-line px-3 py-3 text-left transition-colors hover:bg-surface"
      >
        <span className="grid size-6 shrink-0 place-items-center rounded-full bg-accent-soft text-[11px] font-medium text-accent">
          N
        </span>
        <span className="min-w-0 flex-1 truncate text-[12px] text-muted">退出登录</span>
      </button>
    </aside>
  );
}
