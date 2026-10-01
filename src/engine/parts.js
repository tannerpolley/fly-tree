/* Fly illustration engine, part 2: materials — tails, hackle, legs, bodies, wings, heads and backgrounds. */
import { C, F, HKS, PSC, QN, RC, RR, S, THREAD, TS, UPH, Y, bead, coneHead, cyl, dk, dumbbell, fw, hair, lg, ln, lt, qd, qpt, r1, rg, threadHead, tube, wraps } from './core.js';

/* ---- tails ---- */
export function tailSVG(t,hx){
  if(!t)return'';const L=t.len||40,c=t.c||C.brown,x=hx-4;let r='';
  switch(t.t){
    case'fibers':{const L=Math.min(110,(t.len||40)*TS),n=QN((t.n||3)*3.6);for(let i=0;i<n;i++){const u=i/(n-1)-.5,dy=u*(t.n||3)*7.5*(.7+RR(i)*.6),l=L*(.82+RR(i+3)*.3),p0=[x+RR(i+9)*2,Y+(RR(i+1)-.5)*2.6],p2=[x+l,Y+dy+(RR(i+5)-.5)*3],p1=[x+l*.55,Y+dy*.16+(RR(i+7)-.5)*2];r+=S(qd(p0,p1,p2),i%3===0?lt(c,.28):i%3===1?c:dk(c,.26),.85+RR(i+11)*.5,.97)+(i%4===0?S(qd(p0,p1,p2),lt(c,.72),.28,.7):'')}return r}
    case'split':for(const s of[-1,1]){const L=Math.min(110,(t.len||40)*TS),n=QN(6);for(let k=0;k<n;k++){const sp=(k/(n-1)-.5)*5,l=L*(.85+RR(k+s*7)*.25),p0=[x,Y+s*1.2],p1=[x+l*.55,Y+s*(3.5+sp*.3)],p2=[x+l,Y+s*(12+sp)+(RR(k+s)-.5)*2];r+=S(qd(p0,p1,p2),k%3===0?lt(c,.3):k%3===1?c:dk(c,.25),.8+RR(k+5)*.4,.97)}}return r;
    case'marabou':{const cp=(p,u)=>{const m=1-u;return[m*m*m*p[0][0]+3*m*m*u*p[1][0]+3*m*u*u*p[2][0]+u*u*u*p[3][0],m*m*m*p[0][1]+3*m*m*u*p[1][1]+3*m*u*u*p[2][1]+u*u*u*p[3][1]]};const n=QN(46);r=`<path d="M${x} ${Y-2.5}L${x+L*.28} ${Y-6}L${x+L*.28} ${Y+6}L${x} ${Y+2.5}Z" fill="${dk(c,.35)}" opacity=".9"/>`;
      for(let i=0;i<n;i++){const u=i/(n-1)-.5,yy=u*(30+RR(i+2)*8),e=x+L*(.74+RR(i)*.42),w1=(RR(i+3)-.5)*14,w2=(RR(i+6)-.5)*14,P=[[x+2,Y+u*4],[x+L*.3,Y+yy*.45+w1],[x+L*.62,Y+yy*.8+w2],[e,Y+yy+(RR(i+9)-.5)*8]],d=`M${r1(P[0][0])} ${r1(P[0][1])}C${r1(P[1][0])} ${r1(P[1][1])} ${r1(P[2][0])} ${r1(P[2][1])} ${r1(P[3][0])} ${r1(P[3][1])}`,col=i%3===0?lt(c,.28):i%3===1?c:dk(c,.32);
        r+=S(d,col,3.4,.12)+S(d,col,1.5+RR(i+1)*.6,.55)+S(d,i%2?lt(col,.25):col,.65,.95);
        if(RC.q>=1)for(let k=1;k<(RC.q>=2?9:5);k++){const pp=cp(P,k/9*.92+.06),sd=(k%2?1:-1)*(1.3+RR(i*3+k)*1.6),ang=(k%2?-.9:.9);r+=ln(r1(pp[0]),r1(pp[1]),r1(pp[0]+3.4),r1(pp[1]+sd*2.2+ang),col,.5,.7)}}
      return r}
    case'strip':{const w=t.w||8,am=t.flat?1.5:9,d=`M${x} ${Y+(t.dy||0)}C${x+L*.3} ${Y+(t.dy||0)+am} ${x+L*.6} ${Y+(t.dy||0)-am} ${x+L} ${Y+(t.dy||0)+am/3}`;r=S(d,dk(c,.5),w+1.4)+S(d,dk(c,.12),w)+`<g transform="translate(0,-${fw(w*.22)})">${S(d,lt(c,.18),w*.45,.55)}</g>`;const n=QN(95);const P=u=>{const m=1-u,dy=t.dy||0;return[m*m*m*x+3*m*m*u*(x+L*.3)+3*m*u*u*(x+L*.6)+u*u*u*(x+L),m*m*m*(Y+dy)+3*m*m*u*(Y+dy+am)+3*m*u*u*(Y+dy-am)+u*u*u*(Y+dy+am/3)]};for(let i=0;i<n;i++){const u=RR(i)*.97,p=P(u),side=i%2?-1:1,l=5+RR(i+3)*6,a=(RR(i+5)-.2)*.9,ex=p[0]+Math.cos(a)*l,ey=p[1]+side*(w/2)+Math.sin(a)*l*side*.9;r+=hair([p[0],p[1]+side*w*.3],[(p[0]+ex)/2,(p[1]+ey)/2-side*1],[ex,ey],i%3===0?lt(c,.2):i%3===1?c:dk(c,.2),.75+RR(i+7)*.4,{tipLen:.4,tip:lt(c,.35)})}return r}
    case'shuck':{const n=QN(11);for(let i=0;i<n;i++){const o=(i/(n-1)-.5)*5,wv=(RR(i)-.5)*9,l=L*(.8+RR(i+3)*.35),P0=[x,Y+o*.3],C1=[x+l*.3,Y+o+4+wv],C2=[x+l*.62,Y+o*2+9-wv*.6],P3=[x+l,Y+o*2.4+10+RR(i+5)*7],d=`M${r1(P0[0])} ${r1(P0[1])}C${r1(C1[0])} ${r1(C1[1])} ${r1(C2[0])} ${r1(C2[1])} ${r1(P3[0])} ${r1(P3[1])}`;r+=S(d,dk(c,.3),1.3,.3)+S(d,i%2?lt(c,.15):c,.75,.85)+S(d,lt(c,.75),.28,.9)}for(let i=0;i<4;i++){const p=[x+L*(.3+RR(i+20)*.6),Y+L*.2+RR(i+21)*10];r+=`<circle cx="${r1(p[0])}" cy="${r1(p[1])}" r=".7" fill="#fff" opacity=".85"/>`}return r}
    case'rubber':for(const s of[-1,1]){const d=`M${x} ${Y}q${L*.5} ${s*2} ${L} ${s*12}`;r+=tube(d,c,3)}return r;
    case'biot':for(const s of[-1,1]){const d=`M${x} ${Y}q${L*.5} ${s*2} ${L} ${s*9}`;r+=tube(d,c,3.2);for(let i=1;i<7;i++){const u=i/7,p=qpt([x,Y],[x+L*.5,Y+s*2],[x+L,Y+s*9],u);r+=ln(r1(p[0]),r1(p[1]-2.4),r1(p[0]+.6),r1(p[1]+2.4),'#000',.7,.4)}}return r;
  }return'';
}

