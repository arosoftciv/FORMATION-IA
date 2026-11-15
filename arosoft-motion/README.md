# AroSoft — Publicité motion design (Remotion)

Vidéo publicitaire verticale **1080 × 1920, 30 fps, H.264 + AAC stéréo** pour AroSoft.
Tout est généré par le code : typographie cinétique, interfaces animées, morphing,
motion blur, sound design et voix-off synchronisée. Aucune image filmée.

## Livrables

| Fichier | Rôle |
|---|---|
| `out/arosoft-motion-final.mp4` | Vidéo finale 1080×1920 |
| `out/arosoft-motion-cover.png` | Couverture 1080×1920 à importer comme miniature (TikTok, Instagram, Facebook, YouTube) |
| `public/assets/logo/arosoft-logo-transparent.png` | Logo officiel détouré (PNG RGBA) |
| `public/assets/logo/arosoft-symbol-transparent.png` | Monogramme AS seul (PNG RGBA) — sert de watermark |
| `docs/logo-verification-4-fonds.png` | Contrôle du détourage sur bleu nuit, noir, blanc, bleu électrique |
| `web/index.html` | Lecteur web responsive 9:16 avec la couverture en `poster` |

> Un MP4 ne peut pas imposer sa miniature à TikTok ou Instagram : il faut choisir
> `arosoft-motion-cover.png` au moment de la publication quand la plateforme le permet.
> La première image de la vidéo reprend aussi la couverture, qui s'anime dès la 1re seconde.

## Commandes

```bash
npm install
npm run studio        # éditer / prévisualiser dans Remotion Studio
npm run render        # → out/arosoft-motion-final.mp4 (1080×1920)
npm run render:4k     # → 2160×3840 (--scale=2), plus long
npm run cover         # → out/arosoft-motion-cover.png
npm run typecheck
```

Lecteur web : copier `out/arosoft-motion-final.mp4` dans `web/videos/` puis servir le dossier
(`npx serve web`).

## Voix-off

Voix **« Isac »** d'ElevenLabs (voix masculine grave, accent ivoirien, modèle `eleven_v4`),
une prise par phrase (`public/audio/vo/01.mp3` … `16.mp3`, volume harmonisé à −15 LUFS).
Les prises sources sont dans le flow ElevenLabs « AroSoft — Voix-off motion design ».

Synchronisation :
- `scripts/voiceover.json` : texte et durée exacte de chaque prise → tout le montage en découle ;
- `scripts/word_timings.json` : début de chaque mot-repère, **mesuré** sur les prises
  (détection des silences). Les animations et les effets sonores s'y calent via `cue()`.

Changer de voix : remplacer les MP3 (mêmes noms), mettre à jour `dur` dans
`voiceover.json` et les repères dans `word_timings.json`, puis `npm run render`.
`scripts/placeholder_vo.py` régénère une voix de synthèse locale si besoin (maquette hors ligne).

## Structure

```
src/
  timeline.ts            durées voix → frames, scènes, repères cue()
  theme.ts               palette AroSoft, easings, polices embarquées
  AroSoftAd.tsx          composition : 17 séquences + sound design + watermark
  SoundDesign.tsx        voix, nappe musicale (ducking), effets placés sur les repères
  Cover.tsx              couverture indépendante
  components/            AroSoftWatermark, Kinetic (Words/Letters), GhostTrail (motion blur),
                         CoverArt, Phone, Icons (tracé SVG), Backgrounds
  scenes/S01…S16         une scène par fichier
scripts/
  remove_bg.py           détourage du logo (alpha par dé-mélange du blanc)
  make_sfx.py            sound design procédural (boom, clic, whoosh, riser…) + nappe
  placeholder_vo.py      voix de maquette hors ligne (espeak-ng), non utilisée dans le rendu
  voiceover.json         texte et durée de chaque prise de voix
  word_timings.json      repères mot à mot mesurés sur les prises
```

## Choix et limites

- **Logo** : détouré sans redessin, couleurs et proportions conservées. Le S bleu nuit du logo
  se confond avec les fonds bleu nuit ; sur les scènes sombres le watermark reçoit un halo
  lumineux très léger (sans modifier le logo). Le logo complet est présenté sur fond clair (scène 15c).
- **Polices** : Montserrat et Inter (SIL Open Font License), embarquées en base64 dans le projet.
- **Sound design** : synthétisé par `scripts/make_sfx.py`, libre de droits.
- **Exemples** (produit « NOVA PRO », offre -20 %, « Votre Entreprise ») : fictifs, sans
  statistique ni témoignage.
- **Durée** : 168 s, dictée par la voix réelle (au-delà de la cible indicative 110–150 s ;
  l'audio n'a pas été accéléré, conformément au brief).
