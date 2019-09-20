const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const autoprefixer = require('autoprefixer')
const pxtorem = require('postcss-pxtorem')
// 拼接路径
const resolve = dir => require('path').join(__dirname, dir)
// 基础路径 注意发布之前要先修改这里
let publicPath = '/'

// 增加环境变量
process.env.VUE_APP_VERSION = require('./package.json').version
process.env.VUE_APP_BUILD_TIME = require('dayjs')().format('YYYY-M-D HH:mm:ss')

// const isProduction = process.env.VUE_APP_ENV !== 'DEV'
const isProduction = process.env.NODE_ENV !== 'development'
// console.log(isProduction)
// console.log(process.env.NODE_ENV)
// CDN
// cdn预加载使用
const externals = {
  vue: 'Vue',
  'vue-router': 'VueRouter',
  vuex: 'Vuex',
  axios: 'axios',
  vant: 'vant'
}
const cdn = {
  // 生产环境
  build: {
    css: [
      'https://cdn.jsdelivr.net/npm/vant@2.0/lib/index.css',
      'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/css/swiper.min.css'
    ],
    js: [
      'https://unpkg.com/vue@2.6.10/dist/vue.min.js',
      'https://cdn.jsdelivr.net/npm/vant@2.0/lib/vant.min.js',
      'https://unpkg.com/vue-router@3.0.7/dist/vue-router.min.js',
      'https://unpkg.com/vuex@3.1.1/dist/vuex.min.js',
      'https://unpkg.com/axios@0.19.0/dist/axios.min.js',
      'https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.5.0/js/swiper.min.js'
    ]
  }
}

module.exports = {
  // baseUrl: './',
  publicPath,
  lintOnSave: true,
  devServer: {
    host: '172.16.100.64',
    port: 8136
    // proxyTable: {
    //   'api': {
    //     target: 'http://api.market.yipurse.cn/api/market/',
    //     changeOrigin: true,
    //     pathRewrite: {
    //       '^api': ''
    //     }
    //   }
    // },
  },
  productionSourceMap: false,
  // 开启gzip压缩
  configureWebpack: config => {
    if (isProduction) {
      config.externals = externals
      return {
        plugins:[
          new CompressionWebpackPlugin({
            filename: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i,
            threshold: 10240,
            minRatio: 0.8
          })
        ]
      }
    }
  },
  css: {
    loaderOptions: {
      // 设置 scss 公用变量文件
      sass: {
        data: `@import '~@/assets/style/public.scss';`
      },
      // 按照设计稿750px 的 1/2
      postcss: {
        plugins: [
          autoprefixer(),
          pxtorem({
            rootValue: 37.5,
            propList: ['*'],
            // 该项仅在使用 Circle 组件时需要
            // 原因参见 https://github.com/youzan/vant/issues/1948
            selectorBlackList: ['van-circle__layer']
          })
        ]
      }
    }
  },
  chainWebpack: config=> {
    // 对vue-cli内部的 webpack 配置进行更细粒度的修改。
    // 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
    // console.log('env: === ' + isProduction)
    if (isProduction) {
      config.plugin('html').tap(args => {
        args[0].cdn = cdn.build
        return args
      })
    }
    const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
    if (process.env.IS_ANALYZ) {
      config.plugin('webpack-report')
      .use(BundleAnalyzerPlugin, [{
        analyzerMode: 'static',
      }])
    }
    /**
     * 删除懒加载模块的 prefetch preload，降低带宽压力
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#prefetch
     * https://cli.vuejs.org/zh/guide/html-and-static-assets.html#preload
     * 而且预渲染时生成的 prefetch 标签是 modern 版本的，低版本浏览器是不需要的
     */
    config.plugins
      .delete('prefetch')
      .delete('preload')
    // 解决 cli3 热更新失效 https://github.com/vuejs/vue-cli/issues/1559
    config.resolve
      .symlinks(true)
      config
      // 开发环境
      // .when(process.env.NODE_ENV === 'development',
      .when(!isProduction,
        // sourcemap不包含列信息
        config => config.devtool('cheap-source-map')
      )
      // 非开发环境
      // .when(process.env.NODE_ENV !== 'development', config => {
      .when(isProduction, config => {
        // console.log('isProduction:' + isProduction)
        config.optimization
          .minimizer([
            new TerserPlugin({
              cache: true,
              parallel: true,
              sourceMap: true, // Must be set to true if using source-maps in production
              terserOptions: {
                compress: {
                  drop_console: true,
                  drop_debugger: true
                }
              }
            })
            // new UglifyJsPlugin({
            //   uglifyOptions: {
            //     // 移除 console
            //     // 其它优化选项 https://segmentfault.com/a/1190000010874406
            //     warnings: false,
            //     compress: {
            //       drop_console: true,
            //       drop_debugger: true,
            //       pure_funcs: ['console.log']
            //     }
            //   }
            // })
          ])
      })
    // svg
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .include
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'sh-icon-[name]'
      })
      .end()
    // image exclude
    const imagesRule = config.module.rule('images')
    imagesRule
      .test(/\.(png|jpe?g|gif|webp|svg)(\?.*)?$/)
      .exclude
      .add(resolve('src/assets/svg-icons/icons'))
      .end()
    // 重新设置 alias
    config.resolve.alias
      .set('@', resolve('src'))
      .set('api', resolve('src/api'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('static', resolve('src/static'))
    // node
    config.node
      .set('__dirname', true)
      .set('__filename', true)
  }
}