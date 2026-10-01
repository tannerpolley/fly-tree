// Build the Android app: copy the web build (dist/) into the APK's assets and run Gradle.
// Needs the Android SDK (ANDROID_HOME, ANDROID_SDK_ROOT or ~/Android/Sdk) and JDK 17+.
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';

const root = path.resolve(import.meta.dirname, '..');
const www = path.join(root, 'android/app/src/main/assets/www');
fs.rmSync(www, { recursive: true, force: true });
fs.cpSync(path.join(root, 'dist'), www, { recursive: true });
fs.rmSync(path.join(www, 'sw.js'), { force: true }); // the app ships its own files; no offline cache needed

const props = path.join(root, 'android/local.properties');
if (!fs.existsSync(props)) {
  const sdk = process.env.ANDROID_HOME || process.env.ANDROID_SDK_ROOT || path.join(os.homedir(), 'Android/Sdk');
  fs.writeFileSync(props, `sdk.dir=${sdk}\n`);
}
const r = spawnSync('./gradlew', ['assembleDebug'], { cwd: path.join(root, 'android'), stdio: 'inherit', timeout: 20 * 60 * 1000 });
if (r.status !== 0) process.exit(r.status ?? 1);
console.log('\nAPK: android/app/build/outputs/apk/debug/app-debug.apk');
