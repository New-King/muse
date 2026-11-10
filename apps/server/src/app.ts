import Fastify from "fastify";
import { APP_NAME } from "@my-lovart/shared";

export function buildApp() {
  const app = Fastify({ logger: true });

  app.get("/health", async () => ({
    ok: true,
    name: APP_NAME,
    uptime: Math.round(process.uptime()),
  }));

  return app;
}
