import test from 'node:test';
import assert from 'node:assert/strict';
import { META } from '../src/data/meta.js';
import { WATER, recommend } from '../src/data/water.js';

test('every water type gives in-season, right-water flies, and rising fish move surface ways first', () => {
  for (const W of WATER) for (const m of [1, 7]) for (const a of recommend(W.id, m, '')) for (const n of a.flies)
    assert.ok(META[n.n][1].includes(W.w), `${n.n} suggested for ${W.n}`);
  for (const W of WATER) assert.ok(recommend(W.id, 7, '').some(a => a.flies.length), `${W.n} has nothing in July`);
  assert.ok(recommend('run', 7, 'yes')[0].top);
  assert.ok(!recommend('run', 7, 'no')[0].top);
  const named = WATER.flatMap(W => W.ap.flatMap(a => a.f || []));
  for (const nm of named) assert.ok(META[nm], `unknown fly ${nm}`);
});
