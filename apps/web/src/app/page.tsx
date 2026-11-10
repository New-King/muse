import { Workspace } from "@/components/workspace";
import { listProjects } from "@/lib/api";

export default async function Page() {
  const projects = await listProjects().catch(() => []);
  return <Workspace projects={projects} />;
}
