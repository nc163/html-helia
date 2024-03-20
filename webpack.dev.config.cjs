path = require('path');

module.exports = {
  mode: 'development',
  resolve: {
    extensions: ['.js'],
    alias: {
      '@html-helia/html-helia': path.resolve(__dirname, 'packages/html-helia/src/index.js'),
    },
  },
  entry: {
    Library: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'example/public/js'),
    filename: 'bundle.js',
    library: {
			name: 'HtmlIpfs',
			export: 'default',
			type: 'umd',
		},
  },
};
