/* How each fly is normally rigged. */

/* ---------- how each fly is normally rigged. ★ marks where this fly goes. ---------- */
export const RIGG={
 'Dry flies':{t:'Dry fly on a long, fine leader',c:['Floating line','9–12′ leader to 5X–6X','★'],n:'Dead-drift upstream; add a small nymph dropper when fish aren’t rising.'},
 'Mayfly adults':{t:'Single dry fly',c:['Floating line','9–12′ leader','18–24″ of 5X–6X tippet','★']},
 'Caddis adults':{t:'Single dry, or dry-dropper',c:['Floating line','9′ leader to 4X–5X','★','optional: 24″ 5X → caddis pupa']},
 'Stonefly adults':{t:'Top fly of a dry-dropper',c:['Floating line','9′ leader to 3X–4X','★','24–30″ of 4X–5X','nymph (dropper)']},
 'Midge adults':{t:'Single dry on very fine tippet',c:['Floating line','12′ leader','6X–7X tippet','★']},
 'Terrestrials':{t:'Single dry, or hopper-dropper',c:['Floating line','9′ leader to 3X–4X','★','optional: 24″ 5X → nymph']},
 'Attractor dries':{t:'Top fly of a dry-dropper',c:['Floating line','9′ leader to 3X–4X','★','24–30″ of 4X–5X','nymph (dropper)']},
 'Emergers':{t:'In the film: alone or 14–18″ behind a dry',c:['Floating line','9–12′ leader to 6X','★ (greased tip)']},
 'Cripples':{t:'In the film, alone on fine tippet',c:['Floating line','12′ leader to 6X','★']},
 'Soft hackles & wets':{t:'Dropper under a dry, or swung',c:['Floating line','9′ leader to 4X–5X','dry fly or indicator','14–18″ of 5X','★ (dropper)']},
 'Mayfly nymphs':{t:'Indicator or tight-line nymph rig',c:['Floating line','9′ 4X leader','indicator','split shot','★ (point or dropper) on 5X–6X']},
 'Caddis larvae & pupae':{t:'Indicator nymph rig',c:['Floating line','9′ 4X leader','indicator','split shot','★ (point or dropper)']},
 'Stonefly nymphs':{t:'Heavy top fly of a two-nymph rig',c:['Floating line','9′ 3X–4X leader','indicator','★ (top fly)','18″ of 5X','small nymph (dropper)']},
 'Midge larvae & pupae':{t:'Small trailing fly',c:['Floating line','9′ 4X leader','indicator','larger nymph (top)','14–18″ of 5X–6X','★ (trailing)']},
 'Crustaceans':{t:'Indicator or tight-line nymph rig',c:['Floating line','9′ 4X leader','indicator','split shot','★']},
 'Worms & eggs':{t:'Top fly above a small nymph',c:['Floating line','9′ 4X leader','indicator','★ (top)','14–18″ of 5X','nymph (dropper)']},
 'Attractor nymphs':{t:'Lead fly of a two-nymph rig',c:['Floating line','9′ 4X leader','indicator','★ (lead, heavier)','18″ of 5X','small nymph']},
 'Streamers':{t:'Streamer rig',c:['9′ 5–6wt rod','Floating line (sink-tip if deep)','3–5′ leader to 0X–2X','★'],n:'Strip with pauses or swing across current.'},
 'Generalists':{t:'Streamer rig',c:['9′ 5–6wt rod','Floating line (sink-tip if deep)','4′ leader to 1X–2X','★']},
 'Baitfish':{t:'Streamer rig',c:['9′ 5–6wt rod','Floating or sink-tip line','4–5′ leader to 1X–2X','★']},
 'Sculpin':{t:'Sink-tip streamer rig',c:['9′ 6wt rod','Sink-tip line','3–4′ leader to 0X–2X','★']},
 'Leeches':{t:'Strip rig, or under an indicator in ponds',c:['9′ 5wt rod','Floating line','9–10′ leader to 3X–4X','★']},
 'Articulated & big':{t:'Heavy sink-tip streamer rig',c:['9′ 6–7wt rod','Sink-tip line','3′ leader to 0X–1X','★']},
 'Classic streamers':{t:'Swing or strip rig',c:['9′ 5wt rod','Floating line','7–9′ leader to 2X–3X','★']},
 'Crayfish':{t:'Bottom-hop rig',c:['9′ 6wt rod','Sink-tip line','3–4′ leader to 2X','★']}
};
export const RIGO={
 'Egg / Mop / pellet':{t:'Above a nymph, or alone in a pond',c:['Floating line','9′ 4X leader','indicator','★ (egg)','14″ of 5X','nymph (dropper)']},
 'Balanced Leech':{t:'Hung under an indicator in ponds',c:['9′ 5wt rod','Floating line','10–12′ 4X leader','indicator','★ (hangs level)']},
 'Czech Nymph':{t:'Tight-line (Euro) nymph rig',c:['10–11′ 3wt rod','sighter','4X–5X tippet','★ (heavy point fly)']},
 'Perdigon':{t:'Point fly of a tight-line rig',c:['10–11′ 3wt rod','sighter','5X tippet','★ (point)','optional: second nymph above']},
 'Pat’s Rubber Legs':{t:'Heavy top fly of a two-nymph rig',c:['Floating line','9′ 3X–4X leader','indicator','★ (top fly, heavy)','18″ of 5X','small nymph']},
 'Woolly Bugger':{t:'Strip rig (rivers) or slow strip (ponds)',c:['9′ 5–6wt rod','Floating line (sink-tip if deep)','4–6′ leader to 1X–3X','★']},
 'Griffith’s Gnat':{t:'Dry on very fine tippet, or behind a bigger dry',c:['Floating line','12′ leader','6X–7X tippet','★']},
 'Chubby Chernobyl':{t:'Top fly of a dry-dropper',c:['Floating line','9′ 3X leader','★','24–30″ of 4X','beadhead nymph (dropper)']},
 'Hopper':{t:'Hopper-dropper',c:['Floating line','9′ 3X leader','★','24–30″ of 4X','nymph (dropper)']},
 'Madam X':{t:'Hopper-dropper',c:['Floating line','9′ 3X leader','★','24–30″ of 4X','nymph (dropper)']}
};
export const rigFor=n=>RIGO[n.n]||RIGG[n.p0&&n.p0.n]||RIGG[n.n]||RIGG[n.p0&&n.p0.p0&&n.p0.p0.n]||null;
/* ---------------- rig diagrams: kind + which flies are on the line ('this' = the selected fly) ---------------- */
export const RIGK={
 'Dry flies':{k:'dry',f:['this']},'Mayfly adults':{k:'dry',f:['this']},'Caddis adults':{k:'dry',f:['this']},'Midge adults':{k:'dry',f:['this']},
 'Griffith’s Gnat':{k:'dry',f:['this']},
 'Stonefly adults':{k:'drydrop',f:['this','nymph']},'Terrestrials':{k:'drydrop',f:['this','nymph']},'Attractor dries':{k:'drydrop',f:['this','nymph']},
 'Chubby Chernobyl':{k:'drydrop',f:['this','nymph']},'Hopper':{k:'drydrop',f:['this','nymph']},'Madam X':{k:'drydrop',f:['this','nymph']},
 'Emergers':{k:'film',f:['this']},'Cripples':{k:'film',f:['this']},
 'Soft hackles & wets':{k:'drydrop',f:['dry fly','this']},
 'Mayfly nymphs':{k:'indicator',f:['this']},'Caddis larvae & pupae':{k:'indicator',f:['this']},'Crustaceans':{k:'indicator',f:['this']},
 'Stonefly nymphs':{k:'indicator',f:['this','small nymph']},'Pat’s Rubber Legs':{k:'indicator',f:['this','small nymph']},
 'Midge larvae & pupae':{k:'indicator',f:['larger nymph','this']},
 'Worms & eggs':{k:'indicator',f:['this','nymph']},'Egg / Mop / pellet':{k:'indicator',f:['this','nymph']},
 'Attractor nymphs':{k:'indicator',f:['this','small nymph']},
 'Czech Nymph':{k:'tight',f:['this']},'Perdigon':{k:'tight',f:['this']},
 'Streamers':{k:'streamer',f:['this']},'Generalists':{k:'streamer',f:['this']},'Woolly Bugger':{k:'streamer',f:['this']},'Baitfish':{k:'streamer',f:['this']},
 'Leeches':{k:'streamer',f:['this']},'Classic streamers':{k:'streamer',f:['this']},
 'Sculpin':{k:'streamer',sink:true,f:['this']},'Articulated & big':{k:'streamer',sink:true,f:['this']},'Crayfish':{k:'streamer',sink:true,f:['this']},
 'Balanced Leech':{k:'pond',f:['this']}
};
export const rigKFor=n=>RIGK[n.n]||RIGK[n.p0&&n.p0.n]||RIGK[n.p0&&n.p0.p0&&n.p0.p0.n]||null;
export const GENERIC={'dry fly':'Parachute Adams','nymph':'Pheasant Tail','small nymph':'Zebra Midge','larger nymph':'Hare’s Ear'};
export const firstLeaf=n=>n.k.length?firstLeaf(n.k[0]):n;
