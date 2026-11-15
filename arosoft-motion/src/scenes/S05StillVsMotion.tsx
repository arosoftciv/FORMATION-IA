import React from "react";
import { AbsoluteFill, useCurrentFrame } from "remotion";
import { LightBg } from "../components/Backgrounds";
import { Words, Label } from "../components/Kinetic";
import { C, E, FONT_BODY, FONT_TITLE, gradText, kf, tw } from "../theme";
import { cue, scene } from "../timeline";

/** Publicité fictive générique (aucune marque, aucune statistique) */
const PosterContent: React.FC<{ f: number; alive: number; start: number }> = ({ f, alive, start }) => {
  const a = (d: number, len = 14) => (alive ? tw(f, start + d, len, 0, 1, E.out) : 1);
  return (
    <div style={{ width: "100%", height: "100%", position: "relative", overflow: "hidden", borderRadius: 36, background: `linear-gradient(160deg, ${C.night}, ${C.royal})` }}>
      <div style={{ position: "absolute", width: 380, height: 380, borderRadius: "50%", right: -80, top: -60, background: `radial-gradient(circle, ${C.cyan}, transparent 70%)`, opacity: 0.7, transform: `scale(${alive ? 0.6 + 0.4 * a(0, 30) : 1})` }} />
      <div style={{ position: "absolute", left: 50, top: 70, fontFamily: FONT_TITLE, fontWeight: 700, fontSize: 30, letterSpacing: 6, color: C.cyan, opacity: a(2) }}>NOUVEAU</div>
      <div style={{ position: "absolute", left: 50, top: 120, fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 92, lineHeight: 0.95, color: C.white }}>
        {["VOTRE", "PRODUIT", "ICI"].map((w, i) => (
          <div key={i} style={{ overflow: "hidden" }}>
            <div style={{ transform: `translateY(${(1 - a(4 + i * 4)) * 105}%)` }}>{w}</div>
          </div>
        ))}
      </div>
      <div style={{ position: "absolute", left: 50, bottom: 60, padding: "22px 40px", borderRadius: 999, background: C.white, color: C.royal, fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 32, transform: `scale(${alive ? tw(f, start + 18, 14, 0, 1, E.back) : 1})` }}>DÉCOUVRIR</div>
    </div>
  );
};

