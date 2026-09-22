import { defineConfig } from 'vite';

// GitHub Pages のプロジェクトページ（/<repo>/ 配下）に置くときは BASE_PATH で base を渡す。
// ページ内のパスはすべて相対にしてあるので、どこに置いても動く。
export default defineConfig({
  base: process.env.BASE_PATH || './',
  server: { port: 5190 },
});
