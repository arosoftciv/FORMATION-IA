import React from "react";
import { evolvePath } from "@remotion/paths";

/** Pictogrammes vectoriels tracés progressivement (stroke draw-on). */
const PATHS: Record<string, string[]> = {
  camera: [
    "M20 46 L20 112 Q20 120 28 120 L132 120 Q140 120 140 112 L140 46 Q140 38 132 38 L108 38 L98 24 L62 24 L52 38 L28 38 Q20 38 20 46 Z",
    "M80 56 A24 24 0 1 1 79.9 56 Z",
  ],
  actor: [
    "M80 22 A22 22 0 1 1 79.9 22 Z",
    "M34 132 Q34 82 80 82 Q126 82 126 132",
  ],
  decor: [
    "M18 128 L62 64 L88 100 L108 74 L142 128 Z",
    "M118 30 A12 12 0 1 1 117.9 30 Z",
  ],
  play: ["M60 40 L120 80 L60 120 Z"],
  check: ["M30 82 L64 114 L132 44"],
  chat: ["M24 34 Q24 22 36 22 L124 22 Q136 22 136 34 L136 98 Q136 110 124 110 L64 110 L38 134 L42 110 L36 110 Q24 110 24 98 Z"],
  bolt: ["M92 16 L40 92 L78 92 L66 144 L122 64 L84 64 Z"],
  star: ["M80 18 L98 60 L142 62 L108 90 L120 134 L80 110 L40 134 L52 90 L18 62 L62 60 Z"],
};

export const DrawIcon: React.FC<{
  name: keyof typeof PATHS | string;
  progress: number; // 0..1
  size?: number;
  color?: string;
  stroke?: number;
  fill?: string;
  fillOpacity?: number;
}> = ({ name, progress, size = 160, color = "#fff", stroke = 7, fill, fillOpacity = 0 }) => {
  const paths = PATHS[name] ?? [];
  return (
    <svg width={size} height={size} viewBox="0 0 160 160" style={{ overflow: "visible" }}>
      {paths.map((d, i) => {
        const p = Math.max(0, Math.min(1, progress * paths.length - i));
        const evo = evolvePath(p, d);
        return (
          <path
            key={i}
            d={d}
            fill={fill ?? "none"}
            fillOpacity={fill ? fillOpacity : 0}
            stroke={color}
            strokeWidth={stroke}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={evo.strokeDasharray}
            strokeDashoffset={evo.strokeDashoffset}
          />
        );
      })}
    </svg>
  );
};
