var path = require('path');
var fs = require('fs');

var nodeModules = {};

module.exports = {
  mode: "development",
  entry: './dist/index.js',
  devtool: 'source-map',
  // module: {
  //   rules: [
  //     {
  //       test: /\.js$/,
  //       exclude: /node_modules/,
  //       // loader: "node-loader",
  //       use: {
  //         loader: 'babel-loader',
  //         // options: {
  //         //   presets: ['@babel/preset-env']
  //         // }
  //       }
  //     },
  //   ],
  // },
  resolve: {
    extensions: ['.js'],
    modules: [path.resolve(__dirname, 'node_modules'), '../../node_modules'],
    // alias: {
    //   'node:fs': 'fs',
    //   'node:path': 'path',
    //   // 'node:fs/promises': 'fs/promises'
    // },
    // fallback: {
    //   "fs": require.resolve("fs"),
    //   "path": require.resolve("path"),
    //   // "fs/promises": require.resolve("browserify-fs")
    // },
    alias: {
      // './utils/glob-source.js': path.resolve(__dirname, 'replacement-module.js'),
    },
    fallback: {
      "fs": false,
      "path": false,
      "fs/promises": false
    }
    // extensions: ['.js', '.jsx']
  },
  externals: nodeModules,
  // externals: {
  //   'node:fs': 'commonjs fs',
  //   'node:path': 'commonjs path',
  //   'node:fs/promises': 'commonjs fs/promises',
  // },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'example/public/js'),
  },
  optimization: {
    minimize: false
  },
  target: ['web'],
};