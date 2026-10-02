import test from 'node:test';
import assert from 'node:assert/strict';
import { ALLN } from '../src/data/tree.js';
import { ART } from '../src/data/art.js';
import { META } from '../src/data/meta.js';
import { rigFor } from '../src/data/rigs.js';
import { flySVGDocument } from '../src/engine/document.js';

const patterns = ALLN.filter(n => !n.k.length);

test('every pattern has a drawing, season data, a hook size and a rig', () => {
  for (const n of patterns) {
    assert.ok(ART[n.n], `${n.n}: no drawing`);
    assert.ok(META[n.n], `${n.n}: no season/water/depth`);
    assert.ok(n.z, `${n.n}: no hook size`);
    assert.ok(rigFor(n), `${n.n}: no rig`);
  }
});

test('every pattern renders to a standalone SVG image with sane numbers', () => {
  for (const n of patterns)
    for (const o of [{ studio: true }, { bare: true }, {}]) {
      const { svg } = flySVGDocument(n.n, o);
      assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'), `${n.n}: not a standalone SVG`);
      assert.ok(!/NaN|undefined/.test(svg), `${n.n}: broken coordinates or colours`);
      assert.ok(!/&(?!amp;|lt;|gt;|quot;|#\d+;)/.test(svg), `${n.n}: unescaped & (image would not load)`);
    }
});
