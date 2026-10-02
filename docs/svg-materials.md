# SVG fly materials and recipe references

The renderer draws all 80 patterns from resolved material specifications in `src/data/art.js`. Fine tapered fibres, curled dubbing, branched marabou, mottled feather slips, clipped deer hair, braided tinsel and curved wire bodies replace the former straight strokes and smooth tubes. The result remains an illustration: the photographs retain more convincing density, depth and reflections.

## Rendering contract

`fly(spec, opts)` returns SVG at detail levels 0, 1 and 2. Studio views retain the 332:186 aspect ratio; water and plain views frame the whole fly. Transparent rig images retain `40 -20 360 220`, the hook-eye centre at (62,100), and a horizontal eye-to-tail envelope of about 238 units. Tall flies use a compressed vertical projection in the rig view. The rig's dropper attachment uses the same projection and an actual point on the hook bend.

`src/engine/document.js` owns standalone SVG output, with a compatibility re-export in `src/ui/images.js`. Existing colour keys b, t, w, w2, h, th, l, hd, bd and cn remain in the specifications. Body `mat` selects thread, pheasant fibre, chenille, variegated chenille, clipped deer hair, wire, vinyl or braid; `fuzz` and `herl` mark dubbing and peacock material. Optional `extend`, tail `limit`, `post2`, `balance` and wing-case `layers` express the published recipes without separate rendering templates.

## Reference proportions

Measurements from the supplied real Adams image are approximate manual estimates: the eye-to-tail-root span is about 200–215 pixels, the main tail bundle about 145–165 pixels, the dense white post about 130–155 pixels, and the hackle cloud about 330–420 pixels depending on which faint tips are counted. The supplied AI Adams has a shorter post relative to its shank. The drawings use those proportions as visual references, with a fixed side-view hook and modest projection of material extending towards the camera. They are not a pixel reconstruction of either photograph.

The hand-tuned common patterns are Parachute Adams, Elk Hair Caddis, Pheasant Tail, Hare’s Ear, Zebra Midge, Woolly Bugger, Copper John, Prince Nymph, Stimulator, Comparadun, Griffith’s Gnat, RS2, Sparkle Dun, Pat’s Rubber Legs, Scud, San Juan Worm, Egg, Clouser Minnow, Muddler Minnow and Zonker. The remaining specifications also use the new materials; source checks corrected several identities, including Goddard Caddis, Barr Emerger, Palomino Midge, Mother Shucker and Balanced Leech.

## Recipe sources

These are representative published dressings. Names such as Hopper, Cricket, PMD Dun, Cripple and Crayfish pattern cover many valid recipes. Beads, weights and colours also vary. The combined Egg / Mop / pellet entry depicts a yarn egg; it does not depict three separate patterns.

