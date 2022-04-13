const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api': '',
                },
                changeOrigin: true,
            },
        },
    },
    configureWebpack: {
        plugins: [
            AutoImport({
                resolvers: [ElementPlusResolver()],
            }),
            Components({
                resolvers: [ElementPlusResolver()],
            }),
        ],
    },
}
