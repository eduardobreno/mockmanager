'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '../server/public/'),
    filename: 'js/[name]-[hash].min.js'
  },
  plugins: [
    // new CopyWebpackPlugin([
    //   {
    //     from: 'app/index.html',
    //     to: '../public/'
    //   }
    // ]),
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new ExtractTextPlugin('[name]-[hash].min.css'),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["es2015", "stage-0", "react"]
      }
    }, {
      test: /\.json?$/,
      loader: 'json'
    }, {
      test: /\.css$/,
      loaders: ['style-loader', 'css-loader', 'sass-loader']
    },
    {
      test: /\.(gif|png|jpe?g|svg|webp)$/i,
      loaders: [
        'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
        'image-webpack-loader'
      ]
    }]
  }
};
