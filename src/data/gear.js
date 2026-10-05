/* Real-world sizes of trout tackle, used by the to-scale rig diagram.
   All lengths in inches. Typical values for trout fishing; individual brands vary a little. */

/* Rods. Grip and reel seat sit at the butt; the reel hangs under the seat. */
export const RODS={
  std:  {len:108,wt:'5',  butt:.42,tip:.07,grip:6.5,seat:3.5,pieces:4},   // 9′ 5wt
  euro: {len:126,wt:'3',  butt:.36,tip:.05,grip:7.5,seat:3.5,pieces:4},   // 10′6″ 3wt tight-line nymphing rod
  heavy:{len:108,wt:'6',  butt:.46,tip:.08,grip:7,  seat:3.5,pieces:4},   // 9′ 6wt for big streamers
};
export const REEL={dia:3.4,width:1.1,handle:.9};
/* Guide positions as a share of rod length from the butt: two stripping guides, snake guides, tip-top. */
export const GUIDES=[.236,.292,.361,.435,.505,.574,.639,.699,.759,.815,.866,.912,.954,1];
export const GUIDE_RING=(i,n)=>i<2?(i===0?.42:.3):i===n-1?.09:.16-(i/n)*.07;   // ring diameters (in)

/* Line and leader diameters (in). Leaders taper from a thick butt to the tippet size at the tip. */
export const FLY_LINE_DIA=.04, RUNNING_LINE_DIA=.03, SINK_TIP_DIA=.034, SIGHTER_DIA=.012, LEADER_BUTT_DIA=.021;
export const X_DIA={'0X':.011,'1X':.010,'2X':.009,'3X':.008,'4X':.007,'5X':.006,'6X':.005,'7X':.004};
export const X_LB={'0X':15,'1X':13,'2X':11,'3X':8.5,'4X':6,'5X':4.75,'6X':3.5,'7X':2.5};

/* Small parts. */
export const INDICATOR_DIA=.75;          // 3/4″ foam or air indicator
export const SHOT_DIA={BB:.18,'#4':.13,'#6':.1};
export const TIPPET_RING_DIA=.11;        // 2.5–3 mm
export const ANGLER_HEIGHT=70;           // 5′10″

/* Hook length (eye to back of bend, mm) by hook size for a standard-length hook. */
const HOOK_MM={2:33,4:28,6:24,8:20.5,10:17.5,12:15,14:13,16:11,18:9.5,20:8,22:7,24:6,26:5};
const HOOK_SHAPE={std:1,long:1.35,xlong:1.55,grub:.85};
export function hookLengthIn(size,shape='std'){
  const ks=Object.keys(HOOK_MM).map(Number),s=Math.max(2,Math.min(26,size));
  let lo=ks.filter(k=>k<=s).pop(),hi=ks.find(k=>k>=s);
  const mm=lo===hi?HOOK_MM[lo]:HOOK_MM[lo]+(HOOK_MM[hi]-HOOK_MM[lo])*(s-lo)/(hi-lo);
  return mm*(HOOK_SHAPE[shape]||1)/25.4;
}
/* "#12–16" → 14 (middle of the range); missing → 12. */
export const sizeNum=z=>{const m=(z||'').match(/\d+/g);return m?m.map(Number).reduce((x,y)=>x+y,0)/m.length:12};

/* Feet/inches text: 32 → 2′8″ */
export function ftIn(inches){
  const t=Math.round(inches);if(t<12)return `${t}″`;
  const f=Math.floor(t/12),i=t%12;return i?`${f}′${i}″`:`${f}′`;
}
export const mm=inches=>`${Math.round(inches*25.4)} mm`;

/* Whole fly length (eye to the tip of the tail or wing) as a multiple of hook length, by tree group,
   with overrides for patterns that are much longer or shorter than their group. */
const FLY_LEN_BY_GROUP={
  'Mayfly adults':1.45,'Caddis adults':1.3,'Stonefly adults':1.3,'Midge adults':1.15,'Terrestrials':1.25,'Attractor dries':1.4,
  'Emergers':1.4,'Cripples':1.4,'Soft hackles & wets':1.35,
  'Mayfly nymphs':1.3,'Caddis larvae & pupae':1.15,'Stonefly nymphs':1.45,'Midge larvae & pupae':1.05,'Crustaceans':1.15,'Worms & eggs':1.0,'Attractor nymphs':1.3,
  'Generalists':1.8,'Baitfish':2.1,'Sculpin':2.6,'Leeches':2.0,'Articulated & big':2.8,'Classic streamers':1.45,'Crayfish':2.0,
};
const FLY_LEN_BY_NAME={'San Juan Worm':3,'Squirmy Worm':3.6,'Egg / Mop / pellet':1,'Clouser Minnow':2.4,'Paradrake':1.7,'Mother Shucker':1.9,'Palomino Midge':1.6};
export const flyLengthFactor=(name,group)=>FLY_LEN_BY_NAME[name]||FLY_LEN_BY_GROUP[group]||1.35;
