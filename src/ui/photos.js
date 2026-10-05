/* AI-generated studio photos of the flies (src/assets/flies), with transparent cut-outs and hook geometry for the rig. */
import { slugOf } from '../data/tree.js';
import geometry from '../assets/flies/geometry.json';

const aiFiles=import.meta.glob('../assets/flies/*.webp',{eager:true,query:'?url',import:'default'});

export function aiPhotoOf(name){
  const slug=slugOf(name),g=geometry[slug],studio=aiFiles[`../assets/flies/${slug}.webp`];
  if(!g||!studio)return null;
  return {...g,studio,cutout:aiFiles[`../assets/flies/${slug}-cutout.webp`]||null};
}
