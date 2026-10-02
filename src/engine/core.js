/* Fly illustration engine, part 1: shared drawing helpers, render context, hook, thread and metal parts.
   Convention: side view, hook eye (head) on the LEFT, tail on the RIGHT, lit from the upper left. */

export const VW=360,VH=190,Y=100;
export const C={tan:'#c9b37a',olive:'#6b7a3a',gray:'#8a8f94',brown:'#6a4a2e',black:'#222',yellow:'#e6c84a',orange:'#e08a2a',red:'#b83a2a',green:'#4f8f3a',white:'#f6f5ef',cream:'#efe3c4',gold:'#d8a63a',copper:'#c4733a',silver:'#c7ccd0',peach:'#f0a98a',rust:'#8a3d1e',dun:'#7d8388'};
export const ln=(x1,y1,x2,y2,c,w=1.5,op=1)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`;
export const xml=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export function shade(hex,k){
  if(typeof hex!=='string'||hex[0]!=='#')return hex;
  if(hex.length===4)hex='#'+[...hex.slice(1)].map(x=>x+x).join('');
  if(hex.length!==7)return hex;
  const n=parseInt(hex.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255,f=k<0?0:255,t=Math.abs(k),m=v=>Math.round(v+(f-v)*t);
  return `rgb(${m(r)},${m(g)},${m(b)})`;
}
export const dk=(c,k)=>shade(c,-k),lt=(c,k)=>shade(c,k);
export const rn=i=>{const x=Math.sin(i*127.1+311.7)*43758.5453;return x-Math.floor(x)};
export const THREAD='#3a2e22';
export const HKS=2.7,UPH=88,FANH=82,PSC=1.7,TS=2.35;
export const hookDepth=h=>({std:62,long:58,xlong:54,grub:54})[h||'std'];
export const hookX=h=>({std:228,long:266,xlong:290,grub:228})[h||'std'];
export const grubShank=hx=>[[67,Y],[150,Y-46],[hx,Y+16]];
// A point on the actual bend, also used by the dropper tippet in the rig.
export function hookBend(a){const D=hookDepth(a.hook),y=Y+(a.hook==='grub'?16:0)+.96*D;return[hookX(a.hook)+.3*D,a.flip?2*Y-y:y]}

/* ---- render context (one fly at a time) ---- */
export let RC=null,FID=0;
export const RR=i=>rn(i*1.37+RC.seed);
export const fw=v=>Math.round(v*100)/100,r1=v=>Math.round(v*10)/10;
export const QN=n=>Math.max(2,Math.round(n*RC.dq));          // how many strands to draw at this detail level
export const gid=()=>RC.u+'_'+(RC.n++);
export function lg(stops,x1=0,y1=0,x2=0,y2=1,units){const id=gid();RC.defs+=`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${units?` gradientUnits="${units}"`:''}>${stops.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('')}</linearGradient>`;return`url(#${id})`}
export function rg(stops,cx=.5,cy=.5,r=.5,fx=cx,fy=cy){const id=gid();RC.defs+=`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${fx}" fy="${fy}">${stops.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('')}</radialGradient>`;return`url(#${id})`}
/* a tube-like vertical gradient for any colour (cached per colour) */
export function cyl(c){const k='cyl'+c;return RC.k[k]||(RC.k[k]=lg([[0,lt(c,.18)],[.28,lt(c,.3)],[.46,c],[.8,dk(c,.35)],[1,dk(c,.62)]]))}
export const F=n=>`url(#${RC.u}${n})`;
/* stroke + tube helpers */
export const S=(d,col,w,op=1,ex='')=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="${fw(w)}" stroke-linecap="round"${op<1?` opacity="${fw(op)}"`:''}${ex?' '+ex:''}/>`;
export function tube(d,c,w,o={}){const hi=o.hi||lt(c,.6),lo=o.lo||dk(c,.45);return S(d,lo,w+.9)+S(d,c,w)+`<g transform="translate(0,${fw(w*.26)})">${S(d,dk(c,.3),w*.42,.5)}</g><g transform="translate(${fw(-w*.1)},${fw(-w*.24)})">${S(d,hi,w*.4,.85)}${S(d,'#fff',w*.14,.55)}</g>`}
export const qpt=(p0,p1,p2,t)=>{const m=1-t;return[m*m*p0[0]+2*m*t*p1[0]+t*t*p2[0],m*m*p0[1]+2*m*t*p1[1]+t*t*p2[1]]};
export const qd=(a,b,c)=>`M${r1(a[0])} ${r1(a[1])}Q${r1(b[0])} ${r1(b[1])} ${r1(c[0])} ${r1(c[1])}`;
export function qsub(p0,p1,p2,a,b){const s0=qpt(p0,p1,p2,a),s2=qpt(p0,p1,p2,b),m=qpt(p0,p1,p2,(a+b)/2);return[s0,[2*m[0]-(s0[0]+s2[0])/2,2*m[1]-(s0[1]+s2[1])/2],s2]}
/* A curved ribbon tapers to a true point. One filled path, no blunt line cap. */
export function hair(p0,p1,p2,c,w,o={}){
  if(RC.q===0)w*=1.6; // Keep fine fibres legible when the drawing is reduced to a phone card.
  const dx=p1[0]-p0[0],dy=p1[1]-p0[1],l=Math.hypot(dx,dy)||1,nx=-dy/l*w/2,ny=dx/l*w/2;
  const p=(x,y)=>`${r1(x)} ${r1(y)}`;
  let s=`<path d="M${p(p0[0]-nx,p0[1]-ny)}Q${p(p1[0]-nx*.55,p1[1]-ny*.55)} ${p(...p2)}Q${p(p1[0]+nx*.55,p1[1]+ny*.55)} ${p(p0[0]+nx,p0[1]+ny)}Z" fill="${o.base||c}" opacity="${fw(o.op??.82)}"/>`;
  if(o.bar){const period=o.period||3.2;s+=S(qd(p0,p1,p2),o.bar,w*.7,.78,`stroke-dasharray="${fw(period*.46)} ${fw(period*.54)}" stroke-dashoffset="${fw(o.offset||0)}"`)}
  if(o.tip){const q=qsub(p0,p1,p2,.7,1);s+=S(qd(...q),o.tip,w*.2,.45)}
  return s;
}

/* ---- filters / backgrounds ---- */
/* Blur and texture filters, limited to the picture's own frame so they stay cheap on phones. */
export function filtersSVG(q,vb){
  const u=RC.u,[x,y,w,h]=vb.split(' ').map(Number),reg=`filterUnits="userSpaceOnUse" x="${r1(x-10)}" y="${r1(y-10)}" width="${r1(w+20)}" height="${r1(h+20)}"`;
  let s=`<filter id="${u}fs" ${reg}><feGaussianBlur stdDeviation=".24"/></filter><filter id="${u}fb" ${reg}><feGaussianBlur stdDeviation=".65"/></filter><filter id="${u}fh" ${reg}><feGaussianBlur stdDeviation="4.5"/></filter>`;
  if(q>=2)s+=`<filter id="${u}fn" ${reg}><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.6 -.55" result="a"/><feComposite in="a" in2="SourceAlpha" operator="in"/></filter>`;
  return s;
}
export function studioBG(cx,fy,sw){
  const g=rg([[0,'#e9e8e4'],[.6,'#dedfd9'],[1,'#c8ccc8']],.42,.35,.85);
  const sh=`<ellipse cx="${r1(cx)}" cy="${r1(fy+12)}" rx="${r1(sw*.75)}" ry="5.8" fill="#37362f" opacity=".14" filter="${F('fh')}"/>`;
  return `<rect x="-300" y="-300" width="1000" height="900" fill="${g}"/>${sh}`;
}
/* ---- hook: polished wire built from offset strokes, ringed eye, barbed point ---- */
export const HOOKFIN={bronze:['#86643a','#e3c28a','#2b1f10'],black:['#34383c','#98a0a7','#0b0c0d'],nickel:['#929aa1','#f6f9fb','#3a4046']};
export function hookSVG(hx,fin,artic,D,grub){
  const Fh=HOOKFIN[fin||'bronze'],Y0=grub?Y+16:Y;
  // shank -> round bend -> short straight point angled up toward the eye (gap ~ 0.62 D)
  const P=(a,b)=>`${r1(hx+a*D)} ${r1(Y0+b*D)}`;
  const bend=`M${hx} ${Y0}C${P(.72,.05)} ${P(.76,.64)} ${P(.3,.96)}C${P(.1,1.09)} ${P(-.45,.93)} ${P(-.7,.84)}`;
  const wire=(d,w)=>S(d,Fh[2],w+.6)+S(d,Fh[0],w)+`<g transform="translate(-.15,${fw(w*.24)})">${S(d,Fh[2],w*.32,.7)}</g><g transform="translate(-.1,${fw(-w*.26)})">${S(d,Fh[1],w*.3,.9)}${S(d,'#fff',w*.08,.6)}</g>`;
  let s=wire(grub?qd(...grubShank(hx)):`M67 ${Y}H${hx}`,3)+wire(bend,3);
  s+=`<g transform="translate(62 100) rotate(-18) scale(1 .64) translate(-62 -100)"><circle cx="62" cy="${Y}" r="5.3" fill="none" stroke="${Fh[2]}" stroke-width="3.9"/><circle cx="62" cy="${Y}" r="5.3" fill="none" stroke="${Fh[0]}" stroke-width="2.9"/><path d="M57.4 ${Y-1.6}A5.2 5.2 0 0 1 63.6 ${Y-5}" fill="none" stroke="${Fh[1]}" stroke-width="1.3" stroke-linecap="round"/><path d="M58.2 ${Y+2.4}A5 5 0 0 0 64 ${Y+5.1}" fill="none" stroke="${Fh[2]}" stroke-width="1.1" opacity=".6"/></g>`;
  const ex=hx-.65*D,ey=Y0+.86*D,tx=-.99,ty=-.13,nx=.13,ny=-.99,tip=[ex+tx*19,ey+ty*19];
  s+=`<polygon points="${r1(ex+nx*1.6)},${r1(ey+ny*1.6)} ${r1(tip[0])},${r1(tip[1])} ${r1(ex-nx*1.6)},${r1(ey-ny*1.6)}" fill="${Fh[0]}" stroke="${Fh[2]}" stroke-width=".5" stroke-linejoin="round"/><path d="M${r1(ex+nx*.8)} ${r1(ey+ny*.8)}L${r1(tip[0]+nx*.2)} ${r1(tip[1])}" stroke="${Fh[1]}" stroke-width=".7" opacity=".9"/>`;
  const A=[ex+tx*7.5+nx*1.2,ey+ty*7.5+ny*1.2];s+=`<polygon points="${r1(A[0])},${r1(A[1])} ${r1(A[0]+nx*2.4-tx*3.4)},${r1(A[1]+ny*2.4-ty*3.4)} ${r1(A[0]-tx*4.4)},${r1(A[1]-ty*4.4)}" fill="${Fh[0]}" stroke="${Fh[2]}" stroke-width=".4" stroke-linejoin="round"/>`;
  if(artic)s+=wire(`M${hx} ${Y}H${hx+34}`,2.7)+wire(`M${hx+34} ${Y}C${hx+54} ${Y} ${hx+58} ${Y+30} ${hx+40} ${Y+32}`,2.7)+`<circle cx="${hx+2}" cy="${Y}" r="3" fill="none" stroke="${Fh[0]}" stroke-width="1.5"/>`;
  return s;
}

