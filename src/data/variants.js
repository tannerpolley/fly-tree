/* Colour variants and the recolouring helper. */
import { ART } from './art.js';

/* ---------- colour variants: [label, swatch, spec]. spec keys: b body, t tail, w wing/shell, w2 wing underlayer, h hackle, th thorax, l legs, hd head, bd bead, cn cone ---------- */
export const VARIANTS={
 'Parachute Adams':[['Gray','#8d8b87',{}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Tan','#c9b37a',{b:'#c9b37a'}],['Black','#2a2a2a',{b:'#2a2a2a'}]],
 'Comparadun':[['Tan','#c9b37a',{}],['Olive','#6b7a3a',{b:'#6b7a3a',w:'#9aa09c'}],['Gray','#9a9a94',{b:'#9a9a94',w:'#a8a8a2'}],['Pale yellow','#e0cc7a',{b:'#e0cc7a',w:'#d8cfa6'}]],
 'Elk Hair Caddis':[['Olive','#7b8f3a',{}],['Tan','#c9b37a',{b:'#c9b37a'}],['Black','#2a2a2a',{b:'#2a2a2a',w:'#6a5a40'}],['Yellow','#e6c84a',{b:'#e6c84a'}]],
 'Stimulator':[['Orange','#e0902f',{}],['Yellow','#e6c84a',{b:'#e6c84a'}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Red','#b83a2a',{b:'#b83a2a'}]],
 'Chubby Chernobyl':[['Orange-red','#d65a3a',{}],['Tan','#d8c090',{w:'#d8c090'}],['Olive','#6b7a3a',{w:'#6b7a3a'}],['Pink','#e79aa8',{w:'#e79aa8'}]],
 'Hopper':[['Yellow','#c5b24a',{}],['Tan','#c9b37a',{b:'#c9b37a'}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Pink','#e79aa8',{b:'#e79aa8'}]],
 'Ant':[['Black','#1a1a1a',{}],['Cinnamon','#8a4a2a',{b:'#8a4a2a'}],['Red','#b03a2a',{b:'#b03a2a'}]],
 'Beetle':[['Black','#2b2b2b',{}],['Brown','#6a4a2e',{b:'#6a4a2e',w:'#5a3a22'}],['Green','#3a6a3a',{b:'#3a6a3a',w:'#2f5a2f'}]],
 'Foam Inchworm':[['Green','#8fc04a',{}],['Chartreuse','#c8e04a',{b:'#c8e04a'}],['Tan','#c9b37a',{b:'#c9b37a'}]],
 'RS2':[['Gray','#8a8f94',{}],['Olive','#6b7a3a',{b:'#6b7a3a',t:'#6b7a3a'}],['Black','#2a2a2a',{b:'#2a2a2a'}],['Tan','#c9b37a',{b:'#c9b37a'}]],
 'Sparkle Dun':[['Tan','#c9b37a',{}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Gray','#9a9a94',{b:'#9a9a94',w:'#a8a8a2'}],['Yellow','#e0cc7a',{b:'#e0cc7a'}]],
 'CDC Emerger':[['Olive','#7a7a40',{}],['Tan','#c9b37a',{b:'#c9b37a'}],['Gray','#9a9a94',{b:'#9a9a94'}]],
 'Barr Emerger':[['Olive','#6b6b3a',{}],['Gray','#8a8f94',{b:'#8a8f94'}],['Brown','#7a4a30',{b:'#7a4a30'}],['Black','#2a2a2a',{b:'#2a2a2a'}]],
 'Mother Shucker':[['Black','#2b2b2b',{}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Tan','#c9b37a',{b:'#c9b37a'}]],
 'Partridge & Orange':[['Orange','#d9742a',{}],['Yellow','#e6c84a',{b:'#e6c84a'}],['Green','#4f8f3a',{b:'#4f8f3a'}]],
 'Pheasant Tail':[['Natural','#7a4a1a',{}],['Olive','#6b6b3a',{b:'#6b6b3a',t:'#6b6b3a',w:'#6b6b3a'}],['Black','#2a2a2a',{b:'#2a2a2a',t:'#2a2a2a',w:'#2a2a2a'}]],
 'Hare’s Ear':[['Natural','#8a7a5a',{}],['Olive','#6b7a3a',{b:'#6b7a3a',th:'#5a6a30'}],['Black','#2a2a2a',{b:'#2a2a2a',th:'#222'}],['Tan','#c9b37a',{b:'#c9b37a',th:'#b8a26a'}]],
 'Perdigon':[['Black','#4a4a4a',{}],['Olive','#6b7a3a',{b:'#6b7a3a',t:'#6b7a3a'}],['Red','#b83a2a',{b:'#b83a2a'}],['Tan','#c9b37a',{b:'#c9b37a'}]],
 'Zebra Midge':[['Black','#1c1c1c',{}],['Red','#b01e1e',{b:'#b01e1e'}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Purple','#6a3a8a',{b:'#6a3a8a'}]],
 'Bloodworm':[['Red','#b01e1e',{}],['Pink','#e79aa8',{b:'#e79aa8'}],['Maroon','#6a1f2a',{b:'#6a1f2a'}]],
 'Brassie':[['Copper','#c4733a',{}],['Red','#b83a2a',{b:'#b83a2a'}],['Black','#2a2a2a',{b:'#2a2a2a'}],['Olive','#6b7a3a',{b:'#6b7a3a'}]],
 'Disco Midge':[['Black','#3a3a3a',{}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Red','#b01e1e',{b:'#b01e1e'}],['Purple','#6a3a8a',{b:'#6a3a8a'}]],
 'Copper John':[['Copper','#c4733a',{}],['Red','#b83a2a',{b:'#b83a2a'}],['Green','#4f8f3a',{b:'#4f8f3a'}],['Black','#2a2a2a',{b:'#2a2a2a'}],['Chartreuse','#c8e04a',{b:'#c8e04a'}]],
 'Green Rock Worm':[['Green','#6aa82a',{}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Tan','#c9b37a',{b:'#c9b37a'}],['Chartreuse','#c8e04a',{b:'#c8e04a'}]],
 'Caddis pupa (Sparkle Pupa)':[['Tan','#c9b37a',{}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Green','#6aa82a',{b:'#6aa82a'}],['Cream','#efe3c4',{b:'#efe3c4'}]],
 'Pat’s Rubber Legs':[['Brown','#4a3a2a',{}],['Black','#1c1c1c',{b:'#1c1c1c'}],['Olive','#6b7a3a',{b:'#6b7a3a',l:'#3a4a22'}],['Golden','#c9a447',{b:'#c9a447',l:'#6a4a2e'}]],
 'Kaufmann’s Stone':[['Brown','#6a4a2a',{}],['Golden','#c9a447',{b:'#c9a447'}],['Black','#2a2a2a',{b:'#2a2a2a'}],['Olive','#6b7a3a',{b:'#6b7a3a'}]],
 'Sow bug':[['Gray','#a9aaa6',{}],['Tan','#c9b37a',{b:'#c9b37a'}],['Pink','#e79aa8',{b:'#e79aa8'}],['Orange','#e08a2a',{b:'#e08a2a'}]],
 'Scud':[['Tan','#c9a47a',{}],['Olive','#6b7a3a',{b:'#6b7a3a'}],['Pink','#e79aa8',{b:'#e79aa8'}],['Orange','#e08a2a',{b:'#e08a2a'}],['Gray','#9a9a94',{b:'#9a9a94'}]],
 'Czech Nymph':[['Olive','#7a8a40',{}],['Tan','#c9a47a',{b:'#c9a47a'}],['Rust','#8a3d1e',{b:'#8a3d1e'}]],
 'San Juan Worm':[['Red','#c0392b',{}],['Pink','#e79aa8',{b:'#e79aa8'}],['Tan','#c9a47a',{b:'#c9a47a'}],['Orange','#e08a2a',{b:'#e08a2a'}]],
 'Squirmy Worm':[['Orange','#e08a5a',{}],['Pink','#e79aa8',{b:'#e79aa8'}],['Red','#c0392b',{b:'#c0392b'}],['Tan','#c9a47a',{b:'#c9a47a'}]],
 'Egg / Mop / pellet':[['Peach','#f0a37a',{}],['Orange','#e8742a',{b:'#e8742a'}],['Chartreuse','#c8e04a',{b:'#c8e04a'}],['Pink','#e79aa8',{b:'#e79aa8'}],['Cream','#efe3c4',{b:'#efe3c4'}]],
 'Frenchie':[['Pink collar','#e0709a',{}],['Chartreuse collar','#c8e04a',{th:'#c8e04a'}],['Orange collar','#e8742a',{th:'#e8742a'}],['Silver bead','#c7ccd0',{bd:'#c7ccd0'}]],
 'Rainbow Warrior':[['Natural','#6b5a3a',{}],['Black','#2a2a2a',{b:'#2a2a2a'}],['Olive','#6b7a3a',{b:'#6b7a3a'}]],
 'Woolly Bugger':[['Olive','#3d4a24',{}],['Black','#1c1c1c',{t:'#1c1c1c',b:'#1c1c1c',h:'#333'}],['White','#efe9dc',{t:'#f0ece4',b:'#f0ece4',h:'#d8d4cc'}],['Brown','#5a3a22',{t:'#5a3a22',b:'#5a3a22',h:'#3a2410'}],['Burgundy','#6a1f2a',{t:'#6a1f2a',b:'#6a1f2a',h:'#3a1018'}]],
 'Zonker':[['White','#efe9dc',{}],['Olive','#6b7a3a',{w:'#6b7a3a',w2:'#6b7a3a'}],['Black','#222',{w:'#2a2a2a',w2:'#2a2a2a'}],['Natural','#c9b078',{w:'#c9b078',w2:'#c9b078'}],['Yellow','#e6c84a',{w:'#e6c84a',w2:'#e6c84a'}]],
 'Clouser Minnow':[['Blue/white','#40608a',{}],['Chartreuse/white','#9ac040',{w2:'#9ac040'}],['Olive/white','#6b7a3a',{w2:'#6b7a3a'}],['Black/white','#222',{w2:'#2a2a2a'}]],
 'Slumpbuster':[['Olive-tan','#6a5a30',{}],['Black','#222',{t:'#1c1c1c',b:'#1c1c1c',h:'#222'}],['White','#efe9dc',{t:'#efe9dc',b:'#efe9dc',h:'#d8d4cc'}],['Tan','#c9b078',{t:'#c9b078',b:'#c9b078',h:'#b8a068'}]],
 'Muddler Minnow':[['Natural','#8a6a3a',{}],['Olive','#6b7a3a',{w:'#6b7a3a',hd:'#4a5a28'}],['Black','#222',{w:'#2a2a2a',hd:'#1c1c1c'}],['White','#efe9dc',{w:'#d8d4cc',hd:'#c8c0a8'}]],
 'Mohair Leech':[['Black','#2b2b2b',{}],['Olive','#4a5a28',{t:'#4a5a28',b:'#4a5a28'}],['Burgundy','#6a1f2a',{t:'#6a1f2a',b:'#6a1f2a'}],['Brown','#5a3a22',{t:'#5a3a22',b:'#5a3a22'}]],
 'Balanced Leech':[['Burgundy','#4a2a20',{}],['Black','#222',{t:'#1c1c1c',b:'#1c1c1c'}],['Olive','#4a5a28',{t:'#4a5a28',b:'#4a5a28'}],['Tan','#c9a47a',{t:'#c9a47a',b:'#c9a47a'}]],
 'Rabbit Strip Leech':[['Black','#2b2b2b',{}],['Olive','#4a5a28',{t:'#4a5a28',b:'#4a5a28'}],['Burgundy','#6a1f2a',{t:'#6a1f2a',b:'#6a1f2a'}],['Purple','#4a2a6a',{t:'#4a2a6a',b:'#4a2a6a'}],['White','#efe9dc',{t:'#efe9dc',b:'#efe9dc'}]],
 'Sculpzilla':[['Olive','#5a4a28',{}],['Tan','#c9b078',{w:'#c9a468',w2:'#efe3c4',b:'#c9b078',hd:'#a88a58'}],['Black','#222',{w:'#222',w2:'#444',b:'#222',hd:'#1c1c1c'}],['Brown','#6a4a2e',{w:'#6a4a2e',b:'#6a4a2e',hd:'#4a3220'}]],
 'Sex Dungeon / Dungeon':[['Cream','#cfd8dc',{}],['Olive','#6b7a3a',{b:'#6b7a3a',t:'#6b7a3a',w:'#4a5a28',w2:'#6b7a3a'}],['Black','#222',{b:'#2a2a2a',t:'#1c1c1c',w:'#1c1c1c',w2:'#2a2a2a'}],['Yellow','#e6c84a',{b:'#e6c84a',t:'#e6c84a',w:'#b89a2a',w2:'#e6c84a'}]],
 'Circus Peanut':[['Cream','#efe6c8',{}],['Olive','#6b7a3a',{b:'#6b7a3a',t:'#6b7a3a',w:'#4a5a28',w2:'#6b7a3a'}],['Black','#222',{b:'#2a2a2a',t:'#1c1c1c',w:'#222',w2:'#333'}],['Tan','#c9a867',{b:'#c9a867',t:'#c9a867',w:'#a88848',w2:'#c9a867'}]],
 'Matuka':[['Natural','#6a5030',{}],['Olive','#6b7a3a',{w:'#4a5a28',b:'#6b7a3a',h:'#4a5a28'}],['Black','#222',{w:'#1c1c1c',b:'#2a2a2a',h:'#1c1c1c'}],['White','#efe9dc',{w:'#d8d4cc',b:'#efe9dc',h:'#d8d4cc'}]]
};
export const VAR={};                                  // chosen colour index per fly name
export function recolor(a,s){
  const o=JSON.parse(JSON.stringify(a)),set=(x,k,v)=>{if(x&&v)x[k]=v};
  set(o.body,'c',s.b);set(o.tail,'c',s.t);set(o.wing,'c',s.w);set(o.wing,'c2',s.w2);set(o.hackle,'c',s.h);set(o.thorax,'c',s.th);set(o.legs,'c',s.l);set(o.head,'c',s.hd);
  if(s.bd)o.bead=s.bd;if(s.cn)o.cone=s.cn;return o;
}
export const A=name=>{const v=(VARIANTS[name]||[])[VAR[name]||0];return v?recolor(ART[name],v[2]):ART[name]};
