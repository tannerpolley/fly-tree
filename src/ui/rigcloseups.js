/* Close-up cards for the rig diagram: a large picture of the part, its real size, and what it does.
   closeup(part, scene, helpers) → HTML. Parts: rod, grip, reel, guides, line, sinktip, leader, tippet, ring,
   indicator, shot, sighter, dropper, water, angler, fly:<i>, knot:<key>. */
import { X_DIA, X_LB, REEL, INDICATOR_DIA, SHOT_DIA, TIPPET_RING_DIA, ftIn, mm } from '../data/gear.js';
import { COLORS } from './rigdraw.js';

const r1=v=>Math.round(v*10)/10;
const svg=(body,vb='0 0 320 170')=>`<svg viewBox="${vb}" width="100%" role="img" style="display:block">${body}</svg>`;
const T=(x,y,t,o={})=>`<text x="${x}" y="${y}" font-size="${o.s||11}" ${o.a?`text-anchor="${o.a}"`:''} font-weight="${o.w||500}" fill="${o.c||'#37474f'}">${t}</text>`;
const metal=(id,c1='#e9edf0',c2='#6f7880')=>`<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${c1}"/><stop offset=".5" stop-color="${c2}"/><stop offset="1" stop-color="#3b4248"/></linearGradient>`;

/* a coil of wraps around the segment a→b (n turns, radius r): back halves faint, front halves solid */
function coil(a,b,n,r,col,w=2){
  const dx=(b[0]-a[0])/n,dy=(b[1]-a[1])/n,len=Math.hypot(b[0]-a[0],b[1]-a[1]),nx=-(b[1]-a[1])/len*r,ny=(b[0]-a[0])/len*r;let back='',front='';
  for(let i=0;i<n;i++){const p=[a[0]+dx*i,a[1]+dy*i],m=[p[0]+dx*.5,p[1]+dy*.5],q=[p[0]+dx,p[1]+dy];
    front+=`M${p[0]+nx} ${p[1]+ny}Q${m[0]-nx*.2} ${m[1]-ny*.2} ${q[0]-nx} ${q[1]-ny}`;
    back+=`M${q[0]-nx} ${q[1]-ny}Q${q[0]+dx*.1} ${q[1]+dy*.1} ${q[0]+nx} ${q[1]+ny}`}
  return `<path d="${back}" fill="none" stroke="${col}" stroke-width="${w}" opacity=".45" stroke-linecap="round"/><path d="${front}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>`;
}

