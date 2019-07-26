const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const DIST = path.join(__dirname, 'dist');

module.exports = {
  output: {
    path: path.join(DIST),
    filename: 'bundle.js',
  },
  entry: './src/main.js',
  plugins: [
    new HtmlWebpackPlugin(),
  ],
};
