path = require('path');

module.exports = {
  mode: 'production',
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
    path: path.resolve(__dirname, 'public/js'),
    filename: 'bundle.js',
    library: {
			name: 'HtmlIpfs',
			export: 'default',
			type: 'umd',
		}
  },
};
