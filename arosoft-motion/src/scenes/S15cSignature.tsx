import React from "react";
import { AbsoluteFill, Img, staticFile, useCurrentFrame } from "remotion";
import { LightBg } from "../components/Backgrounds";
import { Words } from "../components/Kinetic";
import { C, E, kf, tw } from "../theme";
import { cue, scene } from "../timeline";

const LOGO = staticFile("assets/logo/arosoft-logo-transparent.png");

/**
 * SCÈNE 15c — « Vous êtes encore devant cette vidéo » puis le logo officiel.
 * Le logo n'est jamais déformé : échelle uniforme, révélation par masque,
 * reflet lumineux contraint à la silhouette du logo (mask-image).
 */
export const S15cSignature: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s15c").from;
  const STILL = 4;
  const EFFECT = cue("15c", "C'est exactement", 0.3) - S;
  const LOGO_AT = cue("15c", "Aro Soft", 1.0) - S;
  const LIFE = cue("15c", "Vos idées", 1.15) - S;
  const textOut = tw(f, LOGO_AT - 8, 10, 0, 1, E.in);
  const reveal = tw(f, LOGO_AT, 26, 0, 1, E.out);
  const sweep = tw(f, LOGO_AT + 14, 34, -0.4, 1.4, E.inOut);
  const W = 820;
  const H = Math.round((W * 696) / 910);
  return (
    <AbsoluteFill>
      <LightBg />
      <div style={{ position: "absolute", top: 560, left: 0, right: 0, opacity: 1 - textOut, transform: `translateY(${-textOut * 80}px)` }}>
        <Words text={"VOUS ÊTES\nENCORE LÀ."} start={STILL} size={124} color={C.night} highlight={["ENCORE"]} highlightColor={C.electric} />
        {f >= EFFECT && (
          <div style={{ marginTop: 60 }}>
            <Words text={"C'EST L'EFFET QUE NOUS\nVOULONS CRÉER\nPOUR VOTRE MARQUE"} start={EFFECT} size={58} weight={800} color={C.royal} stagger={2} lineHeight={1.2} />
          </div>
        )}
      </div>
      {f >= LOGO_AT - 2 && (
        <div style={{ position: "absolute", left: (1080 - W) / 2, top: 470, width: W, height: H, transform: `scale(${0.92 + 0.08 * reveal})`, opacity: tw(f, LOGO_AT, 8, 0, 1) }}>
          {/* halo doux derrière le logo */}
          <div style={{ position: "absolute", left: -100, right: -100, top: -100, bottom: -100, background: "radial-gradient(circle, rgba(8,108,240,0.14), transparent 60%)", opacity: reveal }} />
          <Img src={LOGO} style={{ position: "absolute", width: W, height: H, clipPath: `inset(${(1 - reveal) * 100}% 0 0 0)` }} />
          {/* reflet lumineux limité à la forme du logo */}
          <div
            style={{
              position: "absolute",
              width: W,
              height: H,
              WebkitMaskImage: `url(${LOGO})`,
              maskImage: `url(${LOGO})`,
              WebkitMaskSize: "100% 100%",
              maskSize: "100% 100%",
              background: `linear-gradient(105deg, transparent ${sweep * 100 - 12}%, rgba(255,255,255,0.85) ${sweep * 100}%, transparent ${sweep * 100 + 12}%)`,
            }}
          />
        </div>
      )}
      {f >= LIFE && (
        <div style={{ position: "absolute", top: 470 + H + 90, left: 0, right: 0 }}>
          <Words text="VOS IDÉES PRENNENT VIE" start={LIFE} size={70} color={C.night} highlight={["VIE"]} highlightColor={C.electric} stagger={3} />
        </div>
      )}
      <AbsoluteFill style={{ background: C.night, opacity: kf(f, [scene("s15c").duration - 10, scene("s15c").duration], [0, 1], E.linear) }} />
    </AbsoluteFill>
  );
};
