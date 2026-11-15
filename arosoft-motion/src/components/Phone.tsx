import React from "react";
import { C } from "../theme";

/** Smartphone stylisé (cadre + encoche), contenu libre à l'intérieur. */
export const Phone: React.FC<{
  width?: number;
  height?: number;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  screen?: string;
}> = ({ width = 420, height = 860, children, style, screen = "#0d1a3a" }) => (
  <div
    style={{
      width,
      height,
      borderRadius: width * 0.14,
      background: "linear-gradient(145deg, #2a3b66, #0b1430)",
      padding: width * 0.035,
      boxShadow: "0 40px 90px rgba(3,10,30,0.55), inset 0 0 0 2px rgba(255,255,255,0.12)",
      position: "relative",
      ...style,
    }}
  >
    <div
      style={{
        width: "100%",
        height: "100%",
        borderRadius: width * 0.11,
        background: screen,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {children}
      <div
        style={{
          position: "absolute",
          top: width * 0.03,
          left: "50%",
          transform: "translateX(-50%)",
          width: width * 0.3,
          height: width * 0.07,
          borderRadius: 999,
          background: "#050a18",
        }}
      />
    </div>
  </div>
);

/** Barre UI générique (squelette d'interface) */
export const Bar: React.FC<{ w: number | string; h?: number; color?: string; style?: React.CSSProperties }> = ({ w, h = 18, color = "rgba(255,255,255,0.18)", style }) => (
  <div style={{ width: w, height: h, borderRadius: h / 2, background: color, ...style }} />
);

export const Card: React.FC<{ style?: React.CSSProperties; children?: React.ReactNode; light?: boolean }> = ({ style, children, light }) => (
  <div
    style={{
      borderRadius: 32,
      background: light ? "#FFFFFF" : "linear-gradient(160deg, rgba(255,255,255,0.12), rgba(255,255,255,0.04))",
      border: light ? "1px solid rgba(7,59,180,0.10)" : "1px solid rgba(255,255,255,0.14)",
      boxShadow: light ? "0 30px 70px rgba(16,29,60,0.14)" : "0 30px 70px rgba(0,0,0,0.35)",
      backdropFilter: light ? undefined : "blur(8px)",
      color: light ? C.ink : C.white,
      ...style,
    }}
  >
    {children}
  </div>
);
