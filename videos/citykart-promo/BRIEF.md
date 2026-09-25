---
workflow: product-launch-video
flow: automation
storyboard: yes
message: "広島・福山・松江の3つの街を走るカートレースが、citykart.jp にまとまった"
destination: x-feed
aspect: 1920x1080
language: ja
audience: 日本語のSNS利用者。PLATEAU・街歩き・レースゲームに反応する層と、地元（広島・福山・松江）の人
length: 20s
angle: showcase
style_preset: broadside
---

## Intent

citykart.jp ができたことの知らせ。これまで別々の URL にあった3作（広島グランプリ・
福山グランプリ・松江グランプリ）が1つの入口にまとまったことを伝える。

採用したコンセプトは「3つのコース、1つの入口」。走行映像を軸に、街が切り替わるたびに
ゲーム内と同じ看板が飛び込み、最後に citykart.jp へ着地する。素直に、ゲームの楽しさが
一番直接伝わる形。冒頭は原爆ドームの空撮から。

X のタイムラインで音なし自動再生される前提。最初の1秒で目を引き、音を切っていても
街の名前と URL が読めること。20秒に3つの街を入れるので、配分は 冒頭3秒 + 3街×約4秒 +
締め4秒。

## Assets

- ../../public/videos/hero.mp4 — LP のヒーロー動画（広島の空撮→走行→松江・福山）。冒頭と繋ぎに使える
- ../../public/images/card-hiroshima.jpg — 原爆ドーム前の看板ゲート（広島の代表カット）
- ../../public/images/card-fukuyama.jpg — 芦田川大橋（福山の代表カット）
- ../../public/images/card-matsue.jpg — 宍道湖大橋（松江の代表カット）
- ../../public/ogp.png — LP の OGP カード（CITY KART のロックアップ）
- ../../../mariokart-Hiroshima/videos/assets/ — 広島の走行クリップ（dome_air, grid, city, dome, peacewing）
- ../../../kart-fukuyama/videos/fukuyama-kart-promo/assets/ — 福山の走行クリップ（castle, city, bridge, coast, goal, grid）
- ../../../kart-matsue/videos/matsue-kart-promo/capture/assets/videos/ — 松江の走行クリップ（castle, bridge, sunset, start, station ほか）

## Customizations

- 無音で作る。当初は「効果音のみ・BGM なし」の指定だったが、効果音の取得には
  HeyGen のサインインが要るため、無音で完成させることにした（ユーザーの判断）。
  あとからサインインして効果音を足し、書き出し直すことはできる
- 締めは citykart.jp の実画面をキャプチャして見せる。ロゴだけのカードにはしない
- 見た目の下敷きは broadside プリセット。色は citykart.jp の濃紺 (#0b1a2a) × 黄色 (#ffd83d) に寄せる
- 3作のプロモ（広島・福山・松江）と同じシリーズに見えること

## Notes

- 事実の表記は LP と揃える: 広島 1周7.31km×2周 / 福山 20.7km ワンウェイ / 松江 1周9.6km×2周
- 無料・インストール不要・最大8人のオンライン対戦、が売り
- 任天堂とは無関係の個人制作。マリオカートを想起させる文言は使わない
- 各ゲームの URL はサブドメイン（hiroshima/fukuyama/matsue.citykart.jp）だが、
  動画で見せる URL は citykart.jp ひとつに絞る
