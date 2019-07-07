const webpack = require('webpack');
const path = require('path');

const config = {
  mode: 'development',
  entry: './src/index.tsx',
  output: {
    filename: 'build.js',
    path: __dirname,
    publicPath: '/public/',
  },
  devServer: {
    contentBase: path.resolve(__dirname, '.')
  },
  devtool: "source-map",
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

      // https://webpack.js.org/loaders/babel-loader/
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        }
      },
      { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
  },
};

module.exports = config;
