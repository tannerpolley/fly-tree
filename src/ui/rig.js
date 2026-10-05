/* Rig diagram in the info area: a to-scale scene of the whole setup, zoom/pan, and a close-up card
   for any part on hover (mouse) or tap (touch). Geometry: rigscene.js; drawing: rigdraw.js; cards: rigcloseups.js. */
import { rigFlies, rigFor, rigKFor } from '../data/rigs.js';
import { buildScene } from './rigscene.js';
import { COLORS, overlaySVG, sceneSVG } from './rigdraw.js';
import { closeup, knotText, knotThumb } from './rigcloseups.js';
import { MEASURE, flyImg, flyPic } from './images.js';
import { aiPhotoOf } from './photos.js';
import { fixInfoHeight, isMobile } from './tree.js';

const ASPECT=2.35;
const SCENES=new Map();let nextId=0;
/* open/closed state of the collapsible parts, kept when another fly is selected */
let rigOpen=true,knotsOpen=null;   // knotsOpen is set on first use: isMobile() can't be called while modules load

function sceneFor(n){
  const r=rigFor(n),K=rigKFor(n);if(!r||!K)return null;
  return {r,K,sc:buildScene(K,r,rigFlies(n),name=>{const p=aiPhotoOf(name);return p&&p.eye?p:null})};
}
const imgOf=f=>{const p=flyPic(f.name,{bare:true});return {url:p.url,photo:p.kind==='ai'}};

export function rigHTML(n){
  const x=sceneFor(n);if(!x)return'';
  const {r,K,sc}=x,leaf=!n.k.length,name=leaf?n.n:'this fly';
  const knots=sc.knots;
  knotsOpen??=!isMobile();
  const knotRow=knots.length?`<details class="knotd"${knotsOpen?' open':''}><summary>🪢 <b>Knots to tie</b> <span class="small mute">· ${isMobile()?'tap':'hover over'} one for a bigger picture</span></summary><div class="knotrow">${knots.map((k,i)=>{const[t,d]=knotText(k.key);return `<span class="kchip" data-part="knot:${k.key}"><span class="kthumb">${knotThumb(k.key)}</span><span><i>${i+1}</i><b>${t}</b>: ${d}</span></span>`}).join('')}</div></details>`:'';
  const chips=`<div class="chain">${r.c.map((c,i)=>(i?'<i>→</i>':'')+(c.startsWith('★')?`<span class="fl">${name}${c.slice(1)}</span>`:`<span>${c}</span>`)).join('')}</div>`;
  const head=`<summary class="row rigsum"><span class="ic">🪢</span><div><b>Rig:</b> ${r.t} <span class="small mute">· to scale · ${isMobile()?'tap':'hover over'} any part for a close-up</span></div></summary>`;
  const parts=new Set(sc.strands.map(s=>s.part).concat(sc.items.map(i=>i.part)));
  const legend=`<div class="riglegend">${[['line','Fly line'],['sinktip','Sink-tip'],['leader','Leader'],['sighter','Sighter'],['tippet','Tippet'],['indicator','Indicator'],['shot','Split shot']].filter(([p])=>parts.has(p)).map(([p,t])=>`<span><i style="background:${COLORS[p]}"></i>${t}</span>`).join('')}<span class="mute">Lengths, depths and fly sizes are real; thin line and tiny parts are drawn a little thicker until you zoom in. ${isMobile()?'Swipe sideways to pan, pinch to zoom.':'Drag to pan; Ctrl + scroll or double-click to zoom.'}</span></div>`;
  const views=[['all','Whole rig'],['reel','Reel & grip'],['tip','Rod tip'],sc.views.junction&&['junction','Line → leader'],sc.views.rigging&&['rigging',sc.kind==='tight'?'Sighter & fly':'Indicator & flies'],['flies','Fly up close'],sc.views.fly2&&['fly2',sc.flies.find(f=>!f.isThis).role==='dropper'?'Dropper fly':'Top fly']].filter(Boolean);
  const tools=`<div class="rigtools">${views.map(([k,t])=>`<button data-view="${k}">${t}</button>`).join('')}<span class="rzoom"><button data-full aria-label="Fill the screen">⛶ Expand</button><button data-zoom="out" aria-label="Zoom out">−</button><button data-zoom="in" aria-label="Zoom in">+</button></span></div>`;
  const tail=`${knotRow}${isMobile()?chips:''}${r.n?`<div class="small mute" style="margin-left:34px">${r.n}</div>`:''}`;
  const wrap=body=>`<div class="rigblock"><details class="rigd"${rigOpen?' open':''}>${head}${body}</details></div>`;
  if(MEASURE)return wrap(`${tools}<div class="rigstage"></div>${legend}<div class="rigpin" hidden></div>${tail}`);
  const id='rig'+(nextId++);SCENES.set(id,{sc});
  setTimeout(mountAll,0);
  return wrap(`${tools}<div class="rigstage" data-rig="${id}"><svg class="rigscene" role="img" aria-label="To-scale rig diagram">${sceneSVG(sc,imgOf)}</svg><svg class="rigover"></svg></div>${legend}<div class="rigpin" hidden></div>${tail}`);
}

