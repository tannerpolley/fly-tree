#!/usr/bin/env python3
"""Turn raw generated fly photos into the app's images (needs Pillow: pip install pillow).

Input  assets/fly-photos/raw/<slug>.png          studio photo (light grey background)
       assets/fly-photos/raw/<slug>-cutout.png   same fly, transparent background (optional)
Output src/assets/flies/<slug>.webp, <slug>-cutout.webp and geometry.json
       geometry: studio size (w,h), cut-out size (cw,ch), fly bounding box, hook eye and lowest point of the bend,
       measured from the cut-out's transparency so the rig diagram can tie the tippet to the eye.
"""
import json, pathlib, sys
from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW, OUT = ROOT / 'assets/fly-photos/raw', ROOT / 'src/assets/flies'
WIDTH = 1200  # stored width; plenty for the close-up view

def shrink(im):
    return im.resize((WIDTH, round(im.height * WIDTH / im.width)), Image.LANCZOS) if im.width > WIDTH else im

def measure(cut):
    a = cut.getchannel('A').point(lambda v: 255 if v > 128 else 0)
    box = a.getbbox()
    if not box: raise ValueError('cut-out is fully transparent')
    x0, y0, x1, y1 = box
    px = a.load()
    band = max(2, (x1 - x0) // 50)  # the leftmost 2% of the fly is the hook eye
    eye = [(x, y) for x in range(x0, x0 + band) for y in range(y0, y1) if px[x, y]]
    rows = max(2, (y1 - y0) // 50)  # the lowest 2% is the bottom of the hook bend
    low = [(x, y) for y in range(y1 - rows, y1) for x in range(x0, x1) if px[x, y]]
    mid = lambda pts, i: round(sum(p[i] for p in pts) / len(pts))
    return {'box': [x0, y0, x1, y1], 'eye': [mid(eye, 0), mid(eye, 1)], 'bend': [mid(low, 0), mid(low, 1)]}

geo_path = OUT / 'geometry.json'
geo = json.loads(geo_path.read_text()) if geo_path.exists() else {}
only = set(sys.argv[1:])
for raw in sorted(RAW.glob('*.png')):
    slug = raw.stem
    if slug.endswith('-cutout') or (only and slug not in only): continue
    studio = shrink(Image.open(raw).convert('RGB'))
    studio.save(OUT / f'{slug}.webp', quality=82, method=6)
    entry = {'w': studio.width, 'h': studio.height}
    cut_raw = RAW / f'{slug}-cutout.png'
    if cut_raw.exists():
        cut = shrink(Image.open(cut_raw).convert('RGBA'))
        cut.save(OUT / f'{slug}-cutout.webp', quality=86, method=6)
        entry.update(cw=cut.width, ch=cut.height, **measure(cut))
    geo[slug] = entry
    print(slug, entry)
geo_path.write_text(json.dumps(dict(sorted(geo.items())), indent=1) + '\n')
