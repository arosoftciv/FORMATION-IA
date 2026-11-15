import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LightBg } from "../components/Backgrounds";
import { DrawIcon } from "../components/Icons";
import { Words } from "../components/Kinetic";
import { C, E, FONT_TITLE, tw } from "../theme";
import { cue, scene } from "../timeline";

/** SCÈNE 02 — Pas de caméra / acteur / décor → 0 TOURNAGE (le 0 devient le cercle-raccord) */
export const S02NoShoot: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s02").from;
  const D = scene("s02").duration;
  const items = [
    { icon: "camera", text: "PAS DE CAMÉRA", at: cue("02", "Pas de caméra") - S },
    { icon: "actor", text: "PAS D'ACTEUR", at: cue("02", "Pas d'acteur", 0.15) - S },
    { icon: "decor", text: "PAS DE DÉCOR", at: cue("02", "Pas de décor", 0.25) - S },
  ];
  const ZERO = cue("02", "Aucun", 0.05) - S;
  const expand = tw(f, D - 12, 14, 0, 1, E.in);

  return (
    <AbsoluteFill>
      <LightBg />
      {items.map((it, i) => {
        const next = i < 2 ? items[i + 1].at : ZERO;
        const active = f >= it.at - 2 && f < next + 10;
        if (!active) return null;
        const draw = tw(f, it.at, 14, 0, 1, E.out);
        const cross = tw(f, it.at + 12, 8, 0, 1, E.inOut);
        // l'icône se replie en point qui rejoint la rangée du bas
        const fold = tw(f, next - 6, 14, 0, 1, E.inOut);
        const dotX = 540 + (i - 1) * 70;
        const x = 540 + (dotX - 540) * fold;
        const y = 640 + (1500 - 640) * fold;
        return (
          <React.Fragment key={i}>
            <div style={{ position: "absolute", left: x - 140, top: y - 140, width: 280, height: 280, transform: `scale(${1 - 0.86 * fold})` }}>
              <div style={{ width: 280, height: 280, borderRadius: "50%", background: "#fff", boxShadow: "0 30px 70px rgba(7,59,180,0.18)", display: "flex", alignItems: "center", justifyContent: "center", position: "relative" }}>
                <div style={{ opacity: 1 - fold }}>
                  <DrawIcon name={it.icon} progress={draw} size={170} color={C.night} stroke={8} />
                </div>
                <div style={{ position: "absolute", width: 230 * cross, height: 12, borderRadius: 6, background: C.electric, transform: "rotate(-40deg)", opacity: 1 - fold }} />
                <div style={{ position: "absolute", inset: 0, borderRadius: "50%", background: C.electric, opacity: fold }} />
              </div>
            </div>
            <div style={{ position: "absolute", top: 860, left: 0, right: 0, opacity: 1 - tw(f, next - 4, 6, 0, 1, E.linear) }}>
              <Words text={it.text} start={it.at + 2} size={104} color={C.night} stagger={3} />
            </div>
          </React.Fragment>
        );
      })}
      {/* points accumulés */}
      {items.map((it, i) => {
        const next = i < 2 ? items[i + 1].at : ZERO;
        const shown = f >= next + 8;
        const merge = tw(f, ZERO - 4, 10, 0, 1, E.inOut);
        if (!shown) return null;
        const x = 540 + (i - 1) * 70 * (1 - merge);
        const y = 1500 + (760 - 1500) * merge;
        return <div key={i} style={{ position: "absolute", left: x - 19, top: y - 19, width: 38, height: 38, borderRadius: "50%", background: C.electric, opacity: 1 - merge }} />;
      })}
      {f >= ZERO && (
        <>
          {/* le 0 = un anneau qui servira de raccord */}
          <div
            style={{
              position: "absolute",
              left: 540 - 170,
              top: 760 - 210,
              width: 340,
              height: 420,
              borderRadius: "50%",
              border: `${tw(f, ZERO + 2, 12, 4, 54, E.out)}px solid ${C.royal}`,
              transform: `scale(${tw(f, ZERO + 2, 16, 0.2, 1, E.back) * (1 + expand * 9)})`,
              background: expand > 0 ? C.night : "transparent",
              opacity: tw(f, ZERO + 2, 4, 0, 1, E.linear),
            }}
          />
          <div style={{ position: "absolute", top: 1060, left: 0, right: 0, textAlign: "center", fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 120, color: C.night, letterSpacing: -3, opacity: (1 - expand) * tw(f, ZERO + 4, 8, 0, 1, E.linear), transform: `translateY(${tw(f, ZERO + 4, 14, 60, 0, E.out)}px)` }}>
            TOURNAGE
          </div>
          <div style={{ position: "absolute", top: 1210, left: 0, right: 0, textAlign: "center", fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 36, letterSpacing: 10, color: C.electric, opacity: (1 - expand) * tw(f, ZERO + 10, 8, 0, 1, E.linear) }}>
            AUCUN TOURNAGE
          </div>
        </>
      )}
    </AbsoluteFill>
  );
};
