import test from 'node:test';
import assert from 'node:assert/strict';
import { ALLN, slugOf } from '../src/data/tree.js';
import { rigFlies, rigFor, rigKFor } from '../src/data/rigs.js';
import { buildScene, plen } from '../src/ui/rigscene.js';
import { overlaySVG, sceneSVG } from '../src/ui/rigdraw.js';
import { closeup } from '../src/ui/rigcloseups.js';
import geometry from '../src/assets/flies/geometry.json' with { type: 'json' };

test('every rig scene is to scale, draws cleanly, and every hoverable part has a close-up', () => {
  for (const n of ALLN.filter(n => rigFor(n) && rigKFor(n))) {
    const sc = buildScene(rigKFor(n), rigFor(n), rigFlies(n), name => geometry[slugOf(name)] || null), id = n.n;
    assert.ok(Math.abs(plen(sc.rod.pts) - sc.rodSpec.len) < sc.rodSpec.len * .02, `${id}: rod is not its real length`);
    if (sc.kind !== 'tight') {
      const leader = sc.strands.filter(s => s.part === 'leader').reduce((t, s) => t + plen(s.pts), 0);
      assert.ok(Math.abs(leader - sc.facts.leaderLen) < 1, `${id}: leader drawn ${leader.toFixed(1)}″, should be ${sc.facts.leaderLen}″`);
    }
    for (const f of sc.flies) {
      const mm = f.flyLen * 25.4;
      assert.ok(mm > 4 && mm < 150, `${id}: ${f.name} drawn ${mm.toFixed(0)} mm long`);
      assert.ok(f.eye[1] < sc.depth, `${id}: ${f.name} is under the river bed`);
    }
    if (sc.kind === 'indicator') assert.ok(sc.indDist >= 1.4 * sc.flies[0].eye[1], `${id}: indicator closer than 1½× the fly depth`);
    const [x0, y0, x1, y1] = sc.views.all;
    const svg = sceneSVG(sc, () => ({ url: 'x.webp', photo: true })) + overlaySVG(sc, [x0, y0, x1 - x0, y1 - y0], 1200, 510, sc.knots);
    assert.ok(!/NaN|undefined/.test(svg), `${id}: broken numbers in the drawing`);
    for (const part of new Set([...svg.matchAll(/data-part="([^"]+)"/g)].map(m => m[1]))) {
      const card = closeup(part, sc, () => '<img>');
      assert.match(card, /<div class="rcr">[^<]+</, `${id}: ${part} has no close-up text`);
      assert.ok(!/NaN|undefined/.test(card), `${id}: ${part} close-up has broken numbers`);
    }
  }
});
