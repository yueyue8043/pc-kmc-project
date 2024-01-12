const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    historyApiFallback: true,
    allowedHosts: "all",
    proxy: {
      '/kmc': {
        // target:'http://123.57.142.38:82/'
        target: 'http://127.0.0.1:82'
      }
    }
  }

})
