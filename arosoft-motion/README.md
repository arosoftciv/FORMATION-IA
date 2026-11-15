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

## Voix-off — IMPORTANT

La voix-off officielle a été générée sur **ElevenLabs** (voix « Isac », accent ivoirien,
modèle `eleven_v4`), un fichier par phrase, dans le flow
« AroSoft — Voix-off motion design » du compte ElevenLabs.

L'environnement de production n'avait pas le droit de télécharger les fichiers
(domaine `elevenlabsusercontent.com` bloqué). Le rendu actuel utilise donc une
**voix provisoire de synthèse locale** (espeak-ng / mbrola), calée exactement sur les
durées des prises ElevenLabs.

Pour passer à la vraie voix :
1. Télécharger chaque prise depuis le flow ElevenLabs.
2. Les enregistrer dans `public/audio/vo/` avec les mêmes noms
   (`01.mp3`, `02.mp3`, `03.mp3`, `04a.mp3`, … `16.mp3` — voir `scripts/voiceover.json`).
3. `npm run render`.

Le montage dépend des durées listées dans `scripts/voiceover.json` : si vous changez de
prise, mettez à jour `dur` et toutes les scènes se recalent automatiquement
(`src/timeline.ts`). Les repères mot à mot sont estimés à partir de la position du mot dans
la phrase et peuvent être affinés via le 3e argument de `cue()`.

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
  placeholder_vo.py      voix provisoire calée sur les durées ElevenLabs
  voiceover.json         texte et durée de chaque segment de voix
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
