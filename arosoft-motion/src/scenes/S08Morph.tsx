import React from "react";
import { AbsoluteFill, interpolateColors, useCurrentFrame } from "remotion";
import { NightBg } from "../components/Backgrounds";
import { Bar } from "../components/Phone";
import { C, E, FONT_TITLE, kf, tw } from "../theme";
import { scene } from "../timeline";
import { TechTitle } from "./S06Easing";

/**
 * SCÈNE 08 — Morphing continu : UN SEUL objet qui évolue
 * cercle → carré → carte → smartphone → interface (shared element).
 */
export const S08Morph: React.FC = () => {
  const f = useCurrentFrame();
  const D = scene("s08").duration;
  const K = [14, 46, 80, 116, 150].map((k) => Math.min(k, D - 30));
  const ease = E.inOut;
  const w = kf(f, K, [220, 300, 640, 400, 400], ease);
  const h = kf(f, K, [220, 300, 380, 800, 800], ease);
  const r = kf(f, K, [110, 40, 36, 60, 60], ease);
  const rot = kf(f, K, [0, 45, 0, 0, 0], ease) + kf(f, [K[0], K[1]], [0, 180], ease);
  const bg = interpolateColors(Math.max(0, Math.min(1, (f - K[0]) / (K[2] - K[0]))), [0, 0.5, 1], [C.cyan, C.electric, "#1B2C5C"]);
  const cardC = kf(f, [K[1] + 10, K[2]], [0, 1]) * (1 - kf(f, [K[2] + 8, K[3] - 6], [0, 1]));
  const phoneC = kf(f, [K[3] - 8, K[3]], [0, 1]);
  const uiC = kf(f, [K[3] + 4, K[4]], [0, 1]);
  const labels = ["CERCLE", "CARRÉ", "CARTE", "SMARTPHONE", "INTERFACE"];
  const idx = K.reduce((acc, k, i) => (f >= k - 10 ? i : acc), 0);
  const tick = f - (K[idx] - 10);
  return (
    <AbsoluteFill>
      <NightBg />
      <TechTitle n="03" title="LES TRANSITIONS" start={0} />
      <div style={{ position: "absolute", left: 540, top: 1000, width: 0, height: 0 }}>
        <div
          style={{
            position: "absolute",
            left: -w / 2,
            top: -h / 2,
            width: w,
            height: h,
            borderRadius: r,
            background: bg,
            transform: `rotate(${rot}deg) scale(${tw(f, 4, 14, 0, 1, E.back)})`,
            boxShadow: `0 40px 100px rgba(8,108,240,0.35), inset 0 0 0 ${phoneC * 14}px #24365F`,
            overflow: "hidden",
          }}
        >
          {/* contenu carte */}
          <div style={{ position: "absolute", left: 40, top: 40, right: 40, opacity: cardC, display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ width: 90, height: 90, borderRadius: 24, background: C.cyan }} />
            <Bar w="70%" h={30} color="rgba(255,255,255,0.9)" />
            <Bar w="50%" h={18} />
          </div>
          {/* encoche smartphone */}
          <div style={{ position: "absolute", top: 26, left: "50%", width: 110, height: 28, marginLeft: -55, borderRadius: 14, background: "#050a18", opacity: phoneC }} />
          {/* interface */}
          <div style={{ position: "absolute", inset: 30, top: 80, opacity: uiC, display: "flex", flexDirection: "column", gap: 18 }}>
            <Bar w={tw(f, K[3] + 6, 16, 0, 200)} h={22} color={C.cyan} />
            <Bar w={tw(f, K[3] + 10, 16, 0, 300)} h={46} color="rgba(255,255,255,0.92)" />
            <div style={{ height: 230, borderRadius: 26, background: `linear-gradient(135deg, ${C.electric}, ${C.royal})`, transform: `scale(${tw(f, K[3] + 14, 16, 0.6, 1, E.back)})`, opacity: tw(f, K[3] + 14, 8, 0, 1) }} />
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ display: "flex", gap: 14, alignItems: "center", transform: `translateX(${tw(f, K[3] + 20 + i * 4, 14, 200, 0)}px)`, opacity: tw(f, K[3] + 20 + i * 4, 8, 0, 1) }}>
                <div style={{ width: 54, height: 54, borderRadius: 16, background: i === 0 ? C.cyan : "rgba(255,255,255,0.2)" }} />
                <Bar w={180 - i * 30} h={16} />
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* étiquette qui change, synchronisée sur chaque clé */}
      <div style={{ position: "absolute", top: 1520, left: 0, right: 0, textAlign: "center", fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 72, letterSpacing: 4, color: C.white, overflow: "hidden", height: 90 }}>
        <div style={{ transform: `translateY(${tw(tick, 0, 12, 100, 0)}%)`, filter: `blur(${tw(tick, 0, 8, 6, 0)}px)` }}>{labels[idx]}</div>
      </div>
      <div style={{ position: "absolute", top: 1630, left: 0, right: 0, display: "flex", justifyContent: "center", gap: 14 }}>
        {labels.map((l, i) => (
          <div key={l} style={{ width: i === idx ? 54 : 16, height: 16, borderRadius: 8, background: i <= idx ? C.cyan : "rgba(255,255,255,0.2)" }} />
        ))}
      </div>
    </AbsoluteFill>
  );
};
