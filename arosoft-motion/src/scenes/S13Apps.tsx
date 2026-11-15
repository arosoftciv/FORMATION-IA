import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { NightBg } from "../components/Backgrounds";
import { Words } from "../components/Kinetic";
import { Bar } from "../components/Phone";
import { DrawIcon } from "../components/Icons";
import { C, E, FONT_BODY, FONT_TITLE, kf, tw } from "../theme";
import { cue, scene } from "../timeline";

/** SCÈNE 13 — Carte service → infographie → smartphone avec interface vivante */
export const S13Apps: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s13").from;
  const D = scene("s13").duration;
  const APP = cue("13", "Une application", 0.2) - S;
  const M = APP - 6; // morph carte → téléphone
  const m = tw(f, M, 18, 0, 1, E.inOut);
  const w = 760 + (420 - 760) * m;
  const h = 560 + (840 - 560) * m;
  const r = 36 + 26 * m;
  const top = 620 + (560 - 620) * m;
  const u = f - (M + 18); // temps interface
  const tab = u < 30 ? 0 : 1;
  const tapRipple = tw(u, 22, 14, 0, 1);
  const slide = tw(u, 30, 14, 0, 1, E.inOut);
  const loading = u > 44 && u < 64;
  const done = tw(u, 64, 12, 0, 1, E.back);
  return (
    <AbsoluteFill>
      <NightBg />
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, height: 260 }}>
        {f < APP ? (
          <Words text={"EXPLIQUEZ\nVOS SERVICES"} start={2} size={104} highlight={["SERVICES"]} exit={APP - 8} />
        ) : (
          <Words text={"PRÉSENTEZ VOS\nAPPLICATIONS"} start={APP} size={98} highlight={["APPLICATIONS"]} />
        )}
      </div>
      <div style={{ position: "absolute", left: 540 - w / 2, top, width: w, height: h, borderRadius: r, background: m > 0.5 ? "#0d1a3a" : "linear-gradient(160deg, rgba(255,255,255,0.13), rgba(255,255,255,0.04))", border: "1px solid rgba(255,255,255,0.15)", boxShadow: `0 40px 100px rgba(0,0,0,0.4), inset 0 0 0 ${m * 14}px #24365F`, overflow: "hidden", transform: `scale(${tw(f, 2, 16, 0.7, 1, E.back)})`, opacity: tw(f, 2, 8, 0, 1) }}>
        {/* infographie service */}
        <div style={{ position: "absolute", inset: 40, opacity: 1 - tw(f, M - 4, 8, 0, 1) }}>
          <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 40, color: C.white }}>Votre service</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 24, color: C.mute, marginTop: 6 }}>en 3 étapes claires</div>
          <div style={{ position: "absolute", left: 50, right: 50, top: 210, height: 6, background: "rgba(255,255,255,0.12)" }} />
          <div style={{ position: "absolute", left: 50, top: 210, height: 6, width: tw(f, 14, 40, 0, 580, E.inOut), background: C.cyan }} />
          {[0, 1, 2].map((i) => {
            const on = tw(f, 14 + i * 14, 12, 0, 1, E.back);
            return (
              <div key={i} style={{ position: "absolute", left: 50 + i * 290 - 40, top: 173, width: 80, textAlign: "center" }}>
                <div style={{ width: 80, height: 80, borderRadius: "50%", background: C.electric, color: "#fff", fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 36, display: "flex", alignItems: "center", justifyContent: "center", transform: `scale(${on})` }}>{i + 1}</div>
              </div>
            );
          })}
          <div style={{ position: "absolute", left: 0, right: 0, top: 300, display: "flex", alignItems: "flex-end", gap: 30, height: 160, justifyContent: "center" }}>
            {[0.5, 0.75, 1].map((v, i) => (
              <div key={i} style={{ width: 120, height: 160 * v * tw(f, 24 + i * 6, 18, 0, 1, E.back), borderRadius: 16, background: i === 2 ? C.cyan : "rgba(255,255,255,0.25)" }} />
            ))}
          </div>
        </div>
        {/* interface mobile */}
        {m > 0.6 && (
          <div style={{ position: "absolute", inset: 14, borderRadius: r - 10, overflow: "hidden", opacity: tw(f, M + 12, 8, 0, 1) }}>
            <div style={{ position: "absolute", top: 18, left: "50%", width: 110, height: 28, marginLeft: -55, borderRadius: 14, background: "#050a18" }} />
            {/* écran 1 : liste */}
            <div style={{ position: "absolute", inset: 0, padding: "80px 28px", transform: `translateX(${-slide * 100}%)` }}>
              <div style={{ display: "flex", gap: 24, fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 26, color: C.white, position: "relative" }}>
                <span style={{ opacity: tab === 0 ? 1 : 0.5 }}>Accueil</span>
                <span style={{ opacity: tab === 1 ? 1 : 0.5 }}>Services</span>
                <span style={{ opacity: 0.5 }}>Profil</span>
                <div style={{ position: "absolute", top: 40, height: 5, borderRadius: 3, background: C.cyan, width: tab ? 120 : 110, left: kf(u, [10, 20], [0, 140], E.inOut) }} />
              </div>
              {[0, 1, 2, 3].map((i) => (
                <div key={i} style={{ marginTop: i === 0 ? 50 : 18, height: 110, borderRadius: 22, background: i === 1 ? "rgba(7,156,239,0.25)" : "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", gap: 18, padding: 18, position: "relative", overflow: "hidden", transform: `translateY(${tw(u, i * 3, 14, 60, 0)}px)`, opacity: tw(u, i * 3, 8, 0, 1) }}>
                  <div style={{ width: 70, height: 70, borderRadius: 18, background: i === 1 ? C.cyan : C.electric }} />
                  <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                    <Bar w={150} h={18} color="rgba(255,255,255,0.85)" />
                    <Bar w={100} h={12} />
                  </div>
                  {i === 1 && <div style={{ position: "absolute", left: 200, top: 50, width: 400, height: 400, marginLeft: -200, marginTop: -200, borderRadius: "50%", background: "rgba(255,255,255,0.25)", transform: `scale(${tapRipple})`, opacity: 1 - tapRipple }} />}
                </div>
              ))}
            </div>
            {/* écran 2 : détail + chargement */}
            <div style={{ position: "absolute", inset: 0, padding: "80px 28px", transform: `translateX(${(1 - slide) * 100}%)`, background: "#0d1a3a" }}>
              <div style={{ height: 300, borderRadius: 26, background: `linear-gradient(135deg, ${C.electric}, ${C.royal})` }} />
              <Bar w={260} h={30} color="rgba(255,255,255,0.9)" style={{ marginTop: 28 }} />
              <Bar w={200} h={16} style={{ marginTop: 16 }} />
              <div style={{ marginTop: 40, height: 90, borderRadius: 999, background: C.cyan, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 28, color: C.night }}>
                {loading ? (
                  <div style={{ width: 44, height: 44, borderRadius: "50%", border: "6px solid rgba(16,29,60,0.25)", borderTopColor: C.night, transform: `rotate(${u * 18}deg)` }} />
                ) : u >= 64 ? (
                  <div style={{ transform: `scale(${done})` }}><DrawIcon name="check" progress={done} size={56} color={C.night} stroke={16} /></div>
                ) : (
                  "RÉSERVER"
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      <AbsoluteFill style={{ background: C.white, clipPath: `circle(${tw(f, D - 10, 10, 0, 150, E.in)}% at 50% 60%)` }} />
    </AbsoluteFill>
  );
};
