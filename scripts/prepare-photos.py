#!/usr/bin/env python3
"""Turn generated fly cut-outs into the app's images (needs Pillow: pip install pillow).

Input  assets/fly-photos/raw/<slug>.png   one fly on a TRANSPARENT background, eye left, tail right.
Output src/assets/flies/<slug>-cutout.webp  the fly trimmed to its own outline (rig diagram)
       src/assets/flies/<slug>.webp         the same fly on a soft studio backdrop with a shadow
                                            (cards, close-up, gallery, quiz)
       src/assets/flies/geometry.json       per fly: studio size (w,h), cut-out size (cw,ch), fly box,
                                            hook eye and lowest point of the bend inside the cut-out.
Because both images come from one cut-out, every view shows the identical fly.
Usage: scripts/prepare-photos.py [slug ...]   (no slugs = all)
"""
import json, pathlib, sys
from PIL import Image, ImageChops, ImageDraw, ImageFilter

ROOT = pathlib.Path(__file__).resolve().parent.parent
RAW, OUT = ROOT / 'assets/fly-photos/raw', ROOT / 'src/assets/flies'
CUT_W = 1000                 # cut-out width after trimming
STUDIO = (1200, 672)         # studio frame, same 332:186 shape as the drawn studio frame
FLY_W, FLY_H = .80, .66      # largest share of the studio frame the fly may fill

def opaque(im):
    return im.getchannel('A').point(lambda v: 255 if v > 128 else 0)

def measure(cut):
    a = opaque(cut)
    x0, y0, x1, y1 = a.getbbox()
    px = a.load()
    band = max(2, (x1 - x0) // 50)   # leftmost 2% of the fly: the hook eye
    eye = [(x, y) for x in range(x0, x0 + band) for y in range(y0, y1) if px[x, y]]
    rows = max(2, (y1 - y0) // 50)   # lowest 2%: the bottom of the hook bend
    low = [(x, y) for y in range(y1 - rows, y1) for x in range(x0, x1) if px[x, y]]
    mid = lambda pts, i: round(sum(p[i] for p in pts) / len(pts))
    return {'box': [x0, y0, x1, y1], 'eye': [mid(eye, 0), mid(eye, 1)], 'bend': [mid(low, 0), mid(low, 1)]}

def trim(raw):
    box = opaque(raw).getbbox()
    if not box:
        raise ValueError('image is fully transparent')
    pad = round((box[2] - box[0]) * .03)
    box = (max(0, box[0] - pad), max(0, box[1] - pad), min(raw.width, box[2] + pad), min(raw.height, box[3] + pad))
    cut = raw.crop(box)
    return cut.resize((CUT_W, round(cut.height * CUT_W / cut.width)), Image.LANCZOS)

def studio(cut):
    W, H = STUDIO
    s = min(W * FLY_W / cut.width, H * FLY_H / cut.height)
    fly = cut.resize((round(cut.width * s), round(cut.height * s)), Image.LANCZOS)
    x, y = (W - fly.width) // 2, round((H - fly.height) * .42)
    # backdrop: warm light grey, brighter in the middle (soft box from the upper left)
    bg = Image.new('RGB', (W, H), (220, 216, 208))
    glow = Image.new('L', (W, H), 0)
    ImageDraw.Draw(glow).ellipse((-W * .1, -H * .35, W * .95, H * 1.05), fill=255)
    bg.paste(Image.new('RGB', (W, H), (243, 241, 237)), mask=glow.filter(ImageFilter.GaussianBlur(W * .14)))
    # shadow: a soft ellipse under the fly plus a faint blurred copy of its outline
    sh = Image.new('L', (W, H), 0)
    d = ImageDraw.Draw(sh)
    sy = min(H - 18, y + fly.height + round(H * .045))
    d.ellipse((x + fly.width * .08, sy - 9, x + fly.width * .92, sy + 9), fill=120)
    outline = Image.new('L', (W, H), 0)
    outline.paste(fly.getchannel('A'), (x, y + round(H * .05)))
    sh = ImageChops.lighter(sh.filter(ImageFilter.GaussianBlur(16)), outline.filter(ImageFilter.GaussianBlur(22)).point(lambda v: v * .25))
    bg.paste((60, 52, 40), mask=sh)
    bg.paste(fly, (x, y), fly)
    return bg

def main():
    OUT.mkdir(parents=True, exist_ok=True)
    geo_path = OUT / 'geometry.json'
    geo = json.loads(geo_path.read_text()) if geo_path.exists() else {}
    only = set(sys.argv[1:])
    for raw_path in sorted(RAW.glob('*.png')):
        slug = raw_path.stem
        if only and slug not in only:
            continue
        raw = Image.open(raw_path).convert('RGBA')
        cut = trim(raw)
        cut.save(OUT / f'{slug}-cutout.webp', quality=86, method=6)
        st = studio(cut)
        st.save(OUT / f'{slug}.webp', quality=84, method=6)
        geo[slug] = {'w': st.width, 'h': st.height, 'cw': cut.width, 'ch': cut.height, **measure(cut)}
        print(slug, geo[slug])
    geo_path.write_text(json.dumps(dict(sorted(geo.items())), indent=1) + '\n')

if __name__ == '__main__':
    main()
