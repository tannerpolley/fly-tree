/* Labelled anatomy diagrams (dry fly, nymph, streamer). */

/* ---------- anatomy SVGs ---------- */
export const HOOK=`<g fill="none" stroke="#555" stroke-width="3" stroke-linecap="round"><circle cx="88" cy="165" r="9"/><path d="M97 165H405C455 165 470 225 425 228C395 230 380 205 392 188"/><path d="M392 188l8 14" stroke-width="2"/></g>`;
export const FLIES={
 dry:{name:'Dry fly (Parachute)',parts:{
  eye:['Hook eye','Where the tippet ties on (use an improved clinch knot). Keep it clear of glue/thread.',[88,165],'<circle cx="88" cy="165" r="9" fill="none" stroke="#555" stroke-width="3"/>',[60,140]],
  shank:['Hook shank','The straight section; the body and materials are tied here. Longer shank = longer fly (dry flies are standard length).',[260,165],'<path d="M97 165H405" stroke="#555" stroke-width="3"/>',[250,235]],
  bend:['Hook bend','The curve at the back; sets how deep the hook can penetrate and how the fly rides.',[430,210],'<path d="M405 165C455 165 470 225 425 228" fill="none" stroke="#555" stroke-width="3"/>',[470,250]],
  point:['Hook point (and barb)','The sharp end that holds the fish. The barb stops it backing out — pinch it flat for easier release.',[392,190],'<path d="M425 228C395 230 380 205 392 188" fill="none" stroke="#555" stroke-width="3"/>',[330,265]],
  gap:['Hook gap','The opening between shank and point: the “mouth” of the hook. Wider gap = better hooking.',[395,205],'<path d="M395 168V200" stroke="#c4622d" stroke-dasharray="3 3" stroke-width="2"/>',[340,235]],
  head:['Head (thread wraps)','Final thread wraps secured with a whip-finish and cement so nothing unravels. Keep small — don’t crowd the eye.',[112,165],'<ellipse cx="115" cy="165" rx="14" ry="9" fill="#3a2e22"/>',[100,205]],
  post:['Wing post (parachute)','A post of white calf/ poly yarn the hackle wraps around. White so <i>you</i> can see the fly; sets the “wing” silhouette.',[170,95],'<rect x="165" y="95" width="10" height="60" fill="#f4f4f4" stroke="#888"/>',[150,60]],
  hackle:['Hackle (parachute collar)','Rooster hackle wound horizontally around the post at the base. Lets the body sit flush in the film while the fibers hold it up.',[170,150],'<ellipse cx="170" cy="150" rx="36" ry="6" fill="none" stroke="#6a4a2e" stroke-width="3"/>',[85,100]],
  thorax:['Thorax','Fat part just behind the head/ post: dubbing bulk to imitate the insect’s thorax and add buoyancy.',[190,165],'<ellipse cx="195" cy="165" rx="25" ry="12" fill="#7a5c3a"/>',[210,205]],
  body:['Body (abdomen)','The tapered section toward the bend: dubbing, thread, quill or biots that imitates the insect’s abdomen. Color and slimness matter most here.',[300,165],'<path d="M230 158L390 162V168L230 172Z" fill="#9a8f5a"/>',[290,205]],
  rib:['Rib','Wire or thread wrapped in an open spiral over the body: adds segmentation, flash and durability.',[300,165],'<path d="M245 158L255 172M270 158L280 172M295 158L305 172M320 158L330 172M345 158L355 172M370 158L380 172" stroke="#d4d4d4" stroke-width="1.6"/>',[310,120]],
  tail:['Tail','Stiff fibers (e.g. microfibbets/ hackle fibers) that float the back of the fly and imitate tails or shuck. Sets the “sitting on its tail” balance.',[460,165],'<path d="M405 165L470 150M405 165L475 165M405 165L470 180" stroke="#6a4a2e" stroke-width="2"/>',[480,120]]
 }},
 nymph:{name:'Nymph (beadhead Pheasant Tail)',parts:{
  eye:['Hook eye','Same as any fly. For nymphs, the hook is usually heavier wire and often slightly curved.',[88,165],'<circle cx="88" cy="165" r="9" fill="none" stroke="#555" stroke-width="3"/>',[60,140]],
  bead:['Bead head','Brass or tungsten bead gives weight, a flashy hot-spot and imitates the insect’s head. Tungsten is ~1.7× heavier than brass.',[115,165],'<circle cx="118" cy="165" r="14" fill="#d3a64a" stroke="#8a6a1a"/>',[100,205]],
  lead:['Underbody (weight)','Optional lead or non-lead wire wraps under the body for more sink. Bump up weight for deep, fast water.',[190,165],'<path d="M150 158H240V172H150Z" fill="#999" opacity=".4"/>',[160,235]],
  thorax:['Thorax & wing case','Fat dubbing section (peacock herl) and a wing-case of pheasant tail/ flash tied over it. Imitates the nymph’s developing wings.',[180,165],'<ellipse cx="185" cy="165" rx="25" ry="13" fill="#2f3b2a"/><ellipse cx="185" cy="157" rx="22" ry="7" fill="#d7a96b"/>',[190,115]],
  legs:['Legs','Pheasant tail fibers pulled back (or hackle fibers/ rubber legs on big stones). Movement triggers strikes.',[205,185],'<path d="M170 172L190 195M190 175L212 198M215 172L232 193" stroke="#7a4a1a" stroke-width="2"/>',[250,205]],
  body:['Abdomen (body)','Slim body made of pheasant tail, thread, or dubbing. Slimmer bodies sink faster and look more like mayfly nymphs.',[300,165],'<path d="M225 158L395 163V168L225 172Z" fill="#6b4a2a"/>',[310,205]],
  rib:['Rib','Copper/ gold wire wound through the body adds segmentation and durability.',[300,165],'<path d="M245 158L255 172M275 158L285 172M305 158L315 172M335 158L345 172M365 158L375 172" stroke="#d4893a" stroke-width="1.8"/>',[320,125]],
  tail:['Tail','Pheasant tail fibers: short tail imitates the mayfly’s tails (cerci).',[430,165],'<path d="M405 165L440 150M405 165L445 165M405 165L440 180" stroke="#7a4a1a" stroke-width="2"/>',[430,125]],
  bend:['Hook bend & point','As on any fly. Nymph hooks are often curved so the body can be sized and bent (e.g. scuds).',[420,200],'<path d="M405 165C455 165 470 225 425 228C395 230 380 205 392 188" fill="none" stroke="#555" stroke-width="3"/>',[470,250]]
 }},
 stream:{name:'Streamer (Woolly Bugger)',parts:{
  eye:['Hook eye','Streamer hooks are 3XL–6XL long: the extra shank length lets a long body hang off a single hook.',[88,165],'<circle cx="88" cy="165" r="9" fill="none" stroke="#555" stroke-width="3"/>',[60,140]],
  cone:['Cone / bead head','Adds weight, makes the fly “jig” and imitates a head. Heavy cones for deep runs, lighter ones for shallow.',[118,165],'<path d="M105 148L135 160V170L105 182Z" fill="#c9a038" stroke="#8a6a1a"/>',[100,205]],
  collar:['Hackle collar / palmered hackle','Soft hackle wound over the body (palmered) adds motion and imitates legs/ gills. Soft hen hackle gives the best pulsing.',[200,165],'<path d="M150 135L168 195M180 135L198 195M215 135L230 195M250 135L265 195M285 135L300 195" stroke="#2a2a2a" stroke-width="2" fill="none"/>',[200,100]],
  body:['Chenille body','Fuzzy chenille/ dubbing that’s long and slim; color matters (black, olive) and can be weighted with wire wraps.',[270,165],'<path d="M140 156L395 162V170L140 176Z" fill="#2c3a22"/>',[300,220]],
  rib:['Wire rib','Spiral wire protects the palmered hackle and keeps it from tearing.',[270,165],'<path d="M160 160L175 175M200 160L215 175M240 160L255 175M280 160L295 175M320 160L335 175" stroke="#c4c4c4" stroke-width="1.6"/>',[300,115]],
  flash:['Flash','A few strands of Krystal Flash along the tail or wing: a hint of sparkle triggers strikes.',[455,160],'<path d="M395 163L490 140M395 163L500 160" stroke="#8ee1ff" stroke-width="1.6"/>',[470,110]],
  tail:['Marabou tail','Soft marabou that pulses with each strip: the “life” of a Woolly Bugger. Typically as long as the hook.',[450,165],'<path d="M395 163C440 140 475 140 520 165C480 195 440 195 395 168Z" fill="#2a2a2a" opacity=".85"/>',[470,205]],
  bend:['Hook bend & point','Often fished with the point up on jig-style streamers (Clouser) to reduce snags.',[430,210],'<path d="M405 165C455 165 470 225 425 228C395 230 380 205 392 188" fill="none" stroke="#555" stroke-width="3"/>',[470,250]]
 }}
};
