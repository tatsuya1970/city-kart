// SNS のカード画像 (OGP) を作る — 日本語 public/ogp.png / 英語 public/ogp-en.png
//   node scripts/make-ogp.mjs
//
// 各ゲームの tools/make_ogp.mjs と同じ体裁にしてある (黄色のイタリック + 赤い影)。
// 背景はヒーロー動画の頭のコマ (images/hero-poster.jpg = 原爆ドームの空撮)。
// 文字はブラウザに描かせるので、日本語のフォントの心配がいらない。
// playwright は広島版のものを借りる (このリポジトリには入れていない)。
import { chromium } from 'file:///C:/projects/mariokart-Hiroshima/node_modules/playwright/index.mjs';
import { readFileSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const BG = readFileSync(path.join(ROOT, 'public/images/hero-poster.jpg')).toString('base64');

const CARDS = [
  {
    file: 'ogp.png',
    title: 'CITY KART',
    sub: 'シティカート',
    lead: 'PLATEAU の3D都市モデルで走る、広島・福山・松江の街',
    foot: 'ブラウザで、いますぐ　/　インストール不要　/　無料',
  },
  {
    file: 'ogp-en.png',
    title: 'CITY KART',
    sub: 'Race real Japanese cities',
    lead: 'Hiroshima, Fukuyama and Matsue, from MLIT’s Project PLATEAU',
    foot: 'Play in your browser  /  no install  /  free',
  },
];

const page = await (await chromium.launch()).newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1 });

for (const c of CARDS) {
  await page.setContent(`<!doctype html><html lang="ja"><meta charset="utf-8"><style>
    * { margin: 0; box-sizing: border-box; }
    body { width: 1200px; height: 630px; overflow: hidden; position: relative;
           font-family: "Segoe UI", "Hiragino Sans", "Yu Gothic UI", "Noto Sans JP", sans-serif; color: #fff; }
    .bg { position: absolute; inset: 0; background: url(data:image/jpeg;base64,${BG}) center/cover no-repeat; }
    .veil { position: absolute; left: 0; right: 0; bottom: 0; height: 74%;
            background: linear-gradient(to top, rgba(11,26,42,.97) 0%, rgba(11,26,42,.9) 34%, rgba(11,26,42,.5) 70%, rgba(11,26,42,0) 100%); }
    .box { position: absolute; left: 62px; right: 62px; bottom: 54px; }
    .t { font-size: 88px; font-weight: 900; font-style: italic; letter-spacing: .02em; line-height: 1;
         color: #ffd83d; text-shadow: 0 5px 0 #b6201f, 0 10px 24px rgba(0,0,0,.6); }
    .s { margin-top: 14px; font-size: 34px; font-weight: 800; letter-spacing: .04em; }
    .l { margin-top: 10px; font-size: 23px; font-weight: 500; opacity: .92; }
    .f { margin-top: 18px; font-size: 19px; font-weight: 600; color: #ffd83d;
         border-top: 2px solid rgba(255,216,61,.55); padding-top: 12px; display: inline-block; }
  </style>
  <div class="bg"></div><div class="veil"></div>
  <div class="box"><div class="t"></div><div class="s"></div><div class="l"></div><div class="f"></div></div>`);
  await page.evaluate(card => {
    for (const [cls, text] of [['t', card.title], ['s', card.sub], ['l', card.lead], ['f', card.foot]]) {
      document.querySelector('.' + cls).textContent = text;
    }
  }, c);
  await page.waitForTimeout(300);
  const out = path.join(ROOT, 'public', c.file);
  await page.screenshot({ path: out });
  console.log(out);
}

await page.context().browser().close();
