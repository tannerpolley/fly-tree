/* Draws a to-scale rig scene (see rigscene.js) as SVG in real inches.
   The <svg> carries --u = inches per screen pixel; strokes and small parts use max(real size, N screen px),
   so everything is true size when zoomed in and still visible when zoomed out. */
import { at } from './rigscene.js';

const n2=v=>Math.round(v*1000)/1000;
const pt=p=>`${n2(p[0])} ${n2(p[1])}`;
const path=pts=>'M'+pts.map(pt).join('L');
const W=(real,px)=>`stroke-width:max(${n2(real)}px,calc(var(--u)*${px}px))`;
const R=(real,px)=>`r:max(${n2(real)}px,calc(var(--u)*${px}px))`;
export const COLORS={line:'#f2c230',leader:'#2f8f86',tippet:'#d4527a',dropper:'#d4527a',sighter:'#c6e33a',sinktip:'#3b4650',indicator:'#ff7a2b',shot:'#5f666c',ring:'#8d969d',rod:'#26302b'};
const MINPX={line:2.2,leader:1.7,tippet:1.2,dropper:1.2,sighter:2.6,sinktip:2.8};

/* stroke for one strand; leader sections taper on screen too */
function strandSVG(s,i){
  const c=COLORS[s.part],min=s.part==='leader'?Math.max(1.15,MINPX.leader-(s.dia<.015?.4:0)-(s.dia<.01?.15:0)):MINPX[s.part];
  let o=`<path d="${path(s.pts)}" data-p="${s.part}" fill="none" stroke="${c}" stroke-linecap="round" stroke-linejoin="round" style="${W(s.dia,min)}"/>`;
  if(s.part==='sighter')o+=`<path d="${path(s.pts)}" data-p="sighter" fill="none" stroke="#ff5a1f" stroke-dasharray="6 6" style="${W(s.dia,min)}"/>`;
  if(s.part==='line'&&!s.inGuides)o+=`<path d="${path(s.pts)}" fill="none" stroke="#fff6c9" stroke-linecap="round" opacity=".55" style="${W(s.dia*.35,min*.35)}"/>`;
  return o;
}

