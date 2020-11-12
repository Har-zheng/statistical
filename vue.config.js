const path = require("path");

//拼接路径
function resolve(dir) {
  return path.join(__dirname, dir);
}
module.exports = {
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("./src"))
      .set("@components", resolve("src/components"))
      .set("@static", resolve("src/static"));
  },
  devServer: {
    open: true,
    host: "localhost",
    port: 8080, //端口
    https: false,
    hotOnly: false,
    proxy: {
      // 设置代理
      "/api": {
        target: "http://core-service.myreal3d.com/",
        // ws: true,
        changOrigin: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