/* ---------------- view (viewBox) handling ---------------- */
function fit(rect,aspect){
  let [x0,y0,x1,y1]=rect,w=x1-x0,h=y1-y0;
  if(w/h<aspect){const nw=h*aspect;x0-=(nw-w)/2;w=nw}else{const nh=w/aspect;y0-=(nh-h)/2;h=nh}
  return [x0,y0,w,h];
}
function clamp(st,vb){
  const all=st.sc.views.all,aw=all[2]-all[0],ah=all[3]-all[1],[,,w0]=vb;
  let w=Math.min(Math.max(w0,.45),aw*1.7),h=w/st.aspect,cx=vb[0]+vb[2]/2,cy=vb[1]+vb[3]/2;
  cx=Math.min(Math.max(cx,all[0]-aw*.1),all[2]+aw*.1);cy=Math.min(Math.max(cy,all[1]-ah*.2),all[3]+ah*.2);
  return [cx-w/2,cy-h/2,w,h];
}
function setVB(st,vb){
  st.vb=clamp(st,vb);
  const W=st.el.clientWidth,H=st.el.clientHeight;if(!W)return;
  st.svg.setAttribute('viewBox',st.vb.join(' '));
  st.svg.style.setProperty('--u',st.vb[2]/W);
  st.over.setAttribute('viewBox',`0 0 ${W} ${H}`);
  st.over.innerHTML=overlaySVG(st.sc,st.vb,W,H,st.sc.knots);
}
const still=matchMedia('(prefers-reduced-motion: reduce)');
function animateTo(st,target,ms=420){
  cancelAnimationFrame(st.anim);if(still.matches)return setVB(st,target);
  const a=st.vb,b=clamp(st,target);let t0=null;
  const ca=[a[0]+a[2]/2,a[1]+a[3]/2],cb=[b[0]+b[2]/2,b[1]+b[3]/2];
  const step=now=>{if(t0===null)t0=now;let t=Math.min(1,(now-t0)/ms);t=t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2;
    const w=Math.exp(Math.log(a[2])+(Math.log(b[2])-Math.log(a[2]))*t),cx=ca[0]+(cb[0]-ca[0])*t,cy=ca[1]+(cb[1]-ca[1])*t;
    setVB(st,[cx-w/2,cy-w/st.aspect/2,w,w/st.aspect]);if(t<1)st.anim=requestAnimationFrame(step)};
  st.anim=requestAnimationFrame(step);
}
function zoomAt(st,factor,sx,sy){
  const W=st.el.clientWidth,H=st.el.clientHeight,[x,y,w,h]=st.vb,px=x+sx/W*w,py=y+sy/H*h,nw=w*factor,nh=h*factor;
  setVB(st,[px-(sx/W)*nw,py-(sy/H)*nh,nw,nh]);
}
function setActive(st,key){st.el.closest('.rigblock').querySelectorAll('[data-view]').forEach(b=>b.classList.toggle('on',b.dataset.view===key))}
function goView(st,key,animate=true){
  const r=st.sc.views[key];if(!r)return;const vb=fit(r,st.aspect);
  animate?animateTo(st,vb):setVB(st,vb);setActive(st,key);
}
function mount(el){
  const rec=SCENES.get(el.dataset.rig);if(!rec)return;
  el.dataset.m='1';
  const st={el,sc:rec.sc,svg:el.querySelector('.rigscene'),over:el.querySelector('.rigover'),aspect:ASPECT,vb:null,anim:0,ptrs:new Map()};
  el._rig=st;st.aspect=(el.clientWidth/el.clientHeight)||ASPECT;
  st.vb=fit(st.sc.views.all,st.aspect);goView(st,'all',false);
  if(window.ResizeObserver)new ResizeObserver(()=>{if(!el.isConnected)return;st.aspect=(el.clientWidth/el.clientHeight)||ASPECT;setVB(st,st.vb)}).observe(el);
}
function mountAll(){
  document.querySelectorAll('.rigstage[data-rig]:not([data-m])').forEach(mount);
  for(const id of SCENES.keys())if(!document.querySelector(`[data-rig="${id}"]`))SCENES.delete(id);
}