function angler(sc){
  const [fx,fy]=sc.angler.feet,h=sc.angler.height,H=sc.angler.hand,y=k=>fy-k;
  const sh=[fx+1.5,y(57)],elbow=[fx+(H[0]-fx)*.42+1,Math.max(H[1]+9,y(45))];
  const wader='#5f6b4f',jacket='#45606e',skin='#d4a684';
  const limb=(pts,w,c)=>`<path d="${path(pts)}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `<g data-p="angler">`+
    limb([[fx-2.5,y(36)],[fx-3,y(19)],[fx-2,y(2)]],6.4,wader)+limb([[fx+2.5,y(36)],[fx+4,y(19)],[fx+6,y(2)]],6.4,wader)+
    `<ellipse cx="${fx-1}" cy="${y(1)}" rx="4.6" ry="1.8" fill="#3f4636"/><ellipse cx="${fx+7}" cy="${y(1)}" rx="4.6" ry="1.8" fill="#3f4636"/>`+
    `<path d="M${fx-6} ${y(35)}C${fx-7} ${y(46)} ${fx-5} ${y(55)} ${fx-1} ${y(58.5)}L${fx+4.5} ${y(58)}C${fx+7} ${y(52)} ${fx+7.5} ${y(44)} ${fx+6.5} ${y(35)}Z" fill="${jacket}"/>`+
    `<path d="M${fx-6.3} ${y(35)}L${fx+6.8} ${y(35)}L${fx+6.4} ${y(49)}L${fx-5.8} ${y(49)}Z" fill="${wader}"/>`+
    `<path d="M${fx-5.2} ${y(49)}L${fx-4.6} ${y(52)}M${fx+5.6} ${y(49)}L${fx+4.6} ${y(56)}" stroke="#3f4636" stroke-width=".8"/>`+
    `<rect x="${fx-1.2}" y="${y(61)}" width="3" height="3" fill="${skin}"/><circle cx="${fx+.8}" cy="${y(65)}" r="4.6" fill="${skin}"/>`+
    `<path d="M${fx-4} ${y(66.8)}Q${fx+.5} ${y(71.2)} ${fx+4.6} ${y(67.2)}L${fx+9.4} ${y(66.4)}L${fx+4.4} ${y(65.9)}Q${fx} ${y(67.6)} ${fx-4} ${y(66.8)}Z" fill="#3d3a33"/>`+
    `<circle cx="${fx+3.4}" cy="${y(65.4)}" r=".55" fill="#2a2420"/>`+
    limb([[fx-1,y(55)],[fx+3,y(44)],[fx+9,y(40)]],3.4,jacket)+limb([[fx+9,y(40)],[fx+10.5,y(39.6)]],2.6,skin)+
    limb([sh,elbow,H],3.6,jacket)+`<circle cx="${n2(H[0])}" cy="${n2(H[1])}" r="1.9" fill="${skin}"/>`+
    `</g>`;
}
/* the rod hand closes around the cork, thumb on top; drawn over the grip */
function fist(sc){
  const H=sc.angler.hand,d=sc.rod.dir,n=sc.rod.down,P=(a,b)=>pt([H[0]+d[0]*a+n[0]*b,H[1]+d[1]*a+n[1]*b]);
  return `<g data-p="angler"><path d="M${P(-1.6,.15)}L${P(1.6,.15)}" stroke="#d4a684" stroke-width="2.3" stroke-linecap="round"/>`+
    `<path d="M${P(-.9,.75)}L${P(1.2,.85)}M${P(-.6,1)}L${P(1,1.05)}" stroke="#b98b6c" stroke-width=".12" stroke-linecap="round"/>`+
    `<path d="M${P(-.4,-.72)}L${P(1.9,-.62)}" stroke="#c99576" stroke-width=".72" stroke-linecap="round"/></g>`;
}
/* loop-to-loop joint at real size (welded line loop ≈½″, leader loop ≈⅓″); only visible when zoomed in */
function loopsSVG(sc){
  return (sc.loops||[]).map(({c,part,din,dout})=>{
    const P=(u,a,b)=>{const v=[-u[1],u[0]];return pt([c[0]+u[0]*a+v[0]*b,c[1]+u[1]*a+v[1]*b])};
    const loop=(u,back,out,w)=>`M${P(u,back,0)}C${P(u,back*.6,w)} ${P(u,out,w*1.25)} ${P(u,out,0)}C${P(u,out,-w*1.25)} ${P(u,back*.6,-w)} ${P(u,back,0)}`;
    return `<path d="${loop(dout,.33,-.2,.06)}" data-p="leader" fill="none" stroke="${COLORS.leader}" style="${W(.021,.4)}"/>`+
      `<path d="${loop(din,-.5,.16,.075)}" data-p="${part}" fill="none" stroke="${COLORS[part]}" style="${W(.04,.5)}"/>`;
  }).join('');
}

function rodSVG(sc){
  const r=sc.rod,sp=sc.rodSpec,p=r.pts,n=p.length-1;let s='';
  for(let i=0;i<n;i++){const t=i/n,d=sp.butt+(sp.tip-sp.butt)*t,m=3.4-2.2*t;
    s+=`<path d="M${pt(p[i])}L${pt(p[i+1])}" data-p="rod" stroke="${COLORS.rod}" stroke-linecap="round" style="${W(d,m)}"/>`;
    s+=`<path d="M${pt(p[i])}L${pt(p[i+1])}" stroke="#8a978f" opacity=".45" style="${W(d*.28,m*.28)}"/>`}
  for(let k=1;k<sp.pieces;k++){const a=at(p,r.len*k/sp.pieces-1.2),b=at(p,r.len*k/sp.pieces+1.2),d=sp.butt+(sp.tip-sp.butt)*k/sp.pieces;
    s+=`<path d="M${pt(a)}L${pt(b)}" stroke="#1b221e" style="${W(d*1.18,0)}"/>`}
  // reel seat, cork grip with cork texture, winding check
  s+=`<path d="M${pt(r.seat[0])}L${pt(r.seat[1])}" data-p="grip" stroke="#3a4046" stroke-linecap="round" style="${W(.74,3.6)}"/><path d="M${pt(r.seat[0])}L${pt(r.seat[1])}" stroke="#a7b0b8" opacity=".55" style="${W(.2,1)}"/>`;
  s+=`<path d="M${pt(r.grip[0])}L${pt(r.grip[1])}" data-p="grip" stroke="#c9a46a" stroke-linecap="round" style="${W(1.02,4.6)}"/><path d="M${pt(r.grip[0])}L${pt(r.grip[1])}" stroke="#a37f48" stroke-dasharray=".22 .13" opacity=".55" style="${W(.95,4.2)}"/><path d="M${pt(r.grip[0])}L${pt(r.grip[1])}" stroke="#ead2a3" opacity=".5" style="${W(.25,1.1)}"/>`;
  return s;
}

function reelSVG(sc){
  const {c,r}=sc.reel,foot=at(sc.rod.pts,sc.rodSpec.seat*.5),x=c[0],y=c[1];
  return `<g data-p="reel"><path d="M${pt(foot)}L${pt(c)}" stroke="#2c3136" stroke-width=".55"/>`+
    `<circle cx="${n2(x)}" cy="${n2(y)}" r="${r}" fill="#2f3439"/><circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r*.9)}" fill="none" stroke="#5b636b" stroke-width=".12"/>`+
    `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r*.74)}" fill="#f2c230"/><circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r*.62)}" fill="#f6f2e4"/><circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r*.36)}" fill="#3a4046"/>`+
    [0,1,2,3,4,5].map(i=>{const a=i*Math.PI/3;return`<circle cx="${n2(x+Math.cos(a)*r*.5)}" cy="${n2(y+Math.sin(a)*r*.5)}" r="${n2(r*.09)}" fill="#2f3439"/>`}).join('')+
    `<circle cx="${n2(x)}" cy="${n2(y)}" r="${n2(r*.16)}" fill="#7d868e"/><circle cx="${n2(x+r*.62)}" cy="${n2(y+r*.18)}" r="${n2(r*.16)}" fill="#151719"/>`+
    `<circle cx="${n2(x)}" cy="${n2(y)}" r="${r}" fill="none" stroke="#000" stroke-opacity=".35" style="${W(.06,1)}"/></g>`;
}

