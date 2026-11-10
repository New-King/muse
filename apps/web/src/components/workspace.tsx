"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CanvasStage } from "./canvas-stage";
import { ChatPanel } from "./chat-panel";
import { ProjectRail } from "./project-rail";
import {
  createProject,
  getWorkspace,
  listProjects,
  saveCanvas,
  sendMessage,
  type Project,
  type WorkspaceData,
} from "@/lib/api";

const DRAFT_PREFIX = "draft-";

export function Workspace() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [draftId, setDraftId] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [data, setData] = useState<WorkspaceData | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const skipLoadFor = useRef<string | null>(null);

  const refreshProjects = useCallback(async () => {
    const list = await listProjects().catch(() => []);
    setProjects(list);
    return list;
  }, []);

  useEffect(() => {
    refreshProjects().then((list) => {
      setActiveId((prev) => prev ?? list[0]?.id ?? null);
    });
  }, [refreshProjects]);

  // 草稿只在本地存在，切走就丢弃；已保存的项目才去拉数据
  useEffect(() => {
    if (!activeId || activeId.startsWith(DRAFT_PREFIX)) return;
    if (skipLoadFor.current === activeId) {
      skipLoadFor.current = null;
      return;
    }
    let cancelled = false;
    setData(null);
    getWorkspace(activeId)
      .then((next) => {
        if (!cancelled) setData(next);
      })
      .catch((err) => {
        if (!cancelled) setError(err instanceof Error ? err.message : "加载失败");
      });
    return () => {
      cancelled = true;
    };
  }, [activeId]);

  /** 草稿在第一次真正产生内容时才落库，避免点一下「新建」就多一个空项目 */
  const ensureProject = useCallback(
    async (name?: string): Promise<string> => {
      if (!activeId) throw new Error("没有选中的项目");
      if (!activeId.startsWith(DRAFT_PREFIX)) return activeId;

      const created = await createProject(name ?? "未命名项目");
      setProjects((prev) => [created, ...prev]);
      setDraftId(null);
      skipLoadFor.current = created.id;
      setActiveId(created.id);
      setData((prev) => ({
        projectId: created.id,
        elements: prev?.elements ?? [],
        messages: prev?.messages ?? [],
      }));
      return created.id;
    },
    [activeId],
  );

  const handleCreate = () => {
    if (draftId) {
      setActiveId(draftId);
      return;
    }
    const id = `${DRAFT_PREFIX}${crypto.randomUUID()}`;
    setDraftId(id);
    setActiveId(id);
    setData({ projectId: id, elements: [], messages: [] });
  };

  const handleSelect = (id: string) => {
    if (draftId && id !== draftId) setDraftId(null);
    setActiveId(id);
  };

  const draft: Project | null = draftId
    ? {
        id: draftId,
        name: "未命名项目",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        isDraft: true,
      }
    : null;

  const allProjects = draft ? [draft, ...projects] : projects;
  const activeProject = allProjects.find((p) => p.id === activeId) ?? null;

  const handleSaveCanvas = useCallback(
    async (elements: unknown[]) => {
      if (!activeId) return;
      // 草稿上什么都没画，就不必为一个空画布建项目
      if (activeId.startsWith(DRAFT_PREFIX) && elements.length === 0) return;
      try {
        const projectId = await ensureProject();
        await saveCanvas(projectId, elements);
      } catch {
        setError("画布保存失败");
      }
    },
    [activeId, ensureProject],
  );

  const handleSend = async (text: string) => {
    if (!activeId || sending) return;
    setSending(true);
    setError(null);

    const optimistic = {
      id: `local-${Date.now()}`,
      role: "user" as const,
      content: text,
      createdAt: new Date().toISOString(),
    };
    setData((prev) => (prev ? { ...prev, messages: [...prev.messages, optimistic] } : prev));

    try {
      // 第一句话就是项目名，避免左栏堆一排「未命名项目」
      const projectId = await ensureProject(text.slice(0, 18));
      const updated = await sendMessage(projectId, text);
      setData(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "发送失败");
      setData((prev) =>
        prev ? { ...prev, messages: prev.messages.filter((m) => m.id !== optimistic.id) } : prev,
      );
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-canvas">
      <ProjectRail
        projects={allProjects}
        activeId={activeId}
        onSelect={handleSelect}
        onCreate={handleCreate}
      />
      <CanvasStage
        project={activeProject}
        elements={data?.elements ?? []}
        loaded={data !== null}
        onSave={handleSaveCanvas}
      />
      <ChatPanel
        project={activeProject}
        messages={data?.messages ?? []}
        sending={sending}
        error={error}
        onSend={handleSend}
      />
    </div>
  );
}
