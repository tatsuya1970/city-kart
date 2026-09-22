// LP の素材（ヒーロー動画・ポスター・カード画像）を各カートゲームの撮影素材から作る。
//   node scripts/build-media.mjs
//
// 素材は隣のリポジトリのプロモ用クリップ。先にそれぞれで撮っておく。
//   広島: ../mariokart-Hiroshima で tools/record_promo.mjs → tools/clips_to_mp4.mjs videos/assets
//   福山・松江: 各リポジトリの videos/ に入っているもの
// 広島のカード画像（原爆ドーム前の看板ゲート）は scripts/shot-hiroshima.mjs で撮る。
import { spawnSync } from 'node:child_process';
import { mkdirSync } from 'node:fs';
import path from 'node:path';

const ROOT = path.resolve(import.meta.dirname, '..');
const HIRO = path.resolve(ROOT, '../mariokart-Hiroshima/videos/assets');
const FUKU = path.resolve(ROOT, '../kart-fukuyama/videos/fukuyama-kart-promo/assets');
const MATSUE = path.resolve(ROOT, '../kart-matsue/videos/matsue-kart-promo/capture/assets/videos');
const IMG = path.join(ROOT, 'public/images');
const VID = path.join(ROOT, 'public/videos');
mkdirSync(IMG, { recursive: true });
mkdirSync(VID, { recursive: true });

// ヒーロー動画の並び。広島を主役に（尺の約3分の2）、松江・福山を1本ずつ挟む。
// 頭のコマがポスターになるので、先頭は原爆ドームの空撮にする。
const CLIPS = [
  { file: path.join(HIRO, 'dome_air.mp4'), from: 0.0, len: 5.0 },
  { file: path.join(HIRO, 'grid.mp4'), from: 0.0, len: 2.5 }, // 後半は駅の壁が画をふさぐので切る
  { file: path.join(HIRO, 'city.mp4'), from: 0.0, len: 4.0 },
  { file: path.join(HIRO, 'dome.mp4'), from: 0.0, len: 3.3 },
  { file: path.join(MATSUE, 'bridge.mp4'), from: 0.0, len: 3.0 },
  { file: path.join(HIRO, 'peacewing.mp4'), from: 0.0, len: 4.0 },
  { file: path.join(FUKU, 'bridge.mp4'), from: 0.0, len: 4.5 },
];
const XF = 0.6; // クロスフェード秒

function ffmpeg(args) {
  const r = spawnSync('ffmpeg', ['-y', '-loglevel', 'error', ...args], { stdio: 'inherit' });
  if (r.status !== 0) throw new Error('ffmpeg failed: ' + args.join(' '));
}

function buildHero(out, width, crf) {
  const inputs = CLIPS.flatMap(c => ['-ss', String(c.from), '-t', String(c.len), '-i', c.file]);
  const parts = CLIPS.map((_, i) => `[${i}:v]scale=${width}:-2,fps=30,format=yuv420p,setpts=PTS-STARTPTS[v${i}]`);
  let prev = 'v0';
  let offset = CLIPS[0].len - XF;
  for (let i = 1; i < CLIPS.length; i++) {
    const label = i === CLIPS.length - 1 ? 'out' : `x${i}`;
    parts.push(`[${prev}][v${i}]xfade=transition=fade:duration=${XF}:offset=${offset.toFixed(2)}[${label}]`);
    prev = label;
    offset += CLIPS[i].len - XF;
  }
  ffmpeg([
    ...inputs,
    '-filter_complex', parts.join(';'),
    '-map', '[out]', '-an',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', String(crf), '-pix_fmt', 'yuv420p',
    '-movflags', '+faststart',
    out,
  ]);
  console.log(out);
}

buildHero(path.join(VID, 'hero.mp4'), 1920, 26);
buildHero(path.join(VID, 'hero-mobile.mp4'), 854, 28);

// ポスターは動画の頭のコマ。読み込み前・自動再生が止められたときに出たままになる。
ffmpeg(['-i', path.join(VID, 'hero.mp4'), '-frames:v', '1', '-q:v', '3', path.join(IMG, 'hero-poster.jpg')]);

// カード画像（16:9, 1600x900）
const still = (src, at, out) => {
  ffmpeg(['-ss', String(at), '-i', src, '-frames:v', '1', '-vf', 'scale=1600:900', '-q:v', '3', path.join(IMG, out)]);
  console.log(out);
};
still(path.join(FUKU, 'bridge.mp4'), 2.0, 'card-fukuyama.jpg');
still(path.join(MATSUE, 'bridge.mp4'), 1.5, 'card-matsue.jpg');
