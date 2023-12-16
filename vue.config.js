const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer: {
    proxy: {
      '/kmc': {
        target:'http://127.0.0.1'
      }
    }
  }
 
})
