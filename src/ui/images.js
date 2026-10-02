/* Fly pictures, rendered or loaded once and reused everywhere
   (tree cards, info close-up, gallery, quiz, rig diagram). Photos win; drawings fill any gaps. */
import { VAR } from '../data/variants.js';
import { flySVGDocument } from '../engine/document.js';
import { photoOf } from './photos.js';

/* While measuring the tallest info panel, pictures are replaced by same-size placeholders. */
export let MEASURE=false;
export function setMeasure(v){MEASURE=v}

const xml=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const IMGC={};
/* {url,w,h,photo} for a fly. o.studio: studio picture; o.bare: transparent (rig); neither: drawn in its water. */
export function flyPic(name,o={}){
  const ph=photoOf(name);
  if(ph&&(o.studio||o.noctx))return {url:ph.studio,w:ph.w,h:ph.h,photo:true};
  if(ph&&o.bare&&ph.cutout&&ph.eye)return {url:ph.cutout,w:ph.cw,h:ph.ch,photo:true,geo:ph};
  const key=[name,VAR[name]||0,o.q==null?2:o.q,o.studio?1:0,o.bare?1:0,o.noctx?1:0].join('|');
  if(IMGC[key])return IMGC[key];
  const {svg,vb}=flySVGDocument(name,o);
  return IMGC[key]={url:URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'})),w:vb[2],h:vb[3],vb};
}
export const flyImg=(name,o={})=>{const p=flyPic(name,o);return `<img src="${p.url}" alt="${xml(name)}" loading="lazy" decoding="async" style="display:block;width:100%;height:auto;aspect-ratio:${p.w}/${p.h};border-radius:8px">`};
