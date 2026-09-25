// 各フレームの映像宣言を復元する。
//   node scripts/restore-media.mjs
//
// 経緯: フレームを書いたワーカーが、組み上げ (assemble-index.mjs) の「映像を index 側へ
// 移す」処理を自分のファイルに対して試し、その結果（映像が抜けた状態）を保存してしまった。
// 各ファイルには目印のコメント
//   <!-- approved frame video hoisted by assemble-index -->
// だけが残っているので、そこへ STORYBOARD のとおりの <video> を戻す。
// 組み上げの規約: data-frame-video="approved" + 数値の配置指定 + class="clip" + 時間指定。
// 何度実行しても二重に入らない（目印が無ければ何もしない）。
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const MARK = '<!-- approved frame video hoisted by assemble-index -->';

/** フレームごとの映像。start/dur は STORYBOARD の Scene 行どおり */
const MEDIA = {
  '01-hook.html': [
    { id: 'f01-video-air', src: 'hiro-dome-air.mp4', start: 0, dur: 3, track: 0 },
  ],
  '02-hiroshima.html': [
    { id: 'f02-video-gate', src: 'hiro-dome-gate.mp4', start: 0, dur: 2.4, track: 1 },
    { id: 'f02-video-city', src: 'hiro-city.mp4', start: 2.4, dur: 1.6, track: 2 },
  ],
  '03-fukuyama.html': [
    { id: 'f03-video-bridge', src: 'fuku-bridge.mp4', start: 0, dur: 2.25, track: 1 },
    { id: 'f03-video-goal', src: 'fuku-goal.mp4', start: 2.25, dur: 1.75, track: 2 },
  ],
  '04-matsue.html': [
    { id: 'f04-video-sunset', src: 'matsue-sunset.mp4', start: 2.9, dur: 1.1, track: 2 },
  ],
  '05-cta.html': [
    { id: 'f05-video-air', src: 'hiro-dome-air.mp4', start: 0, dur: 5, track: 0 },
  ],
};

const tag = v => `<video
      id="${v.id}"
      class="clip"
      data-frame-video="approved"
      src="assets/${v.src}"
      muted
      playsinline
      data-start="${v.start}"
      data-duration="${v.dur}"
      data-track-index="${v.track}"
      data-frame-video-x="0"
      data-frame-video-y="0"
      data-frame-video-width="1920"
      data-frame-video-height="1080"
      data-frame-video-fit="cover"
    ></video>`;

for (const [name, videos] of Object.entries(MEDIA)) {
  const file = path.join(root, 'compositions', 'frames', name);
  let html = readFileSync(file, 'utf8');
  let i = 0;
  html = html.replace(new RegExp(MARK.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g'),
    () => (i < videos.length ? tag(videos[i++]) : MARK));
  if (i === 0) { console.log(`${name}: 目印が無いので触っていません`); continue; }
  writeFileSync(file, html);
  console.log(`${name}: ${i} 本の映像を戻しました (${videos.slice(0, i).map(v => v.src).join(', ')})`);
}

// 04 のやり残し: 既にあるブリッジの <video> に class="clip" が無いので足す
const f04 = path.join(root, 'compositions', 'frames', '04-matsue.html');
let h4 = readFileSync(f04, 'utf8');
if (h4.includes('id="frame-04-matsue-bridge"') && !/id="frame-04-matsue-bridge"\s*\n\s*class="clip"/.test(h4)) {
  h4 = h4.replace('id="frame-04-matsue-bridge"', 'id="frame-04-matsue-bridge"\n      class="clip"');
  writeFileSync(f04, h4);
  console.log('04-matsue.html: 既存の <video> に class="clip" を足しました');
}
