import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { NightBg } from "../components/Backgrounds";
import { Words, Label } from "../components/Kinetic";
import { DrawIcon } from "../components/Icons";
import { C, E, FONT_BODY, FONT_TITLE, tw } from "../theme";
import { cue, scene, segEnd } from "../timeline";

export const cta = () => {
  const S = scene("s16").from;
  const W = cue("16", "Écrivez", 0.35) - S;
  return {
    Q: cue("16") - S,
    W,
    typeStart: W + 16,
    send: W + 16 + 6 * 4 + 8,
    WA: cue("16", "WhatsApp", 0.5) - S,
    END: segEnd("16") - S + 6,
  };
};

/** SCÈNE 16 — Appel à l'action. Une fois affichés, les éléments ne bougent plus. */
export const S16CTA: React.FC = () => {
  const f = useCurrentFrame();
  const { Q, W, typeStart, send, WA, END } = cta();
  const typed = "MOTION".slice(0, Math.max(0, Math.min(6, Math.floor((f - typeStart) / 4) + 1)));
  const sent = tw(f, send, 14, 0, 1, E.out);
  const ticks = tw(f, send + 14, 10, 0, 1, E.out);
  const read = f >= send + 30;
  const phase3 = f >= W;
  return (
    <AbsoluteFill>
      <NightBg />
      {!phase3 && (
        <AbsoluteFill style={{ justifyContent: "center", alignItems: "center", paddingBottom: 160 }}>
          {f < Q + 32 ? (
            <Words text={"VOTRE PROCHAINE\nVIDÉO\nCOMMENCE ICI."} start={0} size={110} highlight={["ICI."]} exit={Q + 24} lineHeight={1.08} />
          ) : (
            <Words text={"VOUS VOULEZ\nVOTRE\nMOTION DESIGN ?"} start={Q + 32} size={110} highlight={["MOTION", "DESIGN"]} exit={W - 10} lineHeight={1.08} />
          )}
        </AbsoluteFill>
      )}
      {phase3 && (
        <>
          <div style={{ position: "absolute", top: 260, left: 0, right: 0 }}>
            <Words text="ÉCRIVEZ « MOTION »" start={W} size={84} highlight={["MOTION"]} stagger={3} />
            <div style={{ textAlign: "center", fontFamily: FONT_BODY, fontSize: 32, color: C.light, marginTop: 14, opacity: tw(f, W + 8, 10, 0, 1) }}>en message privé</div>
          </div>
          {/* mini conversation : saisie → envoi → validation */}
          <div style={{ position: "absolute", left: 140, right: 180, top: 500, height: 300, opacity: tw(f, W + 6, 10, 0, 1) }}>
            {f >= send && (
              <div style={{ position: "absolute", right: 0, top: 30 + (1 - sent) * 150, padding: "22px 34px", borderRadius: "34px 34px 8px 34px", background: C.electric, fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 52, color: "#fff", display: "flex", alignItems: "flex-end", gap: 18, transform: `scale(${0.8 + 0.2 * sent})`, transformOrigin: "bottom right", opacity: sent }}>
                MOTION
                <svg width={54} height={30} viewBox="0 0 54 30" style={{ opacity: ticks, marginBottom: 8 }}>
                  <path d="M2 16 L11 25 L28 4" stroke={read ? "#7FE3FF" : "rgba(255,255,255,0.75)"} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M20 22 L23 25 L40 4" stroke={read ? "#7FE3FF" : "rgba(255,255,255,0.75)"} strokeWidth={5} fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
            )}
            <div style={{ position: "absolute", left: 0, right: 0, bottom: 0, height: 104, borderRadius: 52, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.18)", display: "flex", alignItems: "center", padding: "0 14px 0 40px", fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 44, color: "#fff" }}>
              <span style={{ flex: 1 }}>
                {f < send ? typed : ""}
                {f < send && <span style={{ opacity: Math.floor(f / 8) % 2 ? 1 : 0, color: C.cyan }}>|</span>}
              </span>
              <div style={{ width: 78, height: 78, borderRadius: "50%", background: C.cyan, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${f >= send - 2 && f < send + 6 ? 0.85 : 1})` }}>
                <svg width={40} height={40} viewBox="0 0 40 40"><path d="M6 20 L34 6 L26 34 L20 22 Z" fill={C.night} /></svg>
              </div>
            </div>
          </div>
          {/* WhatsApp : numéro parfaitement lisible, fixe */}
          {f >= WA && (
            <div style={{ position: "absolute", left: 90, right: 150, top: 900, padding: "40px 40px", borderRadius: 36, background: "rgba(255,255,255,0.08)", border: `2px solid rgba(7,156,239,0.5)`, opacity: tw(f, WA, 12, 0, 1, E.linear) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
                <div style={{ width: 84, height: 84, borderRadius: 24, background: "#25D366", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <DrawIcon name="chat" progress={tw(f, WA, 20, 0, 1)} size={62} color="#fff" stroke={12} />
                </div>
                <Label style={{ fontSize: 40, letterSpacing: 8, color: C.white }}>WhatsApp</Label>
              </div>
              <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 52, color: C.cyan, marginTop: 26, fontVariantNumeric: "tabular-nums" }}>+225</div>
              <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 90, color: C.white, letterSpacing: 1, lineHeight: 1.05, fontVariantNumeric: "tabular-nums", whiteSpace: "nowrap" }}>05 84 06 06 06</div>
            </div>
          )}
          {/* signature finale */}
          {f >= END && (
            <div style={{ position: "absolute", left: 0, right: 0, top: 1360, display: "flex", flexDirection: "column", alignItems: "center", opacity: tw(f, END, 18, 0, 1, E.linear) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 26 }}>
                <Img src={staticFile("assets/logo/arosoft-symbol-transparent.png")} style={{ width: 120, filter: "drop-shadow(0 0 1.4px rgba(255,255,255,0.9)) drop-shadow(0 0 10px rgba(150,200,255,0.3))" }} />
                <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 96, letterSpacing: 4, lineHeight: 1 }}>
                  <span style={{ color: C.electric }}>ARO</span>
                  <span style={{ color: C.white }}>SOFT</span>
                </div>
              </div>
              <div style={{ marginTop: 22, display: "flex", alignItems: "center", gap: 18, fontFamily: FONT_TITLE, fontWeight: 600, fontSize: 30, letterSpacing: 6, color: C.light }}>
                <div style={{ width: 50, height: 3, background: C.electric }} />
                APPRENDRE • CRÉER • RÉUSSIR
                <div style={{ width: 50, height: 3, background: C.electric }} />
              </div>
            </div>
          )}
        </>
      )}
    </AbsoluteFill>
  );
};
