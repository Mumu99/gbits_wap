module.exports = {
  lintOnSave: false,
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("autoprefixer")({
            // 配置使用 autoprefixer
            overrideBrowserslist: ["last 15 versions"],
            browsers: ["Android >= 4.0", "iOS >= 7"]
          }),
          require("postcss-pxtorem")({
            rootValue: 16, // 换算的 基数
            propList: ["*"]
          })
        ]
      }
    }
  },
  devServer: {
    compress: false,
    noInfo: true,
    host: "leiting.com",
    port: 8088,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      //配置跨域
      "/api": {
        target: "http://gbits.zhuoyw.com", //这里后台的地址模拟的;应该填写你们真实的后台接口
        ws: true,
        changOrigin: true, //允许跨域
        pathRewrite: {
          " ": "/api" //请求的时候使用这个api就可以
        }
      }
    }
  }
};
