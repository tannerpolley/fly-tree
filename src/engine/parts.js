/* Side-view tied materials. Fine fibres are tapered ribbons, with separate far/near layers. */
import { C, F, HKS, PSC, QN, RC, RR, S, THREAD, TS, UPH, Y, bead, coneHead, cyl, dk, dumbbell, fw, gid, grubShank, hair, lg, ln, lt, qd, qpt, qsub, r1, rg, threadHead, tube, wraps } from './core.js';

function tone(c,i){
  const k='tones'+c,cs=RC.k[k]||(RC.k[k]=[dk(c,.48),dk(c,.25),c,lt(c,.22),lt(c,.42)]);
  return cs[Math.floor(RR(i+81)*cs.length)];
}
function farLayer(s){return `<g opacity=".58"${RC.q?` filter="${F('fs')}"`:''}>${s}</g>`}
function clip(d){const id=gid();RC.defs+=`<clipPath id="${id}"><path d="${d}"/></clipPath>`;return id}

/* A marabou plume: fine branches follow the feather rather than isolated bristles. */
function plume(x,y,L,spread,c,seed=0){
  const d=`M${x} ${y-3}C${r1(x+L*.3)} ${r1(y-spread*.5)} ${r1(x+L*.75)} ${r1(y-spread*.42)} ${r1(x+L)} ${y}C${r1(x+L*.75)} ${r1(y+spread*.42)} ${r1(x+L*.3)} ${r1(y+spread*.5)} ${x} ${y+3}Z`;
  let s=`<path d="${d}" fill="${lg([[0,dk(c,.2),.8],[.45,c,.55],[1,c,0]],0,0,1,0)}"/>`;const n=QN(88);
  for(let i=0;i<n;i++){
    const u=RR(i+seed)*2-1,l=L*(.6+RR(i+seed+1)*.48),dy=u*spread*.5;
    const p0=[x+(RR(i+4)-.5)*4,y+(RR(i+5)-.5)*5],p1=[x+l*.48,y+dy*1.05+(RR(i+7)-.5)*8],p2=[x+l,y+dy*.7+(RR(i+8)-.5)*5],col=tone(c,i+seed);
    s+=hair(p0,p1,p2,col,.55+RR(i+9)*.55,{op:.58});
    for(let j=1;j<=6;j++){
      const t=.13+j*.13,p=qpt(p0,p1,p2,t),l2=(l*(1-t))*(.25+RR(i*13+j)*.35),side=j%2?1:-1;
      s+=hair(p,[p[0]+l2*.4,p[1]+side*(2+RR(i+j+7)*5)],[p[0]+l2,p[1]+side*(3+RR(i+j+8)*7)],col,.24+RR(i+j+9)*.3,{op:.48});
    }
  }
  return s;
}
function rabbit(x,y,L,w,c,flat=false){
  const p0=[x,y],p1=[x+L*.5,y+(flat?-1:7)],p2=[x+L,y+(flat?1:4)];
  let s=S(qd(p0,p1,p2),c,w*1.25,.55)+S(qd(p0,p1,p2),dk(c,.48),w*.35)+S(qd(p0,p1,p2),lt(c,.18),w*.2);
  for(let i=0;i<QN(280);i++){
    const t=RR(i+610),p=qpt(p0,p1,p2,t),side=i%3===0?1:-1,l=9+RR(i+612)*21,col=tone(c,i+610);
    const start=[p[0],p[1]+(RR(i+615)-.5)*w*.5],end=[p[0]+l,p[1]+side*(w*.3+RR(i+614)*12)];
    s+=hair(start,[p[0]+l*.4,p[1]+side*(3+RR(i+613)*5)],end,col,.48+RR(i+616)*.6,{op:.76});
    if(i%2===0)s+=hair(start,[p[0]+l*.6,p[1]+side*7],[end[0]+4,end[1]+side*4],lt(col,.2),.22,{op:.5});
  }
  return s;
}
export function tailSVG(t,hx){
  if(!t)return'';const x=hx-4,y=Y+(t.dy||0),c=t.c||C.brown;let s='';
  const L=t.len||40;
  if(t.t==='marabou')return plume(x,y,L,t.spread||54,c,30);
  if(t.t==='strip')return rabbit(x,y,L,t.w||8,c,t.flat);
  if(t.t==='feather')return flatFeather(x,y-2,L,9,c,true);
  if(t.t==='rubber'){
    for(const side of[-1,1])s+=tube(`M${x} ${y}Q${x+L*.42} ${y+side*9} ${x+L} ${y+side*17}`,c,1.7);
    return s;
  }
  if(t.t==='biot'){
    for(const side of[-1,1])s+=hair([x-1,y+side*2],[x+L*.6,y+side*3],[x+L,y+side*12],c,3.7,{op:.98,tip:dk(c,.4)});
    return s;
  }
  if(t.t==='shuck'){
    for(let i=0;i<QN(22);i++){
      const l=L*(.65+RR(i+31)*.5),dy=(RR(i+32)-.5)*12+9;
      s+=hair([x,y+(RR(i)-.5)*3],[x+l*.5,y+dy*.2+RR(i+5)*5],[x+l,y+dy],tone(c,i),.35+RR(i+6)*.45,{op:.5});
    }
    return s;
  }
  const len=Math.min(t.limit||120,L*TS),n=t.t==='split'?(t.n||2):QN(t.n===2?3:(t.n||3)*3);
  for(let i=0;i<n;i++){
    const u=t.t==='split'?(n===3?i-1:i%2?1:-1)*(.8+RR(i+9)*.2):(i/(n-1)-.5)*2,l=len*(.78+RR(i+3)*.22),spread=t.spread??(t.t==='split'?11:15);
    const p0=[x,y+(RR(i+4)-.5)*2],p1=[x+l*.55,y+u*spread*.28],p2=[x+l,y+u*spread+(RR(i+5)-.5)*3];
    s+=hair(p0,p1,p2,tone(c,i),t.t==='split'?.6:.65+RR(i+6)*.5,{op:.82,bar:t.bar?dk(c,.65):null,period:3+RR(i+7)*3,offset:RR(i)*4});
  }
  return s;
}

