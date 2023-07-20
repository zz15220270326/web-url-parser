import { defineConfig } from 'rollup';

import babel, { getBabelOutputPlugin } from '@rollup/plugin-babel';

import vue from 'rollup-plugin-vue';
import typescript2 from 'rollup-plugin-typescript2';

import typescript from '@rollup/plugin-typescript';
import extensions from 'rollup-plugin-extensions';
import terser from '@rollup/plugin-terser';
import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { visualizer } from 'rollup-plugin-visualizer';

import multiInput from 'rollup-plugin-multi-input';

export default defineConfig({
  // 单个入口文件
  input: {
    'index': 'packages/index.ts',
  },
  // 多个入口文件
  // input: ['packages/index.ts'], // 依赖 rollup-plugin-multi-input

  output: [
    {
      dir: 'lib',
      format: 'es',
      plugins: [
        // terser(),
        nodeResolve(),
        multiInput.default(),
        // visualizer({
        //   open: true
        // })
      ],
      sourcemap: true
    },
    {
      dir: 'dist/es',
      format: 'esm',
      plugins: [
        terser(),
        nodeResolve(),
      ],
      sourcemap: true
    },
    {
      dir: 'dist/cjs',
      format: 'cjs',
      plugins: [
        commonjs(),
        terser()
      ],
      sourcemap: true
    },
    {
      dir: 'dist/umd',
      format: 'umd',
      name: 'WebUrlParser',
      plugins: [
        terser()
      ],
      globals: {
        'vue': 'Vue',
        'naive-ui': 'NaiveUI'
      },
      sourcemap: true
    }
  ],
  plugins: [
    babel({
      presets: [
        '@babel/preset-env',
        '@babel/polyfill',
        '@babel/plugin-transform-runtime'
      ],
      include: 'packages/**',
      exclude: 'node_modules/**',
      babelHelpers: 'bundled',
      // babelHelpers: 'runtime',
    }),
    vue({
      target: 'browser'
    }),
    typescript2({
      // useTsconfigDeclarationDir: true
    }),
    extensions({
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      resolveIndex: true
    }),
  ],
  treeshake: true
});
