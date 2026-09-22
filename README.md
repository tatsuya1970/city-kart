# City Kart — シティカート

国土交通省 **PLATEAU** の 3D 都市モデルで実在の街を走るブラウザカートレース 3 作の入口ページです。

https://citykart.jp/

| ゲーム | コース | リポジトリ |
| --- | --- | --- |
| [広島グランプリ](https://tatsuya1970.github.io/hiroshima-kart/) | 1周 7.31 km × 2周 | [hiroshima-kart](https://github.com/tatsuya1970/hiroshima-kart) |
| [松江グランプリ](https://tatsuya1970.github.io/matsue-kart/) | 1周 9.6 km × 2周 | [matsue-kart](https://github.com/tatsuya1970/matsue-kart) |
| [福山グランプリ](https://tatsuya1970.github.io/fukuyama-kart/) | 20.7 km ワンウェイ | [fukuyama-kart](https://github.com/tatsuya1970/fukuyama-kart) |

## 構成

ページは `index.html` 1 枚で、ビルドは Vite です（`npm run dev` → http://localhost:5190/）。
作りは [Web メタバース](https://github.com/tatsuya1970/hiroshima-metaverse) のトップページに合わせています。

- 日本語 / 英語の切替は右上。英語表記は各要素の `data-en` / `data-en-html` に持たせ、選んだ言語は localStorage の `lang` に残します。英語のときは各ゲームへのリンクも英語版（`/en/`）に張り替えます。
- ヒーローの背景動画は、PC に `videos/hero.mp4`（1920 幅）、スマホ（820px 以下）に `videos/hero-mobile.mp4`（854 幅）を出し分けます。`<source>` を書くとスマホでも重い方の取得が始まるので、src はスクリプトで入れています。
- ページ内のパスはすべて相対です。

## 素材を作り直す

背景動画・ポスター・カード画像は、隣に置いた各ゲームのリポジトリのプロモ素材から作ります。

```bash
# 1. 広島版でクリップを撮る（?rec=1 の録画モード。swiftshader で 15 分ほど）
#    ../mariokart-Hiroshima で開発サーバーを立ててから
PORT=5180 node tools/record_promo.mjs
node tools/clips_to_mp4.mjs videos/assets

# 2. このリポジトリで
npm run media                      # public/videos/hero*.mp4, images/hero-poster.jpg, card-matsue/fukuyama.jpg
PORT=5180 node scripts/shot-hiroshima.mjs   # images/card-hiroshima.jpg
```

動画の並びは `scripts/build-media.mjs` の `CLIPS` です。広島を主役に、松江・福山を 1 本ずつ挟んでいます。

## デプロイ

`main` に push すると GitHub Actions（`.github/workflows/deploy.yml`）がビルドして GitHub Pages に出します。

独自ドメイン **citykart.jp** で配信しています。`public/CNAME` がその設定で、DNS 側はドメイン（ムームードメイン）に次を置いています。

| サブドメイン | 種別 | 内容 |
| --- | --- | --- |
| （空欄） | A | `185.199.108.153` / `185.199.109.153` / `185.199.110.153` / `185.199.111.153` |
| `www` | CNAME | `tatsuya1970.github.io.` |

ページ内のパスはすべて相対なので base は `./` のままです。`https://<user>.github.io/city-kart/` に戻すときは `public/CNAME` を消し、ビルドに `BASE_PATH=/city-kart/` を渡します。

## ライセンス

3D 都市モデル: [国土交通省 Project PLATEAU](https://www.mlit.go.jp/plateau/)（各ゲームのリポジトリの DATA_LICENSE.md を参照）
