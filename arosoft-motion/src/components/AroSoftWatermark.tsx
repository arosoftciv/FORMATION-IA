import React from "react";
import { Img, staticFile, useCurrentFrame } from "remotion";
import { SCENES } from "../timeline";
import { E, tw } from "../theme";

/**
 * Watermark permanent : monogramme AS officiel (PNG alpha), coin supérieur droit.
 * Aucune carte, aucun fond. Seule animation : apparition initiale discrète.
 * Sur fond sombre, un halo lumineux très léger garde le S bleu nuit lisible
 * sans modifier les couleurs officielles du logo.
 */
export const AroSoftWatermark: React.FC<{
  top?: number;
  right?: number;
  width?: number;
  opacity?: number;
}> = ({ top = 90, right = 60, width = 110, opacity = 0.95 }) => {
  const frame = useCurrentFrame();
  const appear = tw(frame, 0, 10, 0.75, 1, E.out); // visible dès la 1re image, entrée très discrète
  // fond sombre ou clair à cette frame → intensité du halo (fondu de 6 frames)
  const glow = SCENES.reduce((acc, s) => {
    const inside = Math.min(
      tw(frame, s.from - 3, 6, 0, 1, E.linear),
      1 - tw(frame, s.from + s.duration - 3, 6, 0, 1, E.linear)
    );
    return acc + (s.dark ? inside : 0);
  }, 0);
  const g = Math.min(1, glow);
  return (
    <Img
      src={staticFile("assets/logo/arosoft-symbol-transparent.png")}
      style={{
        position: "absolute",
        top,
        right,
        width,
        height: "auto",
        opacity: opacity * appear,
        transform: `translateY(${(1 - appear) * -8}px)`,
        filter: `drop-shadow(0 0 1.2px rgba(255,255,255,${0.85 * g})) drop-shadow(0 0 7px rgba(150,200,255,${0.28 * g}))`,
        zIndex: 1000,
      }}
    />
  );
};
