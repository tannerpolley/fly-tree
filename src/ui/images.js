/* Fly pictures: each fly look is rendered once to an image and reused everywhere
   (tree cards, info close-up, gallery, quiz, rig diagram). */
import { A, VAR } from '../data/variants.js';
import { fly } from '../engine/fly.js';

/* While measuring the tallest info panel, pictures are replaced by same-size placeholders. */
export let MEASURE=false;
export function setMeasure(v){MEASURE=v}

const xml=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');

/* A fly as a standalone SVG document (must be valid XML to load as an image). */
export function flySVGDocument(name,o={}){
  const svg=fly(A(name),{q:o.q==null?2:o.q,studio:o.studio,bare:o.bare,noctx:o.noctx,label:xml(name)});
  const vb=svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  return {svg:svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace('width="100%"',`width="${vb[2]}" height="${vb[3]}"`),vb};
}

const IMGC={};
export function flyPic(name,o={}){
  const key=[name,VAR[name]||0,o.q==null?2:o.q,o.studio?1:0,o.bare?1:0,o.noctx?1:0].join('|');
  if(IMGC[key])return IMGC[key];
  const {svg,vb}=flySVGDocument(name,o);
  return IMGC[key]={url:URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'})),w:vb[2],h:vb[3],vb};
}
export const flyImg=(name,o={})=>{const p=flyPic(name,o);return `<img src="${p.url}" alt="${xml(name)}" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:${p.w}/${p.h};border-radius:8px">`};
