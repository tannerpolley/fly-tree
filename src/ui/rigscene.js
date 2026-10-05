/* To-scale rig scene. Every position is in real inches: water surface at y=0, y grows downward,
   the angler stands at x=0 facing right (upstream); the current flows right to left, so nymphs
   drift slightly behind (to the right of) the indicator, as they do in a real river.
   buildScene() is pure (no DOM) so the geometry can be tested; the renderers turn it into SVG. */
import {
  RODS, REEL, GUIDES, GUIDE_RING, FLY_LINE_DIA, SINK_TIP_DIA, SIGHTER_DIA, LEADER_BUTT_DIA, X_DIA,
  INDICATOR_DIA, SHOT_DIA, TIPPET_RING_DIA, ANGLER_HEIGHT, hookLengthIn, sizeNum, ftIn, mm,
} from '../data/gear.js';

/* ---------- small geometry helpers ---------- */
const add=(a,b)=>[a[0]+b[0],a[1]+b[1]], sub=(a,b)=>[a[0]-b[0],a[1]-b[1]], mul=(a,k)=>[a[0]*k,a[1]*k];
const dist=(a,b)=>Math.hypot(a[0]-b[0],a[1]-b[1]), lerp=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
const unit=a=>{const l=Math.hypot(a[0],a[1])||1;return[a[0]/l,a[1]/l]};
function quad(p0,c,p1,n=20){const o=[];for(let i=0;i<=n;i++){const t=i/n,m=1-t;o.push([m*m*p0[0]+2*m*t*c[0]+t*t*p1[0],m*m*p0[1]+2*m*t*c[1]+t*t*p1[1]])}return o}
export function plen(p){let s=0;for(let i=1;i<p.length;i++)s+=dist(p[i-1],p[i]);return s}
/* point at arc length d along a polyline */
export function at(p,d){
  if(d<=0)return p[0];
  for(let i=1;i<p.length;i++){const l=dist(p[i-1],p[i]);if(d<=l)return lerp(p[i-1],p[i],l?d/l:0);d-=l}
  return p[p.length-1];
}
/* the part of a polyline between arc lengths d0 and d1 */
export function slice(p,d0,d1){
  const o=[at(p,d0)];let acc=0;
  for(let i=1;i<p.length;i++){acc+=dist(p[i-1],p[i]);if(acc>d0&&acc<d1)o.push(p[i])}
  o.push(at(p,d1));return o;
}
const join=(...ps)=>ps.reduce((o,p)=>o.concat(o.length&&dist(o[o.length-1],p[0])<1e-6?p.slice(1):p),[]);

/* ---------- reading the rig text ("9′ 4X leader", "18–24″ of 5X–6X tippet", …) ---------- */
const avg=s=>{const m=s.match(/(\d+(?:\.\d+)?)(?:\s*–\s*(\d+(?:\.\d+)?))?/);return m?(m[2]?(+m[1]+ +m[2])/2:+m[1]):null};
export function parseRig(r){
  const c=r.c.filter(x=>!/^optional/i.test(x)),star=c.findIndex(x=>x.startsWith('★'));
  const rod=c.find(x=>/\brod\b/i.test(x)),leader=c.find(x=>/leader/i.test(x));
  const inch=c.filter(x=>/″/.test(x)),tip=c.find(x=>/tippet/i.test(x));
  const xOf=s=>{const m=s&&s.match(/(\d)X/);return m?m[1]+'X':null};
  const rodFt=rod?avg(rod):null,wt=rod&&(rod.match(/(\d(?:–\d)?)wt/)||[])[1];
  const leaderFt=leader?avg(leader.split('′')[0])||9:9;
  const leaderX=xOf(leader)||'4X';
  const starX=star>=0?xOf(c[star]):null;
  const tipX=xOf(tip)||xOf(inch[0])||starX||`${Math.min(7,+leaderX[0]+1)}X`;
  return {rodFt,wt,leaderFt,leaderX,tipX,inchLens:inch.map(avg).filter(Boolean),line:c.find(x=>/\bline\b/i.test(x))||'Floating line'};
}

