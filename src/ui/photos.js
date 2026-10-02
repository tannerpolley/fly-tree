/* Photo pictures of the flies, from two sources the user can compare:
   - ai:   AI-generated studio photos (src/assets/flies, with transparent cut-outs and hook geometry for the rig)
   - real: openly licensed photographs of real tied flies (src/assets/real-flies, credits.json holds author and licence)
   A fly without a photo of the chosen kind falls back to its drawing. */
import { slugOf } from '../data/tree.js';
import geometry from '../assets/flies/geometry.json';
import credits from '../assets/real-flies/credits.json';

const aiFiles=import.meta.glob('../assets/flies/*.webp',{eager:true,query:'?url',import:'default'});
const realFiles=import.meta.glob('../assets/real-flies/*.webp',{eager:true,query:'?url',import:'default'});

export function aiPhotoOf(name){
  const slug=slugOf(name),g=geometry[slug],studio=aiFiles[`../assets/flies/${slug}.webp`];
  if(!g||!studio)return null;
  return {...g,studio,cutout:aiFiles[`../assets/flies/${slug}-cutout.webp`]||null};
}
export function realPhotoOf(name){
  const slug=slugOf(name),c=credits[slug],url=realFiles[`../assets/real-flies/${slug}.webp`];
  return c&&url?{...c,url}:null;
}
export const photoCounts={ai:Object.keys(geometry).length,real:Object.keys(credits).length};
