const path = require("path");
const webpack = require("webpack");
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    chunkFilename: '[name].bundle.js',
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg)/,
        use: {
        loader: 'file-loader', // this need file-loader
        options: {
        limit: 50000
      }}},
      { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
    ],
  },
  optimization: {
    minimize: true,
  },
  plugins: [
    new Dotenv({
      path: './../.env'
    })
  ],
};