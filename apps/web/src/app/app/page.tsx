import { RequireAuth } from "@/components/require-auth";
import { Workspace } from "@/components/workspace";

export default function Page() {
  return (
    <RequireAuth>
      <Workspace />
    </RequireAuth>
  );
}
