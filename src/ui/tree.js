/* Family tree chart: layout, drawing, selection and the info area. */
import { ALLN, TREE } from '../data/tree.js';
import { VAR } from '../data/variants.js';
import { r1 } from '../engine/core.js';
import { $ } from './dom.js';
import { flyImg, flyPic, setMeasure } from './images.js';
import { info } from './info.js';
import { goTo } from './learn.js';

export const open=new Set();export let sel=TREE;
export const reset=()=>{open.clear();ALLN.filter(n=>n.d<1&&n.k.length).forEach(n=>open.add(n.id))};


/* ---------- tree layout & draw ---------- */
export const TW=134,TH=54,TGX=142,TGY=86,LW=150,LHt=118,GAP=8;
export const wrap2=s=>{if(s.length<=17)return[s];const w=s.split(' ');let best=null;for(let i=1;i<w.length;i++){const a=w.slice(0,i).join(' '),b=w.slice(i).join(' '),m=Math.max(a.length,b.length);if(!best||m<best[0])best=[m,[a,b]]}return best?best[1]:[s]};
export const Yn=n=>n.d*TGY+6;
export const MAXROWS=Math.max(...TREE.k.flatMap(f=>f.k.map(g=>Math.ceil(g.k.length/6))));
export const CH=2*TGY+6+TH+26+(MAXROWS*(LHt+GAP)-GAP)+12+14;                       // tallest layout: root, family, group, picture tray
export const HALF=Math.max((TREE.k.length-1)/2*(TW+12)+TW/2,
  ...TREE.k.map(f=>(f.k.length-1)/2*TGX+TW/2),
  ...TREE.k.flatMap(f=>f.k.map(g=>{const r=Math.ceil(g.k.length/6),p=Math.ceil(g.k.length/r);return (p*(LW+GAP)-GAP)/2+10})))+6;   // widest layout
export const flyAt=(name,x,y,w)=>{const p=flyPic(name,{studio:true});return `<image href="${p.url}" x="${x}" y="${y}" width="${w}" height="${r1(w*p.h/p.w)}" preserveAspectRatio="xMidYMid meet" style="clip-path:inset(0 round 6px)"/>`};
export const isMobile=()=>innerWidth<760;
export let lastMode=isMobile();
export function curNode(){const oF=TREE.k.find(f=>open.has(f.id)),oG=oF?oF.k.find(g=>open.has(g.id)):null;return oG||oF||TREE}
export function drawMobile(){
  const cur=curNode(),path=[];for(let p=cur;p;p=p.p0)path.unshift(p);
  let s=`<div class="mnav">${cur!==TREE?'<button class="mback" data-back="1">◀ Back</button>':''}<span class="mcrumb">${path.map(p=>p.n).join(' › ')}</span></div>`;
  if(cur.k.length&&!cur.k[0].k.length)
    s+=`<div class="mgrid">${cur.k.map(c=>`<div class="node mleaf${c===sel?' sel':''}" data-id="${c.id}" style="border-color:${c.c}">${flyImg(c.n,{studio:true})}<b>${c.n}</b></div>`).join('')}</div>`;
  else s+=cur.k.map(c=>`<div class="node mcard" data-id="${c.id}" style="background:${c.c}">${c.n}<span>${c.k.length} inside ▸</span></div>`).join('');
  $('#treebox').innerHTML=s;
}
export function draw(){
  if(isMobile()){drawMobile();return}
  const FG=TW+12,rootOpen=open.has(TREE.id),fams=TREE.k;
  const oF=rootOpen?fams.find(f=>open.has(f.id)):null;
  const vis=[TREE];TREE.cx=0;
  if(rootOpen){
    fams.forEach((f,i)=>{f.cx=(i-(fams.length-1)/2)*FG;vis.push(f)});
    if(oF)oF.k.forEach((g,j)=>{g.cx=(j-(oF.k.length-1)/2)*TGX;vis.push(g)});
  }
  const oG=oF?oF.k.find(g=>open.has(g.id)):null;
  const nL=oG?oG.k.length:0,rows=Math.max(1,Math.ceil(nL/6)),per=Math.ceil(nL/rows)||1,tw=oG?per*(LW+GAP)-GAP:0,th=rows*(LHt+GAP)-GAP,trayY=2*TGY+6+TH+26;
  const half=HALF;
  let s='',tr='',lf='',bottom=oF?3*TGY:2*TGY;
  if(oG){
    const x0=-tw/2,gx=oG.cx,gy=Yn(oG)+TH,tx=x0+tw/2,m=(gy+trayY-6)/2;
    tr+=`<rect x="${x0-6}" y="${trayY-6}" width="${tw+12}" height="${th+12}" rx="10" fill="${oG.c}" opacity=".09" stroke="${oG.c}" stroke-dasharray="4 4"/><path class="link" d="M${gx},${gy}C${gx},${m} ${tx},${m} ${tx},${trayY-6}"/>`;
    oG.k.forEach((c,i)=>{
      const r=Math.floor(i/per),cnt=Math.min(per,nL-r*per),x=-(cnt*(LW+GAP)-GAP)/2+(i%per)*(LW+GAP),y=trayY+r*(LHt+GAP),lines=wrap2(c.n);
      lf+=`<g class="node leaf${c===sel?' sel':''}" data-id="${c.id}"><rect x="${x}" y="${y}" width="${LW}" height="${LHt}" rx="9" fill="#fff" stroke="${c.c}"/>${flyAt(c.n,x+6,y+6,LW-12)}`;
      lines.forEach((t,j)=>{lf+=`<text x="${x+LW/2}" y="${y+LHt-8-(lines.length-1-j)*13}" text-anchor="middle" fill="#1f2a30" font-weight="600">${t}</text>`});
      lf+='</g>'});
    bottom=trayY+th+12;
  }
  vis.forEach(n=>{if(n.k.length&&open.has(n.id)&&n.d<2)n.k.forEach(c=>{const x1=n.cx,y1=Yn(n)+TH,x2=c.cx,y2=Yn(c),m=(y1+y2)/2;s+=`<path class="link" d="M${x1},${y1}C${x1},${m} ${x2},${m} ${x2},${y2}"/>`})});
  vis.forEach(n=>{
    const x=n.cx-TW/2,y=Yn(n),lines=wrap2(n.n);
    s+=`<g class="node${n===sel?' sel':''}" data-id="${n.id}"><rect x="${x}" y="${y}" width="${TW}" height="${TH}" rx="8" fill="${n.c}" stroke="${n.c}"/>`;
    lines.forEach((t,i)=>{s+=`<text x="${x+TW/2}" y="${y+(lines.length>1?17:24)+i*13}" text-anchor="middle" fill="#fff" font-weight="600">${t}</text>`});
    s+=`<text x="${x+TW/2}" y="${y+TH-7}" text-anchor="middle" fill="#fff" opacity=".85" font-size="10.5">${open.has(n.id)?'▲ collapse':'▼ '+n.k.length+' inside'}</text>`;
    s+='</g>'});
  const h=CH;
  $('#treebox').innerHTML=`<svg viewBox="${-half} 0 ${2*half} ${h}" width="100%" style="display:block;margin:0 auto;max-width:${2*half}px">${tr}${s}${lf}</svg>`;
}