export function hackleFibre(p0,p1,p2,c,bar,i,w){
  return hair(p0,p1,p2,tone(c,i),w,{op:.8+RR(i+33)*.18,bar:bar?'#28251e':null,period:2.6+RR(i+20)*3.6,offset:RR(i+21)*5});
}
export function hackleSVG(h,x0,x1){
  if(!h)return{b:'',f:''};const c=h.c||C.brown,L=h.l||16;let b='',f='';
  const put=(p0,p1,p2,i,near,w=.72)=>{
    const cc=h.c2&&i%3===0?h.c2:c,str=hackleFibre(p0,p1,p2,cc,h.bar||(h.c2&&cc===h.c2),i,w);
    near?f+=str:b+=str;
  };
  if(h.t==='parachute'){
    const cx=h.x||112,cy=Y-18,rx=h.rx||94;
    for(let i=0;i<QN(330);i++){
      const a=RR(i+70)*Math.PI*2,cs=Math.cos(a),sn=Math.sin(a),l=rx*(.7+RR(i+73)*.3)*(cs<0?.72:1);
      const p0=[cx+cs*3,cy+sn*3+(RR(i+77)-.5)*3],p2=[cx+cs*l,cy+sn*l*.27+(RR(i+74)-.5)*7];
      put(p0,[cx+cs*l*.48,cy+sn*l*.08+(RR(i+75)-.5)*8],p2,i,sn>0,.75+RR(i+76)*.7);
    }
    f+=S(`M${cx-3} ${cy+2}q3 2 7 0`,dk(c,.55),2);
  }else if(h.t==='palmer'){
    const n=h.n||7,nf=QN(52),w=h.base||6;
    for(let k=0;k<n;k++){
      const x=x1+(x0-x1)*(k+.3)/n;
      b+=S(`M${r1(x-4)} ${Y-w}q-3 ${w} 3 ${w*2}`,dk(c,.5),.8,.6);
      for(let j=0;j<nf;j++){
        const i=k*97+j,a=RR(i+200)*Math.PI*2,sy=Math.cos(a),zz=Math.sin(a),l=L*(.65+RR(i+202)*.5),px=x+(RR(i+204)-.5)*5;
        put([px,Y+sy*w],[px+l*.04+zz*l*.15,Y+sy*(w+l*.55)],[px+l*.23+zz*l*.36+(RR(i+207)-.5)*5,Y+sy*(w+l)],i,zz>0,.55+RR(i+206)*.48);
      }
    }
  }else if(h.t==='soft'){
    const cx=h.x||101;
    for(let i=0;i<QN(54);i++){
      const side=i%2?1:-1,l=L*(1.8+RR(i+90)*1.2),angle=.25+RR(i+93)*.8;
      put([cx+RR(i)*5,Y+side*3],[cx+l*.44,Y+side*l*angle*.25],[cx+l*.93,Y+side*l*angle],i,i%3!==0,.45+RR(i+94)*.65);
    }
  }else{
    const cx=h.x||(h.t==='bushy'?109:108),length=L*HKS;
    for(let i=0;i<QN(h.t==='bushy'?220:170);i++){
      const a=RR(i+100)*Math.PI*2,zy=Math.cos(a),zz=Math.sin(a),l=length*(.68+RR(i+104)*.32),px=cx+(RR(i+101)-.5)*(h.t==='bushy'?17:9);
      put([px,Y+zy*3],[px+zz*l*.18+l*.06,Y+zy*l*.5],[px+zz*l*.36+l*.12,Y+zy*l],i,zz>0,.5+RR(i+107)*.48);
    }
  }
  return{b:farLayer(b),f};
}

