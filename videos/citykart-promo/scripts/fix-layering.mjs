// 重なり順を直す（組み上げ後に実行）。
//   node scripts/fix-layering.mjs
//
// 組み上げ (assemble-index.mjs) は映像をフレームから index.html の直下へ移し、
// シーンの受け皿 (.scene) より後ろに置く。どちらにも z-index が無いので、
// 後ろにある映像が前面に出て、フレームの文字を全部覆ってしまう。
// さらに transitions.mjs が受け皿に transform を掛けるため、受け皿は重なりの文脈を
// 作ってしまい、フレーム内の z-index では映像より前に出られない。
// そこで index.html 側で「シーン = 1、映像 = 0」と決める。
// assemble-index を再実行したら、このスクリプトも実行し直すこと。
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const file = path.join(path.resolve(import.meta.dirname, '..'), 'index.html');
let html = readFileSync(file, 'utf8');

const MARK = '/* 重なり順 (scripts/fix-layering.mjs) */';
if (html.includes(MARK)) {
  console.log('index.html: すでに入っています');
} else {
  const anchor = '      .scene {';
  if (!html.includes(anchor)) { console.error('index.html: .scene の指定が見つかりません'); process.exit(1); }
  const rules = `      ${MARK}
      /* 映像はフレームの下。文字・暗幕はフレーム側 (.scene) に乗っている */
      .scene { z-index: 1; }
      video.clip { z-index: 0; }

${anchor}`;
  html = html.replace(anchor, rules);
  writeFileSync(file, html);
  console.log('index.html: 重なり順を入れました (.scene=1 / video=0)');
}
