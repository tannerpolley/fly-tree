/* Pick by water: tap a kind of water on the river picture, get ways to fish it. */
import { rigFor } from '../data/rigs.js';
import { WATER, recommend } from '../data/water.js';
import { $ } from './dom.js';
import { flyImg } from './images.js';
import { goTo } from './learn.js';
import { ALLN } from '../data/tree.js';

const st={id:'',month:new Date().getMonth()+1,rising:''};
const MON=['January','February','March','April','May','June','July','August','September','October','November','December'];

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
  ${z}<path d="${RIVER}" fill="none" stroke="#3f6f8f" stroke-width="2"/>
  <rect x="40" y="82" width="32" height="164" rx="3" fill="#9a9a96" stroke="#6b6b67"/><text x="56" y="272" text-anchor="middle" class="wsm">Dam</text>
  <text x="355" y="290" text-anchor="middle" class="wsm">flow →</text>
  <g class="wz" data-water="lake"><ellipse cx="738" cy="160" rx="66" ry="104" fill="#3d8aa6"/><ellipse cx="738" cy="160" rx="38" ry="64" fill="#2c6f8a"/>${label(738,165,'Lake / pond')}</g>
  </svg>`;
}
const flyCard=n=>`<div class="gcard" data-go="${n.id}">${flyImg(n.n,{studio:true})}<b>${n.n}</b><div>${n.z||''}</div></div>`;
function chain(n){const r=rigFor(n);return r?`<div class="wchain">${r.c.map(c=>`<span>${c.replace('★','<b>your fly</b>')}</span>`).join('<em>→</em>')}</div>`:''}
function out(){
  document.querySelectorAll('[data-water]').forEach(e=>e.classList.toggle('on',e.dataset.water===st.id));
  if(!st.id){$('#waterOut').innerHTML='<p class="hint" style="margin:0">Pick a kind of water above to see what to fish there.</p>';return}
  const W=WATER.find(w=>w.id===st.id),ap=recommend(st.id,st.month,st.rising);
  $('#waterOut').innerHTML=`<h2 style="margin-top:0">${W.n}</h2><div>${W.d}</div><div class="small mute">${W.hold}</div>`+
    ap.map((a,i)=>`<div class="wapp"><h3><span class="wnum">${i+1}</span>${a.t}${a.top?' <span class="fact">on top</span>':''}</h3><div class="small">${a.why}</div>${a.flies[0]?chain(a.flies[0]):''}`+
      (a.flies.length?`<div class="gal">${a.flies.map(flyCard).join('')}</div>`:`<p class="hint">None of these flies fish well in ${MON[st.month-1]}; try another approach.</p>`)+'</div>').join('')+
    '<p class="hint">Tap a fly for its full rig diagram, sizes and how to fish it.</p>';
}
export function initWater(){
  $('#waterMap').innerHTML=mapSVG();
  $('#waterChips').innerHTML=WATER.map(w=>`<button data-water="${w.id}">${w.n}</button>`).join('');
  $('#waterMonth').innerHTML=MON.map((m,i)=>`<option value="${i+1}"${i+1===st.month?' selected':''}>${m}</option>`).join('');
  $('#water').onclick=e=>{
    const w=e.target.closest('[data-water]'),r=e.target.closest('[data-rise]'),g=e.target.closest('[data-go]');
    if(w){st.id=w.dataset.water;out();if(innerWidth<760)$('#waterOut').scrollIntoView({behavior:'smooth',block:'start'})}
    if(r){st.rising=r.dataset.rise;document.querySelectorAll('[data-rise]').forEach(b=>b.classList.toggle('on',b===r));out()}
    if(g)goTo(ALLN[+g.dataset.go]);
  };
  $('#waterMonth').onchange=e=>{st.month=+e.target.value;out()};
  out();
}