export function legsSVG(l,xb=104){
  if(!l)return{b:'',f:''};const c=l.c||C.brown;xb=l.x||xb;let b='',f='';
  if(l.t==='rubber'){
    const n=l.n||3,L=l.len||49;
    for(let i=0;i<n;i++)for(const side of[-1,1]){
      const x=xb+i*(l.spacing||23),sg=l.up?side:1,dx=L*(-.9+i*1.6/Math.max(1,n-1))+(RR(i+side+8)-.5)*L*.22;
      const dy=sg*L*(.4+RR(i+side+9)*.3),d=`M${x} ${Y+sg*4}Q${r1(x+dx*.6)} ${r1(Y+dy*.4)} ${r1(x+dx)} ${r1(Y+dy)}`;
      const s=S(d,dk(c,.6),1.65)+S(d,c,1.1)+S(d,lt(c,.4),.28,.6)+(l.bar?S(d,'#191712',1.15,.6,'stroke-dasharray="1.1 3.8"'):'');
      side<0?b+=s:f+=s;
    }
  }else{
    for(let i=0;i<QN((l.n||3)*2);i++){
      const x=xb+RR(i+403)*14,side=l.up&&i%2?-1:1,len=l.len||30,dy=side*len*(.4+RR(i+404)*.6);
      const s=hair([x,Y+side*5],[x+len*.4,Y+dy*.38],[x+len*(.65+RR(i+406)*.25),Y+dy],tone(c,i),.65+RR(i+407)*.5,{op:.85,bar:l.bar?dk(c,.6):null,period:3});
      i%3===0?b+=s:f+=s;
    }
  }
  return{b:farLayer(b),f};
}
export function antennaeSVG(){return S(`M70 ${Y-3}q-8 -16 -21 -13M70 ${Y+2}q-9 -3 -21 7`,'#514633',.65,.8)}

