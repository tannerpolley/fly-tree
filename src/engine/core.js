/* Fly illustration engine, part 1: shared drawing helpers, render context, hook, thread and metal parts.
   Convention: side view, hook eye (head) on the LEFT, tail on the RIGHT, lit from the upper left. */

export const VW=360,VH=190,Y=100;
export const C={tan:'#c9b37a',olive:'#6b7a3a',gray:'#8a8f94',brown:'#6a4a2e',black:'#222',yellow:'#e6c84a',orange:'#e08a2a',red:'#b83a2a',green:'#4f8f3a',white:'#f6f5ef',cream:'#efe3c4',gold:'#d8a63a',copper:'#c4733a',silver:'#c7ccd0',peach:'#f0a98a',rust:'#8a3d1e',dun:'#7d8388'};
export const ln=(x1,y1,x2,y2,c,w=1.5,op=1)=>`<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="${c}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/>`;
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
export const HKS=1.9,UPH=96,FANH=78,PSC=1.7,TS=1.7;      // proportion factors: hackle length, wing height, post height, tail length
export const hookDepth=h=>({std:76,long:68,xlong:62,grub:60})[h||'std'];

/* ---- render context (one fly at a time) ---- */
export let RC=null,FID=0;
export const RR=i=>rn(i*1.37+RC.seed);
export const fw=v=>Math.round(v*100)/100,r1=v=>Math.round(v*10)/10;
export const QN=n=>Math.max(2,Math.round(n*RC.dq));          // how many strands to draw at this detail level
export const gid=()=>RC.u+'_'+(RC.n++);
export function lg(stops,x1=0,y1=0,x2=0,y2=1,units){const id=gid();RC.defs+=`<linearGradient id="${id}" x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}"${units?` gradientUnits="${units}"`:''}>${stops.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('')}</linearGradient>`;return`url(#${id})`}
export function rg(stops,cx=.5,cy=.5,r=.5,fx=cx,fy=cy){const id=gid();RC.defs+=`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}" fx="${fx}" fy="${fy}">${stops.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('')}</radialGradient>`;return`url(#${id})`}
/* a tube-like vertical gradient for any colour (cached per colour) */
export function cyl(c){const k='cyl'+c;return RC.k[k]||(RC.k[k]=lg([[0,lt(c,.62)],[.14,lt(c,.3)],[.4,c],[.7,dk(c,.3)],[.9,dk(c,.16)],[1,dk(c,.5)]]))}
export const F=n=>`url(#${RC.u}${n})`;
/* stroke + tube helpers */
export const S=(d,col,w,op=1,ex='')=>`<path d="${d}" fill="none" stroke="${col}" stroke-width="${fw(w)}" stroke-linecap="round"${op<1?` opacity="${fw(op)}"`:''}${ex?' '+ex:''}/>`;
export function tube(d,c,w,o={}){const hi=o.hi||lt(c,.6),lo=o.lo||dk(c,.45);return S(d,lo,w+.9)+S(d,c,w)+`<g transform="translate(0,${fw(w*.26)})">${S(d,dk(c,.3),w*.42,.5)}</g><g transform="translate(${fw(-w*.1)},${fw(-w*.24)})">${S(d,hi,w*.4,.85)}${S(d,'#fff',w*.14,.55)}</g>`}
export const qpt=(p0,p1,p2,t)=>{const m=1-t;return[m*m*p0[0]+2*m*t*p1[0]+t*t*p2[0],m*m*p0[1]+2*m*t*p1[1]+t*t*p2[1]]};
export const qd=(a,b,c)=>`M${r1(a[0])} ${r1(a[1])}Q${r1(b[0])} ${r1(b[1])} ${r1(c[0])} ${r1(c[1])}`;
export function qsub(p0,p1,p2,a,b){const s0=qpt(p0,p1,p2,a),s2=qpt(p0,p1,p2,b),m=qpt(p0,p1,p2,(a+b)/2);return[s0,[2*m[0]-(s0[0]+s2[0])/2,2*m[1]-(s0[1]+s2[1])/2],s2]}
/* one hair/fibre: lighter along most of its length, darker tip (like elk hair or pheasant fibre) */
export function hair(p0,p1,p2,c,w,o={}){
  const tipC=o.tip||dk(c,.22),base=o.base||c,op=o.op==null?1:o.op;
  const seg=(a,b,ww,col)=>{const q=qsub(p0,p1,p2,a,b);return S(qd(q[0],q[1],q[2]),col,ww,op)};
  let s=seg(0,.55,w,base)+seg(.5,.82,w*.74,o.tipLen===0?base:lt(base,-.06>0?0:0))+seg(.78,1,w*.46,o.tipLen===0?base:tipC);
  return s;
}