function guidesSVG(sc){
  return sc.guides.map(g=>`<path d="M${pt(g.base)}L${pt(g.c)}" stroke="#4a5157" style="${W(.035,.6)}"/><circle data-p="guides" cx="${n2(g.c[0])}" cy="${n2(g.c[1])}" r="${n2(g.r)}" fill="none" stroke="#7a838a" style="${W(.03,.8)}"/>`).join('');
}

function waterSVG(sc,x0,x1){
  const b=sc.bottom.map(p=>[p[0],p[1]]),deep=sc.depth+40,[v0,,v2]=sc.views.all,sx0=Math.max(v0,sc.waterX0);
  const water=`M${sc.waterX0} 0`+b.filter(p=>p[0]>=sc.waterX0).map(p=>'L'+pt(p)).join('')+`L${x1} ${b[b.length-1][1]}L${x1} 0Z`;
  const ground='M'+pt(b[0])+b.slice(1).map(p=>'L'+pt(p)).join('')+`L${x1} ${deep}L${x0} ${deep}Z`;
  let s=`<path d="${water}" fill="url(#rgWater)" opacity=".86" data-p="water"/>`;
  s+=`<path d="${ground}" fill="url(#rgGround)" data-p="water"/>`;
  // stones on the bottom, real size (2–7″)
  for(let i=0;i<34;i++){const x=sx0+(i/34)*(v2-sx0),p=b.reduce((q,c)=>c[0]<=x?c:q,b[0]),nx=b[Math.min(b.length-1,b.indexOf(p)+1)];
    const t=nx[0]===p[0]?0:(x-p[0])/(nx[0]-p[0]),y=p[1]+(nx[1]-p[1])*t,r=1.4+((i*7)%5)*1.1;
    s+=`<ellipse cx="${n2(x+((i*13)%7))}" cy="${n2(y-r*.25)}" rx="${n2(r*1.3)}" ry="${n2(r*.75)}" fill="${['#8b8576','#6f6a5d','#a29b88','#7b7466'][i%4]}" opacity=".9"/>`}
  if(sc.still)s+=`<path d="M${sc.waterX0} 0H${x1}" stroke="#7fb1cf" style="${W(.06,1.2)}"/>`+[0,1,2,3,4,5,6,7].map(i=>`<path d="M${-40+i*7} ${-sc.bankH}l${1+i%3} ${-4-(i%4)*2}" stroke="#6f8a4a" style="${W(.25,1)}"/>`).join('');
  else s+=`<path d="M${sc.waterX0} 0H${x1}" stroke="#4d93bf" style="${W(.06,1.4)}"/>`+[0,1,2,3,4,5,6,7,8,9,10,11].map(i=>`<path d="M${n2(sc.waterX0+30+i*((x1-sc.waterX0)/12))} ${n2(2+(i%3)*4)}h${8+(i%4)*3}" stroke="#fff" opacity=".45" style="${W(.08,1)}"/>`).join('');
  return s;
}