/* ---------------- knot drawings (loosely tied, so you can see the path; then wet and pull tight) ---------------- */
function clinchArt(target,line,{label='Improved clinch knot',wraps=5}={}){
  const eye=target==='ring'?`<circle cx="70" cy="85" r="15" fill="none" stroke="url(#mt)" stroke-width="5"/>`:
    `<path d="M10 85H55" stroke="#7a838a" stroke-width="6" stroke-linecap="round"/><circle cx="66" cy="85" r="11" fill="none" stroke="#7a838a" stroke-width="5"/>`;
  return svg(`<defs>${metal('mt')}</defs>${eye}
    <path d="M310 85H86" fill="none" stroke="${line}" stroke-width="2.6"/>
    <path d="M86 85C70 85 70 62 82 62C96 62 104 70 112 76" fill="none" stroke="${line}" stroke-width="2.6"/>
    ${coil([112,82],[230,85],wraps,9,line,2.4)}
    <path d="M230 85C246 70 246 104 230 100C160 104 100 110 90 92" fill="none" stroke="${line}" stroke-width="2.4"/>
    <path d="M90 92C112 120 200 126 236 106L262 118" fill="none" stroke="${line}" stroke-width="2.4" stroke-dasharray="5 3"/>
    ${T(160,26,label,{a:'middle',s:13,w:700,c:'#1f2a30'})}
    ${T(170,58,`${wraps} turns around the main line`,{a:'middle'})}
    ${T(160,140,'tag back through the small loop by the eye,',{a:'middle',s:10.5})}${T(160,154,'then through the big loop (dashed); wet, pull tight',{a:'middle',s:10.5})}`);
}
const KNOT_ART={
  loop:()=>svg(`<path d="M8 84H118" stroke="${COLORS.line}" stroke-width="7" stroke-linecap="round"/>
    <path d="M118 80C160 58 196 64 196 86C196 108 160 112 118 92" fill="none" stroke="${COLORS.line}" stroke-width="7"/>
    <path d="M312 86H210" stroke="${COLORS.leader}" stroke-width="3.6"/>
    <path d="M210 82C170 60 132 66 132 86C132 106 170 112 210 90" fill="none" stroke="${COLORS.leader}" stroke-width="3.6"/>
    <path d="M196 86C196 99 186 106 172 106" fill="none" stroke="${COLORS.line}" stroke-width="7"/>
    ${T(160,26,'Loop-to-loop connection',{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(60,122,'fly line loop',{a:'middle',c:'#9c7a11'})}${T(262,122,'leader butt loop',{a:'middle',c:'#1d6e68'})}
    ${T(160,146,'Pass the leader loop over the line loop, then push the',{a:'middle',s:10})}${T(160,159,'whole leader through it; pull snug into a flat square.',{a:'middle',s:10})}`),
  ring:()=>clinchArt('ring',COLORS.leader,{label:'Improved clinch to the tippet ring'}),
  fly:()=>clinchArt('eye',COLORS.tippet,{label:'Improved clinch: tippet to the fly'}),
  dfly:()=>clinchArt('eye',COLORS.tippet,{label:'Improved clinch: dropper to its fly'}),
  drop:()=>svg(`<path d="M60 70H150" stroke="#c4622d" stroke-width="18" stroke-linecap="round" opacity=".3"/>
    <circle cx="26" cy="70" r="7" fill="none" stroke="#7a838a" stroke-width="4"/>
    <path d="M33 70H186C236 70 240 140 192 140C166 140 156 126 158 110" fill="none" stroke="#7a838a" stroke-width="5" stroke-linecap="round"/><path d="M158 110l-6 10l11 -3z" fill="#7a838a"/>
    ${coil([194,130],[214,146],3,7,COLORS.tippet,2.2)}<path d="M212 144C238 152 268 164 306 180" fill="none" stroke="${COLORS.tippet}" stroke-width="2.4"/>
    ${T(160,26,'Dropper tied to the hook bend',{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(105,52,'top fly (body shown faint)',{a:'middle',s:10.5,c:'#5d6b73'})}
    ${T(226,120,'dropper tippet',{s:10.5,c:'#a43a5e',w:600})}${T(226,134,'to the 2nd fly',{s:10,c:'#a43a5e'})}
    ${T(12,168,'Improved clinch around the bend, behind',{s:10})}${T(12,181,'the body; 14–30″ of tippet to the dropper.',{s:10})}`,'0 0 320 190'),
  loopfly:()=>svg(`<defs>${metal('mt')}</defs><path d="M10 85H52" stroke="#7a838a" stroke-width="6" stroke-linecap="round"/><circle cx="62" cy="85" r="10" fill="none" stroke="#7a838a" stroke-width="5"/>
    <path d="M62 75C92 60 112 70 120 85C112 100 92 110 62 95" fill="none" stroke="${COLORS.leader}" stroke-width="3"/>
    <path d="M120 85H312" stroke="${COLORS.leader}" stroke-width="3"/>${coil([128,85],[200,85],4,8,COLORS.leader,2.4)}
    <circle cx="214" cy="85" r="9" fill="none" stroke="${COLORS.leader}" stroke-width="2.6"/>
    ${T(160,26,'Non-slip loop knot',{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(92,128,'open loop lets the streamer swing',{a:'middle'})}
    ${T(160,148,'Overhand knot; tag through the eye and back through it;',{a:'middle',s:10})}${T(160,161,'4 wraps; tag back through the overhand.',{a:'middle',s:10})}`),
  sight:()=>svg(`<path d="M10 80H150" stroke="${COLORS.sighter}" stroke-width="4"/><path d="M10 80H150" stroke="#ff5a1f" stroke-width="4" stroke-dasharray="22 22"/>
    <path d="M310 90H170" stroke="${COLORS.tippet}" stroke-width="2.2"/>
    <path d="M150 80C176 80 168 98 190 98C210 98 204 70 230 72" fill="none" stroke="${COLORS.sighter}" stroke-width="3"/>
    <path d="M170 90C146 90 154 70 132 70C112 70 118 96 92 94" fill="none" stroke="${COLORS.tippet}" stroke-width="2"/>
    <circle cx="160" cy="85" r="5" fill="none" stroke="${COLORS.ring}" stroke-width="2.4"/>
    ${T(160,26,'Sighter to tippet',{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(160,126,'A tippet ring with a clinch knot on each side,',{a:'middle',s:10.5})}${T(160,140,'or a double surgeon’s knot.',{a:'middle',s:10.5})}`),
};
const KNOT_TEXT={
  loop:['Line → leader','Loop-to-loop: quick to change leaders. A nail knot also works.'],
  ring:['Leader → tippet ring','Improved clinch knot. Tie new tippet to the other side of the ring, so the leader never gets shorter.'],
  fly:['Tippet → fly','Improved clinch knot, 5 turns. Wet it before pulling tight or the line weakens.'],
  loopfly:['Leader → streamer','Non-slip loop knot, so the fly swings and swims freely.'],
  drop:['Dropper → top fly','Improved clinch around the bend of the top fly’s hook.'],
  dfly:['Dropper → second fly','Improved clinch through the dropper fly’s hook eye.'],
  sight:['Sighter → tippet','Clinch knots to a tippet ring, or a double surgeon’s knot.'],
};
export const knotText=k=>KNOT_TEXT[k];

