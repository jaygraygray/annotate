const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const webpack = require('webpack');
const packageJson = require('./package.json');

const EnvironmentVariables = {
  appVersion: `v${packageJson.version}`,
  appName: 'Annotate',
};

module.exports = {
  entry: './src/app/index.tsx',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './src',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: ['/node_modules/', '/dist'],
      },
      {
        test: /\.(woff(2)?|otf|ttf|eot|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
          },
        }
      }

    ],
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "name it something",
      template: path.resolve(__dirname, "src", "app", "index.html")
    }),
    new HtmlWebpackPlugin({
      filename: 'stage.html',
      template: path.resolve(__dirname, "src", "app", "stage.html")
    }),
    new CleanWebpackPlugin(),
    new webpack.EnvironmentPlugin(EnvironmentVariables),
  ],
  node: {
    fs: 'empty'
  },
  externals: [{
    "fs": "fs",
    "path": "path",
  }]
};