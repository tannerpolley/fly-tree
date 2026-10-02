/* Top tab navigation. */
import { $ } from './dom.js';
import { PIC, PIC_MODES, setPicMode } from './images.js';
import { buildGallery, buildInsects, renderQ } from './learn.js';
import { fixInfoHeight, sel, select } from './tree.js';

export const TABS=[['tree','Family tree'],['gallery','Picture gallery'],['insects','By insect'],['anat','Fly anatomy & materials'],['glossary','Glossary'],['quiz','Quiz'],['how','How to read it']];

export function show(id){if(id==='tree')setTimeout(fixInfoHeight,0);if(id==='gallery')buildGallery();if(id==='insects')buildInsects();document.querySelectorAll('section').forEach(s=>s.classList.toggle('on',s.id===id));document.querySelectorAll('nav button').forEach(b=>b.classList.toggle('on',b.dataset.id===id));history.replaceState(null,'','#/'+id)}

function drawPicMode(){
  $('#picmode').innerHTML='<span>Pictures:</span>'+PIC_MODES.map(([k,t])=>`<button data-pic="${k}" class="${k===PIC?'on':''}">${t}</button>`).join('');
}
export function initNav(){
  drawPicMode();
  $('#picmode').onclick=e=>{const m=e.target.dataset.pic;if(!m||m===PIC)return;setPicMode(m);drawPicMode();
    select(sel,false);buildGallery();buildInsects();if($('#quizBody').innerHTML)renderQ()};
  $('#nav').innerHTML=TABS.map(([id,t])=>`<button data-id="${id}">${t}</button>`).join('');
  $('#nav').onclick=e=>e.target.dataset.id&&show(e.target.dataset.id);
}
