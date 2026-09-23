// 英語ページを仕上げる (ビルド後に実行) — 広島版 tools/build_en_page.mjs と同じ考え方。
//   node scripts/build-en.mjs [distDir]
//
// なぜ要るか:
//   検索エンジンや AI のクローラは JavaScript を実行しない。画面上の言語切替で
//   英語にしても、クローラには日本語のページとしか見えない。そこで英語に実体のある
//   URL (/en/) を与え、head と本文を静的に英語にして置く。
//
// やっていること:
//   - dist/index.html (日本語) から ABOUT:en / FAQ:en を取り除いて書き戻す。
//   - dist/en/index.html (英語) を書き出す。<html lang> を en にし、SEO:ja を
//     scripts/seo-en.html に差し替え、ABOUT:ja / FAQ:ja を取り除き、data-en を持つ
//     単純な要素と data-en-html の中身を英語にし、data-href-en のリンクを英語版へ向ける。
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const dist = path.resolve(root, process.argv[2] ?? 'dist');
const src = path.join(dist, 'index.html');
const outDir = path.join(dist, 'en');
const out = path.join(outDir, 'index.html');

function fail(msg) {
  console.error(msg);
  process.exit(1);
}

/** `<!-- ==== NAME ====` から `<!-- ==== /NAME ==== -->` までを replacement に置き換える */
function replaceBlock(html, name, replacement, { optional = false } = {}) {
  const begin = `<!-- ==== ${name} ====`;
  const end = `<!-- ==== /${name} ==== -->`;
  const from = html.indexOf(begin);
  const to = html.indexOf(end);
  if (from < 0 && to < 0 && optional) return html;
  if (from < 0 || to < 0) fail(`${src} に ${name} のブロックが見つかりません。index.html の目印コメントを消していませんか`);
  return html.slice(0, from) + replacement + html.slice(to + end.length);
}

/** 属性値の HTML エスケープを戻す (data-en-html は属性に入っているため) */
const unescapeAttr = s => s
  .replace(/&quot;/g, '"')
  .replace(/&#39;/g, "'")
  .replace(/&lt;/g, '<')
  .replace(/&gt;/g, '>')
  .replace(/&amp;/g, '&');

const html = readFileSync(src, 'utf8');

// 日本語版。2 回実行しても壊れないよう、すでに取り除いてあれば何もしない
let ja = replaceBlock(html, 'ABOUT:en', '', { optional: true });
ja = replaceBlock(ja, 'FAQ:en', '', { optional: true });
writeFileSync(src, ja);

// 英語版
const seoEn = readFileSync(path.join(root, 'scripts', 'seo-en.html'), 'utf8').trim();
let en = replaceBlock(html, 'SEO:ja', seoEn);
en = replaceBlock(en, 'ABOUT:ja', '');
en = replaceBlock(en, 'FAQ:ja', '');
en = en.replace(/<html lang="ja"/, '<html lang="en"');
if (!/<html lang="en"/.test(en)) fail('<html lang="ja"> が見つかりません');

// data-en-html を持つ要素は中身を丸ごと差し替える (リンクを含むため)
en = en.replace(/(<(\w+)\b[^>]*\sdata-en-html='([^']*)'[^>]*>)[\s\S]*?(<\/\2>)/g,
  (_, open, _tag, inner, close) => open + unescapeAttr(inner) + close);
// 見出しなど、中に子要素を持たない data-en の要素を静的に英語へ。
// 属性値はエスケープ済みなので、そのまま本文に入れてよい
en = en.replace(/(<(\w+)\b[^>]*\sdata-en="([^"]*)"[^>]*>)[^<]*(<\/\2>)/g,
  (_, open, _tag, text, close) => open + text + close);
// 各ゲームへのリンクを英語版 (/en/) へ向ける
en = en.replace(/href="[^"]*"([^>]*\sdata-href-en="([^"]*)")/g, (_, rest, target) => `href="${target}"${rest}`);

mkdirSync(outDir, { recursive: true });
writeFileSync(out, en);

// 取りこぼしの確認: 英語ページの本文に日本語が残っていたら知らせる。静的な英訳の
// 抜けは画面を見ないと気づきにくいので、ここで出しておく。
// 除くもの: HTML コメント、<script> の中 (コメントや文字列)、言語切替の「日本語」ボタン。
const body = en.slice(en.indexOf('<body>'))
  .replace(/<!--[\s\S]*?-->/g, '')
  .replace(/<script[\s\S]*?<\/script>/g, '')
  .replace(/<div id="langs">[\s\S]*?<\/div>/, '');
const jaLeft = body.match(/[ぁ-んァ-ヶ一-龠]+/g);
if (jaLeft) console.warn(`注意: /en/ に日本語が残っています: ${[...new Set(jaLeft)].slice(0, 12).join(' ')}`);

console.log(`言語別のページを書き出しました: ${path.relative(root, src)} / ${path.relative(root, out)}`);
