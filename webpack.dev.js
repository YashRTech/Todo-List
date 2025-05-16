const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "eval-source-map",
  devServer: {
    static: "./dist",
    watchFiles: ["./src/template.html"],
    open: true,
    port: 8080,
  },
});