/* ---- fibre systems: hackle collars, palmered hackle, soft hackle, parachute ring.
        Each returns {b:'drawn behind the body', f:'drawn in front'} ---- */
export function barbed(c,h,i){return h&&h.c2&&i%2?h.c2:c}
export function hackleFibre(p0,p1,p2,c,bar,i,w){
  let s=S(qd(p0,p1,p2),i%3===0?lt(c,.2):i%3===1?c:dk(c,.2),w,.94);
  if(bar){s+=S(qd(p0,p1,p2),'#2a2622',w,.78,'stroke-dasharray="1.1 2.3"')}
  return s+(i%5===0?S(qd(p0,p1,p2),lt(c,.7),.25,.6):'');
}
export function hackleSVG(h,x0,x1){
  if(!h)return{b:'',f:''};const c=h.c||C.brown,L=h.l||16;let b='',f='';
  const isBar=cc=>!!h.bar||(h.c2&&cc===h.c2);
  switch(h.t){
    case'collar':case'bushy':{const bush=h.t==='bushy',cx=h.x||(bush?112:110),len=L*HKS*(bush?1.08:1),n=QN(bush?170:130),band=bush?12:9;
      for(let i=0;i<n;i++){const phi=((i*.618+RR(i)*.6)%1)*6.283,zy=Math.cos(phi),zz=Math.sin(phi),l=len*(.6+RR(i+4)*.52)*(i%13===0?1.2:1),cc=barbed(c,h,i),bx=cx+(RR(i+2)-.5)*band,p0=[bx,Y+zy*2.4],p2=[bx+(.2+(RR(i+12)-.5)*.3)*l+zz*l*.2,Y+zy*l*(.9+RR(i+13)*.14)],p1=[(p0[0]+p2[0])/2+(RR(i+8)-.5)*5,(p0[1]+p2[1])/2],str=hackleFibre(p0,p1,p2,zz>0?cc:dk(cc,.28),isBar(cc),i,.62+RR(i+6)*.42);zz>0?f+=str:b+=str}
      return{b,f}}
    case'parachute':{const rx=(h.rx||32)*1.5,cy=Y-7,n=QN(110);for(let i=0;i<n;i++){const th=((i*.618+RR(i)*.5)%1)*6.283,sn=Math.sin(th),cs=Math.cos(th),l=rx*(.66+RR(i+3)*.36),cc=barbed(c,h,i),p0=[112+cs*3,cy+sn*1.1],p2=[112+cs*l,cy+sn*l*.17],p1=[112+cs*l*.5,cy+sn*l*.1+(RR(i+9)-.5)*1.5],str=hackleFibre(p0,p1,p2,sn>0?cc:dk(cc,.3),isBar(cc),i,.7+RR(i+5)*.4);sn>0?f+=str:b+=str}f+=S(`M${112-rx*.45} ${cy+.6}Q112 ${cy+3} ${112+rx*.45} ${cy+.6}`,dk(c,.45),1.3,.5);return{b,f}}
    case'palmer':{const n=h.n||11;b=S(`M${x1} ${Y-5}L${x0} ${Y+5}`,dk(c,.5),1,.4);for(let k=0;k<n;k++){const xa=x1+(x0-x1)*k/n,xb=x1+(x0-x1)*(k+1)/n;b+=S(`M${r1(xa)} ${Y-6}Q${r1((xa+xb)/2)} ${Y+1} ${r1(xb)} ${Y+6}`,dk(c,.5),.9,.45);for(let j=0;j<QN(9);j++){const side=j%2?-1:1,xx=xa+(xb-xa)*(j/QN(9))*1.2,zz=RR(k*17+j)>.5,l=L*(.55+RR(k*9+j+3)*.5),cc=barbed(c,h,j),p0=[xx,Y+side*5.4],p2=[xx-l*.55-RR(j)*3,Y+side*(5.4+l*.86)],p1=[xx-l*.2,Y+side*(5.4+l*.45)],str=hackleFibre(p0,p1,p2,zz?cc:dk(cc,.28),isBar(cc),j+k,.7+RR(k*5+j)*.4);zz?f+=str:b+=str}}return{b,f}}
    case'soft':{const n=QN(36);for(let i=0;i<n;i++){const side=i%2?-1:1,th=(7+RR(i)*36)*Math.PI/180,l=L*(1.35+RR(i+3)*.9),zz=RR(i+3)>.4,cc=barbed(c,h,i),p0=[107+RR(i+1)*6,Y+side*2.6],p2=[p0[0]+Math.cos(th)*l,p0[1]+side*Math.sin(th)*l*.9],p1=[p0[0]+l*.5,p0[1]+side*Math.sin(th)*l*.22],str=hackleFibre(p0,p1,p2,zz?cc:dk(cc,.3),isBar(cc),i,.8+RR(i+5)*.45);zz?f+=str:b+=str}return{b,f}}
  }return{b:'',f:''};
}

