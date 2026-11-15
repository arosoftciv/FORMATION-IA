/**
 * TIMELINE — tout le montage est dérivé des durées réelles de la voix-off.
 * Les durées proviennent des prises ElevenLabs (voix « Isac », eleven_v4).
 * Remplacer un fichier public/audio/vo/XX.mp3 par une autre prise ?
 * → mettre à jour sa durée ici : toutes les scènes se recalent seules.
 */
import vo from "../scripts/voiceover.json";

export const FPS = 30;
export const WIDTH = 1080;
export const HEIGHT = 1920;

type Seg = { id: string; dur: number; text: string };
const SEGMENTS = vo as Seg[];

/** silence ajouté APRÈS chaque segment (secondes) — respirations du montage */
const GAP_AFTER: Record<string, number> = {
  "01": 0.3, "02": 0.25, "03": 0.45, "04a": 0.15, "04b": 0.5,
  "05a": 0.3, "05b": 0.45, "06": 0.9, "07": 0.9, "08": 0.9,
  "09": 2.1, // démo BOUM / CLIC / WHOOSH après la phrase
  "10": 0.7, "11": 1.1, "12": 1.7, "13": 1.6, "14": 1.3,
  "15a": 0.6, "15b": 0.5, "15c": 1.6, "16": 6.5, // CTA tenu à l'écran
};
const LEAD_IN = 0.12; // le hook démarre quasi immédiatement

export type VoSeg = Seg & { start: number; from: number; frames: number };

export const VO: Record<string, VoSeg> = {};
let cursor = LEAD_IN;
for (const s of SEGMENTS) {
  VO[s.id] = {
    ...s,
    start: cursor,
    from: Math.round(cursor * FPS),
    frames: Math.ceil(s.dur * FPS),
  };
  cursor += s.dur + (GAP_AFTER[s.id] ?? 0.3);
}
export const TOTAL_SECONDS = cursor;
export const TOTAL_FRAMES = Math.ceil(cursor * FPS);

/**
 * Repère temporel d'un mot dans un segment (frame absolue).
 * Estimation proportionnelle à la position du texte dans la phrase,
 * affinée par `offset` (secondes) après écoute de la prise.
 */
export const cue = (id: string, phrase?: string, offset = 0): number => {
  const s = VO[id];
  if (!phrase) return Math.round((s.start + offset) * FPS);
  const idx = s.text.indexOf(phrase);
  const ratio = idx < 0 ? 0 : idx / s.text.length;
  return Math.round((s.start + s.dur * ratio + offset) * FPS);
};
export const segEnd = (id: string) => VO[id].from + VO[id].frames;

/** Scènes : début = début du 1er segment, fin = début de la scène suivante. */
type SceneDef = { key: string; first: string; dark: boolean };
const SCENE_DEFS: SceneDef[] = [
  { key: "s01", first: "01", dark: true },
  { key: "s02", first: "02", dark: false },
  { key: "s03", first: "03", dark: true },
  { key: "s04", first: "04a", dark: true },
  { key: "s05", first: "05a", dark: false },
  { key: "s06", first: "06", dark: true },
  { key: "s07", first: "07", dark: false },
  { key: "s08", first: "08", dark: true },
  { key: "s09", first: "09", dark: true },
  { key: "s10", first: "10", dark: false },
  { key: "s11", first: "11", dark: true },
  { key: "s12", first: "12", dark: false },
  { key: "s13", first: "13", dark: true },
  { key: "s14", first: "14", dark: false },
  { key: "s15", first: "15a", dark: true },
  { key: "s15c", first: "15c", dark: false },
  { key: "s16", first: "16", dark: true },
];

export type SceneRange = { key: string; from: number; duration: number; dark: boolean };
export const SCENES: SceneRange[] = SCENE_DEFS.map((d, i) => {
  const from = i === 0 ? 0 : VO[d.first].from - 4; // l'image anticipe la voix de 4 frames
  const next = SCENE_DEFS[i + 1];
  const to = next ? VO[next.first].from - 4 : TOTAL_FRAMES;
  return { key: d.key, from, duration: to - from, dark: d.dark };
});
export const scene = (key: string) => SCENES.find((s) => s.key === key)!;
/** frame relative à une scène */
export const rel = (key: string, absFrame: number) => absFrame - scene(key).from;