/* ---------------- part drawings ---------------- */
function rodArt(sc){
  const L=sc.rodSpec.len,x=g=>16+g/L*292;
  const guides=[.236,.292,.361,.435,.505,.574,.639,.699,.759,.815,.866,.912,.954];
  return svg(`<defs>${metal('mt')}</defs>
    <path d="M${x(0)} 80L${x(L)} 80" stroke="#26302b" stroke-width="5" stroke-linecap="round"/><path d="M${x(L*.5)} 80L${x(L)} 80" stroke="#26302b" stroke-width="2.6"/>
    <rect x="${x(0)}" y="76" width="${x(sc.rodSpec.seat)-x(0)}" height="8" rx="2" fill="url(#mt)"/>
    <rect x="${x(sc.rodSpec.seat)}" y="74" width="${x(sc.rodSpec.seat+sc.rodSpec.grip)-x(sc.rodSpec.seat)}" height="12" rx="5" fill="#c9a46a"/>
    ${[1,2,3].map(k=>`<rect x="${x(L*k/4)-2}" y="76" width="4" height="8" fill="#1b221e"/>`).join('')}
    ${guides.map((g,i)=>`<circle cx="${x(g*L)}" cy="${i<2?94:89}" r="${i<2?4:2.2}" fill="none" stroke="#7a838a" stroke-width="1.4"/>`).join('')}
    <circle cx="${x(L)}" cy="81" r="2" fill="none" stroke="#7a838a" stroke-width="1.4"/>
    <circle cx="${x(sc.rodSpec.seat*.5)}" cy="104" r="12" fill="#2f3439"/><circle cx="${x(sc.rodSpec.seat*.5)}" cy="104" r="8" fill="#f2c230"/>
    <path d="M${x(0)} 136H${x(L)}M${x(0)} 131v10M${x(L)} 131v10" stroke="#5d6b73"/>${T(160,152,`${ftIn(L)} (${r1(L*.0254)} m), ${sc.rodSpec.wt}-weight, ${sc.rodSpec.pieces} pieces`,{a:'middle',w:600,c:'#1f2a30'})}
    ${T(x(sc.rodSpec.seat+sc.rodSpec.grip/2),64,'grip',{a:'middle'})}${T(x(.26*L),116,'stripping guides',{a:'middle'})}${T(x(.62*L),66,'snake guides',{a:'middle'})}${T(x(L)-4,66,'tip-top',{a:'end'})}${T(x(L*.75),116,'ferrule (joint)',{a:'middle'})}<path d="M${x(L*.75)} 104V88" stroke="#5d6b73" stroke-width=".8"/>`);
}
function gripArt(){
  return svg(`<defs>${metal('mt')}<linearGradient id="ck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e2c48f"/><stop offset=".6" stop-color="#c49a5c"/><stop offset="1" stop-color="#9d7742"/></linearGradient></defs>
    <rect x="20" y="58" width="70" height="20" rx="4" fill="url(#mt)"/><rect x="26" y="56" width="12" height="24" rx="3" fill="#5b636b"/><rect x="78" y="56" width="10" height="24" rx="3" fill="#5b636b"/>
    <path d="M90 56C110 50 210 50 236 58V78C210 86 110 86 90 80Z" fill="url(#ck)"/>
    ${Array.from({length:20},(_,i)=>`<path d="M${96+i*7} 54v28" stroke="#8a6a3a" stroke-width=".8" opacity=".5"/>`).join('')}
    <rect x="236" y="62" width="8" height="12" rx="2" fill="#2f3439"/><path d="M244 68H312" stroke="#26302b" stroke-width="7" stroke-linecap="round"/>
    <circle cx="256" cy="74" r="3" fill="none" stroke="#7a838a" stroke-width="1.6"/>
    <path d="M52 80V92" stroke="#2f3439" stroke-width="6"/><circle cx="52" cy="122" r="32" fill="#2f3439"/><circle cx="52" cy="122" r="25" fill="#f2c230"/><circle cx="52" cy="122" r="20" fill="#f6f2e4"/><circle cx="52" cy="122" r="11" fill="#3a4046"/><circle cx="72" cy="128" r="5" fill="#151719"/>
    ${T(165,40,'cork grip ~6½″',{a:'middle'})}${T(54,40,'reel seat',{a:'middle'})}${T(100,140,'reel',{})}${T(258,96,'hook keeper',{a:'middle'})}
    ${T(160,162,'Hold the grip with your thumb on top; the reel hangs below.',{a:'middle',s:10})}`);
}
function reelArt(){
  return svg(`<defs>${metal('mt')}</defs><circle cx="110" cy="88" r="70" fill="#2f3439"/><circle cx="110" cy="88" r="64" fill="none" stroke="#5b636b" stroke-width="2"/>
    <circle cx="110" cy="88" r="52" fill="#f2c230"/>${[46,40].map(r=>`<circle cx="110" cy="88" r="${r}" fill="none" stroke="#c99a16" stroke-width="1"/>`).join('')}
    <circle cx="110" cy="88" r="36" fill="#f6f2e4"/>${[30,24].map(r=>`<circle cx="110" cy="88" r="${r}" fill="none" stroke="#d8d0b8" stroke-width="1"/>`).join('')}
    <circle cx="110" cy="88" r="18" fill="#3a4046"/>${[0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3;return`<circle cx="${110+Math.cos(a)*44}" cy="${88+Math.sin(a)*44}" r="5" fill="#2f3439"/>`}).join('')}
    <circle cx="110" cy="88" r="7" fill="url(#mt)"/><circle cx="152" cy="100" r="9" fill="#151719"/>
    ${T(200,40,'fly line (≈90 ft)',{c:'#9c7a11',w:600})}${T(200,58,'backing (≈100 yd)',{c:'#7a7462',w:600})}${T(200,76,'drag knob (centre)',{})}${T(200,94,'handle',{})}
    ${T(200,128,`about ${r1(REEL.dia)}″ across`,{w:600,c:'#1f2a30'})}${T(200,146,'stores line; the drag slows',{s:10})}${T(200,159,'a big fish that runs',{s:10})}`);
}
function guidesArt(){
  return svg(`<defs>${metal('mt')}</defs>
    <path d="M10 60H310" stroke="#26302b" stroke-width="7" stroke-linecap="round"/>
    <path d="M48 60L56 96M84 60L76 96" stroke="#6f7880" stroke-width="3"/><circle cx="66" cy="104" r="14" fill="none" stroke="url(#mt)" stroke-width="5"/><circle cx="66" cy="104" r="10" fill="none" stroke="#d9dde0" stroke-width="2"/>
    <path d="M156 60C152 72 164 74 160 84C156 92 168 92 166 82" fill="none" stroke="#7a838a" stroke-width="2.4"/>
    <rect x="262" y="55" width="22" height="10" rx="3" fill="#7a838a"/><circle cx="292" cy="62" r="7" fill="none" stroke="url(#mt)" stroke-width="3.4"/>
    <path d="M10 112C40 110 52 106 66 104C110 100 140 88 163 86C210 80 250 70 292 62" fill="none" stroke="${COLORS.line}" stroke-width="3"/>
    ${T(66,138,'stripping guide',{a:'middle'})}${T(66,152,'(ceramic ring)',{a:'middle',s:10})}${T(162,118,'snake guide',{a:'middle'})}${T(286,90,'tip-top',{a:'middle'})}
    ${T(160,24,'The line runs through every guide out to the tip-top',{a:'middle',s:11.5,w:600,c:'#1f2a30'})}`);
}
function lineArt(sc){
  return svg(`<path d="M10 100C30 100 40 100 60 99L110 92L200 90L250 96L310 98" fill="none" stroke="${COLORS.line}" stroke-width="10" stroke-linecap="round"/>
    <path d="M10 104H310" stroke="#c99a16" stroke-width="1" opacity=".5"/>
    ${T(34,82,'running line',{a:'middle'})}${T(86,64,'rear taper',{a:'middle'})}${T(155,82,'belly (casting weight)',{a:'middle'})}${T(226,64,'front taper',{a:'middle'})}${T(296,82,'tip',{a:'middle'})}
    <rect x="10" y="126" width="80" height="16" rx="8" fill="${COLORS.line}"/><rect x="10" y="126" width="80" height="5" rx="2.5" fill="#fff6c9" opacity=".7"/>
    ${T(100,134,'≈1 mm thick: plastic coating',{s:10.5})}${T(100,147,'over a braided core',{s:10.5})}
    ${T(160,24,'Weight-forward fly line',{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(160,165,`${sc.facts.line}; its ${sc.rodSpec.wt}-weight must match the rod.`,{a:'middle',s:10})}`);
}
function sinkArt(){
  return svg(`<rect x="0" y="70" width="320" height="100" fill="#cfe3ef"/><path d="M0 70H320" stroke="#4d93bf" stroke-width="2"/>
    <path d="M10 68H140" stroke="${COLORS.line}" stroke-width="7" stroke-linecap="round"/><path d="M140 68C180 80 220 112 280 138" fill="none" stroke="${COLORS.sinktip}" stroke-width="6" stroke-linecap="round"/>
    <path d="M280 138L310 142" stroke="${COLORS.leader}" stroke-width="2.4"/>
    ${T(70,58,'floating line',{a:'middle',c:'#9c7a11'})}${T(14,112,'sinking tip 10–15 ft',{c:'#1f2a30',w:600})}${T(14,127,'sinks about 2–4 inches a second',{s:10})}
    ${T(160,24,'Sink-tip line',{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(160,162,'Gets a streamer down to the fish; the rest of the line still floats.',{a:'middle',s:10})}`);
}
function leaderArt(sc){
  const pts=[[0,.021],[.45,.021],[.7,.017],[.86,.012],[1,X_DIA[sc.facts.leaderX]||.007]],x=t=>20+t*280,h=d=>d*950;
  const top=pts.map(p=>`${x(p[0])} ${90-h(p[1])}`).join('L'),bot=pts.slice().reverse().map(p=>`${x(p[0])} ${90+h(p[1])}`).join('L');
  return svg(`<path d="M${top}L${bot}Z" fill="${COLORS.leader}" opacity=".85"/>
    ${pts.slice(1,4).map(p=>`<path d="M${x(p[0])} ${90-h(p[1])-4}V${90+h(p[1])+4}" stroke="#fff" stroke-width="1.2"/>`).join('')}${T(x(0),62,'butt 0.021″ (joins the line)',{})}${T(x(1),64,`tip ${sc.facts.leaderX} · ${X_DIA[sc.facts.leaderX]}″`,{a:'end'})}${T(x(.22),125,'butt section',{a:'middle',s:10})}${T(x(.78),125,'taper → tip',{a:'middle',s:10})}
    <path d="M${x(0)} 136H${x(1)}M${x(0)} 131v10M${x(1)} 131v10" stroke="#5d6b73"/>${T(160,152,`${ftIn(sc.facts.leaderLen)} tapered leader (thickness ×450)`,{a:'middle',w:600,c:'#1f2a30'})}
    ${T(160,24,'Tapered leader',{a:'middle',s:13,w:700,c:'#1f2a30'})}`);
}
function tippetArt(sc){
  const xs=['3X','4X','5X','6X','7X'];
  return svg(xs.map((x,i)=>`<path d="M20 ${48+i*22}H200" stroke="${x===sc.facts.tipX?COLORS.tippet:'#9aa5ac'}" stroke-width="${X_DIA[x]*500}" stroke-linecap="round"/>${T(212,52+i*22,`${x} · ${X_DIA[x]}″ · ~${X_LB[x]} lb`,{w:x===sc.facts.tipX?700:500,c:x===sc.facts.tipX?'#a43a5e':'#37474f'})}`).join('')+
    T(160,24,`Tippet: this rig uses ${sc.facts.tipX}`,{a:'middle',s:13,w:700,c:'#1f2a30'})+T(160,162,'Bigger number = thinner, harder to see, weaker.',{a:'middle',s:10}));
}
function ringArt(){
  return svg(`<defs>${metal('mt')}</defs><circle cx="160" cy="88" r="20" fill="none" stroke="url(#mt)" stroke-width="6"/>
    <path d="M10 88H118" stroke="${COLORS.leader}" stroke-width="3"/>${coil([108,88],[140,88],5,6,COLORS.leader,2)}
    <path d="M310 88H202" stroke="${COLORS.tippet}" stroke-width="2.2"/>${coil([180,88],[212,88],5,5,COLORS.tippet,1.8)}
    ${T(60,74,'leader',{a:'middle',c:'#1d6e68'})}${T(260,74,'tippet',{a:'middle',c:'#a43a5e'})}
    ${T(160,24,`Tippet ring (≈${Math.round(TIPPET_RING_DIA*25.4)} mm)`,{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(160,140,'Shown 25× life size. Retie only the tippet;',{a:'middle',s:10.5})}${T(160,154,'the leader stays the same length.',{a:'middle',s:10.5})}`);
}
function indicatorArt(sc){
  return svg(`<rect x="0" y="86" width="320" height="84" fill="#cfe3ef"/><path d="M0 86H320" stroke="#4d93bf" stroke-width="2"/>
    <path d="M10 85H138" stroke="${COLORS.leader}" stroke-width="2.4"/><circle cx="160" cy="76" r="22" fill="${COLORS.indicator}" stroke="#a84c12" stroke-width="1.5"/><circle cx="152" cy="68" r="6" fill="#fff" opacity=".55"/>
    <path d="M160 98V104" stroke="${COLORS.leader}" stroke-width="2"/><path d="M182 76C190 76 192 70 196 64" fill="none" stroke="#a84c12" stroke-width="2"/>
    <path d="M160 100C170 120 200 140 240 162" fill="none" stroke="${COLORS.leader}" stroke-width="2.2"/>
    ${T(160,24,`Strike indicator (${Math.round(INDICATOR_DIA*4)}/4″)`,{a:'middle',s:13,w:700,c:'#1f2a30'})}
    ${T(206,58,'floats; dips or stops',{s:10.5})}${T(206,72,'when a fish eats',{s:10.5})}
    ${T(60,122,sc.indDist?`set ${ftIn(sc.indDist)} above the fly`:'set about 1½× the water depth',{a:'middle',s:10.5,w:600})}${T(60,136,'(≈1½× the depth)',{a:'middle',s:10})}`);
}
function shotArt(){
  return svg(`<path d="M10 70H310" stroke="${COLORS.tippet}" stroke-width="2"/>
    <circle cx="150" cy="70" r="14" fill="#5f666c" stroke="#2f3438" stroke-width="1.5"/><path d="M137 70H163" stroke="#2f3438" stroke-width="1.2"/><circle cx="145" cy="64" r="4" fill="#fff" opacity=".4"/>
    ${coil([180,70],[196,70],3,4,COLORS.tippet,1.6)}${T(188,94,'small knot stops it sliding',{a:'middle',s:10})}
    ${[['BB',SHOT_DIA.BB],['#4',SHOT_DIA['#4']],['#6',SHOT_DIA['#6']]].map(([n,d],i)=>`<circle cx="${50+i*95}" cy="130" r="${d*50}" fill="#5f666c"/>${T(50+i*95+12,134,`${n} ${Math.round(d*25.4*10)/10} mm`,{s:10})}`).join('')}
    ${T(160,24,'Split shot',{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(160,44,'pinched on 8–12″ above the first fly',{a:'middle',s:10.5})}`);
}
function sighterArt(){
  return svg(`<path d="M10 80H310" stroke="${COLORS.sighter}" stroke-width="5"/><path d="M10 80H310" stroke="#ff5a1f" stroke-width="5" stroke-dasharray="40 40"/>
    ${T(160,24,'Sighter',{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(160,112,'Bright coloured mono, 18–30″ long, just above the water.',{a:'middle',s:10.5})}${T(160,128,'Watch it: a twitch, pause or dart means a take.',{a:'middle',s:10.5})}`);
}
function waterArt(sc){
  const speeds=[1,.9,.75,.55,.3];
  return svg(`<rect x="0" y="40" width="320" height="110" fill="${sc.still?'#cfe2dc':'#cfe3ef'}"/><path d="M0 40H320" stroke="#4d93bf" stroke-width="2"/><rect x="0" y="146" width="320" height="24" fill="#a99c7c"/>
    ${sc.still?T(160,100,'Still water: no current, the fly hangs straight down',{a:'middle',w:600}):speeds.map((v,i)=>`<path d="M${250} ${54+i*21}H${250-v*150}M${250-v*150+8} ${48+i*21}L${250-v*150} ${54+i*21}L${250-v*150+8} ${60+i*21}" fill="none" stroke="#2f6f97" stroke-width="1.8"/>`).join('')}
    ${sc.still?'':T(262,58,'fast')+T(262,142,'slow')}
    ${T(160,24,sc.still?`Pond · ${ftIn(sc.depth)} deep`:`River run · ${ftIn(sc.depth)} deep`,{a:'middle',s:13,w:700,c:'#1f2a30'})}
    ${sc.still?'':T(12,164,'Surface water is faster than the bottom, so nymphs drag behind the indicator.',{s:9.6})}`);
}
function anglerArt(sc){
  return svg(`<path d="M60 160V40" stroke="#5d6b73"/><path d="M55 40H65M55 160H65" stroke="#5d6b73"/>${T(70,104,'5′10″',{w:600})}
    <circle cx="120" cy="52" r="10" fill="#d4a684"/><path d="M108 50Q120 36 132 48L140 49Z" fill="#3d3a33"/><path d="M110 64h20l4 50h-28z" fill="#45606e"/><path d="M112 110l-2 50M128 110l4 50" stroke="#5f6b4f" stroke-width="12" stroke-linecap="round"/>
    <path d="M130 74L156 92L300 20" stroke="#26302b" stroke-width="2.6" fill="none"/>${T(230,70,`${ftIn(sc.rodSpec.len)} rod`,{})}
    ${T(160,24,'Angler, for scale',{a:'middle',s:13,w:700,c:'#1f2a30'})}${T(200,140,sc.angler.onBank?'standing on the bank':'wading in chest waders',{s:10.5})}`);
}

