/* Pick by water: tap a kind of water, set the conditions, get ranked ways to fish it.
   Picking a fly shows the same info panel (season, rig diagram, knots) as the family tree. */
import { DEPTHTIP, INPUTS, WATER, recommend } from '../data/water.js';
import { ALLN } from '../data/tree.js';
import { $ } from './dom.js';
import { flyImg } from './images.js';
import { info } from './info.js';
import { goTo } from './learn.js';
import { show } from './nav.js';

const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];
const st={id:'',fly:null,c:{month:new Date().getMonth()+1}};
const TAG={dry:'Surface',film:'In the film',terr:'Terrestrial',wet:'Swung',nymph:'Subsurface',egg:'Egg / worm',streamer:'Streamer'};

/* top-down river reach, flowing left to right out of a dam, with a lake beside it */
const RIVER='M72,92 C200,74 300,104 420,86 S590,96 650,100 L650,236 C560,248 470,228 380,246 S170,238 72,234 Z';
const ZONES=[['tail',72,160,'#7fb3d1','Tailwater'],['riffle',160,262,'#a9d3e8','Riffle'],['run',262,362,'#5f9cc4','Run'],['pool',362,472,'#2f6c97','Pool'],['flat',472,545,'#9cc9e0','Tailout'],['pocket',545,650,'#78b1d1','Pocket water']];
const chop=(x0,x1)=>{let s='';for(let x=x0+10;x<x1-14;x+=22)for(let y=112;y<226;y+=24)s+=`<path d="M${x+(y%48?11:0)},${y}q4-4 8,0" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/>`;return s};
const rocks=()=>[[565,130],[600,175],[630,128],[575,212],[622,220]].map(([x,y])=>`<path d="M${x+12},${y-6}q14,6 22,0" stroke="#fff" stroke-width="2" fill="none"/><ellipse cx="${x}" cy="${y}" rx="13" ry="10" fill="#8d8a80" stroke="#5f5c54"/>`).join('');
const label=(x,y,t)=>`<text x="${x}" y="${y}" text-anchor="middle" class="wlab">${t}</text>`;
function mapSVG(){
  const z=ZONES.map(([id,x0,x1,c,t])=>`<g class="wz" data-water="${id}"><rect x="${x0}" y="60" width="${x1-x0}" height="200" fill="${c}" clip-path="url(#river)"/>${id==='riffle'?chop(x0,x1):''}${id==='pocket'?rocks():''}${label((x0+x1)/2,id==='pocket'?256:172,t)}</g>`).join('');
  return `<svg viewBox="0 0 820 300" width="100%" role="group" aria-label="Kinds of water">
  <defs><clipPath id="river"><path d="${RIVER}"/></clipPath></defs>
  <rect width="820" height="300" rx="12" fill="#cfe0b4"/>
  <g class="wz" data-water="bank"><path d="M268,60 C320,58 380,62 470,56 L470,96 C400,98 330,92 268,100 Z" fill="#9b7b52"/>${[285,315,345,375,405,435,460].map(x=>`<path d="M${x},62l-5-12M${x},62l2-13M${x},62l7-10" stroke="#5e8a3a" stroke-width="2.4"/>`).join('')}${label(370,40,'Undercut bank')}</g>
  ${z}<g class="wz" data-water="seam"><path d="M262,150 C300,140 330,160 362,150" stroke="#fff" stroke-width="14" stroke-opacity=".01" fill="none"/><path d="M262,150 C300,140 330,160 362,150" stroke="#f4f1e4" stroke-width="3" stroke-dasharray="7 6" fill="none"/></g>
  <path d="${RIVER}" fill="none" stroke="#3f6f8f" stroke-width="2"/>
  <rect x="40" y="82" width="32" height="164" rx="3" fill="#9a9a96" stroke="#6b6b67"/><text x="56" y="272" text-anchor="middle" class="wsm">Dam</text>
  <text x="355" y="290" text-anchor="middle" class="wsm">flow →</text>
  <g class="wz" data-water="lake"><ellipse cx="738" cy="160" rx="66" ry="104" fill="#3d8aa6"/><ellipse cx="738" cy="160" rx="38" ry="64" fill="#2c6f8a"/>${label(738,165,'Lake / pond')}</g>
  </svg>`;
}
const sel=(k,lab,opts)=>`<label>${lab}<select data-c="${k}">${opts.map(([v,t])=>`<option value="${v}"${String(st.c[k]??'')===String(v)?' selected':''}>${t}</option>`).join('')}</select></label>`;
const form=()=>sel('month','Month',MON.map((m,i)=>[i+1,m]))+INPUTS.map(([k,l,o])=>sel(k,l,o)).join('')+'<button class="wclear" data-clear>Clear conditions</button>';
const fold=(key,title,body,open)=>`<details class="fold wfold" data-k="${key}"${open?' open':''}><summary class="glh"><h3>${title}</h3></summary>${body}</details>`;
const list=a=>`<ul class="wlist">${a.map(x=>`<li>${x}</li>`).join('')}</ul>`;
const flyCard=n=>`<div class="gcard${n===st.fly?' on':''}" data-fly="${n.id}">${flyImg(n.n,{studio:true})}<b>${n.n}</b><div>${n.z||''}</div></div>`;