/* ---------------- close-up cards and highlighting ---------------- */
const card=document.createElement('div');card.id='rigcard';
function partAt(e){const t=e.target.closest&&e.target.closest('[data-part]');return t?t.dataset.part:null}
function partAtPoint(x,y){const el=document.elementFromPoint(x,y),t=el&&el.closest('[data-part]');return t?t.dataset.part:null}
function highlight(st,part){
  st.svg.querySelectorAll('.hot').forEach(x=>x.classList.remove('hot'));
  if(!part||part.startsWith('knot:')||part==='water')return;
  st.svg.querySelectorAll(`[data-p="${part}"]`).forEach(x=>x.classList.add('hot'));
}
function cardHTML(st,part){return closeup(part,st.sc,name=>flyImg(name,{studio:true}))}
function showCard(st,part,e){
  if(!part){card.style.display='none';card.dataset.part='';return}
  if(card.dataset.part!==part){card.innerHTML=cardHTML(st,part);card.dataset.part=part}
  card.style.display='block';
  const w=card.offsetWidth,h=card.offsetHeight,x=e.clientX+18+w>innerWidth?e.clientX-w-18:e.clientX+18,y=Math.min(innerHeight-h-8,Math.max(8,e.clientY-h/2));
  card.style.left=Math.max(8,x)+'px';card.style.top=y+'px';
}
function pin(st,part){
  const p=st.el.closest('.rigblock').querySelector('.rigpin');
  if(!part){p.hidden=true;return}
  p.innerHTML=`<button class="rpx" aria-label="Close">×</button>${cardHTML(st,part)}`;p.hidden=false;
}

