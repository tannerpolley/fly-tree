/* A fly drawing as a standalone SVG document (valid XML, so it can be loaded as an image file). */
import { A } from '../data/variants.js';
import { fly } from './fly.js';

const xml=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
export function flySVGDocument(name,o={}){
  const svg=fly(A(name),{q:o.q==null?2:o.q,studio:o.studio,bare:o.bare,noctx:o.noctx,label:xml(name)});
  const vb=svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  return {svg:svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace('width="100%"',`width="${vb[2]}" height="${vb[3]}"`),vb};
}
