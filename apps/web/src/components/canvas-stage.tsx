"use client";

import dynamic from "next/dynamic";
import { Download, Share2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/api";

const Excalidraw = dynamic(() => import("@excalidraw/excalidraw").then((m) => m.Excalidraw), {
  ssr: false,
  loading: () => <div className="grid h-full place-items-center text-[13px] text-faint">加载画布…</div>,
});

type Props = {
  project: Project | null;
  elements: unknown[];
  loaded: boolean;
  onSave: (elements: unknown[]) => void;
};

export function CanvasStage({ project, elements, loaded, onSave }: Props) {
  const [status, setStatus] = useState<"saved" | "saving">("saved");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  return (
    <main className="flex min-w-0 flex-1 flex-col bg-canvas">
      <header className="flex h-12 shrink-0 items-center justify-between border-b border-line px-4">
        <div className="flex items-baseline gap-2">
          <h1 className="text-[13px] font-medium tracking-tight">{project?.name ?? "未选择项目"}</h1>
          <span className="text-[11px] text-faint">{status === "saving" ? "保存中…" : "已保存"}</span>
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

      <div className="relative flex-1 bg-surface">
        {!project ? (
          <div className="grid h-full place-items-center px-6">
            <p className="text-[13px] text-faint">先在左侧新建一个项目。</p>
          </div>
        ) : !loaded ? (
          <div className="grid h-full place-items-center text-[13px] text-faint">加载画布…</div>
        ) : (
          <Excalidraw
            key={project.id}
            theme="light"
            langCode="zh-CN"
            initialData={{ elements: elements as never[] }}
            onChange={(next: readonly unknown[]) => {
              setStatus("saving");
              if (timer.current) clearTimeout(timer.current);
              timer.current = setTimeout(() => {
                onSave(next as unknown[]);
                setStatus("saved");
              }, 600);
            }}
          />
        )}
      </div>
    </main>
  );
}
