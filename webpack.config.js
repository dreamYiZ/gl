const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: "development",
  entry: "./src/main.js",
  watch: true,
  watchOptions: {
    ignored: ["files/**/*.js", "node_modules/**"],
    aggregateTimeout: 200,
    poll: 1000,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, "src"),
        loader: "babel-loader",
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
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
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: "/",
  },
  devtool: "inline-source-map",
  plugins: [
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "Caching",
    }),
    new CopyPlugin({
      patterns: [path.resolve(__dirname, "public"), path.resolve(__dirname, "static")],
    }),
  ],
  devServer: {
    before: function (app, server, compiler) {
      app.get("/some/path", function (req, res) {
        res.json({ custom: "response" });
      });
    },
    // lazy: true,
    hotOnly: true,
    contentBase: path.join(__dirname, "dist"),
    // liveReload: false,
    host: "0.0.0.0",
    open: "Google Chrome",
    port: 9000,
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