/* ---- legs ---- */
export function legsSVG(l,xb=104){
  if(!l)return{b:'',f:''};const c=l.c||C.brown,n=l.n||3;let b='',f='';
  const soft=g=>RC.q>=1?`<g opacity=".78" filter="${F('fb')}">${g}</g>`:`<g opacity=".78">${g}</g>`;
  if(l.t==='rubber'){
    for(let i=0;i<n;i++){const x=xb+2+i*15;
      for(const s of(l.up?[1,-1]:[1]))for(const far of[true,false]){
        const dx=far?3:0,col=far?dk(c,.3):c,wob=RR(i*3+(far?1:0))*5,d=`M${x+dx} ${Y+s*5}C${x+dx+4} ${Y+s*(13+wob)} ${x+dx+14} ${Y+s*(18+wob)} ${x+dx+20+wob} ${Y+s*(30+i*3)}`,g=S(d,dk(col,.45),2.1,.5)+S(d,col,1.45,.95)+S(d,lt(col,.4),.4,.7)+S(d,'#000',1.45,.2,'stroke-dasharray="1 4"');
        far?b+=soft(g):f+=g}}
    return{b,f}}
  for(const s of(l.up?[1,-1]:[1]))for(const far of[true,false]){
    const m=QN(far?5:6);let g='';
    for(let k=0;k<m;k++){const x=xb+RR(k+(far?9:0))*18,len=18+RR(k+2)*16,p0=[x,Y+s*5],p1=[x+len*.28,Y+s*len*.55],p2=[x+len*.95,Y+s*(len*.9)+RR(k+4)*4],col=k%3?c:lt(c,.18);g+=S(qd(p0,p1,p2),dk(col,.4),1.5,.5)+S(qd(p0,p1,p2),col,.95,.95)+S(qd(p0,p1,p2),lt(col,.38),.3,.7)}
    far?b+=soft(g):f+=g}
  return{b,f};
}
export function antennaeSVG(){return `<path d="M70 ${Y-3}q-8 -16 -21 -13M70 ${Y+2}q-9 -3 -21 7" fill="none" stroke="#3a342c" stroke-width="1.5" stroke-linecap="round"/><path d="M70 ${Y-3}q-8 -16 -21 -13M70 ${Y+2}q-9 -3 -21 7" fill="none" stroke="#9a9084" stroke-width=".5" stroke-linecap="round" opacity=".7"/>`}

