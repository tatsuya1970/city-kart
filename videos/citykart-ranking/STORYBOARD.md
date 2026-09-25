---
format: 1920x1080
duration: 15s
message: "3つの街のコースに、ゴールタイムのランキングができた"
arc: 挑戦状（走る → ゴール → 名前が載る → どこで見られるか → 入口）
audience: 日本語のSNS利用者。シティカートを遊んだことのある人と、PLATEAU・レースゲームに反応する層
mode: collaborative
music: assets/bgm.mp3（前作と同じユーザー提供「カートレースのテンポ」19.88s を 15s に切る。フェードイン0.3s/フェードアウト1.2s）
---

## Video direction

前作（videos/citykart-promo）とシリーズを揃える。各フレームの Scene 行には差分だけを書く。

- **palette system** — `frame.md` の dark register だけ。地 = ink-black (#0B1A2A)、文字 = cream (#EEF1F4)、
  差し色 = 黄 (#FFD83D) の1色。ゲーム画面の黄色（HIROSHIMA KART のロゴ、自分の行のハイライト）と同じ色なので、
  「黄色 = 自分の記録」と読ませる。
- **motion grammar + reveal model** — 長い尾を引くイージング（power3 既定、跳ねさせない）。ナレーションが無いので、
  reveal は画の出来事に合わせる: ゴール、名前が入る、自分の行が光る、ボタンが開く。t=0 で全部出さない。
- **画面の見せ方** — ゲーム画面は全体を映さず、ランキングの表に寄せて大きく見せる（スマホで行が読める大きさ、
  1行の高さが画面の 6% 以上）。寄せはゆっくりした push-in（Ken Burns 程度）で、画面そのものは作り直さない。
- **rhythm / held-frame allocation** — 休符は Frame 3 の後半（自分の行が光ったまま止まる 1 秒）。
  ここが動画で一番伝えたい画。
- **negative list** — 光彩 (glow)、浮遊するパーティクル、偽のブラウザ枠、作り物の UI、カーソル。
  マリオカートを想起させる文言・意匠も使わない。ランキングの名前はすべて架空のデモ。
- **caption keep-out** — 字幕は無いが、下 17% には主要な要素を置かない（前作と同じ）。

## Frame 1 — ランキング、はじまる

- scene: 広島の市街地を走る映像に、「NEW」とランキングの告知が着地する
- voiceover: ""
- duration: 3.5s
- transition_in: cut
- status: animated
- src: compositions/frames/01-hook.html
- type: hook
- persuasion: News hook（最初の1秒で「新しく何かができた」と分からせる）
- beat: curiosity + excitement
- blueprint: kinetic-type-beats (Adapt)
- focal: assets/hiro-dome-gate.mp4
- roles: hiro-city = background（前半。全面）· hiro-dome-gate = background（後半に差し替え。全面）
- asset_candidates: assets/hiro-city.mp4 — 相生通りの市街地疾走、4.0s; assets/hiro-dome-gate.mp4 — 原爆ドーム前の看板ゲート通過、3.3s

narrativeRole: 何の知らせかを最初に言い切る。走っている画で「レースのタイム」の話だと分からせる。
keyMessage: シティカートにランキングができた。

Scene 1 (0.0–0.8s): 映像だけ。市街地を疾走する — 全面、文字なし。
Scene 2 (0.8–1.8s): 左下に黄色の kicker「NEW」、続けて「ランキング機能 登場」が叩きつけられる — 左下寄せ、h2 級。
Scene 3 (1.8–3.5s): 背景が看板ゲートの通過に切り替わり、見出し「ゴールタイムで、競え。」が display 級で着地して静止する。

## Frame 2 — FINISH

- scene: ゴールの瞬間。暗転した画面に「FINISH」とタイム「2:59.53」が刻まれる
- voiceover: ""
- duration: 1.5s
- transition_in: cut
- status: animated
- src: compositions/frames/02-finish.html
- type: feature_showcase
- persuasion: Peak moment（タイムが出る瞬間を、次の「登録」への入口にする）
- beat: triumph
- blueprint: dataviz-countup (Adapt)
- focal: タイム「2:59.53」
- roles: hiro-dome-gate = background（直前の続き。暗く落とす）
- asset_candidates: assets/hiro-dome-gate.mp4 — Frame 1 の続き

narrativeRole: 走り終えた人が手にするもの＝タイム。これが次で名前と一緒に表に載る。
keyMessage: ゴールするとタイムが出る。

Scene 1 (0.0–0.4s): 映像が止まりながら濃紺に沈む。中央に「FINISH」が大きく叩きつけられる — 中央、display 級。
Scene 2 (0.4–1.5s): その下にタイム「2:59.53」が 0:00.00 から速く数え上がって止まる（count-up）— 黄色、等幅数字。

## Frame 3 — ランキングに、名前を刻め

- scene: リザルト画面。名前「ヒロシマ太郎」を入れて登録すると、3位の行が黄色く光る
- voiceover: ""
- duration: 5s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/03-register.html
- type: feature_showcase
- persuasion: Show-don't-tell proof（実際のゲーム画面で、登録から掲載までを見せる）
- beat: pride
- blueprint: device-surface-showcase (Adapt)
- focal: assets/result-done.png
- roles: result-form = screen（前半。ランキング枠に寄せる）· result-done = screen（後半に差し替え。自分の行に寄せる）
- asset_candidates: assets/result-form.png — 名前を入れて登録ボタンを押す直前（3840×2160）; assets/result-done.png — 「3 位に登録しました!」、3位の行が黄色（3840×2160）

narrativeRole: この機能で何ができるかの本体。自分の名前が表に載る快感を見せる。
keyMessage: ゴールしたら名前を入れて登録。上位10件に載る。

Scene 1 (0.0–1.4s): result-form をランキング枠（見出し〜10位）に寄せた状態で出す。入力欄の「ヒロシマ太郎」と「登録」ボタンが読める — 中央、表が画面の高さの約 80%。
Scene 2 (1.4–2.2s): result-done へ切り替わる。3位に「ヒロシマ太郎 2:59.53」の行が入り、黄色く光る。下の行が1つずつ下がって見えるよう、切り替えは短いクロスフェード。
Scene 3 (2.2–4.0s): 3位の行へゆっくり寄る（push-in）。右上に「ランキングに、名前を刻め。」が cream の display 級で着地。
Scene 4 (4.0–5.0s): すべて静止（held read）。自分の行と見出しを読ませる。

## Frame 4 — トップ画面の🏆から

- scene: トップ画面の「🏆 ランキング」ボタンが押され、上位20件の一覧が開く
- voiceover: ""
- duration: 2s
- transition_in: push-slide LEFT
- status: animated
- src: compositions/frames/04-top20.html
- type: feature_showcase
- persuasion: Friction reduction（走らなくても、トップ画面からいつでも見られる）
- beat: clarity
- blueprint: device-surface-showcase (Adapt)
- focal: assets/title-rank20.png
- roles: title = screen（一瞬。ボタンに寄せる）· title-rank20 = screen（ボタンと一覧に寄せ、下へ送る）
- asset_candidates: assets/title.png — トップ画面、🏆ランキングのボタン; assets/title-rank20.png — 上位20件を開いたところ; assets/title-rank20-end.png — 一覧の下端まで送ったところ

narrativeRole: どこで見られるかの答え。
keyMessage: トップ画面の🏆ボタンで上位20件。

Scene 1 (0.0–0.5s): トップ画面の「🏆 ランキング」ボタンに寄せた画 — 対戦ボタンは画角の外。
Scene 2 (0.5–1.2s): 一覧が開いた画へ切り替わり、下へ送って20位まで流れる（縦スクロール）。
Scene 3 (1.2–2.0s): 左下に「トップ画面の ランキング ボタンから 上位20件」が着地（🏆 は絵文字フォントが無いので文字には使わない）。

## Frame 5 — citykart.jp

- scene: citykart.jp の実画面を背に、「広島・福山・松江 それぞれにランキング」と URL が残る
- voiceover: ""
- duration: 3s
- transition_in: zoom-through
- status: animated
- src: compositions/frames/05-cta.html
- type: cta
- persuasion: Rule of three（3つの街それぞれに1位の席がある）
- beat: motivation
- blueprint: cta-morph-press (Adapt)
- focal: assets/lp-top.png
- roles: lp-top = cutout（奥で立ち上がる実画面、暗く落とす）
- asset_candidates: assets/lp-top.png — citykart.jp の最上部（capture/screenshots/scroll-000.png）

narrativeRole: 3つの街すべてに入ったことと、どこから遊ぶかを最後に残す。
keyMessage: 広島・福山・松江 それぞれにランキング。citykart.jp から。

Scene 1 (0.0–1.0s): citykart.jp の実画面が奥に立ち上がる。「広島・福山・松江」の3語が左から順に着地し、続けて「それぞれにランキング」。
Scene 2 (1.0–2.0s): 「citykart.jp」が黄色の display 級で着地する。動画で一番大きい文字。
Scene 3 (2.0–3.0s): 何も動かさない。URL を最後のコマまで残す（held read）。BGM はここでフェードアウト。
