import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'dist/index.js',

  output: {
    dir: 'example/public/js',
    format: 'esm',
    inlineDynamicImports: true
  },
  plugins: [resolve({
    /* */
  })],
};