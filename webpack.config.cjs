path = require('path');

module.exports = {
  mode: 'production',
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
		},
  },
};