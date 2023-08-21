import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  input: 'dist/index.js',

  output: {
    dir: 'example/public/js',
    format: 'esm',
    inlineDynamicImports: true
  },
  plugins: [
    resolve({
      preferBuiltins: false, // https://github.com/sveltejs/sapper/issues/755
      mainFields: ['browser']
    }),
    commonjs()
  ],
};