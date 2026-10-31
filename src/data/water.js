/* Pick by water: a kind of water plus the day's conditions in, ranked ways to fish it out.
   Each way to fish has tags (dry, film, terr, wet, nymph, egg, streamer); each condition nudges some tags up or down. */
import { META, parseM } from './meta.js';
import { ALLN } from './tree.js';

/* Condition inputs: [key, label, [[value, label], ...]]. The first value of each is "no information". */
export const INPUTS=[
 ['time','Time of day',[['','Any time'],['dawn','Dawn'],['morn','Morning'],['mid','Midday'],['aft','Afternoon'],['eve','Evening']]],
 ['sky','Weather',[['','Any weather'],['sun','Sunny'],['cloud','Overcast'],['rain','Rain'],['wind','Windy'],['cold','Cold snap']]],
 ['fish','Fish you expect',[['','Any trout'],['rainbow','Rainbow'],['brown','Brown'],['cutt','Cutthroat'],['brook','Brook trout'],['white','Whitefish']]],
 ['depth','Depth',[['','Not sure'],['shallow','Shallow (under 2 ft)'],['med','Medium (2–4 ft)'],['deep','Deep (over 4 ft)']]],
 ['clarity','Water clarity',[['','Normal'],['clear','Gin clear'],['stained','Stained'],['muddy','Muddy']]],
 ['flow','Flow',[['','Normal'],['low','Low'],['high','High']]],
 ['rising','Fish rising?',[['','Not sure'],['yes','Yes'],['no','No']]]
];
/* FX[input][value]: tag → score change, and _ the reason shown to the user. */
export const FX={
 time:{dawn:{streamer:2,_:'Low light at dawn brings big fish out to chase'},morn:{nymph:1,_:'Mornings are nymph time until bugs hatch'},
  mid:{nymph:1,dry:-1,film:-1,terr:1,_:'Bright midday pushes fish deeper; hoppers still work'},aft:{dry:1,film:1,_:'Most hatches come off in the afternoon'},
  eve:{dry:2,film:1,streamer:1,_:'Evening brings spinner falls, egg-laying caddis and big fish'}},
 sky:{sun:{nymph:1,streamer:-1,terr:1,_:'Bright sun makes fish wary; go subtle'},cloud:{dry:1,film:2,streamer:1,_:'Overcast brings blue-winged olive hatches and bolder fish'},
  rain:{streamer:1,nymph:1,film:1,_:'Rain washes food in and hides you'},wind:{dry:-1,film:-1,terr:2,nymph:1,_:'Wind ruins small dries but blows hoppers in'},
  cold:{nymph:2,egg:1,dry:-2,film:-1,terr:-2,streamer:-1,_:'Cold slows fish: small flies, slow and deep'}},
 fish:{rainbow:{nymph:1,egg:1,_:'Rainbows feed hard on nymphs and eggs'},brown:{streamer:2,_:'Browns are the trout most likely to eat a streamer'},
  cutt:{dry:2,terr:1,_:'Cutthroat rise willingly to dries'},brook:{dry:1,wet:1,_:'Brook trout are eager and like bright flies'},white:{nymph:2,dry:-1,terr:-1,streamer:-2,_:'Whitefish feed on small nymphs near the bottom'}},
 depth:{shallow:{dry:1,film:1,streamer:-1,_:'In shallow water fish look up'},deep:{nymph:1,streamer:1,dry:-1,film:-1,_:'Deep water needs weight to reach the fish'}},
 clarity:{clear:{dry:1,film:1,streamer:-1,_:'Clear water: small flies and fine tippet'},stained:{streamer:2,egg:1,_:'Stained water is streamer water'},
  muddy:{streamer:1,egg:2,nymph:1,dry:-2,film:-2,terr:-2,_:'Muddy water: big, bright flies on the bottom'}},
 flow:{low:{dry:1,film:1,streamer:-1,_:'Low water makes fish spooky: go small, stay back'},high:{streamer:1,nymph:1,egg:1,dry:-1,film:-1,_:'High water pushes fish to the soft edges'}},
 rising:{yes:{dry:3,film:3,terr:1,_:'Fish are rising: fish the surface'},no:{dry:-2,film:-2,_:'No rises: go under the surface'}}
};
/* bigger flies when the water is dirty or high, smaller when it is clear, low or cold */
const SIZE={clarity:{stained:'big',muddy:'big',clear:'small'},flow:{high:'big',low:'small'},sky:{cold:'small'}};
export const DEPTHTIP={shallow:'Set the indicator about 2–3 ft above the fly, little or no split shot.',med:'Set the indicator 4–6 ft above the fly, one small split shot.',deep:'Set the indicator 6–9 ft above the fly and add split shot until it ticks bottom.'};

