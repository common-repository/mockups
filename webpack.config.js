const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
 
// Set different CSS extraction for editor only and common block styles

const editBlocksCSSPlugin = new ExtractTextPlugin({
  filename: './assets/css/blocks.editor.css',
});
const blocksSCSSPlugin = new ExtractTextPlugin({
  filename: './assets/css/styles.css',
  allChunks: true,
});

// Configuration for the ExtractTextPlugin.
const extractConfig = {
  use: [
    { loader: 'raw-loader' },
    { loader: 'sass-loader' },
  ],
};

module.exports = {
  entry: [
    './blocks/index.js',
    './scss/styles.scss'
  ],
  output: {
    path: path.resolve( __dirname ),
    filename: './assets/js/[name].js',
  },
  externals: {
    'react': 'React',
    'react-dom': 'ReactDOM',
  },
  watch: 'production' !== process.env.NODE_ENV,
  devtool: 'cheap-eval-source-map',
  module: {
    rules: [
      { // sass / scss loader for webpack
        test: /\.(sass|scss)$/,
        exclude: /(node_modules|bower_components)/,
        loader: ExtractTextPlugin.extract(['css-loader', 'sass-loader'])
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /editor.css$/,
        use: editBlocksCSSPlugin.extract(extractConfig),
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './assets/images/',
              name: '[name].[ext]',
            },
          },
        ],
      }
    ],
  },
  plugins: [
    editBlocksCSSPlugin,
    blocksSCSSPlugin
  ],
};
