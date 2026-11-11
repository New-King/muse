import { HazeCanvas } from "@/components/haze-canvas";
import { RailToc } from "@/components/ui/rail-toc";
import { LoginForm } from "@/components/login-form";

const RAIL_ITEMS = [
  { id: "step-1", label: "描述需求", depth: 0 },
  { id: "step-2", label: "拆解意图", depth: 1 },
  { id: "step-3", label: "生成图像", depth: 1 },
  { id: "step-4", label: "生成视频", depth: 2 },
  { id: "step-5", label: "排版结构", depth: 2 },
  { id: "step-6", label: "导出成稿", depth: 0 },
];

export default function Home() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-canvas">
      <HazeCanvas />
      <div className="absolute left-2 top-[46%] z-0 hidden xl:block">
        <RailToc title="创作流程" items={RAIL_ITEMS} autoLoop />
      </div>

      <div className="relative z-10 mx-auto grid min-h-dvh w-full max-w-[1040px] gap-12 px-7 pb-24 pt-10 lg:grid-cols-[1fr_420px] lg:items-stretch lg:gap-10 lg:px-14 lg:pb-24 lg:pt-14">
        <div className="flex flex-col lg:h-full">
          <div className="flex items-center gap-2.5">
            <span className="grid size-[28px] place-items-center rounded-[8px] bg-ink text-[12px] font-semibold text-white">
              m
            </span>
            <span className="text-[17px] font-medium tracking-[-0.02em] text-ink">mylovart</span>
          </div>

          <div className="flex flex-1 flex-col justify-center py-16 lg:py-0 lg:pb-[166px]">
            <h1 className="max-w-[600px] text-[clamp(40px,5.6vw,84px)] font-light leading-[1.1] tracking-[-0.04em] text-ink">
              把想法，
              <br />
              做成作品。
            </h1>

            <p className="mt-8 max-w-[330px] text-[13.5px] leading-[1.95] text-muted">
              图像、视频、版式，在同一张画布上完成。
            </p>

          </div>
        </div>

        <div className="flex w-full items-center">
          <div className="w-full rounded-2xl border border-line bg-surface p-8 shadow-[0_24px_70px_-34px_rgba(24,24,27,0.26)] lg:p-10">
            <div className="flex items-baseline justify-between">
              <h2 className="text-[20px] font-medium tracking-tight text-ink">登录</h2>
              <span className="font-mono text-[9px] tracking-[0.18em] text-faint">SIGN IN</span>
            </div>
            <p className="mt-2 mb-8 text-[13px] text-muted">使用你的账号进入工作台。</p>

            <LoginForm />

            <div className="mt-8 border-t border-line pt-6">
              <p className="text-[11.5px] leading-relaxed text-faint">
                目前未开放注册，仅限已有账号登录。
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 mx-auto flex w-full max-w-[1040px] items-center justify-between px-7 pb-8 lg:px-14 lg:pb-10">
        <span className="font-mono text-[9px] tracking-[0.2em] text-faint">
          MYLOVART — AI CREATIVE CANVAS
        </span>
        <span className="font-mono text-[9px] tracking-[0.2em] text-faint">© 2026</span>
      </div>
    </div>
  );
}