/* w: r river / s still water. d what it looks like, spots where fish hold, wade how to approach, miss common mistakes.
   Each approach: t title, k tags, why, how steps, f flies to try first, g tree groups to fill from. */
export const WATER=[
 {id:'tail',n:'Below a dam (tailwater)',w:'r',d:'Cold, clear, steady water released from a dam.',
  spots:['Soft seams beside the main current','Weed beds where sow bugs and scuds live','The slow edges, where midges collect'],
  wade:['Fish are used to anglers but see every fly: long, fine leaders','Check the dam release schedule before you wade'],
  miss:['Flies too big: think #18–24','Tippet too heavy for the clear water'],ap:[
  {t:'Tiny nymphs under an indicator',k:['nymph'],why:'Midges, sow bugs and scuds are most of what tailwater trout eat.',how:['Two small flies, the heavier one on top','Small indicator, dead drift through each seam'],f:['Zebra Midge','Sow bug','Scud','RS2','Pheasant Tail'],g:['Midge larvae & pupae','Crustaceans']},
  {t:'Midge dry on fine tippet',k:['dry'],why:'On calm afternoons fish sip midges in the slow edges.',how:['Watch for tiny rings in slow water','Cast a few feet above the fish, 6X–7X tippet'],f:['Griffith’s Gnat','Palomino Midge','Parachute Adams'],g:['Midge adults']},
  {t:'Egg or worm after a flow change',k:['egg','nymph'],why:'A rise in flow knocks worms and eggs loose.',how:['Fish it as the top fly above a small nymph','Best in the first hours after flows go up'],g:['Worms & eggs']}]},
 {id:'riffle',n:'Riffle',w:'r',d:'Shallow, fast, choppy water over gravel.',
  spots:['Slightly deeper slots and buckets','Where the riffle drops into a run','Behind any rock that breaks the current'],
  wade:['Chop hides you, so you can get close','Work upstream, short casts'],
  miss:['Skipping it because it looks too shallow','Not enough weight to reach the slots'],ap:[
  {t:'Dry-dropper',k:['dry','nymph'],why:'A buoyant dry floats the chop and hangs a nymph down where fish feed.',how:['Dropper 18–30 in under the dry','Any twitch of the dry: set the hook'],f:['Chubby Chernobyl','Stimulator','Elk Hair Caddis'],g:['Attractor dries','Caddis adults','Stonefly adults']},
  {t:'Tight-line (Euro) nymphing',k:['nymph'],why:'Short casts and direct contact suit quick, shallow water.',how:['Lead the flies through at current speed','Watch the sighter, set on any pause'],f:['Perdigon','Frenchie','Green Rock Worm','Czech Nymph'],g:['Mayfly nymphs','Caddis larvae & pupae']},
  {t:'Swing a soft hackle',k:['wet'],why:'Hatching caddis and mayflies swim up through riffles.',how:['Cast across and slightly down','Let the line tighten and the fly rise at the end of the swing'],g:['Soft hackles & wets']}]},
 {id:'run',n:'Run',w:'r',d:'Waist-deep, steady water with a smooth or slightly rippled top.',
  spots:['The seam between fast and slow water','Along the bottom in the middle third','At the head where the riffle enters'],
  wade:['Fish it in strips: near water first, then farther out','Stand below the fish and cast up and across'],
  miss:['Indicator set too shallow','Wading through the fish you should be casting to'],ap:[
  {t:'Two nymphs under an indicator',k:['nymph'],why:'Gets two depths and two foods in front of fish on every drift.',how:['Heavy fly on top, small fly 18 in below','Mend so the indicator drifts at current speed'],f:['Pat’s Rubber Legs','Pheasant Tail','Zebra Midge'],g:['Stonefly nymphs','Mayfly nymphs','Attractor nymphs']},
  {t:'Dry fly to rising fish',k:['dry'],why:'Match the size and color of what is hatching.',how:['Catch a bug and match its size first, then color','Cast 2–3 ft above the rise, no drag'],g:['Mayfly adults','Caddis adults']},
  {t:'Swing or strip a streamer',k:['streamer'],why:'Covers a lot of water and finds the bigger fish.',how:['Cast across, let it swing, then strip back','Take two steps downstream between casts'],f:['Woolly Bugger'],g:['Sculpin','Baitfish','Generalists']}]},
 {id:'pool',n:'Pool',w:'r',d:'Deep, slow, dark water, often below a riffle.',
  spots:['The head, where food pours in','On the bottom in the deepest part','The tail at dusk, when fish move up'],
  wade:['Approach from below and keep low','Long casts: fish in slow water see you easily'],
  miss:['Never reaching the bottom','Leaving before evening'],ap:[
  {t:'Deep indicator nymphing',k:['nymph','egg'],why:'Gets the fly down to fish resting on the bottom.',how:['Add split shot until the flies tick bottom','Long drifts through the head and middle'],f:['Pat’s Rubber Legs','Egg / Mop / pellet','Zebra Midge'],g:['Stonefly nymphs','Worms & eggs','Midge larvae & pupae']},
  {t:'Sink-tip streamer',k:['streamer'],why:'A big fly crawled along the bottom moves the largest trout.',how:['Let it sink, then strip slowly with pauses','Bump it along the bottom like a sculpin'],g:['Sculpin','Articulated & big','Crayfish','Generalists']},
  {t:'Evening dry at the tail',k:['dry'],why:'Spinner falls and egg-laying caddis bring fish up at dusk.',how:['Watch the tailout for rises as light fades','Spent spinners lie flat: fish them in the film'],f:['Rusty Spinner','Elk Hair Caddis'],g:['Mayfly adults']}]},
 {id:'flat',n:'Tailout / flat',w:'r',d:'Shallow, slow, glassy water where a pool runs out.',
  spots:['Just above the lip where the water speeds up','Along any slight depression','Near weed patches'],
  wade:['Stay well back and low; fish here spook at a shadow','Downstream or reach casts so the fly arrives first'],
  miss:['Line slapping the water','Lining the fish with your leader'],ap:[
  {t:'Small dry or emerger on a long, fine leader',k:['dry','film'],why:'Fish sip quietly in the film; drag-free drifts matter most.',how:['12 ft leader to 6X','One good cast beats ten quick ones'],g:['Emergers','Cripples','Mayfly adults','Midge adults']},
  {t:'Sight-fish a small nymph',k:['nymph'],why:'Watch the fish, not an indicator, and lift when it moves.',how:['Cast well above the fish','Lift when the fish turns or its mouth opens'],f:['Zebra Midge','Pheasant Tail','Sow bug','Scud']}]},
 {id:'pocket',n:'Pocket water',w:'r',d:'Fast water broken by boulders, with soft pockets behind them.',
  spots:['The calm pocket right behind each boulder','The soft water in front of big rocks','Edges where two currents meet'],
  wade:['Wade carefully: slick rocks and fast water','Short casts, keep line off the water'],
  miss:['Long drifts: each pocket only gives a few feet','Not enough weight to drop in fast'],ap:[
  {t:'High-floating dry',k:['dry'],why:'Bushy flies stay up in rough water and are easy to see.',how:['Drop it in each pocket, drift a few feet, pick up','Fish every pocket once, then move on'],f:['Royal Wulff','Stimulator','Humpy','Chubby Chernobyl'],g:['Attractor dries']},
  {t:'Short-line heavy nymph',k:['nymph'],why:'A heavy fly drops fast into each pocket before the current grabs it.',how:['Rod high, almost no line on the water','Tungsten bead to get down fast'],f:['Perdigon','Pat’s Rubber Legs','Copper John','Czech Nymph']}]},
 {id:'bank',n:'Undercut bank / grassy edge',w:'r',d:'Deep water tight against a grassy or hollowed-out bank.',
  spots:['Under the overhang itself','Where the current pushes into the bank','Below fallen grass and roots'],
  wade:['Fish it from the far side or from below','Soft steps: bank vibration spooks fish'],
  miss:['Casting a foot too far from the bank','Walking right along the edge you want to fish'],ap:[
  {t:'Terrestrial or hopper-dropper',k:['terr','dry'],why:'Hoppers, ants and beetles fall in from the grass all summer.',how:['Land it with a little splat tight to the grass','Let it drift right along the edge'],f:['Hopper','Ant','Beetle'],g:['Terrestrials']},
  {t:'Streamer stripped off the bank',k:['streamer'],why:'Cast tight to the bank and strip out; fish chase from under the cover.',how:['Cast to the bank, two quick strips, pause','Repeat every few feet down the bank'],g:['Sculpin','Generalists','Crayfish']}]},
 {id:'seam',n:'Seam / eddy line',w:'r',d:'The line where fast water meets slow water, often seen as foam or a crease.',
  spots:['The slow side of the seam','Foam lines, where food collects','The back of eddies, facing upstream'],
  wade:['Cast so the fly drifts right on the line','Keep line off the fast water to stop drag'],
  miss:['Drifting in the fast side, where fish do not sit','Ignoring eddies because the current goes backwards'],ap:[
  {t:'Nymph right on the seam',k:['nymph'],why:'Fish hold in the slow side and dart into the fast side for food.',how:['Indicator on the seam, flies drift with it','Mend toward the slow side'],f:['Pheasant Tail','Hare’s Ear','Zebra Midge'],g:['Mayfly nymphs','Attractor nymphs']},
  {t:'Dry fly in the foam',k:['dry','film'],why:'Hatching and spent bugs collect in foam lines.',how:['Look for noses poking up in the foam','A visible post helps you find your fly'],f:['Parachute Adams','CDC Emerger'],g:['Emergers','Mayfly adults','Caddis adults']},
  {t:'Swing across the seam',k:['streamer','wet'],why:'A fly crossing from fast to slow water draws a chase.',how:['Cast into the fast water and let it swing into the slow side'],f:['Woolly Bugger'],g:['Soft hackles & wets','Baitfish']}]},
 {id:'creek',n:'Small mountain creek',w:'r',d:'Small, fast, cold stream with plunge pools and overhanging trees.',
  spots:['Plunge pools below each little waterfall','Under overhanging branches','Behind logs and rocks'],
  wade:['Move upstream and stay out of sight','Short, accurate casts; a shorter rod helps'],
  miss:['Standing where the fish can see you','Fishing one spot too long: move often'],ap:[
  {t:'Attractor dry',k:['dry'],why:'Small-stream fish have little food and eat almost anything that floats.',how:['One good drift in each spot, then move up','Bushy, visible fly in #12–16'],f:['Royal Wulff','Humpy','Stimulator','Parachute Adams'],g:['Attractor dries']},
  {t:'Dry-dropper in plunge pools',k:['dry','nymph'],why:'A beadhead under the dry reaches fish holding deeper in pools.',how:['Short dropper, 12–18 in','Drop it into the white water and let it wash down'],f:['Elk Hair Caddis','Prince Nymph','Copper John'],g:['Attractor nymphs']}]},
 {id:'lake',n:'Lake or pond',w:'s',d:'Still water with no current to move the fly.',
  spots:['Drop-offs where shallow meets deep','Weed bed edges','Inlets, where cold water and food come in'],
  wade:['Cast along the drop-off, not straight out','A float tube reaches water shore anglers can’t'],
  miss:['Fishing too shallow in summer','Stripping too fast'],ap:[
  {t:'Leech or midge under an indicator',k:['nymph'],why:'Hang the fly just off the bottom and let the wind rock it.',how:['Measure the depth and set the fly 1 ft off the bottom','Long leader, then wait'],f:['Balanced Leech','Zebra Midge','Bloodworm'],g:['Midge larvae & pupae','Leeches']},
  {t:'Slow strip',k:['streamer'],why:'Count it down, then strip slowly along the weed edge.',how:['Count to 10–30 before stripping; change the count until you find fish','Slow, short strips with pauses'],f:['Woolly Bugger','Mohair Leech','Rabbit Strip Leech'],g:['Leeches','Generalists']},
  {t:'Dry during a hatch',k:['dry'],why:'Callibaetis and midges hatch on calm days; lead the cruising fish.',how:['Watch which way a fish is cruising','Cast ahead of it and let it find the fly'],f:['Callibaetis (pond mayfly)','Griffith’s Gnat','Ant']}]}
];

