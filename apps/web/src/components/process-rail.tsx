const STEPS = [
  { key: "s1", label: "描述" },
  { key: "s2", label: "生成" },
  { key: "s3", label: "成稿" },
];

/** 左缘的创作流程刻度：一根竖线，一个游标，三站依次点亮，循环播放 */
export function ProcessRail({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden className={`process-rail ${className}`}>
      <div className="pr-track" />
      <div className="pr-fill" />

      <span className="pr-node pr-node-1" />
      <span className="pr-node pr-node-2" />
      <span className="pr-node pr-node-3" />

      <span className="pr-label pr-label-1">描述</span>
      <span className="pr-label pr-label-2">生成</span>
      <span className="pr-label pr-label-3">成稿</span>

      <span className="pr-cursor" />
    </div>
  );
}
