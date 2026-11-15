import React from "react";

/**
 * Flou de mouvement directionnel (« shutter » simulé).
 * Rend l'objet plusieurs fois le long de sa trajectoire récente :
 * position(t) est évaluée à des sous-frames passées, opacité décroissante.
 * Le flou n'affecte QUE l'objet en mouvement, jamais la composition.
 */
export const GhostTrail: React.FC<{
  frame: number;
  pos: (f: number) => { x: number; y: number; r?: number; s?: number };
  samples?: number;
  shutter?: number; // en frames (0.5 = obturateur 180°)
  children: React.ReactNode;
  enabled?: boolean;
}> = ({ frame, pos, samples = 10, shutter = 1.2, children, enabled = true }) => {
  const n = enabled ? samples : 1;
  return (
    <>
      {Array.from({ length: n }).map((_, i) => {
        const t = n === 1 ? 0 : (i / (n - 1)) * shutter;
        const p = pos(frame - t);
        const o = n === 1 ? 1 : Math.pow(1 - i / n, 1.6) * (2.2 / n) + (i === 0 ? 0.35 : 0);
        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              transform: `translate(${p.x}px, ${p.y}px) rotate(${p.r ?? 0}deg) scale(${p.s ?? 1})`,
              opacity: Math.min(1, o),
            }}
          >
            {children}
          </div>
        );
      })}
    </>
  );
};
