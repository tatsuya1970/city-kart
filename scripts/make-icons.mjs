// ファビコンとアプリ用アイコンを作る。4 サイトで同じ絵柄を使う。
//   node scripts/make-icons.mjs [出力先ディレクトリ]   (既定: public)
//
// なぜ実ファイルが要るか:
//   HTML に埋め込んだデータ URI のアイコンは、Google の検索結果のファビコンとして
//   使われない (クローラが取りに行ける URL が要る)。iOS のホーム画面も同じ。
//
// 作るもの:
//   icon.svg           元絵 (対応ブラウザはこれを使う。拡大しても綺麗)
//   favicon.ico        16/32/48px を 1 つにまとめたもの (Google と古いブラウザ向け)
//   apple-touch-icon.png  180x180 (iOS のホーム画面。角丸は iOS が付ける)
//   icon-192.png / icon-512.png  Android のホーム画面・PWA 向け
import { chromium } from 'file:///C:/projects/mariokart-Hiroshima/node_modules/playwright/index.mjs';
import { writeFileSync, readFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const OUT = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, '..', 'public'));
mkdirSync(OUT, { recursive: true });

const BG = '#0b1a2a';       // 各サイトの背景と同じ濃紺
const FG = '#ffd83d';       // タイトル文字と同じ黄色
/** チェッカーフラッグ。市松の 8 マスを描く */
const squares = [[12, 12], [32, 12], [22, 22], [42, 22], [12, 32], [32, 32], [22, 42], [42, 42]];
const checkers = squares.map(([x, y]) => `<rect x="${x}" y="${y}" width="10" height="10"/>`).join('');

/** @param {number} r 角丸の半径 (0 なら角丸なし。iOS 用は iOS 側が角を丸める) */
const svg = (r = 14) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" width="64" height="64">
  <rect width="64" height="64" rx="${r}" fill="${BG}"/>
  <g fill="${FG}">${checkers}</g>
</svg>`;

writeFileSync(path.join(OUT, 'icon.svg'), svg() + '\n');

const browser = await chromium.launch();
/** SVG をその大きさで描いて PNG にする */
async function png(size, radius) {
  const page = await browser.newPage({ viewport: { width: size, height: size }, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><meta charset="utf-8"><style>*{margin:0}html,body{width:${size}px;height:${size}px;overflow:hidden}svg{width:${size}px;height:${size}px;display:block}</style>${svg(radius)}`);
  const buf = await page.screenshot({ type: 'png' });
  await page.close();
  return buf;
}

for (const [size, file, radius] of [[180, 'apple-touch-icon.png', 0], [192, 'icon-192.png', 14], [512, 'icon-512.png', 14]]) {
  writeFileSync(path.join(OUT, file), await png(size, radius));
  console.log(path.join(OUT, file));
}

// favicon.ico は PNG をそのまま入れられる (Vista 以降の形式)。16/32/48 を 1 つに束ねる。
const sizes = [16, 32, 48];
const images = [];
for (const s of sizes) images.push({ size: s, data: await png(s, s >= 32 ? 7 : 4) });
await browser.close();

const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);            // 予約
header.writeUInt16LE(1, 2);            // 1 = アイコン
header.writeUInt16LE(images.length, 4);
let offset = 6 + 16 * images.length;
const dir = [];
for (const img of images) {
  const e = Buffer.alloc(16);
  e.writeUInt8(img.size === 256 ? 0 : img.size, 0);  // 幅 (256 は 0 で表す)
  e.writeUInt8(img.size === 256 ? 0 : img.size, 1);  // 高さ
  e.writeUInt8(0, 2);                  // 色数 (パレットなし)
  e.writeUInt8(0, 3);                  // 予約
  e.writeUInt16LE(1, 4);               // カラープレーン
  e.writeUInt16LE(32, 6);              // ビット深度
  e.writeUInt32LE(img.data.length, 8); // データの大きさ
  e.writeUInt32LE(offset, 12);         // データの位置
  offset += img.data.length;
  dir.push(e);
}
writeFileSync(path.join(OUT, 'favicon.ico'), Buffer.concat([header, ...dir, ...images.map(i => i.data)]));
console.log(path.join(OUT, 'favicon.ico'), `(${sizes.join('/')}px)`);
console.log(path.join(OUT, 'icon.svg'));