/* imgOf(fly) → {url, w, h} for its transparent cut-out (or a drawing in the same frame) */
function fliesSVG(sc,imgOf){
  return sc.flies.map((f,i)=>{
    const im=imgOf(f);
    if(f.geo&&im.photo)return `<image data-p="fly:${i}" href="${im.url}" x="${n2(f.eye[0]-f.geo.eye[0]*f.s)}" y="${n2(f.eye[1]-f.geo.eye[1]*f.s)}" width="${n2(f.w)}" height="${n2(f.h)}" opacity="${f.example?.85:1}"/>`;
    const s=f.flyLen/238;    // drawn flies: eye at (62,100) in a 360×220 frame starting at (40,−20), ~238 units eye to tail
    return `<image data-p="fly:${i}" href="${im.url}" x="${n2(f.eye[0]-22*s)}" y="${n2(f.eye[1]-120*s)}" width="${n2(360*s)}" height="${n2(220*s)}"/>`;
  }).join('');
}

function itemsSVG(sc){
  return sc.items.map(it=>{
    const [x,y]=it.c,c=`cx="${n2(x)}" cy="${n2(y)}"`;
    if(it.part==='indicator')return `<g data-p="indicator"><circle ${c} fill="${COLORS.indicator}" stroke="#a84c12" style="${R(it.dia/2,4.2)};stroke-width:calc(var(--u)*.7px)"/><circle cx="${n2(x-it.dia*.12)}" cy="${n2(y-it.dia*.14)}" fill="#fff" opacity=".55" style="${R(it.dia*.13,1.3)}"/></g>`;
    if(it.part==='shot')return `<circle data-p="shot" ${c} fill="${COLORS.shot}" stroke="#2f3438" style="${R(it.dia/2,2.6)};stroke-width:calc(var(--u)*.5px)"/>`;
    return `<circle data-p="ring" ${c} fill="none" stroke="${COLORS.ring}" style="${R(it.dia/2,2.2)};${W(.016,1)}"/>`;
  }).join('');
}

/* invisible, generous hit areas; thin and small parts get a minimum size in screen pixels */
function hitsSVG(sc){
  const line=(pts,part,px)=>`<path class="rh" d="${path(pts)}" data-part="${part}" style="stroke-width:calc(var(--u)*${px}px)"/>`;
  const dot=(c,part,real,px)=>`<path class="rh" d="M${pt(c)}h.001" data-part="${part}" style="${W(real,px)}"/>`;
  let s='';
  s+=line(sc.rod.pts,'rod',12);
  s+=line([sc.rod.grip[0],sc.rod.grip[1]],'grip',16)+line(sc.rod.seat,'grip',14);
  s+=dot(sc.reel.c,'reel',sc.reel.r*2,18);
  sc.guides.forEach(g=>{s+=dot(g.c,'guides',g.r*4,9)});
  sc.strands.forEach(st=>{if(!st.inGuides)s+=line(st.pts,st.part,13)});
  sc.items.forEach(it=>{s+=dot(it.c,it.part,it.dia*1.6,it.part==='indicator'?20:16)});
  sc.flies.forEach((f,i)=>{s+=dot([(f.box[0]+f.box[2])/2,(f.box[1]+f.box[3])/2],'fly:'+i,Math.max(f.box[2]-f.box[0],f.box[3]-f.box[1]),26)});
  return s;
}

export function sceneSVG(sc,imgOf){
  const v=sc.views.all,x0=v[0]-400,x1=v[2]+400;
  return `<defs>
    <linearGradient id="rgSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f2f6f8"/><stop offset="1" stop-color="#fbfaf5"/></linearGradient>
    <linearGradient id="rgWater" gradientUnits="userSpaceOnUse" x1="0" y1="0" x2="0" y2="${sc.depth+10}"><stop offset="0" stop-color="${sc.still?'#bcd8d4':'#c3dff0'}"/><stop offset="1" stop-color="${sc.still?'#5f8f8a':'#6fa3c4'}"/></linearGradient>
    <linearGradient id="rgGround" gradientUnits="userSpaceOnUse" x1="0" y1="${-sc.bankH}" x2="0" y2="${sc.depth+40}"><stop offset="0" stop-color="${sc.still?'#8a9a5b':'#b7a882'}"/><stop offset=".15" stop-color="#a99c7c"/><stop offset="1" stop-color="#7b705a"/></linearGradient>
  </defs>
  <rect x="${x0}" y="${v[1]-400}" width="${x1-x0}" height="${v[3]-v[1]+900}" fill="url(#rgSky)"/>
  <g class="rgPaint">${angler(sc)}${waterSVG(sc,x0,x1)}${rodSVG(sc)}${fist(sc)}${guidesSVG(sc)}${sc.strands.map(strandSVG).join('')}${loopsSVG(sc)}${reelSVG(sc)}${itemsSVG(sc)}${fliesSVG(sc,imgOf)}</g>
  <g class="rgHits"><path class="rh rhfill" d="M${x0} 0H${x1}V${sc.depth+60}H${x0}Z" data-part="water"/><path class="rh rhfill" d="M${sc.angler.feet[0]-8} ${sc.angler.feet[1]}V${sc.angler.feet[1]-sc.angler.height-2}h18V${sc.angler.feet[1]}Z" data-part="angler"/>${hitsSVG(sc)}</g>`;
}

