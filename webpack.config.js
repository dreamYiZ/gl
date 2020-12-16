const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: "./src/main.js",
  watch: true,
  watchOptions: {
    ignored: ['files/**/*.js', 'node_modules/**'],
    aggregateTimeout: 200,
    poll: 1000
  } ,
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },
  devtool: 'inline-source-map',
  devServer: {
    before: function (app, server, compiler) {
      app.get("/some/path", function (req, res) {
        res.json({ custom: "response" });
      });
    },
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 9000,
    allowedHosts: ["host.com", "subdomain.host.com"],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Development',
    }),
  ],
};
