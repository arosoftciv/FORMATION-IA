import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LightBg } from "../components/Backgrounds";
import { Words } from "../components/Kinetic";
import { DrawIcon } from "../components/Icons";
import { Card } from "../components/Phone";
import { C, E, FONT_BODY, FONT_TITLE, gradText, kf, tw } from "../theme";
import { scene } from "../timeline";

/** SCÈNE 12 — Lancement de produit : une fiche produit fictive se construit */
export const S12Product: React.FC = () => {
  const f = useCurrentFrame();
  const D = scene("s12").duration;
  const build = (d: number, len = 14) => tw(f, d, len, 0, 1, E.out);
  const press = kf(f, [70, 74, 80], [1, 0.92, 1], E.out);
  const ripple = tw(f, 72, 18, 0, 1, E.out);
  return (
    <AbsoluteFill>
      <LightBg />
      <div style={{ position: "absolute", top: 250, left: 0, right: 0 }}>
        <Words text={"LANCEZ VOS\nPRODUITS"} start={2} size={112} color={C.night} highlight={["PRODUITS"]} highlightColor={C.electric} />
      </div>
      <div style={{ position: "absolute", left: 160, top: 610, width: 760, transformOrigin: "top", transform: `scaleY(${build(4, 16)})` }}>
        <Card light style={{ padding: 40, overflow: "hidden" }}>
          {/* visuel produit stylisé */}
          <div style={{ height: 380, borderRadius: 28, background: `linear-gradient(135deg, ${C.night}, ${C.royal} 60%, ${C.cyan})`, position: "relative", overflow: "hidden", opacity: build(10) }}>
            <div style={{ position: "absolute", left: "50%", top: "50%", width: 200, height: 200, marginLeft: -100, marginTop: -100, borderRadius: 52, background: "rgba(255,255,255,0.12)", border: "3px solid rgba(255,255,255,0.4)", transform: `rotate(${tw(f, 10, 40, -30, -8)}deg) scale(${build(12, 20)})`, display: "flex", alignItems: "center", justifyContent: "center" }}>
              <DrawIcon name="bolt" progress={build(18, 20)} size={130} color="#fff" fill="#fff" fillOpacity={build(30)} />
            </div>
            <div style={{ position: "absolute", left: -200 + tw(f, 14, 40, 0, 1400), top: 0, width: 120, height: "100%", background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.35), transparent)", transform: "skewX(-20deg)" }} />
          </div>
          <div style={{ marginTop: 30, display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 64, color: C.night, opacity: build(16), transform: `translateY(${(1 - build(16)) * 30}px)` }}>NOVA PRO</div>
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 40, ...gradText(C.electric, C.royal), opacity: build(30) }}>25 000 FCFA</div>
          </div>
          {["Design moderne", "Prise en main rapide", "Livraison incluse"].map((t, i) => (
            <div key={t} style={{ display: "flex", alignItems: "center", gap: 18, marginTop: 18, opacity: build(22 + i * 6), transform: `translateX(${(1 - build(22 + i * 6)) * 80}px)` }}>
              <div style={{ width: 44, height: 44, borderRadius: "50%", background: C.electric, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <DrawIcon name="check" progress={build(26 + i * 6)} size={30} color="#fff" stroke={16} />
              </div>
              <div style={{ fontFamily: FONT_BODY, fontWeight: 500, fontSize: 34, color: C.ink }}>{t}</div>
            </div>
          ))}
          <div style={{ position: "relative", marginTop: 34, height: 100, borderRadius: 999, background: C.royal, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 36, color: C.white, letterSpacing: 2, transform: `scale(${press * build(40)})`, overflow: "hidden" }}>
            <div style={{ position: "absolute", width: 600, height: 600, borderRadius: "50%", background: "rgba(255,255,255,0.3)", transform: `scale(${ripple})`, opacity: 1 - ripple }} />
            COMMANDER
          </div>
        </Card>
      </div>
      <div style={{ position: "absolute", bottom: 300, left: 0, right: 0, textAlign: "center", fontFamily: FONT_BODY, fontSize: 22, color: C.mute }}>Exemple fictif</div>
      <AbsoluteFill style={{ background: C.night, clipPath: `inset(0 0 ${100 - tw(f, D - 9, 9, 0, 100, E.in)}% 0)` }} />
    </AbsoluteFill>
  );
};
