/* Hover / tap explanation bubbles. */

/* hover / tap bubbles for rod and rig parts */
export const tb=document.createElement('div');
export function showTip(e){
  const t=e.target.closest&&e.target.closest('[data-tip]');
  if(!t){tb.style.display='none';return}
  const [a,b]=t.getAttribute('data-tip').split('|');
  tb.innerHTML=`<b>${a}</b>${b}`;tb.style.display='block';
  const w=tb.offsetWidth,hh=tb.offsetHeight;
  tb.style.left=Math.max(8,Math.min(innerWidth-w-10,e.clientX+14))+'px';
  tb.style.top=(e.clientY+hh+26>innerHeight?e.clientY-hh-14:e.clientY+18)+'px';
}

export function initTooltip(){
  tb.id='tipbubble';
  document.body.appendChild(tb);
  document.addEventListener('mousemove',showTip);
  document.addEventListener('click',showTip);
  addEventListener('scroll',()=>{tb.style.display='none'},{passive:true});
}
