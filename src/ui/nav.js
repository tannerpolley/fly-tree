/* Top tab navigation. */
import { $ } from './dom.js';
import { buildGallery, buildInsects } from './learn.js';
import { fixInfoHeight } from './tree.js';

export const TABS=[['tree','Family tree','🌳'],['gallery','Picture gallery','🖼️'],['insects','By insect','🦟'],['anat','Fly anatomy & materials','🪝'],['glossary','Glossary','📖'],['quiz','Quiz','❓'],['how','How to read it','💡']];

export function show(id){if(id==='tree')setTimeout(fixInfoHeight,0);if(id==='gallery')buildGallery();if(id==='insects')buildInsects();document.querySelectorAll('section').forEach(s=>s.classList.toggle('on',s.id===id));document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.id===id));history.replaceState(null,'','#/'+id);$('#cur').textContent=TABS.find(t=>t[0]===id)[1];setMenu(false);scrollTo(0,0)}

const setMenu=on=>{document.documentElement.classList.toggle('menu',on);$('#menu').setAttribute('aria-expanded',on)};

export function initNav(){
  $('#nav').innerHTML=TABS.map(([id,t,i])=>`<button data-id="${id}"><i>${i}</i>${t}</button>`).join('');
  $('#nav').onclick=e=>{const b=e.target.closest('button');if(b)show(b.dataset.id)};
  $('#menu').onclick=()=>setMenu(!document.documentElement.classList.contains('menu'));
  $('#scrim').onclick=()=>setMenu(false);
  addEventListener('keydown',e=>e.key==='Escape'&&setMenu(false));
}