/* ---- filters / backgrounds ---- */
/* Blur and texture filters, limited to the picture's own frame so they stay cheap on phones. */
export function filtersSVG(q,vb){
  const u=RC.u,[x,y,w,h]=vb.split(' ').map(Number),reg=`filterUnits="userSpaceOnUse" x="${r1(x-10)}" y="${r1(y-10)}" width="${r1(w+20)}" height="${r1(h+20)}"`;
  let s=`<filter id="${u}fs" ${reg}><feGaussianBlur stdDeviation=".42"/></filter><filter id="${u}fb" ${reg}><feGaussianBlur stdDeviation="1.0"/></filter><filter id="${u}fh" ${reg}><feGaussianBlur stdDeviation="3.2"/></filter>`;
  if(q>=2)s+=`<filter id="${u}fn" ${reg}><feTurbulence type="fractalNoise" baseFrequency="1.2" numOctaves="2" seed="7" result="n"/><feColorMatrix in="n" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1.6 -.55" result="a"/><feComposite in="a" in2="SourceAlpha" operator="in"/></filter>`;
  return s;
}
export function studioBG(cx,fy,sw){
  const g=rg([[0,'#fffefb'],[.55,'#f3f0e8'],[1,'#d8d2c4']],.5,.45,.75);
  let bk='';if(RC.q>=1)for(let i=0;i<7;i++)bk+=`<circle cx="${r1(cx-150+RR(i+500)*300)}" cy="${r1(fy-170+RR(i+510)*120)}" r="${fw(10+RR(i+520)*22)}" fill="${i%2?'#fff':'#e9dfc8'}" opacity="${fw(.12+RR(i+530)*.1)}" filter="${F('fh')}"/>`;
  const sh=RC.q>=1?`<ellipse cx="${r1(cx)}" cy="${r1(fy)}" rx="${r1(sw)}" ry="4.6" fill="#2c261c" opacity=".34" filter="${F('fh')}"/><ellipse cx="${r1(cx-6)}" cy="${r1(fy-1)}" rx="${r1(sw*.62)}" ry="1.8" fill="#2c261c" opacity=".3" filter="${F('fs')}"/>`:`<ellipse cx="${r1(cx)}" cy="${r1(fy)}" rx="${r1(sw*.95)}" ry="4" fill="#2c261c" opacity=".22"/>`;
  return `<rect x="-300" y="-300" width="1000" height="900" fill="${g}"/>${bk}${sh}`;
}
/* ---- hook: polished wire built from offset strokes, ringed eye, barbed point ---- */
export const HOOKFIN={bronze:['#86643a','#e3c28a','#2b1f10'],black:['#34383c','#98a0a7','#0b0c0d'],nickel:['#929aa1','#f6f9fb','#3a4046']};
export function hookSVG(hx,fin,artic,D,grub){
  const Fh=HOOKFIN[fin||'bronze'],Y0=grub?Y+16:Y;
  // shank -> round bend -> short straight point angled up toward the eye (gap ~ 0.62 D)
  const P=(a,b)=>`${r1(hx+a*D)} ${r1(Y0+b*D)}`;
  const bend=`M${hx} ${Y0}C${P(.4,0)} ${P(.58,.2)} ${P(.52,.46)}C${P(.46,.78)} ${P(.16,1.02)} ${P(-.12,.92)}C${P(-.3,.85)} ${P(-.44,.76)} ${P(-.56,.66)}`;
  const wire=(d,w)=>S(d,Fh[2],w+.9)+S(d,Fh[0],w)+`<g transform="translate(-.1,${fw(w*.28)})">${S(d,Fh[2],w*.36,.55)}</g><g transform="translate(-.1,${fw(-w*.25)})">${S(d,Fh[1],w*.4,.92)}${S(d,'#fff',w*.13,.7)}</g>`;
  let s=wire(grub?`M67 ${Y}Q150 ${Y-46} ${hx} ${Y0}`:`M67 ${Y}H${hx}`,3.1)+wire(bend,3.1);
  s+=`<circle cx="62" cy="${Y}" r="5.3" fill="none" stroke="${Fh[2]}" stroke-width="3.9"/><circle cx="62" cy="${Y}" r="5.3" fill="none" stroke="${Fh[0]}" stroke-width="2.9"/><path d="M57.4 ${Y-1.6}A5.2 5.2 0 0 1 63.6 ${Y-5}" fill="none" stroke="${Fh[1]}" stroke-width="1.3" stroke-linecap="round"/><path d="M58.2 ${Y+2.4}A5 5 0 0 0 64 ${Y+5.1}" fill="none" stroke="${Fh[2]}" stroke-width="1.1" opacity=".6"/>`;
  const ex=hx-.44*D,ey=Y0+.76*D,tx=-.9,ty=-.44,nx=.44,ny=-.9,tip=[ex+tx*13,ey+ty*13];
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
  const env=lg([[0,lt(c,.78)],[.4,lt(c,.28)],[.48,dk(c,.55)],[.6,dk(c,.12)],[1,lt(c,.3)]]);
  return `<g><circle cx="${cx}" cy="${cy}" r="${r+.45}" fill="${dk(c,.65)}"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${env}"/><g clip-path="url(#${id})"><circle cx="${cx}" cy="${cy}" r="${r}" fill="${rg([[0,'#fff',.55],[.4,'#fff',0],[.8,'#000',.12],[1,'#000',.5]],.34,.28,.8)}"/><ellipse cx="${fw(cx-r*.28)}" cy="${fw(cy-r*.42)}" rx="${fw(r*.42)}" ry="${fw(r*.2)}" fill="#fff" opacity=".85" transform="rotate(-24 ${fw(cx-r*.28)} ${fw(cy-r*.42)})"/><circle cx="${fw(cx-r*.5)}" cy="${fw(cy-r*.52)}" r="${fw(r*.1)}" fill="#fff"/><path d="M${fw(cx-r*.8)} ${fw(cy+r*.55)}Q${cx} ${fw(cy+r*1.05)} ${fw(cx+r*.85)} ${fw(cy+r*.3)}" fill="none" stroke="${lt(c,.55)}" stroke-width="${fw(r*.18)}" opacity=".6"/></g><ellipse cx="${fw(cx+r*.9)}" cy="${cy}" rx="${fw(Math.max(1.1,r*.2))}" ry="${fw(r*.5)}" fill="#0b0a09" opacity=".75"/></g>`;
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
