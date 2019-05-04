const path = require("path");

module.exports = {
  entry: "./bin/www",
  target: "node",
  mode: "development",
  node: {
    __dirname: false,
    __filename: false
  },
  externals: {
    "aws-sdk": "aws-sdk"
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist")
  },
  watch: true
};