export const leavesFold=n=>{open.delete(n.id);n.k.forEach(leavesFold)};
export function select(n,toggle){
  sel=n;
  if(n.k.length&&toggle){
    if(open.has(n.id))leavesFold(n);
    else{(n.p0?n.p0.k:[]).forEach(sb=>{if(sb!==n)leavesFold(sb)});open.add(n.id)}}
  $('#infobox').innerHTML=info(n);draw();
}
export function fixInfoHeight(){
  const box=$('#infobox'),keep=sel;let max=0;
  box.style.height='auto';
  if(isMobile()){box.innerHTML=info(keep);return}
  setMeasure(true);ALLN.forEach(n=>{box.innerHTML=info(n);max=Math.max(max,box.scrollHeight)});setMeasure(false);
  box.style.height=max+'px';box.innerHTML=info(keep);
}
export let rz;



export function modeCheck(){const m=isMobile();if(m!==lastMode){lastMode=m;draw();fixInfoHeight()}}

export function initTree(){
  reset();
  addEventListener('resize',()=>{clearTimeout(rz);rz=setTimeout(fixInfoHeight,150)});
  $('#infobox').onclick=e=>{
  const sv=e.target.closest('[data-var]');
  if(sv){VAR[ALLN[+sv.dataset.var].n]=+sv.dataset.i;$('#infobox').innerHTML=info(sel);draw();return}
  const c=e.target.dataset.go;if(c!=null)goTo(ALLN[+c])};
  $('#treebox').onclick=e=>{
  if(e.target.closest('[data-back]')){const c=curNode();leavesFold(c);select(c.p0||TREE,false);return}
  const g=e.target.closest('.node');if(!g)return;
  const n=ALLN[+g.dataset.id];select(n,true);
  if(isMobile()&&!n.k.length)$('#infobox').scrollIntoView({behavior:'smooth',block:'start'});
};
  addEventListener('resize',modeCheck);
  addEventListener('load',modeCheck);
  if(window.ResizeObserver)new ResizeObserver(modeCheck).observe(document.documentElement);
  setTimeout(modeCheck,300);
  setTimeout(modeCheck,1200);
  $('#expAll').onclick=()=>{ALLN.filter(n=>n.k.length).forEach(n=>open.add(n.id));draw()};
  $('#colAll').onclick=()=>{open.clear();open.add(TREE.id);draw()};
  $('#reset').onclick=()=>{reset();select(TREE,false)};
  select(TREE,false);
  document.fonts&&document.fonts.ready.then(fixInfoHeight);
}
