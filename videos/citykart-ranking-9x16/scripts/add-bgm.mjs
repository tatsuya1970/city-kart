// BGM を index.html に敷く（組み上げ後に実行）。
//   node scripts/add-bgm.mjs
//
// 素材はユーザー提供の assets/bgm.mp3（19.88秒）。動画は15秒なので、頭から15秒だけ流して
// 最後は 1.2 秒かけて落とす。頭も 0.3 秒だけ上げる（いきなり鳴らさない）。
// ナレーションが無いので carve（声のための削り）は不要。
// assemble-index.mjs を再実行すると index.html は上書きされるので、そのあと必ず
// このスクリプトと scripts/fix-layering.mjs を実行し直すこと。
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const file = path.join(path.resolve(import.meta.dirname, '..'), 'index.html');
let html = readFileSync(file, 'utf8');

if (html.includes('id="bgm"')) {
  console.log('index.html: BGM はすでに入っています');
  process.exit(0);
}

const DUR = 15;             // 動画の長さ（音源は 19.88 秒あるので、頭から 15 秒だけ使う）
const FADE_IN = 0.3;
const FADE_OUT = 1.2;
const automation = {
  version: 1,
  lanes: [{
    target: 'volume',
    points: [
      { t: 0, v: 0 },
      { t: FADE_IN, v: 1 },
      { t: DUR - FADE_OUT, v: 1 },
      { t: DUR, v: 0 },
    ],
  }],
};

const audio = `      <!-- BGM（ユーザー提供）。頭 ${FADE_IN}s で立ち上げ、終わり ${FADE_OUT}s で落とす。
           ナレーションが無いので carve は掛けていない。 -->
      <audio
        id="bgm"
        class="clip"
        src="assets/bgm.mp3"
        data-start="0"
        data-duration="${DUR}"
        data-track-index="9"
        data-automation='${JSON.stringify(automation)}'
      ></audio>
`;

// 映像を並べているところの直後に差し込む（最後の </video> の後ろ）
const i = html.lastIndexOf('</video>');
if (i < 0) { console.error('index.html: <video> が見つかりません'); process.exit(1); }
const j = html.indexOf('\n', i) + 1;
html = html.slice(0, j) + audio + html.slice(j);
writeFileSync(file, html);
console.log(`index.html: BGM を敷きました（${DUR}s、フェードイン ${FADE_IN}s / フェードアウト ${FADE_OUT}s）`);