/* ---------------- screen-space overlay: labels, knot badges, scale bar, fly markers ---------------- */
const nice=[1/16,1/8,1/4,1/2,1,2,3,6,12,24,36,60,120,240,480];
const frac={0.0625:'1/16″',0.125:'⅛″',0.25:'¼″',0.5:'½″'};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
export function overlaySVG(sc,vb,Wpx,Hpx,knotOrder){
  const [vx,vy,vw,vh]=vb,k=Wpx/vw,S=p=>[(p[0]-vx)*k,(p[1]-vy)*k];
  const inView=(p,m=0)=>p[0]>=-m&&p[0]<=Wpx+m&&p[1]>=-m&&p[1]<=Hpx+m;
  const boxes=[],hit=b=>boxes.some(o=>b[0]<o[2]&&b[2]>o[0]&&b[1]<o[3]&&b[3]>o[1]);
  // on-screen points along the rod and every strand, so labels can stay off the lines
  const dots=[];
  for(const p of[sc.rod.pts,...sc.strands.filter(t=>!t.inGuides).map(t=>t.pts)])for(let i=1;i<p.length;i++){
    const a=S(p[i-1]),b=S(p[i]),n=Math.min(400,Math.ceil(Math.hypot(b[0]-a[0],b[1]-a[1])/5));
    for(let j=0;j<=n;j++){const q=[a[0]+(b[0]-a[0])*j/n,a[1]+(b[1]-a[1])*j/n];if(inView(q,10))dots.push(q)}}
  const onLine=b=>dots.some(q=>q[0]>b[0]&&q[0]<b[2]&&q[1]>b[1]&&q[1]<b[3]);
  const A=sc.angler,ab=[S([A.feet[0]-8,A.feet[1]-A.height-3]),S([A.feet[0]+12,A.feet[1]])];
  if(k<4)boxes.push([ab[0][0],ab[0][1],ab[1][0],ab[1][1]]);   // only when the angler is small on screen
  let s='';
  // scale bar (bottom left)
  const step=nice.find(n=>n*k>=70)||nice[nice.length-1],bw=step*k,lab=step<1?frac[step]:step<12?`${step}″`:step%12?`${Math.floor(step/12)}′${step%12}″`:`${step/12} ft`;
  s+=`<g transform="translate(12 ${Hpx-14})"><rect x="-4" y="-16" width="${bw+70}" height="24" rx="6" fill="#fff" opacity=".82"/><path d="M0 0H${bw}M0 -5V5M${bw} -5V5" stroke="#1f2a30" stroke-width="1.6"/><text x="${bw+8}" y="4" font-size="12" font-weight="600" fill="#1f2a30">${lab}</text></g>`;
  boxes.push([0,Hpx-34,bw+80,Hpx]);
  // fly markers when flies are tiny on screen
  sc.flies.forEach((f,i)=>{const a=S([f.box[0],f.box[1]]),b=S([f.box[2],f.box[3]]),c=[(a[0]+b[0])/2,(a[1]+b[1])/2],sz=Math.max(b[0]-a[0],b[1]-a[1]);
    if(sz<28&&inView(c,20)){const r=Math.max(9,sz/2+6);s+=`<circle cx="${c[0]}" cy="${c[1]}" r="${r}" fill="none" stroke="${f.isThis?'#c4622d':'#6b7a85'}" stroke-width="1.6" stroke-dasharray="${f.isThis?'4 3':'2 3'}"/>`;boxes.push([c[0]-r,c[1]-r,c[0]+r,c[1]+r])}});
  // labels: off other labels and off the lines if possible; some only appear once zoomed in (minK px per inch)
  const sides={n:[0,-16,'middle'],s:[0,22,'middle'],e:[12,4,'start'],w:[-12,4,'end'],ne:[8,-12,'start'],nw:[-8,-12,'end'],se:[8,20,'start'],sw:[-8,20,'end']};
  const far={n:[0,-34],s:[0,40],e:[30,4],w:[-30,4],ne:[22,-28],nw:[-22,-28],se:[22,36],sw:[-22,36]};
  const order=['n','e','s','w','ne','nw','se','sw'];
  const label=l=>{const p=S(l.at);if(!inView(p,2)||(l.minK&&k<l.minK))return;
    const tw=l.text.length*6.4+8,cand=[];
    for(const off of[sides,far])for(const sd of[l.side,...order.filter(o=>o!==l.side)]){
      const [dx,dy]=off[sd],anc=sides[sd][2],x=p[0]+dx,y=p[1]+dy,x0=anc==='middle'?x-tw/2:anc==='end'?x-tw:x,b=[x0-2,y-12,x0+tw+2,y+4];
      if(b[0]>=2&&b[2]<=Wpx-2&&b[1]>=2&&b[3]<=Hpx-2)cand.push({x,y,anc,b})}
    const c=cand.find(c=>!hit(c.b)&&!onLine(c.b))||cand.find(c=>!hit(c.b))||(l.isThis&&cand[0]);
    if(!c)return;
    boxes.push(c.b);
    const col=l.isThis?'#b4511f':l.fly?'#4d5b64':l.minK?'#37566b':'#1f2a30';
    s+=`<path d="M${p[0]} ${p[1]}L${c.x} ${c.y-4}" stroke="${col}" stroke-width=".8" opacity=".45"/><text x="${c.x}" y="${c.y}" text-anchor="${c.anc}" font-size="12" font-weight="${l.isThis?700:500}" fill="${col}" stroke="#fff" stroke-width="3.2" paint-order="stroke" stroke-linejoin="round">${esc(l.text)}</text>`};
  sc.labels.filter(l=>l.isThis).forEach(label);     // the selected fly's label goes first and always shows
  // knot badges
  knotOrder.forEach((kn,i)=>{const p=S(kn.c);if(!inView(p,4))return;let q=[p[0],p[1]-20];
    for(const dy of[-20,-34,22,36]){q=[p[0],p[1]+dy];if(!hit([q[0]-10,q[1]-10,q[0]+10,q[1]+10]))break}
    boxes.push([q[0]-10,q[1]-10,q[0]+10,q[1]+10]);
    s+=`<path d="M${p[0]} ${p[1]}L${q[0]} ${q[1]}" stroke="#37566b" stroke-width="1" stroke-dasharray="2 2" opacity=".7"/>${k<25?`<circle cx="${p[0]}" cy="${p[1]}" r="2.2" fill="#37566b"/>`:''}`+
       `<g class="kb" data-part="knot:${kn.key}"><circle cx="${q[0]}" cy="${q[1]}" r="9" fill="#fff" stroke="#37566b" stroke-width="1.4"/><text x="${q[0]}" y="${q[1]+4}" text-anchor="middle" font-size="11.5" font-weight="700" fill="#37566b">${i+1}</text></g>`});
  // river current: faster at the top than near the bottom (why nymphs lag behind the indicator)
  if(!sc.still){
    const rows=[[.12,1],[.5,.72],[.86,.4]].map(([t,v])=>[S([0,sc.depth*t])[1],v]).filter(([y])=>y>10&&y<Hpx-40);
    const tryAt=x=>{const bs=rows.map(([y])=>[x-6,y-8,x+122,y+8]);return bs.every(b=>!hit(b)&&!onLine(b))?bs:null};
    let bs=null,x=0;for(const f of[.84,.6,.36])if(rows.length&&(bs=tryAt(x=Wpx*f-60)))break;
    if(bs){boxes.push(...bs);s+=`<g opacity=".75">`+rows.map(([y,v],i)=>`<path d="M${x+64} ${y}H${x+64-64*v}M${x+72-64*v} ${y-5}L${x+64-64*v} ${y}L${x+72-64*v} ${y+5}" fill="none" stroke="#2f6f97" stroke-width="1.6"/>`+(i===0?`<text x="${x+70}" y="${y+4}" font-size="11.5" fill="#2f6f97">current</text>`:i===rows.length-1?`<text x="${x+70}" y="${y+4}" font-size="11" fill="#2f6f97">slower</text>`:'')).join('')+`</g>`}
  }
  sc.labels.filter(l=>!l.isThis).forEach(label);
  return s;
}
