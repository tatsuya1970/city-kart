---
format: 1920x1080
duration: 20s
message: "広島・福山・松江の3つの街を走るカートレースが、citykart.jp にまとまった"
arc: Feature-Benefit Cascade（視覚スペクタクルの hook → 3つの街を1つずつ → 入口の提示）
audience: 日本語のSNS利用者。PLATEAU・街歩き・レースゲームに反応する層と、広島・福山・松江の地元の人
mode: collaborative
music: assets/bgm.mp3（ユーザー提供「カートレースのテンポ」19.88s。フェードイン0.4s/フェードアウト1.2s）
---

## Locked

絵コンテ v1 で確定したもの（本制作で変えない）。

- 5カットの並びと尺配分（3s / 4s / 4s / 4s / 5s = 20s）
- 各カットの文言と、文字の位置（街名は左下、距離は黄色でその下、英字ラベルは最下）
- 締めは citykart.jp の実画面。OGP カードには置き換えない
- 英字ラベル（HIROSHIMA / FUKUYAMA / MATSUE）は入れる

## Video direction

動画全体に共通する決まり。各フレームの Scene 行には差分だけを書く。

- **palette system** — `frame.md` の 2レジスタのうち dark register だけを使う。地 = ink-black (#0B1A2A)、
  文字 = cream (#EEF1F4)、差し色 = fire-orange (#FFD83D) の1色のみ。補助文字は cream-muted。
  映像は常に全面 (background) で、その上に濃紺の暗幕を下から掛けて文字を読ませる。
- **motion grammar + reveal model** — 長い尾を引くイージング (power3 既定、跳ねさせない)。
  ナレーションが無いので、reveal は**映像の出来事に合わせる**: 看板が頭上を通過する瞬間、橋の主塔をくぐる瞬間、
  夕日が開ける瞬間に文字を着地させる。t=0 で全部出さない。各カットとも、街名 → 距離 → 英字ラベルの順に
  時間をずらして入れ、後半50%にも必ず1つ着地を残す。
- **rhythm / held-frame allocation** — 休符は Frame 4 の後半（夕日の湖面）。ここだけ文字も映像も動かさず静止させ、
  Frame 5 の収束が効くようにする。Frame 1 は映像のカメラが動き続けるので、文字側は静かに。
- **negative list** — 光彩 (glow)、浮遊するパーティクル、偽のブラウザ枠や作り物の UI、角丸カード、影。
  スライド化（1カット1枚の静止カードを並べる）と、スクリーンセーバー化（意味のない浮遊アニメ）の
  両方を禁じる。マリオカートを想起させる文言・意匠も使わない。
- **caption keep-out** — 字幕は無いが、下 17% には主要な要素を置かない（端の一貫性のため）。

## Frame 1 — 実在の街が、サーキットになる

- scene: 原爆ドームの空撮に、LPの見出しが黄色いイタリックで着地する
- voiceover: ""
- duration: 3s
- transition_in: cut
- status: animated
- src: compositions/frames/01-hook.html
- type: hook
- persuasion: Show-don't-tell proof（実物の街がそのまま3Dで建っていることを、説明せず1カットで見せる）
- beat: awe + curiosity
- blueprint: video-text-pivot (Adapt)
- focal: assets/hiro-dome-air.mp4
- roles: hiro-dome-air = background（全面。下から濃紺の暗幕）
- asset_candidates: assets/hiro-dome-air.mp4 — 原爆ドームを空から捉えた周回カメラ、5.0s

narrativeRole: 最初の1秒で「これは本物の街だ」と分からせ、見る理由を作る。音なし再生でも、絵だけで掴む。
keyMessage: 実在の街がそのままコースになっている。

Adapt: 映像から言葉へ主役が移る signature はそのまま。ナレーションが無いので、言葉が乗る合図は
映像側の動き（周回カメラがドームを正面に捉える瞬間）に置き換える。

Scene 1 (0.0–1.1s): 空撮だけ。原爆ドームが中央やや右、周回カメラが動き続ける（素材自身の動き）。文字はまだ無い — full-width strip、映像が画面の100%。
Scene 2 (1.1–2.0s): カメラがドームを正面に捉えたところで、左下に kicker「CITY KART」が黄色で着地。同時に下からの暗幕が濃くなる（per-word staggered reveal → dynamic-content-sequencing）— 左下 1/3 に文字、上 2/3 は映像のまま。
Scene 3 (2.0–3.0s): 見出し「実在の街が、/ サーキットになる。」が2行、下から順に着地して静止する（held read）。映像は動き続け、文字だけが止まる — 左下寄せ、display 級の大きさで画面幅の約 55%。

## Frame 2 — 広島グランプリ

- scene: 「原爆ドーム前」の看板ゲートをくぐる走行に、街の名前と距離が重なる
- voiceover: ""
- duration: 4s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/02-hiroshima.html
- type: feature_showcase
- persuasion: Show-don't-tell proof（看板の地名が実在のものだと一目で分かる）
- beat: excitement
- blueprint: kinetic-type-beats (Adapt)
- focal: assets/hiro-dome-gate.mp4
- roles: hiro-dome-gate = background（前半。全面）· hiro-city = background（後半に差し替え。全面）
- asset_candidates: assets/hiro-dome-gate.mp4 — 原爆ドーム前の看板ゲート通過、3.3s; assets/hiro-city.mp4 — 相生通りの市街地疾走、4.0s

narrativeRole: 3つの街の1つ目。ゲーム内の看板がそのまま画の装置になることを、ここで観客に教える。
keyMessage: 広島グランプリ — 1周 7.31km を2周。

Adapt: 短い単位が次々に着地する beat-slam の signature は保つ。拍を刻むのは音ではなく映像の出来事
（看板ゲートの通過、街並みへの切り替わり）。3作とも同じ順（街名 → 距離 → 英字）で組み、視聴者に型を覚えさせる。

Scene 1 (0.0–1.3s): 映像だけ。「原爆ドーム前」の看板ゲートが画面奥から近づき、頭上を通過する — 全面、文字なし。
Scene 2 (1.3–2.4s): ゲートが頭上を抜けた瞬間に「広島グランプリ」が左下へ叩きつけられる（kinetic beat-slam → kinetic-beat-slam）— 左下寄せ、h2 級。
Scene 3 (2.4–3.2s): 「1周 7.31km × 2周」が黄色で街名の下に着地。同時に背景が hiro-city へ切り替わる。前後とも進行方向と速度が揃っているので繋ぎ目は見えない（cut-the-curve → cut-catalog.md）。
Scene 4 (3.2–4.0s): 最下に英字ラベル「HIROSHIMA」が小さく入り、文字は3つとも静止して読ませる。走っている映像だけが動き続ける — 3層（映像 / 暗幕 / 文字）。

## Frame 3 — 福山グランプリ

- scene: 芦田川大橋の主塔をくぐり、瀬戸内の海沿いへ抜ける。ワンウェイであることを距離で示す
- voiceover: ""
- duration: 4s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/03-fukuyama.html
- type: feature_showcase
- persuasion: Negative contrast（周回しない一本道という、3作で唯一の違いを際立たせる）
- beat: aspiration
- blueprint: kinetic-type-beats (Adapt)
- focal: assets/fuku-bridge.mp4
- roles: fuku-bridge = background（前半。全面）· fuku-goal = background（後半に差し替え。全面）
- asset_candidates: assets/fuku-bridge.mp4 — 芦田川大橋の主塔をくぐる走行、4.5s; assets/fuku-goal.mp4 — 鞆の浦・常夜燈の GOAL ゲート、5.0s

narrativeRole: 2つ目。3作が同じものの繰り返しではないことを、コースの形の違いで示す。
keyMessage: 福山グランプリ — 鞆の浦まで 20.7km のワンウェイ。

Adapt: Frame 2 と同じ型（街名 → 距離 → 英字）を保ちつつ、ここだけ「ワンウェイ」を強めて3作の違いを立てる。
行き先（鞆の浦 常夜燈）を小さく添えるのもこのフレームだけ。

Scene 1 (0.0–1.2s): 映像だけ。斜張橋・芦田川大橋の主塔が近づき、ケーブルの下をくぐる — 全面、文字なし。
Scene 2 (1.2–2.2s): 主塔を抜けた瞬間に「福山グランプリ」が左下へ叩きつけられる（kinetic beat-slam → kinetic-beat-slam）。
Scene 3 (2.2–3.1s): 「20.7km ワンウェイ」が黄色で着地。「ワンウェイ」の4文字だけ一拍遅れて強く入る（keyword emphasis）。同時に背景が fuku-goal（鞆の浦の GOAL ゲート）へ切り替わる（cut-the-curve → cut-catalog.md）。
Scene 4 (3.1–4.0s): 行き先「福山駅 → 鞆の浦 常夜燈」と英字ラベル「FUKUYAMA」が最下に小さく入り、文字は静止して読ませる。

## Frame 4 — 松江グランプリ

- scene: 宍道湖大橋をカートが並走し、夕日の湖面へ。3つ目の街を締める
- voiceover: ""
- duration: 4s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/04-matsue.html
- type: feature_showcase
- persuasion: Rule of three（3つ目で「街が並んでいる」という認識が完成する）
- beat: clarity + belonging
- blueprint: kinetic-type-beats (Adapt)
- focal: assets/matsue-bridge.mp4
- roles: matsue-bridge = background（前半。全面）· matsue-sunset = background（後半に差し替え。全面）
- asset_candidates: assets/matsue-bridge.mp4 — 宍道湖大橋の並走、3.0s; assets/matsue-sunset.mp4 — 宍道湖の夕日スポット、3.0s

narrativeRole: 3つ目。ここまでで「3つある」と分かり、次の「どこで遊ぶのか」への問いが立つ。
keyMessage: 松江グランプリ — 1周 9.6km を2周。

Adapt: 型は Frame 2・3 と同じだが、後半を休符にする。ここが動画全体で唯一、映像も文字も動かない区間
（Video direction の held-frame）。次の収束（Frame 5）を効かせるための間。

Scene 1 (0.0–1.2s): 映像だけ。宍道湖大橋の上をカートが数台で並走する — 全面、文字なし。
Scene 2 (1.2–2.2s): 「松江グランプリ」が左下へ叩きつけられる（kinetic beat-slam → kinetic-beat-slam）。
Scene 3 (2.2–2.9s): 「1周 9.6km × 2周」と英字ラベル「MATSUE」が続けて着地。
Scene 4 (2.9–4.0s): 背景が夕日の湖面へ切り替わる。奥から手前に開ける向き（inverse zoom-through → cut-catalog.md）で「到着した」と読ませ、そこから先は文字も映像の寄せも止める。橙に染まる湖面だけが残る held read。

## Frame 5 — 3つの入口は、ここ

- scene: citykart.jp の実画面が立ち上がり、URL と「無料・インストール不要・最大8人」が残る
- voiceover: ""
- duration: 5s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/05-cta.html
- type: cta
- persuasion: Friction reduction（無料・インストール不要・ブラウザだけ、と障壁の無さを並べて見せる）
- beat: motivation + ease
- blueprint: cta-morph-press (Adapt)
- focal: assets/lp-full-page.png
- roles: lp-full-page = cutout（中央で立ち上がる実画面。周りに文字を置く）· hiro-dome-air = background（全面、40〜50%まで落とす）
- asset_candidates: assets/lp-full-page.png — citykart.jp の実画面（1920幅の全ページ）; assets/hiro-dome-air.mp4 — 収束前の背景に使える空撮、5.0s

narrativeRole: 3つの街がどこに集まったのかを答える。ページそのものを見せ、URLを最後まで残す。
keyMessage: 3作の入口は citykart.jp。無料で、ブラウザだけで走れる。

Adapt: 「1つの中心へ収まって、最後に一点だけ残る」という signature は保つ。押されるボタンの代わりに、
収まる先が citykart.jp の実画面になる。カーソルやクリックの演出は使わない（偽の UI 操作を見せないため）。

Scene 1 (0.0–1.2s): 直前の3つの街の色面が、画面中央へ縮みながら1つに重なる（scale-swap → scale-swap-transition）。背景は空撮を暗く落として敷く — layered-depth、中央に収束点。
Scene 2 (1.2–2.6s): 重なった一点から citykart.jp の実画面が奥に立ち上がり、上端から下へ少しだけスクロールしてコース一覧が見える（3D page-scroll reveal → 3d-page-scroll）— 中央、画面幅の約 52%、わずかに奥へ傾ける。
Scene 3 (2.6–3.6s): ページの手前・左下に「citykart.jp」が黄色の display 級で着地する。ここが動画で一番大きい文字。
Scene 4 (3.6–5.0s): 「無料 / インストール不要 / 最大8人で対戦」の3つが左から順に出そろい、そこから先は何も動かさない。URL は最後のコマまで画面に残す（held read）。
