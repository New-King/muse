export function HazeCanvas() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[10%] -top-[16%] h-[620px] w-[620px] rounded-full bg-[#c8622f]/26 blur-[110px]" />
      <div className="absolute left-[4%] top-[18%] h-[520px] w-[460px] rounded-[64px] bg-[#f2e8d6]/70 blur-[90px]" />
      <div className="absolute left-[26%] top-[44%] h-[380px] w-[380px] rounded-full bg-[#2f5d50]/22 blur-[100px]" />
      <div className="absolute -right-[14%] -bottom-[26%] h-[700px] w-[700px] rounded-full bg-[#dfe7df]/80 blur-[120px]" />
      <div className="absolute right-[6%] top-[6%] h-[460px] w-[420px] rounded-full bg-[#f5efe2]/70 blur-[110px]" />

      {/* 一条极淡的弧线，给画面一点结构 */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="none">
        <path
          d="M-240,1010 C260,780 560,300 1500,150"
          stroke="#2f5d50"
          strokeOpacity="0.07"
          strokeWidth="1"
        />
        <path
          d="M-240,1080 C300,860 640,420 1500,300"
          stroke="#c8622f"
          strokeOpacity="0.05"
          strokeWidth="1"
        />
      </svg>

      {/* 极细颗粒，让大面积渐变有纸感而不是塑料感 */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />
    </div>
  );
}
