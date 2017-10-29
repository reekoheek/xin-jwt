const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  context: path.join(__dirname, 'example'),
  entry: {
    index: './index',
  },
  output: {
    path: path.join(__dirname, 'www'),
    filename: 'lib/[name].js',
  },
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.s?css$/,
        use: getCssLoader(),
      },
      // {
      //   test: /\.html$/,
      //   use: getHtmlLoader(env),
      // },
      // {
      //   test: /\.(png|jpe?g|gif)(\?.*)?$/i,
      //   use: getUrlLoader('./images/[name].[ext]'),
      // },
      // {
      //   test: /\.(woff2?|eot|ttf)(\?.*)?$/i,
      //   use: getUrlLoader('./fonts/[name].[ext]'),
      // },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: getBabelLoader(),
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
    }),
  ],
};

function getCssLoader () {
  return [ 'style-loader', 'css-loader' ];
}

function getBabelLoader () {
  let plugins = [
    require.resolve('babel-plugin-syntax-dynamic-import'),
  ];

  let presets = [
    // require.resolve('babel-preset-es2015'),
    // require.resolve('babel-preset-stage-3'),
  ];

  return {
    loader: 'babel-loader',
    options: {
      babelrc: false,
      plugins,
      presets,
      cacheDirectory: true,
    },
  };
}
