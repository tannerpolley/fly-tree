/* Info area for the selected box: facts, season calendar, rig and notes. */
import { ART } from '../data/art.js';
import { DEPTHN, metaOf } from '../data/meta.js';
import { VAR, VARIANTS } from '../data/variants.js';
import { VIS } from '../data/vis.js';
import { figure } from './learn.js';
import { rigHTML } from './rig.js';

export const icoRiver=c=>`<svg width="22" height="18" viewBox="0 0 24 20"><path d="M1 5q3-3 6 0t6 0 6 0M1 11q3-3 6 0t6 0 6 0M1 17q3-3 6 0t6 0 6 0" fill="none" stroke="${c}" stroke-width="2" stroke-linecap="round"/></svg>`;
export const icoPond=c=>`<svg width="22" height="18" viewBox="0 0 24 20"><ellipse cx="12" cy="10" rx="10" ry="6" fill="none" stroke="${c}" stroke-width="2"/><ellipse cx="12" cy="10" rx="5" ry="3" fill="none" stroke="${c}" stroke-width="2"/></svg>`;
export const icoDepth=k=>{const y={surf:3,film:6,mid:11,bot:17,any:11}[k];return `<svg width="16" height="22" viewBox="0 0 16 22"><path d="M0 5q2-2 4 0t4 0 4 0 4 0" fill="none" stroke="#4d93bf" stroke-width="1.6"/><rect x="0" y="5" width="16" height="17" fill="#d6e9f5" opacity=".6"/><rect x="0" y="20" width="16" height="2" fill="#a89573"/>${k==='any'?'<path d="M8 3v17M5 7l3-4 3 4M5 16l3 4 3-4" stroke="#c4622d" stroke-width="1.6" fill="none"/>':`<circle cx="8" cy="${y}" r="3" fill="#c4622d"/>`}</svg>`};

export const fs=t=>{if(!t)return'';const m=t.match(/^.*?[.!?](?=\s+[A-Z“]|$)/);return m?m[0]:t};
export const strip=t=>t.replace(/<[^>]+>/g,'');
export function calHTML(set,c){
  return `<div class="cal">${[1,4,7,10].map((m,i)=>`<div class="se" style="grid-column:${m}/span 3">${['❄️','🌱','☀️','🍂'][i]}</div>`).join('')}${['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'].map((l,i)=>`<div class="${set.has(i+1)?'on':''}" style="${set.has(i+1)?`background:${c}`:''}">${l}</div>`).join('')}</div>`;
}
export function info(n){
  const path=[];for(let p=n;p;p=p.p0)path.unshift(p);
  const f=figure(n),m=metaOf(n),leaf=!n.k.length,a=ART[n.n];
  let t=`<div class="crumb">${path.map(p=>p.n).join(' › ')}</div><h2 style="color:${n.c}">${n.n}</h2>`;
  if(n.s)t+=`<div>${fs(n.s)}</div>`;
  const wl={r:icoRiver('#1d6fa5')+' River',s:icoPond('#2a8a6a')+' Still water'};
  const chipRow=(ic,lab,items)=>items?`<div class="row"><span class="ic tall">${ic}</span><span class="facts"><b>${lab}:</b> ${items}</span></div>`:'';
  if(m.m.size)t+=`<div class="row"><span class="ic">📅</span><div><b>Season:</b>${calHTML(m.m,n.c)}</div></div>`;
  t+=chipRow('💧','Water',[...m.w].sort().map(w=>`<span class="fact">${wl[w]}</span>`).join(''));
  t+=chipRow('⬇️','Depth',[...m.d].map(d=>`<span class="fact">${icoDepth(d)} ${DEPTHN[d]}</span>`).join(''));
  t+=chipRow('📏','Size',n.z?`<span class="fact">${n.z}</span>`:'');
  const vs=VARIANTS[n.n];
  if(leaf&&vs){const cur=VAR[n.n]||0;t+=`<div class="row"><span class="ic tall">🎨</span><span class="sw"><b>Colour:</b>${vs.map((v,i)=>`<button class="swb${i===cur?' on':''}" data-var="${n.id}" data-i="${i}" title="${v[0]}" aria-label="${v[0]}" style="background:${v[1]}"></button>`).join('')}<span class="small mute"> ${vs[cur][0]}</span></span></div>`}
  let u='';
  if(leaf&&a)u+=`<div class="row"><span class="ic">🔍</span><span><b>Spot it:</b> ${a.v}</span></div>`;
  else if(VIS[n.n])u+=`<div class="row"><span class="ic">🔍</span><ul>${VIS[n.n].slice(0,3).map(v=>`<li>${v}</li>`).join('')}</ul></div>`;
  if(n.i)u+=`<div class="row"><span class="ic">🪲</span><span><b>Imitates:</b> ${strip(n.i)}</span></div>`;
  if(n.h)u+=`<div class="row"><span class="ic">🎣</span><span>${fs(strip(n.h))}</span></div>`;
  if(n.k.length)u+=`<div class="row"><span class="ic">📂</span><span>${n.k.map(k=>`<span class="chip" data-go="${k.id}">${k.n}</span>`).join('')}</span></div>`;
  return `<div class="pgrid"><div>${t}</div><div>${f.img}</div></div><hr class="rowsep">${rigHTML(n)}<hr class="rowsep">${u}`;
}
