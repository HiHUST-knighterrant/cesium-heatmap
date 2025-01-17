const CopyWebpackPlugin = require('copy-webpack-plugin')
const webpack = require('webpack')
const path = require('path')

let cesiumSource = './node_modules/cesium/Source'
let cesiumWorkers = '../Build/Cesium/Workers'

module.exports = {
  // 基本路径
  publicPath: "./",
  // 输出文件目录
  outputDir: "dist",
  // eslint-loader 是否在保存的时候检查
  lintOnSave: false,
  // webpack-dev-server 相关配置
  devServer: {
    port: 5000,
    open: true
  },
  configureWebpack: {
    output: {
      sourcePrefix: ' '
    },
    amd: {
      toUrlUndefined: true
    },
    resolve: {
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': path.resolve('src'),
        'cesium': path.resolve(__dirname, cesiumSource)
      }
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, cesiumWorkers), to: 'Workers' },
        ]
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, 'Assets'), to: 'Assets' },
        ]
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, 'Widgets'), to: 'Widgets' },
        ]
      }),
      new CopyWebpackPlugin({
        patterns: [
          { from: path.join(cesiumSource, 'ThirdParty/Workers'), to: 'ThirdParty/Workers' }
        ]
      }),
      new webpack.DefinePlugin({
        CESIUM_BASE_URL: JSON.stringify('./')
      })
    ],
    module: {
      unknownContextCritical: /^.\/.*$/,
      unknownContextCritical: false
    }
  }
};