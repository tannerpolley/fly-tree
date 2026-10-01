/* Picture gallery, by-insect view, quiz and glossary tabs. */
import { FLIES, HOOK } from '../data/anatomy.js';
import { ART } from '../data/art.js';
import { GCATS, GLOSS } from '../data/glossary.js';
import { ALLN, TREE } from '../data/tree.js';
import { INSECT_VIEW, LOOKALIKES, VIS } from '../data/vis.js';
import { $ } from './dom.js';
import { MEASURE, flyImg } from './images.js';
import { show } from './nav.js';
import { select } from './tree.js';

export const FAMC=n=>{while(n.d>1)n=n.p0;return n};
export const leavesOf=n=>n.k.length?n.k.flatMap(leavesOf):[n];

export const zoomImg=n=>MEASURE?'<div style="aspect-ratio:332/186"></div>':`<div class="zoomable" data-zoom="${n.id}" title="Click to enlarge">${flyImg(n.n,{studio:true})}<span class="zoomhint">🔍 Click to enlarge</span></div>`;
export const fig=(n,w)=>ART[n.n]?`<figure>${flyImg(n.n,{studio:true})}<figcaption>${n.n}</figcaption></figure>`:'';

export function figure(n){
  if(!n.k.length&&ART[n.n])return {img:zoomImg(n),txt:`<div class="dl"><b class="lab">Spot it</b>${ART[n.n].v}</div>`};
  let ls=leavesOf(n).filter(x=>ART[x.n]);
  if(n.d===0)ls=TREE.k.map(f=>leavesOf(f).find(x=>ART[x.n])).filter(Boolean);
  ls=ls.slice(0,6);
  const vis=VIS[n.n];
  return {img:`<div class="mont">${ls.map(x=>fig(x)).join('')}</div>`,txt:vis?`<div class="dl"><b class="lab">How to recognise this group by sight</b><ul style="margin:4px 0;padding-left:18px">${vis.map(v=>`<li>${v}</li>`).join('')}</ul></div>`:''};
}

export function goTo(n){open.clear();for(let p=n.p0;p;p=p.p0)open.add(p.id);if(n.k.length)open.add(n.id);show('tree');select(n,false)}
export const byName=nm=>ALLN.find(n=>n.n===nm);

export function buildGallery(){
  const rows=[
   ['Surface','Dry flies','Parachute Adams','Elk Hair Caddis','Hopper'],
   ['Surface film','Emergers','RS2','Sparkle Dun','Cripple'],
   ['Mid-water','Soft hackles & pupae','Partridge & Orange','Caddis pupa (Sparkle Pupa)','Pheasant Tail'],
   ['Near bottom','Heavy nymphs','Pat’s Rubber Legs','Czech Nymph','Zebra Midge'],
   ['Any depth','Streamers','Woolly Bugger','Clouser Minnow','Slumpbuster']];
  let h=`<div class="card"><h2 style="margin-top:0">Where each family rides in the water</h2><div class="small mute">Same fly shown in the water: the picture tells you the family.</div>${rows.map(r=>`<div class="colrow"><div><b>${r[0]}</b><div class="small mute">${r[1]}</div></div><div class="imgs">${r.slice(2).map(nm=>`<figure style="margin:0">${flyImg(nm)}<figcaption class="small" style="text-align:center">${nm}</figcaption></figure>`).join('')}</div></div>`).join('')}</div>`;
  TREE.k.forEach(f=>{
    const ls=leavesOf(f).filter(x=>ART[x.n]);
    h+=`<div class="famh" style="border-color:${f.c}"><h2 style="color:${f.c}">${f.n}</h2><span class="small mute">${ls.length} patterns</span></div>`;
    h+=`<div class="card"><b>Shared traits</b><ul class="traits">${(VIS[f.n]||[]).map(v=>`<li>${v}</li>`).join('')}</ul>`;
    f.k.forEach(g=>{const gl=leavesOf(g).filter(x=>ART[x.n]);h+=`<h3 style="margin:14px 0 4px;color:${g.c}">${g.n}</h3><div class="small mute" style="margin-bottom:6px">${(VIS[g.n]||[]).join(' ')}</div><div class="gal">${gl.map(x=>`<div class="gcard" data-go="${x.id}">${flyImg(x.n,{studio:true})}<b>${x.n}</b><div>${x.z||''} · ${ART[x.n].v}</div></div>`).join('')}</div>`});
    h+='</div>';
  });
  h+=`<div class="famh" style="border-color:#c4622d"><h2>Look-alike pairs (exam favourites)</h2></div>`+LOOKALIKES.map(([a,b,t])=>`<div class="card"><div class="pair"><figure style="margin:0">${flyImg(a,{studio:true})}<b>${a}</b></figure><figure style="margin:0">${flyImg(b,{studio:true})}<b>${b}</b></figure></div><div class="small" style="margin-top:6px">${t}</div></div>`).join('');
  $('#galleryBody').innerHTML=h;
  $('#galleryBody').onclick=e=>{const g=e.target.closest('[data-go]');if(g)goTo(ALLN[+g.dataset.go])};
}

