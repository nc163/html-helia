path = require('path');

module.exports = {
  mode: 'development',
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