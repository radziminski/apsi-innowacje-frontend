const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const path = require('path');

const WEBPACK_BASE = require('./webpack.base').default;
const SRC_MAP_STRATEGY = 'source-map';

const ASSETS_LIMIT = 1000 * 1000 * 3;
const ENTRY_POINT_LIMIT = 1000 * 1000 * 3;

const ENV_FILE = process.env.ENV_FILE;

module.exports = merge(WEBPACK_BASE, {
  mode: 'production',
  devtool: SRC_MAP_STRATEGY,
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/
      }
    ]
  },
  performance: {
    maxEntrypointSize: ENTRY_POINT_LIMIT,
    maxAssetSize: ASSETS_LIMIT
  },
  plugins: [
    new Dotenv({
      systemvars: true,
      path: path.resolve(__dirname, ENV_FILE ? `../.env.${ENV_FILE}` : '../.env.prod')
    })
  ]
});
