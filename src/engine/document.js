/* Standalone images for the app and offline comparisons. */
import { A } from '../data/variants.js';
import { fly } from './fly.js';

export function flySVGDocument(name,o={}){
  const svg=fly(A(name),{...o,q:o.q??2,label:name});
  const vb=svg.match(/viewBox="([^"]+)"/)[1].split(' ').map(Number);
  return {svg:svg.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ').replace('width="100%"',`width="${vb[2]}" height="${vb[3]}"`),vb};
}
