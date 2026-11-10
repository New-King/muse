type Props = { className?: string };

/** 一张排版好的海报，作为画布上的「作品」；内部尺寸跟随容器等比缩放 */
export function PosterArt({ className = "" }: Props) {
  return (
    <div className={`@container relative h-full w-full bg-[#f7f0e3] ${className}`} aria-hidden>
      <div className="absolute inset-x-0 top-0 h-[46%] bg-[#c8622f]" />

      <div className="absolute left-[9%] top-[50%]">
        <p className="font-serif text-[9cqw] leading-[1.16] tracking-[0.02em] text-[#231d17]">
          秋日
          <br />
          市集
        </p>
      </div>

      <div className="absolute right-[7%] top-[57%] max-w-[40%] text-right">
        <p className="text-[3.4cqw] leading-[1.75] tracking-[0.04em] text-[#231d17]/55">
          十月十八至二十
          <br />
          西岸艺术公园
          <br />
          免票入场
        </p>
      </div>

      <p className="absolute bottom-[7%] left-[9%] font-mono text-[2.8cqw] tracking-[0.18em] text-[#231d17]/45">
        10.18 — 10.20
      </p>

      <div className="absolute bottom-[5%] right-[6%] aspect-square w-[28%] rounded-full bg-[#2f5d50]" />
    </div>
  );
}
