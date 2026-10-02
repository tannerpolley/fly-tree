/* The fly family tree: families → groups → patterns. */

/* ---------- DATA: N(name,{fields},[children]); fields: s summary, i imitates, p parts/recipe, h how to fish, w when/where, z sizes ---------- */
export const N=(n,f,k)=>({n,...f,k:k||[]});
export const TREE=N('Flies',{s:'Every fly is an imitation (or attractor) of something a fish eats. The main question is: where in the water does it ride, and what does it copy?'},[
 N('Dry flies',{s:'Float on the surface and imitate adult insects. You watch the fly; the fish rises to take it. Needs floatant and a drag-free (“dead”) drift.',h:'Cast upstream/across, let it drift at current speed, mend to prevent drag. Strike by lifting (not jerking) when the fish rises.',w:'Hatches, calm seams, evenings. Utah: PMD June–Sept, caddis May–Oct, terrestrials Jun–Oct.'},[
  N('Mayfly adults',{s:'Duns (just-hatched, upright wings) and spinners (spent adults laying eggs). Selective trout key on the wing shape and silhouette.',i:'Mayfly duns & spinners'},[
   N('Parachute Adams',{z:'#12–20',i:'Generic mayfly dun (BWO/PMD/midge cluster by size)',p:'Post (white/ calf-body wing) • hackle wound <i>horizontally</i> around post • grizzly/brown tail • gray dubbed body',h:'Sits low in the film with a visible white post. Dead-drift; a great “search” dry and indicator-for-dropper.',w:'Utah: year-round gap-filler; best Apr–Oct.'}),
   N('Comparadun',{z:'#14–22',i:'Mayfly dun (PMD, BWO) — no hackle',p:'Deer-hair fan wing • split tails • dubbed body • <b>no hackle</b> so the body sits <i>in</i> the film',h:'Best for picky fish on flat, slow water; fish after the fish refuses a hackled dry.',w:'Provo: PMD (June–mid Sept), BWO (spring/fall).'}),
   N('Catskill dry (Light Cahill)',{z:'#10–16',i:'Mayfly dun, classic style',p:'Upright divided wings • stiff tails • <i>vertical</i> hackle collar that floats it on the tail and hackle tips',h:'High-floating, visible; good in broken water and pocket water.',w:'Faster runs and pocket water on the Forks.'}),
   N('Rusty Spinner',{z:'#14–20',i:'Mayfly spinner (dead/dying adult, wings flat)',p:'Poly or hackle-fiber wings laid flat • rusty-brown dubbed body',h:'Fish at dusk on slow water; the fly lies flat in the film.',w:'Evening after PMD/ drake spinner falls.'}),
   N('Trico Spinner',{z:'#20–24',i:'Trico mayfly spinner (tiny, black)',p:'Slim black body • two very long split tails • clear/white poly spent wings',h:'Fish at the head of slow runs on summer mornings; trout sip the spent “spinner fall”. Use 6X–7X tippet.',w:'Mid-summer to fall, early morning (verify local Provo timing).'}),
   N('Paradrake',{z:'#10–12',i:'Western Green Drake dun',p:'Extended olive elk-hair body past the bend • deer-hair post • parachute hackle',h:'Fish at the start of the hatch (afternoon, overcast days); a large target for big trout.',w:'Provo: mid-June–July.'})]),
  N('Caddis adults',{s:'Moth-like adults with tent-shaped wings; skitter across the surface when egg-laying.',i:'Caddisfly (sedge) adults'},[
   N('Elk Hair Caddis',{z:'#12–16',i:'Adult caddis',p:'Palmered hackle • dubbed body • elk-hair wing laid back over body',h:'Dead-drift, or “skitter” by twitching at the end of the drift. Great evening fly.',w:'Utah: May–Oct, esp. around dusk.'}),
   N('X-Caddis',{z:'#14–18',i:'Emerging/ adult caddis',p:'Trailing shuck of Zelon • sparse hair wing • dubbed body',h:'Rides low; good when fish take emergers just in the film.',w:'Provo, caddis hatches.'})]),
  N('Stonefly adults',{s:'Large, flat-winged adults; stone- and sally-flies crawl out and flutter back to lay eggs.',i:'Stoneflies (golden, olive, yellow sally)'},[
   N('Stimulator',{z:'#6–12',i:'Golden stonefly, big caddis, hopper — all-purpose big dry',p:'Hair wing • palmered hackle • colored (orange/yellow) body',h:'High-floating dry; classic dry-dropper “top fly” in fast water.',w:'Provo May–July; freestones like the Forks in summer.'}),
   N('Yellow Sally',{z:'#12–14',i:'Little yellow stonefly',p:'Slim yellow body • flat pale wing • light hackle',h:'Fish at midday and morning; a good dry and nymph pair.',w:'Provo May 15–June 30.'})]),
  N('Midge adults',{s:'Tiny; fish often take clusters of several mating midges as one bite.',i:'Adult midges'},[
   N('Griffith’s Gnat',{z:'#18–24',i:'Cluster of midges',p:'Peacock herl body • grizzly hackle palmered • no tail/wings',h:'Dead drift on slow, flat water. Fish it behind a larger dry when possible.',w:'Utah winter and early spring; year-round on the Provo.'})]),
  N('Terrestrials',{s:'Land insects that fall in the water; fish eat them heavily in summer and fall.',i:'Hoppers, ants, beetles, crickets'},[
   N('Hopper',{z:'#6–10',i:'Grasshopper',p:'Foam or dubbed body • elk-hair wing • rubber legs',h:'Slap it near grassy banks; wind helps. Often fished as a hopper-dropper.',w:'July–Oct, windy afternoons.'}),
   N('Ant',{z:'#12–16',i:'Flying/black ant',p:'Two-segment foam or dubbed body, narrow waist',h:'Fish tight to the bank; subtle taps.',w:'Summer; good when nothing hatches.'}),
   N('Beetle',{z:'#12–16',i:'Beetle',p:'Foam or peacock body with a foam shell',h:'Plop under overhanging bushes.',w:'June–Oct.'}),
   N('Cricket',{z:'#8–12',i:'Cricket',p:'Black foam body • dark hair wing • rubber legs',h:'Fall bank fishing.',w:'Aug–Oct.'})]),
  N('Attractor dries',{s:'Imitate nothing specific; they look buggy, big and buoyant. Used to search or to carry weight.',i:'“General food”'},[
   N('Royal Wulff',{z:'#10–16',i:'Generic food; stoneflies/ mayflies',p:'White hair wings • red floss band • peacock herl • brown hackle',h:'Visible high-floater for fast water.',w:'Forks and Provo pocket water.'}),
   N('Chubby Chernobyl',{z:'#8–10',i:'Big stonefly/ hopper/ beetle',p:'Two-layer foam body • single white poly wing • rubber legs',h:'Very visible and buoyant; carries 1–2 nymph droppers.',w:'Summer, esp. the Forks.'}),
   N('Humpy',{z:'#10–16',i:'Bushy generic dry',p:'Hump of deer hair, tail and hackle',h:'Bounces through riffles without sinking.',w:'Mountain freestones.'})])
 ]),
 N('Emergers & wets',{s:'Flies in or just under the surface film, imitating insects that are hatching, stuck, or drifting. Often the secret for fish that “refuse” dries.',h:'Dead drift in the film; in slow water, grease only the wing/post so the body hangs below.',w:'Hatches, grey days; Utah: BWO & midge on the Provo.'},[
  N('Emergers',{s:'Insects struggling out of their shuck — the most vulnerable and easiest meal.',i:'Emerging mayflies, midges, caddis'},[
   N('RS2',{z:'#18–24',i:'Midge / small mayfly emerger',p:'Slim body • tiny tail • short Z-wing post (CDC/ poly)',h:'Greased tip, slim body in the film.',w:'Provo year-round (BWO/midge).'}),
   N('CDC Emerger',{z:'#14–20',i:'Mayfly emerger',p:'CDC wing • dubbed body • trailing shuck',h:'Float it in slow water; tiny, buoyant.',w:'PMD, BWO times.'}),
   N('Sparkle Dun',{z:'#14–20',i:'Mayfly dun stuck in shuck',p:'Deer-hair wing • Zelon trailing shuck • dubbed body',h:'Sits in the film like a struggling dun.',w:'PMD hatch.'})]),
  N('Cripples',{s:'Insects that failed to hatch: dead or deformed in the film. Trout love them.',i:'Stillborn/crippled mayflies'},[
   N('Cripple',{z:'#14–20',i:'Mayfly stuck half-out of the shuck',p:'Hackle or hair wing • bent or hanging body',h:'Fish it in flat water during heavy hatches.',w:'Heavy PMD/BWO hatches.'})]),
  N('Soft hackles & wets',{s:'Old-school flies with a soft, pulsing collar. Dead-drift, swing or fish in the film.',i:'Emerging caddis/ mayflies, drowned insects'},[
   N('Partridge & Orange',{z:'#12–18',i:'Emerging caddis/ mayfly',p:'Orange thread body • partridge feather collar',h:'Swing across current or dead-drift under a dry.',w:'Spring–summer.'}),
   N('Hare’s Ear Soft Hackle',{z:'#12–16',i:'Emerger/ drowned adult',p:'Dubbed hare’s ear • soft partridge collar',h:'Add as the dropper under an indicator or dry.',w:'Provo, Forks.'})])
 ]),
 N('Nymphs & larvae',{s:'Imitate the immature, underwater stage of insects (and other bottom food). Trout get most of their calories here, so nymphing is the most consistent way to catch fish.',h:'Get the fly to the fish’s depth with weight (bead/ shot). Use an indicator or tight-line; add a second nymph as a dropper.',w:'Any time; Provo nymphing works year-round.'},[
  N('Mayfly nymphs',{s:'Four body types: clingers (flat), crawlers, swimmers (slim, streamlined), burrowers.',i:'Mayfly nymphs'},[
   N('Pheasant Tail',{z:'#12–20',i:'Swimmer mayfly (BWO, PMD)',p:'Pheasant tail fibers for tail, body, and legs • copper wire rib • peacock thorax • bead optional',h:'Dead-drift near the bottom; rise it at the end of the drift as a hatching nymph.',w:'Year-round; spring–fall.'}),
   N('Hare’s Ear',{z:'#12–18',i:'Crawler/clinger mayflies; caddis; general food',p:'Hare’s-mask dubbing picked out for “legs” • gold wire rib • bead optional',h:'Heavy searching nymph.',w:'All year.'}),
   N('Perdigon',{z:'#14–18',i:'Slim mayfly/ caddis',p:'Thin tungsten bead • slim body coated in UV resin • quick sinking',h:'Gets down fast on short leaders; good as the point fly.',w:'Faster water; Provo and Forks.'})]),
  N('Caddis larvae & pupae',{s:'Larvae live in cases or free-living (green rock worm); pupae rise to the surface to hatch.',i:'Caddis stages'},[
   N('Green Rock Worm',{z:'#12–16',i:'Free-living caddis larva',p:'Bright green body • black head • tiny wire rib',h:'Drift near bottom; most in riffle water.',w:'Spring–fall.'}),
   N('Caddis pupa (Sparkle Pupa)',{z:'#14–16',i:'Caddis pupa swimming up',p:'Antron bubble sheath • dubbed body • soft legs • dark head',h:'Swing at the end of the drift or lift to the surface.',w:'Before and during caddis hatches.'}),
   N('Cased caddis',{z:'#10–14',i:'Larva in its stick/ pebble case',p:'Peacock-herl case • pale thorax • dark head',h:'Bottom-dwelling; roll along the bottom.',w:'Slower water, any time.'})]),
  N('Stonefly nymphs',{s:'Large, rubber-legged nymphs; high-calorie meals. Often used as a weight at the top of a dropper rig.',i:'Golden, olive & salmon-fly nymphs'},[
   N('Pat’s Rubber Legs',{z:'#6–10',i:'Stonefly nymph',p:'Chenille body • rubber legs • bead or lead',h:'Top fly (heavy) on a two-fly rig, tight-lined along the bottom.',w:'Provo May–July; runoff.'}),
   N('Kaufmann’s Stone',{z:'#6–10',i:'Golden stonefly',p:'Dubbed body • mottled turkey wing cases • picked-out legs',h:'Same style; slimmer profile than rubber legs.',w:'Runoff, spring.'})]),
  N('Midge larvae & pupae',{s:'Tiny; critical on tailwaters in winter.',i:'Midge larvae/ pupae'},[
   N('Zebra Midge',{z:'#18–22',i:'Midge pupa/ larva',p:'Black thread body with silver wire • bead • sparse hackle/ thorax',h:'Tail fly under a bigger nymph; fish deep in runs.',w:'Provo, all year.'}),
   N('Bloodworm',{z:'#12–16',i:'Midge larva (bloodworm)',p:'Red thread or Ultra Wire body; slim',h:'Under an indicator in still water; small, slim.',w:'Ponds; slow water.'}),
   N('Disco Midge',{z:'#18–22',i:'Midge pupa w/ gas bubbles',p:'Flashabou body • glass bead • peacock collar',h:'Fish on a tight line; shiny attractor midge.',w:'Winter, clear water.'})]),
  N('Crustaceans',{s:'Sow bugs (flat) and scuds (curved) live in weed beds; not insects but trout love them.',i:'Sow bugs and scuds'},[
   N('Sow bug',{z:'#14–18',i:'Aquatic sowbug (Provo staple)',p:'Gray/tan dubbing • shell-back (scud back) • rib',h:'Dead drift on the bottom; good after high flows.',w:'Provo year-round.'}),
   N('Czech Nymph',{z:'#10–14',i:'Scud / caddis larva, in a heavy, fast-sinking style',p:'Curved hook • heavy tungsten bead • lead wraps • shellback • olive/ tan dubbing',h:'Tight-line (Euro) nymphing in fast, deep runs: the heavy fly gets down immediately.',w:'High, cold, fast water; Provo runs and Forks.'}),
   N('Scud',{z:'#12–18',i:'Freshwater shrimp',p:'Curved hook • tan/pink/olive dubbing • shell back',h:'Fish slow in ponds; drift near weeds on rivers.',w:'Ponds and spring creeks, all year.'})]),
  N('Worms & eggs',{s:'Simple food-based flies: worms wash in with rain; eggs matter in spawning season or after stocking.',i:'Worms, trout/ whitefish/ hatchery pellets'},[
   N('San Juan Worm',{z:'#10–14',i:'Aquatic worm',p:'Single strand of chenille or vinyl-rib, red/pink/tan',h:'Fish after rain or runoff, dead drift.',w:'High, stained water.'}),
   N('Egg / Mop / pellet',{z:'#10–16',i:'Eggs; hatchery pellets',p:'Round yarn/ glass bead; often colored peach/ orange/ tan',h:'Drop a fly right after stocking or during spawning periods; one egg + a nymph rig.',w:'Bartholomew Pond after stocking; Fall browns.'})]),
  N('Attractor nymphs',{s:'Flashy generalists that “look like food” without matching one species.',i:'Mixed insects'},[
   N('Copper John',{z:'#12–18',i:'Generic stonefly/ mayfly',p:'Copper wire body • epoxy back • gold bead • flash legs',h:'Quick-sinking first fly.',w:'Any time; strong in off-colored water.'}),
   N('Prince Nymph',{z:'#12–16',i:'Stonefly/ caddis/ drowned insects',p:'Peacock body • white biot “wings” • brown hackle',h:'Classic searching nymph.',w:'Any time; fast water.'}),
   N('Flashback Pheasant Tail',{z:'#14–18',i:'Mayfly nymph w/ sparkle',p:'PT fibers • flashy wing case',h:'Attractor take on a mayfly nymph.',w:'Spring–fall.'})])
 ]),
 N('Streamers',{s:'Larger flies that imitate baitfish, sculpins, leeches and crayfish. They trigger predatory strikes and often catch the biggest fish.',h:'Cast across, strip or swing; vary the speed and add pauses. Sink-tip lines help get them deeper.',w:'Low light, high water; browns in fall.'},[
  N('Generalists',{s:'One fly that looks like a leech, baitfish or crayfish depending on how you fish it.',i:'Mixed food'},[
   N('Woolly Bugger',{z:'#6–10',i:'Leech, baitfish, crayfish',p:'Marabou tail • chenille body • palmered hackle • bead/ cone optional',h:'Strip, swing or dead-drift; the easiest all-round streamer.',w:'River and pond, year-round.'})]),
  N('Baitfish',{s:'Slim minnow imitations with a flashy profile.',i:'Minnows/ small trout'},[
   N('Zonker',{z:'#4–8',i:'Baitfish',p:'Rabbit strip tied at head and rear • Mylar-tube body • soft collar',h:'Swing or strip; the rabbit strip pulses.',w:'Fall brown trout, early spring.'}),
   N('Clouser Minnow',{z:'#2–8',i:'Baitfish',p:'Dumbbell eyes at head (flips hook point up) • bucktail + flash wing',h:'Jigs up and down along drop-offs and deep runs.',w:'Ponds and deeper runs, May–Oct.'})]),
  N('Sculpin',{s:'Bottom-dwelling fish with a wide head; a major brown-trout food.',i:'Sculpins'},[
   N('Slumpbuster',{z:'#4–8',i:'Sculpin/ small fish',p:'Cone head • sparkle-braid body • pine-squirrel strip tail and collar',h:'Short strips along bottom; keep the fly moving but low.',w:'Provo, Forks; fall and spring.'}),
   N('Muddler Minnow',{z:'#4–10',i:'Sculpin, grasshopper',p:'Deer-hair head • turkey wing • tinsel body',h:'Swing or dead-drift; floats at first then dives.',w:'Rivers, evening.'})]),
  N('Leeches',{s:'Slim, undulating leech imitations favored by stillwater trout.',i:'Leeches'},[
   N('Mohair Leech',{z:'#6–10',i:'Leech',p:'Marabou tail • mohair body • bead',h:'Slow strip or hang below an indicator.',w:'Ponds, any month.'}),
   N('Balanced Leech',{z:'#8–12',i:'Leech',p:'Jig hook • bead on a pin sticking forward, so the fly hangs level under an indicator',h:'Dead-hang under an indicator in still water.',w:'Ponds.'})]),
  N('Articulated & big',{s:'Multi-hook “meat” flies that stand out in dirty water or for large trout.',i:'Big baitfish/ small trout'},[
   N('Sex Dungeon / Dungeon',{z:'#2–6',i:'Large baitfish',p:'Two-hook articulated body • marabou tail • schlappen • rubber legs • deer-hair head',h:'Heavy tippet (0X–2X), strip aggressively.',w:'Fall browns and runoff.'})])
 ])
]);

