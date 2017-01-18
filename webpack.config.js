/*eslint-disable */
var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval-source-map',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.resolve(__dirname, './src')
      },
      {
        test: /\.css$/,
        loader: 'style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]'
      },
      {
	      test: /\.(jpe?g|png|gif|svg)$/i,
	      loaders: [
	        'file?hash=sha512&digest=hex&name=[hash].[ext]',
	        'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
	      ]
      }
    ]
  }
};
