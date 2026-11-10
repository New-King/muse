import { randomUUID } from "node:crypto";
import { getDb } from "../../db/supabase.js";

export type Project = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type ProjectsRepository = {
  list(userId: string): Promise<Project[]>;
  create(userId: string, name: string): Promise<Project>;
  rename(userId: string, id: string, name: string): Promise<Project | null>;
  remove(userId: string, id: string): Promise<boolean>;
};

/** 内存实现：没有数据库时也能把整条链路跑通，重启清空。 */
export function createMemoryProjectsRepository(): ProjectsRepository {
  const rows = new Map<string, Project & { userId: string }>();

  return {
    async list(userId) {
      return [...rows.values()]
        .filter((r) => r.userId === userId)
        .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
        .map(({ userId: _ignored, ...p }) => p);
    },

    async create(userId, name) {
      const now = new Date().toISOString();
      const row = { id: randomUUID(), userId, name, createdAt: now, updatedAt: now };
      rows.set(row.id, row);
      const { userId: _ignored, ...project } = row;
      return project;
    },

    async rename(userId, id, name) {
      const row = rows.get(id);
      if (!row || row.userId !== userId) return null;
      row.name = name;
      row.updatedAt = new Date().toISOString();
      const { userId: _ignored, ...project } = row;
      return project;
    },

    async remove(userId, id) {
      const row = rows.get(id);
      if (!row || row.userId !== userId) return false;
      rows.delete(id);
      return true;
    },
  };
}

type ProjectRow = {
  id: string;
  name: string;
  created_at: string;
  updated_at: string;
};

const toProject = (row: ProjectRow): Project => ({
  id: row.id,
  name: row.name,
  createdAt: row.created_at,
  updatedAt: row.updated_at,
});

/** Supabase 实现：走 service_role，user_id 过滤写在每一处查询上。 */
export function createSupabaseProjectsRepository(): ProjectsRepository {
  const db = () => getDb();

  return {
    async list(userId) {
      const { data, error } = await db()
        .from("projects")
        .select("id, name, created_at, updated_at")
        .eq("user_id", userId)
        .order("updated_at", { ascending: false });
      if (error) throw error;
      return (data as ProjectRow[]).map(toProject);
    },

    async create(userId, name) {
      const { data, error } = await db()
        .from("projects")
        .insert({ user_id: userId, name })
        .select("id, name, created_at, updated_at")
        .single();
      if (error) throw error;
      return toProject(data as ProjectRow);
    },

    async rename(userId, id, name) {
      const { data, error } = await db()
        .from("projects")
        .update({ name })
        .eq("id", id)
        .eq("user_id", userId)
        .select("id, name, created_at, updated_at")
        .maybeSingle();
      if (error) throw error;
      return data ? toProject(data as ProjectRow) : null;
    },

    async remove(userId, id) {
      const { error, count } = await db()
        .from("projects")
        .delete({ count: "exact" })
        .eq("id", id)
        .eq("user_id", userId);
      if (error) throw error;
      return (count ?? 0) > 0;
    },
  };
}
