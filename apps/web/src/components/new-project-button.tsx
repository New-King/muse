"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { createProject } from "@/lib/api";

export function NewProjectButton() {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function onClick() {
    if (busy) return;
    setBusy(true);
    try {
      await createProject("未命名项目");
      router.refresh();
    } catch (err) {
      console.error(err);
    } finally {
      setBusy(false);
    }
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={busy}
      className="mx-3 mt-1 flex h-8 items-center gap-2 rounded-lg px-2.5 text-[13px] text-muted transition-colors hover:bg-surface hover:text-ink disabled:opacity-50"
    >
      <Plus className="size-3.5" strokeWidth={2} />
      {busy ? "创建中…" : "新建项目"}
    </button>
  );
}
