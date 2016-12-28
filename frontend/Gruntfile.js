'use strict';

const webpack = require('webpack');
const HttpServer = require('http-server');
const opener = require('opener');

module.exports = function (grunt) {
  // Load third party tasks
  grunt.loadNpmTasks('grunt-webpack');

  // Config
  const webpackConfig = require('./webpack.config.js');
  grunt.initConfig({
    webpack: {
      options: webpackConfig,
      build: {
        plugins: [
          new webpack.DefinePlugin({
            'process.env': {
              NODE_ENV: JSON.stringify('production')
            },
            ENDPOINT: 'http://example.com/mydata'
          }),
          new webpack.optimize.DedupePlugin(),
          new webpack.optimize.UglifyJsPlugin()
        ]
      },
      'build-dev': {
        devtool: 'sourcemap',
        debug: true,
        watch: true,
        keepAlive: true,
        watchOptions: {
          aggregateTimeout: 500,
          poll: true
        },
        plugins: [
          new webpack.DefinePlugin({
            
          })
        ]
      }
    },
  });

  grunt.registerTask('localServer', function () {
    const done = this.async();
    HttpServer.createServer({
      root: '.',
      showDir: true,
    }).listen(8080, '0.0.0.0', () => {
      opener('http://localhost:8080/');
    });
  });  

  grunt.registerTask('dev', ['webpack:build-dev', 'localServer']);

};
