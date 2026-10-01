import { defineConfig } from 'vite';

// Relative paths so the same build works on GitHub Pages (/fly-tree/) and inside the Android app.
export default defineConfig({ base: './' });
