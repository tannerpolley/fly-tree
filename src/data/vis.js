/* Recognition cues, by-insect view and look-alike pairs. */

/* ---------------- recognise-it cues, by branch name ---------------- */
export const VIS={
 'Dry flies':['Sit ON the surface: stiff hackle or hair, upright wing or foam.','Light, sparse bodies; stiff tails prop the back end up.','Thin-wire standard-length hook; the bend hangs in the water.','Pick the dry by wing shape: post, fan, upright, tent, spent, foam.'],
 'Emergers & wets':['Half in, half out of the film: short wing/ post, trailing shuck.','Dull, drab bodies; soft (not stiff) hackle.','Often curved or sagging back end.','Soft hackles have NO wing and NO tail: just a swept-back collar.'],
 'Nymphs & larvae':['Almost always a bead and extra weight.','Segmented, tapered body + thorax + wing case + legs + tails.','Heavier or curved hook; muted natural colors.','Silhouette: slim (mayfly/midge), fat grub (caddis), chunky (stonefly), curled (scud).'],
 'Streamers':['Long, slim profile with a long-shank hook.','Marabou, rabbit, hair or flash trailing past the hook.','Head is heavy (bead, cone, eyes) or bulky (deer hair).','Fish-shaped; sizes #2–#10, bigger than anything else in the box.'],
 'Mayfly adults':['Upright or post wing; slim body; 2–3 split tails.','Spinners: wings spread flat.','Rides on tail tips and hackle.'],
 'Caddis adults':['Wing lies BACK over the body like a tent/roof.','No tail; antenna-like hackle; fatter body than a mayfly.'],
 'Stonefly adults':['Large and flat-winged; long wing past the hook.','Heavily hackled, bushy; orange/yellow/olive bodies.'],
 'Midge adults':['Tiny hook, thin body, no tail, no wing, tiny hackle.'],
 'Terrestrials':['Land bugs: foam, rubber legs, bold single-color bodies.','Ant = two blobs; beetle = shell; hopper = long wing + legs.'],
 'Attractor dries':['Bright, bushy, buoyant, no specific insect.','Many hackle turns, white wings or colored foam.'],
 'Emergers':['Short wing stub + shuck trailing behind.'],
 'Cripples':['Bent/stuck: partial wing, collar, shuck.'],
 'Soft hackles & wets':['Slim body, swept-back collar, no wing.'],
 'Mayfly nymphs':['3 tails, slim body, dark wing case, legs, usually bead.'],
 'Caddis larvae & pupae':['Fat grub or case; no tails; pupa has antennae and bubble sheath.'],
 'Stonefly nymphs':['Forked (2) tails, thick segmented body, rubber legs.'],
 'Midge larvae & pupae':['Tiny, slim, bead, tiny/no tail. White “gills” on pupa.'],
 'Crustaceans':['No wings, no tails: flat oval (sow bug) or curled crescent (scud/Czech).'],
 'Worms & eggs':['No insect parts at all: a rope or a round ball.'],
 'Attractor nymphs':['Flash: metal wire bodies, epoxy backs, white biot wings.'],
 'Generalists':['Marabou tail + fuzzy chenille + palmered hackle.'],
 'Baitfish':['Slim, flashy; wing of bucktail/rabbit trailing past the bend.'],
 'Sculpin':['Wide heavy head (cone or deer hair), mottled brown/olive, short stubby body.'],
 'Leeches':['Single marabou tail, fuzzy body, no hackle.'],
 'Articulated & big':['Jointed two-hook body; big head; long.']
};

/* ---------------- Fly Deal-style shop category names → tree nodes (cross-reference) ---------------- */
export const INSECT_VIEW=[
 ['Mayfly',[['Nymph','Pheasant Tail'],['Emerger','Sparkle Dun'],['Dun (adult)','Comparadun'],['Spinner','Rusty Spinner']]],
 ['Pale morning dun (PMD)',[['Nymph','Frenchie'],['Emerger','Sparkle Dun'],['Dun (adult)','PMD Dun'],['Spinner','Rusty Spinner']]],
 ['Blue-winged olive (BWO)',[['Nymph','Perdigon'],['Emerger','Barr Emerger'],['Dun (adult)','BWO Thorax Dun'],['Cripple','Cripple']]],
 ['Caddis',[['Larva','Green Rock Worm'],['Pupa','Caddis pupa (Sparkle Pupa)'],['Adult','Elk Hair Caddis']]],
 ['Stonefly',[['Nymph','Pat’s Rubber Legs'],['Adult','Stimulator']]],
 ['Midge',[['Larva','Bloodworm'],['Pupa','Zebra Midge'],['Adult cluster','Griffith’s Gnat']]]
];
export const LOOKALIKES=[
 ['Parachute Adams','Comparadun','Parachute: hackle wound FLAT around a white post. Comparadun: NO hackle, deer-hair fan wing.'],
 ['Elk Hair Caddis','Stimulator','Caddis: slim, wing hugging the body, no tail. Stimulator: big, bushy, tail + wing past the bend.'],
 ['Pheasant Tail','Hare’s Ear','PT: slim, banded, tidy. Hare’s Ear: shaggy, buggy, fuzzy.'],
 ['Copper John','Prince Nymph','CJ: shiny wire body + epoxy back. Prince: peacock body + white V wings.'],
 ['Zebra Midge','Bloodworm','Zebra: black + silver stripes + bead. Bloodworm: red, no bead.'],
 ['Woolly Bugger','Mohair Leech','Bugger: palmered hackle up the body. Leech: no hackle, fuzzy body.'],
 ['Scud','Sow bug','Scud: curled crescent. Sow bug: flat oval, many segments.'],
 ['Slumpbuster','Muddler Minnow','Slump: cone head + fur collar. Muddler: spun deer-hair ball head + wing.']
];

Object.assign(VIS,{'Classic streamers':['Traditional feather or bucktail wing over a silver or yellow body.','Slim, “minnow” shaped; usually no bead.'],'Crayfish':['Two claws at the head, segmented rust body, legs and a short tail fan.']});
