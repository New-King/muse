type Props = { className?: string };

/** 首页右侧的「作品」：一张真的排版海报，而不是占位框 */
export function PosterArt({ className = "" }: Props) {
  return (
    <div className={className} aria-hidden>
      <div className="mb-5 flex items-center justify-between px-1">
        <span className="font-mono text-[9px] tracking-[0.16em] text-faint">POSTER / 01</span>
        <span className="font-mono text-[9px] tracking-[0.16em] text-faint">297 × 420 MM</span>
      </div>

      <div className="poster-shadow relative h-[456px] w-[340px] bg-[#f7f0e3]">
        <div className="absolute inset-x-0 top-0 h-[46%] bg-[#c8622f]" />

        <div className="absolute inset-x-0 top-[46%] h-[2px] bg-[#c8622f]/70" />

        <div className="absolute left-8 top-[52%]">
          <p className="font-serif text-[38px] leading-[1.16] tracking-[0.02em] text-[#231d17]">
            秋日
            <br />
            市集
          </p>
        </div>

        <div className="absolute right-8 top-[62%] max-w-[104px] text-right">
          <p className="text-[8.5px] leading-[1.75] tracking-[0.06em] text-[#231d17]/60">
            十月十八至二十
            <br />
            西岸艺术公园
            <br />
            免票入场
          </p>
        </div>

        <p className="absolute bottom-6 left-8 font-mono text-[7.5px] tracking-[0.2em] text-[#231d17]/45">
          10.18 — 10.20
        </p>

        <div className="absolute -bottom-7 -right-6 size-[112px] rounded-full bg-[#2f5d50]" />
      </div>
    </div>
  );
}