/* ---------- per rig type: rod, how the angler stands, water depth, where the flies land ---------- */
const KIND={
  dry:      {rod:'std', angle:38,wade:18,depth:24,flyX:360,down:150,droop:.03},
  film:     {rod:'std', angle:38,wade:18,depth:24,flyX:360,down:150,droop:.03,film:true},
  drydrop:  {rod:'std', angle:38,wade:18,depth:30,flyX:330,down:145,droop:.03},
  indicator:{rod:'std', angle:45,wade:20,depth:36,indX:288,down:128,droop:.03},
  tight:    {rod:'euro',angle:52,wade:20,depth:30,entryX:172,flyX:204,droop:.02,reach:true},
  streamer: {rod:'heavy',angle:-6,wade:16,depth:48,flyX:430,down:150,droop:.035,flyDepth:22},
  sink:     {rod:'heavy',angle:-6,wade:16,depth:60,flyX:452,down:150,droop:.035,sinkLen:120},
  pond:     {rod:'std', angle:30,bank:14,depth:96,indX:356,down:150,droop:.03,still:true},
};
export const KIND_OF=K=>K.k==='streamer'&&K.sink?'sink':K.k;

/* flies: [{name,z,hook,depthCode,isThis,example}] in order (top fly first);
   geoOf(name) → photo cut-out geometry {cw,ch,box,eye,bend} or null. */
