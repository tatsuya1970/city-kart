// 各フレームに日本語フォント (Noto Sans JP) を当てる。
//   node scripts/apply-font.mjs
//
// 書き出しは素の headless Chrome で走るので、システムのフォントは当てにできない。
// 同梱した woff2 を @font-face で読ませ、総称 sans-serif / monospace の指定を
// その書体に差し替える。福山・松江のプロモと同じやり方。
// 何度実行しても二重に入らない（すでに入っていれば飛ばす）。
import { readFileSync, writeFileSync, readdirSync, existsSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const framesDir = path.join(root, 'compositions', 'frames');
for (const w of [400, 700, 900]) {
  const f = path.join(root, 'assets', 'fonts', `NotoSansJP-${w}.woff2`);
  if (!existsSync(f)) { console.error(`${f} がありません。先に node scripts/fetch-font.mjs`); process.exit(1); }
}

const faces = [400, 700, 900].map(w => `    @font-face {
      font-family: "Noto Sans JP";
      src: url("assets/fonts/NotoSansJP-${w}.woff2") format("woff2");
      font-weight: ${w};
      font-style: normal;
      font-display: block;
    }`).join('\n');

let changed = 0;
for (const name of readdirSync(framesDir).filter(f => f.endsWith('.html'))) {
  const file = path.join(framesDir, name);
  let html = readFileSync(file, 'utf8');
  // 「@font-face」の文字列はコメントにも出てくるので、実際に読み込んでいるかで見る
  if (html.includes('NotoSansJP-400.woff2')) { console.log(`${name}: すでに入っています`); continue; }

  const i = html.indexOf('<style>');
  if (i < 0) { console.error(`${name}: <style> が見つかりません`); process.exit(1); }
  html = html.slice(0, i + '<style>'.length) + '\n' + faces + html.slice(i + '<style>'.length);

  // 総称指定を実体のある書体に差し替える。ワーカーはフォントが無い前提で
  // sans-serif / monospace とだけ書いているので、その並びの先頭に足す。
  const before = html;
  html = html
    .replace(/font-family:\s*sans-serif/g, 'font-family: "Noto Sans JP", sans-serif')
    .replace(/font-family:\s*monospace/g, 'font-family: "Noto Sans JP", monospace');
  if (html === before) console.log(`${name}: 注意 — 差し替える font-family が見つかりませんでした`);

  writeFileSync(file, html);
  console.log(`${name}: フォントを当てました`);
  changed++;
}
console.log(`${changed} ファイルを更新`);
