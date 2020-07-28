module.exports = {
    // 代理
    publicPath: '/miaomiao',
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