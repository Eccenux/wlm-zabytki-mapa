const path = require("path");
// const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
// var ngAnnotatePlugin = require("ng-annotate-webpack-plugin");
// eslint-disable-next-line import/no-extraneous-dependencies
const TerserPlugin = require("terser-webpack-plugin");

const packageJson = require("./package.json");

const config = {
  mode: 'development',
  context: path.join(__dirname, "src"),
  entry: ["./index.js"],
  output: {
    path: path.join(__dirname, "app", "assets"),
    publicPath: "auto",
    filename: `bundle.js?v=${packageJson.version}`
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "index.html.ejs",
      minify: false,
      filename: path.join("..", "index.html")
    }),
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

/**
 * Production mode re-configuration.
 */
function production() {
  config.output = {
    path: path.join(__dirname, "app-prod", "assets"),
    publicPath: "auto",
    filename: `bundle.[name].js?v=${packageJson.version}`
  };
  config.optimization = {
    minimize: true,
    splitChunks: {
     chunks: 'all',
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          mangle: false,  // uglify doesn't work with this project
          compress: true, // compress = less whitespace
          output: {
            beautify: true  // keep somewhat readable
          }
        },
      }),
    ],
  };
}

module.exports = (env) => {
  if (env.prod) {
    production();
  }
  return config;
}