| Pattern | Published recipe or representative dressing |
| --- | --- |
| Parachute Adams | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/715-parachute_adams_with_a_twist) |
| Comparadun | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/1238-sulfur_comparadun) |
| Catskill dry (Light Cahill) | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/722-light_cahill) |
| Rusty Spinner | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/713-poly_wing_rusty_spinner) |
| Trico Spinner | [Source](https://www.flyfisherman.com/editorial/fly-tying-the-trico-spinner/151921) |
| Paradrake | [Source](https://www.flyfishersinternational.org/Portals/0/FlyoftheMonth/PreviousIssues/1999-05%20May%20-%20Paradrakes.pdf) |
| BWO Thorax Dun | [Source](https://flyfishingthesierra.com/thorax-dun/) |
| PMD Dun | [Source](https://www.flyanglersonline.com/t/pale-morning-duns/2009) |
| Western March Brown | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/721-march_brown_dry) |
| Callibaetis (pond mayfly) | [Source](https://www.johnkreft.com/lake-flies/callibaetis-hatchmaster/) |
| Elk Hair Caddis | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/735-elk_hair_caddis) |
| X-Caddis | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/716-olive_x_caddis) |
| Goddard Caddis | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/731-goddard_caddis) |
| Stimulator | [Source](https://westernfishermanspress.com/Stimulator.html) |
| Yellow Sally | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/703-yellow-sally-stimulator) |
| Sofa Pillow | [Source](https://www.flyfishersinternational.org/Portals/0/FlyoftheMonth/PreviousIssues/2000-02%20February%20-%20Sofa%20Pillow.pdf) |
| Griffith’s Gnat | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/730-griffith_s_gnat) |
| Palomino Midge | [Source](https://www.tu.org/magazine/fishing/fly-tying-the-palomino-midge/) |
| Hopper | [Source](https://www.flyfisherman.com/editorial/dave-whitlocks-hopper-time/453864) |
| Ant | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/837-fur_ant) |
| Beetle | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/733-foam_beetle) |
| Cricket | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/732-foam_cricket) |
| Madam X | [Source](https://flyfishingthesierra.com/madam-x/) |
| Foam Inchworm | [Source](https://www.piscator.co.za/CPS2/wp-content/uploads/2020/08/Marios-Inchworms-Mario-Geldenhuys.pdf) |
| Royal Wulff | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/711-royal_wulff) |
| Chubby Chernobyl | [Source](https://www.flytyer.com/chubby-chernobyl-2/) |
| Humpy | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/704-yellow_humpy) |
| Renegade | [Source](https://news.orvis.com/fly-fishing/3-classic-fly-patterns-worth-revisiting-this-fall) |
| Coachman Trude | [Source](https://www.rockyrivertu.org/trude.html) |
| RS2 | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/710-rs2_fly) |
| CDC Emerger | [Source](https://calflyfisher.com/tips-and-techniques/cdc-emerger/) |
| Sparkle Dun | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/dry-flies/729-hendrickson_sparkle_dun) |
| Barr Emerger | [Source](https://charliesflybox.com/blogs/step-by-step-tutorials/barr-emerger) |
| Mother Shucker | [Source](https://www.flyfishfood.com/blogs/dry-fly-tutorials/mother-shucker) |
| Cripple | [Source](https://www.west-fly-fishing.com/index_php/fly-patterns/fly-patterns/dry-flies/256-quigley-cripple) |
| Partridge & Orange | [Source](https://www.troutflies.co.uk/blog/useful-tying-patterns/partridge-and-orange/) |
| Hare’s Ear Soft Hackle | [Source](https://www.tcoflyfishing.com/blogs/connect/jims-fly-tying-blog-hare-s-ear-soft-hackle) |
| Pheasant Tail Soft Hackle | [Source](https://www.mtfa-springfield.org/resources/fly-tying-recipes-patterns/soft-hackle-wet-fly/pheasant-tail-soft-hackle/) |
| Royal Coachman Wet | [Source](https://thefeatherbender.com/royal-coachman-wet-fly/) |
| Pheasant Tail | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/nymph-flies/692-american_pheasant_tail_nymph) |
| Hare’s Ear | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/nymph-flies/675-gold_ribbed_hare_s_ear_nymph) |
| Perdigon | [Source](https://www.flyfishfood.com/blogs/euro-nymph-tutorials/egan-s-rainbow-warrior-perdigon) |
| Frenchie | [Source](https://www.flyfishfood.com/blogs/nymph-tutorials/egans-frenchie) |
| Rainbow Warrior | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/nymph-flies/664-rainbow_warrior) |
| Green Rock Worm | [Source](https://www.flyfishingtraditions.com/wp-content/uploads/2015/11/Final-Jacklins-Green-Rock-Worm.pdf) |
| Caddis pupa (Sparkle Pupa) | [Source](https://www.flytyer.com/tim-flagler-live-4-23-a-tale-of-two-flies/) |
| Cased caddis | [Source](https://thefeatherbender.com/cased-caddis-larva/) |
| Peeking Caddis | [Source](https://thefeatherbender.com/tying-the-peeping-caddis/) |
| Pat’s Rubber Legs | [Source](https://news.orvis.com/fly-fishing/video-tie-pats-rubberlegs) |
| Kaufmann’s Stone | [Source](https://www.west-fly-fishing.com/index_php/fly-patterns/wet-flies/401-kaufmanns-stonefly) |
| Zebra Midge | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/nymph-flies/659-zebra_midge) |
| Bloodworm | [Source](https://intoflyfishing.com/how-to-tie-a-bloodworm-larva/) |
| Disco Midge | [Source](https://blog.avidmax.com/2018/01/02/how-to-tie-a-disco-midge-fly-video/) |
| Brassie | [Source](https://www.youtube.com/watch?v=1N_2vfVvRbQ) |
| Black Beauty | [Source](https://charliesflybox.com/blogs/step-by-step-tutorials/black-beauty) |
| Sow bug | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/nymph-flies/809-the-ray-charles-sow-bug) |
| Czech Nymph | [Source](https://charliesflybox.com/blogs/step-by-step-tutorials/czech-nymph) |
| Scud | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/nymph-flies/662-simple-scud) |
| San Juan Worm | [Source](https://charliesflybox.com/blogs/fly-tying-videos/san-juan-worm-fly-tying-video) |
| Egg / Mop / pellet | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/salmon-steelhead-flies/655-glo_bug) |
| Squirmy Worm | [Source](https://news.orvis.com/fly-fishing/video-tie-squirmy-wormy) |
| Copper John | [Source](https://news.orvis.com/fly-fishing/video-how-to-tie-the-copper-john) |
| Prince Nymph | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/nymph-flies/666-prince_nymph) |
| Flashback Pheasant Tail | [Source](https://news.orvis.com/fly-fishing/video-how-to-tie-a-flashback-pheasant-tail-nymph) |
| Zug Bug | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/nymph-flies/658-zug_bug) |
| Woolly Bugger | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/salt-bass-streamer-flies/642-olive-or-bead-head-wooly-bugger) |
| Zonker | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/salt-bass-streamer-flies/756-pearl_zonker) |
| Clouser Minnow | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/salt-bass-streamer-flies/649-clouser_minnow) |
| Slumpbuster | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/salt-bass-streamer-flies/818-slumpbuster) |
| Muddler Minnow | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/salt-bass-streamer-flies/644-muddler-minnow) |
| Sculpzilla | [Source](https://flyfishingthesierra.com/sculpzilla1/) |
| Mohair Leech | [Source](https://deneki.com/2025/01/fly-tying-mohair-leech/) |
| Balanced Leech | [Source](https://flyfishingthesierra.com/balanced-leech/) |
| Rabbit Strip Leech | [Source](https://howtoflyfish.orvis.com/fly-tying-videos/salt-bass-streamer-flies/1257-conehead_bunny_leech) |
| Sex Dungeon / Dungeon | [Source](https://charliesflybox.com/blogs/fly-tying-videos/sex-dungeon-fly-tying-video) |
| Circus Peanut | [Source](https://fly-fishing-podcast.thearticulatefly.com/bonus-tying-the-circus-peanut-streamer-secrets-and-fishing-strategies-with-russ-maddin/) |
| Matuka | [Source](https://www.flytyer.com/the-mighty-matuka/) |
| Mickey Finn | [Source](https://charliesflybox.com/blogs/fly-tying-videos/mickey-finn-fly-tying-video) |
| Grey Ghost | [Source](https://www.llbean.com/llb/shop/1000010122) |
| Crayfish pattern | [Source](https://www.flyfisherman.com/editorial/7-best-crayfish-flies/517343) |

## Known limits

Parachute hackle still reads as a projected disk at large magnification. Feather wings, particularly Matuka and Grey Ghost, retain fairly smooth silhouettes. Deer-hair cut ends are represented by small coloured cross sections; the full depth of a spun head is not reproduced. The articulated streamers show a simple trailing hook connection rather than every joint and hook in the dressing. The generic crayfish and the combined Egg / Mop / pellet entry are representative silhouettes.

Some pre-existing tree text disagrees with the selected dressing: Frenchie mentions a pink bead rather than collar, Cased Caddis mentions herl and a bead, and Mother Shucker is grouped as an emerger. Those editorial conflicts are outside this drawing change. Art descriptions were corrected where their material identity changed.

## Validation and comparison images

`npm test` exercises every pattern at all three detail levels in studio, plain, water and transparent views, checks SVG references and the 400 KB size ceiling, renders all colour variants, and samples emitted fibres for the framing regressions found during review. `npm run build` builds the web app. No dependencies were added.

The untracked `compare/` directory contains `pilot-compare.png` (old commit, new SVG and supplied AI photo), `all-flies.png` (80 studio close-ups) and `phone-cards.png` (10 Mayfly-adults images at 140 CSS pixels wide). The AI panels are cropped for comparable magnification, with no retouching or colour changes. The old pilot SVGs were rendered from the requested published commit before editing.

## Generation measurements

Measured on the supplied two-core host with Node v22.23.3, 15 warmed studio renders per pattern, while one headless screenshot job shared the machine. These times cover SVG string generation; they do not measure phone rasterization or frame rate.

| Close-up | Median generation | SVG size |
| --- | --- | --- |
| Parachute Adams | 4.8 ms | 236.9 KB |
| Pheasant Tail | 4.8 ms | 229.5 KB |
| Woolly Bugger | 5.1 ms | 253.7 KB |

Across all 1,200 timed renders, the median was 2.6 ms, the 95th percentile 6.7 ms, and the slowest 32.2 ms. The largest studio SVG was 322.6 KB. Full measurements remain in the untracked `compare/benchmark.json`.
