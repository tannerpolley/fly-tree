/* Fly illustration engine, part 3: frame and compose one fly into an SVG string. */
import { FANH, HKS, PSC, RC, THREAD, TS, UPH, Y, beginFly, filtersSVG, hookDepth, hookX, hookSVG, lg, lt, r1, studioBG, wraps, xml } from './core.js';
import { antennaeSVG, bodySVG, clawsSVG, flashSVG, hackleSVG, headSVG, legsSVG, sheathSVG, subBG, tailSVG, thoraxSVG, waterBG, wingSVG } from './parts.js';

/* ====================== compose one fly ======================
   o.q: 0 small card · 1 gallery card · 2 close-up;  o.studio: soft studio backdrop;  o.bare: no backdrop (rig diagram) */
/* where does the top of the fly reach, and how far right?  (so tall wings and long tails are never cut off) */
export function topExtent(a){
  let t=Y-14;const hk=a.hackle,w=a.wing,m=Math.min;
  if(hk&&(hk.t==='collar'||hk.t==='bushy'))t=m(t,Y-(hk.l||16)*HKS-2);
  if(hk&&hk.t==='parachute')t=m(t,Y-22-(hk.rx||94)*.22);
  if(a.collar)t=m(t,Y-(a.collar.l||18)*HKS-2);
  if(hk&&hk.t==='palmer')t=m(t,Y-8-(hk.l||14));
  if(hk&&hk.t==='soft')t=m(t,Y-3-(hk.l||16)*3.15);
  if(w){if(w.t==='upright')t=m(t,Y-10-(w.h||UPH)-4);else if(w.t==='spent')t=m(t,Y-20);else if(w.t==='fan')t=m(t,Y-18-(w.h||FANH)*(w.s||1)-4);else if(w.t==='post')t=m(t,Y-18-(w.h||40)*PSC-4);else if(w.t==='downwing')t=m(t,Y-(w.rise||34)-4);else if(w.t==='sw')t=m(t,Y-45);else if(w.t==='zstrip')t=m(t,Y-36);else if(w.t==='feather')t=m(t,Y-15-(w.width||17)*1.5);else if(w.t==='foam')t=m(t,Y-12-(w.h||10));else t=m(t,Y-16)}
  for(const post of[a.post,a.post2])if(post)t=m(t,Y-18-post.h*PSC-6);
  if(a.head&&a.head.t==='deer')t=m(t,Y-20);
  if(a.legs&&a.legs.up)t=m(t,Y-34);
  if(a.body&&a.body.t==='curl')t=m(t,Y-52);
  if(a.body&&a.body.t==='ant')t=m(t,Y-28);
  if(a.antenna)t=m(t,Y-18);
  return t;
}
export function bottomExtent(a){
  let b=Y+hookDepth(a.hook)+(a.hook==='grub'?16:0);const h=a.hackle;
  if(h&&h.t==='palmer')b=Math.max(b,Y+(h.base||6)+(h.l||16)*1.16+2);
  if(h&&h.t==='soft')b=Math.max(b,Y+3+(h.l||16)*3.15);
  if(h&&(h.t==='collar'||h.t==='bushy'))b=Math.max(b,Y+(h.l||16)*HKS+2);
  if(a.collar)b=Math.max(b,Y+(a.collar.l||16)*HKS+2);
  return b;
}
export function rightExtent(a,hx,D){
  let x=hx+.62*D;const t=a.tail;
  hx+=a.body&&a.body.extend||0;x=Math.max(x,hx+4);
  if(t)x=Math.max(x,hx+(t.t==='fibers'||t.t==='split'?Math.min(t.limit||120,(t.len||40)*TS):t.t==='strip'?(t.len||40)+34:t.t==='marabou'?(t.len||40)*1.1:(t.len||40)*1.15)+4);
  if(a.flash)x=Math.max(x,hx+58);
  if(a.wing&&a.wing.t==='downwing')x=Math.max(x,(a.wing.len||hx+14)+8);
  if(a.wing&&a.wing.t==='sw')x=Math.max(x,hx+(a.wing.len||44)+6);
  if(a.artic)x=Math.max(x,hx+60);
  if(a.wing&&a.wing.t==='zstrip')x=Math.max(x,hx+(a.wing.len||70)+8);
  if(a.wing&&a.wing.t==='zstrip')x+=26;
  if(a.wing&&a.wing.t==='feather')x=Math.max(x,hx+(a.wing.len||22)+6);
  if(a.body&&a.body.t==='worm')x=Math.max(x,286+(a.body.w||8)/2);
  return x;
}
export const bareScale=a=>238/(rightExtent(a,hookX(a.hook),hookDepth(a.hook))-62);
// Rig images retain their 238-unit horizontal span. Compress the vertical projection
// of tall flies enough to fit the fixed frame, keeping the hook eye stationary.
export function bareYScale(a){
  const top=a.flip?2*Y-bottomExtent(a):topExtent(a),bottom=a.flip?2*Y-topExtent(a):bottomExtent(a);
  return Math.min(bareScale(a),116/(Y-top),96/(bottom-Y));
}
export function frameVB(top,xmax,D,studio,xmin=48){
  const asp=studio?332/186:312/150,bottom=Y+D+(studio?24:8),topE=top-(studio?20:10);
  const W=Math.max(studio?312:262,(xmax-xmin)+(studio?36:14),(bottom-topE)*asp),H=W/asp,cx=(xmin+xmax)/2;
  return{vb:`${r1(cx-W/2)} ${r1(bottom-H)} ${r1(W)} ${r1(H)}`,cx,bottom};
}

