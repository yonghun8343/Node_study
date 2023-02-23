const path = require("path");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "public", "javascripts", "index.js"),
  },
  output: {
    path: path.resolve(__dirname, "public", "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};