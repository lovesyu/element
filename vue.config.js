module.exports = {
    configureWebpack: {
      resolve: {
        alias: {
          'views': '@/views',
          'components': '@/components',
          'assets': '@/assets',
        }
      }
    },
    lintOnSave: false,
    devServer: {
        proxy: {
            "^/api": {
                target: 'http://baidu.com',
                pathRewrite: {
                    "^/api": '',
                }
            }
        }
    },
  }