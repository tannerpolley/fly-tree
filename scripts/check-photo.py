#!/usr/bin/env python3
"""Read-only check of generated fly cut-outs (needs Pillow). Usage: scripts/check-photo.py <slug> [...]
Fails a photo when the background is not transparent, the fly touches or nearly touches an image edge,
or part of the fly is cut off at an image edge. Orientation (eye left) still needs a visual check."""
import pathlib, sys
from PIL import Image

RAW = pathlib.Path(__file__).resolve().parent.parent / 'assets/fly-photos/raw'

def check(slug):
    im = Image.open(RAW / f'{slug}.png')
    if im.mode != 'RGBA':
        return ['no alpha channel']
    a = im.getchannel('A')
    w, h = im.size
    problems = []
    clear = a.histogram()[0] / (w * h)
    if clear < .40:
        problems.append(f'only {clear:.0%} of the background is transparent (need a real transparent background)')
    box = a.point(lambda v: 255 if v > 40 else 0).getbbox()
    if not box:
        return ['image is empty']
    edge = 4  # anything opaque this close to the border has almost certainly been cut off
    if box[0] < edge or box[1] < edge or w - box[2] < edge or h - box[3] < edge:
        problems.append(f'part of the fly is cut off at the image edge (bounding box {box}); regenerate with a margin on every side')
    return problems

bad = 0
for slug in sys.argv[1:]:
    p = check(slug)
    bad += bool(p)
    print(f'{slug}: ' + ('OK' if not p else 'FAIL - ' + '; '.join(p)))
sys.exit(1 if bad else 0)
