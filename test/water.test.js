import test from 'node:test';
import assert from 'node:assert/strict';
import { META } from '../src/data/meta.js';
import { WATER, recommend, watersFor } from '../src/data/water.js';
import { ALLN } from '../src/data/tree.js';

test('suggestions suit the water and month, and conditions reorder the ways to fish', () => {
  for (const W of WATER) {
    for (const month of [1, 7]) for (const a of recommend(W.id, { month })) for (const n of a.flies)
      assert.ok(META[n.n][1].includes(W.w), `${n.n} suggested for ${W.n}`);
    assert.ok(recommend(W.id, { month: 7 }).some(a => a.flies.length), `${W.n} has nothing in July`);
    for (const a of W.ap) for (const nm of a.f || []) assert.ok(META[nm], `unknown fly ${nm}`);
  }
  assert.equal(recommend('run', { month: 7 })[0].t, 'Two nymphs under an indicator');
  assert.ok(recommend('run', { month: 7, rising: 'yes' })[0].k.includes('dry'));
  assert.ok(recommend('run', { month: 7, clarity: 'muddy', fish: 'brown' })[0].k.includes('streamer'));
  const big = recommend('run', { month: 7, clarity: 'muddy' }).find(a => a.k.includes('nymph')).flies[0];
  assert.equal(big.n, 'Pat’s Rubber Legs');
  assert.ok(watersFor(ALLN.find(n => n.n === 'Hopper')).some(W => W.id === 'bank'));
});
