import React from "react";
import { Composition, Still } from "remotion";
import { AroSoftAd } from "./AroSoftAd";
import { Cover } from "./Cover";
import { FPS, HEIGHT, TOTAL_FRAMES, WIDTH } from "./timeline";

export const RemotionRoot: React.FC = () => (
  <>
    <Composition id="AroSoftAd" component={AroSoftAd} durationInFrames={TOTAL_FRAMES} fps={FPS} width={WIDTH} height={HEIGHT} />
    <Still id="Cover" component={Cover} width={WIDTH} height={HEIGHT} />
  </>
);