(function addMore(){
  const f=(n,name)=>n.n===name?n:n.k.map(c=>f(c,name)).find(Boolean);
  const put=(p,...x)=>f(TREE,p).k.push(...x);
  put('Mayfly adults',
    N('BWO Thorax Dun',{z:'#18–22',i:'Blue-winged olive dun',h:'Fish gray-weather hatches on flat water with 6X; match the size closely.'}),
    N('PMD Dun',{z:'#14–18',i:'Pale morning dun',h:'Fish the hatch mid-morning on riffles and runs; match the cream-yellow colour.'}),
    N('Western March Brown',{z:'#12–14',i:'Western March Brown mayfly',h:'Early-season hatch; fish in the afternoon in riffles.'}),
    N('Callibaetis (pond mayfly)',{z:'#12–16',i:'Still-water speckled-wing mayfly',h:'Cast to cruising or rising fish near weeds and let it sit.'}));
  put('Caddis adults',N('Goddard Caddis',{z:'#10–14',i:'Large adult caddis',h:'Skate or twitch across the surface in the evening; floats high.'}));
  put('Stonefly adults',N('Sofa Pillow',{z:'#6–10',i:'Golden stonefly adult',h:'Cast tight to the bank in fast water; floats high and carries a dropper.'}));
  put('Midge adults',N('Palomino Midge',{z:'#18–22',i:'Midge adult / cripple',h:'Dead-drift on flat water; the white post helps you see it.'}));
  put('Terrestrials',
    N('Madam X',{z:'#6–10',i:'Grasshopper / big stonefly',h:'Slap near grassy banks; great as the top fly with a nymph dropper.'}),
    N('Foam Inchworm',{z:'#12–16',i:'Green inchworm falling from trees',h:'Plop under overhanging trees and let it sit.'}));
  put('Attractor dries',
    N('Renegade',{z:'#10–14',i:'Generic bug / drowned insect',h:'High-floating search fly; also fished semi-sunk.'}),
    N('Coachman Trude',{z:'#10–14',i:'Generic caddis/ mayfly attractor',h:'Fish in riffles; the white wing makes it easy to see.'}));
  put('Emergers',
    N('Barr Emerger',{z:'#16–20',i:'BWO emerger',h:'Fish just under the surface during BWO hatches; use a long fine tippet.'}),
    N('Mother Shucker',{z:'#18–22',i:'Midge emerger',h:'Dead-drift in the film; fish it on Provo midge hatches.'}));
  put('Soft hackles & wets',
    N('Pheasant Tail Soft Hackle',{z:'#14–18',i:'Emerging mayfly',h:'Swing or dead-drift as a dropper.'}),
    N('Royal Coachman Wet',{z:'#10–14',i:'Classic wet fly (attractor)',h:'Swing across current and let it hang at the end.'}));
  put('Mayfly nymphs',
    N('Frenchie',{z:'#14–18',i:'Mayfly nymph (tungsten jig style)',h:'Tight-line or indicator; the pink bead is the trigger.'}),
    N('Rainbow Warrior',{z:'#16–20',i:'Mayfly/ midge nymph',h:'Second nymph on a dropper; a Provo favourite.'}));
  put('Caddis larvae & pupae',N('Peeking Caddis',{z:'#12–16',i:'Case-building caddis larva',h:'Dead-drift near the bottom in riffles.'}));
  put('Midge larvae & pupae',
    N('Brassie',{z:'#16–20',i:'Midge larva',h:'Small, deep dead-drift; a classic Utah pattern.'}),
    N('Black Beauty',{z:'#18–22',i:'Midge pupa',h:'Trailing fly under a bigger nymph; fish deep runs.'}));
  put('Worms & eggs',N('Squirmy Worm',{z:'#8–12',i:'Aquatic worm',h:'Dead-drift after rain or high water.'}));
  put('Attractor nymphs',N('Zug Bug',{z:'#10–14',i:'Generic caddis/ mayfly',h:'Classic searching nymph in riffles.'}));
  put('Sculpin',N('Sculpzilla',{z:'#4–8',i:'Sculpin',h:'Strip along the bottom or swing through runs.'}));
  put('Leeches',N('Rabbit Strip Leech',{z:'#4–8',i:'Leech / baitfish',h:'Slow strip with pauses or swing; the tail does the work.'}));
  put('Articulated & big',N('Circus Peanut',{z:'#2–4',i:'Large baitfish / crayfish',h:'Heavy tippet; strip with long pauses; good in dirty water.'}));
  put('Streamers',
    N('Classic streamers',{s:'Traditional feather- and bucktail-wing flies; still great for trout.',i:'Smelt, shiners, sculpins'},[
      N('Matuka',{z:'#4–8',i:'Baitfish / sculpin',h:'Swing or strip; the tied-down wing keeps its shape.'}),
      N('Mickey Finn',{z:'#4–10',i:'Baitfish',h:'Swing across current and strip in runs.'}),
      N('Grey Ghost',{z:'#4–8',i:'Smelt',h:'Strip or swing in cold water; good in ponds too.'})]),
    N('Crayfish',{s:'Crayfish imitations: a big meal for large trout.',i:'Crayfish'},[
      N('Crayfish pattern',{z:'#4–8',i:'Crayfish',h:'Hop it along the bottom with short strips.'})]));
})();

