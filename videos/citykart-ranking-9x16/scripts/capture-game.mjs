// 広島グランプリのランキング画面を撮る（静止画）。
//   1) ../../../mariokart-Hiroshima で開発サーバーを立てる
//        VITE_RANKING_URL=http://ranking.demo.invalid/ranking npx vite --port 5186 --strictPort
//   2) node scripts/capture-game.mjs
//
// ランキングの送り先はブラウザの中で差し替え、架空のデモ記録を返す。本番の記録には触らない。
// 撮るもの（game-shots/）:
//   title.png        トップ画面（🏆 ランキングのボタン）
//   title-rank20.png ボタンを押して開いた上位 20 件
//   result-form.png  ゴール後のリザルト画面。名前を入れたところ
//   result-done.png  登録して 3 位に載ったところ
import { chromium } from 'file:///C:/projects/mariokart-Hiroshima/node_modules/playwright/index.mjs';
import { mkdirSync } from 'node:fs';

const PORT = process.env.PORT ?? '5186';
const OUT = 'game-shots';
mkdirSync(OUT, { recursive: true });

// 架空のデモ記録（明らかに架空とわかる名前）。広島は 140 秒未満を Worker が拒否するので、それより遅いタイムにする
const NAMES = ['もみじ饅頭', '紙屋町ダッシュ', '路面電車マニア', '八丁堀の風', 'カキフライ定食', '宮島のシカ',
  '白島ライダー', 'お好み焼き', '二葉の里', 'つけ麺大盛り', '比治山トンネル', '銀山町ブラザーズ', '十日市の星',
  '寺町ドリフト', '平和大通り', '猿猴川', '京橋川ボート', '広島駅北口', '段原ターボ', '相生橋ジャンプ', '本通り散歩'];
const TIMES = [171.84, 176.2, 181.07, 184.66, 188.12, 190.45, 193.9, 197.31, 201.6, 205.22,
  208.9, 212.37, 215.03, 219.48, 223.6, 227.15, 231.8, 236.42, 240.09, 244.7, 251.33];
const base = new Date(2026, 8, 24, 21, 0).getTime();
let entries = NAMES.map((name, i) => ({ id: `d${i}`, name, time: TIMES[i], at: base - (i * 97 + 13) * 60000 }));

const PLAYER = { name: 'ヒロシマ太郎', time: 179.53 };

const browser = await chromium.launch({
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--hide-scrollbars'],
});
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 2 });
page.on('pageerror', e => console.log('[pageerror]', e.message));

await page.route('http://ranking.demo.invalid/**', async route => {
  const req = route.request();
  if (req.method() === 'POST') {
    const { name, time } = JSON.parse(req.postData() ?? '{}');
    const mine = { id: 'mine', name, time, at: new Date(2026, 8, 25, 20, 14).getTime() };
    entries = [...entries, mine].sort((a, b) => a.time - b.time);
    const rank = entries.findIndex(e => e.id === 'mine') + 1;
    return route.fulfill({ json: { id: 'mine', rank, entries: entries.slice(0, 100) } });
  }
  return route.fulfill({ json: { entries } });
});

await page.goto(`http://localhost:${PORT}/`, { waitUntil: 'load' });
// 読み込みが終わると「1人でPLAY」ボタンが押せるようになる
await page.waitForFunction(() => !document.getElementById('startBtn').disabled, null, { timeout: 600000 });
await page.waitForTimeout(3000);
await page.screenshot({ path: `${OUT}/title.png` });
console.log('title');

await page.click('#rankOpenBtn');
await page.waitForFunction(() => document.querySelectorAll('#topRankList li').length === 20);
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/title-rank20.png` });
console.log('title-rank20');
// 一覧の下まで見えるように送る
await page.evaluate(() => document.getElementById('topRank').scrollIntoView({ block: 'end' }));
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/title-rank20-end.png` });
console.log('title-rank20-end');
await page.evaluate(() => document.getElementById('overlay').scrollTo(0, 0));
await page.click('#rankOpenBtn');

// ゴール後のリザルト画面を再現する（main.ts の showResults と同じ出し方。着順表は撮らない）
await page.evaluate(async ({ time }) => {
  const { showRanking } = await import('/src/ranking.ts');
  document.getElementById('titleMap').style.display = 'none';
  document.getElementById('resultTable').style.display = 'none';
  document.getElementById('results').style.display = 'block';
  document.getElementById('openBtn').style.display = 'none';
  const startBtn = document.getElementById('startBtn');
  startBtn.textContent = 'もう一度走る';
  showRanking({ time, name: '', canSubmit: true, onName() {} });
}, { time: PLAYER.time });
await page.waitForFunction(() => document.querySelectorAll('#rankList li').length === 10);
await page.fill('#rankName', PLAYER.name);
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/result-form.png` });
console.log('result-form');

await page.click('#rankSubmit');
await page.waitForFunction(() => document.querySelector('#rankList li.mine'));
await page.waitForTimeout(500);
await page.screenshot({ path: `${OUT}/result-done.png` });
console.log('result-done');

// 自分の行の位置（動画で寄せるため）
const box = await page.evaluate(() => {
  const r = document.querySelector('#rankList li.mine').getBoundingClientRect();
  const l = document.getElementById('rankBox').getBoundingClientRect();
  return { mine: { x: r.x, y: r.y, w: r.width, h: r.height }, box: { x: l.x, y: l.y, w: l.width, h: l.height } };
});
console.log(JSON.stringify(box));
await browser.close();