const ROLE={
  rod:['Fly rod','Bends to cast the weight of the line and protects thin tippet when a fish pulls. Its “weight” must match the line.'],
  grip:['Grip and reel seat','Cork handle you hold; the reel locks into the seat behind it.'],
  reel:['Reel','Stores the fly line and backing; the drag slows a big fish that runs.'],
  guides:['Guides','Rings that carry the line along the rod to the tip-top.'],
  line:['Fly line','Thick, coated line. Its weight is what you cast, not the fly.'],
  sinktip:['Sink-tip','A sinking front section that pulls a streamer deep while the rest floats.'],
  leader:['Leader','Clear tapered mono: thick at the line end, fine at the tip, so the cast turns over and the fish don’t see the line.'],
  tippet:['Tippet','The thin, replaceable last section the fly is tied to.'],
  dropper:['Dropper','A second length of tippet from the first fly’s hook bend to a second fly at a different depth.'],
  ring:['Tippet ring','A tiny metal ring between leader and tippet.'],
  indicator:['Strike indicator','A float that shows when a fish takes the nymph and holds the flies at a set depth.'],
  shot:['Split shot','A small soft weight pinched on the tippet to sink the nymphs.'],
  sighter:['Sighter','Coloured section of a tight-line leader you watch for takes.'],
  water:['Water','Where the flies fish: how deep, and how the current moves them.'],
  angler:['Angler','A 5′10″ person, drawn for scale.'],
};
const ART={rod:rodArt,grip:gripArt,reel:reelArt,guides:guidesArt,line:lineArt,sinktip:sinkArt,leader:leaderArt,tippet:tippetArt,dropper:()=>KNOT_ART.drop(),ring:ringArt,indicator:indicatorArt,shot:shotArt,sighter:sighterArt,water:waterArt,angler:anglerArt};
function sizeLine(part,sc){
  const f=sc.facts;
  return {rod:`${ftIn(sc.rodSpec.len)} long, ${sc.rodSpec.wt}-weight`,grip:'cork grip ≈6½″',reel:`≈${REEL.dia}″ across`,guides:'rings 2–11 mm',line:`≈1 mm thick · ${f.line}`,
    sinktip:'10–15 ft sinking tip',leader:`${ftIn(f.leaderLen)} long, tapers to ${f.leaderX}`,tippet:f.tippetLen?`${ftIn(f.tippetLen)} of ${f.tipX} (${X_DIA[f.tipX]}″ thick)`:`${f.tipX}`,
    dropper:`${ftIn(f.dropperLen)} of ${f.tipX}`,ring:'≈3 mm',indicator:`¾″ float${sc.indDist?`, ${ftIn(sc.indDist)} above the fly`:''}`,shot:'BB shot ≈4.6 mm',sighter:'≈24″ coloured mono',
    water:`${ftIn(sc.depth)} deep`,angler:'5′10″'}[part]||'';
}

/* flyImg(name) → <img> HTML of the studio photo */
export function closeup(part,sc,flyImg){
  let title,art,size,role;
  if(part.startsWith('fly:')){
    const f=sc.flies[+part.slice(4)];
    title=`${f.isThis?'★ ':''}${f.name}${f.example?' (example)':''}`;art=flyImg(f.name);
    size=`${f.z||''} hook ≈ ${mm(f.hookLen)}, whole fly ≈ ${mm(f.flyLen)} long`;
    role=f.role==='dropper'?'Dropper fly: hangs below the top fly on its own tippet.':f.role==='point'?'Point fly: the heavy fly at the end of a tight-line rig.':'Drawn at its real size in the diagram; “Fly up close” zooms in on it.';
  }else if(part.startsWith('knot:')){
    const k=part.slice(5),[t,r]=KNOT_TEXT[k];title=`Knot: ${t}`;art=KNOT_ART[k]();size='';role=r;
  }else{[title,role]=ROLE[part]||[part,''];art=ART[part]?ART[part](sc):'';size=sizeLine(part,sc)}
  return `<div class="rct">${title}</div><div class="rca">${art}</div>${size?`<div class="rcs">📏 ${size}</div>`:''}<div class="rcr">${role}</div>`;
}
