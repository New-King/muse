import type { ProjectsRepository } from "./projects.repository.js";

export const NAME_MAX = 60;

export class ProjectNameError extends Error {}

export function normalizeProjectName(input: unknown): string {
  const name = typeof input === "string" ? input.trim() : "";
  if (!name) throw new ProjectNameError("项目名不能为空");
  if (name.length > NAME_MAX) throw new ProjectNameError(`项目名不能超过 ${NAME_MAX} 个字符`);
  return name;
}

export function createProjectsService(repo: ProjectsRepository) {
  return {
    list: (userId: string) => repo.list(userId),

    create: (userId: string, rawName: unknown) => repo.create(userId, normalizeProjectName(rawName)),

    rename: (userId: string, id: string, rawName: unknown) =>
      repo.rename(userId, id, normalizeProjectName(rawName)),

    remove: (userId: string, id: string) => repo.remove(userId, id),
  };
}