export function buildInsects(){
  $('#insectBody').innerHTML=INSECT_VIEW.map(([ins,st])=>`<div class="card"><h2 style="margin-top:0">${ins}</h2><div class="small mute">One insect, several flies: one fly per life stage.</div><div class="life">${st.map(([lab,nm],i)=>`${i?'<span class="ar">➜</span>':''}<div class="st"><b>${lab}</b>${flyImg(nm,{studio:true})}<div class="small">${nm}</div></div>`).join('')}</div></div>`).join('');
}

/* ---------------- quiz ---------------- */
export const Q={mode:'family',score:0,total:0,streak:0,hint:false,cur:null};
export const shuf=a=>a.map(v=>[Math.random(),v]).sort((x,y)=>x[0]-y[0]).map(x=>x[1]);
export const rnd=a=>a[Math.floor(Math.random()*a.length)];
export function newQ(){
  const L=ALLN.filter(n=>!n.k.length&&ART[n.n]);
  let q={};
  if(Q.mode==='part'){
    const fk=rnd(Object.keys(FLIES)),F=FLIES[fk],pk=rnd(Object.keys(F.parts));
    const lab=k=>F.parts[k][0].split(' (')[0];
    q={kind:'part',fk,pk,answer:lab(pk),opts:shuf([lab(pk),...shuf(Object.keys(F.parts).filter(k=>lab(k)!==lab(pk)).map(lab)).slice(0,3)]),why:F.parts[pk][1]};
  }else{
    const n=rnd(L),f=FAMC(n),g=n.p0;
    let ans,opts;
    if(Q.mode==='family'){ans=f.n;opts=TREE.k.map(x=>x.n)}
    else if(Q.mode==='group'){ans=g.n;const gs=f.k.map(x=>x.n);const other=shuf(ALLN.filter(x=>x.d===2&&x!==g&&!gs.includes(x.n)).map(x=>x.n));opts=shuf([...new Set([...gs,...other])].filter(x=>x!==ans)).slice(0,3).concat(ans)}
    else{ans=n.n;const sib=shuf(leavesOf(f).filter(x=>x!==n&&ART[x.n]).map(x=>x.n)).slice(0,3);opts=[ans,...sib]}
    q={kind:'fly',n,answer:ans,opts:shuf(opts),why:`${ART[n.n].v} (${f.n} › ${g.n} › ${n.n})`};
  }
  Q.cur=q;renderQ();
}
export function partSVG(fk,pk){
  const F=FLIES[fk];
  let s=HOOK;
  Object.entries(F.parts).forEach(([k,[,,pt,shape]])=>{s+=`<g opacity="${k===pk?1:.35}">${shape}</g>`});
  const pt=F.parts[pk][2];
  s+=`<circle cx="${pt[0]}" cy="${pt[1]}" r="17" fill="none" stroke="#c4622d" stroke-width="3.5"/><circle cx="${pt[0]}" cy="${pt[1]}" r="3" fill="#c4622d"/>`;
  return `<svg viewBox="30 40 560 250" width="100%">${s}</svg>`;
}
export function renderQ(){
  const q=Q.cur,pic=q.kind==='part'?partSVG(q.fk,q.pk):flyImg(q.n.n,Q.hint?{}:{studio:true}).replace(/alt="[^"]*"/,'alt="mystery fly"');
  const prompt={family:'Which FAMILY is this fly?',group:'Which GROUP (branch) is this fly in?',pattern:'Which PATTERN is this?',part:'Name the circled part.'}[Q.mode];
  $('#quizBody').innerHTML=`<div class="card"><div style="display:flex;justify-content:space-between;flex-wrap:wrap"><b>${prompt}</b><span class="score">Score ${Q.score}/${Q.total} · Streak ${Q.streak}</span></div>
  <div style="max-width:560px;margin:10px 0">${pic}</div><div style="max-width:560px" id="opts">${q.opts.map(o=>`<button class="qopt">${o}</button>`).join('')}</div><div id="fb"></div></div>`;
  $('#opts').onclick=e=>{
    if(!e.target.classList.contains('qopt')||$('#fb').innerHTML)return;
    const ok=e.target.textContent===q.answer;Q.total++;Q.score+=ok;Q.streak=ok?Q.streak+1:0;
    document.querySelectorAll('.qopt').forEach(b=>{if(b.textContent===q.answer)b.classList.add('ok');else if(b===e.target)b.classList.add('bad')});
    $('#fb').innerHTML=`<div class="warn" style="background:${ok?'#e0f3e6':'#fff4e5'}"><b>${ok?'Correct':'It is '+q.answer}.</b> ${q.why}</div><button class="qopt" id="nx" style="text-align:center;font-weight:700">Next question ➜</button>`;
    $('#nx').onclick=newQ;
    document.querySelector('.score').textContent=`Score ${Q.score}/${Q.total} · Streak ${Q.streak}`;
  };
}
export function buildQuiz(){
  $('#quizTabs').innerHTML=[['family','Name the family'],['group','Name the group'],['pattern','Name the pattern'],['part','Label the part']].map(([k,t])=>`<button data-m="${k}" class="${k===Q.mode?'on':''}">${t}</button>`).join('')+`<label style="display:inline-flex;gap:6px;align-items:center;margin-left:10px;text-transform:none;font-size:14px"><input type="checkbox" id="hint"> show water level hint</label>`;
  $('#quizTabs').onclick=e=>{if(e.target.dataset.m){Q.mode=e.target.dataset.m;Q.score=Q.total=Q.streak=0;document.querySelectorAll('#quizTabs button').forEach(b=>b.classList.toggle('on',b.dataset.m===Q.mode));newQ()}};
  $('#quizTabs').onchange=e=>{if(e.target.id==='hint'){Q.hint=e.target.checked;renderQ()}};
  newQ();
}

