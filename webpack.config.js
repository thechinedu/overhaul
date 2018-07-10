var path = require('path');
var webpack = require('webpack');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin');

var config = {
  entry: ['babel-regenerator-runtime', './app/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devtool: 'cheap-module-eval-source-map',
  module: {
    rules: [
      { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
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

if (process.env.NODE_ENV === 'production') {
  Object.assign(config, {
    devtool: 'none',
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
      }),
      new UglifyJsPlugin({
        uglifyOptions: {
          compress: true
        }
      })
    ]
  });
}

module.exports = config;
