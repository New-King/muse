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

export function Workspace() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [data, setData] = useState<WorkspaceData | null>(null);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    if (!activeId) {
      setData(null);
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

  const handleCreate = async () => {
    try {
      const project = await createProject("未命名项目");
      await refreshProjects();
      setActiveId(project.id);
    } catch (err) {
      setError(err instanceof Error ? err.message : "创建失败");
    }
  };

  const activeProject = projects.find((p) => p.id === activeId) ?? null;

  const handleSaveCanvas = useCallback(
    (elements: unknown[]) => {
      if (!activeId) return;
      saveCanvas(activeId, elements).catch(() => setError("画布保存失败"));
    },
    [activeId],
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
      const updated = await sendMessage(activeId, text);
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
        projects={projects}
        activeId={activeId}
        onSelect={setActiveId}
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
