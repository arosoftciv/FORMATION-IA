import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { NightBg } from "../components/Backgrounds";
import { Card, Bar } from "../components/Phone";
import { GhostTrail } from "../components/GhostTrail";
import { Letters, Words, Label } from "../components/Kinetic";
import { DrawIcon } from "../components/Icons";
import { C, E, FONT_BODY, FONT_TITLE, gradText, kf, tw } from "../theme";
import { cue, scene } from "../timeline";

/** Compteur « odomètre » : chaque chiffre défile verticalement */
const Odometer: React.FC<{ value: number; progress: number; size: number }> = ({ value, progress, size }) => {
  const digits = String(value).split("");
  return (
    <div style={{ display: "flex", fontFamily: FONT_TITLE, fontWeight: 900, fontSize: size, lineHeight: 1, height: size, overflow: "hidden" }}>
      {digits.map((d, i) => {
        const target = Number(d) + 10 * (digits.length - i);
        const cur = target * progress;
        return (
          <div key={i} style={{ height: size, overflow: "hidden" }}>
            <div style={{ transform: `translateY(${-(cur % 10) * size}px)` }}>
              {Array.from({ length: 11 }).map((_, k) => (
                <div key={k} style={{ height: size, ...gradText() }}>{k % 10}</div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

/** SCÈNE 04 — Mots, chiffres, formes, animations… qui convergent vers MOTION DESIGN */
export const S04Discovery: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s04").from;
  const WORDS = cue("04a", "des mots") - S;
  const NUMS = cue("04a", "des chiffres") - S;
  const SHAPES = cue("04a", "des formes") - S;
  const ANIMS = cue("04a", "des animations") - S;
  const NAME = cue("04b") - S;
  const ARO = cue("04b", "Et chez", 0.35) - S;

  // convergence : tout est aspiré vers le centre
  const conv = (fr: number) => kf(fr, [NAME - 8, NAME + 6], [0, 1], E.in);
  const c = conv(f);
  const gather = (x: number, y: number) => (fr: number) => {
    const k = conv(fr);
    return { x: x + (540 - x) * k, y: y + (900 - y) * k, s: 1 - 0.85 * k };
  };
  const vis = c < 1;

  // forme qui se transforme : cercle → carré → triangle (clip-path)
  const mt = Math.max(0, f - SHAPES);
  const phase = (mt / 22) % 3;
  const radius = kf(phase, [0, 0.6, 1, 2, 2.6, 3], [50, 50, 12, 12, 50, 50]);
  const rot = mt * 4;

  const marquee = (dir: number, speed: number) => ((f * speed * dir) % 600) - 300;

  return (
    <AbsoluteFill>
      <NightBg />
      {vis && (
        <>
          {/* 1. mots qui bougent */}
          {f >= WORDS && (
            <div style={{ position: "absolute", top: 300, left: 0, right: 0, opacity: tw(f, WORDS, 8, 0, 1) * (1 - c), overflow: "hidden", height: 300 }}>
              {[
                { words: ["IDÉE", "STYLE", "IMPACT", "MESSAGE"], speed: 9, size: 96, color: C.white },
                { words: ["NOUVEAU", "LANCEMENT", "OFFRE", "SERVICE"], speed: -7, size: 70, color: "rgba(7,156,239,0.75)" },
              ].map((row, r) => {
                const loop = 1400;
                const x = (((f - WORDS) * row.speed) % loop + loop) % loop;
                return (
                  <div key={r} style={{ display: "flex", gap: 44, whiteSpace: "nowrap", transform: `translateX(${-x + tw(f, WORDS, 20, r ? -500 : 500, 0, E.out)}px)`, fontFamily: FONT_TITLE, fontWeight: 900, fontSize: row.size, color: row.color, marginBottom: 18 }}>
                    {[...row.words, ...row.words, ...row.words, ...row.words].map((w, i) => (
                      <span key={i}>{w}</span>
                    ))}
                  </div>
                );
              })}
            </div>
          )}
          {/* 2. chiffres qui défilent */}
          {f >= NUMS && (
            <GhostTrail frame={f} samples={6} enabled={c > 0} pos={gather(70, 640)}>
              <Card style={{ width: 430, padding: 30, transform: `scale(${tw(f, NUMS, 16, 0.6, 1, E.back)})`, opacity: tw(f, NUMS, 6, 0, 1) }}>
                <Label>Compteur</Label>
                <Odometer value={1920} progress={tw(f, NUMS, 40, 0, 1, E.out)} size={110} />
                <div style={{ fontFamily: FONT_BODY, color: C.mute, fontSize: 24 }}>pixels de hauteur</div>
              </Card>
            </GhostTrail>
          )}
          {/* 3. formes qui se transforment */}
          {f >= SHAPES && (
            <GhostTrail frame={f} samples={6} enabled={c > 0} pos={gather(620, 660)}>
              <div style={{ width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${tw(f, SHAPES, 16, 0, 1, E.back)})` }}>
                <div style={{ width: 200, height: 200, borderRadius: `${radius}%`, background: `linear-gradient(135deg, ${C.cyan}, ${C.royal})`, transform: `rotate(${rot}deg)`, boxShadow: "0 20px 60px rgba(8,108,240,0.5)" }} />
              </div>
            </GhostTrail>
          )}
          {/* 4. animations synchronisées */}
          {f >= ANIMS && (
            <GhostTrail frame={f} samples={6} enabled={c > 0} pos={gather(130, 1080)}>
              <Card style={{ width: 820, padding: 32, opacity: tw(f, ANIMS, 8, 0, 1), transform: `translateY(${tw(f, ANIMS, 18, 80, 0, E.out)}px)` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
                  <div style={{ width: 90, height: 90, borderRadius: 24, background: C.electric, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <DrawIcon name="play" progress={1} size={70} color="#fff" fill="#fff" fillOpacity={1} stroke={4} />
                  </div>
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8, height: 90 }}>
                    {Array.from({ length: 24 }).map((_, i) => {
                      const h = 20 + Math.abs(Math.sin((f - ANIMS) * 0.35 + i * 0.7)) * 70 * (0.5 + 0.5 * Math.sin(i));
                      return <div key={i} style={{ width: 12, height: h, borderRadius: 6, background: i % 3 ? C.cyan : C.white }} />;
                    })}
                  </div>
                </div>
                <Bar w="100%" h={12} style={{ marginTop: 26 }} />
                <Bar w={`${tw(f, ANIMS, 50, 5, 100, E.inOut)}%`} h={12} color={C.cyan} style={{ marginTop: -12 }} />
              </Card>
            </GhostTrail>
          )}
        </>
      )}
      {/* flash de convergence */}
      <div style={{ position: "absolute", left: 540 - 300, top: 900 - 300, width: 600, height: 600, borderRadius: "50%", background: `radial-gradient(circle, ${C.cyan}, transparent 65%)`, opacity: kf(f, [NAME, NAME + 4, NAME + 20], [0, 1, 0]), transform: `scale(${tw(f, NAME, 20, 0.2, 2.5)})` }} />
      {f >= NAME && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 200 }}>
          <Label style={{ opacity: tw(f, NAME, 10, 0, 1), marginBottom: 20 }}>ça s'appelle le</Label>
          <Letters text="MOTION" start={NAME + 2} size={200} spread={60} />
          <Letters text="DESIGN" start={NAME + 8} size={200} spread={60} color={C.cyan} />
          <div style={{ marginTop: 70, opacity: tw(f, ARO, 10, 0, 1), transform: `translateY(${tw(f, ARO, 20, 40, 0)}px)`, display: "flex", alignItems: "center", gap: 26 }}>
            <Img src={staticFile("assets/logo/arosoft-symbol-transparent.png")} style={{ width: 96, filter: "drop-shadow(0 0 1.2px rgba(255,255,255,0.85))" }} />
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 40, color: C.light, lineHeight: 1.2 }}>
              Vos idées → des vidéos
              <br />
              <span style={{ color: C.white, fontWeight: 900 }}>qui captent l'attention</span>
            </div>
          </div>
        </AbsoluteFill>
      )}
      {/* sortie : rideau blanc diagonal vers la scène claire */}
      <AbsoluteFill style={{ background: C.white, clipPath: `polygon(0 ${100 - tw(f, scene("s04").duration - 10, 10, 0, 130, E.in)}%, 100% ${130 - tw(f, scene("s04").duration - 10, 10, 0, 130, E.in)}%, 100% 100%, 0 100%)` }} />
    </AbsoluteFill>
  );
};
