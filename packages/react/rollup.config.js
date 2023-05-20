import styles from "rollup-plugin-styles";
import babel from '@rollup/plugin-babel';
import sourcemaps from 'rollup-plugin-sourcemaps';
import del from 'rollup-plugin-delete';

const autoprefixer = require('autoprefixer');

const conf = {
    input: 'src/index.js',
    output: {
        file: `dist/index.cjs.js`,
        format: "cjs",
        exports: "auto"
    },
    // this externelizes react to prevent rollup from compiling it
    external: ["react", /@babel\/runtime/],
    plugins: [
        // these are babel comfigurations
        babel({
            exclude: 'node_modules/**',
            plugins: ['@babel/transform-runtime'],
            babelHelpers: 'runtime'
        }),
        // this adds sourcemaps
        sourcemaps(),
        del({targets:'dist/*'}),
        // this adds support for styles
        styles({
            postcss: {
                plugins: [
                    autoprefixer()
                ]
            }
        })
    ]
}

export default conf;