import { randomUUID } from "node:crypto";

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type Workspace = {
  projectId: string;
  elements: unknown[];
  messages: ChatMessage[];
};

const workspaces = new Map<string, Workspace>();

export function ensureWorkspace(projectId: string): Workspace {
  let ws = workspaces.get(projectId);
  if (!ws) {
    ws = { projectId, elements: [], messages: [] };
    workspaces.set(projectId, ws);
  }
  return ws;
}

export function getWorkspace(projectId: string): Workspace {
  return ensureWorkspace(projectId);
}

export function saveElements(projectId: string, elements: unknown[]): Workspace {
  const ws = ensureWorkspace(projectId);
  ws.elements = elements;
  return ws;
}

export function appendMessage(
  projectId: string,
  role: ChatMessage["role"],
  content: string,
): ChatMessage {
  const ws = ensureWorkspace(projectId);
  const message: ChatMessage = {
    id: randomUUID(),
    role,
    content,
    createdAt: new Date().toISOString(),
  };
  ws.messages.push(message);
  return message;
}

export const MAX_CONTEXT_MESSAGES = 20;
