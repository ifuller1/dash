const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const swCachePlugin = require('sw-cache-plugin');
const ChunkRenamePlugin = require("chunk-rename-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

let pathsToClean = [
  'build',
];

module.exports = {
  entry: {
    index: './src/Index.bs.js',
    worker: './workers/JsWorker.js',
  },
  output: {
    path: path.join(__dirname, 'build/'),
    publicPath: path.join(__dirname, 'build/'),
    filename: '[name].[chunkhash].js',
    publicPath: 'build/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      filename: '../index.html',
      template: 'template.html',
      chunksSortMode: (a, b) => {
        const order = ["workers", "index"];
        return order.indexOf(a.names[0]) - order.indexOf(b.names[0]);
      },
    }),
    new swCachePlugin({
      cacheName: 'appCache',
      ignore: [/.*\.map$/, /boot.*/, /index.html/],
      include: ['/', '/assets/stations.csv'],
    }),
    new ChunkRenamePlugin({
      worker: "../worker.js",
    }),
    new CleanWebpackPlugin(pathsToClean),
  ]
};
