import cors from "@fastify/cors";
import Fastify from "fastify";
import { APP_NAME } from "@my-lovart/shared";
import { env } from "./lib/env.js";
import { registerProjectRoutes } from "./http/projects.js";
import { registerWorkspaceRoutes } from "./http/workspace.js";
import {
  createMemoryProjectsRepository,
  createSupabaseProjectsRepository,
} from "./features/projects/projects.repository.js";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.register(cors, { origin: env.webOrigins });

  app.get("/health", async () => ({
    ok: true,
    name: APP_NAME,
    store: env.projectsStore,
    uptime: Math.round(process.uptime()),
  }));

  const repo =
    env.projectsStore === "supabase" ? createSupabaseProjectsRepository() : createMemoryProjectsRepository();

  if (env.projectsStore === "memory") {
    app.log.warn("PROJECTS_STORE=memory：数据存在进程内存里，重启即清空");
  }

  registerProjectRoutes(app, repo);
  registerWorkspaceRoutes(app);

  return app;
}