/* Random curls on the surface, plus sparse fibres breaking the outline. No radial brush. */
function surfaceFur(d,x0,x1,W,c,kind='dub',count=330){
  const id=clip(d);let s='';
  for(let i=0;i<QN(count);i++){
    const t=RR(i+500),x=x0+(x1-x0)*t,w=W(t),y=Y+(RR(i+502)*2-1)*w,col=tone(kind==='variegated'&&Math.floor(x/12)%3===0?dk(c,.65):c,i+510),l=kind==='herl'?1.4+RR(i+504)*3:1.2+RR(i+504)*4;
    const angle=RR(i+505)*Math.PI*2,dx=Math.cos(angle)*l,dy=Math.sin(angle)*l*.7;
    if(kind==='deer')s+=`<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${fw(.3+RR(i+506)*.6)}" ry=".45" fill="${col}" stroke="${dk(c,.5)}" stroke-width=".16"/>`;
    else s+=S(qd([x,y],[x+dx*.2-dy*.5,y+dy*.2+dx*.35],[x+dx,y+dy]),col,kind==='herl'?.35:.18+RR(i+506)*.28,.5+RR(i+507)*.35);
    if(kind==='herl'&&i%5===0)s+=S(`M${r1(x)} ${r1(y)}l${r1(dx*.25)} ${r1(dy*.25)}`,lt(c,.6),.3,.85);
  }
  return `<g clip-path="url(#${id})">${s}</g>`;
}
export function dubHalo(x0,x1,w0,w1,c,n,seed,back,sc=1){
  let s='';
  for(let i=0;i<n;i++){
    const t=RR(i+seed),x=x0+(x1-x0)*t,w=w0+(w1-w0)*t,side=i%2?1:-1,l=(1+RR(i+seed+5)*6)*sc,dx=(RR(i+seed+8)-.35)*l*2;
    s+=hair([x,Y+side*w*.7],[x+dx*.25,Y+side*(w+l*.8)],[x+dx,Y+side*(w+l*.65)],tone(c,i+seed),.25+RR(i+seed+9)*.4,{op:back?.45:.62});
  }
  return s;
}
export function bodyTaper(b,x0,x1){
  const c=b.c||C.gray,w0=b.w0||4,w1=b.w1||7,fur=b.fuzz||b.herl||['pheasant','chenille','deer'].includes(b.mat),W=t=>(w0+(w1-w0)*t)*(1+Math.sin(t*Math.PI)*.12),X=t=>x0+(x1-x0)*t;
  let upper='',lower='';
  const steps=fur?80:12;
  for(let i=0;i<=steps;i++){
    const t=i/steps,x=X(t),w=W(t)*(fur?(.92+RR(i+900)*.16):1);
    upper+=`${i?'L':'M'}${r1(x)} ${r1(Y-w)}`;lower=`L${r1(x)} ${r1(Y+w)}`+lower;
  }
  const d=upper+lower+'Z';let s='';
  if(fur)s+=dubHalo(x0,x1,w0,w1,c,QN(110),700,true,b.fuzz==='fine'?.55:.9);
  s+=`<path d="${d}" fill="${cyl(c)}"/>`;
  if(fur){
    s+=surfaceFur(d,x0,x1,W,c,b.herl?'herl':['variegated','deer'].includes(b.mat)?b.mat:'dub',['chenille','variegated'].includes(b.mat)?850:580);
    if(RC.q>=2)s+=`<path d="${d}" fill="#000" opacity=".2" filter="${F('fn')}"/>`;
    if(b.mat==='pheasant')for(let i=0;i<QN(85);i++){
      const t=RR(i+800),x=X(t),y=Y+(RR(i+801)-.5)*W(t)*1.8;
      s+=S(`M${r1(x)} ${r1(y)}q${r1(-2-RR(i+802)*4)} 1 -5 2`,tone(c,i),.3,.62);
      s+=S(`M${r1(x)} ${r1(Y-W(t)*.9)}Q${r1(x+3)} ${Y} ${r1(x-2)} ${r1(Y+W(t)*.9)}`,tone(c,i+30),.35,.58);
    }
    s+=dubHalo(x0,x1,w0,w1,c,QN(b.fuzz==='fine'?130:90),1000,false,b.fuzz==='fine'?.8:.85);
  }else if(b.mat==='braid'){
    const id=gid();RC.defs+=`<pattern id="${id}" width="4" height="4" patternUnits="userSpaceOnUse"><path d="M-2 0L2 4M2 0L6 4M0 0L-4 4M4 0L0 4M8 0L4 4" fill="none" stroke="${lt(c,.65)}" stroke-width=".4" opacity=".65"/><path d="M0 1L3 4M4 1L1 4" fill="none" stroke="${dk(c,.6)}" stroke-width=".45" opacity=".65"/></pattern>`;
    s+=`<path d="${d}" fill="url(#${id})"/>`;
  }else{
    const step=b.mat==='wire'?2.3:1.5,n=Math.ceil(Math.abs(x0-x1)/step);
    for(let i=0;i<n;i++){
      const t=i/n,x=X(t),w=W(t),dd=`M${r1(x+1)} ${r1(Y-w)}Q${r1(x+2)} ${Y} ${r1(x-1)} ${r1(Y+w)}`;
      s+=S(dd,dk(c,.6),b.mat==='wire'?1.25:.35,b.mat==='wire'?.85:.35);
      if(b.mat==='wire')s+=S(dd,lt(c,.52),.65,.9,'transform="translate(.65 -.3)"');
    }
  }
  if(b.seg&&!fur&&b.mat!=='wire')for(let i=1;i<(b.seg===true?9:b.seg);i++){
    const t=i/(b.seg===true?9:b.seg),x=X(t),w=W(t);
    s+=S(`M${r1(x)} ${r1(Y-w)}Q${r1(x+2)} ${Y} ${r1(x-1)} ${r1(Y+w)}`,dk(c,.55),.65,.55);
  }
  if(b.rib){
    const n=b.ribn||6,w=b.ribw||1.1;
    for(let i=0;i<n;i++){
      const t=(i+.25)/n,tb=Math.min(1,t+.075),x=X(t),xx=X(tb),dd=`M${r1(x)} ${r1(Y-W(t))}Q${r1(x-4)} ${Y} ${r1(xx)} ${r1(Y+W(tb))}`;
      s+=S(dd,dk(b.rib,.65),w+.65,.7)+S(dd,b.rib,w)+S(dd,lt(b.rib,.65),w*.32,.9,'transform="translate(.35 -.35)"');
    }
  }
  if(b.shine)s+=S(`M${r1(X(.03))} ${r1(Y-W(.03)*.47)}L${r1(X(.96))} ${r1(Y-W(.96)*.47)}`,lt(c,.78),1.1,.7)+S(`M${r1(X(.2))} ${r1(Y+W(.2)*.65)}L${r1(X(.86))} ${r1(Y+W(.86)*.65)}`,'#fff',.45,.4);
  if(b.band){
    const [x,w,bc]=b.band,id=clip(d),bd=`M${x} ${Y-w1*1.5}h${w}v${w1*3}h${-w}Z`;
    s+=`<g clip-path="url(#${id})"><path d="${bd}" fill="${cyl(bc)}"/>${surfaceFur(bd,x,x+w,()=>w1,bc,'dub',45)}</g>`;
  }
  return s;
}
function curvedBody(b){
  const smooth=['thread','vinyl','wire'].includes(b.mat),c=b.c||C.tan,[p0,p1,p2]=qsub(...grubShank(228),smooth?.075:.14,.985),w=b.w||b.w1||10;let s='',upper='',lower='';
  for(let i=0;i<=24;i++){
    const t=i/24,p=qpt(p0,p1,p2,t),q=qpt(p0,p1,p2,Math.min(1,t+.01)),angle=Math.atan2(q[1]-p[1],q[0]-p[0]),nx=-Math.sin(angle),ny=Math.cos(angle),ww=smooth?(b.w1||w)+((b.w0||w*.5)-(b.w1||w))*t:w*(.72+Math.sin(t*Math.PI)*.28);
    upper+=`${i?'L':'M'}${r1(p[0]-nx*ww)} ${r1(p[1]-ny*ww)}`;lower=`L${r1(p[0]+nx*ww)} ${r1(p[1]+ny*ww)}`+lower;
  }
  const d=upper+lower+'Z',id=clip(d);s=`<path d="${d}" fill="${cyl(c)}"/>`;
  let fuzz='';for(let i=0;i<QN(smooth?40:250);i++){
    const t=RR(i+440),p=qpt(p0,p1,p2,t),y=p[1]+(RR(i+443)-.5)*w*2;
    fuzz+=S(`M${r1(p[0])} ${r1(y)}q${r1((RR(i+446)-.5)*8)} -2 ${r1((RR(i+447)-.5)*9)} 2`,tone(c,i),.35,.7);
  }
  s+=`<g clip-path="url(#${id})">${fuzz}</g>`;
  const n=b.ribn||9;
  for(let i=0;i<n;i++){
    const t=(i+.5)/n,p=qpt(p0,p1,p2,t),ww=smooth?(b.w1||w)+((b.w0||w*.5)-(b.w1||w))*t:w*.95,q=qpt(p0,p1,p2,Math.min(1,t+.02)),angle=Math.atan2(q[1]-p[1],q[0]-p[0]),nx=-Math.sin(angle),ny=Math.cos(angle),col=b.rib||dk(c,.3),rw=b.ribw||.9;
    const dd=qd([p[0]-nx*ww,p[1]-ny*ww],[p[0]+3,p[1]],[p[0]+nx*ww+2,p[1]+ny*ww]);
    s+=S(dd,dk(col,.55),rw+.35,.7)+S(dd,col,rw)+S(dd,lt(col,.65),rw*.28,.8);
    if(!smooth)for(let j=0;j<3;j++)s+=hair([p[0]+j*2,p[1]+w*.6],[p[0]+4+j,p[1]+w+6],[p[0]+8+j*2,p[1]+w+10+RR(i+j)*5],tone(c,i+j),.6,{op:.7});
  }
  return s+S(qd([p0[0],p0[1]-w*.75],[p1[0],p1[1]-w*.75],[p2[0],p2[1]-w*.6]),lt(c,.65),b.shell?3:.7,b.shell?.55:.25);
}
export function bodySVG(b,x0,x1,a){
  if(!b)return'';const c=b.c||C.gray;
  if(b.t==='curl'||a.hook==='grub')return curvedBody(b);
  if(b.t==='worm'){
    const w=b.w||8,P=[[82,Y+8],[128,Y-21],[174,Y],[222,Y+24],[282,Y-7]],d=qd(...P.slice(0,3))+`Q${P[3].join(' ')} ${P[4].join(' ')}`;
    let s=b.mat==='chenille'?S(d,dk(c,.4),w)+S(d,c,w*.84):tube(d,c,w);
    if(b.mat==='chenille')for(let i=0;i<QN(360);i++){
      const t=RR(i+40)*2,p=qpt(...(t<1?P.slice(0,3):P.slice(2,5)),t%1),side=i%2?1:-1;
      s+=hair([p[0],p[1]+side*w*.25],[p[0]+1,p[1]+side*w*.6],[p[0]+(RR(i+45)-.5)*4,p[1]+side*(w*.55+RR(i+46)*1.5)],tone(c,i),.35+RR(i)*.3,{op:.85});
    }
    return s;
  }
  if(b.t==='egg'){
    const R=b.r||21,cx=125,d=`M${cx-R} ${Y}a${R} ${R} 0 1 0 ${R*2} 0a${R} ${R} 0 1 0 ${-R*2} 0`;
    let s=`<path d="${d}" fill="${rg([[0,lt(c,.3)],[.55,c],[1,dk(c,.3)]],.35,.3,.85)}"/>`+surfaceFur(d,cx-R,cx+R,()=>R,c,'dub',520);
    for(let i=0;i<QN(90);i++){
      const angle=RR(i)*Math.PI*2,p=[cx+Math.cos(angle)*R*.95,Y+Math.sin(angle)*R*.95];
      s+=S(`M${r1(p[0])} ${r1(p[1])}l${r1(Math.cos(angle)*(1+RR(i+3)))} ${r1(Math.sin(angle)*(1+RR(i+4)))}`,tone(c,i),.4,.7);
    }
    return s;
  }
  if(b.t==='ant'){
    return S(`M112 ${Y}H202`,c,4)+[[112,13,8],[194,27,13]].map(([cx,rx,ry])=>{
      const d=`M${cx-rx} ${Y}a${rx} ${ry} 0 1 0 ${rx*2} 0a${rx} ${ry} 0 1 0 ${-rx*2} 0`;
      return `<path d="${d}" fill="${cyl(c)}"/>`+surfaceFur(d,cx-rx,cx+rx,()=>ry,c,'dub',100);
    }).join('')+legsSVG({t:'fibers',c,n:3,up:true},128).f;
  }
  if(b.t==='oval'){
    const d=`M94 ${Y}C99 ${Y-26} 211 ${Y-26} 226 ${Y}C211 ${Y+19} 99 ${Y+19} 94 ${Y}Z`;
    let s=`<path d="${d}" fill="${cyl(c)}"/>`+surfaceFur(d,94,226,()=>19,c,'dub',260);
    for(let i=0;i<9;i++){
      const x=101+i*14,ww=17*Math.sin((i+.5)/9*Math.PI);
      s+=S(`M${x} ${Y-ww}q6 ${ww} 0 ${ww*1.8}`,dk(c,.5),.75,.75)+hair([x,Y+ww*.6],[x-3,Y+ww+6],[x-7,Y+ww+11],tone(c,i),.6,{op:.75});
    }
    return s;
  }
  if(b.t==='case'){
    const d=`M98 ${Y-11}H215Q237 ${Y} 215 ${Y+11}H98Z`;let s=`<path d="${d}" fill="${cyl(c)}"/>`;
    for(let i=0;i<QN(120);i++){
      const x=100+RR(i)*119,y=Y+(RR(i+3)-.5)*20,r=.8+RR(i+4)*2.7;
      s+=`<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${fw(r)}" ry="${fw(r*.7)}" fill="${tone(c,i)}" stroke="${dk(c,.5)}" stroke-width=".25"/>`;
    }
    if(b.peek)s+=`<ellipse cx="94" cy="${Y}" rx="13" ry="8" fill="${cyl(b.peek)}"/>`;
    return s+`<ellipse cx="${b.peek?81:95}" cy="${Y}" rx="6" ry="7" fill="${cyl('#25211a')}"/>`;
  }
  return bodyTaper(b,x0,x1);
}
export function thoraxSVG(t,cx=112){
  const r=t.r||16,ry=t.ry||r*.67,c=t.c||C.black,d=`M${cx-r} ${Y}a${r} ${ry} 0 1 0 ${r*2} 0a${r} ${ry} 0 1 0 ${-r*2} 0`;
  let s=`<path d="${d}" fill="${cyl(c)}"/>`;
  if(t.fuzz!==false){
    s+=surfaceFur(d,cx-r,cx+r,()=>ry,c,t.herl?'herl':'dub',230);
    s+=dubHalo(cx-r*.7,cx+r*.7,ry*.7,ry*.7,c,QN(90),1300,false,t.herl?.95:.8);
    if(t.herl)for(let i=0;i<QN(160);i++){
      const a=RR(i+1600)*Math.PI*2,l=3+RR(i+1603)*9,p=[cx+Math.cos(a)*r*.75,Y+Math.sin(a)*ry*.8],col=tone(c,i);
      s+=hair(p,[p[0]+l*.5,p[1]+Math.sin(a)*l*.5],[p[0]+l,p[1]+Math.sin(a)*l],col,.5+RR(i+1604)*.4,{op:.9});
      if(i%3===0)s+=S(`M${r1(p[0]+l*.4)} ${r1(p[1])}l${r1(l*.2)} ${r1(Math.sin(a)*l*.3)}`,lt(c,.56),.32,.85);
    }
  }
  return s;
}