/* ---- bodies ---- */
export function dubHalo(x0,x1,w0,w1,c,n,seed,back,sc=1){
  let s='';const X=t=>x0+(x1-x0)*t,W=t=>w0+(w1-w0)*t,shag=sc>=1;
  for(let i=0;i<n;i++){const t=RR(i+seed),x=X(t),w=W(t),side=RR(i+seed+3)>.5?-1:1,l=(2.2+RR(i+seed+5)*5.4)*sc,ang=shag?(RR(i+seed+7)*.7+.45):(RR(i+seed+7)-.5)*1.5+.35,ex=x+ang*l*(shag?1.7:1.1),ey=Y+side*(w*.85+l*(.7+RR(i+seed+2)*.5));
    const col=back?dk(c,.3+RR(i)*.15):(i%4===0?lt(c,.4):i%4===1?dk(c,.3):i%4===2?c:lt(c,.12));
    s+=S(qd([x,Y+side*w*.8],[(x+ex)/2+(RR(i+seed+1)-.5)*1.4,Y+side*(w*.85+l*.4)],[ex,ey]),col,.62+RR(i+seed+9)*.55,back?.8:.92)}
  return s;
}
export function bodyTaper(b,x0,x1){
  const c=b.c||C.gray,w0=b.w0||5,w1=b.w1||7,X=t=>x0+(x1-x0)*t,W=t=>w0+(w1-w0)*t;
  const d=`M${x0} ${Y-w0}L${x1} ${Y-w1}Q${x1+1.5} ${Y} ${x1} ${Y+w1}L${x0} ${Y+w0}Q${x0-1.3} ${Y} ${x0} ${Y-w0}Z`;
  let r='';
  const fine=b.fuzz==='fine';
  if(b.fuzz)r+=dubHalo(x0,x1,w0,w1,c,QN(fine?36:110),11,true,fine?.45:1.15);
  r+=`<path d="${d}" fill="${cyl(c)}" stroke="${dk(c,.42)}" stroke-width=".4" stroke-linejoin="round"/>`;
  if(RC.q>=2&&(b.fuzz||b.herl))r+=`<path d="${d}" fill="#000" opacity=".16" filter="${F('fn')}"/>`;
  const ns=b.seg?(b.seg===true?9:b.seg):0;
  if(ns){for(let i=0;i<ns;i++){const ta=i/ns,tb=(i+1)/ns,sh=i%2?`#fff" opacity=".1`:`#000" opacity=".12`;r+=`<path d="M${X(ta)} ${Y-W(ta)}L${X(tb)} ${Y-W(tb)}L${X(tb)} ${Y+W(tb)}L${X(ta)} ${Y+W(ta)}Z" fill="${sh}"/>`}
    for(let i=1;i<ns;i++){const x=X(i/ns),w=W(i/ns);r+=`<path d="M${r1(x+1.4)} ${r1(Y-w)}Q${r1(x+2.2)} ${Y} ${r1(x-1.4)} ${r1(Y+w)}" fill="none" stroke="#000" stroke-width=".9" opacity=".34"/><path d="M${r1(x+2.4)} ${r1(Y-w+.5)}Q${r1(x+3.2)} ${Y} ${r1(x-.4)} ${r1(Y+w-.5)}" fill="none" stroke="#fff" stroke-width=".55" opacity=".38"/>`}}
  else if(!b.fuzz&&!b.herl){for(let x=x0-1.4;x>x1;x-=1.55){const t=(x-x0)/(x1-x0),w=W(t);r+=`<path d="M${r1(x)} ${r1(Y-w)}L${r1(x-1.5)} ${r1(Y+w)}" stroke="#000" stroke-width=".45" opacity=".14"/><path d="M${r1(x-.7)} ${r1(Y-w)}L${r1(x-2.2)} ${r1(Y+w)}" stroke="#fff" stroke-width=".35" opacity=".16"/>`}}
  r+=`<path d="M${X(.03)} ${r1(Y-W(.03)*.55)}L${X(.97)} ${r1(Y-W(.97)*.55)}" stroke="#fff" stroke-width="${fw(Math.max(1,w1*.34))}" stroke-linecap="round" opacity=".42"${RC.q>=1?` filter="${F('fs')}"`:''}/><path d="M${X(.05)} ${r1(Y+W(.05)*.72)}L${X(.95)} ${r1(Y+W(.95)*.72)}" stroke="${lt(c,.5)}" stroke-width="1" stroke-linecap="round" opacity=".28"/>`;
  r+=`<path d="${d}" fill="${lg([[0,'#000',0],[.62,'#000',0],[1,'#000',.34]],1,0,0,0)}"/>`;
  if(b.rib){const n=b.ribn||9;for(let i=0;i<n;i++){const ta=i/n,tb=(i+1)/n,pa=[X(ta),Y-W(ta)],pb=[X(tb),Y+W(tb)],dd=`M${r1(pa[0])} ${r1(pa[1])}Q${r1((pa[0]+pb[0])/2-1.2)} ${Y} ${r1(pb[0])} ${r1(pb[1])}`;const rw=b.ribw||1.35;r+=S(dd,'#000',rw+.9,.22)+S(dd,b.rib,rw)+`<g transform="translate(.4,-.5)">${S(dd,lt(b.rib,.7),.4,.9)}</g>`}}
  if(b.herl){for(let i=0;i<QN(210);i++){const t=RR(i),x=X(t),w=W(t),yy=Y+(RR(i+11)-.5)*w*1.9,l=2.4+RR(i+2)*3.2,col=['#3c7a48','#2f6b4b','#4f8f3a','#7a8a2a','#25503a','#2f8a70','#a08a3a','#5a7a2a'][i%8],a=(RR(i+8)-.5)*2.2+(RR(i+9)>.5?1.57:-1.57);r+=ln(r1(x),r1(yy),r1(x+Math.cos(a)*l*1.05),r1(yy+Math.sin(a)*l*1.05),col,.7,.95)}}
  if(b.fuzz){for(let i=0;i<QN(fine?150:210);i++){const t=RR(i+700),x=X(t),w=W(t),yy=Y+(RR(i+701)-.5)*w*1.8,l=1.2+RR(i+702)*2,ang=(RR(i+703)-.5)*.9;r+=ln(r1(x),r1(yy),r1(x+Math.sin(ang)*l),r1(yy+Math.cos(ang)*l*(RR(i+704)>.5?1:-1)),i%3===0?lt(c,.35):i%3===1?dk(c,.3):c,.6,.55)}r+=dubHalo(x0,x1,w0,w1,c,QN(fine?44:140),31,false,fine?.45:1.15)}
  if(b.shine)r+=`<path d="M${X(.03)} ${r1(Y-W(.03)*.45)}L${X(.97)} ${r1(Y-W(.97)*.45)}" stroke="#fff" stroke-width="2.4" stroke-linecap="round" opacity=".55"/><path d="M${X(.1)} ${r1(Y+W(.1)*.7)}L${X(.9)} ${r1(Y+W(.9)*.7)}" stroke="#fff" stroke-width=".8" opacity=".35"/>`;
  if(b.band){const bw=W((b.band[0]+b.band[1]/2-x0)/(x1-x0));r+=`<rect x="${b.band[0]}" y="${r1(Y-bw)}" width="${b.band[1]}" height="${r1(2*bw)}" rx="1" fill="${cyl(b.band[2])}" stroke="${dk(b.band[2],.45)}" stroke-width=".4"/><rect x="${b.band[0]+1.5}" y="${r1(Y-bw*.55)}" width="${b.band[1]-3}" height="${r1(bw*.34)}" rx=".8" fill="#fff" opacity=".38"/>`}
  return r;
}
export function bodySVG(b,x0,x1,a){
  if(!b)return'';const c=b.c||C.gray;let r='';
  switch(b.t||'taper'){
    case'ant':{const sph=(cx,cy,rx,ry)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${rg([[0,lt(c,.62)],[.4,c],[1,dk(c,.55)]],.36,.3,.85)}" stroke="${dk(c,.7)}" stroke-width=".6"/><ellipse cx="${fw(cx-rx*.22)}" cy="${fw(cy-ry*.46)}" rx="${fw(rx*.5)}" ry="${fw(ry*.22)}" fill="#fff" opacity=".42" transform="rotate(-8 ${fw(cx-rx*.22)} ${fw(cy-ry*.46)})"/>`;
      r=`<path d="M${x1+22} ${Y}H${x0-58}" stroke="${dk(c,.4)}" stroke-width="4.6" stroke-linecap="round"/>`;
      for(let i=0;i<3;i++){const px=x1+4+i*11,dd=`M${px} ${Y+8}L${px+4} ${Y+17}L${px+8+i*2} ${Y+26}`,du=`M${px} ${Y-8}L${px+4} ${Y-16}L${px+8+i*2} ${Y-24}`;r+=S(dd,dk(c,.2),1.7)+S(dd,lt(c,.3),.45,.8)+S(du,dk(c,.2),1.7)+S(du,lt(c,.3),.45,.8)}
      r+=sph(x0-30,Y,30,15)+sph(x1+8,Y,17,11)+`<path d="M${x0-56} ${Y-5}q4 5 0 10M${x0-4} ${Y-5}q-4 5 0 10" fill="none" stroke="#000" stroke-width=".8" opacity=".3"/>`;
      return r}
    case'egg':{const R=b.r||19,cx=125;return`<circle cx="${cx}" cy="${Y}" r="${R+.6}" fill="${dk(c,.55)}"/><circle cx="${cx}" cy="${Y}" r="${R}" fill="${rg([[0,lt(c,.55)],[.5,c],[1,dk(c,.35)]],.4,.34,.9)}"/><circle cx="${cx+2}" cy="${Y+2}" r="${R*.42}" fill="${dk(c,.22)}" opacity=".5"/><circle cx="${cx+2}" cy="${Y+2}" r="${R*.2}" fill="${dk(c,.5)}" opacity=".55"/><path d="M${cx-R*.62} ${Y+R*.3}A${R*.7} ${R*.7} 0 0 0 ${cx+R*.4} ${Y+R*.62}" fill="none" stroke="${lt(c,.5)}" stroke-width="2" opacity=".5"/><ellipse cx="${cx-7}" cy="${Y-8.4}" rx="6" ry="3.6" fill="#fff" opacity=".75" transform="rotate(-30 ${cx-7} ${Y-8.4})"/><circle cx="${cx-10}" cy="${Y-4}" r="1.4" fill="#fff" opacity=".8"/>`}
    case'worm':{const d=`M95 ${Y}c25 -18 40 18 65 0s40 -18 65 0 25 12 40 4`,w=b.w||8;return tube(d,c,w)+S(d,'#000',w,.2,'stroke-dasharray="1 4.2"')+S(d,'#fff',w*.5,.14,'stroke-dasharray="1 4.2" stroke-dashoffset="2"')}
    case'oval':{r=`<path d="M96 ${Y+4}Q160 ${Y+24} 224 ${Y+4}" fill="none" stroke="#000" stroke-width="3" opacity=".08"/>`;
      for(let i=0;i<7;i++){const px=106+i*16;r+=S(`M${px} ${Y+17}Q${px-3} ${Y+26} ${px-7} ${Y+32}`,dk(c,.4),1.7)+S(`M${px} ${Y+17}Q${px-3} ${Y+26} ${px-7} ${Y+32}`,lt(c,.2),.5,.7)}
      r+=`<ellipse cx="160" cy="${Y}" rx="66" ry="19" fill="${cyl(c)}" stroke="${dk(c,.6)}" stroke-width=".8"/>`;
      for(let i=0;i<8;i++){const px=94+i*16.6,hy=19*Math.sqrt(Math.max(0,1-((px-160)/66)**2));r+=`<path d="M${r1(px)} ${r1(Y-hy)}Q${r1(px+6)} ${Y} ${r1(px)} ${r1(Y+hy)}" fill="none" stroke="#000" stroke-width="1.3" opacity=".34"/><path d="M${r1(px+1.4)} ${r1(Y-hy+1)}Q${r1(px+7.4)} ${Y} ${r1(px+1.4)} ${r1(Y+hy-1)}" fill="none" stroke="#fff" stroke-width=".8" opacity=".4"/>`}
      r+=`<path d="M100 ${Y-3}Q160 ${Y-18} 222 ${Y-3}" fill="none" stroke="#fff" stroke-width="4" opacity=".28" stroke-linecap="round"/><path d="M${x0-4} ${Y-3}l16 -9M${x0-4} ${Y+3}l16 9" stroke="${dk(c,.3)}" stroke-width="2.2" stroke-linecap="round"/><path d="M96 ${Y-3}q-8 -5 -13 -3M96 ${Y+3}q-8 3 -13 6" fill="none" stroke="${dk(c,.3)}" stroke-width=".9"/>`;return r}
    case'curl':{const p0=[92,Y-6],p1=[165,Y-44],p2=[226,Y+16],n=12;
      for(let i=0;i<n;i++){const t=1-(i+.5)/n,p=qpt(p0,p1,p2,t),q=qpt(p0,p1,p2,Math.min(1,t+.02)),ang=Math.atan2(q[1]-p[1],q[0]-p[0])*180/Math.PI,nx=-Math.sin(ang*Math.PI/180),ny=Math.cos(ang*Math.PI/180);
        for(let k=0;k<2;k++)r+=S(`M${r1(p[0]-nx*9)} ${r1(p[1]-ny*9)}q${r1(-nx*2+(k?2:-1))} ${r1(-ny*6+4)} ${k?-3:1} ${6+k*3}`,dk(c,.35),1.5,.9);
        r+=`<ellipse cx="${r1(p[0])}" cy="${r1(p[1])}" rx="8.4" ry="12" transform="rotate(${r1(ang)} ${r1(p[0])} ${r1(p[1])})" fill="${rg([[0,lt(c,.45)],[.55,c],[1,dk(c,.42)]],.4,.28,.9)}" stroke="${dk(c,.55)}" stroke-width=".7"/>`}
      r+=S(qd([92,Y-14],[165,Y-52],[220,Y+4]),'#fff',4,.3)+S(qd([96,Y-9],[165,Y-47],[220,Y+9]),'#fff',1.2,.45);
      r+=S(`M226 ${Y+16}l11 -4M226 ${Y+20}l11 5M226 ${Y+24}l9 10`,dk(c,.35),1.5);return r}
    case'case':{const rr=`<rect x="96" y="${Y-12.5}" width="132" height="25" rx="11"`;r=rr+` fill="${cyl(c)}" stroke="${dk(c,.6)}"/>`;for(let i=0;i<62;i++){const px=102+RR(i)*120,py=Y-10+RR(i+3)*20,rx=1.5+RR(i+5)*3.6,col=['#6b5a40','#b9a98a','#8a7a5a','#d6c9a6','#4a3e2c','#9a8c70'][i%6];r+=`<ellipse cx="${r1(px)}" cy="${r1(py)}" rx="${fw(rx)}" ry="${fw(rx*.78)}" fill="${col}" stroke="rgba(0,0,0,.4)" stroke-width=".5" transform="rotate(${r1(RR(i+8)*180)} ${r1(px)} ${r1(py)})"/><ellipse cx="${r1(px-rx*.3)}" cy="${r1(py-rx*.3)}" rx="${fw(rx*.4)}" ry="${fw(rx*.25)}" fill="#fff" opacity=".4"/>`}
      r+=rr+` fill="${lg([[0,'#fff',.3],[.4,'#fff',0],[1,'#000',.38]])}"/>`;
      if(b.peek)r+=`<ellipse cx="94" cy="${Y}" rx="13" ry="9" fill="${cyl(b.peek)}" stroke="${dk(b.peek,.6)}" stroke-width=".6"/><path d="M90 ${Y-8}v16M95 ${Y-8.5}v17" stroke="#000" stroke-width=".8" opacity=".25"/><circle cx="80" cy="${Y}" r="6.4" fill="${rg([[0,'#555'],[1,'#080808']],.34,.3,.9)}"/><ellipse cx="78.4" cy="${Y-2.4}" rx="2.2" ry="1.2" fill="#fff" opacity=".6"/>`;
      else r+=`<ellipse cx="94" cy="${Y}" rx="9" ry="8" fill="${rg([[0,'#555'],[1,'#080808']],.34,.3,.9)}"/>`;return r}
  }
  return bodyTaper(b,x0,x1);
}
export function thoraxSVG(t,cx=112){
  const r=t.r||17,ry=t.ry||r*.75,c=t.c||C.black,fz=t.fuzz!==false,k=Math.min(1,r/13);let s='';
  if(fz)for(let i=0;i<QN(46);i++){const g=RR(i+60)*6.283,l=(2.2+RR(i+61)*4)*k;s+=S(`M${r1(cx+Math.cos(g)*r*.88)} ${r1(Y+Math.sin(g)*ry*.88)}L${r1(cx+Math.cos(g)*(r+l)+1)} ${r1(Y+Math.sin(g)*(ry+l))}`,i%3===0?lt(c,.4):i%3===1?dk(c,.3):c,.8,.9)}
  s+=`<ellipse cx="${cx}" cy="${Y}" rx="${r}" ry="${ry}" fill="${rg([[0,lt(c,.38)],[.5,c],[1,dk(c,.42)]],.4,.3,.9)}" stroke="${dk(c,.55)}" stroke-width=".4"/>`;
  if(fz)for(let i=0;i<QN(40);i++){const g=RR(i+80)*6.283,rr=RR(i+82)*.8,l=(1.4+RR(i+81)*2.6)*k;s+=S(`M${r1(cx+Math.cos(g)*r*rr)} ${r1(Y+Math.sin(g)*ry*rr)}L${r1(cx+Math.cos(g)*r*rr+(RR(i+83)-.2)*l)} ${r1(Y+Math.sin(g)*ry*rr+(RR(i+84)-.5)*l)}`,i%3?lt(c,.3):dk(c,.22),.6,.8)}
  else s+=`<ellipse cx="${fw(cx-r*.15)}" cy="${fw(Y-ry*.45)}" rx="${fw(r*.55)}" ry="${fw(ry*.24)}" fill="#fff" opacity=".28"/>`;
  return s;
}

