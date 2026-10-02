/* Photo-style pictures of the flies (AI-generated, each checked against the real pattern).
   geometry.json holds where the hook eye and bend sit in each cut-out, so the rig diagram can tie the line on.
   A fly without a photo keeps using its drawn version. */
import { slugOf } from '../data/tree.js';
import geometry from '../assets/flies/geometry.json';

const files=import.meta.glob('../assets/flies/*.webp',{eager:true,query:'?url',import:'default'});
const file=n=>files[`../assets/flies/${n}.webp`]||null;

export function photoOf(name){
  const slug=slugOf(name),g=geometry[slug],studio=file(slug);
  if(!g||!studio)return null;
  return {...g,studio,cutout:file(slug+'-cutout')};
}