export function buildScene(K,rig,flies,geoOf=()=>null){
  const kind=KIND_OF(K),P=KIND[kind],R=parseRig(rig);
  const rodSpec={...RODS[kind==='tight'?'euro':/6/.test(R.wt||'')||P.rod==='heavy'?'heavy':'std']};
  if(R.rodFt)rodSpec.len=R.rodFt*12;
  const sc={kind,still:!!P.still,bankH:P.bank||0,depth:P.depth,rodSpec,strands:[],items:[],knots:[],labels:[],flies:[],guides:[],notes:[]};
  const D=P.depth,leaderLen=R.leaderFt*12;
  const twoFly=flies.length>1,isStreamer=kind==='streamer'||kind==='sink';
  const tippetLen=isStreamer?0:(!twoFly&&R.inchLens.length?R.inchLens[0]:24);
  const dropperLen=twoFly?(R.inchLens[R.inchLens.length-1]||18):0;
  const tipDia=X_DIA[R.tipX]||.006,leadTipDia=X_DIA[R.leaderX]||.007;

  /* angler and rod */
  const feet=[0,P.still?-P.bank:P.wade];
  const hand=P.reach?[22,feet[1]-47]:[14,feet[1]-40];
  const a=P.angle*Math.PI/180,dir=[Math.cos(a),-Math.sin(a)],down=[Math.sin(a),Math.cos(a)],L=rodSpec.len;
  const handAt=rodSpec.seat+rodSpec.grip*.55,butt=sub(hand,mul(dir,handAt));
  const rodPt=t=>add(add(butt,mul(dir,L*t)),mul(down,P.droop*L*t*t));
  const rodPts=[];for(let i=0;i<=30;i++)rodPts.push(rodPt(i/30));
  const tip=rodPt(1);
  sc.angler={feet,hand,height:ANGLER_HEIGHT,onBank:!!P.still};
  sc.rod={butt,tip,pts:rodPts,dir,down,len:L,grip:[rodPt(rodSpec.seat/L),rodPt((rodSpec.seat+rodSpec.grip)/L)],seat:[butt,rodPt(rodSpec.seat/L)]};
  const reelC=add(rodPt(rodSpec.seat*.5/L),mul(down,REEL.dia/2+.55));
  sc.reel={c:reelC,r:REEL.dia/2,angle:P.angle};
  GUIDES.forEach((g,i)=>{const ring=GUIDE_RING(i,GUIDES.length),stand=i<2?.55+ring/2:i===GUIDES.length-1?0:.18+ring/2;sc.guides.push({c:add(rodPt(g),mul(down,stand)),r:ring/2,base:rodPt(g),tipTop:i===GUIDES.length-1})});
  const throughGuides=[add(reelC,mul(dir,REEL.dia*.32)),...sc.guides.map(g=>g.c)];

  /* water: bottom profile (and the bank for still water) */
  const xEnd=Math.max(P.flyX||0,P.indX||0)+150;
  if(P.still)sc.bottom=[[-60,-P.bank],[8,-P.bank],[24,4],[70,28],[140,D-14],[200,D],[xEnd,D+2]];
  else sc.bottom=[[-600,P.wade-2],[10,P.wade],[60,P.wade+3],[(P.flyX||P.indX)*.42,D-4],[(P.flyX||P.indX)*.62,D],[xEnd,D+3]];
  const bottomY=x=>{const b=sc.bottom;for(let i=1;i<b.length;i++)if(x<=b[i][0]){const t=(x-b[i-1][0])/(b[i][0]-b[i-1][0]);return b[i-1][1]+(b[i][1]-b[i-1][1])*t}return b[b.length-1][1]};
  sc.waterX0=P.still?18:-600;

  /* a fly at true size: hook length from the hook size, whole-fly length from its group's typical ratio */
  const flyRec=(f,eye,role)=>{
    const g=geoOf(f.name),hl=hookLengthIn(sizeNum(f.z),f.hook||'std'),flyLen=hl*(f.lenFactor||1.35);
    let s,w,h,bend,box;
    if(g&&g.eye&&g.box){
      const bw=g.box[2]-g.box[0];s=flyLen/bw;w=g.cw*s;h=g.ch*s;
      const span=g.bend[0]-g.eye[0],ok=span>bw*.3&&span<bw*.95&&g.bend[1]>(g.box[1]+g.box[3])/2;
      bend=ok?add(eye,mul(sub(g.bend,g.eye),s)):add(eye,[hl*.85,hl*.45]);
      box=[eye[0]+(g.box[0]-g.eye[0])*s,eye[1]+(g.box[1]-g.eye[1])*s,eye[0]+(g.box[2]-g.eye[0])*s,eye[1]+(g.box[3]-g.eye[1])*s];
    }else{bend=add(eye,[hl*.85,hl*.45]);box=[eye[0],eye[1]-hl*.5,eye[0]+flyLen,eye[1]+hl*.6]}
    const rec={name:f.name,isThis:f.isThis,example:f.example,role,z:f.z,hookLen:hl,flyLen,eye,bend,box,s,w,h,geo:g};
    sc.flies.push(rec);return rec;
  };
  const flyDepthOf=(f,dflt)=>f.depthCode==='bot'?D-4:f.depthCode==='mid'?D*.55:dflt;

  /* fly line beyond the tip: hangs from the tip-top down to the water, then lies on the surface */
  const tipTop=sc.guides[sc.guides.length-1].c;
  const lineSag=(from,to)=>{const m=lerp(from,to,.5);return quad(from,[m[0]-(to[0]-from[0])*.12,Math.min(m[1]+Math.abs(to[1]-from[1])*.32+6,Math.max(from[1],to[1]))],to,24)};
  const strand=(part,pts,dia,extra={})=>{if(pts&&pts.length>1)sc.strands.push({part,pts,dia,...extra})};
  const leaderStrands=(pts)=>{        // 9′ leaders taper: butt section, two mid sections, tip section
    const T=plen(pts),cut=[0,.45,.7,.86,1],d=[LEADER_BUTT_DIA,.017,.012,leadTipDia];
    for(let i=0;i<4;i++)strand('leader',slice(pts,T*cut[i],T*cut[i+1]),d[i]);
  };

  let E,top,shotAt=null,ringAt=null,indAt=null;
  if(kind==='tight'){
    /* tight-line: no fly line beyond the tip; a long thin mono leader, a coloured sighter just above the water,
       then the tippet slicing into the water to a heavy point fly near the bottom */
    strand('leader',throughGuides,.012,{inGuides:true});
    const W=[P.entryX,0],fd=flyDepthOf(flies[0],D-4),F=[P.flyX,fd];
    const u=unit(sub(W,tipTop)),s2=add(tipTop,mul(u,(-8-tipTop[1])/u[1])),s1=sub(s2,mul(u,24));
    const lead=quad(tipTop,add(lerp(tipTop,s1,.5),[0,4]),s1,16);
    strand('leader',lead,.012);strand('sighter',[s1,s2],SIGHTER_DIA);
    const tipPts=join([s2,W],quad(W,add(lerp(W,F,.5),[-3,4]),F,10));
    strand('tippet',tipPts,tipDia);
    ringAt=s2;top=flyRec(flies[0],F,'point');
    sc.knots.push({key:'loop',c:throughGuides[0]},{key:'sight',c:s2},{key:'fly',c:F});
    sc.labels.push({part:'sighter',text:'Sighter 24″',at:lerp(s1,s2,.5),side:'w'},{part:'leader',text:'Thin mono leader (no fly line out)',at:lerp(tipTop,s1,.45),side:'e'},{part:'tippet',text:`${R.tipX} tippet ${ftIn(plen(tipPts))}`,at:W,side:'e'});
    sc.entry=W;
  }else{
    strand('line',throughGuides,FLY_LINE_DIA,{inGuides:true});
    const down0=P.down;
    if(kind==='dry'||kind==='film'||kind==='drydrop'){
      const F=[P.flyX,P.film?.08:0],Rg=sub(F,[tippetLen,0]);E=sub(Rg,[leaderLen,0]);
      const Wd=[Math.min(down0,E[0]-24),0];
      strand('line',join(lineSag(tipTop,Wd),[Wd,E]),FLY_LINE_DIA);
      leaderStrands([E,Rg]);strand('tippet',[Rg,F],tipDia);
      ringAt=Rg;top=flyRec(flies[0],F,'top');
      sc.knots.push({key:'loop',c:E},{key:'ring',c:Rg},{key:'fly',c:F});
      if(kind==='drydrop'){
        const B=top.bend,dy=Math.min(D-4-B[1],dropperLen*.78),dx=Math.sqrt(Math.max(1,dropperLen*dropperLen-dy*dy)),F2=add(B,[dx,dy]);
        strand('dropper',quad(B,add(lerp(B,F2,.5),[-dx*.12,dy*.1]),F2,12),tipDia);
        flyRec(flies[1],F2,'dropper');sc.knots.push({key:'drop',c:B},{key:'dfly',c:F2});
        sc.labels.push({part:'dropper',text:`Dropper ${ftIn(dropperLen)} of ${R.tipX}`,at:lerp(B,F2,.55),side:'e'});
      }
      sc.labels.push({part:'tippet',text:`Tippet ${ftIn(tippetLen)} ${R.tipX}`,at:lerp(Rg,F,.5),side:'n'});
    }else if(kind==='indicator'||kind==='pond'){
      const fd=kind==='pond'?D-16:flyDepthOf(flies[0],D-4);
      const indDist=kind==='pond'?fd:Math.max(fd*1.5,fd+6);
      const I=[P.indX,0],F=kind==='pond'?[P.indX,fd]:[P.indX+Math.sqrt(indDist*indDist-fd*fd),fd];
      const under=kind==='pond'?[I,F]:quad(I,add(lerp(I,F,.5),[(F[0]-I[0])*.18,-fd*.08]),F,16);
      const total=leaderLen+tippetLen,surf=Math.max(18,total-plen(under));
      E=sub(I,[surf,0]);
      const Wd=[Math.min(down0,E[0]-24),0];
      strand('line',join(lineSag(tipTop,Wd),[Wd,E]),FLY_LINE_DIA);
      const path=join([E,I],under),T=plen(path);
      leaderStrands(slice(path,0,leaderLen));strand('tippet',slice(path,leaderLen,T),tipDia);
      ringAt=at(path,leaderLen);indAt=I;
      if(kind==='indicator'){shotAt=at(path,T-10);}
      top=flyRec(flies[0],F,'top');
      sc.knots.push({key:'loop',c:E},{key:'ring',c:ringAt},{key:'fly',c:F});
      if(twoFly){
        const B=top.bend,dy=Math.min(D-3-B[1],dropperLen*.6),dx=Math.sqrt(Math.max(1,dropperLen*dropperLen-dy*dy)),F2=add(B,[dx,dy]);
        strand('dropper',quad(B,add(lerp(B,F2,.5),[0,dy*.15]),F2,12),tipDia);
        flyRec(flies[1],F2,'dropper');sc.knots.push({key:'drop',c:B},{key:'dfly',c:F2});
        sc.labels.push({part:'dropper',text:`Dropper ${ftIn(dropperLen)}`,at:lerp(B,F2,.5),side:'e'});
      }
      sc.labels.push({part:'indicator',text:`Indicator · ${ftIn(indDist)} above the fly`,at:I,side:'n'});
      if(shotAt)sc.labels.push({part:'shot',text:'Split shot 10″ above the fly',at:shotAt,side:'w'});
      sc.indDist=indDist;
    }else{ // streamers
      const fd=P.flyDepth||D*.6;
      if(kind==='sink'){
        const sinkDepth=D*.62,dxs=Math.sqrt(P.sinkLen*P.sinkLen-sinkDepth*sinkDepth);
        const F=[P.flyX,sinkDepth+4],S=[F[0]-Math.sqrt(leaderLen*leaderLen-16),sinkDepth],E0=[S[0]-dxs,0];
        const Wd=[Math.min(down0,E0[0]-24),0];
        strand('line',join(lineSag(tipTop,Wd),[Wd,E0]),FLY_LINE_DIA);
        strand('sinktip',quad(E0,add(lerp(E0,S,.5),[dxs*.08,-sinkDepth*.12]),S,14),SINK_TIP_DIA);
        leaderStrands([S,F]);E=S;top=flyRec(flies[0],F,'top');
        sc.knots.push({key:'loop',c:S},{key:'loopfly',c:F});
        sc.labels.push({part:'sinktip',text:`Sinking tip ${ftIn(P.sinkLen)}`,at:lerp(E0,S,.5),side:'s'});
      }else{
        const F=[P.flyX,fd];E=[F[0]-Math.sqrt(leaderLen*leaderLen-fd*fd),0];
        const Wd=[Math.min(down0,E[0]-24),0];
        strand('line',join(lineSag(tipTop,Wd),[Wd,E]),FLY_LINE_DIA);
        leaderStrands(quad(E,add(lerp(E,F,.5),[0,-2]),F,10));top=flyRec(flies[0],F,'top');
        sc.knots.push({key:'loop',c:E},{key:'loopfly',c:F});
      }
    }
    sc.lineEnd=E;
    const iIn=sc.strands.findIndex(s=>!s.inGuides&&s.part!=='leader'&&dist(s.pts[s.pts.length-1],E)<1e-6),iOut=sc.strands.findIndex(s=>s.part==='leader'&&dist(s.pts[0],E)<1e-6);
    if(iIn>=0&&iOut>=0){const a=sc.strands[iIn],b=sc.strands[iOut],la=plen(a.pts),lb=plen(b.pts);
      sc.loops=[{c:E,part:a.part,din:unit(sub(E,at(a.pts,la-1))),dout:unit(sub(at(b.pts,1),E))}];
      a.pts=slice(a.pts,0,la-.5);b.pts=slice(b.pts,.33,lb)}
    const lineOut=plen(sc.strands.filter(s=>s.part==='line'&&!s.inGuides).flatMap(s=>s.pts));
    sc.labels.push({part:'line',text:`Fly line · about ${ftIn(lineOut)} out`,at:at(sc.strands.find(s=>s.part==='line'&&!s.inGuides).pts,lineOut*.35),side:'e'});
    const lp=sc.strands.filter(s=>s.part==='leader').flatMap(s=>s.pts);
    sc.labels.push({part:'leader',text:`Leader ${ftIn(leaderLen)} → ${R.leaderX}`,at:at(lp,plen(lp)*.4),side:'s'});
  }
  if(ringAt&&!isStreamer)sc.items.push({part:'ring',c:ringAt,dia:TIPPET_RING_DIA});
  if(indAt)sc.items.push({part:'indicator',c:add(indAt,[0,-INDICATOR_DIA*.15]),dia:INDICATOR_DIA});
  if(shotAt)sc.items.push({part:'shot',c:shotAt,dia:SHOT_DIA.BB});
  sc.labels.push({part:'rod',text:`Rod ${ftIn(L)} ${rodSpec.wt}wt`,at:rodPt(.62),side:'n'});
  /* close-range labels: only shown once zoomed in far enough to see the part (minK = screen px per inch) */
  const G=sc.guides,Lb=(part,text,p,side,minK)=>sc.labels.push({part,text,at:p,side,minK});
  Lb('guides','Stripping guide',G[0].c,'s',5);Lb('guides','Snake guide',G[G.length-3].c,'s',12);Lb('guides','Tip-top',G[G.length-1].c,'n',12);
  Lb('grip','Cork grip',lerp(...sc.rod.grip,.25),'n',6);Lb('grip','Reel seat',lerp(...sc.rod.seat,.5),'w',6);
  for(let k=1;k<rodSpec.pieces;k++)Lb('rod','Ferrule (rod joint)',rodPt(k/rodSpec.pieces),'n',6);
  if(sc.loops)Lb('line','Welded loop on the line + perfection loop on the leader',E,'s',30);
  if(ringAt&&!isStreamer)Lb('ring','Tippet ring',ringAt,kind==='tight'?'w':'e',14);
  sc.labels.push({part:'reel',text:'Reel',at:reelC,side:'s'});
  sc.labels.push({part:'angler',text:'Angler 5′10″ (for scale)',at:[feet[0],feet[1]-ANGLER_HEIGHT],side:'n'});
  sc.flies.forEach(f=>sc.labels.push({part:'fly:'+sc.flies.indexOf(f),text:`${f.isThis?'★ ':''}${f.name}${f.example?' (example)':''} · ${f.z||''} · ${mm(f.flyLen)} long`,at:[f.box[2],(f.box[1]+f.box[3])/2],side:'e',fly:true,isThis:f.isThis}));
  sc.labels.push({part:'water',text:sc.still?`Still water · ${ftIn(D)} deep`:`Run · ${ftIn(D)} deep`,at:[(P.flyX||P.indX)*.6,D*.7],side:'e'});

  /* rig facts for the text under the diagram */
  sc.facts={leaderLen,tippetLen,dropperLen,tipX:R.tipX,leaderX:R.leaderX,line:R.line};

  /* the whole scene and the zoom presets */
  const allX=[...rodPts.map(p=>p[0]),...sc.flies.flatMap(f=>[f.box[0],f.box[2]]),-14];
  const allY=[...rodPts.map(p=>p[1]),feet[1]-ANGLER_HEIGHT,...sc.flies.map(f=>f.box[3]),D+4];
  const pad=(r,k)=>{const w=r[2]-r[0],h=r[3]-r[1];return[r[0]-w*k,r[1]-h*k,r[2]+w*k,r[3]+h*k]};
  const bb=pts=>[Math.min(...pts.map(p=>p[0])),Math.min(...pts.map(p=>p[1])),Math.max(...pts.map(p=>p[0])),Math.max(...pts.map(p=>p[1]))];
  sc.views={
    all:pad([Math.min(...allX),Math.min(...allY),Math.max(...allX),Math.max(...allY)],.03),
    reel:pad(bb([reelC,sc.rod.grip[1],butt,add(hand,[0,-6])]),.6),
    tip:pad(bb([tipTop,rodPt(.9),at(sc.strands.find(s=>!s.inGuides).pts,8)]),.25),
  };
  /* one fly at a time up close (a dropper hangs too far from the top fly to show both large) */
  const flyView=f=>pad(f.box,Math.max(.6,4/(f.box[2]-f.box[0]))),main=sc.flies.find(f=>f.isThis)||sc.flies[0],other=sc.flies.find(f=>f!==main);
  sc.views.flies=flyView(main);if(other)sc.views.fly2=flyView(other);
  if(E)sc.views.junction=pad(bb([sub(E,[3.5,1.4]),add(E,[3.5,1.4])]),.2);
  if(indAt)sc.views.rigging=pad(bb([indAt,...sc.flies.map(f=>[f.box[2],f.box[3]]),ringAt]),.12);
  else if(kind==='tight')sc.views.rigging=pad(bb([sc.strands.find(s=>s.part==='sighter').pts[0],...sc.flies.map(f=>[f.box[2],f.box[3]])]),.12);
  return sc;
}