/* Feather slips retain a rachis, fine barbs and irregular mottled bands. */
function flatFeather(x,y,L,W,c,bar=false){
  const d=`M${x} ${y}Q${r1(x+L*.45)} ${r1(y-W*1.5)} ${r1(x+L)} ${r1(y-W*.2)}Q${r1(x+L*.6)} ${r1(y+W)} ${x} ${y}Z`,id=clip(d);
  let s=`<path d="${d}" fill="${cyl(c)}" opacity=".85"/>`,v='';
  for(let i=0;i<QN(100);i++){
    const t=i/QN(100),px=x+L*t,w=W*Math.sin(t*Math.PI)*.85;
    v+=S(`M${r1(px)} ${r1(y-w)}Q${r1(px-9)} ${y} ${r1(px)} ${r1(y+w*.8)}`,tone(c,i),.35,.7);
  }
  if(bar)for(let i=0;i<16;i++){
    const px=x+i*L/16+(RR(i+9)-.5)*L/30,w=1+RR(i+3)*4;
    v+=S(`M${r1(px)} ${y-W*1.5}q${r1(4+RR(i)*6)} ${W} 0 ${W*3}`,dk(c,.68),w,.6);
  }
  if(bar)for(let i=0;i<QN(130);i++)v+=`<ellipse cx="${r1(x+RR(i+401)*L)}" cy="${r1(y+(RR(i+404)-.5)*W*2)}" rx="${fw(.4+RR(i+406)*1.1)}" ry=".4" fill="${dk(c,.65)}" opacity=".55"/>`;
  return s+`<g clip-path="url(#${id})">${v}</g>`+S(`M${x} ${y}Q${r1(x+L*.55)} ${r1(y-W*.35)} ${r1(x+L)} ${r1(y-W*.2)}`,dk(c,.45),.45,.6);
}
export function featherWing(cx,by,H,Wd,rot,c,far,bar){
  return `<g transform="rotate(${rot} ${cx} ${by})">${flatFeather(cx,by,H,Wd,c,bar)}</g>`;
}
export function wingSVG(w,hx){
  if(!w)return{b:'',f:''};const c=w.c||C.white,cx=w.x||112;let b='',f='';
  if(w.t==='post'||w.t==='fan'||w.t==='upright'&&w.mat==='calf'){
    const fan=w.t==='fan',upright=w.t==='upright',h=fan?(w.h||82)*(w.s||1):upright?UPH:(w.h||40)*PSC,baseY=Y-(w.base||18),n=QN(180);
    if(!fan&&!upright)f+=`<path d="M${cx-2} ${baseY}Q${cx-12} ${baseY-h*.55} ${cx-15} ${baseY-h*.88}Q${cx} ${baseY-h*1.02} ${cx+18} ${baseY-h*.85}Q${cx+9} ${baseY-h*.45} ${cx+2} ${baseY}Z" fill="${rg([[0,c,.75],[.5,c,.35],[1,c,0]])}"/>`;
    for(let i=0;i<n;i++){
      const u=RR(i+210)*2-1,l=h*(.65+RR(i+211)*.35),spread=fan?(w.mat==='cdc'?30:42):upright?27:25;
      const p0=[cx+(RR(i+212)-.5)*5,baseY+(RR(i+213)-.5)*3],p2=[cx+u*spread,baseY-l*(fan?Math.sqrt(1-u*u*.7):1)];
      const pc=fan||upright?tone(c,i):(i%5===0?dk(c,.22):lt(c,RR(i+219)*.15));
      const s=hair(p0,[cx+u*spread*.48+(RR(i+215)-.5)*8,baseY-l*.5],p2,pc,fan?.65+RR(i+217)*.45:.5+RR(i+217)*.7,{op:.82,tip:fan?dk(c,.35):null});
      i%4===0?b+=s:f+=s;
      if(w.mat==='cdc')for(let j=1;j<4;j++){
        const p=qpt(p0,[cx+u*spread*.33,baseY-l*.5],p2,j/4);
        f+=hair(p,[p[0]+u*5,p[1]-3],[p[0]+u*10,p[1]-8],tone(c,i),.25,{op:.5});
      }
    }
    f+=S(`M${cx-3} ${baseY+3}q3 1 6 0`,dk(c,.45),2,.8);
  }else if(w.t==='upright'){
    b=featherWing(cx-4,Y-10,w.h||UPH,18,-100,c,true,w.bar);
    f=featherWing(cx+4,Y-10,w.h||UPH,17,-82,c,false,w.bar);
  }else if(w.t==='spent'){
    for(let i=0;i<QN(120);i++){
      const side=i%2?1:-1,L=46+RR(i+270)*25,dy=side*(3+RR(i+273)*12);
      const s=hair([cx,Y-3],[cx+side*L*.45,Y+dy*.6],[cx+side*L,Y+dy],tone(c,i),.45+RR(i+274)*.5,{op:.68});
      side<0?b+=s:f+=s;
    }
  }else if(w.t==='downwing'){
    const e=w.len||hx+10,rise=w.rise||34,root=w.x||96;
    for(let i=0;i<QN(w.n||190);i++){
      const l=(e-root)*(.79+RR(i+300)*.21),sy=Y-9+(RR(i+301)-.5)*6,ey=Y-4+(RR(i+303)-.5)*15;
      const s=hair([root+RR(i+304)*8,sy],[root+l*.46,Y-rise*(.5+RR(i+305)*.35)],[root+l,ey],tone(c,i),.6+RR(i+306)*.85,{op:.8,tip:dk(c,.55)});
      i%5===0?b+=s:f+=s;
    }
    if(w.butts!==false)for(let i=0;i<QN(35);i++)f+=S(`M${r1(root-7+RR(i)*8)} ${r1(Y-6+(RR(i+3)-.5)*13)}L${root+4} ${Y-7}`,tone(c,i),.75,.9);
  }else if(w.t==='sw'){
    const e=hx+(w.len||54),root=w.x||94;
    const layers=w.mid?[[w.c2||c,.5,7],[w.mid,.78,-4],[c,1,-12]]:[[w.c2||C.white,.95,10],[c,1,-15]];
    for(const [cc,scale,dy]of layers){
      if(w.belly===false&&dy>0)continue;
      for(let i=0;i<QN(120);i++){
        const l=(e-root)*(.78+RR(i+310)*.22)*scale,y=Y+(RR(i+313)-.5)*4,ey=Y+dy*.3+(RR(i+316)-.5)*14;
        f+=hair([root+RR(i+312)*9,y],[root+l*.46,Y+dy*1.6+(RR(i+315)-.5)*10],[root+l,ey],tone(cc,i),.48+RR(i+317)*.7,{op:.7,tip:dk(cc,.25)});
      }
    }
  }else if(w.t==='feather'){
    const root=w.x||101,e=hx+(w.len||22);
    if(w.c2)f+=plume(root,Y+3,(e-root)*.75,16,w.c2,80);
    b+=flatFeather(root,Y-11,e-root,w.width||17,c,w.bar);
    f+=flatFeather(root+3,Y-5,e-root-3,(w.width||17)*.72,c,w.bar);
    if(w.rib)for(let i=0;i<6;i++)f+=S(`M${root+20+i*23} ${Y-17}q2 12 -2 20`,w.rib,.7,.8);
  }else if(w.t==='zstrip'){
    f=rabbit(w.x||98,Y-10,hx+(w.len||72)-(w.x||98),w.w||10,c,true);
  }else if(w.t==='case'){
    for(let layer=(w.layers||1)-1;layer>=0;layer--){
      const root=(w.x||96)+layer*18,e=(w.len||142)+layer*20,d=`M${root} ${Y-7}Q${root+12} ${Y-17} ${e} ${Y-8}L${e} ${Y-2}Q${root+12} ${Y-8} ${root} ${Y-7}Z`;
      f+=`<path d="${d}" fill="${cyl(c)}"/>`+surfaceFur(d,root,e,()=>12,c,'dub',90);
      if(w.shine)f+=S(`M${root+2} ${Y-9}Q${root+18} ${Y-16} ${e-3} ${Y-8}`,lt(c,.9),1.5,.8);
    }
  }else if(w.t==='v'){
    for(const [dy,dx]of[[-13,80],[-5,85]])f+=hair([101,Y-5],[141,Y+dy-3],[101+dx,Y+dy],c,4.5,{op:.97,tip:dk(c,.25)});
  }else if(w.t==='foam'){
    const x=w.x0||106,e=w.x1||hx-8,h=w.h||10,d=`M${x} ${Y-6}Q${x+20} ${Y-h-12} ${e} ${Y-h}L${e+2} ${Y-4}Q${x+20} ${Y+2} ${x} ${Y-6}Z`;
    f=`<path d="${d}" fill="${cyl(c)}"/>`;
    const id=clip(d);let dots='';for(let i=0;i<QN(180);i++)dots+=`<circle cx="${r1(x+RR(i)*Math.abs(e-x))}" cy="${r1(Y-h-10+RR(i+3)*(h+14))}" r="${fw(.25+RR(i+4)*.4)}" fill="${tone(c,i)}" opacity=".6"/>`;
    f+=`<g clip-path="url(#${id})">${dots}</g>`;
    for(let i=1;i<5;i++)f+=S(`M${r1(x+(e-x)*i/5)} ${Y-h}q-2 6 0 12`,dk(c,.5),.7,.6);
  }
  return{b:farLayer(b),f};
}