/* ---- wings ---- */
export function featherWing(cx,by,H,Wd,rot,c,far,bar){
  const hw=t=>Wd*Math.pow(Math.sin(Math.PI*Math.min(1,Math.pow(t,.78)*.97+.03)),.7);
  let s=`<g transform="rotate(${rot} ${cx} ${by})"${far&&RC.q>=1?` filter="${F('fs')}"`:''} opacity="${far?.9:1}">`;
  const lf=[],rt=[];for(let i=0;i<=12;i++){const t=i/12;lf.push([cx-hw(t)*.9,by-H*t]);rt.push([cx+hw(t)*1.1,by-H*t])}
  const d='M'+lf.map(p=>r1(p[0])+' '+r1(p[1])).join('L')+'L'+rt.reverse().map(p=>r1(p[0])+' '+r1(p[1])).join('L')+'Z';
  s+=`<path d="${d}" fill="${lg([[0,dk(c,.14),.82],[.5,c,.55],[1,lt(c,.5),.28]],0,1,0,0)}"/>`;
  const nb=QN(70);
  for(let i=0;i<nb;i++){const t=.03+(i/nb)*.95,side=i%2?1:-1,w=hw(t)*(side>0?1.1:.9)*(.9+RR(i)*.16),p0=[cx+(RR(i+5)-.5)*1.2,by-H*t],p1=[cx+side*w*.55,by-H*(t+.035)],p2=[cx+side*w,by-H*(t+.07+RR(i+3)*.05)];s+=S(qd(p0,p1,p2),i%3===0?lt(c,.28):i%3===1?c:dk(c,.3),.55+RR(i+7)*.4,.82)}
  if(bar)for(const t of bar)s+=S(`M${r1(cx-hw(t)*.9)} ${r1(by-H*t)}Q${cx} ${r1(by-H*t-1.6)} ${r1(cx+hw(t)*1.08)} ${r1(by-H*t)}`,dk(c,.62),1.2,.5);
  s+=S(qd([cx,by],[cx+Wd*.12,by-H*.5],[cx+Wd*.05,by-H*.97]),dk(c,.4),.7,.6)+`<path d="M${r1(cx-Wd*.5)} ${r1(by-H*.2)}Q${r1(cx-Wd*.6)} ${r1(by-H*.6)} ${r1(cx-Wd*.2)} ${r1(by-H*.9)}" fill="none" stroke="#fff" stroke-width="1.3" opacity=".35" stroke-linecap="round"/>`;
  return s+'</g>';
}
export function wingSVG(w,hx){
  if(!w)return{b:'',f:''};const c=w.c||C.white,h=(w.h||44)*(w.t==='post'?PSC:1);let b='',f='';
  switch(w.t){
    case'post':{const top=Y-6-h,pc=dk(c,.05);f=`<path d="M108.4 ${Y-6}V${top+1}Q112 ${top-1} 115.6 ${top+1}V${Y-6}Z" fill="${lg([[0,dk(pc,.3)],[.3,lt(pc,.1)],[.55,pc],[1,dk(pc,.32)]],0,0,1,0)}" stroke="${dk(c,.5)}" stroke-width=".5"/>`;
      for(let i=0;i<QN(34);i++){const x=108.8+RR(i)*6.4,y0=Y-7-RR(i+2)*(h-6);f+=S(`M${r1(x)} ${r1(y0)}l${r1((RR(i+5)-.5)*.8)} ${r1(-3-RR(i+7)*7)}`,i%3===0?dk(c,.4):i%3===1?lt(c,.2):dk(c,.18),.45,.55)}
      for(let i=0;i<QN(26);i++)f+=S(qd([112+(RR(i)-.5)*5,top+2],[112+(RR(i+4)-.5)*9,top-5],[112+(RR(i+8)-.5)*13,top-3-RR(i+2)*6]),i%3===0?lt(c,.25):i%3===1?c:dk(c,.25),.7,.95);
      return{b,f}}
    case'fan':{const s=w.s||1,n=QN(86*s+20);for(let i=0;i<n;i++){const u=i/(n-1),th=(150-u*118+(RR(i)-.5)*7)*Math.PI/180,l=(44+Math.sin(u*3.14)*34+(RR(i+3)-.5)*9)*s,p0=[104+RR(i+5)*16,Y-6],p2=[p0[0]+Math.cos(th)*l*.9,p0[1]-Math.sin(th)*l*1.04],p1=[p0[0]+(p2[0]-p0[0])*.45+(RR(i+7)-.5)*3,p0[1]+(p2[1]-p0[1])*.55],col=i%3===0?lt(c,.25):i%3===1?c:dk(c,.2);f+=hair(p0,p1,p2,col,.9+RR(i+2)*.5,{tipLen:.28,tip:dk(c,.42),op:.96})}f+=`<path d="M104 ${Y-6}Q112 ${Y-9} 124 ${Y-6}" stroke="${dk(c,.5)}" stroke-width="2" fill="none" opacity=".6"/>`;return{b,f}}
    case'upright':{const bar=w.bar?[.2,.34,.48,.62,.76,.88]:null;b=featherWing(110,Y-8,UPH,24,-8,c,true,bar);f=featherWing(122,Y-8,UPH,24,9,c,false,bar);return{b,f}}
    case'downwing':{const e=w.len||hx+14,top=(w.rise||34)*1.15;f=`<path d="M102 ${Y-7}Q130 ${Y-top} ${e-30} ${Y-16}L${e} ${Y-3}Q${e-60} ${Y-10} 126 ${Y-3}Z" fill="${dk(c,.35)}" opacity=".0"/>`;const n=QN(150);for(let i=0;i<n;i++){const k=Math.floor(i/5),u=RR(k),j=(RR(i)-.5),sx=104+u*24+j*2,sy=Y-6-RR(k+1)*2.4+j,ex=e-RR(k+2)*16-(w.len?4:0)+j*3,ey=Y-2-RR(k+3)*11+j*2,cxx=(sx+ex)/2+(RR(k+9)-.5)*6,cyy=Y-top*(.2+RR(k+4)*.55)-3+j*2,col=i%3===0?lt(c,.3):i%3===1?c:dk(c,.2);f+=hair([sx,sy],[cxx,cyy],[ex,ey],col,1.15+RR(i+6)*.7,{tipLen:.34,tip:dk(c,.5),op:.98})}return{b,f:f+`<path d="M102 ${Y-7}Q130 ${Y-top} ${e-30} ${Y-16}" fill="none" stroke="#fff" stroke-width="1.2" opacity=".25"/>`}}
    case'spent':{b=featherWing(118,Y-3,36,9,68,c,true);f=featherWing(118,Y+3,36,9,112,c,false);return{b,f}}
    case'case':{const e=w.len||150,d=`M96 ${Y-3}Q118 ${Y-20} ${e} ${Y-8}L${e} ${Y}Z`,mc=w.shine?lg([[0,'#fff'],[.4,lt(c,.4)],[.5,dk(c,.4)],[.8,c],[1,lt(c,.3)]]):cyl(c);f=`<path d="${d}" fill="${mc}" stroke="${dk(c,.6)}" stroke-width=".6"/>`;for(let i=1;i<6;i++){const x=96+(e-96)*i/6;f+=S(`M${r1(x)} ${r1(Y-13+i*1.5)}Q${r1(x+1.6)} ${r1(Y-5)} ${r1(x)} ${Y-.6}`,'#000',.7,.34)}f+=S(`M104 ${Y-9.5}Q124 ${Y-17} ${e-8} ${Y-9}`,'#fff',w.shine?2:1.1,w.shine?.7:.3);return{b,f}}
    case'foam':{const a=w.x0||110,bb=w.x1||hx-8,rx=(bb-a)/2,hh=(w.h||10),d=`M${a} ${Y-1}A${rx} ${hh+8} 0 0 1 ${bb} ${Y-1}Z`;f=`<path d="${d}" fill="${cyl(c)}" stroke="${dk(c,.55)}" stroke-width=".7"/>`+(RC.q>=2?`<path d="${d}" fill="#000" opacity=".3" filter="${F('fn')}"/>`:'')+`<path d="M${a+6} ${Y-4}A${rx-6} ${hh+4} 0 0 1 ${bb-6} ${Y-4}" fill="none" stroke="#fff" stroke-width="1.6" opacity=".42" stroke-linecap="round"/><path d="M${a+1} ${Y-1.4}H${bb-1}" stroke="${dk(c,.5)}" stroke-width="1" stroke-dasharray="2 1.4" opacity=".5"/>`;for(let i=1;i<6;i++)f+=ln(r1(a+(bb-a)*i/6),Y-1,r1(a+(bb-a)*i/6),r1(Y-3-hh*.6),'#000',.6,.16);return{b,f}}
    case'v':{for(const[dy,rot,ry]of[[-12,8,6.4],[-7,-4,5.4]]){const cxx=144,cyy=Y+dy;f+=`<g transform="rotate(${rot} ${cxx} ${cyy})"><ellipse cx="${cxx}" cy="${cyy}" rx="31" ry="${ry}" fill="${cyl(c)}" stroke="${dk(c,.5)}" stroke-width=".6"/>`;for(let i=0;i<14;i++)f+=ln(r1(cxx-28+i*4.1),r1(cyy-ry*.8),r1(cxx-28+i*4.1+1),r1(cyy+ry*.8),dk(c,.3),.45,.45);f+=`<ellipse cx="${cxx-4}" cy="${fw(cyy-ry*.45)}" rx="22" ry="1.3" fill="#fff" opacity=".5"/></g>`}return{b,f}}
    case'sw':{const e=hx+(w.len||44),c2=w.c2||C.white,top=w.top||1;
      if(w.belly!==false)for(let i=0;i<QN(80);i++){const k=Math.floor(i/4),u=RR(k),j=RR(i)-.5,sx=92+u*14,sy=Y-1+RR(k+1)*5+j,ex=e-RR(k+2)*24+j*6,ey=Y+7+RR(k+3)*5+(w.drop||6)*.4+j*5,cxx=(sx+ex)/2,cyy=Y+9+RR(k+4)*7+j*2,col=i%3===0?lt(c2,.22):i%3===1?c2:dk(c2,.16);f+=hair([sx,sy],[cxx,cyy],[ex,ey],col,.8+RR(i+6)*.5,{tipLen:.28,tip:dk(c2,.32),op:.96})}
      const layers=w.mid?[[c,.7,0],[w.mid,.62,.5],[c,1,1]]:[[c,1,1]];
      for(const[lc,sc,off]of layers)for(let i=0;i<QN(110*sc);i++){const k=Math.floor(i/4),u=RR(k+300),j=RR(i+305)-.5,sx=92+u*14,sy=Y-3+RR(k+301)*4+j,ex=e-RR(k+302)*22*(sc<1?1.4:1)+j*6,ey=Y-1+(RR(k+303)-.5)*8+j*6,cxx=(sx+ex)/2,cyy=Y-(sc<1?12:21)-RR(k+304)*(sc<1?6:13)+j*3,col=i%3===0?lt(lc,.26):i%3===1?lc:dk(lc,.22);f+=hair([sx,sy],[cxx,cyy],[ex,ey],col,.8+RR(i+306)*.55,{tipLen:.34,tip:dk(lc,.3),op:.97})}
      for(let i=0;i<QN(10);i++){const sx=96+RR(i+800)*10,ex=e-6-RR(i+801)*18;f+=S(qd([sx,Y-2],[(sx+ex)/2,Y-14-RR(i+802)*8],[ex,Y-2+(RR(i+803)-.5)*6]),'#fff',.35,.5)}
      return{b,f}}
    case'zstrip':{const x=96,L=(hx+(w.len||70))-x,sw_=w.w||9,d=`M${x} ${Y-8}C${x+L*.3} ${Y-9.5} ${x+L*.6} ${Y-6} ${x+L} ${Y-7}`;f=S(d,dk(c,.45),sw_+1.6)+S(d,dk(c,.12),sw_)+S(d,lt(c,.22),sw_*.42,.55);for(let i=0;i<QN(130);i++){const u=RR(i)*.98,px=x+L*u,py=Y-8-Math.sin(u*3)*1.4,sd=i%2?-1:1,l=4+RR(i+3)*6;f+=hair([px,py+sd*sw_*.3],[px+l*.5,py+sd*(sw_*.5+1)],[px+l,py+sd*(sw_*.5+l*.45)],i%3===0?lt(c,.22):i%3===1?c:dk(c,.2),.75+RR(i+5)*.4,{tipLen:.4,tip:lt(c,.3)})}return{b,f}}
  }return{b:'',f:''};
}

