import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { C } from "../theme";

/** Fond bleu nuit premium : dégradé radial + grille + halos lents */
export const NightBg: React.FC<{ hue?: "royal" | "cyan"; grid?: boolean; children?: React.ReactNode }> = ({
  hue = "royal",
  grid = true,
  children,
}) => {
  const f = useCurrentFrame();
  const a = f / 90;
  const accent = hue === "royal" ? "7,59,180" : "7,156,239";
  return (
    <AbsoluteFill style={{ background: `radial-gradient(120% 80% at 50% 35%, #142a5c 0%, ${C.night} 45%, ${C.abyss} 100%)` }}>
      <div
        style={{
          position: "absolute",
          width: 900,
          height: 900,
          left: 90 + Math.sin(a) * 120,
          top: 200 + Math.cos(a * 0.8) * 140,
          borderRadius: "50%",
          background: `radial-gradient(circle, rgba(${accent},0.35), rgba(${accent},0) 65%)`,
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 700,
          height: 700,
          left: 300 + Math.cos(a * 0.7) * 160,
          top: 1100 + Math.sin(a * 0.9) * 120,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(8,108,240,0.25), rgba(8,108,240,0) 65%)",
        }}
      />
      {grid && (
        <AbsoluteFill
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
            backgroundSize: "90px 90px",
            backgroundPosition: `0 ${(f * 0.6) % 90}px`,
            maskImage: "radial-gradient(80% 60% at 50% 45%, black, transparent)",
          }}
        />
      )}
      {children}
    </AbsoluteFill>
  );
};

/** Fond blanc élégant : blanc → gris clair, grille fine bleutée */
export const LightBg: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill style={{ background: `linear-gradient(180deg, #FFFFFF 0%, ${C.light} 100%)` }}>
      <AbsoluteFill
        style={{
          backgroundImage:
            "linear-gradient(rgba(7,59,180,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(7,59,180,0.05) 1px, transparent 1px)",
          backgroundSize: "90px 90px",
          backgroundPosition: `${(f * 0.4) % 90}px 0`,
          maskImage: "radial-gradient(85% 65% at 50% 45%, black, transparent)",
        }}
      />
      {children}
    </AbsoluteFill>
  );
};
