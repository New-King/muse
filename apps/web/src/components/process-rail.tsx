"use client";

import { useEffect, useMemo, useRef } from "react";

const ROW = 30;
const RAIL_X = 6;
const INDENT = 16;
const LABEL_GAP = 16;

/** 我们的创作过程：一句描述，依次落成图、片、版 */
const ITEMS = [
  { label: "描述需求", depth: 0 },
  { label: "生成图像", depth: 1 },
  { label: "生成视频", depth: 1 },
  { label: "排版", depth: 2 },
  { label: "导出成稿", depth: 0 },
];

type Point = { x: number; y: number };

function buildPath(nodes: Point[]) {
  const points: Point[] = [{ x: nodes[0].x, y: 0 }, nodes[0]];
  for (let i = 1; i < nodes.length; i++) {
    const from = nodes[i - 1];
    const to = nodes[i];
    if (from.x !== to.x) {
      const bend = (to.y - from.y) * 0.3;
      points.push({ x: from.x, y: from.y + bend }, { x: to.x, y: to.y - bend });
    }
    points.push(to);
  }
  return points.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
}

export function ProcessRail({ className = "" }: { className?: string }) {
  const pathRef = useRef<SVGPathElement>(null);
  const progressRef = useRef<SVGPathElement>(null);
  const planeRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<(SVGCircleElement | null)[]>([]);
  const labelRefs = useRef<(HTMLLIElement | null)[]>([]);

  const geo = useMemo(() => {
    const nodes = ITEMS.map((item, i) => ({
      x: RAIL_X + item.depth * INDENT,
      y: i * ROW + ROW / 2,
    }));
    return {
      nodes,
      d: buildPath(nodes),
      width: Math.max(...nodes.map((n) => n.x)) + RAIL_X + 8,
      height: ITEMS.length * ROW,
    };
  }, []);

  useEffect(() => {
    const path = pathRef.current;
    const progress = progressRef.current;
    if (!path || !progress) return;

    const total = path.getTotalLength();
    const nodeLengths = geo.nodes.map((node) => {
      let lo = 0;
      let hi = total;
      for (let i = 0; i < 24; i++) {
        const mid = (lo + hi) / 2;
        if (path.getPointAtLength(mid).y < node.y) lo = mid;
        else hi = mid;
      }
      return hi;
    });

    progress.style.strokeDasharray = `${total}`;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const CYCLE = 9000;
    const FADE = 900;

    const paint = (length: number, opacity: number) => {
      const at = path.getPointAtLength(length);
      const behind = path.getPointAtLength(Math.max(0, length - 1));
      const ahead = path.getPointAtLength(Math.min(total, length + 1));
      const angle =
        (Math.atan2(ahead.y - behind.y, ahead.x - behind.x) * 180) / Math.PI + 90;

      if (planeRef.current) {
        planeRef.current.style.transform = `translate(${at.x - 8}px, ${at.y - 8}px) rotate(${angle}deg)`;
        planeRef.current.style.opacity = String(opacity);
      }
      progress.style.strokeDashoffset = `${total - length}`;

      const covered = nodeLengths.filter((n) => n <= length + 0.5).length;
      nodeRefs.current.forEach((node, i) => {
        if (!node) return;
        const on = i < covered;
        node.setAttribute("fill", on ? "#1d1d1f" : "transparent");
        node.setAttribute("stroke", on ? "#1d1d1f" : "rgba(29,29,31,0.3)");
      });

      labelRefs.current.forEach((label, i) => {
        if (!label) return;
        const on = i < covered;
        label.style.color = on ? "rgba(29,29,31,0.92)" : "rgba(29,29,31,0.4)";
        label.style.fontWeight = on ? "500" : "400";
      });
    };

    if (reduce) {
      paint(total, 0);
      return;
    }

    let raf = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const cycle = (now - start) % CYCLE;
      const t = Math.min(1, cycle / 7000);
      const eased = t * t * (3 - 2 * t);
      const opacity = cycle > CYCLE - FADE ? 1 - (cycle - (CYCLE - FADE)) / FADE : 1;
      paint(total * eased, opacity);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [geo]);

  return (
    <nav aria-hidden className={`w-max ${className}`}>
      <p className="mb-3 flex items-center gap-2 text-[11px] font-medium text-ink/45">
        <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
          <path d="M2 4h12M2 8h8M2 12h10" />
        </svg>
        创作流程
      </p>

      <ul className="relative w-max" style={{ height: geo.height }}>
        <svg
          className="pointer-events-none absolute left-0 top-0 overflow-visible"
          width={geo.width}
          height={geo.height}
          fill="none"
        >
          <path
            ref={pathRef}
            d={geo.d}
            stroke="rgba(29,29,31,0.25)"
            strokeWidth="1.25"
            strokeDasharray="2 5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            ref={progressRef}
            d={geo.d}
            stroke="#1d1d1f"
            strokeWidth="1.25"
            strokeLinejoin="round"
          />
          {geo.nodes.map((node, i) => (
            <circle
              key={i}
              ref={(el) => {
                nodeRefs.current[i] = el;
              }}
              cx={node.x}
              cy={node.y}
              r={3.2}
              strokeWidth="1.25"
              fill="transparent"
              stroke="rgba(29,29,31,0.3)"
            />
          ))}
        </svg>

        <div
          ref={planeRef}
          className="pointer-events-none absolute left-0 top-0 h-4 w-4 text-ink"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4 overflow-visible">
            <path
              d="M12 2 20.5 21 12 17.5 3.5 21z"
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
          </svg>
        </div>

        {ITEMS.map((item, i) => (
          <li
            key={item.label}
            ref={(el) => {
              labelRefs.current[i] = el;
            }}
            className="relative flex items-center whitespace-nowrap pr-4 text-[12px] leading-5"
            style={{ height: ROW, paddingLeft: geo.nodes[i].x + LABEL_GAP, color: "rgba(29,29,31,0.4)" }}
          >
            {item.label}
          </li>
        ))}
      </ul>
    </nav>
  );
}