export function headSVG(a){
  const h=a.head||{};
  if(a.balance)return S(`M76 ${Y+4}H46`,'#6a716b',1.4)+threadHead(a.thread)+bead(46,Y+4,a.br||7,a.bead||C.gold);
  if(h.t==='deer'){
    const c=h.c||C.tan,d=`M72 ${Y-3}C84 ${Y-13} 100 ${Y-19} 116 ${Y-16}Q125 ${Y} 116 ${Y+16}C100 ${Y+19} 84 ${Y+13} 72 ${Y+3}Z`,id=clip(d);
    let s='';
    for(let i=0;i<QN(42);i++){
      const side=i%2?1:-1,y=Y+side*(4+RR(i)*8);
      s+=hair([110,y],[132,y+side*4],[148+RR(i+3)*15,y+side*(5+RR(i+4)*10)],tone(c,i),.9,{op:.8,tip:dk(c,.5)});
    }
    s+=`<path d="${d}" fill="${cyl(c)}"/>`;let tips='';
    for(let i=0;i<QN(520);i++){
      const x=74+RR(i+510)*49,y=Y+(RR(i+513)-.5)*36,rr=.32+RR(i+515)*.55;
      tips+=`<ellipse cx="${r1(x)}" cy="${r1(y)}" rx="${fw(rr)}" ry="${fw(rr*.65)}" fill="${tone(c,i)}" stroke="${dk(c,.5)}" stroke-width=".18"/>`;
    }
    return s+`<g clip-path="url(#${id})">${tips}</g>`;
  }
  if(h.t==='ball')return bead(90,Y,9,h.c||C.black);
  if(a.cone)return wraps(88,5.2,3,a.thread||THREAD)+coneHead(a.cone);
  if(a.bead){const r=a.br||7;return wraps(r*2+66,Math.min(6,r*.8),4,a.thread||THREAD)+bead(74+r-6,Y,r,a.bead)}
  if(a.eyes)return threadHead(a.thread)+dumbbell(a.eyes,a.flip);
  return threadHead(h.c||a.thread||THREAD);
}
export function flashSVG(c,hx){let s='';for(let i=0;i<QN(5);i++)s+=hair([hx,Y],[hx+34,Y+(i-2)*2],[hx+65,Y+(i-2)*5],c,.45,{op:.65});return s}
export function clawsSVG(c){return [-1,1].map(side=>plume(104,Y+side*6,34,22,c,side+10)).join('')}
export function sheathSVG(a,ry){
  let s='';for(let i=0;i<QN(80);i++){
    const u=RR(i),side=i%2?1:-1;
    s+=hair([90,Y+side*3],[156,Y+side*ry*(.5+u*.4)],[224,Y+side*4],tone(a.body.c,i),.42,{op:.3});
  }return s;
}

