import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { NightBg } from "../components/Backgrounds";
import { Words } from "../components/Kinetic";
import { C, E, tw } from "../theme";
import { cue, scene } from "../timeline";

/** SCÈNE 03 — Le cercle devient une cible : « vous êtes toujours là » */
export const S03StillHere: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s03").from;
  const D = scene("s03").duration;
  const YOU = cue("03", "vous", 0.35) - S;
  const zoom = tw(f, D - 12, 12, 0, 1, E.in);
  const lock = tw(f, YOU, 16, 0, 1, E.out);
  const cy = 760;
  return (
    <AbsoluteFill>
      <NightBg grid={false} />
      <AbsoluteFill style={{ transform: `scale(${1 + zoom * 3})`, opacity: 1 - zoom, transformOrigin: `540px ${cy}px` }}>
        {[0, 1, 2, 3, 4].map((i) => {
          const p = ((f + i * 14) % 70) / 70;
          return (
            <div
              key={i}
              style={{
                position: "absolute",
                left: 540 - 380,
                top: cy - 380,
                width: 760,
                height: 760,
                borderRadius: "50%",
                border: `3px solid ${C.cyan}`,
                transform: `scale(${0.15 + p * 0.9})`,
                opacity: (1 - p) * 0.7 * tw(f, 0, 10, 0, 1),
              }}
            />
          );
        })}
        {[150, 250, 340].map((r, i) => (
          <div key={r} style={{ position: "absolute", left: 540 - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: "50%", border: `${i === 0 ? 10 : 4}px solid ${i === 0 ? C.electric : "rgba(255,255,255,0.25)"}`, transform: `scale(${tw(f, i * 3, 18, 0.4, 1, E.back)})` }} />
        ))}
        {/* réticule qui se verrouille */}
        {[0, 90, 180, 270].map((a) => (
          <div key={a} style={{ position: "absolute", left: 540, top: cy, width: 0, height: 0, transform: `rotate(${a + (1 - lock) * 45}deg)` }}>
            <div style={{ position: "absolute", left: 60 + (1 - lock) * 220, top: -5, width: 120, height: 10, borderRadius: 5, background: C.white }} />
          </div>
        ))}
        <div style={{ position: "absolute", left: 540 - 22, top: cy - 22, width: 44, height: 44, borderRadius: "50%", background: C.cyan, transform: `scale(${lock})`, boxShadow: `0 0 40px ${C.cyan}` }} />
      </AbsoluteFill>
      <div style={{ position: "absolute", top: 1180, left: 0, right: 0, opacity: 1 - zoom }}>
        <Words text="ET POURTANT…" start={2} size={70} weight={700} color={C.light} />
        <div style={{ height: 30 }} />
        <Words text={"VOUS ÊTES\nTOUJOURS LÀ."} start={YOU} size={122} highlight={["VOUS"]} stagger={4} />
      </div>
    </AbsoluteFill>
  );
};
