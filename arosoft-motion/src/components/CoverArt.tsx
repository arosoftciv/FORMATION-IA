import React from "react";
import { AbsoluteFill } from "remotion";
import { C, FONT_BODY, FONT_TITLE, gradText } from "../theme";
import { Phone, Bar, Card } from "./Phone";
import { NightBg } from "./Backgrounds";

/**
 * Illustration de couverture. `burst` (0→1) fait éclater la composition :
 * utilisé tel quel (burst=0) pour la miniature PNG et comme 1re image
 * de la vidéo, puis animé dans la scène 01.
 */
export const CoverArt: React.FC<{ burst?: number; showTitle?: boolean; titleBurst?: number }> = ({
  burst = 0,
  showTitle = true,
  titleBurst = 0,
}) => {
  const b = burst;
  const fly = (dx: number, dy: number, rot = 0): React.CSSProperties => ({
    transform: `translate(${dx * b}px, ${dy * b}px) rotate(${rot * b}deg)`,
    opacity: 1 - Math.min(1, b * 1.3),
  });
  return (
    <AbsoluteFill>
      <NightBg hue="cyan" />
      {/* trajectoires de mouvement */}
      <svg width={1080} height={1920} style={{ position: "absolute", opacity: 1 - b }}>
        <defs>
          <linearGradient id="trail" x1="0" x2="1">
            <stop offset="0" stopColor={C.cyan} stopOpacity="0" />
            <stop offset="1" stopColor={C.cyan} stopOpacity="0.9" />
          </linearGradient>
        </defs>
        <path d="M60 1500 C 260 1300, 380 1520, 560 1260 S 900 1080, 1030 1180" stroke="url(#trail)" strokeWidth="6" fill="none" strokeLinecap="round" />
        <path d="M80 1640 C 320 1560, 520 1700, 760 1480" stroke="url(#trail)" strokeWidth="3" fill="none" strokeDasharray="4 18" strokeLinecap="round" />
        <path d="M980 900 C 860 820, 900 700, 760 640" stroke="url(#trail)" strokeWidth="4" fill="none" strokeLinecap="round" />
      </svg>

      {/* smartphone central incliné */}
      <div style={{ position: "absolute", left: 330, top: 930, transform: `rotate(${-12 + 40 * b}deg) scale(${1 - 0.4 * b}) translateY(${b * 900}px)`, opacity: 1 - b }}>
        <Phone width={420} height={820}>
          <div style={{ padding: "90px 30px 30px", display: "flex", flexDirection: "column", gap: 22 }}>
            <Bar w={180} h={22} color={C.cyan} />
            <Bar w={300} h={56} color="rgba(255,255,255,0.9)" />
            <Bar w={240} h={20} />
            <div style={{ height: 240, borderRadius: 26, background: `linear-gradient(135deg, ${C.electric}, ${C.royal})`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", width: 140, height: 140, borderRadius: "50%", border: "14px solid rgba(255,255,255,0.85)", left: 110, top: 50 }} />
            </div>
            <div style={{ display: "flex", gap: 14 }}>
              <Bar w={160} h={70} color="rgba(7,156,239,0.4)" />
              <Bar w={160} h={70} color="rgba(255,255,255,0.15)" />
            </div>
          </div>
        </Phone>
      </div>

      {/* cartes flottantes figées en pose dynamique */}
      <div style={{ position: "absolute", left: 70, top: 1080, ...fly(-700, 200, -60) }}>
        <Card style={{ width: 300, padding: 26, transform: "rotate(-8deg)" }}>
          <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 64, ...gradText() }}>30</div>
          <div style={{ fontFamily: FONT_BODY, fontSize: 22, color: C.mute }}>images / seconde</div>
          <Bar w={"100%"} h={10} color="rgba(255,255,255,0.12)" style={{ marginTop: 16 }} />
          <Bar w={"70%"} h={10} color={C.cyan} style={{ marginTop: -10 }} />
        </Card>
      </div>
      <div style={{ position: "absolute", left: 700, top: 1000, ...fly(700, -200, 50) }}>
        <Card style={{ width: 280, padding: 24, transform: "rotate(9deg)" }}>
          <svg width="230" height="110">
            <path d="M5 100 C 60 100, 70 10, 225 8" stroke={C.cyan} strokeWidth="6" fill="none" strokeLinecap="round" />
            <circle cx="160" cy="22" r="11" fill={C.white} />
          </svg>
          <div style={{ fontFamily: FONT_TITLE, fontWeight: 800, fontSize: 24, letterSpacing: 3, color: C.white }}>EASING</div>
        </Card>
      </div>
      <div style={{ position: "absolute", left: 760, top: 1420, ...fly(600, 500, 90) }}>
        <div style={{ width: 150, height: 150, borderRadius: 34, background: `linear-gradient(135deg, ${C.cyan}, ${C.royal})`, transform: "rotate(22deg)", boxShadow: "0 20px 60px rgba(8,108,240,0.5)" }} />
      </div>
      <div style={{ position: "absolute", left: 120, top: 1560, ...fly(-500, 600, -80) }}>
        <div style={{ width: 110, height: 110, borderRadius: "50%", border: `14px solid ${C.electric}` }} />
      </div>
      {/* lettres en profondeur */}
      <div style={{ position: "absolute", left: 600, top: 1500, fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 190, color: "rgba(255,255,255,0.07)", ...fly(300, 400, 30) }}>Aa</div>
      {/* petits carrés numériques (écho du logo) */}
      {[0, 1, 2, 3].map((i) => (
        <div key={i} style={{ position: "absolute", left: 90 + (i % 2) * 34 + i * 6, top: 960 + Math.floor(i / 2) * 34, width: 26, height: 26, background: i % 2 ? C.cyan : C.electric, ...fly(-300 - i * 80, -200 - i * 60, 120) }} />
      ))}

      {/* TITRE */}
      {showTitle && (
        <div style={{ position: "absolute", left: 80, right: 140, top: 250, opacity: 1 - titleBurst, transform: `scale(${1 + titleBurst * 0.4})`, filter: `blur(${titleBurst * 14}px)` }}>
          <div style={{ fontFamily: FONT_TITLE, fontWeight: 900, fontSize: 122, lineHeight: 0.98, color: C.white, letterSpacing: -4 }}>
            CETTE VIDÉO
            <br />
            N'A JAMAIS
            <br />
            <span style={gradText(C.cyan, C.electric)}>ÉTÉ FILMÉE !</span>
          </div>
          <div style={{ marginTop: 44, display: "flex", alignItems: "center", gap: 20 }}>
            <div style={{ width: 70, height: 6, background: C.cyan, borderRadius: 3 }} />
            <div style={{ fontFamily: FONT_TITLE, fontWeight: 600, fontSize: 46, color: C.light, lineHeight: 1.15 }}>
              Découvrez le
              <br />
              <span style={{ fontWeight: 900, color: C.white }}>MOTION DESIGN</span>
            </div>
          </div>
        </div>
      )}
    </AbsoluteFill>
  );
};
