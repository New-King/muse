export function BackgroundArt() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -left-[15%] -top-[20%] h-[75%] w-[80%] rounded-full bg-[radial-gradient(circle_at_center,rgba(47,93,80,0.09),transparent_62%)] blur-3xl" />
      <div className="absolute left-[28%] top-[38%] h-[55%] w-[65%] rounded-full bg-[radial-gradient(circle_at_center,rgba(200,98,47,0.07),transparent_68%)] blur-3xl" />
      <div className="absolute -bottom-[25%] left-[10%] h-[60%] w-[70%] rounded-full bg-[radial-gradient(circle_at_center,rgba(23,23,26,0.04),transparent_70%)] blur-3xl" />

      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1400 900"
        preserveAspectRatio="none"
        fill="none"
      >
        <path
          d="M-120,700 C240,650 330,300 700,320 C1000,337 1120,600 1500,540"
          stroke="#2F5D50"
          strokeOpacity="0.22"
          strokeWidth="1"
          className="art-line"
        />
        <path
          d="M-120,790 C300,760 440,430 820,450 C1120,467 1220,700 1500,660"
          stroke="#2F5D50"
          strokeOpacity="0.14"
          strokeWidth="1"
          className="art-line art-line-slow"
        />
        <path
          d="M-120,610 C260,580 380,220 760,240 C1060,255 1180,500 1500,430"
          stroke="#C8622F"
          strokeOpacity="0.08"
          strokeWidth="1"
          className="art-line art-line-fast"
        />
      </svg>

      <span className="art-dot absolute left-[18%] top-[62%]" />
      <span className="art-dot art-dot-slow absolute left-[62%] top-[38%]" />
      <span className="art-dot art-dot-fast absolute left-[84%] top-[70%]" />
    </div>
  );
}
