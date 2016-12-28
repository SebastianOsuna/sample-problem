'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'styles': './src/css/index.scss',
    'app.js': './src/js/app.jsx'
  },
  output: {
    path: './dist/',
    filename: '[name]'
  },
  stats: {
    colors: true,
    modules: false,
    reasons: true
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(['css?sourceMap', 'sass?sourceMap'])
      },
      {
        test: /\.jsx$/,
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015', 'react']
        }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.json$/,
        loader: 'json'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
      Reflux: 'reflux',
      DATA: '../assets/news_mock',
    })
  ],
};
