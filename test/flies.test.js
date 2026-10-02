import test from 'node:test';
import assert from 'node:assert/strict';
import { ALLN } from '../src/data/tree.js';
import { ART } from '../src/data/art.js';
import { META } from '../src/data/meta.js';
import { rigFor } from '../src/data/rigs.js';
import { flySVGDocument } from '../src/engine/document.js';
import { fly } from '../src/engine/fly.js';
import { VARIANTS, recolor } from '../src/data/variants.js';

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
    for (const q of [0, 1, 2])
    for (const o of [{ studio: true }, { bare: true }, { noctx: true }, {}]) {
      const { svg, vb } = flySVGDocument(n.n, { ...o, q });
      assert.ok(svg.startsWith('<svg xmlns="http://www.w3.org/2000/svg"'), `${n.n}: not a standalone SVG`);
      assert.ok(!/NaN|undefined/.test(svg), `${n.n}: broken coordinates or colours`);
      assert.ok(!/&(?!amp;|lt;|gt;|quot;|#\d+;)/.test(svg), `${n.n}: unescaped & (image would not load)`);
      assert.ok(Buffer.byteLength(svg) < 400_000, `${n.n}: too large for a phone close-up`);
      if (o.bare) assert.deepEqual(vb, [40, -20, 360, 220], `${n.n}: rig frame changed`);
      if (o.studio) assert.ok(Math.abs(vb[2] / vb[3] - 332 / 186) < .002, `${n.n}: studio aspect changed`);
      const ids = new Set([...svg.matchAll(/\bid="([^"]+)"/g)].map(m => m[1]));
      for (const m of svg.matchAll(/url\(#([^)]+)\)/g))
        assert.ok(ids.has(m[1]), `${n.n}: missing filter, gradient or clip ${m[1]}`);
    }
});

test('colour swatches render and direct fly labels stay valid XML', () => {
  for (const [name, variants] of Object.entries(VARIANTS))
    for (const [, , colours] of variants) {
      const svg = fly(recolor(ART[name], colours), { q: 2, studio: true, label: name });
      assert.ok(!/NaN|undefined|&(?!amp;|lt;|gt;|quot;|#\d+;)/.test(svg), `${name}: invalid swatch image`);
      assert.ok(Buffer.byteLength(svg) < 400_000, `${name}: swatch image too large`);
    }
  const svg = fly(ART['Parachute Adams'], { label: 'A & B "C" <D>', hint: 'A & B' });
  assert.ok(svg.includes('aria-label="A &amp; B &quot;C&quot; &lt;D>"'));
  assert.ok(svg.includes('>A &amp; B</text>'));
});
