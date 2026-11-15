import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LightBg } from "../components/Backgrounds";
import { Words } from "../components/Kinetic";
import { Bar, Card } from "../components/Phone";
import { DrawIcon } from "../components/Icons";
import { C, E, FONT_BODY, FONT_TITLE, gradText, tw } from "../theme";
import { cue, scene } from "../timeline";

/** SCÈNE 14 — Offre promotionnelle → présentation d'entreprise (exemples fictifs) */
export const S14Offers: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s14").from;
  const D = scene("s14").duration;
  const BIZ = cue("14", "Ou simplement", 0.25) - S;
  const m = tw(f, BIZ, 20, 0, 1, E.inOut);
  const tag = tw(f, 4, 20, 0, 1, E.back);
  // compte à rebours fictif
  const secs = 2 * 3600 + 14 * 60 + 59 - Math.floor(f / 30);
  const hh = String(Math.floor(secs / 3600)).padStart(2, "0");
  const mm = String(Math.floor((secs % 3600) / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  return (
    <AbsoluteFill>
      <LightBg />
      <div style={{ position: "absolute", top: 250, left: 0, right: 0, height: 260 }}>
        {f < BIZ ? (
          <Words text={"ANNONCEZ\nVOS OFFRES"} start={2} size={110} color={C.night} highlight={["OFFRES"]} highlightColor={C.electric} exit={BIZ - 8} />
        ) : (
          <Words text={"FAITES CONNAÎTRE\nVOTRE ENTREPRISE"} start={BIZ} size={84} color={C.night} highlight={["ENTREPRISE"]} highlightColor={C.electric} />
        )}
      </div>
      {/* carte unique qui se transforme */}
      <div style={{ position: "absolute", left: 140, top: 600, width: 800 }}>
        <Card light style={{ height: 700 + 60 * m, padding: 44, position: "relative", overflow: "visible", transform: `rotate(${(1 - m) * -2}deg)` }}>
          {/* étiquette promo qui se déploie depuis une charnière */}
          <div style={{ position: "absolute", right: -30, top: -50, transformOrigin: "top right", transform: `rotate(${(1 - tag) * -90 + 8}deg) scale(${1 - m})`, opacity: 1 - m }}>
            <div style={{ padding: "26px 40px", borderRadius: 24, background: C.electric, color: "#fff", fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 64, boxShadow: "0 20px 50px rgba(8,108,240,0.45)" }}>-20%</div>
          </div>
          {/* contenu offre */}
          <div style={{ opacity: 1 - m * 1.6 }}>
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.electric }}>OFFRE SPÉCIALE</div>
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 78, lineHeight: 1, color: C.night, marginTop: 16 }}>
              Votre offre
              <br />
              de la semaine
            </div>
            <div style={{ display: "flex", gap: 16, marginTop: 50 }}>
              {[hh, mm, ss].map((v, i) => (
                <div key={i} style={{ flex: 1, height: 160, borderRadius: 24, background: C.night, color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `translateY(${tw(f, 10 + i * 4, 16, 60, 0, E.back)}px)`, opacity: tw(f, 10 + i * 4, 8, 0, 1) }}>
                  <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 72, fontVariantNumeric: "tabular-nums" }}>{v}</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 20, color: C.mute }}>{["heures", "min", "sec"][i]}</div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 50, height: 96, borderRadius: 999, background: C.royal, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 34, transform: `scale(${tw(f, 26, 14, 0, 1, E.back)})` }}>J'EN PROFITE</div>
          </div>
          {/* contenu entreprise */}
          {m > 0.3 && (
            <div style={{ position: "absolute", inset: 44, opacity: tw(f, BIZ + 8, 10, 0, 1) }}>
              <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
                <div style={{ width: 140, height: 140, borderRadius: 36, background: `linear-gradient(135deg, ${C.cyan}, ${C.royal})`, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 64, color: "#fff", transform: `scale(${tw(f, BIZ + 8, 16, 0, 1, E.back)})` }}>VE</div>
                <div>
                  <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 52, color: C.night }}>Votre Entreprise</div>
                  <div style={{ fontFamily: FONT_BODY, fontSize: 28, color: C.mute, marginTop: 6 }}>Abidjan · Côte d'Ivoire</div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 22, marginTop: 50 }}>
                {[["star", "Savoir-faire"], ["chat", "Conseil"], ["bolt", "Réactivité"], ["check", "Qualité"]].map(([ic, t], i) => {
                  const p = tw(f, BIZ + 14 + i * 4, 14, 0, 1, E.out);
                  return (
                    <div key={t} style={{ height: 150, borderRadius: 26, background: C.light, display: "flex", alignItems: "center", gap: 18, padding: 22, opacity: p, transform: `translateY(${(1 - p) * 50}px)` }}>
                      <DrawIcon name={ic} progress={p} size={70} color={C.electric} stroke={10} />
                      <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 30, color: C.night }}>{t}</div>
                    </div>
                  );
                })}
              </div>
              <Bar w={`${tw(f, BIZ + 30, 30, 0, 100)}%`} h={10} color={C.electric} style={{ marginTop: 44 }} />
              <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 30, marginTop: 26, ...gradText(C.electric, C.royal), opacity: tw(f, BIZ + 34, 10, 0, 1) }}>Votre histoire, en mouvement.</div>
            </div>
          )}
        </Card>
      </div>
      <div style={{ position: "absolute", bottom: 260, left: 0, right: 0, textAlign: "center", fontFamily: FONT_BODY, fontSize: 22, color: C.mute }}>Exemples fictifs</div>
      <AbsoluteFill style={{ background: C.night, clipPath: `polygon(0 0, ${tw(f, D - 10, 10, 0, 200, E.in)}% 0, ${tw(f, D - 10, 10, 0, 200, E.in) - 100}% 100%, 0 100%)` }} />
    </AbsoluteFill>
  );
};
