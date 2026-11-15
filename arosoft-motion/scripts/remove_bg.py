"""Détourage du logo AroSoft : fond blanc -> alpha réel (dé-mélange du blanc).

Le logo ne contient aucun élément blanc volontaire : les contre-formes
(intérieur du A, du R, du O) sont du fond. On calcule donc l'alpha à partir
de la « distance au blanc » (canal minimum), puis on dé-mélange la couleur
pour supprimer le halo blanc des bords anti-aliasés.
"""
import sys
import numpy as np
from PIL import Image
from scipy import ndimage

src, out_full, out_symbol, out_preview = sys.argv[1:5]
im = np.asarray(Image.open(src).convert("RGB")).astype(np.float32)
H, W, _ = im.shape
minc = im.min(axis=2)

# 1) alpha brut : blanc (min>=247) -> 0 ; couleur franche (min<=40) -> 1
WHITE, SOLID = 247.0, 40.0
a = np.clip((WHITE - minc) / (WHITE - SOLID), 0, 1)

# 2) supprime le bruit JPEG isolé (petites îles quasi transparentes)
mask = a > 0.08
lab, n = ndimage.label(mask)
sizes = ndimage.sum(mask, lab, range(1, n + 1))
keep = np.zeros(n + 1, bool)
keep[1:] = sizes >= 12
a = np.where(keep[lab], a, 0)

# 3) cœur opaque : pixels entourés de logo -> alpha 1 (évite le moucheté)
a = np.where(a > 0.96, 1.0, a)

# 4) dé-mélange du blanc : c = a*f + (1-a)*255  =>  f = (c - (1-a)*255)/a
safe = np.maximum(a, 1e-3)[..., None]
fg = (im - (1 - a[..., None]) * 255.0) / safe
fg = np.clip(fg, 0, 255)
# sur les bords très transparents, recolore avec la couleur opaque voisine
# la plus proche pour éviter toute frange grise/blanche
solid = a >= 0.9
idx = ndimage.distance_transform_edt(~solid, return_distances=False, return_indices=True)
near = im[idx[0], idx[1]]
w = np.clip((0.9 - a) / 0.9, 0, 1)[..., None]
fg = fg * (1 - w) + near * w

rgba = np.dstack([fg, a * 255]).round().astype(np.uint8)
img = Image.fromarray(rgba, "RGBA")

def crop(img, box=None, pad=8):
    if box is not None:
        img = img.crop(box)
    bb = img.getchannel("A").point(lambda v: 255 if v > 10 else 0).getbbox()
    l, t, r, b = bb
    return img.crop((max(l - pad, 0), max(t - pad, 0), min(r + pad, img.width), min(b + pad, img.height)))

full = crop(img)
full.save(out_full, optimize=True)

# Monogramme seul : zone au-dessus du mot AROSOFT
rows = (a > 0.5).sum(axis=1)
# cherche la bande vide entre le monogramme et le texte (vers y~640)
gap = [y for y in range(560, 700) if rows[y] == 0]
cut = gap[len(gap) // 2] if gap else 650
symbol = crop(img, (0, 0, W, cut))
symbol.save(out_symbol, optimize=True)
print("full", full.size, "symbol", symbol.size, "cut", cut)

# Planche de vérification sur 4 fonds
bgs = [(16, 29, 60), (0, 0, 0), (255, 255, 255), (8, 108, 240)]
tw = 540
th = int(full.height * tw / full.width)
sheet = Image.new("RGB", (tw * 2 + 30, (th + 20) * 2 + 10), (128, 128, 128))
thumb = full.resize((tw, th), Image.LANCZOS)
for i, c in enumerate(bgs):
    tile = Image.new("RGBA", (tw, th + 10), c + (255,))
    tile.alpha_composite(thumb, (0, 5))
    sheet.paste(tile.convert("RGB"), (10 + (i % 2) * (tw + 10), 10 + (i // 2) * (th + 20)))
sheet.save(out_preview)
