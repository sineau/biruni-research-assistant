const path = require('path');
const webpack = require('webpack');
const MinifyPlugin = require('babel-minify-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const host = "localhost";
const port = 8080;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const IS_EXT = process.env.NODE_ENV === 'ext';
const dist = IS_PRODUCTION ? 'prod' : 'dev';

const DIST_DIR = path.resolve(__dirname, dist)
const SRC_DIR = path.resolve(__dirname, 'src');
const ASSET_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'eot', 'otf', 'svg', 'ttf', 'woff', 'woff2'];

module.exports = {
  context: SRC_DIR,
  entry: {
    popup: './popup',
    highlight: './highlight',
    background: './background',
    app: './app/app'
  },
  output: {
    filename: '[name].bundle.js',
    path: path.join(__dirname, `./${dist}`)
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
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: [
          'babel-loader',
          'eslint-loader'
        ]
      },
      {
        test: require.resolve('webextension-polyfill'),
        use: 'imports-loader?browser=>undefined'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: 'template.html',
      chunks: ['popup']
    }),
    new HtmlPlugin({
      template: 'template.html',
      chunks: ['app'],
      title: 'Research Assistant',
      filename: 'app.html'
    }),

    new WriteFilePlugin(),
    IS_EXT ? new webpack.ProvidePlugin({
      browser: 'webextension-polyfill'
    }) : new Function(),
    IS_EXT ? new WebpackShellPlugin({
      onBuildStart:[`web-ext run --s ${dist}`]
    }) : new Function(),
    IS_PRODUCTION ? new MinifyPlugin() : /* no-op */ new Function()
  ],
  devtool: IS_PRODUCTION ? '' : 'cheap-module-source-map'
}
