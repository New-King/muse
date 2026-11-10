export const APP_NAME = "My Lovart";

/** 服务端 → 客户端的事件，WebSocket 复用同一套定义。 */
export type ServerEvent =
  | { type: "token"; runId: string; text: string }
  | { type: "tool.start"; runId: string; tool: string; input: unknown }
  | { type: "tool.end"; runId: string; tool: string; ok: boolean; output?: unknown }
  | { type: "canvas.sync"; projectId: string }
  | { type: "run.completed"; runId: string }
  | { type: "run.failed"; runId: string; message: string };

/** 客户端 → 服务端。 */
export type ClientEvent = { type: "agent.run"; projectId: string; sessionId: string; text: string };
