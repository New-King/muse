import type { FastifyInstance } from "fastify";
import { requireUserId } from "../lib/auth.js";
import { LlmError } from "../lib/llm.js";
import { WorkspaceInputError, createWorkspaceService } from "../features/workspace/workspace.service.js";

type Params = { projectId: string };

export function registerWorkspaceRoutes(app: FastifyInstance) {
  const service = createWorkspaceService();

  app.get<{ Params: Params }>("/workspace/:projectId", async (request) => {
    await requireUserId(request);
    return service.get(request.params.projectId);
  });

  app.put<{ Params: Params; Body: { elements?: unknown } }>(
    "/workspace/:projectId/canvas",
    async (request, reply) => {
      try {
        await requireUserId(request);
        service.saveCanvas(request.params.projectId, request.body?.elements ?? []);
        return reply.code(204).send();
      } catch (err) {
        if (err instanceof WorkspaceInputError) return reply.code(400).send({ error: err.message });
        throw err;
      }
    },
  );

  app.post<{ Params: Params; Body: { text?: unknown } }>(
    "/workspace/:projectId/messages",
    async (request, reply) => {
      try {
        await requireUserId(request);
        return await service.sendMessage(request.params.projectId, request.body?.text);
      } catch (err) {
        if (err instanceof WorkspaceInputError) return reply.code(400).send({ error: err.message });
        if (err instanceof LlmError) return reply.code(502).send({ error: err.message });
        throw err;
      }
    },
  );
}