#!/usr/bin/env python3
"""Turn the chosen real photographs into the app's images (needs Pillow).

Input  assets/real-photos/choices.json      per slug: {"pick": <index into candidates.json>, "crop": [l,t,r,b] (0-1, optional),
                                             "flip": true to put the hook eye on the left (optional)}
       assets/real-photos/candidates.json   from scripts/find-real-photos.py (url, licence, author, page)
Output src/assets/real-flies/<slug>.webp    the photo, cropped to the fly, fitted into the 332:186 studio frame;
                                            any empty space is filled with a soft blurred copy of the photo
       src/assets/real-flies/credits.json   author, licence, source page, size: shown under the close-up
Downloads are cached in assets/real-photos/raw/ (not committed). Usage: scripts/prepare-real-photos.py [slug ...]
"""
import io, json, pathlib, re, sys, time, urllib.error, urllib.request
from PIL import Image, ImageFilter, ImageOps

ROOT = pathlib.Path(__file__).resolve().parent.parent
SRC, RAW, OUT = ROOT / 'assets/real-photos', ROOT / 'assets/real-photos/raw', ROOT / 'src/assets/real-flies'
FRAME = (1200, 672)
UA = 'fly-tree-photo-finder/1.0 (https://github.com/tannerpolley/fly-tree)'

def source_url(c):
    # a 1280 px Commons thumbnail (a standard size) is plenty and much lighter on Wikimedia than the original
    if c['source'] == 'commons' and c.get('thumb') and (c.get('w') or 0) > 1280:
        return re.sub(r'/\d+px-', '/1280px-', c['thumb'])
    return c['image']

def fetch(c, slug):
    path = RAW / f'{slug}.img'
    if not path.exists():
        req = urllib.request.Request(source_url(c), headers={'User-Agent': UA})
        for attempt in range(5):
            try:
                with urllib.request.urlopen(req, timeout=60) as r:
                    path.write_bytes(r.read())
                break
            except urllib.error.HTTPError as e:
                if e.code != 429 or attempt == 4:
                    raise
                time.sleep(15 * (attempt + 1))  # rate limited: back off
        time.sleep(3)
    return Image.open(io.BytesIO(path.read_bytes()))

def frame(im):
    W, H = FRAME
    s = min(W / im.width, H / im.height)
    fit = im.resize((round(im.width * s), round(im.height * s)), Image.LANCZOS)
    # fill the empty space: with the photo's own backdrop colour when its edges are plain, else a soft blurred copy
    edge = [im.getpixel((x, y)) for x in range(0, im.width, max(1, im.width // 40)) for y in (0, im.height - 1)] + \
           [im.getpixel((x, y)) for y in range(0, im.height, max(1, im.height // 40)) for x in (0, im.width - 1)]
    mean = tuple(round(sum(p[i] for p in edge) / len(edge)) for i in range(3))
    spread = max(max(abs(p[i] - mean[i]) for p in edge) for i in range(3))
    if spread < 40:
        fill = Image.new('RGB', FRAME, mean)
    else:
        fill = ImageOps.fit(im, FRAME).filter(ImageFilter.GaussianBlur(28)).point(lambda v: round(v * .82 + 30))
    fill.paste(fit, ((W - fit.width) // 2, (H - fit.height) // 2))
    return fill

def main():
    RAW.mkdir(parents=True, exist_ok=True); OUT.mkdir(parents=True, exist_ok=True)
    cands = json.loads((SRC / 'candidates.json').read_text())
    choices = json.loads((SRC / 'choices.json').read_text())
    cpath = OUT / 'credits.json'
    credits = json.loads(cpath.read_text()) if cpath.exists() else {}
    only = set(sys.argv[1:])
    for slug, ch in choices.items():
        if only and slug not in only:
            continue
        c = cands[slug][ch['pick']]
        try:
            im = ImageOps.exif_transpose(fetch(c, slug)).convert('RGB')
        except Exception as e:
            print(slug, 'SKIPPED, download failed:', e)
            continue
        if ch.get('crop'):
            l, t, r, b = ch['crop']
            im = im.crop((round(l * im.width), round(t * im.height), round(r * im.width), round(b * im.height)))
        if ch.get('flip'):
            im = ImageOps.mirror(im)
        out = frame(im)
        out.save(OUT / f'{slug}.webp', quality=84, method=6)
        credits[slug] = {'w': out.width, 'h': out.height, 'author': c['author'], 'licence': c['licence'],
                         'page': c['page'], 'title': c['title'], 'modified': True}
        print(slug, c['licence'], c['author'][:40])
        cpath.write_text(json.dumps(dict(sorted(credits.items())), indent=1, ensure_ascii=False) + '\n')
    cpath.write_text(json.dumps(dict(sorted(credits.items())), indent=1, ensure_ascii=False) + '\n')

if __name__ == '__main__':
    main()