/* ====================== compose one fly ======================
   o.q: 0 small card · 1 gallery card · 2 close-up;  o.studio: soft studio backdrop;  o.bare: no backdrop (rig diagram) */
export function fly(a,o={}){
  const q=Math.max(0,Math.min(2,o.q!=null?o.q:(o.hq?2:0))),hx=hookX(a.hook),D=hookDepth(a.hook);
  const ctx=o.bare?'bare':o.studio?'studio':o.noctx?'plain':(a.ctx||'sub');
  beginFly({n:0,defs:'',k:{},q,dq:[.32,.65,1][q],seed:[...(a.v||'x')].reduce((s,ch)=>s+ch.charCodeAt(0),0)%997});
  const top=a.flip?2*Y-bottomExtent(a)-4:Math.min(topExtent(a),a.hook==='grub'?Y-52:99),xmax=rightExtent(a,hx,D),dBot=(a.flip?2*Y-topExtent(a):bottomExtent(a))-Y,xmin=a.balance?46-(a.br||7)-2:48,fr=ctx==='bare'?{vb:'40 -20 360 220',cx:220,bottom:Y+D}:frameVB(top,xmax,dBot,ctx==='studio',xmin);
  RC.defs+=filtersSVG(q,fr.vb);
  let bg='',after='';
  if(ctx==='studio')bg=studioBG(fr.cx,Y+dBot+5,(xmax-56)*.56);
  else if(ctx==='surface'||ctx==='film'){const hk=a.hackle,wl=ctx==='film'?Y-1:(hk&&hk.t==='parachute'?Y-4:hk&&(hk.t==='collar'||hk.t==='bushy')?Y+Math.round((hk.l||16)*HKS*.82):a.collar?Y+Math.round((a.collar.l||18)*HKS*.8):Y+(a.body&&a.body.w1||6)+10);const w=waterBG(ctx,wl,hx,a);bg=w.s;after=w.after}
  else if(ctx==='plain')bg=`<rect x="-300" y="-300" width="1000" height="900" fill="${lg([[0,'#fffdf7'],[1,'#f1eee2']])}"/>`;
  else if(ctx==='sub')bg=subBG();
  const headR=a.bead&&!a.balance?(74+2*(a.br||7)-6):a.cone?94:(a.head&&a.head.t==='deer')?110:a.eyes?90:87,thr=a.thorax&&a.thorax.r||0,thCx=a.thorax?(a.thorax.x||headR+thr*.88):112;
  const thx=a.thorax?thCx+thr*.48:null,x0=hx-6+(a.body&&a.body.extend||0),x1=a.body&&a.body.x1||(thx||(a.bead&&!a.balance?(74+2*(a.br||7)-6+1):a.cone?93:(a.head&&a.head.t==='deer')?112:a.head?98:88));
  const fin=a.hk||(a.hook==='long'||a.hook==='xlong'?(a.ctx==='sub'&&a.wing&&a.wing.t==='sw'?'nickel':'bronze'):'bronze');
  const leg=legsSVG(a.legs,a.thorax?thCx-8:104),hk=hackleSVG(a.hackle,x0,x1),wg=wingSVG(a.wing,hx);
  let s='';
  s+=leg.b+hk.b+wg.b;
  s+=hookSVG(hx,fin,a.artic,D,a.hook==='grub');
  const tailX=hx+(a.body&&a.body.extend||0);
  s+=a.hook==='grub'?`<g transform="translate(0 16)">${tailSVG(a.tail,tailX)}</g>`:tailSVG(a.tail,tailX);
  if(a.flash)s+=flashSVG(a.flash,hx);
  s+=bodySVG(a.body,x0,x1,a);
  if(a.hook!=='grub'&&a.body&&(!a.body.t||a.body.t==='taper'))s+=wraps(x0-2.4,(a.body.w0||5)+.6,3,lt(a.thread||THREAD,.1),1);
  if(a.thorax)s+=thoraxSVG(a.thorax,thCx);
  if(a.sheath)s+=sheathSVG(a,a.sheath);
  s+=leg.f+wg.f+hk.f;
  if(a.collar){const cc=hackleSVG({t:'collar',...a.collar},x0,x1);s+=cc.b+cc.f}
  for(const post of[a.post,a.post2])if(post)s+=wingSVG({t:'post',...post},hx).f;
  if(a.claws)s+=clawsSVG(a.claws);
  if(a.antenna)s+=antennaeSVG();
  s+=headSVG(a);
  if(a.xtra)s+=a.xtra;
  if(a.flip)s=`<g transform="translate(0 ${2*Y}) scale(1 -1)">${s}</g>`;
  if(ctx==='bare')s=`<g transform="translate(62 100) scale(${bareScale(a)} ${bareYScale(a)}) translate(-62 -100)">${s}</g>`;
  s+=after;
  const hint=o.hint?`<text x="8" y="16" font-size="11" fill="#5d6b73" font-family="sans-serif">${xml(o.hint)}</text>`:'';
  return`<svg viewBox="${fr.vb}" width="${o.w||'100%'}" role="img" aria-label="${xml(o.label||'fly')}" style="display:block;border-radius:8px"><defs>${RC.defs}</defs>${bg}${s}${hint}</svg>`;
}
