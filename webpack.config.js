const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const host = "localhost";
const port = 8080;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const dist = IS_PRODUCTION ? 'prod' : 'dev';

const DIST_DIR = path.resolve(__dirname, dist)
const SRC_DIR = path.resolve(__dirname, 'src');
const ASSET_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

module.exports = {
  context: SRC_DIR,
  entry: {
    popup: './popup.jsx'
  },
  output: {
    filename: '[name].bundle.js',
    publicPath: `/${dist}/`
  },
  devServer: {
    host: host,
    port: port,
    overlay: true,
    publicPath: '/dev/',
//    contentBase: DIST_DIR
  },
  resolve: {
    extensions: ['.js','.jsx']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: 'template.html'
    }),
//    new WriteFilePlugin({}),
    new webpack.ProvidePlugin({
      browser: 'webextension-polyfill'
    }),
    new WebpackShellPlugin({
      onBuildStart:[`web-ext run --s ${dist}`]
    }),
    IS_PRODUCTION ? new MinifyPlugin() : /* no-op */ new Function()
  ],
  devtool: IS_PRODUCTION ? '' : 'inline-source-map'
}