/* ---- thread: wraps of tying thread ---- */
export function wraps(x,wd,n,c,dir=1){
  let s='';const k=cyl(c);
  for(let i=0;i<n;i++){const xx=x+i*dir*1.2;s+=`<ellipse cx="${fw(xx)}" cy="${Y}" rx=".95" ry="${fw(wd)}" fill="${k}" stroke="${dk(c,.5)}" stroke-width=".22" transform="rotate(${i%2?-5:5} ${fw(xx)} ${Y})"/>`}
  return s+`<path d="M${fw(x-1)} ${fw(Y-wd*.72)}H${fw(x+n*1.2*dir)}" stroke="#fff" stroke-width=".7" opacity=".3"/>`;
}
export function threadHead(c,x0=68){
  c=c||THREAD;const k=cyl(c);
  let s=`<path d="M${x0} ${Y-2.2}C${x0+4} ${Y-4.8} ${x0+12} ${Y-5.6} ${x0+19} ${Y-4.8}L${x0+19} ${Y+4.8}C${x0+12} ${Y+5.6} ${x0+4} ${Y+4.8} ${x0} ${Y+2.2}Z" fill="${k}" stroke="${dk(c,.55)}" stroke-width=".4"/>`;
  for(let i=0;i<11;i++){const xx=x0+1.5+i*1.55,h=Math.min(5.2,3.2+i*.38);s+=`<path d="M${fw(xx)} ${fw(Y-h)}q${i%2?-.9:.9} ${fw(h)} 0 ${fw(2*h)}" fill="none" stroke="${i%2?lt(c,.35):dk(c,.5)}" stroke-width=".6" opacity=".6"/>`}
  return s+`<path d="M${x0+3} ${Y-3.4}Q${x0+11} ${Y-5} ${x0+18} ${Y-3.8}" fill="none" stroke="#fff" stroke-width="1.3" opacity=".42" stroke-linecap="round"/>`;
}
/* ---- metal parts ---- */
export function bead(cx,cy,r,c){
  const id=gid();RC.defs+=`<clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>`;
  let texture='';
  for(let i=0;i<QN(44);i++){
    const x=cx+(RR(i+320)*2-1)*r,y=cy+(RR(i+322)*2-1)*r;
    texture+=`<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${fw(.15+RR(i+324)*r*.07)}" ry="${fw(.12+RR(i+325)*r*.04)}" fill="${i%2?lt(c,.6):dk(c,.6)}" opacity=".3"/>`;
  }
  const env=rg([[0,lt(c,.76)],[.32,lt(c,.2)],[.62,c],[.87,dk(c,.38)],[1,dk(c,.68)]],.36,.3,.84);
  return `<circle cx="${cx}" cy="${cy}" r="${r+.3}" fill="${dk(c,.72)}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${env}"/><g clip-path="url(#${id})"><g transform="translate(${cx} ${cy}) scale(${r})"><path d="M-.8 .12Q-.6 -.12 -.44 .12Q-.15 .34 .08 .04Q.35 -.15 .76 .13L.84 .35Q.5 .5 .27 .4Q-.05 .66 -.4 .44L-.73 .45Z" fill="${dk(c,.78)}" opacity=".9"/><path d="M-.65 -.43Q-.28 -.86 .2 -.5L.08 -.02Q-.26 .19 -.61 -.19Z" fill="#fff8e9" opacity=".88"/><path d="M-.71 -.38Q-.51 -.74 -.13 -.8" fill="none" stroke="#fff" stroke-width=".05" opacity=".8"/><path d="M-.74 .47Q-.2 .99 .63 .54" fill="none" stroke="${lt(c,.55)}" stroke-width=".09" opacity=".55"/></g>${texture}</g><ellipse cx="${fw(cx+r*.94)}" cy="${cy}" rx="${fw(r*.14)}" ry="${fw(r*.48)}" fill="#15120c" opacity=".9"/>`;
}
export function coneHead(c){
  const g=lg([[0,lt(c,.75)],[.28,lt(c,.25)],[.46,dk(c,.5)],[.62,dk(c,.1)],[1,lt(c,.35)]]);
  return `<path d="M63 ${Y}L94 ${Y-10.4}L94 ${Y+10.4}Z" fill="${g}" stroke="${dk(c,.6)}" stroke-width=".8"/><path d="M66 ${Y-1}L92 ${Y-8.6}" stroke="#fff" stroke-width="1.7" opacity=".7" stroke-linecap="round"/><path d="M72 ${Y-3.2}v6.4M80 ${Y-6}v12M88 ${Y-8.6}v17" stroke="#000" stroke-width=".7" opacity=".16"/><ellipse cx="94" cy="${Y}" rx="2.4" ry="10.4" fill="${dk(c,.55)}"/><ellipse cx="94.4" cy="${Y}" rx="1.1" ry="5.6" fill="#0b0a09" opacity=".7"/>`;
}
export function dumbbell(c,top){
  const sph=(x,y,r,o)=>{const id=gid();RC.defs+=`<clipPath id="${id}"><circle cx="${x}" cy="${y}" r="${r}"/></clipPath>`;return`<g opacity="${o}"><circle cx="${x}" cy="${y}" r="${r+.5}" fill="#1a1512"/><circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/><g clip-path="url(#${id})"><circle cx="${x}" cy="${y}" r="${r}" fill="${rg([[0,'#fff',.6],[.45,'#fff',0],[1,'#000',.5]],.34,.28,.85)}"/></g><circle cx="${x}" cy="${y}" r="${r*.42}" fill="#0c0a09"/><circle cx="${fw(x-r*.16)}" cy="${fw(y-r*.2)}" r="${fw(r*.14)}" fill="#fff" opacity=".9"/><ellipse cx="${fw(x-r*.35)}" cy="${fw(y-r*.5)}" rx="${fw(r*.35)}" ry="${fw(r*.16)}" fill="#fff" opacity=".7"/></g>`};
  const sg=top?-1:1;return `<path d="M90 ${Y+10.6*sg}H99" stroke="#2a2724" stroke-width="3"/>`+sph(93.5,Y+12.6*sg,6.4,.55)+sph(96.5,Y+9.6*sg,6.8,1);
}

/* start a new fly: every gradient/filter id of this fly is prefixed with a unique id */
export function beginFly(o){RC=o;RC.u='g'+(FID++);return RC}
