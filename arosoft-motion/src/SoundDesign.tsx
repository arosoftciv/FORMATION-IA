import React from "react";
import { Audio, Sequence, interpolate, staticFile } from "remotion";
import { VO, cue, scene, segEnd, TOTAL_FRAMES } from "./timeline";
import { soundHits } from "./scenes/S09Sound";
import { cta } from "./scenes/S16CTA";

type Sfx = { at: number; name: string; vol?: number };

/** Tous les effets, placés sur les mêmes repères que les animations. */
const buildSfx = (): Sfx[] => {
  const s = (k: string) => scene(k).from;
  const list: Sfx[] = [];
  const add = (at: number, name: string, vol = 0.5) => list.push({ at: Math.max(0, Math.round(at)), name, vol });

  // 01 hook
  add(cue("01") + 1, "boom", 0.9);
  add(cue("01") + 1, "impact", 0.7);
  add(cue("01", "Cette", 0.75) - 4, "whoosh", 0.45);
  add(cue("01", "personne", 0.55) + 14, "click", 0.4);
  // 02
  add(cue("02", "Pas de caméra"), "pop", 0.45);
  add(cue("02", "Pas d'acteur", 0.15), "pop", 0.45);
  add(cue("02", "Pas de décor", 0.25), "pop", 0.45);
  add(cue("02", "Aucun", 0.05) + 2, "impact", 0.6);
  add(s("s03") - 12, "whoosh", 0.5);
  // 03
  add(cue("03", "vous", 0.35), "tick", 0.5);
  add(s("s04") - 12, "whoosh_short", 0.4);
  // 04
  for (const p of ["des mots", "des chiffres", "des formes", "des animations"]) add(cue("04a", p), "pop", 0.35);
  add(cue("04b") - 48, "riser", 0.45);
  add(cue("04b"), "boom", 0.8);
  add(cue("04b", "Et chez", 0.35), "shimmer", 0.35);
  add(s("s05") - 10, "whoosh", 0.4);
  // 05
  add(cue("05a", "et on passe", 0.35) + 8, "whoosh_short", 0.5);
  add(cue("05a", "Mais un texte", 0.35), "pop", 0.4);
  add(cue("05a", "une carte", 0.4), "whoosh", 0.4);
  add(cue("05a", "un chiffre", 0.4), "impact", 0.65);
  add(cue("05a", "Votre regard", 0.45), "tick", 0.4);
  add(cue("05b"), "impact", 0.6);
  add(cue("05b", "Ce qui fait", 0.35) + 18, "click", 0.35);
  add(s("s06") - 10, "whoosh", 0.4);
  // 06-08 techniques
  add(s("s06") + 24, "whoosh_short", 0.25);
  for (let k = 0; k < 4; k++) add(s("s07") + 20 + 6 + k * 38, "whoosh_short", 0.4);
  add(s("s08") - 8, "whoosh", 0.35);
  for (const k of [14, 46, 80, 116, 150]) add(s("s08") + k - 10, "pop", 0.3);
  // 09 sound demo (synchro exacte avec l'image)
  const h = soundHits();
  add(h.boom, "boom", 1.0);
  add(h.click, "click", 1.0);
  add(h.whoosh, "whoosh", 1.0);
  // 10 diaporama : seulement un clic de télécommande discret
  for (const p of ["Plus de mouvement", "Plus de transitions", "Plus d'effets", "Juste"]) add(cue("10", p, 0.3), "tick", 0.15);
  // 11 retour
  add(s("s11") - 46, "riser", 0.55);
  add(s("s11") + 2, "boom", 1.0);
  add(s("s11") + 2, "whoosh", 0.7);
  add(s("s12") - 8, "whoosh_short", 0.4);
  // 12-14
  add(s("s12") + 4, "pop", 0.35);
  add(s("s12") + 72, "click", 0.5);
  add(s("s13") - 8, "whoosh", 0.35);
  add(cue("13", "Une application", 0.2) - 6, "whoosh_short", 0.4);
  add(cue("13", "Une application", 0.2) + 34, "click", 0.4);
  add(s("s14") - 8, "whoosh", 0.35);
  add(s("s14") + 6, "pop", 0.4);
  add(cue("14", "Ou simplement", 0.25), "whoosh", 0.4);
  // 15 process
  add(cue("15a") + 4, "tick", 0.4);
  for (const p of ["Du scénario", "à la voix-off", "des animations", "nous nous occupons"]) add(cue("15a", p, 0.35), "tick", 0.4);
  add(cue("15a", "nous nous occupons", 0.4) + 26, "whoosh", 0.4);
  add(cue("15b") - 2, "whoosh", 0.4);
  add(cue("15b", "comment", 0.55), "impact", 0.4);
  add(cue("15c", "Aro Soft", 1.0), "shimmer", 0.6);
  add(cue("15c", "Aro Soft", 1.0), "boom", 0.35);
  // 16 CTA
  const c = cta();
  const s16 = s("s16");
  for (let k = 0; k < 6; k++) add(s16 + c.typeStart + k * 4, "tick", 0.3);
  add(s16 + c.send, "send", 0.6);
  add(s16 + c.WA, "pop", 0.4);
  add(s16 + c.END, "shimmer", 0.4);
  return list;
};

export const SoundDesign: React.FC = () => {
  const sfx = buildSfx();
  const s10 = scene("s10");
  const s11 = scene("s11");
  const musicVol = (f: number) => {
    const fadeIn = interpolate(f, [0, 20], [0.5, 1], { extrapolateRight: "clamp" });
    // diaporama : la musique s'efface, puis revient avec force
    const slide = interpolate(f, [s10.from - 10, s10.from + 6, s11.from, s11.from + 2], [1, 0.05, 0.05, 1.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const settle = interpolate(f, [s11.from + 2, s11.from + 40], [1, 1 / 1.5], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    const demo = f > segEnd("09") - 4 && f < segEnd("09") + 60 ? 0.4 : 1;
    const out = interpolate(f, [TOTAL_FRAMES - 60, TOTAL_FRAMES], [1, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
    return 0.16 * fadeIn * (f < s11.from + 2 ? slide : 1.5 * settle) * demo * out;
  };
  return (
    <>
      <Audio src={staticFile("audio/sfx/music_bed.mp3")} volume={musicVol} />
      {Object.values(VO).map((v) => (
        <Sequence key={v.id} from={v.from} durationInFrames={v.frames + 6} name={`VO ${v.id}`}>
          <Audio src={staticFile(`audio/vo/${v.id}.mp3`)} volume={1} />
        </Sequence>
      ))}
      {sfx.map((x, i) => (
        <Sequence key={i} from={x.at} durationInFrames={90} name={`SFX ${x.name}`}>
          <Audio src={staticFile(`audio/sfx/${x.name}.wav`)} volume={x.vol} />
        </Sequence>
      ))}
    </>
  );
};
