import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { CoverArt } from "../components/CoverArt";
import { Words } from "../components/Kinetic";
import { GhostTrail } from "../components/GhostTrail";
import { C, E, FONT_TITLE, kf, tw } from "../theme";
import { cue, scene } from "../timeline";

/** SCÈNE 01 — Hook explosif : la couverture s'anime, STOP surgit. */
export const S01Hook: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s01").from;
  const STOP = cue("01") - S + 1;
  const LINE = cue("01", "Cette", 0.75) - S;
  const NOBODY = cue("01", "personne", 0.55) - S;

  const burst = tw(f, STOP, 22, 0, 1, E.out);
  const shake = Math.max(0, 1 - (f - STOP) / 14) * (f >= STOP ? 1 : 0);
  const sx = Math.sin(f * 2.7) * 16 * shake;
  const sy = Math.cos(f * 3.3) * 12 * shake;

  // STOP : slam (scale 2.8 → 1) puis compression en barre cyan
  const slam = (fr: number) => kf(fr, [STOP, STOP + 9], [2.8, 1], E.out);
  const squash = tw(f, LINE - 6, 10, 0, 1, E.inOut);
  const stopVisible = f >= STOP && f < LINE + 8;

  // viseur caméra barré
  const vf = tw(f, NOBODY, 16, 0, 1, E.out);
  const strike = tw(f, NOBODY + 14, 12, 0, 1, E.inOut);

  return (
    <AbsoluteFill style={{ transform: `translate(${sx}px, ${sy}px)` }}>
      <CoverArt burst={burst} titleBurst={tw(f, STOP, 8, 0, 1, E.out)} />
      {/* flash d'impact */}
      <AbsoluteFill style={{ background: C.cyan, opacity: f >= STOP ? Math.max(0, 0.55 - (f - STOP) * 0.09) : 0 }} />

      {stopVisible && (
        <div style={{ position: "absolute", left: 0, top: 0, width: 1080, height: 1920 }}>
          <GhostTrail frame={f} samples={8} shutter={1.6} enabled={f < STOP + 10} pos={(fr) => ({ x: 0, y: 0, s: slam(fr) })}>
            <div style={{ width: 1080, height: 1920, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <div
                style={{
                  fontFamily: FONT_TITLE,
                  fontWeight: 900,
                  fontSize: 330,
                  letterSpacing: -14,
                  color: C.white,
                  transform: `scaleX(${1 - squash * 0.98}) scaleY(${1 - squash * 0.94}) rotate(${-4 + squash * 4}deg)`,
                  textShadow: "0 20px 80px rgba(8,108,240,0.6)",
                  lineHeight: 1,
                  marginTop: -120,
                }}
              >
                STOP
              </div>
            </div>
          </GhostTrail>
        </div>
      )}

      {f >= LINE - 4 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 140 }}>
          {/* la barre issue de STOP devient le soulignement */}
          <div style={{ position: "absolute", top: 1188, width: tw(f, LINE, 18, 40, 560, E.out), height: 12, borderRadius: 6, background: C.cyan, boxShadow: `0 0 30px ${C.cyan}` }} />
          <div style={{ transform: `rotate(${tw(f, LINE, 30, -3, 0, E.out)}deg) scale(${tw(f, LINE, 40, 1.12, 1, E.out)})` }}>
            <Words text={"CETTE VIDÉO"} start={LINE} size={128} stagger={3} />
            <Words text={"N'A JAMAIS"} start={LINE + 5} size={128} stagger={3} />
            <Words text={"ÉTÉ FILMÉE"} start={LINE + 10} size={150} stagger={3} color={C.cyan} style={{ textShadow: "0 0 50px rgba(7,156,239,0.45)" }} />
          </div>
        </AbsoluteFill>
      )}

      {/* viseur REC barré : « personne ne l'a filmée » */}
      {f >= NOBODY && (
        <AbsoluteFill style={{ opacity: vf }}>
          {[
            [110, 520, 0],
            [970, 520, 90],
            [970, 1400, 180],
            [110, 1400, 270],
          ].map(([x, y, r], i) => (
            <div key={i} style={{ position: "absolute", left: x - 40, top: y - 40, width: 80, height: 80, borderTop: `8px solid ${C.white}`, borderLeft: `8px solid ${C.white}`, transform: `rotate(${r}deg) scale(${1.4 - 0.4 * vf})`, opacity: 0.85 }} />
          ))}
          <div style={{ position: "absolute", left: 150, top: 570, display: "flex", alignItems: "center", gap: 16, fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 40, color: C.white }}>
            <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.cyan, opacity: Math.floor(f / 8) % 2 ? 1 : 0.35 }} />
            REC
            <div style={{ position: "absolute", left: -10, top: 22, height: 7, width: 140 * strike, background: C.cyan, transform: "rotate(-8deg)", transformOrigin: "left" }} />
          </div>
          <div style={{ position: "absolute", left: 0, right: 0, top: 1350, textAlign: "center", fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 40, letterSpacing: 8, color: C.light, opacity: tw(f, NOBODY + 10, 12, 0, 1) }}>
            PERSONNE NE L'A FILMÉE
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};
