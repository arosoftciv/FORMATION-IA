import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { cue, scene } from "../timeline";

/**
 * SCÈNE 10 — Le diaporama VOLONTAIRE : aucune animation, coupes sèches,
 * police système, fond plat. Le contraste fait la démonstration.
 */
export const S10Slideshow: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s10").from;
  const slides = [
    { at: 0, t: "RETIRONS TOUT ÇA." },
    { at: cue("10", "Plus de mouvement", 0.3) - S, t: "Plus de mouvement." },
    { at: cue("10", "Plus de transitions", 0.45) - S, t: "Plus de transitions." },
    { at: cue("10", "Plus d'effets", 0.6) - S, t: "Plus d'effets." },
    { at: cue("10", "Juste", 0.75) - S, t: "Juste des images fixes." },
    { at: cue("10", "Vous sentez", 1.2) - S, t: "VOUS SENTEZ LA DIFFÉRENCE ?" },
    { at: cue("10", "Vos clients", 1.35) - S, t: "Vos clients aussi." },
  ];
  const i = slides.reduce((acc, s, k) => (f >= s.at ? k : acc), 0);
  const big = i === 5;
  return (
    <AbsoluteFill style={{ background: "#D9DDE3", fontFamily: "Arial, Helvetica, sans-serif" }}>
      <div
        style={{
          position: "absolute",
          left: 90,
          right: 90,
          top: 560,
          height: 760,
          background: "#FFFFFF",
          border: "2px solid #B8BEC8",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: 60,
          textAlign: "center",
        }}
      >
        <div style={{ fontSize: big ? 84 : 72, color: big ? "#1E2A44" : "#4A4F59", fontWeight: big ? 700 : 400, lineHeight: 1.2 }}>{slides[i].t}</div>
        <div style={{ position: "absolute", bottom: 24, right: 30, fontSize: 26, color: "#9AA0AA" }}>
          {i + 1} / {slides.length}
        </div>
      </div>
      <div style={{ position: "absolute", top: 1360, left: 0, right: 0, textAlign: "center", fontSize: 28, color: "#8A9099" }}>
        diapositive_{String(i + 1).padStart(2, "0")}.jpg
      </div>
    </AbsoluteFill>
  );
};
