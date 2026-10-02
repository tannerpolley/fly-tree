# Fly photo brief (shared by every generation batch)

Generate one image per pattern with your image generation tool. Every image must match this exact style so all 80 look like one set.

## Image
- Photorealistic macro studio photograph of ONE real, well-tied fly of the named pattern, in its standard colour (the `colour` field).
- TRANSPARENT background (real alpha). No backdrop, no shadow, no vise, hands, tools, text, labels, props, water or reflections.
- Landscape 1536x1024 PNG. Strict side view. Hook EYE on the LEFT, tail/bend on the RIGHT, shank level, hook point hanging DOWN.
  Exceptions: Clouser Minnow is shown hook point UP (that is how it is tied and swims); articulated flies (Sex Dungeon, Circus Peanut) show both hooks joined.
- The whole fly in frame with a small margin, centred, filling about 85% of the width (less if a tall wing/post needs the height).
- Soft diffused light from the upper left, the same lighting as the reference images, natural colours, sharp focus across the fly.
- Materials must look real: individual hackle and hair fibres with tapered tips, fuzzy dubbing, soft pulsing marabou, glossy beads, wire ribs, thread wraps at the head.

## Accuracy
- Tie it to the standard, widely published recipe of the named pattern (look it up if unsure). The `recipe`, `looks` and `hook` fields are hints written by a non-expert; when they disagree with the published recipe, follow the published recipe and say so in your report.
- Correct proportions for the pattern: tail, wing, hackle and body length relative to the hook.
- Hooks: dry-fly hooks for dry flies; curved scud/grub hooks for Scud, Czech Nymph, Green Rock Worm; long-shank hooks for streamers and stonefly nymphs; jig hooks only where the pattern is normally tied on one (e.g. Perdigon, Frenchie).

## Style references (same set, already approved)
assets/fly-photos/raw/parachute-adams.png, pheasant-tail.png, woolly-bugger.png (transparent cut-outs)
assets/fly-photos/raw/pilot-studio/*.png (the same flies on the studio backdrop; for look only, do not add a backdrop)

## Output
- Save to `assets/fly-photos/raw/<slug>.png` (slug from the batch file). Do not edit, move or delete any other file.
- Check each image yourself against the published recipe before moving on: right pattern, materials, colours, proportions, eye left / tail right, real transparency (open it and confirm the alpha channel has fully transparent background pixels). Regenerate at most twice when it is clearly wrong.
- Do NOT run scripts/prepare-photos.py (other batches run in parallel and it rewrites a shared file); the coordinator runs it once at the end. To judge an image, view the PNG (e.g. composite it onto a light grey background with Pillow in /tmp).
- Final message: per pattern, one line: slug, OK or the remaining problem, and any place you followed the published recipe over the hint.
