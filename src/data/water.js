/* Pick by water: a kind of water (plus month and whether fish are rising) in, ranked ways to fish it out. */
import { META, parseM } from './meta.js';
import { ALLN } from './tree.js';

/* w: r river / s still water. Each approach: t title, why, top (fished on the surface),
   f flies to try first, g tree groups to fill from. */
export const WATER=[
 {id:'tail',n:'Below a dam (tailwater)',w:'r',d:'Cold, clear, steady water released from a dam.',hold:'Fish sit in the soft seams and feed on tiny food all year.',ap:[
  {t:'Tiny nymphs under an indicator',why:'Midges, sow bugs and scuds are most of what tailwater trout eat.',f:['Zebra Midge','Sow bug','Scud','RS2','Pheasant Tail'],g:['Midge larvae & pupae','Crustaceans']},
  {t:'Midge dry on fine tippet',top:1,why:'On calm afternoons fish sip midges in the slow edges.',f:['Griffith’s Gnat','Palomino Midge','Parachute Adams'],g:['Midge adults']},
  {t:'Egg or worm after a flow change',why:'A rise in flow knocks worms and eggs loose.',g:['Worms & eggs']}]},
 {id:'riffle',n:'Riffle',w:'r',d:'Shallow, fast, choppy water over gravel.',hold:'Insects live here; fish feed in the slightly deeper slots.',ap:[
  {t:'Dry-dropper',top:1,why:'A buoyant dry floats the chop and hangs a nymph down where fish feed.',f:['Chubby Chernobyl','Stimulator','Elk Hair Caddis'],g:['Attractor dries','Caddis adults','Stonefly adults']},
  {t:'Tight-line (Euro) nymphing',why:'Short casts and direct contact suit quick, shallow water.',f:['Perdigon','Frenchie','Green Rock Worm','Czech Nymph'],g:['Mayfly nymphs','Caddis larvae & pupae']},
  {t:'Swing a soft hackle',why:'Hatching caddis and mayflies swim up through riffles.',g:['Soft hackles & wets']}]},
 {id:'run',n:'Run',w:'r',d:'Waist-deep, steady water with a smooth or slightly rippled top.',hold:'The most reliable water: fish spread out and feed all day.',ap:[
  {t:'Two nymphs under an indicator',why:'Gets two depths and two foods in front of fish on every drift.',f:['Pat’s Rubber Legs','Pheasant Tail','Zebra Midge'],g:['Stonefly nymphs','Mayfly nymphs','Attractor nymphs']},
  {t:'Dry fly to rising fish',top:1,why:'Match the size and color of what is hatching.',g:['Mayfly adults','Caddis adults']},
  {t:'Swing or strip a streamer',why:'Covers a lot of water and finds the bigger fish.',f:['Woolly Bugger'],g:['Sculpin','Baitfish','Generalists']}]},
 {id:'pool',n:'Pool',w:'r',d:'Deep, slow, dark water, often below a riffle.',hold:'Big fish rest on the bottom and move up to the head and tail to feed.',ap:[
  {t:'Deep indicator nymphing',why:'Add split shot and set the indicator 1.5× the depth to reach the bottom.',f:['Pat’s Rubber Legs','Egg / Mop / pellet','Zebra Midge'],g:['Stonefly nymphs','Worms & eggs','Midge larvae & pupae']},
  {t:'Sink-tip streamer',why:'A big fly crawled along the bottom moves the largest trout.',g:['Sculpin','Articulated & big','Crayfish','Generalists']},
  {t:'Evening dry at the tail',top:1,why:'Spinner falls and egg-laying caddis bring fish up at dusk.',f:['Rusty Spinner','Elk Hair Caddis'],g:['Mayfly adults']}]},
 {id:'flat',n:'Tailout / flat',w:'r',d:'Shallow, slow, glassy water where a pool runs out.',hold:'Fish see everything here: long leaders, small flies, careful wading.',ap:[
  {t:'Small dry or emerger on a long, fine leader',top:1,why:'Fish sip quietly in the film; drag-free drifts matter most.',g:['Emergers','Cripples','Mayfly adults','Midge adults']},
  {t:'Sight-fish a small nymph',why:'Watch the fish, not an indicator, and lift when it moves.',f:['Zebra Midge','Pheasant Tail','Sow bug','Scud']}]},
 {id:'pocket',n:'Pocket water',w:'r',d:'Fast water broken by boulders, with soft pockets behind them.',hold:'Fish hide in each calm pocket and grab food fast.',ap:[
  {t:'High-floating dry',top:1,why:'Bushy flies stay up in rough water and are easy to see.',f:['Royal Wulff','Stimulator','Humpy','Chubby Chernobyl'],g:['Attractor dries']},
  {t:'Short-line heavy nymph',why:'A heavy fly drops fast into each pocket before the current grabs it.',f:['Perdigon','Pat’s Rubber Legs','Copper John','Czech Nymph']}]},
 {id:'bank',n:'Undercut bank / grassy edge',w:'r',d:'Deep water tight against a grassy or hollowed-out bank.',hold:'Big fish wait under the edge for food falling in.',ap:[
  {t:'Terrestrial or hopper-dropper',top:1,why:'Hoppers, ants and beetles fall in from the grass all summer.',f:['Hopper','Ant','Beetle'],g:['Terrestrials']},
  {t:'Streamer stripped off the bank',why:'Cast tight to the bank and strip out; fish chase from under the cover.',g:['Sculpin','Generalists','Crayfish']}]},
 {id:'lake',n:'Lake or pond',w:'s',d:'Still water with no current to move the fly.',hold:'Fish cruise drop-offs and weed edges; depth matters more than spot.',ap:[
  {t:'Leech or midge under an indicator',why:'Hang the fly just off the bottom and let the wind rock it.',f:['Balanced Leech','Zebra Midge','Bloodworm'],g:['Midge larvae & pupae','Leeches']},
  {t:'Slow strip',why:'Count it down, then strip slowly along the weed edge.',f:['Woolly Bugger','Mohair Leech','Rabbit Strip Leech'],g:['Leeches','Generalists']},
  {t:'Dry during a hatch',top:1,why:'Callibaetis and midges hatch on calm days; lead the cruising fish.',f:['Callibaetis (pond mayfly)','Griffith’s Gnat','Ant']}]}
];

const leaves=ALLN.filter(n=>!n.k.length),byName=nm=>leaves.find(n=>n.n===nm);
const fits=(n,w,month)=>{const m=META[n.n];return m&&m[1].includes(w)&&(!month||parseM(m[0]).has(month))};

/* rising: 'yes' puts surface approaches first, 'no' puts them last, anything else keeps the listed order. */
export function recommend(id,month,rising){
  const W=WATER.find(x=>x.id===id);if(!W)return [];
  const ap=W.ap.map(a=>{
    const pool=[...(a.f||[]).map(byName),...leaves.filter(n=>(a.g||[]).includes(n.p0.n))].filter(Boolean);
    return {...a,flies:[...new Set(pool)].filter(n=>fits(n,W.w,month)).slice(0,5)};
  });
  const rank=a=>rising==='yes'?(a.top?0:1):rising==='no'?(a.top?1:0):0;
  return ap.sort((a,b)=>rank(a)-rank(b));
}
