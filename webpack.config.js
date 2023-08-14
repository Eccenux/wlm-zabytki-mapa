const path = require("path");
// const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
// var ngAnnotatePlugin = require("ng-annotate-webpack-plugin");

const packageJson = require("./package.json");

const config = {
  mode: 'development',
  context: path.join(__dirname, "src"),
  entry: ["babel-polyfill", "./index.js"],
  output: {
    path: path.join(__dirname, "app", "assets"),
    publicPath: "auto",
    filename: `bundle.js?v=${packageJson.version}`
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html.ejs",
      filename: path.join("..", "index.html")
    }),
    // function () {
    //   this.plugin("watch-run", function (watching, callback) {
    //     console.log(
    //       "\n\n---- " +
    //         new Date()
    //           .toISOString()
    //           .replace("T", " ")
    //           .replace(/\.[0-9]+Z/, "") +
    //         " ----\n"
    //     );
    //     callback();
    //   });
    // }
  ],
  module: {
    rules: [
      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
          presets: [
            ['@babel/preset-env', { targets: "defaults" }]
          ]
          }
        }
      },
      // {
      //   test: /\.jsx?$/,
      //   exclude: /node_modules/,
      //   loader: "ng-annotate"
      // },
      {
        test: /\.html?$/,
        loader: "raw-loader"
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          "css-loader",
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ]
      },
      // {
      //   test: /\.(woff|woff2|ttf|eot)$/,
      //   loader: 'url-loader',
      //   options: {
      //     name: '[name].[ext]',
      //     outputPath: 'fonts/',
      //   }
      // },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
          outputPath: 'images/',
        }
      },
    ]
  }
};

const ENV = process.env.NODE_ENV;
if (ENV === "prod" || ENV === "dev") {
  config.output = {
    path: path.join(__dirname, "app", "assets"),
    publicPath: "auto",
    filename: `bundle.min.js?v=${packageJson.version}`
  };
  config.plugins = [
    new HtmlWebpackPlugin({
      template: "index.html.ejs",
      filename: path.join("..", "index.html")
    }),
    // new ngAnnotatePlugin({
    //   add: true
    // }),
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {
    //     warnings: false
    //   },
    //   mangle: false
    // })
  ];
}

module.exports = config;
