import React from "react";
import { AbsoluteFill, Sequence } from "remotion";
import { SCENES } from "./timeline";
import { AroSoftWatermark } from "./components/AroSoftWatermark";
import { SoundDesign } from "./SoundDesign";
import { S01Hook } from "./scenes/S01Hook";
import { S02NoShoot } from "./scenes/S02NoShoot";
import { S03StillHere } from "./scenes/S03StillHere";
import { S04Discovery } from "./scenes/S04Discovery";
import { S05StillVsMotion } from "./scenes/S05StillVsMotion";
import { S06Easing } from "./scenes/S06Easing";
import { S07Blur } from "./scenes/S07Blur";
import { S08Morph } from "./scenes/S08Morph";
import { S09Sound } from "./scenes/S09Sound";
import { S10Slideshow } from "./scenes/S10Slideshow";
import { S11Return } from "./scenes/S11Return";
import { S12Product } from "./scenes/S12Product";
import { S13Apps } from "./scenes/S13Apps";
import { S14Offers } from "./scenes/S14Offers";
import { S15Process } from "./scenes/S15Process";
import { S15cSignature } from "./scenes/S15cSignature";
import { S16CTA } from "./scenes/S16CTA";

const MAP: Record<string, React.FC> = {
  s01: S01Hook, s02: S02NoShoot, s03: S03StillHere, s04: S04Discovery,
  s05: S05StillVsMotion, s06: S06Easing, s07: S07Blur, s08: S08Morph,
  s09: S09Sound, s10: S10Slideshow, s11: S11Return, s12: S12Product,
  s13: S13Apps, s14: S14Offers, s15: S15Process, s15c: S15cSignature, s16: S16CTA,
};

/** Composition principale 1080×1920 — scènes + sound design + watermark au-dessus */
export const AroSoftAd: React.FC = () => (
  <AbsoluteFill style={{ backgroundColor: "#101D3C" }}>
    {SCENES.map((s) => {
      const Comp = MAP[s.key];
      return (
        <Sequence key={s.key} from={s.from} durationInFrames={s.duration} name={s.key.toUpperCase()}>
          <Comp />
        </Sequence>
      );
    })}
    <SoundDesign />
    <AroSoftWatermark />
  </AbsoluteFill>
);
