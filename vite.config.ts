import { defineConfig } from 'vite';

// 独自ドメイン citykart.jp の直下で配信するので base は '/'。
// 英語ページを /en/ に置いている以上、ページ内のパスは根からの絶対 (/images/...) に
// しないといけない。相対にすると /en/ では /en/images/... を見に行って 404 になる。
// GitHub Pages のプロジェクトページ（/<repo>/ 配下）へ戻すときは BASE_PATH を渡す。
export default defineConfig({
  base: process.env.BASE_PATH || '/',
  server: { port: 5190 },
});
