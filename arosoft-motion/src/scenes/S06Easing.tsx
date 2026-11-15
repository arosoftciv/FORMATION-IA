import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame } from "remotion";
import { NightBg } from "../components/Backgrounds";
import { GhostTrail } from "../components/GhostTrail";
import { Words, Label } from "../components/Kinetic";
import { Card } from "../components/Phone";
import { C, E, FONT_TITLE, tw } from "../theme";
import { cue, scene } from "../timeline";

export const TechTitle: React.FC<{ n: string; title: string; start: number; dark?: boolean }> = ({ n, title, start, dark = true }) => {
  const f = useCurrentFrame();
  return (
    <div style={{ position: "absolute", top: 270, left: 90, right: 160 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
        <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 64, color: dark ? C.cyan : C.electric, transform: `translateX(${tw(f, start, 16, -80, 0)}px)`, opacity: tw(f, start, 8, 0, 1) }}>{n}</div>
        <div style={{ height: 6, width: tw(f, start + 4, 14, 0, 80), background: dark ? C.cyan : C.electric, borderRadius: 3 }} />
      </div>
      <Words text={title} start={start + 4} size={104} align="left" color={dark ? C.white : C.night} stagger={3} />
    </div>
  );
};

/** SCÈNE 06 — Easing : la même trajectoire, linéaire vs accélération/décélération */
export const S06Easing: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s06").from;
  const ACC = cue("06", "on accélère", 0.3) - S;
  const CYCLE = 54;
  const MOVE = 36;
  const t0 = 24;
  const prog = (fr: number, ease: (x: number) => number) => {
    if (fr < t0) return 0;
    const k = (fr - t0) % CYCLE;
    const dir = Math.floor((fr - t0) / CYCLE) % 2;
    const p = ease(Math.min(1, k / MOVE));
    return dir ? 1 - p : p;
  };
  const X0 = 150;
  const X1 = 830;
  const lane = (y: number, label: string, ease: (x: number) => number, trail: boolean, color: string) => (
    <>
      <div style={{ position: "absolute", left: X0, top: y + 50, width: X1 - X0 + 100, height: 4, borderRadius: 2, background: "rgba(255,255,255,0.15)" }} />
      <div style={{ position: "absolute", left: X0, top: y - 30 }}>
        <Label>{label}</Label>
      </div>
      <div style={{ position: "absolute", left: 0, top: 0 }}>
        <GhostTrail frame={f} samples={trail ? 8 : 1} shutter={1.4} pos={(fr) => ({ x: X0 + (X1 - X0) * prog(fr, ease), y: y + 10 })}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", background: color, boxShadow: `0 0 40px ${color}` }} />
        </GhostTrail>
      </div>
    </>
  );
  // dot sur la courbe d'easing
  const p = prog(f, E.inOut);
  const k = f < t0 ? 0 : Math.min(1, ((f - t0) % CYCLE) / MOVE);
  const dir = f < t0 ? 0 : Math.floor((f - t0) / CYCLE) % 2;
  const gx = 60 + (dir ? 1 - k : k) * 520;
  const gy = 300 - p * 240;
  return (
    <AbsoluteFill>
      <NightBg />
      <TechTitle n="01" title="LA VITESSE" start={0} />
      {lane(640, "linéaire", E.linear, false, "#7B8BB0")}
      {lane(860, "easing", E.inOut, true, C.cyan)}
      <div style={{ position: "absolute", left: 160, top: 1080, opacity: tw(f, 10, 12, 0, 1), transform: `translateY(${tw(f, 10, 20, 60, 0)}px)` }}>
        <Card style={{ width: 720, height: 380, padding: 20, position: "relative" }}>
          <svg width={680} height={340}>
            <line x1={60} y1={300} x2={620} y2={300} stroke="rgba(255,255,255,0.3)" strokeWidth={3} />
            <line x1={60} y1={300} x2={60} y2={40} stroke="rgba(255,255,255,0.3)" strokeWidth={3} />
            <line x1={60} y1={300} x2={580} y2={60} stroke="rgba(255,255,255,0.18)" strokeWidth={3} strokeDasharray="8 10" />
            <path
              d="M60 300 C 320 300, 320 60, 580 60"
              stroke={C.cyan}
              strokeWidth={7}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={900}
              strokeDashoffset={interpolate(f, [14, 44], [900, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" })}
            />
            <circle cx={gx} cy={gy} r={14} fill="#fff" />
            <text x={70} y={330} fill={C.mute} fontFamily="Inter" fontSize={22}>temps →</text>
          </svg>
        </Card>
      </div>
      {f >= ACC && (
        <div style={{ position: "absolute", top: 1530, left: 0, right: 0 }}>
          <Words text="ACCÉLÉRER → RALENTIR" start={ACC} size={58} weight={800} highlight={["→"]} stagger={3} />
        </div>
      )}
    </AbsoluteFill>
  );
};
