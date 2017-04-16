var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:9000',
    'webpack/hot/only-dev-server',
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  ],
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    // loaders: [
    //     {
    //         test: /\.jsx?$/,
    //         loaders: ['react-hot-loader', 'babel-loader'],
    //         include: [path.join(__dirname, 'src/')],
    //         exclude: '/node_modules/'
    //     }
    // ]
    rules: [{
      test: /\.jsx?$/,
      include: [path.join(__dirname, 'src/')],
      use: [
        {
          loader: 'react-hot-loader'
        },
        {
          loader: 'babel-loader',
        }
      ]
    }]
  }
};
