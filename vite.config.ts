import { resolve } from 'path';
import { defineConfig } from 'vite';

import vuePlugin from '@vitejs/plugin-vue';

export default defineConfig({
  server: {
    port: 5800,
    host: '0.0.0.0',
    proxy: {
    },
    // https: true
  },
  resolve: {
    alias: {
      '@packages': resolve(__dirname, 'packages'),
      '@core': resolve(__dirname, 'packages/core')
      // '@packages': resolve(__dirname, 'lib')
    },
    extensions: ['.js', '.jsx', '.json', '.ts', '.tsx'],
  },
  plugins: [vuePlugin()],

  build: {
    outDir: './demoDist',
  },
});
