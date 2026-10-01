/* How each pattern is drawn (ART), including the later additions and corrections. */
import { C, Y, ln } from '../engine/core.js';

/* ---------------- pattern art (trout flies). v = how to spot it ---------------- */
export const T=(t,c,len,n)=>({t,c,len,n});
export const ART={
 'Parachute Adams':{ctx:'surface',tail:T('fibers','#8a8a8a',34,3),body:{c:'#8d8b87',w0:5,w1:7},wing:{t:'post',c:C.white},hackle:{t:'parachute',c:'#5a4030'},v:'White post sticking up + hackle wound flat around the post base.'},
 'Comparadun':{ctx:'surface',tail:T('split','#b8a678',36),body:{c:C.tan,w0:4,w1:7,seg:8},wing:{t:'fan',c:'#bfae86'},v:'Fan-shaped deer-hair wing and NO hackle at all.'},
 'Catskill dry (Light Cahill)':{ctx:'surface',tail:T('fibers',C.cream,36,3),body:{c:C.cream,w0:4,w1:7},wing:{t:'upright',c:'#efe7cf'},hackle:{t:'collar',c:'#b7894a',l:20},v:'Two upright split wings + a vertical hackle collar standing on stiff tails.'},
 'Rusty Spinner':{ctx:'surface',tail:T('split',C.gray,54),body:{c:C.rust,w0:3,w1:5,seg:10},wing:{t:'spent',c:'#d6e8f5'},v:'Wings laid out flat to both sides (spent) + very long split tails.'},
 'Trico Spinner':{ctx:'surface',hook:'std',tail:T('split',C.gray,56),body:{c:'#1c1c1c',w0:2.5,w1:4,seg:12},thorax:{c:'#1c1c1c',r:11},wing:{t:'spent',c:'#e9f3fb'},v:'Tiny; black slim body, clear spent wings, very long tails.'},
 'Paradrake':{ctx:'surface',hook:'long',tail:T('fibers','#3a3a3a',44,3),body:{c:'#6a7a2f',w0:5,w1:8,seg:10,rib:'#d9c98a'},wing:{t:'post',c:C.white,h:50},hackle:{t:'parachute',c:'#444',rx:36},v:'Big olive-banded body with a tall white post: a parachute scaled up.'},
 'Elk Hair Caddis':{ctx:'surface',body:{c:'#7b8f3a',w0:5,w1:6},wing:{t:'downwing',c:'#c9a867'},hackle:{t:'palmer',c:C.brown,l:14},v:'Wing lies back over the body like a roof; no tail; hackle wound along the body.'},
 'X-Caddis':{ctx:'surface',tail:T('shuck','#c1a45a',36),body:{c:C.tan,w0:4,w1:6},wing:{t:'downwing',c:'#b8a57c',len:224},v:'Sparse tent wing + a trailing shuck at the rear.'},
 'Stimulator':{ctx:'surface',hook:'long',tail:T('fibers','#c9a867',28,4),body:{c:'#e0902f',w0:6,w1:8},hackle:{t:'palmer',c:'#b77a3a',l:16,n:12},wing:{t:'downwing',c:'#c9a867',rise:48,len:272},xtra:`<g stroke="#8c8c8c" stroke-width="1.4">${[-3,-2,-1,0,1,2,3].map(i=>ln(110,Y,110+i*5,Y-20,'#6a4a2e',1.4)+ln(110,Y,110+i*5,Y+20,'#6a4a2e',1.4)).join('')}</g>`,v:'Big, bushy: palmered hackle + thick hair wing extending past the bend; orange body.'},
 'Yellow Sally':{ctx:'surface',body:{c:C.yellow,w0:3.5,w1:5},wing:{t:'downwing',c:'#e6e0b6',rise:26},hackle:{t:'collar',c:'#d9d2a8',l:13},v:'Slim yellow body with a pale, flat wing; no tail.'},
 'Griffith’s Gnat':{ctx:'surface',body:{c:'#2e4a3a',w0:3,w1:5,fuzz:true},hackle:{t:'palmer',c:'#a9a9a9',l:12,n:14},v:'Tiny; peacock-green body with grizzly hackle spiraled over it. No wing, no tail.'},
 'Hopper':{ctx:'surface',hook:'long',body:{c:'#c5b24a',w0:6,w1:8,seg:8},wing:{t:'downwing',c:'#8a6a3a',len:262,rise:30},legs:{t:'rubber',c:'#8a6a3a',n:3,up:true},v:'Long yellow body, folded hair wing, rubber legs.'},
 'Ant':{ctx:'surface',body:{t:'ant',c:'#1a1a1a',w0:6,w1:8,x1:100},v:'Two round blobs (head/thorax + abdomen) with a pinched “waist”.'},
 'Beetle':{ctx:'surface',body:{c:'#2b2b2b',w0:10,w1:10,x1:104},wing:{t:'foam',c:'#161616',x0:104,x1:222,h:12},legs:{t:'fibers',c:'#222',n:3},v:'Short, round and glossy: foam shell humped over the back.'},
 'Cricket':{ctx:'surface',hook:'long',body:{c:'#1c1c1c',w0:7,w1:9},wing:{t:'downwing',c:'#2a2a2a',len:268,rise:30},legs:{t:'rubber',c:'#1c1c1c',n:3,up:true},v:'All-black, bulky, with rubber legs.'},
 'Royal Wulff':{ctx:'surface',tail:T('fibers',C.brown,38,4),body:{c:'#2e4a3a',w0:6,w1:7,band:[158,36,'#b83a2a']},wing:{t:'upright',c:C.white},hackle:{t:'bushy',c:'#5a3a22',l:20},v:'White upright hair wings + red band on the body + bushy brown hackle.'},
 'Chubby Chernobyl':{ctx:'surface',hook:'long',body:{c:'#e0a44a',w0:8,w1:9,x1:104},wing:{t:'foam',c:'#d65a3a',x0:104,x1:250,h:14},legs:{t:'rubber',c:'#222',n:3,up:true},xtra:`<rect x="109" y="${Y-52}" width="7" height="30" fill="#f08030" stroke="rgba(0,0,0,.3)"/>`,v:'Two-layer foam body with a bright wing post and rubber legs.'},
 'Humpy':{ctx:'surface',tail:T('fibers',C.brown,38,4),body:{c:'#b8b040',w0:6,w1:8,band:[150,16,'#b83a2a']},wing:{t:'fan',c:'#b7a37a',s:.8},hackle:{t:'bushy',c:'#5a3a22',l:20},v:'Humped deer-hair back with upright hair wings; bushy and bouncy.'},
 'RS2':{ctx:'film',tail:T('fibers','#8a8f94',30,2),body:{c:'#8a8f94',w0:3,w1:5,seg:10},wing:{t:'post',c:'#e8e8e8',h:22},v:'Slim gray body with a very short wing nub in the film.'},
 'CDC Emerger':{ctx:'film',tail:T('shuck','#c1a45a',38),body:{c:'#7a7a40',w0:4,w1:6},wing:{t:'fan',c:'#d8d8d0',s:.55},v:'Fluffy CDC puff on top, trailing shuck behind.'},
 'Sparkle Dun':{ctx:'film',tail:T('shuck','#c9a940',42),body:{c:C.tan,w0:4,w1:6},wing:{t:'fan',c:'#bfae86',s:.8},v:'Comparadun-style fan wing PLUS a sparkly trailing shuck.'},
 'Cripple':{ctx:'film',tail:T('shuck','#c1a45a',34),body:{c:C.olive,w0:4,w1:6},wing:{t:'downwing',c:'#c9c9c0',len:200,rise:24},hackle:{t:'collar',c:C.dun,l:12},v:'Half-formed: short wing, collar hackle and a stuck shuck.'},
 'Partridge & Orange':{ctx:'sub',body:{c:'#d9742a',w0:3.5,w1:5},hackle:{t:'soft',c:'#8a7a5a',l:22},v:'Slim, wingless, swept-back soft hackle collar.'},
 'Hare’s Ear Soft Hackle':{ctx:'sub',body:{c:'#8a7a5a',w0:4,w1:7,fuzz:true},hackle:{t:'soft',c:'#7a6a52',l:22},v:'Fuzzy body + swept-back partridge collar.'},
 'Pheasant Tail':{ctx:'sub',bead:C.copper,tail:T('fibers','#7a4a1a',32,3),body:{c:'#7a4a1a',w0:4,w1:6,seg:10,rib:C.copper},thorax:{c:'#2f2f22',r:15,fuzz:true},wing:{t:'case',c:'#7a4a1a',len:140},legs:{t:'fibers',c:'#7a4a1a',n:3},v:'Slim brown-banded body, copper wire, dark thorax, wing case, 3 tails, bead.'},
 'Hare’s Ear':{ctx:'sub',bead:C.gold,tail:T('fibers','#8a7a5a',30,3),body:{c:'#8a7a5a',w0:5,w1:8,fuzz:true,rib:C.gold},thorax:{c:'#7a6a4a',r:16,fuzz:true},legs:{t:'fibers',c:'#8a7a5a',n:4},v:'Shaggy, buggy body with “picked-out” fuzz; gold rib.'},
 'Perdigon':{ctx:'sub',bead:C.silver,tail:T('fibers','#555',24,3),body:{c:'#4a4a4a',w0:3,w1:4,shine:true},v:'Super slim, glossy resin body with a shiny bead; nothing else.'},
 'Green Rock Worm':{ctx:'sub',body:{c:'#6aa82a',w0:7,w1:9,seg:12},head:{t:'ball',c:'#222'},legs:{t:'fibers',c:'#222',n:3},v:'Fat green grub with a black head and tiny legs: no tail.'},
 'Caddis pupa (Sparkle Pupa)':{ctx:'sub',body:{c:C.tan,w0:6,w1:8,seg:9},thorax:{c:'#3a2e22',r:15},sheath:22,hackle:{t:'soft',c:'#6a5a44',l:16},antenna:true,v:'Tan body inside a shiny “bubble” sheath, antennae, soft legs.'},
 'Cased caddis':{ctx:'sub',body:{t:'case',c:'#9a8a68'},v:'A rough tube of pebbles/sticks with a black head poking out.'},
 'Pat’s Rubber Legs':{ctx:'sub',hook:'long',bead:'#222',tail:T('rubber','#222',30),body:{c:'#4a3a2a',w0:7,w1:9,fuzz:true},legs:{t:'rubber',c:'#222',n:3,up:true},v:'Fat chenille body with long rubber legs and forked tail.'},
 'Kaufmann’s Stone':{ctx:'sub',hook:'long',bead:'#222',tail:T('biot','#222',32),body:{c:'#6a4a2a',w0:6,w1:8,seg:8},thorax:{c:'#3a2a1a',r:16,fuzz:true},wing:{t:'case',c:'#1a1a1a',len:170},legs:{t:'rubber',c:'#2a2a2a',n:3,up:true},v:'Segmented body, big dark wing case, forked tail, rubber legs.'},
 'Zebra Midge':{ctx:'sub',bead:C.silver,br:6,body:{c:'#1c1c1c',w0:3,w1:4,seg:14,rib:'#d8d8d8'},v:'Tiny black body with white-striped ribbing and a bead: no tail.'},
 'Bloodworm':{ctx:'sub',body:{c:'#b01e1e',w0:3,w1:3.5,seg:14,shine:true},head:{c:'#2b2b2b'},v:'Long thin red body, no bead, no tail.'},
 'Disco Midge':{ctx:'sub',bead:'#d6e0e8',br:6,body:{c:'#3a3a3a',w0:3,w1:4,rib:'#e8f0f6',ribn:7,shine:true},tail:T('fibers','#d9d9d9',16,2),v:'Shiny midge: pearly body flash and a glassy bead.'},
 'Sow bug':{ctx:'sub',body:{t:'oval',c:'#a9aaa6'},v:'Flat, wide and oval with ribbed segments like an armadillo.'},
 'Scud':{ctx:'sub',body:{t:'curl',c:'#c9a47a'},v:'Curled crescent body with segmented back and tiny legs.'},
 'Czech Nymph':{ctx:'sub',bead:C.gold,br:8,body:{t:'curl',c:'#7a8a40'},v:'Scud shape, but heavy: big gold/ tungsten bead and shell back.'},
 'San Juan Worm':{ctx:'sub',body:{t:'worm',c:'#c0392b',w:8},v:'A wavy red/pink rope. No insect parts.'},
 'Egg / Mop / pellet':{ctx:'sub',body:{t:'egg',c:'#f0a37a'},v:'A round blob—no tail, wing, legs.'},
 'Copper John':{ctx:'sub',bead:C.gold,tail:T('biot','#444',26),body:{c:C.copper,w0:4,w1:6,seg:7,shine:true},thorax:{c:'#2f3a24',r:15,fuzz:true},wing:{t:'case',c:'#e6e6e6',len:148,shine:true},legs:{t:'rubber',c:'#222',n:2},v:'Metallic copper wire body + shiny epoxy back, gold bead.'},
 'Prince Nymph':{ctx:'sub',bead:C.gold,tail:T('biot','#5a3a22',26),body:{c:'#2e3a2a',w0:5,w1:7,fuzz:true,rib:C.gold},hackle:{t:'soft',c:'#6a4a2e',l:14},wing:{t:'v',c:C.white},v:'White V-shaped biot wings laid back + peacock body.'},
 'Flashback Pheasant Tail':{ctx:'sub',bead:C.copper,tail:T('fibers','#7a4a1a',32,3),body:{c:'#7a4a1a',w0:4,w1:6,seg:10,rib:C.copper},thorax:{c:'#2f2f22',r:15,fuzz:true},wing:{t:'case',c:'#cfd8dc',len:140,shine:true},legs:{t:'fibers',c:'#7a4a1a',n:3},v:'Pheasant Tail with a shiny silver wing case.'},
 'Woolly Bugger':{ctx:'sub',hook:'long',bead:C.gold,tail:T('marabou','#3a4a22',64),body:{c:'#3d4a24',w0:7,w1:8,fuzz:true},hackle:{t:'palmer',c:'#1c1c1c',l:20,n:14},flash:'#7fd8ff',v:'Marabou tail + fuzzy chenille body + palmered hackle all the way up.'},
 'Zonker':{ctx:'sub',hook:'long',tail:null,body:{c:'#cfd8dc',w0:5,w1:7,rib:'#9aa5ac',shine:true},wing:{t:'sw',c:'#efe9dc',c2:'#efe9dc',len:62},head:{c:'#2b2118'},v:'Slim silver body topped with a long rabbit-strip wing that trails far past the hook.'},
 'Clouser Minnow':{ctx:'sub',hook:'long',eyes:C.red,body:{c:'#d8dde0',w0:3,w1:3,x1:110},wing:{t:'sw',c:'#40608a',c2:C.white,len:60},flash:'#9ee8ff',v:'Dumbbell eyes at the head + bucktail wing (dark on top, white beneath).'},
 'Slumpbuster':{ctx:'sub',hook:'long',cone:C.gold,tail:T('strip','#8a7040',82,9),body:{c:'#6a5a30',w0:6,w1:8},hackle:{t:'soft',c:'#7a6030',l:20},v:'Cone head with a fat rabbit-fur collar and long zonker tail.'},
 'Muddler Minnow':{ctx:'sub',hook:'long',tail:T('fibers','#8a6a3a',20,2),body:{c:'#d6b44a',w0:4,w1:5,shine:true},wing:{t:'downwing',c:'#8a6a3a',len:272,rise:24},head:{t:'deer',c:'#6a4a2a'},v:'Spun deer-hair head (a bristly ball) + mottled wing.'},
 'Mohair Leech':{ctx:'sub',hook:'long',bead:'#222',tail:T('marabou','#2b2b2b',78),body:{c:'#2b2b2b',w0:5,w1:6,fuzz:true},v:'One long marabou tail, fuzzy body, NO hackle.'},
 'Balanced Leech':{ctx:'sub',hook:'long',eyes:'#d8a63a',tail:T('marabou','#4a2a20',72),body:{c:'#4a2a20',w0:5,w1:6,fuzz:true},v:'Leech with a heavy dumbbell “balance” eye at the head.'},
 'Sex Dungeon / Dungeon':{ctx:'sub',hook:'xlong',artic:true,cone:C.gold,tail:T('strip','#e9e4d8',54,9),body:{c:'#cfd8dc',w0:6,w1:9,shine:true},head:{t:'deer',c:'#3a2a1a'},wing:{t:'sw',c:'#6a5030',c2:'#e9e4d8',len:30},v:'Two-hook articulated (jointed) body, big deer-hair head.'}
};

