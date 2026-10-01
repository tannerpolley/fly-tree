/* Anatomy tab. */
import { FLIES, HOOK } from '../data/anatomy.js';
import { $ } from './dom.js';

export let curFly='dry';
export function drawAnat(){
  const F=FLIES[curFly];
  let s=HOOK;
  Object.entries(F.parts).forEach(([k,[lab,txt,pt,shape,lp]])=>{
    s+=`<g class="part" data-k="${k}">${shape}<circle cx="${pt[0]}" cy="${pt[1]}" r="5" fill="#c4622d" stroke="none"/></g>`;
    s+=`<line x1="${lp[0]+20}" y1="${lp[1]+3}" x2="${pt[0]}" y2="${pt[1]}" stroke="#c4622d" stroke-width="1" opacity=".5"/>`;
    s+=`<text class="lbl" x="${lp[0]}" y="${lp[1]}">${lab.split(' (')[0]}</text>`;
  });
  $('#anatSvg').innerHTML=s;
  showPart(Object.keys(F.parts)[0]);
}
export function showPart(k){
  const F=FLIES[curFly],[lab,txt]=F.parts[k];
  $('#anatPanel').innerHTML=`<div class="crumb">${F.name}</div><h2>${lab}</h2><div>${txt}</div><div class="dl"><b class="lab">All parts</b>${Object.entries(F.parts).map(([kk,v])=>`<span class="chip" data-p="${kk}">${v[0].split(' (')[0]}</span>`).join('')}</div>`;
  document.querySelectorAll('.part').forEach(p=>p.classList.toggle('sel',p.dataset.k===k));
}

export function initAnatomy(){
  $('#anatSvg').onclick=e=>{const p=e.target.closest('.part');if(p)showPart(p.dataset.k)};
  $('#anatPanel').onclick=e=>{if(e.target.dataset.p)showPart(e.target.dataset.p)};
  $('#anatTabs').innerHTML=Object.entries(FLIES).map(([k,v])=>`<button data-f="${k}" class="${k===curFly?'on':''}">${v.name}</button>`).join('');
  $('#anatTabs').onclick=e=>{if(e.target.dataset.f){curFly=e.target.dataset.f;document.querySelectorAll('#anatTabs button').forEach(b=>b.classList.toggle('on',b.dataset.f===curFly));drawAnat()}};
  drawAnat();
}
