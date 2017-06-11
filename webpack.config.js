const path = require('path');
const webpack = require('webpack');

module.exports = {
  entry: './src/app.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve('./dist')
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: []
        },
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.less$/,
        use: [
          {loader: "style-loader"}, 
          {loader: "css-loader"},
          {loader: "less-loader"}
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  externals: {
    // 'react': 'React',
    // 'react-dom': 'ReactDOM',
    // 'react-redux': 'ReactRedux',
    // 'redux': 'Redux' 
  }
}