export function initRig(){
  document.body.appendChild(card);
  const stOf=e=>{const s=e.target.closest&&e.target.closest('.rigstage');return s&&s._rig};
  document.addEventListener('click',e=>{
    const b=e.target.closest('[data-view],[data-zoom]');
    if(b){const st=b.closest('.rigblock').querySelector('.rigstage')._rig;if(!st)return;
      if(b.dataset.view)goView(st,b.dataset.view);
      else{const k=b.dataset.zoom==='in'?.55:1.8,[x,y,w,h]=st.vb;animateTo(st,[x+w*(1-k)/2,y+h*(1-k)/2,w*k,h*k],300);setActive(st,'')}
      return}
    if(e.target.closest('.rpx')){e.target.closest('.rigpin').hidden=true;return}
    const kc=e.target.closest('.kchip');   // touch has no hover: tap a knot to open its bigger picture
    if(kc&&matchMedia('(hover:none)').matches){const st=kc.closest('.rigblock').querySelector('.rigstage')._rig;if(st)pin(st,kc.dataset.part)}
  });
  /* the info pane keeps a constant height, so re-measure it when a fold opens or closes */
  document.addEventListener('toggle',e=>{
    const d=e.target,rig=d.classList.contains('rigd'),kn=d.classList.contains('knotd');
    if(!(rig||kn)||d.open===(rig?rigOpen:knotsOpen))return;
    if(rig)rigOpen=d.open;else knotsOpen=d.open;
    fixInfoHeight();
  },true);
  document.addEventListener('dblclick',e=>{const st=stOf(e);if(!st)return;const r=st.el.getBoundingClientRect();zoomAt(st,.4,e.clientX-r.left,e.clientY-r.top);setActive(st,'')});
  document.addEventListener('wheel',e=>{const st=stOf(e);if(!st||!(e.ctrlKey||e.metaKey))return;e.preventDefault();const r=st.el.getBoundingClientRect();zoomAt(st,Math.exp(e.deltaY*.0025),e.clientX-r.left,e.clientY-r.top);setActive(st,'')},{passive:false});
  document.addEventListener('pointerdown',e=>{const st=stOf(e);if(!st)return;st.ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY,x0:e.clientX,y0:e.clientY});st.moved=false;st.el.setPointerCapture&&st.el.setPointerCapture(e.pointerId)});
  document.addEventListener('pointermove',e=>{
    const kc=e.target.closest&&e.target.closest('.kchip');
    if(kc){const st=kc.closest('.rigblock').querySelector('.rigstage')._rig;if(st&&e.pointerType==='mouse'){showCard(st,kc.dataset.part,e);return}}
    const st=stOf(e);
    if(!st){if(card.style.display==='block'&&!(e.target.closest&&e.target.closest('#rigcard'))){card.style.display='none';card.dataset.part='';document.querySelectorAll('.rigscene .hot').forEach(x=>x.classList.remove('hot'))}return}
    const p=st.ptrs.get(e.pointerId);
    if(p){
      const dx=e.clientX-p.x,dy=e.clientY-p.y;p.x=e.clientX;p.y=e.clientY;
      if(Math.hypot(e.clientX-p.x0,e.clientY-p.y0)>4)st.moved=true;
      if(st.ptrs.size===2){const[a,b]=[...st.ptrs.values()],d=Math.hypot(a.x-b.x,a.y-b.y);if(st.pinch){const r=st.el.getBoundingClientRect();zoomAt(st,st.pinch/d,(a.x+b.x)/2-r.left,(a.y+b.y)/2-r.top)}st.pinch=d;setActive(st,'');return}
      if(st.moved){const u=st.vb[2]/st.el.clientWidth;setVB(st,[st.vb[0]-dx*u,st.vb[1]-(e.pointerType==='touch'?0:dy*u),st.vb[2],st.vb[3]]);st.el.classList.add('drag');setActive(st,'');card.style.display='none';return}
    }
    if(e.pointerType!=='mouse')return;
    const part=partAt(e);highlight(st,part==='water'?null:part);showCard(st,part==='water'?null:part,e);
  });
  const end=e=>{const st=stOf(e)||[...document.querySelectorAll('.rigstage')].map(x=>x._rig).find(s=>s&&s.ptrs.has(e.pointerId));if(!st)return;
    const tap=!st.moved&&st.ptrs.size===1;st.ptrs.delete(e.pointerId);if(st.ptrs.size<2)st.pinch=0;st.el.classList.remove('drag');
    if(tap&&e.type==='pointerup'){const part=partAtPoint(e.clientX,e.clientY);if(e.pointerType!=='mouse'||part==='water'){highlight(st,part);pin(st,part)}}};
  document.addEventListener('pointerup',end);document.addEventListener('pointercancel',end);
  document.addEventListener('pointerleave',e=>{if(e.target===document.documentElement)card.style.display='none'});
}
