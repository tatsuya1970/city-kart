// この動画で使う日本語フォントを、使う文字だけに絞って取ってくる。
//   node scripts/fetch-font.mjs [出力ディレクトリ]   (既定: assets/fonts)
//
// HyperFrames の書き出しは素の headless Chrome で走るので、システムの日本語フォント
// (Yu Gothic / Hiragino など) は当てにできない。ファイルとして同梱した @font-face だけが効く。
// Google Fonts の css2 API は text= を付けると「その文字だけ」の woff2 を返すので、
// フルの CJK (1書体 5MB 超) を持ち込まずに済む。
// Noto Sans JP — SIL Open Font License 1.1。福山・松江のプロモと同じやり方。
import { mkdirSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const outDir = path.resolve(process.argv[2] ?? path.join(import.meta.dirname, '..', 'assets', 'fonts'));
mkdirSync(outDir, { recursive: true });

// 画面に出る文字 + 取りこぼし対策 (ASCII 全部・かな全部・よく使う記号)
const ASCII = Array.from({ length: 95 }, (_, i) => String.fromCharCode(32 + i)).join('');
const HIRAGANA = Array.from({ length: 96 }, (_, i) => String.fromCharCode(0x3041 + i)).join('');
const KATAKANA = Array.from({ length: 96 }, (_, i) => String.fromCharCode(0x30a1 + i)).join('');
const SYMBOLS = '、。・「」『』（）［］〈〉ー〜…‥／＼％＋－×÷＝→←↑↓©℃　';
const COPY = [
  'CITY KART', 'citykart.jp', 'シティカート',
  'NEW', 'ランキング機能 登場', 'ゴールタイムで、競え。', 'FINISH', '0123456789:.',
  'ランキングに、名前を刻め。', 'トップ画面の🏆から 上位20件',
  '広島・福山・松江 それぞれにランキング', '広島グランプリ', '福山グランプリ', '松江グランプリ',
  'HIROSHIMA', 'FUKUYAMA', 'MATSUE', 'ヒロシマ太郎', '位', '登録',
  '無料', 'インストール不要', '最大8人で対戦', '「シティカート」で検索',
].join('');

const chars = [...new Set((ASCII + HIRAGANA + KATAKANA + SYMBOLS + COPY).split(''))].join('');
console.log(`字数 ${chars.length}`);

const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125 Safari/537.36';

for (const weight of [400, 700, 900]) {
  const api = `https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@${weight}&text=${encodeURIComponent(chars)}&display=block`;
  const css = await (await fetch(api, { headers: { 'User-Agent': UA } })).text();
  // 絞り込みを掛けると URL は .woff2 で終わらず /l/font?kit=... の形で返ってくる
  const url = css.match(/url\((https:[^)]+)\)/)?.[1];
  if (!url) { console.error(`weight ${weight}: woff2 の URL が取れませんでした\n${css.slice(0, 200)}`); process.exit(1); }
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  const file = path.join(outDir, `NotoSansJP-${weight}.woff2`);
  writeFileSync(file, buf);
  console.log(`${file} (${(buf.length / 1024).toFixed(1)}KB)`);
}
