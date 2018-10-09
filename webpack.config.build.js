const path = require('path');
const ExtractTextPlugin          = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    client: './src/client.js'
  },
  output: {
    path: path.resolve(__dirname, 'assets'),
    filename: "[name].js"
  },
  module: {
    rules: [
     { test: /\.js$/, exclude: /(node_modules)/, loader: "babel-loader" },
 {
        test: /\.css$/,
         exclude: '/src',
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: "css-loader",
            options: {
              minimize: true
            }
          }],
        })
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        loader: 'file-loader'
      }  ,
       {
          test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
          loader: 'file-loader'
      }    
    ]
  }, 
  plugins: [
    new ExtractTextPlugin('src/stylesheets/[name].css?v=[hash:8]', {
      allChunks: true,
      modules: true
    })
  ]
}

//конфигурация для сборки. 