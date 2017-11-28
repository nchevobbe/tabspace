const path = require("path");

module.exports = {
  entry: {
    background: ["./src/background-script.js"],
    content: ["./src/index.js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  module: {
    rules: [{ test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }],
  },
};