const leaves=ALLN.filter(n=>!n.k.length),byName=nm=>leaves.find(n=>n.n===nm);
const fits=(n,w,month)=>{const m=META[n.n];return m&&m[1].includes(w)&&(!month||parseM(m[0]).has(month))};
const poolOf=a=>[...new Set([...(a.f||[]).map(byName),...leaves.filter(n=>(a.g||[]).includes(n.p0.n))].filter(Boolean))];
const hookMid=n=>{const m=(n.z||'').match(/\d+/g);return m?(+m[0]+ +m[m.length-1])/2:14};

/* c: {month, time, sky, fish, depth, clarity, flow, rising}. Listed order is the base ranking; conditions move ways up or down. */
export function recommend(id,c={}){
  const W=WATER.find(x=>x.id===id);if(!W)return [];
  const want=Object.keys(SIZE).map(k=>SIZE[k][c[k]]).filter(Boolean),size=want.includes('big')?-1:want.includes('small')?1:0;
  return W.ap.map((a,i)=>{
    const why=[];let score=0;
    for(const [key] of INPUTS){const fx=FX[key][c[key]];if(!fx)continue;
      const d=a.k.reduce((s,t)=>s+(fx[t]||0),0);if(d){score+=d;why.push([d,fx._])}}
    let flies=poolOf(a).filter(n=>fits(n,W.w,c.month));
    if(size)flies=flies.map((n,j)=>[n,j]).sort((x,y)=>size*(hookMid(y[0])-hookMid(x[0]))||x[1]-y[1]).map(x=>x[0]);
    return {...a,score,base:-i,why,flies:flies.slice(0,5)};
  }).sort((a,b)=>b.score-a.score||b.base-a.base);
}
/* the kinds of water a fly is suggested for (shown in the fly's info panel) */
export const watersFor=n=>WATER.filter(W=>fits(n,W.w)&&W.ap.some(a=>poolOf(a).includes(n)));