/* ---------- assign ids, parents, family colors ---------- */
export const FC=['#2c3e50','#d9a21c','#8e6bbf','#3c8d5a','#b8443a','#2a8a6a','#6b7a85'];
export let id=0;
(function f(n,p,d,c){n.id=id++;n.p0=p;n.d=d;n.c=c;n.k.forEach((k,i)=>f(k,n,d+1,d===0?FC[i+1]:c))})(TREE,null,0,FC[0]);
export const ALLN=[];(function g(n){ALLN.push(n);n.k.forEach(g)})(TREE);

export const GEN={
 'Classic streamers':{h:'Swing across current or strip with pauses; fish low light and cloudy days.'},
 'Crayfish':{h:'Hop along the bottom with short strips; best in rocky runs and ponds.'},
 'Flies':{h:'Start with what the fish are eating and where: surface, film, mid-water, bottom, or chasing baitfish.'},
 'Dry flies':{p:'Stiff tail fibers • slim body • wing (post, fan, upright, hair tent or foam) • stiff rooster hackle • thin-wire hook'},
 'Emergers & wets':{p:'Short wing or post • trailing shuck • soft (not stiff) collar • dull body that hangs in the film'},
 'Nymphs & larvae':{p:'Bead head • tails • segmented tapered body with rib • thorax • wing case • legs • lead/ tungsten weight'},
 'Streamers':{p:'Long-shank hook • tail (marabou/ rabbit/ hackle) • chenille or tinsel body • wing/ flash • weighted head (bead, cone, eyes)'},
 'Mayfly adults':{p:'2–3 split tails • slim segmented body • upright, post, fan or spent wings • hackle for float',h:'Match the stage: duns during the hatch, spinners at dusk. Dead-drift upstream on 5X–6X; wait for the take.',w:'Provo: PMD Jun–Sep, BWO spring & fall, Green Drake Jun–Jul, Tricos summer mornings.'},
 'Caddis adults':{p:'Wing swept back over body like a roof • no tails • palmered hackle • antennae-like fibers',h:'Dead-drift, or skate/ twitch a bit at the end of the drift. Fish water near the bank at dusk.',w:'Provo/Forks: May–Oct, best late afternoon–dusk.'},
 'Stonefly adults':{p:'Long flat wings • bulky body • palmered hackle • elk/ deer hair; orange/ yellow/ olive',h:'Cast tight to the bank and into fast broken water; let it float high and bounce through the riffle.',w:'Provo May–July; freestones in summer.'},
 'Midge adults':{p:'Tiny hook • thin body • no tail or wing • tiny hackle',h:'Dead-drift on flat water on 6X; use clusters and fish a bigger dry above to see it.',w:'Year-round; winter and early spring on the Provo.'},
 'Terrestrials':{p:'Foam or dubbed bulky body • rubber/ fiber legs • dark or bold colour',h:'Slap or plop them near the bank; wind and overhanging grass are your friends.',w:'Late June–October, windy afternoons.'},
 'Attractor dries':{p:'Bushy hackle • bright wings or foam • high-floating',h:'Search fast water; use as a dry that carries a nymph dropper.',w:'Summer on the Forks and Provo pocket water.'},
 'Emergers':{p:'Short wing post • trailing shuck • slim body',h:'Present in the film with a greased tip; use a longer, finer leader on flat water.',w:'During BWO, midge and PMD hatches, esp. gray days.'},
 'Cripples':{p:'Bent body • partial wing • collar • stuck shuck',h:'Fish on flat water in heavy hatches when trout refuse perfect duns.',w:'Heavy PMD/ BWO hatches.'},
 'Soft hackles & wets':{p:'Slim body • no wing/ no tail • swept-back soft collar',h:'Dead-drift, swing across current, or lift at the end of the drift.',w:'Spring–fall, caddis and mayfly hatches.'},
 'Mayfly nymphs':{p:'3 tails • slim body • thorax • dark wing case • legs • bead',h:'Dead-drift near the bottom, lift at the end for the “emerging” look. Use indicator or tight line.',w:'Year-round; peaks before hatches.'},
 'Caddis larvae & pupae':{p:'Fat grub body • black head • no tail (larva) • bubble sheath and antennae (pupa)',h:'Larvae along the bottom; pupae swung or lifted at the end of the drift.',w:'Spring–fall; pupae right before hatches.'},
 'Stonefly nymphs':{p:'Forked tails • thick segmented body • rubber legs • wing case • heavy',h:'Heavy point fly: tight-line or indicator in runs, deep and slow.',w:'Provo May–July, runoff periods.'},
 'Midge larvae & pupae':{p:'Tiny slim body • bead • rib • tiny/ no tail • optional white “gills”',h:'Small, deep, dead-drift; use as a trailing fly under a bigger nymph.',w:'Year-round, critical in winter.'},
 'Crustaceans':{p:'No wings or tails • flat oval (sow bug) or curled crescent (scud) • shell back',h:'Dead-drift on the bottom, esp. over weed beds.',w:'Provo year-round; ponds and spring creeks.'},
 'Worms & eggs':{p:'A rope (worm) or a round bead/ yarn ball (egg)',h:'Dead-drift after rain or high water (worms), and during spawn or after stocking (eggs).',w:'Runoff, rain, fall, Bartholomew after stocking.'},
 'Attractor nymphs':{p:'Flashy wire or epoxy • bead • flash legs or white wings',h:'Fast-sinking first fly; great in off-color water.',w:'Any time; strongest when water is high or stained.'},
 'Generalists':{p:'Marabou tail • chenille body • palmered hackle • bead',h:'Strip, swing or dead-drift; vary speed until the fish tell you.',w:'Rivers and ponds, all year; best in low light.'},
 'Baitfish':{p:'Slim flashy body • bucktail/ rabbit wing • weighted eyes or cone',h:'Strip with pauses; jig it along drop-offs; swing across current.',w:'Fall, early spring, low light.'},
 'Sculpin':{p:'Wide heavy head • short stubby mottled body • fur collar',h:'Short strips along the bottom; or dead-drift as a heavy fly.',w:'Provo and Forks, spring & fall.'},
 'Leeches':{p:'One long marabou/ mohair tail • fuzzy body • no hackle • bead or eyes',h:'Slow strips and long pauses; or hang under an indicator in still water.',w:'Ponds any month; rivers in cold water.'},
 'Articulated & big':{p:'Two hooks joined by wire or mono • big head • long tail',h:'Heavy tippet; strip aggressively; fish dirty or high water.',w:'Fall browns, runoff.'}
};
ALLN.forEach(n=>{const g=GEN[n.n];if(g)for(const k in g)if(!n[k])n[k]=g[k]});

/* File-safe id for a pattern name, used for its photo files (e.g. "Hare’s Ear" → "hares-ear"). */
export const slugOf=s=>s.toLowerCase().replace(/’/g,'').replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
