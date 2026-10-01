/* Season, water and depth for each pattern. */

export const MONTHS='JFMAMJJASOND';
export const parseM=s=>{const r=new Set();s.split(',').forEach(p=>{const[a,b]=p.split('-').map(Number);if(isNaN(b))r.add(a);else for(let m=a;m<=b;m++)r.add(m)});return r};
export const ALLY='1-12';
// [months, water (r=river s=still), depth: surf|film|mid|bot|any]
export const META={
 'Parachute Adams':['4-10','rs','surf'],'Comparadun':['3-11','r','surf'],'Catskill dry (Light Cahill)':['5-9','r','surf'],'Rusty Spinner':['6-10','r','surf'],'Trico Spinner':['7-10','r','surf'],'Paradrake':['6-7','r','surf'],
 'Elk Hair Caddis':['5-10','r','surf'],'X-Caddis':['5-9','r','surf'],'Stimulator':['5-8','r','surf'],'Yellow Sally':['5-6','r','surf'],'Griffith’s Gnat':[ALLY,'rs','surf'],
 'Hopper':['7-10','r','surf'],'Ant':['6-10','rs','surf'],'Beetle':['6-10','rs','surf'],'Cricket':['8-10','r','surf'],'Royal Wulff':['6-9','r','surf'],'Chubby Chernobyl':['6-9','r','surf'],'Humpy':['6-9','r','surf'],
 'RS2':['9-12,1-5','r','film'],'CDC Emerger':['3-11','r','film'],'Sparkle Dun':['6-9','r','film'],'Cripple':['6-9','r','film'],
 'Partridge & Orange':['4-10','r','mid'],'Hare’s Ear Soft Hackle':['4-10','rs','mid'],
 'Pheasant Tail':['3-11','rs','mid'],'Hare’s Ear':['4-10','r','mid'],'Perdigon':[ALLY,'r','bot'],'Green Rock Worm':['4-10','r','bot'],'Caddis pupa (Sparkle Pupa)':['4-9','r','mid'],'Cased caddis':[ALLY,'r','bot'],
 'Pat’s Rubber Legs':['4-7','r','bot'],'Kaufmann’s Stone':['4-7','r','bot'],'Zebra Midge':[ALLY,'rs','bot'],'Bloodworm':[ALLY,'s','bot'],'Disco Midge':['11-12,1-3','r','bot'],
 'Sow bug':[ALLY,'r','bot'],'Scud':[ALLY,'rs','bot'],'Czech Nymph':[ALLY,'r','bot'],'San Juan Worm':['3-7','r','bot'],'Egg / Mop / pellet':['3-10','rs','mid'],
 'Copper John':['4-10','r','bot'],'Prince Nymph':['4-10','r','mid'],'Flashback Pheasant Tail':['3-11','r','mid'],
 'Woolly Bugger':[ALLY,'rs','any'],'Zonker':['9-11,3-4','r','any'],'Clouser Minnow':['5-10','rs','any'],'Slumpbuster':['3-11','r','any'],'Muddler Minnow':['5-10','r','any'],'Mohair Leech':[ALLY,'s','any'],'Balanced Leech':[ALLY,'s','any'],'Sex Dungeon / Dungeon':['9-11,3-4','r','any']
};
Object.assign(META,{
 'BWO Thorax Dun':['3-5,9-11','r','surf'],'PMD Dun':['6-9','r','surf'],'Western March Brown':['3-4','r','surf'],'Callibaetis (pond mayfly)':['5-9','s','surf'],
 'Goddard Caddis':['6-9','r','surf'],'Sofa Pillow':['5-7','r','surf'],'Palomino Midge':[ALLY,'rs','film'],'Madam X':['7-10','r','surf'],'Foam Inchworm':['7-9','r','surf'],
 'Renegade':['6-9','r','surf'],'Coachman Trude':['6-9','r','surf'],'Barr Emerger':['3-5,9-11','r','film'],'Mother Shucker':[ALLY,'r','film'],
 'Pheasant Tail Soft Hackle':['3-11','r','mid'],'Royal Coachman Wet':['5-9','r','mid'],'Frenchie':[ALLY,'r','bot'],'Rainbow Warrior':[ALLY,'r','bot'],
 'Peeking Caddis':[ALLY,'r','bot'],'Brassie':[ALLY,'rs','bot'],'Black Beauty':[ALLY,'r','bot'],'Squirmy Worm':['3-7','r','bot'],'Zug Bug':['4-10','r','mid'],
 'Matuka':['3-11','r','any'],'Mickey Finn':['5-10','r','any'],'Grey Ghost':['4-6,9-10','rs','any'],'Sculpzilla':['3-11','r','any'],'Rabbit Strip Leech':[ALLY,'rs','any'],'Circus Peanut':['9-11,3-4','r','any'],'Crayfish pattern':['5-10','r','bot']
});
export const DEPTHN={surf:'Surface',film:'Film',mid:'Mid-water',bot:'Bottom',any:'Any depth'};
export function metaOf(n){
  if(!n.k.length){const m=META[n.n];return m?{m:parseM(m[0]),w:new Set(m[1]),d:new Set([m[2]])}:{m:new Set(),w:new Set(),d:new Set()}}
  const r={m:new Set(),w:new Set(),d:new Set()};
  n.k.forEach(c=>{const x=metaOf(c);x.m.forEach(v=>r.m.add(v));x.w.forEach(v=>r.w.add(v));x.d.forEach(v=>r.d.add(v))});return r;
}
