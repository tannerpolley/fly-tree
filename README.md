# Fly Family Tree

Interactive trout fly family tree: fly types and how to recognise them, colour variants, season / water / depth,
how each fly is rigged (with knots), a picture gallery, by-insect view, anatomy, glossary and quiz.

- Website: https://tannerpolley.github.io/fly-tree/ (installable as an app from Chrome: menu → Install app)
- Android app: `npm run android` builds `android/app/build/outputs/apk/debug/app-debug.apk`

## Develop

    npm install
    npm run dev       # local dev server
    npm test          # data completeness + every fly renders to a valid image
    npm run build     # production build in dist/

## Layout

- `src/data/` – the tree, pattern drawings, colours, seasons, rigs, glossary, anatomy
- `src/engine/` – the fly illustration engine (SVG)
- `src/ui/` – tree chart, info area, rig diagram, gallery/quiz/glossary tabs, anatomy, navigation
- `android/` – small native wrapper (WebView) that ships the built site inside the APK and works offline.
  Needs the Android SDK (`ANDROID_HOME` or `~/Android/Sdk`) and JDK 17+.
