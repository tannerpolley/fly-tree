/* Top tab navigation. */
import { $ } from './dom.js';
import { buildGallery, buildInsects } from './learn.js';
import { fixInfoHeight } from './tree.js';

export const TABS=[['tree','Family tree'],['gallery','Picture gallery'],['insects','By insect'],['anat','Fly anatomy & materials'],['glossary','Glossary'],['quiz','Quiz'],['how','How to read it']];

export function show(id){if(id==='tree')setTimeout(fixInfoHeight,0);if(id==='gallery')buildGallery();if(id==='insects')buildInsects();document.querySelectorAll('section').forEach(s=>s.classList.toggle('on',s.id===id));document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.id===id));history.replaceState(null,'','#/'+id)}

export function initNav(){
  $('#nav').innerHTML=TABS.map(([id,t])=>`<button data-id="${id}">${t}</button>`).join('');
  $('#nav').onclick=e=>e.target.dataset.id&&show(e.target.dataset.id);
}
