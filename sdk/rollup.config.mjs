import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import nodePolyfills from 'rollup-plugin-node-polyfills';



export default {
  context: 'window',
  moduleContext: 'window',
  input: 'index.js',
  treeshake: false,
  output: {
    file: 'bundle.js',
    name: 'detangle',
    format: 'iife',
    sourcemap: true,
  },
  plugins: [
    resolve({
      browser: true,
    }),
    commonjs(),
    json(),
    builtins(),
    terser(),
    nodePolyfills(),
  ]
};