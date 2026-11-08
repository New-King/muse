import { CanvasStage } from "./canvas-stage";
import { ChatPanel } from "./chat-panel";
import { ProjectRail } from "./project-rail";

export function Workspace() {
  return (
    <div className="flex h-dvh w-full overflow-hidden bg-canvas">
      <ProjectRail />
      <CanvasStage />
      <ChatPanel />
    </div>
  );
}
