const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

let isDevelopment = process.env.NODE_ENV === "development";

module.exports = {
  mode: "development",
  entry: {
    main: "./src/main.js",
  },
  watch: true,
  watchOptions: {
    ignored: ["files/**/*.js", "node_modules/**"],
    aggregateTimeout: 200,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              // Prefer `dart-sass`
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
    ],
  },
  // output: {
  //   filename: "[name].[contenthash].js",
  //   path: path.resolve(__dirname, "dist"),
  // },
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public/index.html"),
      title: "gl",
    }),
    new CopyPlugin({
      patterns: [
        path.resolve(__dirname, "public"),
        path.resolve(__dirname, "static"),
      ],
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
  ],
  devServer: {
    liveReload: true,
    contentBase: path.join(__dirname, "dist"),
    open: "Google Chrome",
    port: 9000,
    
    // index: path.join(__dirname, "public/index.html"),
    allowedHosts: ["host.com", "subdomain.host.com"],
    injectHot: (compilerConfig) => compilerConfig.name === "only-include",
  },

  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
