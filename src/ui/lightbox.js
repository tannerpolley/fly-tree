/* Click a fly picture to see it enlarged. */
import { ALLN } from '../data/tree.js';
import { $ } from './dom.js';
import { flyImg } from './images.js';

export function initLightbox(){
  document.addEventListener('click',e=>{
  const z=e.target.closest&&e.target.closest('.zoomable');
  if(z){const n=ALLN[+z.dataset.zoom];$('#lbimg').innerHTML=flyImg(n.n,{studio:true});$('#lbcap').textContent=n.n+' — close-up';$('#lightbox').style.display='flex';return}
  if(e.target.id==='lightbox'||e.target.id==='lbclose')$('#lightbox').style.display='none';
});
  document.addEventListener('keydown',e=>{if(e.key==='Escape')$('#lightbox').style.display='none'});
}
