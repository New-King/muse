import { CanvasStage } from "./canvas-stage";
import { ChatPanel } from "./chat-panel";
import { ProjectRail } from "./project-rail";
import type { Project } from "@/lib/api";

export function Workspace({ projects }: { projects: Project[] }) {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-canvas">
      <ProjectRail projects={projects} />
      <CanvasStage />
      <ChatPanel />
    </div>
  );
}
