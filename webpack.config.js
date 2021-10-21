const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
  entry: "./src/index.tsx",
  mode: process.env.NODE_ENV === "PRODUCTION" ? "production" : "development",
  module: {
    rules: [{ test: /\.tsx?$/, use: "ts-loader", exclude: /node_modules/ }],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/index.html",
    }),
  ],
};
