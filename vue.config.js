const path = require('path')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
    outputDir: './build',

    devServer: {
        proxy: {
            '^/api': {
                target: 'http://localhost:3000',
                pathRewrite: {
                    '^/api': '',
                },
                changeOrigin: false,
            },
        },
        port: 5000, // 启动端口号
        open: false, // 启动后是否自动打开网页
    },
    configureWebpack: {
        resolve: {
            alias: {
                components: '@/components',
            },
        },
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
