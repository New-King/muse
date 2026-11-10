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
          <path d="M-160,1100 C80,1000 220,830 340,700" />
          <path d="M-160,960 C80,930 230,800 340,700" />
          <path d="M-160,800 C70,800 220,750 340,700" />
          <path d="M-160,540 C70,620 220,665 340,700" />
          <path d="M120,1150 C190,980 270,800 340,700" />
        </g>

        <g strokeWidth="1" strokeLinecap="round" stroke="url(#out-right)" strokeOpacity="0.18">
          <path d="M340,700 C640,660 960,600 1560,540" />
        </g>

        <g fill="#1d1d1f">
          <circle cx="340" cy="700" r="3" opacity="0.3" />
          <circle cx="520" cy="684" r="2.4" opacity="0.22" />
          <circle cx="680" cy="668" r="2.4" opacity="0.2" />
          <circle cx="840" cy="652" r="2.2" opacity="0.16" />
          <circle cx="1000" cy="636" r="2" opacity="0.12" />
          <circle cx="240" cy="782" r="2.2" opacity="0.16" />
          <circle cx="150" cy="870" r="2" opacity="0.12" />
        </g>
      </svg>

      {/* 交点处一团柔光 */}
      <div className="absolute left-[340px] top-[700px] h-[340px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/75 blur-[80px]" />

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