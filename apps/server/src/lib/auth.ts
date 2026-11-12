import type { FastifyRequest } from "fastify";
import { getDb } from "../db/supabase.js";

export class UnauthorizedError extends Error {}

/** 从 Authorization: Bearer <jwt> 取用户，交给 Supabase 校验 */
export async function requireUserId(request: FastifyRequest): Promise<string> {
  const header = request.headers.authorization ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7).trim() : "";
  if (!token) throw new UnauthorizedError("请先登录");

  const { data, error } = await getDb().auth.getUser(token);
  if (error || !data.user) throw new UnauthorizedError("登录状态已失效");
  return data.user.id;
}

/** 把 401 抛成统一错误 */
export function userIdFor(request: FastifyRequest) {
  return requireUserId(request);
}
