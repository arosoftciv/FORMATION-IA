import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { NightBg } from "../components/Backgrounds";
import { Words, Label } from "../components/Kinetic";
import { DrawIcon } from "../components/Icons";
import { Bar } from "../components/Phone";
import { C, E, FONT_BODY, FONT_TITLE, kf, tw } from "../theme";
import { cue, scene } from "../timeline";

const STEPS = ["VOTRE IDÉE", "LE SCRIPT", "LA VOIX-OFF", "L'ANIMATION", "LA VIDÉO FINALE"];

/** SCÈNE 15 — Processus AroSoft (5 étapes reliées) puis « capter l'attention » */
export const S15Process: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s15").from;
  const at = [
    cue("15a") - S + 4,
    cue("15a", "Du scénario", 0.3) - S,
    cue("15a", "à la voix-off", 0.35) - S,
    cue("15a", "des animations", 0.35) - S,
    cue("15a", "nous nous occupons", 0.4) - S,
  ];
  const PLAYER = at[4] + 26;
  const NOCAM = cue("15a", "Et tout ça", 0.5) - S;
  const FEED = cue("15b") - S - 2;
  const Q1 = cue("15b", "La question", 0.3) - S;
  const Q2 = cue("15b", "comment", 0.55) - S;

  const partA = f < FEED;
  const Y0 = 520;
  const GAP = 190;
  // ligne continue : sa longueur suit l'étape active
  const lineP = kf(f, at, [0, 1, 2, 3, 4], E.inOut);
  const toPlayer = tw(f, PLAYER, 22, 0, 1, E.inOut);

  // fil d'actualité : vitesse forte puis freinage sur « comment… »
  const speed = (fr: number) => (fr < Q2 ? 34 : 34 * Math.max(0, 1 - (fr - Q2) / 24));
  let scroll = 0;
  for (let k = FEED; k < f; k++) scroll += speed(k);

  return (
    <AbsoluteFill>
      <NightBg />
      {partA && (
        <>
          <div style={{ position: "absolute", top: 250, left: 90 }}>
            <Label style={{ opacity: tw(f, 0, 10, 0, 1) }}>la méthode arosoft</Label>
          </div>
          <div style={{ opacity: 1 - toPlayer, transform: `translateY(${-toPlayer * 120}px)` }}>
            <div style={{ position: "absolute", left: 156, top: Y0 + 40, width: 8, height: GAP * 4, borderRadius: 4, background: "rgba(255,255,255,0.12)" }} />
            <div style={{ position: "absolute", left: 156, top: Y0 + 40, width: 8, height: GAP * lineP, borderRadius: 4, background: `linear-gradient(${C.cyan}, ${C.electric})`, boxShadow: `0 0 20px ${C.cyan}` }} />
            {STEPS.map((s, i) => {
              const on = tw(f, at[i], 14, 0, 1, E.back);
              const active = lineP >= i - 0.05;
              return (
                <div key={s} style={{ position: "absolute", left: 110, top: Y0 + i * GAP, display: "flex", alignItems: "center", gap: 36 }}>
                  <div style={{ width: 100, height: 100, borderRadius: "50%", background: active ? C.electric : "#1a2a52", border: `4px solid ${active ? C.cyan : "rgba(255,255,255,0.15)"}`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 36, color: "#fff", transform: `scale(${0.7 + 0.3 * on})`, boxShadow: active ? `0 0 40px rgba(7,156,239,0.5)` : "none" }}>
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 64, color: active ? C.white : "rgba(255,255,255,0.25)", transform: `translateX(${(1 - on) * 60}px)` }}>{s}</div>
                </div>
              );
            })}
          </div>
          {/* la dernière étape révèle une fenêtre de lecture vidéo */}
          {f >= PLAYER && (
            <div style={{ position: "absolute", left: kf(toPlayer, [0, 1], [110, 120]), top: kf(toPlayer, [0, 1], [Y0 + 4 * GAP, 560]), width: kf(toPlayer, [0, 1], [100, 840]), height: kf(toPlayer, [0, 1], [100, 560]), borderRadius: kf(toPlayer, [0, 1], [50, 36]), background: `linear-gradient(135deg, ${C.royal}, ${C.electric})`, overflow: "hidden", boxShadow: "0 40px 100px rgba(0,0,0,0.45)" }}>
              <div style={{ position: "absolute", inset: 0, opacity: tw(f, PLAYER + 16, 10, 0, 1) }}>
                <div style={{ position: "absolute", left: "50%", top: "45%", width: 150, height: 150, marginLeft: -75, marginTop: -75, borderRadius: "50%", background: "rgba(255,255,255,0.18)", display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${kf(f, [PLAYER + 18, PLAYER + 26, PLAYER + 30], [0, 1.15, 1], E.out)})` }}>
                  <DrawIcon name="play" progress={1} size={110} color="#fff" fill="#fff" fillOpacity={1} stroke={4} />
                </div>
                <div style={{ position: "absolute", left: 40, right: 40, bottom: 40 }}>
                  <Bar w="100%" h={10} color="rgba(255,255,255,0.25)" />
                  <Bar w={`${tw(f, PLAYER + 26, 120, 0, 100, E.linear)}%`} h={10} color="#fff" style={{ marginTop: -10 }} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 14, fontFamily: FONT_BODY, fontSize: 22, color: "rgba(255,255,255,0.8)" }}>
                    <span>AroSoft · motion design</span>
                    <span>9:16 · HD</span>
                  </div>
                </div>
              </div>
            </div>
          )}
          {f >= NOCAM && (
            <div style={{ position: "absolute", top: 1220, left: 0, right: 0 }}>
              <Words text={"SANS CAMÉRA\nSANS ACTEUR\nSANS TOURNAGE"} start={NOCAM} size={74} stagger={4} highlight={["TOURNAGE"]} lineHeight={1.15} />
            </div>
          )}
        </>
      )}

      {!partA && (
        <AbsoluteFill>
          {/* flux infini de contenus */}
          <div style={{ position: "absolute", left: 170, width: 740, top: 0, transform: `translateY(${-(scroll % 2400)}px)`, filter: speed(f) > 20 ? "blur(1.5px)" : undefined }}>
            {Array.from({ length: 16 }).map((_, i) => (
              <div key={i} style={{ height: 560, marginBottom: 40, borderRadius: 32, background: i % 3 === 0 ? "linear-gradient(160deg, #1d3570, #0f1d42)" : i % 3 === 1 ? "linear-gradient(160deg, #283a63, #152447)" : "linear-gradient(160deg, #1a2d5a, #0c1838)", border: "1px solid rgba(255,255,255,0.08)", padding: 34 }}>
                <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                  <div style={{ width: 64, height: 64, borderRadius: "50%", background: "rgba(255,255,255,0.2)" }} />
                  <Bar w={200} h={20} />
                </div>
                <div style={{ height: 300, borderRadius: 22, background: "rgba(255,255,255,0.07)", marginTop: 26 }} />
                <Bar w={420} h={18} style={{ marginTop: 26 }} />
              </div>
            ))}
          </div>
          <AbsoluteFill style={{ background: "linear-gradient(180deg, rgba(8,17,42,0.92) 0%, rgba(8,17,42,0.35) 35%, rgba(8,17,42,0.35) 65%, rgba(8,17,42,0.92) 100%)" }} />
          <div style={{ position: "absolute", top: 260, left: 0, right: 0, opacity: 1 - tw(f, Q1 - 4, 8, 0, 1) }}>
            <Words text={"DES CENTAINES\nDE CONTENUS"} start={FEED + 2} size={96} highlight={["CENTAINES"]} />
          </div>
          {f >= Q1 && (
            <div style={{ position: "absolute", top: 600, left: 90, right: 150, padding: "34px 40px", borderRadius: 28, background: "rgba(16,29,60,0.88)", border: "1px solid rgba(255,255,255,0.12)", opacity: tw(f, Q1, 10, 0, 1) * (1 - tw(f, Q2 + 10, 10, 0, 0.6)), transform: `translateY(${tw(f, Q1, 16, 40, 0)}px)` }}>
              <div style={{ fontFamily: FONT_BODY, fontSize: 30, color: C.mute }}>La question n'est plus seulement :</div>
              <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 52, color: C.white, marginTop: 10, position: "relative", display: "inline-block" }}>
                Que voulez-vous leur dire ?
                <div style={{ position: "absolute", left: 0, top: "52%", height: 6, width: `${tw(f, Q2 - 10, 12, 0, 100)}%`, background: C.cyan }} />
              </div>
            </div>
          )}
          {f >= Q2 && (
            <div style={{ position: "absolute", top: 950, left: 0, right: 0 }}>
              <Words text={"COMMENT ALLEZ-VOUS\nCAPTER LEUR\nATTENTION ?"} start={Q2} size={96} stagger={3} highlight={["ATTENTION"]} lineHeight={1.08} />
            </div>
          )}
        </AbsoluteFill>
      )}
      <AbsoluteFill style={{ background: C.white, opacity: tw(f, scene("s15").duration - 8, 8, 0, 1, E.linear) }} />
    </AbsoluteFill>
  );
};
