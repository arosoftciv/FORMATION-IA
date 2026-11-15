import React from "react";
import { useCurrentFrame } from "remotion";
import { C, E, FONT_TITLE, tw } from "../theme";

type Common = {
  start: number;
  size?: number;
  color?: string;
  weight?: number;
  stagger?: number;
  dur?: number;
  style?: React.CSSProperties;
  align?: "center" | "left";
  exit?: number; // frame de sortie
  highlight?: string[]; // mots en cyan
  highlightColor?: string;
  lineHeight?: number;
  blur?: boolean;
};

/**
 * Typographie cinétique : chaque mot sort d'un masque (overflow hidden)
 * avec un easing expo et un léger flou de mouvement vertical.
 * Lignes séparées par "\n".
 */
export const Words: React.FC<Common & { text: string }> = ({
  text,
  start,
  size = 96,
  color = C.white,
  weight = 900,
  stagger = 3,
  dur = 18,
  style,
  align = "center",
  exit,
  highlight = [],
  highlightColor = C.cyan,
  lineHeight = 1.02,
  blur = true,
}) => {
  const f = useCurrentFrame();
  const lines = text.split("\n");
  let k = 0;
  return (
    <div style={{ fontFamily: FONT_TITLE, fontWeight: weight, fontSize: size, color, lineHeight, textAlign: align, letterSpacing: -0.02 * size, ...style }}>
      {lines.map((line, li) => (
        <div key={li} style={{ display: "flex", flexWrap: "wrap", justifyContent: align === "center" ? "center" : "flex-start", gap: `0 ${size * 0.26}px` }}>
          {line.split(" ").map((w, wi) => {
            const s = start + k * stagger;
            k++;
            const p = tw(f, s, dur, 0, 1, E.out);
            const v = tw(f, s, dur * 0.5, 1, 0, E.out); // vitesse ≈ flou
            const out = exit !== undefined ? tw(f, exit + (k - 1) * 1.5, 12, 0, 1, E.in) : 0;
            const hl = highlight.some((h) => w.replace(/[.,!?…]/g, "").toUpperCase() === h.toUpperCase());
            return (
              <span key={wi} style={{ display: "inline-block", overflow: "hidden", paddingBottom: size * 0.08, marginBottom: -size * 0.08 }}>
                <span
                  style={{
                    display: "inline-block",
                    transform: `translateY(${(1 - p) * 110 - out * 110}%) skewY(${(1 - p) * 6}deg)`,
                    filter: blur ? `blur(${v * 6 + out * 4}px)` : undefined,
                    color: hl ? highlightColor : undefined,
                  }}
                >
                  {w}
                </span>
              </span>
            );
          })}
        </div>
      ))}
    </div>
  );
};

/** Lettre par lettre avec ressort (pour les mots-clés géants) */
export const Letters: React.FC<Common & { text: string; spread?: number }> = ({
  text,
  start,
  size = 180,
  color = C.white,
  weight = 900,
  stagger = 2,
  dur = 20,
  style,
  spread = 0,
}) => {
  const f = useCurrentFrame();
  const chars = [...text];
  return (
    <div style={{ fontFamily: FONT_TITLE, fontWeight: weight, fontSize: size, color, display: "flex", justifyContent: "center", letterSpacing: -0.03 * size, lineHeight: 1, ...style }}>
      {chars.map((ch, i) => {
        const p = tw(f, start + i * stagger, dur, 0, 1, E.back);
        const v = tw(f, start + i * stagger, dur * 0.4, 1, 0, E.out);
        const mid = (chars.length - 1) / 2;
        return (
          <span
            key={i}
            style={{
              display: "inline-block",
              whiteSpace: "pre",
              opacity: tw(f, start + i * stagger, 6, 0, 1, E.linear),
              transform: `translate(${(i - mid) * spread * (1 - p)}px, ${(1 - p) * size * 0.9}px) scale(${0.4 + 0.6 * p}) rotate(${(1 - p) * (i % 2 ? 14 : -14)}deg)`,
              filter: `blur(${v * 8}px)`,
            }}
          >
            {ch}
          </span>
        );
      })}
    </div>
  );
};

/** Petite étiquette (chips, labels) */
export const Label: React.FC<{ children: React.ReactNode; dark?: boolean; style?: React.CSSProperties }> = ({ children, dark = true, style }) => (
  <div
    style={{
      fontFamily: FONT_TITLE,
      fontWeight: 700,
      fontSize: 30,
      letterSpacing: 6,
      textTransform: "uppercase",
      color: dark ? C.cyan : C.royal,
      ...style,
    }}
  >
    {children}
  </div>
);