export let glCat='all',glQ='';
export function buildGlossary(){
  const chips=[['all','All']].concat(Object.entries(GCATS).map(([k,v])=>[k,v[0]+' '+v[1]]));
  $('#glChips').innerHTML=chips.map(([k,t])=>`<button data-c="${k}" class="${k===glCat?'on':''}">${t}</button>`).join('');
  const q=glQ.trim().toLowerCase();
  const list=GLOSS.filter(g=>(glCat==='all'||g[1]===glCat)&&(!q||(g[0]+' '+g[2]).toLowerCase().includes(q)));
  let html='';
  Object.keys(GCATS).forEach(c=>{
    const items=list.filter(g=>g[1]===c).sort((a,b)=>a[0].localeCompare(b[0]));
    if(!items.length)return;
    html+=`<h2 class="glh">${GCATS[c][0]} ${GCATS[c][1]} <span class="mute small">(${items.length})</span></h2><div class="glgrid">${items.map(g=>`<div class="glcard"><b>${g[0]}</b><div>${g[2]}</div></div>`).join('')}</div>`;
  });
  $('#glBody').innerHTML=html||'<div class="card">No matching terms. Try a shorter word.</div>';
}
export function initLearn(){buildGallery();buildInsects();buildQuiz();buildGlossary()}

export function initLearnUI(){
  $('#glSearch').oninput=e=>{glQ=e.target.value;buildGlossary()};
  $('#glChips').onclick=e=>{if(e.target.dataset.c){glCat=e.target.dataset.c;buildGlossary()}};
}
