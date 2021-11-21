const { merge } = require('webpack-merge');
const Dotenv = require('dotenv-webpack');
const ESLintWebpackPlugin = require('eslint-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

const WEBPACK_BASE = require('./webpack.base').default;
const SRC_MAP_STRATEGY = 'eval-source-map';

const ENV_FILE = process.env.ENV_FILE;

module.exports = merge(WEBPACK_BASE, {
  mode: 'development',
  devtool: SRC_MAP_STRATEGY,
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              plugins: ['react-refresh/babel']
            }
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true
            }
          }
        ],
        exclude: /node_modules/
      }
    ]
  },
  devServer: {
    hot: true,
    port: process.env.port || 3000,
    static: {
      directory: require('./webpack.base').PUBLIC_DIRECTORY
    },
    open: true,
    historyApiFallback: true
  },
  plugins: [
    new ReactRefreshWebpackPlugin(),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintWebpackPlugin({
      extensions: ['js', 'jsx', 'ts', 'tsx']
    }),
    new Dotenv({
      systemvars: true,
      path: ENV_FILE ? `./.env.${ENV_FILE}` : './env.dev'
    })
  ]
});
