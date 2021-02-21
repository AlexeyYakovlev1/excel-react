const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devServer: {
      port: 3000
    },
    plugins: [
      new HTMLWebpackPlugin({
        template: './src/index.html'
      }),
      new MiniCssExtractPlugin({
        filename: '[name].css' 
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          },
        },
        {
          test: /\.jsx$/,
          exclude: /node_modules/,
          use: ["babel-loader", "jsx-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.sass$/,
          use: ["style-loader", "css-loader", "sass-loader"]
        },
        {
          test: /\.(png|jpg|jpeg|svg|gif)$/,
          use: 'file-loader'
        }
      ]
    }
}