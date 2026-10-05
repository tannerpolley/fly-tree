/* Fly pictures, rendered or loaded once and reused everywhere
   (tree cards, info close-up, gallery, quiz, rig diagram).
   Cards and close-ups show the AI photo; a fly without one shows its drawing.
   The rig diagram needs a transparent fly, so it uses the AI cut-out when there is one, else the drawing. */
import { VAR } from '../data/variants.js';
import { flySVGDocument } from '../engine/document.js';
import { xml } from '../engine/core.js';
import { aiPhotoOf } from './photos.js';

/* While measuring the tallest info panel, pictures are replaced by same-size placeholders. */
export let MEASURE=false;
export function setMeasure(v){MEASURE=v}

const IMGC={};
function drawn(name,o){
  const key=[name,VAR[name]||0,o.q==null?2:o.q,o.studio?1:0,o.bare?1:0,o.noctx?1:0].join('|');
  if(IMGC[key])return IMGC[key];
  const {svg,vb}=flySVGDocument(name,o);
  return IMGC[key]={url:URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'})),w:vb[2],h:vb[3],vb,kind:'drawn'};
}
/* {url,w,h,kind,geo?} for a fly. o.studio: studio picture; o.bare: transparent (rig); neither: drawn in its water. */
export function flyPic(name,o={}){
  if(o.bare){const ai=aiPhotoOf(name);return ai&&ai.cutout&&ai.eye?{url:ai.cutout,w:ai.cw,h:ai.ch,kind:'ai',geo:ai}:drawn(name,o)}
  if(o.studio||o.noctx){
    const ai=aiPhotoOf(name);if(ai)return {url:ai.studio,w:ai.w,h:ai.h,kind:'ai'}
  }
  return drawn(name,o);
}
export const flyImg=(name,o={})=>{const p=flyPic(name,o);return `<img src="${p.url}" alt="${xml(name)}" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:${p.w}/${p.h};border-radius:8px">`};

/* One line under a close-up: where the picture came from. */
export const picCredit=name=>flyPic(name,{studio:true}).kind==='ai'?'AI-generated image':'Illustration';