/* ---- heads ---- */
export function headSVG(a){
  const h=a.head||{};let s='';
  if(h.t==='deer'){const c=h.c||C.brown,n=QN(210);
    const bullet=`M72 ${Y-3.5}C80 ${Y-9} 92 ${Y-16} 108 ${Y-17}C119 ${Y-17} 124 ${Y-9} 124 ${Y}C124 ${Y+9} 119 ${Y+17} 108 ${Y+17}C92 ${Y+16} 80 ${Y+9} 72 ${Y+3.5}Z`;
    s=`<path d="${bullet}" fill="${lg([[0,lt(c,.35)],[.35,c],[.8,dk(c,.35)],[1,dk(c,.6)]])}" stroke="${dk(c,.5)}" stroke-width=".6"/>`;
    for(let i=0;i<n;i++){const u=RR(i),v=RR(i+3),x=76+u*46,half=Math.min(17,3.5+(x-72)*.34)*(x>112?Math.max(.15,1-(x-112)/14):1),y=Y+(v*2-1)*half,ang=Math.atan2(y-Y,.001+(x-98)*.15)+(RR(i+5)-.5)*.5,l=1.6+RR(i+7)*2.4;s+=S(`M${r1(x)} ${r1(y)}L${r1(x+Math.cos(ang)*l*.5)} ${r1(y+Math.sin(ang)*l)}`,i%4===0?lt(c,.38):i%4===1?c:i%4===2?dk(c,.22):lt(c,.14),.75+RR(i+9)*.5,.9)}
    for(let i=0;i<QN(36);i++){const sd=i%2?-1:1,yy=Y+sd*(4+RR(i)*13),p0=[112+RR(i+2)*8,yy],p2=[134+RR(i+4)*26,Y+sd*(8+RR(i+6)*14)+(RR(i+8)-.5)*4];s+=hair(p0,[(p0[0]+p2[0])/2,(p0[1]+p2[1])/2+sd*3],p2,i%3===0?lt(c,.22):i%3===1?c:dk(c,.25),1.2+RR(i+9)*.5,{tipLen:.3,tip:dk(c,.3)})}
    return s+`<path d="M78 ${Y-6}C88 ${Y-12} 100 ${Y-15} 112 ${Y-14}" fill="none" stroke="#fff" stroke-width="2.4" opacity=".16" stroke-linecap="round"/>`}
  if(h.t==='ball'){const c=h.c||C.black;return bead(90,Y,9,c)}
  if(a.cone)return wraps(88,5.2,3,a.thread||THREAD)+coneHead(a.cone);
  if(a.bead){const r=a.br||7;return wraps(r*2+66,Math.min(5,r*.8),3,a.thread||THREAD)+bead(74+r-6,Y,r,a.bead)}
  if(a.eyes)return threadHead(a.thread)+dumbbell(a.eyes,a.flip);
  return threadHead(h.c||a.thread||THREAD);
}