/* ---- backgrounds for when a fly is drawn "in its water" ---- */
export function waterBG(ctx,wl,hx,a){
  let s=`<rect x="-300" y="-300" width="1000" height="${wl+300}" fill="${lg([[0,'#fffdf7'],[1,'#efece0']])}"/><rect x="-300" y="${wl}" width="1000" height="600" fill="${lg([[0,'#d6e9f5'],[.3,'#bfdbee'],[1,'#8fbad4']])}"/><path d="M-300 ${wl}H700" stroke="#4d93bf" stroke-width="2"/><path d="M-300 ${wl+2.5}H700" stroke="#fff" stroke-width="1" opacity=".5"/>`;
  for(let i=0;i<12;i++)s+=`<path d="M${r1(30+i*34+RR(i)*14)} ${r1(wl+8+RR(i+4)*60)}h${r1(12+RR(i+2)*18)}" stroke="#fff" stroke-width="1" opacity=".35"/>`;
  let after='';if(a.hackle||a.wing)after+=`<ellipse cx="112" cy="${wl}" rx="30" ry="2.8" fill="none" stroke="#4d93bf" stroke-width="1" opacity=".55"/><ellipse cx="112" cy="${wl}" rx="44" ry="3.8" fill="none" stroke="#4d93bf" stroke-width=".7" opacity=".35"/>`;
  after+=`<ellipse cx="${hx-4}" cy="${wl}" rx="18" ry="2.4" fill="none" stroke="#4d93bf" stroke-width=".8" opacity=".45"/>`;
  return{s,after};
}
export function subBG(){
  let s=`<rect x="-300" y="-300" width="1000" height="900" fill="${lg([[0,'#eef6fb'],[1,'#c4dbeb']])}"/>`;
  for(let i=0;i<5;i++)s+=`<path d="M${r1(20+i*80)} -40l30 220l22 0l-30 -220z" fill="#fff" opacity=".12"/>`;
  for(let i=0;i<9;i++)s+=`<circle cx="${r1(30+RR(i+60)*330)}" cy="${r1(RR(i+70)*170)}" r="${fw(1+RR(i+80)*2)}" fill="none" stroke="#fff" stroke-width=".8" opacity=".55"/>`;
  return s;
}
