export function HazeCanvas() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 顶部一片极淡的白光，只负责把标题托起来 */}
      <div className="absolute left-1/2 top-[-30%] h-[900px] w-[1100px] -translate-x-1/2 rounded-full bg-white/70 blur-[120px]" />
      <div className="absolute -right-[20%] bottom-[-30%] h-[800px] w-[800px] rounded-full bg-white/50 blur-[140px]" />

      {/* 一条几乎看不见的弧线，给大面积留白一点结构 */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="none"
      >
        <path d="M-260,1000 C280,760 600,300 1520,160" stroke="#1d1d1f" strokeOpacity="0.05" strokeWidth="1" />
      </svg>

      {/* 颗粒：让平面不显得像塑料 */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
