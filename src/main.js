import './styles.css';
import { initTree } from './ui/tree.js';
import { initTooltip } from './ui/tooltip.js';
import { initLightbox } from './ui/lightbox.js';
import { initAnatomy } from './ui/anatomy.js';
import { initNav, show, TABS } from './ui/nav.js';
import { initLearn, initLearnUI } from './ui/learn.js';

initTree();
initTooltip();
initLightbox();
initAnatomy();
initNav();
initLearn();
initLearnUI();
const tab = location.hash.replace(/^#\/?/, '');
show(TABS.some(([id]) => id === tab) ? tab : 'tree');

// Offline use once the site has been opened (not inside the Android app, which ships its own copy).
if ('serviceWorker' in navigator && location.protocol === 'https:' && location.hostname !== 'appassets.androidplatform.net')
  navigator.serviceWorker.register('./sw.js');
