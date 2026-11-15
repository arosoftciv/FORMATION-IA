import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { NightBg } from "../components/Backgrounds";
import { Letters, Label } from "../components/Kinetic";
import { C, E, kf, tw } from "../theme";
import { scene } from "../timeline";

/** SCÈNE 11 — Retour spectaculaire : le diaporama vole en éclats, le bleu revient */
export const S11Return: React.FC = () => {
  const f = useCurrentFrame();
  const D = scene("s11").duration;
  const COLS = 6;
  const ROWS = 7;
  const TW = 900 / COLS;
  const TH = 760 / ROWS;
  const wipe = tw(f, 2, 18, 0, 1, E.out);
  return (
    <AbsoluteFill>
      <AbsoluteFill style={{ background: "#D9DDE3" }} />
      <AbsoluteFill style={{ clipPath: `circle(${wipe * 130}% at 50% 49%)` }}>
        <NightBg hue="cyan" />
      </AbsoluteFill>
      {/* tuiles de la diapositive qui explosent en 3D */}
      <div style={{ position: "absolute", left: 90, top: 560, width: 900, height: 760, perspective: 1400 }}>
        {Array.from({ length: COLS * ROWS }).map((_, k) => {
          const cx = k % COLS;
          const cy = Math.floor(k / COLS);
          const d = Math.hypot(cx - COLS / 2 + 0.5, cy - ROWS / 2 + 0.5);
          const p = tw(f, 1 + d * 1.2, 22, 0, 1, E.in);
          const ang = Math.atan2(cy - ROWS / 2 + 0.5, cx - COLS / 2 + 0.5);
          return (
            <div
              key={k}
              style={{
                position: "absolute",
                left: cx * TW,
                top: cy * TH,
                width: TW + 1,
                height: TH + 1,
                background: "#FFFFFF",
                border: "1px solid #E2E5EA",
                transform: `translate3d(${Math.cos(ang) * p * 900}px, ${Math.sin(ang) * p * 1100}px, ${p * 600}px) rotateX(${p * 160 * (cx % 2 ? 1 : -1)}deg) rotateY(${p * 120}deg)`,
                opacity: 1 - p,
              }}
            />
          );
        })}
      </div>
      {/* traînées lumineuses */}
      {Array.from({ length: 14 }).map((_, i) => {
        const p = tw(f, 4 + (i % 5), 26, 0, 1, E.out);
        const a = (i / 14) * Math.PI * 2;
        return (
          <div key={i} style={{ position: "absolute", left: 540, top: 900, width: 260, height: 6, borderRadius: 3, background: `linear-gradient(90deg, transparent, ${i % 2 ? C.cyan : C.white})`, transform: `rotate(${(a * 180) / Math.PI}deg) translateX(${80 + p * 700}px) scaleX(${1 - p * 0.6})`, transformOrigin: "left", opacity: 1 - p }} />
        );
      })}
      {/* pixels du logo qui jaillissent */}
      {Array.from({ length: 22 }).map((_, i) => {
        const p = tw(f, 6, 40, 0, 1, E.out);
        const a = i * 2.4;
        const r = 160 + (i % 5) * 90;
        return <div key={i} style={{ position: "absolute", left: 540 + Math.cos(a) * r * p - 12, top: 900 + Math.sin(a) * r * p - 12, width: 24 - (i % 3) * 5, height: 24 - (i % 3) * 5, background: i % 2 ? C.cyan : C.electric, opacity: kf(p, [0, 0.2, 1], [0, 1, 0.2]), transform: `rotate(${p * 90}deg)` }} />;
      })}
      <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 120 }}>
        <Label style={{ opacity: tw(f, 10, 10, 0, 1), marginBottom: 24, letterSpacing: 10 }}>chez arosoft</Label>
        <Letters text="VOS IDÉES" start={8} size={150} spread={80} />
        <Letters text="PRENNENT" start={14} size={150} spread={80} />
        <Letters text="VIE" start={20} size={230} spread={80} color={C.cyan} style={{ textShadow: `0 0 60px rgba(7,156,239,0.7)` }} />
      </AbsoluteFill>
      <AbsoluteFill style={{ background: C.white, transform: `translateX(${100 - tw(f, D - 9, 9, 0, 100, E.in)}%)` }} />
    </AbsoluteFill>
  );
};