/* ---------- more trout patterns (Fly Deal-style coverage) ---------- */
Object.assign(ART,{
 'BWO Thorax Dun':{ctx:'surface',tail:T('split','#6e747a',36),body:{c:'#6b7a3a',w0:3,w1:5,seg:9},thorax:{c:'#55603a',r:11},wing:{t:'upright',c:'#aab0b6'},hackle:{t:'collar',c:'#8a8f94',l:14},v:'Small olive body, a pair of upright gray wings and a hackle at the thorax; slimmer than a Catskill.'},
 'PMD Dun':{ctx:'surface',tail:T('split','#d9c98a',38),body:{c:'#e0cc7a',w0:4,w1:6,seg:9},wing:{t:'upright',c:'#d8dcdf'},hackle:{t:'collar',c:'#d9c98a',l:16},v:'Pale yellow-cream body with light gray wings.'},
 'Western March Brown':{ctx:'surface',tail:T('fibers','#6a4a2e',38,3),body:{c:'#7a4a30',w0:4,w1:7,seg:9},wing:{t:'upright',c:'#9a8a74'},hackle:{t:'collar',c:'#6a4a2e',l:17},v:'Brown body and mottled upright wings; bigger than a BWO.'},
 'Callibaetis (pond mayfly)':{ctx:'surface',tail:T('split','#8a8f94',40),body:{c:'#9a8a6a',w0:4,w1:6,seg:9,rib:'#6a5a40'},wing:{t:'upright',c:'#bdb7a8'},hackle:{t:'collar',c:'#8a7a5a',l:15},v:'Speckled tan-gray body with a mottled wing: the still-water mayfly.'},
 'Goddard Caddis':{ctx:'surface',body:{c:'#b8a070',w0:9,w1:10,fuzz:true},wing:{t:'downwing',c:'#a88a5a',len:236,rise:30},head:{t:'deer',c:'#8a6a3a'},antenna:true,v:'Bulky clipped deer-hair body and head, wing swept back, with antennae.'},
 'Sofa Pillow':{ctx:'surface',hook:'long',tail:T('fibers','#5a3a22',30,3),body:{c:'#c85a2a',w0:6,w1:8,seg:8},wing:{t:'downwing',c:'#8a6a3a',len:270,rise:42},hackle:{t:'collar',c:'#5a3a22',l:18},v:'Big orange-red body under a heavy hair wing: a golden stonefly.'},
 'Palomino Midge':{ctx:'film',body:{c:'#9a8f5a',w0:2.5,w1:3.5,seg:10},wing:{t:'post',c:C.white,h:18},v:'Tiny tan body with a short white post.'},
 'Madam X':{ctx:'surface',hook:'long',body:{c:'#e0c04a',w0:6,w1:8,seg:8},wing:{t:'downwing',c:'#c9a867',len:262,rise:30},legs:{t:'rubber',c:'#f0e8d0',n:3,up:true},hackle:{t:'collar',c:'#6a4a2e',l:16},v:'Hopper with a yellow body, hair wing, white rubber legs and a bushy collar.'},
 'Foam Inchworm':{ctx:'surface',body:{c:'#8fc04a',w0:4,w1:4,seg:12,x1:96},v:'A long, bright green, ribbed foam rope: no wing, no tail.'},
 'Renegade':{ctx:'surface',body:{c:'#2e4a3a',w0:5,w1:6,band:[168,24,'#7a4a2a']},hackle:{t:'bushy',c:'#e8e8e0',l:18},xtra:[0,1,2,3,4,5].map(i=>ln(186+i*3,Y,186+i*5,Y-17,'#6a4a2e',1.4)+ln(186+i*3,Y,186+i*5,Y+17,'#6a4a2e',1.4)).join(''),v:'Hackle-heavy: white at the head, brown at the back, peacock in the middle.'},
 'Coachman Trude':{ctx:'surface',tail:T('fibers','#7a3a22',34,3),body:{c:'#2e4a3a',w0:5,w1:6,band:[150,30,'#b83a2a']},wing:{t:'downwing',c:'#f2f2ee',len:226,rise:26},hackle:{t:'collar',c:'#5a3a22',l:16},v:'Peacock-and-red body under a white hair wing laid flat over the back.'},
 'Barr Emerger':{ctx:'film',tail:T('split','#8a8f94',24),body:{c:'#6b6b3a',w0:3,w1:5,seg:9},thorax:{c:'#5a4a30',r:11},wing:{t:'post',c:'#d8d8d8',h:14},legs:{t:'fibers',c:'#6a5a40',n:3},v:'Slim olive body, swollen thorax and a tiny gray wing bud.'},
 'Mother Shucker':{ctx:'film',tail:T('shuck','#c9b45a',40),body:{c:'#2b2b2b',w0:2.5,w1:4,seg:10,rib:'#cfcfcf'},thorax:{c:'#222',r:10},wing:{t:'post',c:'#f4f4f4',h:16},v:'Midge emerger: dark slim body, round thorax, white wing nub and a trailing shuck.'},
 'Pheasant Tail Soft Hackle':{ctx:'sub',bead:C.copper,body:{c:'#7a4a1a',w0:3,w1:5,seg:10},thorax:{c:'#2f3a24',r:10,fuzz:true},hackle:{t:'soft',c:'#8a7a5a',l:22},v:'Slim banded body with a small bead and a swept-back soft collar.'},
 'Royal Coachman Wet':{ctx:'sub',tail:T('fibers','#e0a030',26,3),body:{c:'#2e4a3a',w0:5,w1:6,band:[150,32,'#b83a2a']},wing:{t:'downwing',c:'#f2f2ee',len:214,rise:20},hackle:{t:'soft',c:'#6a3a22',l:20},v:'Peacock-red-peacock body, white wing swept flat back, soft brown hackle.'},
 'Frenchie':{ctx:'sub',bead:'#e0709a',tail:T('fibers','#7a4a1a',24,3),body:{c:'#7a4a1a',w0:3,w1:5,seg:10,shine:true},thorax:{c:'#e8a040',r:11},v:'Slim pheasant-tail body with a bright pink bead and a hot orange collar.'},
 'Rainbow Warrior':{ctx:'sub',bead:C.silver,tail:T('fibers','#6a6a6a',22,2),body:{c:'#6b5a3a',w0:3,w1:5,rib:'#c0e8ff'},thorax:{c:'#d9a0b0',r:11,fuzz:true},wing:{t:'case',c:'#9ee8ff',len:132,shine:true},v:'Slim body with a shiny rainbow-flash back, pink thorax and a bead.'},
 'Peeking Caddis':{ctx:'sub',body:{t:'case',c:'#9a8a68'},xtra:`<ellipse cx="90" cy="${Y}" rx="13" ry="9" fill="#6aa82a"/><circle cx="80" cy="${Y}" r="6" fill="#222"/>`,v:'A pebble case with a green grub poking out the front.'},
 'Brassie':{ctx:'sub',body:{c:'#c4733a',w0:2.5,w1:3.5,seg:14,shine:true},head:{c:'#2f3a24'},v:'A thin copper-wire body with a tiny dark head: a wire worm.'},
 'Black Beauty':{ctx:'sub',bead:'#222',br:6,body:{c:'#1c1c1c',w0:2.5,w1:3.5,rib:'#d8d8d8',ribn:8},thorax:{c:'#1c1c1c',r:9},v:'Slim black body, silver rib, black bead and a small round thorax.'},
 'Squirmy Worm':{ctx:'sub',body:{t:'worm',c:'#e08a5a',w:12},v:'A thick rubbery worm, fatter than a San Juan.'},
 'Zug Bug':{ctx:'sub',bead:C.gold,tail:T('fibers','#2f3a24',28,3),body:{c:'#2e4a3a',w0:5,w1:7,fuzz:true,rib:'#d8d8d8'},hackle:{t:'soft',c:'#6a4a2e',l:14},wing:{t:'case',c:'#c9a070',len:142},v:'Peacock body with silver rib, brown hackle and a mottled wing case.'},
 'Matuka':{ctx:'sub',hook:'long',body:{c:'#d8c8a0',w0:5,w1:6,rib:'#c0c0c0'},wing:{t:'sw',c:'#6a5030',c2:'#d8c8a0',len:40},hackle:{t:'soft',c:'#6a5030',l:16},v:'Feather wing laid flat along the back and tied down with wire, tip beyond the hook.'},
 'Mickey Finn':{ctx:'sub',hook:'long',body:{c:C.silver,w0:4,w1:5,rib:'#8a9096',shine:true},wing:{t:'sw',c:'#e6c84a',c2:'#b83a2a',len:36},v:'Silver body with a bucktail wing banded yellow-red-yellow.'},
 'Grey Ghost':{ctx:'sub',hook:'long',body:{c:'#e6d078',w0:5,w1:6,rib:'#c7ccd0'},wing:{t:'sw',c:'#9aa0a6',c2:'#e9e4d8',len:40},hackle:{t:'soft',c:'#9aa0a6',l:16},v:'Gray feather wing over a yellow silver-ribbed body: a smelt imitation.'},
 'Sculpzilla':{ctx:'sub',hook:'long',body:{c:'#6a5a30',w0:6,w1:8},wing:{t:'sw',c:'#5a4a28',c2:'#c9b078',len:30},legs:{t:'rubber',c:'#6a5030',n:2},head:{t:'deer',c:'#5a4a30'},v:'Wide flat head, rubber fins, mottled tan body: a sculpin.'},
 'Rabbit Strip Leech':{ctx:'sub',hook:'long',cone:C.gold,tail:T('strip','#2b2b2b',92,9),body:{c:'#2b2b2b',w0:5,w1:6,fuzz:true},v:'Long wavy rabbit-strip tail, no hackle, usually black or olive.'},
 'Circus Peanut':{ctx:'sub',hook:'xlong',artic:true,cone:C.gold,tail:T('strip','#efe6c8',64,9),body:{c:'#efe6c8',w0:7,w1:9,shine:true},head:{t:'deer',c:'#c9a867'},wing:{t:'sw',c:'#d8b878',c2:'#efe6c8',len:24},v:'Huge, jointed, cream-colored, with a big head and flowing tail.'},
 'Crayfish pattern':{ctx:'sub',hook:'long',tail:T('split','#8a4a2a',30),body:{c:'#8a4a2a',w0:6,w1:8,seg:9},legs:{t:'rubber',c:'#8a4a2a',n:3},xtra:`<ellipse cx="84" cy="${Y-15}" rx="17" ry="6" transform="rotate(-24 84 ${Y-15})" fill="#8a4a2a"/><ellipse cx="84" cy="${Y+15}" rx="17" ry="6" transform="rotate(24 84 ${Y+15})" fill="#8a4a2a"/>`,v:'Two claws up front, a segmented rust-orange body, legs and a short tail fan.'}
});

