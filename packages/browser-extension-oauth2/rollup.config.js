import resolve from '@rollup/plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

// eslint-disable-next-line no-undef
module.exports = {
  input: 'src/index.js',
  output: [
    {
      file: 'dist/index.es.js',
      format: 'es',
      sourcemap: true,
    },
    {
      file: 'dist/index.js',
      format: 'iife',
      name: 'ExtOauth2',
      sourcemap: true,
    },
  ],
  plugins: [
    resolve(),
    babel({ exclude: 'node_modules/**' }),
    terser({
      include: [/^.+\.min\.js$/],
    }),
  ],
};
