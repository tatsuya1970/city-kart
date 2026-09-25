# 紹介動画

citykart.jp（3作の入口ページ）ができたことを知らせる20秒の動画です。HyperFrames で作っています。

| プロジェクト | 画面 | 用途 |
| --- | --- | --- |
| `citykart-promo/` | 1920×1080（16:9） | X・YouTube・サイト埋め込み |
| `citykart-promo-9x16/` | 1080×1920（9:16） | ショート動画・ストーリーズ |

書き出したファイル（`renders/`。git には入れていません）。

| ファイル | 大きさ | 用途 |
| --- | --- | --- |
| `citykart-promo/renders/video.mp4` | 約37MB | 元データ。高画質 |
| `citykart-promo/renders/video-mobile.mp4` | 約3MB | 1280×720。SNS投稿・スマホ向け |
| `citykart-promo-9x16/renders/video.mp4` | 約29MB | 縦型の元データ。高画質 |
| `citykart-promo-9x16/renders/video-mobile.mp4` | 約2.7MB | 720×1280。縦型のスマホ向け |

## 構成（20秒・5カット）

1. **0–3s 掴み** — 原爆ドームの空撮に「実在の街が、サーキットになる。」
2. **3–7s 広島** — 原爆ドーム前の看板ゲートをくぐる走行＋1周7.31km×2周
3. **7–11s 福山** — 芦田川大橋の主塔をくぐる＋鞆の浦まで20.7kmのワンウェイ
4. **11–15s 松江** — 宍道湖大橋の並走から夕日の湖面へ＋1周9.6km×2周
5. **15–20s 入口** — citykart.jp の実画面が立ち上がり、URLと「無料・インストール不要・最大8人で対戦」

決めごとは `BRIEF.md`（何を伝えるか）、`STORYBOARD.md`（カットごとの画と動き）、`frame.md`（色と書体）にあります。
ラフ絵は `storyboard.html`（ブラウザで開く）。

## 作り直す

```bash
cd videos/citykart-promo            # 縦型は citykart-promo-9x16
node scripts/fetch-font.mjs         # 日本語フォント（Noto Sans JP の必要な文字だけ）
node scripts/apply-font.mjs         # 各カットに @font-face を当てる
npx hyperframes check               # 検査
npx hyperframes render --skill=product-launch-video --quality high --output renders/video.mp4
```

**組み上げ直したときの注意。** `assemble-index.mjs` は各カットの `<video>` を index.html へ移す
（フレーム側からは消える）ので、失敗するとフレームから映像が抜けたままになります。その場合は
`node scripts/restore-media.mjs` で戻してから、もう一度組み上げてください。組み上げの後は
`node scripts/fix-layering.mjs`（映像を文字の下へ）と `node scripts/add-bgm.mjs`（BGM）を
実行し直す必要があります。この3つは index.html を上書きする操作のたびに必要です。

素材は各ゲームのリポジトリの走行クリップと、citykart.jp のキャプチャです（`assets/`。git には
入れていません）。BGM はユーザー提供の「カートレースのテンポ」。

---

# ランキング機能の告知動画

`citykart-ranking/`（1920×1080・15秒）。ゴールタイムのランキングができたことを知らせる動画です。
書き出しは `citykart-ranking/renders/video.mp4`（約17MB。git には入れていません）。

## 構成（15秒・5カット）

1. **0–3.5s** — 広島の走行に「NEW / ランキング機能 登場 / ゴールタイムで、競え。」
2. **3.5–5s** — 「FINISH」とタイム 2:59.53 の数え上げ
3. **5–10s** — リザルト画面で「ヒロシマ太郎」を登録し、3位の行が黄色く光る＋「ランキングに、名前を刻め。」
4. **10–12s** — トップ画面の🏆ボタンから上位20件
5. **12–15s** — 「広島・福山・松江 それぞれにランキング」と citykart.jp

ランキングの画面は `scripts/capture-game.mjs` で撮っています。広島版の開発サーバーを立て、
ランキングの送り先をブラウザ内で差し替えて架空のデモ記録を返しています（本番の記録には触れない）。
名前はすべて架空です。

組み上げ直したときは、前作と同じく `fix-layering.mjs` と `add-bgm.mjs` を実行し直してください。
あわせて index.html の `f02-footage` の `data-media-start` を `2.0` に戻す必要があります
（1カット目の終わりと映像の位置を揃えるため。組み上げると frame 側の 1.7 に戻ります）。

## TikTok 用の縦型（citykart-ranking-9x16/）

1080×1920・15秒。横型と同じ構成で、締め（5カット目）だけ「「シティカート」で検索」に替えています
（TikTok では URL を押せないため）。文字は TikTok の画面 UI に隠れないよう x 60–900 / y 220–1440 に収めています。
書き出しは `citykart-ranking-9x16/renders/video.mp4`（約15MB）。
横型の各カットは参照用に `.frames-16x9/` に残しています。
