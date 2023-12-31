const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

//打包多个html文件,需要注意devServer默认读取的是内存中的index.html,如果这里是main.html,则需要手动输入xxx/main.html;
const htmlPlugins = ['index'].map(name => new HtmlWebpackPlugin({
    //模版的路径
    template: path.resolve(__dirname, '../public/index.html'),
    //打包后文件的名称
    filename: `${name}.html`,
    //压缩
    minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true
    },
    //给脚本添加哈希值
    hash: true,
}));

module.exports = {
    /** 入口文件 */
    entry: {
        // chunk: ['react', 'react-dom', 'react-router-dom'],
        // app: {
        //     import: path.resolve(__dirname, '../', 'src/index.tsx'),
        //     dependOn: 'chunk'
        // }
        app: {
            import: path.resolve(__dirname, '../', 'src/index.tsx'),
        },
    },
    /** 打包后的文件 */
    output: {
        publicPath: '/',
        filename: 'src/[name].[chunkhash:8].js',
        path: path.resolve(__dirname, '../dist'),
        // clean: true //打包后删除之前的文件
    },
    experiments: {
        // 启用 ES 模块支持
        outputModule: true,
    },
    /** 项目优化项 */
    optimization: {
        //分割代码块
        splitChunks: {
            cacheGroups: {
                defaultVendors: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    minSize: 50000,
                    maxSize: 500000,
                },
            },
        }
    },
    /**loader加载器,代码转译 */
    module: {
        rules: [
            //webpack5内置了asset模块,可以处理图片,字体,音视频等文件
            {
                test: /\.(jpe?g|png|svg|gif|webp)$/,
                type: 'asset/resource',
                generator: {
                    filename: 'images/[name].[contenthash:8][ext]'
                }
            },
            {
                test: /\.(t|j)sx?$/,
                // exclude: ['node_moduels', 'dist'],
                include: path.resolve(__dirname, '../src'),
                //thread-loader将耗时的任务在独立的线程中并行处理，从而提高构建性能
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            //启用缓存
                            cacheDirectory: true
                        }
                    }
                ]
            }
        ]
    },
    /** 配置插件 */
    plugins: [
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: ['**/*', '!vendor.*', '!manifest.*'] //不删除dll产生的文件
        }),
        ...htmlPlugins
    ],

    resolve: {
        // 路径别名
        alias: {
            Src: path.resolve(__dirname, '../', 'src'),
            loadsh: 'lodash-es'
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx'], //按照顺序解析后缀名,不建议加.css
        modules: [path.resolve(__dirname, '../', 'node_modules')], //指定第三方模块的绝对路径,减少搜索步骤
        mainFields: ['main', 'module'], //按照顺序解析包的入口文件,一般默认是main
    },
    devServer: {
        client: {
            overlay: {
                errors: true, //如果有错误需要阻断运行
                warnings: false, //eslint警告不用阻断代码流程
            }
        },
        historyApiFallback: true //解决单页面路由问题
    }
};