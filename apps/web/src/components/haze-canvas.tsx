export function HazeCanvas() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[10%] -top-[18%] h-[820px] w-[860px] rounded-full bg-white/85 blur-[130px]" />
      <div className="absolute -right-[18%] bottom-[-28%] h-[760px] w-[760px] rounded-full bg-white/70 blur-[150px]" />

      {/* 左侧汇入、右侧散开的细线：整页唯一的图形元素 */}
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 900"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <linearGradient id="in-left" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1d1d1f" stopOpacity="0" />
            <stop offset="55%" stopColor="#1d1d1f" stopOpacity="0.55" />
            <stop offset="100%" stopColor="#1d1d1f" stopOpacity="1" />
          </linearGradient>
          <linearGradient id="out-right" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#1d1d1f" stopOpacity="1" />
            <stop offset="70%" stopColor="#1d1d1f" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#1d1d1f" stopOpacity="0" />
          </linearGradient>
        </defs>

        <g strokeWidth="1" strokeLinecap="round" stroke="url(#in-left)" strokeOpacity="0.16">
          <path d="M-160,1120 C90,1040 250,880 400,760" />
          <path d="M-160,1000 C90,970 260,860 400,760" />
          <path d="M-160,860 C80,860 250,810 400,760" />
          <path d="M-160,640 C80,700 250,730 400,760" />
          <path d="M150,1160 C230,1040 320,860 400,760" />
        </g>

        <g strokeWidth="1" strokeLinecap="round" stroke="url(#out-right)" strokeOpacity="0.18">
          <path d="M400,760 C700,720 1000,650 1560,580" />
        </g>

        <g fill="#1d1d1f">
          <circle cx="400" cy="760" r="3" opacity="0.3" />
          <circle cx="580" cy="740" r="2.4" opacity="0.22" />
          <circle cx="740" cy="720" r="2.4" opacity="0.2" />
          <circle cx="900" cy="700" r="2.2" opacity="0.16" />
          <circle cx="1060" cy="680" r="2" opacity="0.12" />
          <circle cx="290" cy="858" r="2.2" opacity="0.16" />
          <circle cx="200" cy="948" r="2" opacity="0.12" />
        </g>
      </svg>

      {/* 交点处一团柔光 */}
      <div className="absolute left-[400px] top-[760px] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/75 blur-[80px]" />

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