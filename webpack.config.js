const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
      title: "woah dude",
      template: path.resolve(__dirname, "src", "app", "index.html")
    }),
    new CleanWebpackPlugin()
  ],
};