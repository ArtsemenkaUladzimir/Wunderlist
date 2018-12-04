const path = require('path');

module.exports = {
  entry: './res/app/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'res/dist'),
    publicPath: '/static/app/'
  },
  module: {
    rules: [{
      test: /\.(sa|sc|c)ss$/,
      use: [
        "style-loader", // creates style nodes from JS strings
        "css-loader", // translates CSS into CommonJS
        "sass-loader" // compiles Sass to CSS, using Node Sass by default
      ]
    }, {
        test: /.pug$/,
        use: {
          loader: 'pug-loader',
          query: {} // Can be empty
        }
    }, {
      test: /\.(png|jpg|gif|woff|woff2|eot|otf|ttf|svg)$/,
      use: ['url-loader?limit=8192']
    }]
  }
};
