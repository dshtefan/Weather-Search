const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  entry: {main: './src/main.js'},
  output: {
    path: path.resolve(__dirname, 'docs'),
    filename: 'main.js'
  },
  node: {
    fs: "empty"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract(
          {
            fallback: 'style-loader',
            use: ['css-loader', 'sass-loader']
          })
      },
      {
        test: /\.pug$/,
        use: ['pug-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        loader: 'file-loader'
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin(
      {filename: 'style.css'}
    ),
    new HtmlWebpackPlugin({
      template: './src/index.pug',
      filename: 'index.html',
      inject: true
    })
  ]
};