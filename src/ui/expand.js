/* Widescreen view for a diagram: its block is pinned over the whole page until closed (Esc or the Close button).
   Layout re-measuring is paused meanwhile (see tree.js), so turning a phone sideways doesn't rebuild the open diagram. */
export const isFull=()=>!!document.querySelector('.full');
export function toggleFull(el){
  const on=el.classList.toggle('full');
  document.documentElement.classList.toggle('hasfull',on);
  el.querySelectorAll('[data-full]').forEach(b=>{b.textContent=on?'✕ Close':'⛶ Expand'});
  if(!on)dispatchEvent(new Event('resize'));   // catch up on any size change that happened while open
}
export function initExpand(){
  document.addEventListener('click',e=>{const b=e.target.closest('[data-full]');if(b)toggleFull(b.closest('.rigblock,.wrap'))});
  document.addEventListener('keydown',e=>{const f=e.key==='Escape'&&document.querySelector('.full');if(f)toggleFull(f)});
}
