import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { NightBg } from "../components/Backgrounds";
import { C, E, FONT_TITLE, kf, tw } from "../theme";
import { scene, segEnd } from "../timeline";
import { TechTitle } from "./S06Easing";

/** Frames (absolues) des trois impacts — partagées avec le sound design */
export const soundHits = () => {
  const e = segEnd("09");
  return { boom: e + 4, click: e + 22, whoosh: e + 40 };
};

/** SCÈNE 09 — Sound design : BOUM / CLIC / WHOOSH synchronisés à l'image près */
export const S09Sound: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s09").from;
  const h = soundHits();
  const hits = [
    { t: h.boom - S, word: "BOUM !", color: C.white, size: 190 },
    { t: h.click - S, word: "CLIC !", color: C.cyan, size: 170 },
    { t: h.whoosh - S, word: "WHOOSH !", color: C.electric, size: 150 },
  ];
  const amp = (i: number) => {
    let a = 0.12 + 0.08 * Math.abs(Math.sin(f * 0.3 + i * 0.6));
    for (const hit of hits) {
      const d = f - hit.t;
      if (d >= 0 && d < 24) a += Math.exp(-d / 6) * (0.9 - Math.abs(i - 20) * 0.02) * (0.6 + 0.4 * Math.abs(Math.sin(i * 1.7)));
    }
    return Math.min(1, a);
  };
  const playhead = tw(f, 20, hits[2].t + 10 - 20, 0, 1, E.linear);
  const current = hits.reduce((acc, hit, i) => (f >= hit.t ? i : acc), -1);
  return (
    <AbsoluteFill>
      <NightBg hue="cyan" />
      <TechTitle n="04" title="LE SON" start={0} />
      {/* waveform */}
      <div style={{ position: "absolute", top: 820, left: 90, right: 90, height: 360, display: "flex", alignItems: "center", gap: 6 }}>
        {Array.from({ length: 41 }).map((_, i) => (
          <div key={i} style={{ flex: 1, height: 20 + amp(i) * 340, borderRadius: 8, background: i % 4 === 0 ? C.white : C.cyan, opacity: 0.85 }} />
        ))}
      </div>
      {/* timeline image/son avec marqueurs */}
      <div style={{ position: "absolute", top: 1240, left: 90, right: 90, height: 120 }}>
        <div style={{ position: "absolute", top: 30, left: 0, right: 0, height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3 }} />
        <div style={{ position: "absolute", top: 82, left: 0, right: 0, height: 6, background: "rgba(255,255,255,0.15)", borderRadius: 3 }} />
        <div style={{ position: "absolute", top: -2, left: 0, fontFamily: FONT_TITLE, fontSize: 20, fontWeight: 700, color: C.mute, letterSpacing: 3, transform: "translateY(-26px)" }}>IMAGE · SON</div>
        {hits.map((hit, i) => {
          const x = ((hit.t - 20) / (hits[2].t + 10 - 20)) * 100;
          const on = f >= hit.t;
          return (
            <React.Fragment key={i}>
              <div style={{ position: "absolute", left: `${x}%`, top: 18, width: 30, height: 30, marginLeft: -15, borderRadius: 8, background: on ? C.cyan : "rgba(255,255,255,0.3)" }} />
              <div style={{ position: "absolute", left: `${x}%`, top: 70, width: 30, height: 30, marginLeft: -15, borderRadius: "50%", background: on ? C.white : "rgba(255,255,255,0.3)" }} />
            </React.Fragment>
          );
        })}
        <div style={{ position: "absolute", left: `${playhead * 100}%`, top: 0, width: 4, height: 120, background: C.white, boxShadow: `0 0 20px ${C.cyan}` }} />
      </div>
      {/* mots d'impact */}
      {current >= 0 && (() => {
        const hit = hits[current];
        const d = f - hit.t;
        const s = kf(d, [0, 3, 10], [1.8, 0.92, 1], E.out);
        return (
          <div style={{ position: "absolute", top: 1430, left: 0, right: 0, textAlign: "center", fontFamily: FONT_TITLE, fontWeight: 900, fontSize: hit.size, color: hit.color, letterSpacing: -4, transform: `scale(${s}) rotate(${current === 2 ? -6 : current === 1 ? 4 : -2}deg) translateX(${current === 2 ? kf(d, [0, 8], [-300, 0], E.out) : 0}px)`, textShadow: "0 10px 60px rgba(8,108,240,0.6)" }}>
            {hit.word}
          </div>
        );
      })()}
      {/* flash bref sur BOUM */}
      <AbsoluteFill style={{ background: C.white, opacity: f >= hits[0].t ? Math.max(0, 0.35 - (f - hits[0].t) * 0.07) : 0 }} />
    </AbsoluteFill>
  );
};
