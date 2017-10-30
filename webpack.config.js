var path = require('path');

module.exports = {
  entry: './app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader' },
      { test: /\.scss$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] }
    ],
  },
  resolve: {
    alias: {
      utils: path.resolve(__dirname, 'app/utils'),
      shared: path.resolve(__dirname, 'app/components/shared')
    }
  }
}