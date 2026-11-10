export type Project = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
};

export type WorkspaceData = {
  projectId: string;
  elements: unknown[];
  messages: ChatMessage[];
};

const base = process.env.NEXT_PUBLIC_SERVER_BASE_URL ?? "http://127.0.0.1:3001";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${base}${path}`, {
    ...init,
    headers: { "content-type": "application/json", ...init?.headers },
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`${init?.method ?? "GET"} ${path} ${res.status} ${body}`);
  }
  return res.status === 204 ? (undefined as T) : ((await res.json()) as T);
}

export const listProjects = () => request<Project[]>("/projects");

export const createProject = (name: string) =>
  request<Project>("/projects", { method: "POST", body: JSON.stringify({ name }) });

export const getWorkspace = (projectId: string) =>
  request<WorkspaceData>(`/workspace/${projectId}`);

export const saveCanvas = (projectId: string, elements: unknown[]) =>
  request<void>(`/workspace/${projectId}/canvas`, {
    method: "PUT",
    body: JSON.stringify({ elements }),
  });

export const sendMessage = (projectId: string, text: string) =>
  request<WorkspaceData>(`/workspace/${projectId}/messages`, {
    method: "POST",
    body: JSON.stringify({ text }),
  });