/* ---- extras ---- */
export function flashSVG(c,hx){let s='';for(let i=0;i<QN(6);i++){const dy=-14+i*(28/Math.max(1,QN(6)-1)),l=40+RR(i)*12,d=`M${hx} ${Y}Q${hx+30} ${Y+dy*.3} ${hx+l} ${Y+dy+(RR(i+3)-.5)*4}`;s+=S(d,c,.7,.75)+S(d,'#fff',.25,.6)}return s}
export function clawsSVG(c){
  const claw=(s)=>{const y0=Y+s*10,g=lg([[0,lt(c,.45)],[.5,c],[1,dk(c,.45)]],0,0,0,1);return`<g><path d="M100 ${y0}L84 ${Y+s*17}" stroke="${dk(c,.55)}" stroke-width="6" stroke-linecap="round"/><path d="M100 ${y0}L84 ${Y+s*17}" stroke="${c}" stroke-width="4.6" stroke-linecap="round"/><path d="M84 ${Y+s*17}C74 ${Y+s*26} 62 ${Y+s*24} 56 ${Y+s*18}C62 ${Y+s*20} 70 ${Y+s*16} 76 ${Y+s*11}C80 ${Y+s*10} 84 ${Y+s*12} 84 ${Y+s*17}Z" fill="${g}" stroke="${dk(c,.6)}" stroke-width=".7"/><path d="M82 ${Y+s*16}C74 ${Y+s*22} 66 ${Y+s*22} 60 ${Y+s*19}" fill="none" stroke="#fff" stroke-width="1.2" opacity=".45"/></g>`};
  return claw(-1)+claw(1);
}
export function sheathSVG(a,ry){return `<ellipse cx="160" cy="${Y}" rx="76" ry="${ry}" fill="${rg([[0,'#fff',.04],[.8,'#fff',.14],[1,'#fff',.34]],.5,.5,.5)}" stroke="#fff" stroke-opacity=".55"/><ellipse cx="160" cy="${fw(Y-ry*.55)}" rx="62" ry="${fw(ry*.28)}" fill="#fff" opacity=".4"/>`+[0,1,2,3,4,5].map(i=>`<circle cx="${r1(100+RR(i+400)*120)}" cy="${r1(Y+(RR(i+410)-.5)*ry*1.5)}" r="${fw(.8+RR(i+420)*1.2)}" fill="#fff" opacity=".7" stroke="#fff" stroke-opacity=".9" stroke-width=".3"/>`).join('')}

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
