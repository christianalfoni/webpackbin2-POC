'use strict';

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = process.env.NODE_ENV === 'production';

const rules = [
  {test: /\.json/, use: [{loader: 'json-loader'}]},
];

/*
 PLUGINS
 */
let plugins = [
  new HtmlWebpackPlugin({
    template: path.resolve('index.template.html'),
    inject: true,
    chunksSortMode: 'dependency'
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(nodeEnv)
    }
  })
];

module.exports = {
  target: 'web',
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  performance: {
    hints: isProduction ? 'warning' : false
  },
  entry: path.resolve('src', 'main.js'),
  output: {
    path: path.resolve('public'),
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    chunkFilename: isProduction ? '[chunkhash].js' : '[id].js',
    publicPath: '/'
  },
  devServer: isProduction ? {} : {
    port: 3000,
    historyApiFallback: true,
    inline: true,
    stats: 'errors-only'
  },
  resolve: {
    alias: {
      'memory-fs': path.resolve('memory-fs'),
      fs: path.resolve('memory-fs-instance'),
      fsevents: path.resolve('fsevents-mock'),
      module: require.resolve('empty-module'),
      net: require.resolve('empty-module'),
      'debug/node': path.resolve('debug-mock')
    }
  },
  module: {
    rules: rules
  },
  plugins: plugins
};
