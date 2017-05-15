var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    './src/index.jsx'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.jsx$/,
      loaders: ['react-hot', 'babel'],
      include: path.join(__dirname, 'src')
    },
    { 
      test: /\.css$/, 
      exclude: /\.useable\.css$/, 
      loader: "style-loader!css-loader" },
    { 
      test: /\.(png|jpg)$/,
      loader: 'url-loader?limit=8192'
    },
    { 
      test: /\.useable\.css$/, 
      loader: "style-loader/useable!css-loader" }]
  }
};
