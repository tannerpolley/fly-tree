/* Rig diagram: rod, line, leader, tippet, knots and the fly, with hover explanations. */
import { ART } from '../data/art.js';
import { GENERIC, firstLeaf, rigFor, rigKFor } from '../data/rigs.js';
import { ALLN } from '../data/tree.js';
import { hookDepth, r1, rn } from '../engine/core.js';
import { flyPic } from './images.js';
import { isMobile } from './tree.js';

export function rigParts(c){
  const p={tip:[]};
  c.forEach(x=>{
    if(x[0]==='★'||x.includes('→'))return;
    if(/rod/i.test(x))p.rod=x;
    else if(/sighter/i.test(x))p.sighter=x;
    else if(/split shot/i.test(x))p.shot=x;
    else if(/^indicator$/i.test(x))p.ind=x;
    else if(/leader/i.test(x))p.leader=x;
    else if(/\bline\b/i.test(x))p.line=x;
    else if(/tippet|″|\dX/.test(x)&&!/nymph|dry fly/.test(x))p.tip.push(x);
  });
  return p;
}
export const sizeNum=z=>{const m=(z||'').match(/\d+/g);return m?m.map(Number).reduce((x,y)=>x+y,0)/m.length:12};
export const flyW=sz=>Math.max(80,Math.min(160,214-sz*7));          // hook size #20 draws small, #2 draws big (width of 312 fly units)
export function rigSVG(n,r,K){
  const two=K.k==='indicator'&&K.f.length>1,W=780,H=two?344:K.k==='drydrop'?320:(K.k==='dry'||K.k==='film')?244:K.k==='streamer'?272:286,wl=118,leaf=!n.k.length,esc=t=>String(t).replace(/&/g,'&amp;');
  const P=rigParts(r.c),thisLeaf=leaf?n:firstLeaf(n),thisArt=thisLeaf.n,thisName=leaf?n.n:'this fly';
  const nodeOf=i=>K.f[i]==='this'?thisLeaf:ALLN.find(x=>x.n===GENERIC[K.f[i]]);
  const szTxt=i=>{const z=nodeOf(i)&&nodeOf(i).z;return z?' · '+z:''};
  const fwOf=i=>flyW(sizeNum(nodeOf(i)&&nodeOf(i).z));
  // a drawn fly is 238 units from eye to tail inside its 312-unit frame; a photo cut-out is scaled to the same length
  const photoScale=(g,w)=>w*238/312/(g.box[2]-g.box[0]);
  const put=(name,ex,ey,w,al)=>{const p=flyPic(name,{bare:true});
    if(p.geo){const s=photoScale(p.geo,w);return `<image href="${p.url}" x="${r1(ex-p.geo.eye[0]*s)}" y="${r1(ey-p.geo.eye[1]*s)}" width="${r1(p.w*s)}" height="${r1(p.h*s)}" opacity="${al}"/>`}
    const s=w/312;return `<image href="${p.url}" x="${r1(ex-22*s)}" y="${r1(ey-120*s)}" width="${r1(360*s)}" height="${r1(220*s)}" opacity="${al}"/>`};
  const bend=(name,ex,ey,w)=>{const p=flyPic(name,{bare:true});
    if(p.geo){const s=photoScale(p.geo,w);return[ex+(p.geo.bend[0]-p.geo.eye[0])*s,ey+(p.geo.bend[1]-p.geo.eye[1])*s]}
    const a=ART[name],hx=({std:228,long:266,xlong:290,grub:228})[a.hook||'std'],D=hookDepth(a.hook),s=w/312;return[ex+(hx+.02*D-62)*s,ey+.97*D*s]};
  const lab=(x,y,t,anc='start',col='#1f2a30',wt=500)=>`<text x="${x}" y="${y}" font-size="13" font-weight="${wt}" fill="${col}" stroke="#fff" stroke-width="3.4" paint-order="stroke" text-anchor="${anc}" font-family="system-ui,sans-serif">${esc(t)}</text>`;
  const flyNames=K.f.map((f,i)=>f==='this'?thisArt:GENERIC[f]);
  const isThis=i=>K.f[i]==='this';
  const flyLabel=(i,x,y,an='start')=>isThis(i)?lab(x,y,'★ '+thisName+szTxt(i),an,'#c4622d',700):lab(x,y,K.f[i]+' (example)'+szTxt(i),an,'#6b7a85',500);
  const under=(ey,w)=>ey+80*(w/312)+19;
  // colour code: fly line (gold) → leader (teal) → tippet (rose); thinner each step
  const LINE='#f2c230',SINK='#3b4650',LEAD='#2f8f86',TIP='#d4527a',SIGHT='#9bd12f';
  const stroke=(d,col,w,op=1)=>`<path d="${d}" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="${w+1.1}" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" opacity="${op}"/><path d="${d}" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="${Math.max(.6,w/4)}" stroke-linecap="round" transform="translate(0,-${w/4})"/>`;
  const taper=(x1,y1,x2,y2,w1,w2,col)=>{const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy),nx=-dy/L,ny=dx/L;return`<polygon points="${x1+nx*w1/2},${y1+ny*w1/2} ${x2+nx*w2/2},${y2+ny*w2/2} ${x2-nx*w2/2},${y2-ny*w2/2} ${x1-nx*w1/2},${y1-ny*w1/2}" fill="${col}" stroke="#000" stroke-opacity=".25" stroke-width=".6" stroke-linejoin="round"/>`};
  const knot=(x,y,col)=>`<circle cx="${x}" cy="${y}" r="2.2" fill="${col}" stroke="#fff" stroke-width="1"/>`;
  const TIPS={
    rod:['Fly rod','The flexible blank stores energy in the cast. A 9′ 5wt is the all-round trout rod; its “wt” number must match your fly line.'],
    grip:['Grip (cork)','Where your hand holds the rod. Cork stays comfortable when wet.'],
    reel:['Reel','Holds the fly line (and backing underneath). For trout it mostly stores line; the drag helps when a big fish runs.'],
    guides:['Guides','Rings that carry the line along the rod. The line is threaded through every one, out to the tip.'],
    line:['Fly line','Thick, coated line. Its weight is what you actually cast, not the fly. Floating lines sit on the surface.'],
    sinktip:['Sink-tip section','A short sinking section at the end of a floating line. It pulls the streamer down while the rest stays on top.'],
    leader:['Leader','Clear tapered line, thick at the line end and thin at the tip. It turns the fly over and hides the heavy line from the fish. 9′ is typical; longer is stealthier.'],
    ring:['Tippet ring','A tiny metal ring at the leader tip. You tie new tippet to it, so the leader never shortens when you change tippet. Optional but popular.'],
    tippet:['Tippet','The thin, replaceable last section. A higher X number means thinner and stealthier but weaker. Replace it as it shortens or frays.'],
    ind:['Strike indicator','A float on the leader. If it dips, twitches or stops, a fish may have taken the fly. Set it so the fly drifts near the bottom.'],
    shot:['Split shot','Small weights pinched on the line to sink the nymph. Add until the fly ticks bottom now and then. Put it 8–12″ above the first fly.'],
    sighter:['Sighter','A brightly coloured section of leader used in tight-line nymphing instead of an indicator. You watch it for strikes.'],
    dropper:['Dropper','A second fly on its own short tippet tied to the first fly. It fishes at a different depth than the top fly.'],
    fly:['The fly','Shown enlarged for visibility, sized by its hook size. The hook eye is where the tippet ties on.']
  };
  const KNOTS={
    loop:['Line → leader','Loop-to-loop (quickest) or a nail knot. Joins the thick fly line to the thicker butt end of the leader.'],
    ring:['Leader → tippet ring','Improved clinch knot: tie the leader tip to the ring, and tie the tippet to the other side of the ring the same way. Moisten before pulling tight.'],
    fly:['Tippet → fly','Improved clinch knot through the hook eye (5 turns, tuck, wet, pull tight). Moisten it first or the line weakens.'],
    loopfly:['Leader → fly','A non-slip loop knot lets a streamer swing freely. An improved clinch also works.'],
    drop:['Dropper tippet → top fly','Improved clinch knot around the bend of the top fly’s hook, leaving the dropper 14–24″ long.'],
    dfly:['Dropper tippet → dropper fly','Improved clinch knot through the dropper fly’s hook eye.'],
    sight:['Sighter → tippet','A small knot (surgeon’s or clinch to a ring) joins the coloured sighter to the tippet.']
  };
  const esc2=t=>String(t).replace(/&/g,'&amp;').replace(/"/g,'&quot;');
  const dtip=(arr)=>`data-tip="${esc2(arr[0])}|${esc2(arr[1])}" style="pointer-events:all;cursor:help"`;
  let HIT='',HIT2='';
  const hitPath=(d,arr,w=11)=>{HIT+=`<path d="${d}" fill="none" stroke="rgba(255,255,255,0.001)" stroke-width="${w}" stroke-linecap="round" ${dtip(arr)}/>`};
  const hitCircle=(x,y,rr,arr)=>{HIT2+=`<circle cx="${x}" cy="${y}" r="${rr}" fill="rgba(255,255,255,0.001)" ${dtip(arr)}/>`};
  const hitRect=(x,y,w,hh,arr)=>{HIT+=`<rect x="${x}" y="${y}" width="${w}" height="${hh}" rx="8" fill="rgba(255,255,255,0.001)" ${dtip(arr)}/>`};
  const ringAt=(x,y)=>`<circle cx="${x}" cy="${y}" r="4" fill="none" stroke="#6f7a83" stroke-width="2.2"/><circle cx="${x}" cy="${y}" r="4" fill="none" stroke="#e8edf0" stroke-width=".8" stroke-dasharray="3 6"/>`;
  const knotList=[],badgeQ=[];
  const badge=(key,tx,ty)=>{knotList.push(key);badgeQ.push([key,tx,ty])};
  const layBadges=()=>{
    let last=-99,out='';
    badgeQ.sort((p,q)=>p[1]-q[1]);knotList.length=0;badgeQ.forEach(q=>knotList.push(q[0]));
    badgeQ.forEach(([key,tx,ty],i)=>{
      const bx=Math.max(tx,last+24);last=bx;
      out+=`<path d="M${bx} 22L${tx} ${ty-4}" fill="none" stroke="#37566b" stroke-width="1" stroke-dasharray="2 3" opacity=".55"/><circle cx="${tx}" cy="${ty}" r="2.6" fill="#37566b" opacity=".8"/>`;
      HIT2+=`<g ${dtip(KNOTS[key])}><circle cx="${bx}" cy="13" r="9" fill="#fff" stroke="#37566b" stroke-width="1.5"/><text x="${bx}" y="17.2" text-anchor="middle" font-size="12" font-weight="700" fill="#37566b" font-family="system-ui,sans-serif">${i+1}</text></g>`;
    });
    return out;
  };
  const tipLine=(d,w=1.05)=>{hitPath(d,TIPS.tippet,9);return stroke(d,TIP,w)};
  const leadLine=(d,w=1.55)=>{hitPath(d,TIPS.leader,10);return stroke(d,LEAD,w)};
  const lineLine=(d,w=2.8)=>{hitPath(d,TIPS.line,9);return stroke(d,LINE,w)};
  const sinkLine=d=>{hitPath(d,TIPS.sinktip,10);return stroke(d,SINK,3.8)};
  const sightLine=d=>{hitPath(d,TIPS.sighter,10);return stroke(d,SIGHT,3)};
  const flyHit=(i,ex,ey,w)=>hitRect(ex-4,ey-w*150/312*.5,w*.9,w*150/312*.8,((K.k==='drydrop'||two)&&i===1)?TIPS.dropper:(isThis(i)?TIPS.fly:['Example fly','A typical fly for this position; choose any pattern of that type.']));
  let s=`<defs><linearGradient id="rgS" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffdf7"/><stop offset="1" stop-color="#f1eee2"/></linearGradient><linearGradient id="rgW" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d9ebf6"/><stop offset="1" stop-color="#a9cbe0"/></linearGradient><linearGradient id="rgR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a5159"/><stop offset="1" stop-color="#1f2326"/></linearGradient></defs>`;
  s+=`<rect width="${W}" height="${H}" fill="url(#rgS)"/><rect y="${wl}" width="${W}" height="${H-wl}" fill="url(#rgW)"/><path d="M0 ${wl}H${W}" stroke="#4d93bf" stroke-width="2"/>`;
  for(let i=0;i<14;i++)s+=`<path d="M${30+i*55+rn(i)*20} ${wl+14+rn(i+4)*(H-wl-44)}h${14+rn(i+2)*26}" stroke="#fff" stroke-width="1" opacity=".4"/>`;
  // rod (9 ft ≈ 200 px here: leader and rod are drawn at about the same scale): tapered blank, cork grip, reel, guides
  const B=[8,106],T=[198,22],dx=T[0]-B[0],dy=T[1]-B[1],RL=Math.hypot(dx,dy),nx=-dy/RL,ny=dx/RL;
  s+=`<polygon points="${B[0]+nx*3.6},${B[1]+ny*3.6} ${T[0]+nx*.8},${T[1]+ny*.8} ${T[0]-nx*.8},${T[1]-ny*.8} ${B[0]-nx*3.6},${B[1]-ny*3.6}" fill="url(#rgR)"/>`;
  const at=t=>[B[0]+dx*t,B[1]+dy*t];
  s+=`<path d="M${B[0]} ${B[1]}L${at(.2)[0]} ${at(.2)[1]}" stroke="#d2a86f" stroke-width="12" stroke-linecap="round"/><path d="M${B[0]} ${B[1]}L${at(.2)[0]} ${at(.2)[1]}" stroke="#8a6a3a" stroke-width="12" stroke-linecap="round" stroke-dasharray="1.5 4" opacity=".35"/><path d="M${at(.2)[0]-3} ${at(.2)[1]+5}L${at(.24)[0]-3} ${at(.24)[1]+5}" stroke="#b7791f" stroke-width="2.4"/>`;
  s+=`<circle cx="30" cy="116" r="13" fill="#5b6670" stroke="#2f3a43" stroke-width="2"/><circle cx="30" cy="116" r="10.2" fill="none" stroke="#f2c230" stroke-width="3.6"/><circle cx="30" cy="116" r="10.2" fill="none" stroke="#000" stroke-opacity=".18" stroke-width="3.6" stroke-dasharray="1 2.2"/><circle cx="30" cy="116" r="6" fill="#9aa5ae" stroke="#2f3a43"/><circle cx="30" cy="116" r="2" fill="#2f3a43"/><path d="M30 103V97" stroke="#2f3a43" stroke-width="3"/>`;
  const gT=[.27,.38,.5,.62,.74,.85,.95,1.0],gc=gT.map((t,i)=>{const o=5.2-i*.52,p=at(t);return[p[0]-nx*o,p[1]-ny*o,3.8-i*.3]});
  gc.forEach(g=>{s+=`<circle cx="${g[0]}" cy="${g[1]}" r="${g[2]}" fill="none" stroke="#9aa1a8" stroke-width="1.5"/><circle cx="${g[0]}" cy="${g[1]}" r="${g[2]}" fill="none" stroke="#fff" stroke-width=".5" opacity=".6"/>`});
  const GT=gc[gc.length-1],rl=`M36 104L${gc.map(g=>g[0]+' '+g[1]).join('L')}`;
  s+=`<path d="${rl}" fill="none" stroke="#000" stroke-opacity=".22" stroke-width="3.9" stroke-linejoin="round" stroke-linecap="round"/><path d="${rl}" fill="none" stroke="#f2c230" stroke-width="2.8" stroke-linejoin="round" stroke-linecap="round"/>`;
  hitPath(`M${B[0]} ${B[1]}L${T[0]} ${T[1]}`,TIPS.rod,11);hitPath(`M${B[0]} ${B[1]}L${at(.2)[0]} ${at(.2)[1]}`,TIPS.grip,16);hitCircle(30,116,15,TIPS.reel);hitPath(rl,TIPS.line,8);gc.forEach(g=>hitCircle(g[0],g[1],6.5,TIPS.guides));
  s+=lab(14,18,'Rod','start','#5d6b73',600)+(P.rod?lab(14,34,P.rod.replace(/\s*rod/i,''),'start','#1f2a30',600):'');
  const Lx=336,lineSeg=(x2)=>lineLine(`M${GT[0]} ${GT[1]}C240 26 288 66 ${Lx-26} ${wl-3}L${x2} ${wl-3}`);
  const lineLab=K.k==='tight'?'':K.sink?lab(262,66,P.line||'Fly line','end'):lab(262,64,P.line||'Fly line','end');
  const fl=(name,ex,ey,w,al=1)=>put(name,ex,ey,w,al);
  const lead=(x1,y1,x2,y2)=>{hitPath(`M${x1} ${y1}L${x2} ${y2}`,TIPS.leader,10);return taper(x1,y1,x2,y2,2.6,1.3,LEAD)};
  if(K.k==='dry'||K.k==='film'){
    const w=fwOf(0),sc=w/312,ex=Lx+215,ey=K.k==='film'?wl+1:wl-24*sc,kx=ex-52,ky=wl-7;
    s+=lineSeg(Lx)+lead(Lx,wl-3,kx,ky)+tipLine(`M${kx} ${ky}Q${kx+28} ${ky+3} ${ex} ${ey}`)+knot(Lx,wl-3,'#fff')+ringAt(kx,ky);
    hitCircle(kx,ky,8,TIPS.ring);badge('loop',Lx,wl-3);badge('ring',kx,ky);badge('fly',ex,ey);
    flyHit(0,ex,ey,w);s+=fl(flyNames[0],ex,ey,w)+lineLab+lab((Lx+kx)/2,wl-17,P.leader||'Leader','middle','#1d6e68')+lab(ex-28,wl+24,P.tip[0]||'tippet','end','#a43a5e');
    s+=flyLabel(0,ex+6,Math.max(under(ey,w)+2,wl+54))+lab(ex+6,Math.max(under(ey,w)+2,wl+54)+17,K.k==='film'?'rides in the surface film':'floats on the surface','start','#5d6b73',400);
  }else if(K.k==='drydrop'){
    const w=fwOf(0),sc=w/312,ex=Lx+150,ey=wl-24*sc,dw=fwOf(1),dy=wl+108,b=bend(flyNames[0],ex,ey,w),dx=b[0]+34,kx=ex-48,ky=wl-7;
    s+=lineSeg(Lx)+lead(Lx,wl-3,kx,ky)+tipLine(`M${kx} ${ky}Q${kx+24} ${ky+3} ${ex} ${ey}`)+knot(Lx,wl-3,'#fff')+ringAt(kx,ky);
    hitCircle(kx,ky,8,TIPS.ring);badge('loop',Lx,wl-3);badge('ring',kx,ky);badge('fly',ex,ey);badge('drop',b[0],b[1]);badge('dfly',dx,dy);
    s+=tipLine(`M${b[0]} ${b[1]}C${b[0]} ${b[1]+44} ${dx-30} ${dy-40} ${dx} ${dy}`)+knot(b[0],b[1],TIP);
    flyHit(0,ex,ey,w);flyHit(1,dx,dy,dw);s+=fl(flyNames[0],ex,ey,w,isThis(0)?1:.6)+fl(flyNames[1],dx,dy,dw,isThis(1)?1:.6);
    s+=lineLab+lab(Lx+4,wl+24,P.leader||'Leader','start','#1d6e68')+lab(b[0]+8,b[1]+40,P.tip[P.tip.length-1]||'dropper tippet','start','#a43a5e')+flyLabel(0,ex-4,wl+34)+flyLabel(1,Math.min(dx+dw*.9,W-12),under(dy,dw),'end');
  }else if(K.k==='indicator'){
    const ix=368,sx=432,sy=wl+36,fw=fwOf(0),ex=two?446:470,ey=two?wl+58:wl+68;
    s+=lineSeg(Lx)+lead(Lx,wl-3,ix-9,wl-6)+leadLine(`M${ix+9} ${wl-2}Q${ix+34} ${wl+14} ${sx} ${sy-2}`)+knot(Lx,wl-3,'#fff');
    s+=`<circle cx="${ix}" cy="${wl-7}" r="10" fill="#e8742a" stroke="#a84c12"/><circle cx="${ix-3}" cy="${wl-10}" r="3.2" fill="#fff" opacity=".6"/>`;
    s+=tipLine(`M${sx} ${sy-2}Q${sx+14} ${ey-22} ${ex} ${ey}`)+ringAt(sx,sy-3)+`<circle cx="${sx+3}" cy="${sy+8}" r="4.6" fill="#6a6f74" stroke="#3d4247"/><circle cx="${sx+9}" cy="${sy+13}" r="4.2" fill="#7c8186" stroke="#3d4247"/>`;
    hitCircle(sx,sy-3,8,TIPS.ring);hitCircle(sx+6,sy+10,9,TIPS.shot);hitCircle(ix,wl-7,13,TIPS.ind);badge('loop',Lx,wl-3);badge('ring',sx,sy-3);badge('fly',ex,ey);
    flyHit(0,ex,ey,fw);s+=fl(flyNames[0],ex,ey,fw,isThis(0)?1:.6);
    if(two){const w2=fwOf(1),b=bend(flyNames[0],ex,ey,fw),dx2=b[0]+34,dy2=wl+138;flyHit(1,dx2,dy2,w2);badge('drop',b[0],b[1]);badge('dfly',dx2,dy2);s+=tipLine(`M${b[0]} ${b[1]}C${b[0]} ${b[1]+30} ${dx2-26} ${dy2-34} ${dx2} ${dy2}`)+knot(b[0],b[1],TIP)+fl(flyNames[1],dx2,dy2,w2,isThis(1)?1:.6)+flyLabel(1,Math.min(dx2+w2*.9,W-12),under(dy2,w2),'end')+lab(b[0]-76,b[1]+46,P.tip[P.tip.length-1]||'dropper tippet','start','#a43a5e');}
    s+=lineLab+lab(ix+14,wl-26,'Indicator')+lab(sx+18,sy+2,'Split shot')+lab(150,wl+30,P.leader||'Leader','start','#1d6e68')+(two?flyLabel(0,ex-26,ey+44,'end'):flyLabel(0,ex+4,under(ey,fw)));
    if(!two&&P.tip[0])s+=lab(ex-110,sy+50,P.tip[0],'start','#a43a5e');
  }else if(K.k==='tight'){
    const fw=fwOf(0),ex=480,ey=wl+66;
    s+=lineLine(`M${GT[0]} ${GT[1]}C250 30 310 52 352 64`)+sightLine('M352 64L410 90')+tipLine(`M410 90Q452 ${wl+16} ${ex} ${ey}`)+ringAt(412,91);
    hitCircle(412,91,8,TIPS.ring);badge('loop',352,64);badge('sight',412,91);badge('fly',ex,ey);
    flyHit(0,ex,ey,fw);s+=fl(flyNames[0],ex,ey,fw)+lab(214,88,'Line held off water')+lab(372,50,'Sighter (coloured leader section)','start','#5f7d12')+lab(426,wl+16,P.tip[0]||'tippet','start','#a43a5e')+flyLabel(0,ex+4,under(ey,fw));
    s+=lab(14,H-38,'No indicator: you feel the take','start','#5d6b73',400);
  }else if(K.k==='streamer'){
    const fw=fwOf(0),ex=430,ey=wl+56;
    if(K.sink)s+=lineLine(`M${GT[0]} ${GT[1]}C240 26 286 56 306 ${wl-3}`)+lineLine(`M306 ${wl-3}L342 ${wl+14}`)+sinkLine(`M342 ${wl+14}L384 ${wl+38}`)+leadLine(`M384 ${wl+38}L${ex} ${ey}`)+knot(384,wl+38,'#fff');
    else s+=lineSeg(Lx)+leadLine(`M${Lx} ${wl-3}Q386 ${wl+6} ${ex} ${ey}`)+knot(Lx,wl-3,'#fff');
    flyHit(0,ex,ey,fw);badge('loop',K.sink?384:Lx,K.sink?wl+38:wl-3);badge('loopfly',ex,ey);s+=fl(flyNames[0],ex,ey,fw)+lineLab+lab(K.sink?408:362,K.sink?wl+22:wl-14,P.leader||'Leader','start','#1d6e68')+flyLabel(0,ex+4,under(ey,fw));
    s+=lab(14,H-38,'Strip or swing; vary speed and pauses','start','#5d6b73',400);
  }else if(K.k==='pond'){
    const ix=408,ex=428,ey=wl+78,fw=fwOf(0);
    s+=lineSeg(Lx)+lead(Lx,wl-3,ix-9,wl-6)+leadLine(`M${ix} ${wl+3}L${ex} ${ey}`)+knot(Lx,wl-3,'#fff');
    s+=`<circle cx="${ix}" cy="${wl-7}" r="10" fill="#e8742a" stroke="#a84c12"/><circle cx="${ix-3}" cy="${wl-10}" r="3.2" fill="#fff" opacity=".6"/>`;
    flyHit(0,ex,ey,fw);hitCircle(ix,wl-7,13,TIPS.ind);badge('loop',Lx,wl-3);badge('fly',ex,ey);s+=fl(flyNames[0],ex,ey,fw)+lineLab+lab(ix+14,wl-26,'Indicator')+lab(ix-216,wl+34,P.leader||'Leader','start','#1d6e68')+flyLabel(0,ex+4,under(ey,fw));
    s+=lab(14,H-38,'Fly hangs level under the indicator','start','#5d6b73',400);
  }
  s+=layBadges()+HIT+HIT2;
  // colour key + scale note
  const key=[['Fly line',LINE],['Leader',LEAD],['Tippet',TIP]].concat(K.k==='tight'?[['Sighter',SIGHT]]:K.k==='indicator'||K.k==='pond'?[['Indicator','#e8742a'],['Split shot','#6a6f74']]:K.sink?[['Sink-tip',SINK]]:[]);
  let kx=14;key.forEach(([t,c])=>{s+=`<rect x="${kx}" y="${H-22}" width="22" height="7" rx="3" fill="${c}" stroke="#000" stroke-opacity=".3"/><text x="${kx+28}" y="${H-15}" font-size="11.5" fill="#37474f" font-family="system-ui,sans-serif">${t}</text>`;kx+=28+t.length*6.6+16});
  s+=`<text x="${W-10}" y="${H-15}" font-size="11" fill="#5d6b73" text-anchor="end" font-family="system-ui,sans-serif">Rod, line, leader to scale · flies enlarged, sized by hook size</text>`;
  rigSVG.knotInfo=knotList.map(k=>KNOTS[k]);
  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Rig diagram">${s}</svg>`;
}
export function rigHTML(n){
  const r=rigFor(n);if(!r)return'';
  const leaf=!n.k.length,name=leaf?n.n:'this fly',K=rigKFor(n);
  const chips=`<div class="chain">${r.c.map((c,i)=>(i?'<i>→</i>':'')+(c.startsWith('★')?`<span class="fl">${name}${c.slice(1)}</span>`:`<span>${c}</span>`)).join('')}</div>`;
  const svg=K?rigSVG(n,r,K):'',kn=K?(rigSVG.knotInfo||[]):[];
  const knots=kn.length?`<div class="knotrow"><b>🪢 Knots to tie:</b> ${kn.map((k,i)=>`<span class="kchip"><i>${i+1}</i><b>${k[0]}</b>: ${k[1]}</span>`).join('')}</div>`:'';
  return `<div class="rigblock"><div class="row"><span class="ic">🪢</span><div><b>Rig:</b> ${r.t} <span class="small mute">· tap or hover over any part for what it does</span></div></div>${K?`<div class="rigsvg">${svg}</div>`:''}${knots}${(!K||isMobile())?chips:''}${r.n?`<div class="small mute" style="margin-left:34px">${r.n}</div>`:''}</div>`;
}
