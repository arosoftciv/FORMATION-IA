import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LightBg } from "../components/Backgrounds";
import { GhostTrail } from "../components/GhostTrail";
import { Label } from "../components/Kinetic";
import { C, E, FONT_TITLE, tw } from "../theme";
import { scene } from "../timeline";
import { TechTitle } from "./S06Easing";

/** SCÈNE 07 — Motion blur : même passage rapide, sans puis avec flou directionnel */
export const S07Blur: React.FC = () => {
  const f = useCurrentFrame();
  const D = scene("s07").duration;
  const CYCLE = 38;
  const pass = (fr: number, delay: number) => {
    const k = ((fr - 20 - delay) % CYCLE + CYCLE) % CYCLE;
    const p = E.inOut(Math.min(1, k / 12));
    return -260 + p * 1600;
  };
  const Shape = ({ c }: { c: string }) => (
    <div style={{ width: 220, height: 220, borderRadius: 48, background: c, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 90, color: "#fff" }}>AS</div>
  );
  return (
    <AbsoluteFill>
      <LightBg />
      <TechTitle n="02" title="LE FLOU" start={0} dark={false} />
      <div style={{ position: "absolute", left: 90, top: 640 }}>
        <Label dark={false}>sans flou</Label>
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        {f >= 20 && <GhostTrail frame={f} samples={1} pos={(fr) => ({ x: pass(fr, 0), y: 700 })}><Shape c="#8D9AB8" /></GhostTrail>}
      </div>
      <div style={{ position: "absolute", left: 90, top: 1060 }}>
        <Label dark={false}>avec motion blur</Label>
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        {f >= 20 && (
          <GhostTrail frame={f} samples={16} shutter={1.8} pos={(fr) => ({ x: pass(fr, 6), y: 1120 })}>
            <Shape c={C.electric} />
          </GhostTrail>
        )}
      </div>
      <div style={{ position: "absolute", top: 1480, left: 90, right: 160, fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 56, color: C.night, opacity: tw(f, 40, 12, 0, 1) }}>
        Tout devient <span style={{ color: C.electric }}>plus fluide.</span>
      </div>
      <AbsoluteFill style={{ background: C.night, clipPath: `circle(${tw(f, D - 10, 10, 0, 150, E.in)}% at 50% 50%)` }} />
    </AbsoluteFill>
  );
};
