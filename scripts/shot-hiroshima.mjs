// 広島グランプリのカード画像を撮る — public/images/card-hiroshima.jpg
//   1) ../mariokart-Hiroshima で開発サーバーを立てる（例: npx vite --port 5185）
//   2) PORT=5185 node scripts/shot-hiroshima.mjs
//
// 広島版には福山・松江版のような録画モード (?rec=1) が無いので、デバッグ表示で
// 原爆ドーム前（経由地 8）に置いた静止画を撮る。HUD は隠す。
// playwright は広島版のものを借りる。
import { chromium } from 'file:///C:/projects/mariokart-Hiroshima/node_modules/playwright/index.mjs';
import { spawnSync } from 'node:child_process';
import path from 'node:path';

const PORT = process.env.PORT ?? '5185';
const ROOT = path.resolve(import.meta.dirname, '..');
const PNG = path.join(ROOT, 'card-hiroshima.png');
const JPG = path.join(ROOT, 'public/images/card-hiroshima.jpg');

const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });
await page.goto(`http://localhost:${PORT}/?debug=1&wp=8&cam=0&nofps=1&q=high`, { waitUntil: 'load' });
await page.waitForFunction(() => window.__debug, null, { timeout: 300000 });
await page.waitForTimeout(4000);
await page.evaluate(() => {
  for (const id of ['hud', 'touch']) { const h = document.getElementById(id); if (h) h.style.display = 'none'; }
});
await page.waitForTimeout(500);
await page.screenshot({ path: PNG, timeout: 300000 });
await browser.close();

spawnSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', PNG, '-q:v', '3', JPG], { stdio: 'inherit' });
spawnSync(process.execPath, ['-e', `require('fs').rmSync(${JSON.stringify(PNG)})`]);
console.log(JPG);