['Griffith’s Gnat','Renegade','Royal Wulff','Coachman Trude','Royal Coachman Wet','Prince Nymph','Zug Bug'].forEach(n=>{ART[n].body.herl=true});
['Elk Hair Caddis','X-Caddis','Stimulator','Sofa Pillow','Yellow Sally','Madam X'].forEach(n=>{ART[n].antenna=true});

['Parachute Adams','Comparadun','Catskill dry (Light Cahill)','Elk Hair Caddis','X-Caddis','Stimulator','Yellow Sally','Hopper','Madam X','Humpy','Sparkle Dun','CDC Emerger','Cripple','Callibaetis (pond mayfly)','PMD Dun','BWO Thorax Dun','Western March Brown','Goddard Caddis'].forEach(n=>{if(ART[n]&&ART[n].body&&!ART[n].body.fuzz)ART[n].body.fuzz='fine'});
/* parts that used to be hand-drawn extras, and corrections from the expert review */
(function(){
  const set=(n,f)=>{if(ART[n])f(ART[n])};
  set('Stimulator',a=>{delete a.xtra;a.collar={c:'#6a4a2e',l:21};delete a.antenna});
  set('Chubby Chernobyl',a=>{delete a.xtra;a.post={c:'#f08030',h:30}});
  set('Renegade',a=>{delete a.xtra;a.collar={c:'#6a4a2e',l:17,x:150};delete a.body.band});
  set('Peeking Caddis',a=>{delete a.xtra;a.body.peek='#6aa82a'});
  set('Crayfish pattern',a=>{delete a.xtra;a.claws='#8a4a2a'});
  set('Parachute Adams',a=>{a.hackle.c2='#a9a9a9'});
  set('Griffith’s Gnat',a=>{a.hackle.bar=true});
  ['Elk Hair Caddis','X-Caddis','Yellow Sally','Sofa Pillow','Madam X','Caddis pupa (Sparkle Pupa)'].forEach(n=>set(n,a=>{delete a.antenna}));
  set('Catskill dry (Light Cahill)',a=>{a.wing.c='#d8c690';a.wing.bar=true});
  set('Western March Brown',a=>{a.wing.c='#8a7a64';a.wing.bar=true});
  set('Callibaetis (pond mayfly)',a=>{a.wing.c='#a79f8c';a.wing.bar=true});
  set('BWO Thorax Dun',a=>{a.wing.c='#8f969c'});
  set('PMD Dun',a=>{a.wing.c='#bcc1c2'});
  set('Madam X',a=>{delete a.hackle;a.head={t:'deer',c:'#c9a867'};a.tail={t:'fibers',c:'#c9a867',len:30,n:5}});
  set('Hopper',a=>{a.head={t:'deer',c:'#8a6a3a'}});
  set('Cricket',a=>{a.head={t:'deer',c:'#1c1c1c'}});
  set('Zebra Midge',a=>{a.body.ribw=.8;a.body.rib='#dcdcdc'});
  set('Black Beauty',a=>{a.body.rib='#c4733a';a.body.ribw=.9});
  set('Brassie',a=>{a.body.ribw=1});
  set('Disco Midge',a=>{a.body={c:'#6a7a8a',w0:2.6,w1:3.6,shine:true,seg:10};a.thorax={c:'#2e5a3e',r:8};delete a.tail});
  set('Frenchie',a=>{a.bead='#d8a63a';a.thorax={c:'#e0709a',r:9}});
  set('Rainbow Warrior',a=>{a.body={c:'#b7a3c8',w0:3,w1:5,shine:true,rib:'#ffffff',ribw:.8};a.tail={t:'fibers',c:'#6a4a2e',len:22,n:3}});
  set('Scud',a=>{a.hook='grub'});
  set('Czech Nymph',a=>{a.hook='grub'});
  set('Green Rock Worm',a=>{a.hook='grub';a.body={t:'curl',c:'#6aa82a'};delete a.legs});
  set('Clouser Minnow',a=>{a.flip=true;a.wing={t:'sw',c:'#f4f4f0',c2:'#40608a',len:60};delete a.body});
  ['Woolly Bugger','Zonker','Clouser Minnow','Slumpbuster','Muddler Minnow','Sculpzilla','Mohair Leech','Balanced Leech','Rabbit Strip Leech','Sex Dungeon / Dungeon','Circus Peanut','Matuka','Mickey Finn','Grey Ghost','Crayfish pattern'].forEach(n=>set(n,a=>{a.hk='nickel'}));
})();
(function(){
  const set=(n,f)=>{if(ART[n])f(ART[n])};
  set('Zonker',a=>{delete a.wing;delete a.tail;a.body={c:'#cfd8dc',w0:4.5,w1:6,shine:true,rib:'#9aa5ac',ribw:.7,seg:0};a.wing={t:'zstrip',c:'#efe9dc',len:84,w:10};a.hackle={t:'soft',c:'#efe9dc',l:12}});
  set('Mickey Finn',a=>{a.wing={t:'sw',c:'#e6c84a',mid:'#b83a2a',c2:'#e6c84a',belly:false,len:60}});
  set('Matuka',a=>{a.wing={t:'sw',c:'#6a5030',c2:'#d8c8a0',belly:false,len:48}});
  set('Grey Ghost',a=>{a.body={c:'#e0802a',w0:5,w1:6,rib:'#c7ccd0',ribw:.9};a.wing={t:'sw',c:'#8f979d',c2:'#e9e4d8',len:58}});
  set('Sculpzilla',a=>{delete a.head;delete a.wing;a.cone='#a58a4a';a.body={c:'#d8c8a0',w0:6,w1:9,fuzz:true,shine:false};a.tail={t:'strip',c:'#7a6238',len:84,w:9,flat:true};a.hackle={t:'soft',c:'#7a6238',l:18};a.legs={t:'rubber',c:'#6a5030',n:2}});
  set('Circus Peanut',a=>{delete a.wing;delete a.head;a.eyes='#c0392b';a.tail={t:'marabou',c:'#efe6c8',len:80};a.body={c:'#efe6c8',w0:7,w1:10,fuzz:true};a.collar={c:'#efe6c8',l:20};a.legs={t:'rubber',c:'#c8b89a',n:2,up:true}});
  set('Sex Dungeon / Dungeon',a=>{a.tail={t:'strip',c:'#e9e4d8',len:84,w:9,flat:true};a.legs={t:'rubber',c:'#e6c84a',n:2}});
})();
