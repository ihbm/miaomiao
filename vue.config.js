module.exports = {
  // 代理
  devServer: {
    proxy: {
      '/ajax': {
        target: 'http://m.maoyan.com',
        // ws: true,
        changeOrigin: true
      }
    }
  }
}