function approach(a,i){
  const why=a.why.map(([d,t])=>`<span class="wwhy ${d>0?'up':'down'}">${d>0?'▲':'▼'} ${t}</span>`).join('');
  const tip=a.k.includes('nymph')&&a.t.includes('indicator')?`<div class="small">📏 ${DEPTHTIP[st.c.depth]||'Set the indicator about 1.5 times the water depth above the fly.'}</div>`:'';
  const flies=a.flies.length?`<div class="gal">${a.flies.map(flyCard).join('')}</div>`:`<p class="hint">None of these flies fish well in ${MON[st.c.month-1]}; try another way.</p>`;
  const panel=a.flies.includes(st.fly)?`<div class="card wpanel"><div style="text-align:right"><button class="expbtn" data-go="${st.fly.id}">🌳 See it in the family tree</button></div>${info(st.fly)}</div>`:'';
  return fold('ap'+a.t,`<span class="wnum">${i+1}</span>${a.t} ${a.k.map(t=>`<span class="fact">${TAG[t]}</span>`).join('')}`,
    `<div>${a.why}</div>${why?`<div class="wwhys">${why}</div>`:''}${list(a.how)}${tip}${flies}${panel}`,i===0||!!panel);
}
function out(){
  document.querySelectorAll('[data-water]').forEach(e=>e.classList.toggle('on',e.dataset.water===st.id));
  if(!st.id){$('#waterOut').innerHTML='<div class="card"><p class="hint" style="margin:0">Pick a kind of water above to see what to fish there.</p></div>';return}
  const W=WATER.find(w=>w.id===st.id),ap=recommend(st.id,st.c);
  if(!ap.some(a=>a.flies.includes(st.fly)))st.fly=(ap.find(a=>a.flies.length)||{flies:[]}).flies[0]||null;
  const was=new Map([...document.querySelectorAll('#waterOut [data-k]')].map(d=>[d.dataset.k,d.open]));
  $('#waterOut').innerHTML=`<div class="card"><h2 style="margin-top:0">${W.n}</h2><div>${W.d}</div>
    ${fold('spots','🐟 Where the fish hold',list(W.spots),true)}
    <h3 class="wh">Ways to fish it, best first</h3>${ap.map(approach).join('')}
    ${fold('wade','🥾 How to approach it',list(W.wade))}${fold('miss','⚠️ Common mistakes',list(W.miss))}</div>`;
  document.querySelectorAll('#waterOut [data-k]').forEach(d=>{if(was.has(d.dataset.k))d.open=was.get(d.dataset.k)||d.querySelector('.wpanel')!==null});
}
function pick(id){st.id=id;out();if(innerWidth<760)$('#waterOut').scrollIntoView({behavior:'smooth',block:'start'})}

export function initWater(){
  $('#waterMap').innerHTML=mapSVG();
  $('#waterChips').innerHTML=WATER.map(w=>`<button data-water="${w.id}">${w.n}</button>`).join('');
  $('#waterForm').innerHTML=form();
  $('#water').onclick=e=>{
    const w=e.target.closest('[data-water]'),f=e.target.closest('[data-fly]'),g=e.target.closest('[data-go]');
    if(w)pick(w.dataset.water);
    if(f){st.fly=ALLN[+f.dataset.fly];out()}
    if(g)goTo(ALLN[+g.dataset.go]);
    if(e.target.closest('[data-clear]')){st.c={month:st.c.month};$('#waterForm').innerHTML=form();out()}
  };
  $('#waterForm').onchange=e=>{const k=e.target.dataset.c;if(k){st.c[k]=k==='month'?+e.target.value:e.target.value;out()}};
  /* "Where to fish it" chips in any fly's info panel jump here */
  document.addEventListener('click',e=>{const p=e.target.closest('[data-pick]');if(p){show('water');pick(p.dataset.pick)}});
  out();
}
