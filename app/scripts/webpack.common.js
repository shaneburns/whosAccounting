var TerserPlugin = require('terser-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: {
    'accountBundle': path.join(__dirname, 'accounting/main.js'),
    'balancerBundle': path.join(__dirname, 'balancers/main.js')
  },
  output: {
    path: path.join(__dirname, '../../public/scripts/dist'),
    publicPath: '/scripts/dist/',
    filename: '[name].js',
    clean: true,
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      include: [
        path.resolve(__dirname),
        path.resolve(__dirname, 'node_modules'),
      ]
    }]
  },
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx'],
  },
};