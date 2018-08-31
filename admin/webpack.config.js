'use strict';

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  watch: true,
  devtool: 'eval-source-map',
  entry: [
    path.join(__dirname, 'app/index.js')
  ],
  output: {
    path: path.join(__dirname, '../server/public/'),
    filename: 'js/[name].js'
  },
  plugins: [
    // new HtmlWebpackPlugin({
    //   template: 'app/index.html',
    //   inject: 'body',
    //   filename: 'index.html'
    // }),
    new CopyWebpackPlugin([
      {
        from: 'app/index.html',
        to: '../public/'
      },
      // {
      //   from: path.join(__dirname,'app/js/'),
      //   to: '../public/js'
      // }
    ]),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
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
    },
    {
      test: /\.js?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": ["react", "es2015", "stage-0", "react-hmre"]
      }
    }]
  }
};
