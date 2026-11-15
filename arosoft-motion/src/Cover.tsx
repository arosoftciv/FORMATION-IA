import React from "react";
import { AbsoluteFill, Img, staticFile } from "remotion";
import { CoverArt } from "./components/CoverArt";
import { C, FONT_TITLE } from "./theme";

/** Couverture 1080×1920 indépendante (miniature avant lecture) */
export const Cover: React.FC = () => (
  <AbsoluteFill>
    <CoverArt />
    <Img
      src={staticFile("assets/logo/arosoft-symbol-transparent.png")}
      style={{ position: "absolute", top: 90, right: 60, width: 110, filter: "drop-shadow(0 0 1.2px rgba(255,255,255,0.85)) drop-shadow(0 0 7px rgba(150,200,255,0.28))" }}
    />
    <div style={{ position: "absolute", bottom: 110, left: 0, right: 0, display: "flex", justifyContent: "center", alignItems: "center", gap: 18, fontFamily: FONT_TITLE, fontWeight: 600, fontSize: 30, letterSpacing: 6, color: C.light }}>
      <div style={{ width: 60, height: 3, background: C.electric }} />
      APPRENDRE • CRÉER • RÉUSSIR
      <div style={{ width: 60, height: 3, background: C.electric }} />
    </div>
  </AbsoluteFill>
);