/** SCÈNE 05 — Image fixe vs mouvement, puis « la qualité de l'animation » */
export const S05StillVsMotion: React.FC = () => {
  const f = useCurrentFrame();
  const S = scene("s05").from;
  const LOOK = cue("05a") - S;
  const FIXED = cue("05a", "Une image", 0.25) - S;
  const PASS = cue("05a", "et on passe", 0.35) - S;
  const TEXT = cue("05a", "Mais un texte", 0.35) - S;
  const CARD = cue("05a", "une carte", 0.4) - S;
  const NUM = cue("05a", "un chiffre", 0.4) - S;
  const GAZE = cue("05a", "Votre regard", 0.45) - S;
  const WARN = cue("05b") - S;
  const NOT = cue("05b", "Faire bouger", 0.3) - S;
  const QUAL = cue("05b", "Ce qui fait", 0.35) - S;

  const partA = f < WARN - 2;
  // swipe « on passe »
  const swipe = tw(f, PASS + 8, 10, 0, 1, E.in);
  const alive = f >= TEXT;
  const unfold = tw(f, CARD, 20, 0, 1, E.out);
  const burst = tw(f, NUM, 24, 0, 1, E.out);
  const gazeT = tw(f, GAZE, 50, 0, 1, E.inOut);

  return (
    <AbsoluteFill>
      <LightBg />
      {partA && (
        <>
          <div style={{ position: "absolute", top: 250, left: 0, right: 0, textAlign: "center" }}>
            <Label dark={false} style={{ opacity: tw(f, LOOK, 8, 0, 1) }}>Regardez bien</Label>
          </div>
          {/* étiquette IMAGE FIXE (volontairement plate) puis MOUVEMENT */}
          {f >= FIXED && f < TEXT && (
            <div style={{ position: "absolute", top: 330, left: 0, right: 0, textAlign: "center", fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 84, color: "#9AA6BD" }}>IMAGE FIXE</div>
          )}
          {f >= TEXT && (
            <div style={{ position: "absolute", top: 320, left: 0, right: 0 }}>
              <Words text="MOUVEMENT" start={TEXT} size={110} color={C.royal} stagger={2} />
            </div>
          )}
          {/* la carte */}
          {f >= FIXED && (
            <div
              style={{
                position: "absolute",
                left: 170,
                top: 480,
                width: 740,
                height: 700,
                perspective: 1600,
                transform: alive ? `translateY(${tw(f, TEXT, 18, 120, 0, E.out)}px) scale(${tw(f, NUM, 10, 1, 1.04, E.out) - tw(f, NUM + 10, 14, 0, 0.04, E.inOut)})` : `translateY(${-swipe * 1500}px) rotate(${-swipe * 8}deg)`,
                opacity: alive ? 1 : 1,
                filter: !alive && swipe > 0 ? `blur(${swipe * 10}px)` : undefined,
                display: !alive && swipe >= 1 ? "none" : "block",
              }}
            >
              {alive ? (
                <div style={{ width: "100%", height: "100%", position: "relative", transformStyle: "preserve-3d" }}>
                  <div style={{ position: "absolute", inset: 0, boxShadow: "0 30px 70px rgba(16,29,60,0.22)", borderRadius: 36 }}>
                    <PosterContent f={f} alive={1} start={TEXT} />
                  </div>
                  {/* la carte se déploie : un volet s'ouvre sur sa charnière */}
                  <div style={{ position: "absolute", left: 30, right: 30, top: 700 - 24, height: 200, transformOrigin: "top", transform: `rotateX(${(1 - unfold) * -100}deg)`, opacity: Math.min(1, unfold * 4), borderRadius: "0 0 30px 30px", background: C.white, boxShadow: "0 30px 60px rgba(16,29,60,0.18)", padding: "50px 40px 30px", display: "flex", flexDirection: "column", gap: 18 }}>
                    <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 34, color: C.night }}>Disponible maintenant</div>
                    <div style={{ height: 14, borderRadius: 7, background: C.light, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${tw(f, CARD + 8, 30, 0, 100, E.inOut)}%`, background: `linear-gradient(90deg, ${C.cyan}, ${C.royal})` }} />
                    </div>
                  </div>
                </div>
              ) : (
                <div style={{ width: "100%", height: "100%", boxShadow: "0 20px 40px rgba(16,29,60,0.15)", borderRadius: 36, filter: "saturate(0.35)" }}>
                  <PosterContent f={f} alive={0} start={0} />
                </div>
              )}
              {/* chiffre qui explose */}
              {f >= NUM && (
                <div style={{ position: "absolute", right: -60, top: 230, width: 300, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ position: "absolute", inset: 0, borderRadius: "50%", border: `6px solid ${C.cyan}`, transform: `scale(${0.3 + burst * 1.4})`, opacity: 1 - burst }} />
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div key={i} style={{ position: "absolute", width: 70, height: 8, borderRadius: 4, background: i % 2 ? C.cyan : C.electric, transform: `rotate(${i * 36}deg) translateX(${60 + burst * 110}px)`, opacity: 1 - burst }} />
                  ))}
                  <div style={{ width: 230, height: 230, borderRadius: "50%", background: C.white, boxShadow: "0 20px 50px rgba(7,59,180,0.3)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", transform: `scale(${kf(f, [NUM, NUM + 8, NUM + 16], [0, 1.25, 1], E.out)})` }}>
                    <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 96, lineHeight: 1, ...gradText(C.cyan, C.royal) }}>{Math.round(tw(f, NUM, 20, 0, 30, E.out))}</div>
                    <div style={{ fontFamily: FONT_BODY, fontWeight: 600, fontSize: 20, color: C.night }}>images / sec</div>
                  </div>
                </div>
              )}
            </div>
          )}
          {/* le regard suit le mouvement */}
          {f >= GAZE && (
            <svg width={1080} height={1920} style={{ position: "absolute", left: 0, top: 0 }}>
              <path id="gz" d="M150 1520 C 350 1420, 600 1680, 930 1450" stroke={C.electric} strokeWidth={5} strokeDasharray="10 14" fill="none" opacity={0.6} />
              {(() => {
                const t = gazeT;
                const x = (1 - t) ** 3 * 150 + 3 * (1 - t) ** 2 * t * 350 + 3 * (1 - t) * t * t * 600 + t ** 3 * 930;
                const y = (1 - t) ** 3 * 1520 + 3 * (1 - t) ** 2 * t * 1420 + 3 * (1 - t) * t * t * 1680 + t ** 3 * 1450;
                return (
                  <g transform={`translate(${x} ${y})`}>
                    <ellipse rx={46} ry={28} fill="#fff" stroke={C.night} strokeWidth={5} />
                    <circle r={16} fill={C.royal} cx={8} />
                  </g>
                );
              })()}
            </svg>
          )}
          {f >= GAZE && (
            <div style={{ position: "absolute", top: 1640, left: 0, right: 0 }}>
              <Words text="LE REGARD SUIT LE MOUVEMENT" start={GAZE + 6} size={44} weight={800} color={C.night} stagger={2} />
            </div>
          )}
        </>
      )}

      {!partA && (
        <AbsoluteFill>
          {/* MAIS ATTENTION ! */}
          <div style={{ position: "absolute", top: 380, left: 0, right: 0, transform: `translate(${f < WARN + 12 ? Math.sin(f * 3) * 10 : 0}px, 0)`, opacity: (1 - tw(f, NOT - 4, 8, 0, 0.75)) * (1 - tw(f, QUAL - 6, 6, 0, 1, E.linear)) }}>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 20 }}>
              <svg width={150} height={135} viewBox="0 0 150 135" style={{ transform: `scale(${tw(f, WARN, 14, 0, 1, E.back)})` }}>
                <path d="M75 8 L142 126 L8 126 Z" fill={C.electric} stroke={C.electric} strokeWidth={10} strokeLinejoin="round" />
                <rect x={69} y={45} width={12} height={46} rx={6} fill="#fff" />
                <circle cx={75} cy={106} r={8} fill="#fff" />
              </svg>
            </div>
            <Words text={"MAIS\nATTENTION !"} start={WARN + 2} size={130} color={C.night} stagger={3} />
          </div>
          {/* faire bouger ne suffit pas : une boîte qui bouge mal (linéaire, saccadé) */}
          {f >= NOT && (
            <div style={{ position: "absolute", top: 820, left: 0, right: 0, opacity: 1 - tw(f, QUAL - 4, 8, 0, 1) }}>
              <Words text={"BOUGER NE\nSUFFIT PAS"} start={NOT} size={88} color={C.night} stagger={3} />
              <div style={{ position: "relative", height: 200, margin: "40px 120px 0" }}>
                <div style={{ position: "absolute", top: 90, left: 0, right: 0, height: 4, background: "#C9D3E6" }} />
                <div style={{ position: "absolute", top: 40, left: Math.floor(((f - NOT) % 30) / 5) * 130, width: 104, height: 104, background: "#A8B3C9", borderRadius: 8 }} />
                <div style={{ position: "absolute", right: -30, top: 30, fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 90, color: "#E0475B" }}>✕</div>
              </div>
            </div>
          )}
          {f >= QUAL && (
            <AbsoluteFill style={{ justifyContent: "center", alignItems: "center" }}>
              <Label dark={false} style={{ opacity: tw(f, QUAL, 10, 0, 1), marginBottom: 10 }}>Ce qui fait la différence</Label>
              <Words text="LA QUALITÉ" start={QUAL + 2} size={130} color={C.royal} stagger={3} />
              <Words text="DE L'ANIMATION" start={QUAL + 6} size={84} color={C.night} stagger={3} />
              <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: 18, marginTop: 60, width: 860 }}>
                {["01 VITESSE", "02 FLOU", "03 TRANSITIONS", "04 SON"].map((t, i) => (
                  <div key={t} style={{ padding: "16px 28px", borderRadius: 999, background: i % 2 ? C.white : C.royal, color: i % 2 ? C.royal : C.white, border: `2px solid ${C.royal}`, fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 30, transform: `translateY(${tw(f, QUAL + 18 + i * 4, 16, 60, 0, E.back)}px)`, opacity: tw(f, QUAL + 18 + i * 4, 8, 0, 1) }}>
                    {t}
                  </div>
                ))}
              </div>
            </AbsoluteFill>
          )}
        </AbsoluteFill>
      )}
      {/* sortie : volet bleu nuit qui monte */}
      <AbsoluteFill style={{ background: C.night, transform: `translateY(${100 - tw(f, scene("s05").duration - 10, 10, 0, 100, E.in)}%)` }} />
    </AbsoluteFill>
  );
};
