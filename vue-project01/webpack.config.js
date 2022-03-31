//导入node.js中专门操作路径的模块
const path = require("path")

//1、导入html-webpack-plugin插件，得到这个插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')
//2、new 构造函数，插件插件对象
const htmlPlugin = new HtmlPlugin({
    template: './src/index.html',//要复制的文件
    filename: './index.html'//目标文件
})

// 使用node.js语法 向外导出一个webpack配置对象
module.exports = {
    //代表webpack运行模式，有 development 和 production 两个选项，
    // 特点：dev打包快，不压缩；prod打包慢，压缩，正好符合生产要求体积小的需求
    mode: "development",
    //entry 指定入口文件，默认是src下的index.js文件，__dirname代表当前配置文件的目录
    entry: path.join(__dirname, './src/index2.js'),
    //output 打包输出配置
    output: {
        path: path.join(__dirname, 'dist01'),
        filename: "bundle.js"
    },
    //插件注册
    plugins: [
        htmlPlugin
    ],
    //开发服务配置
    devServer: {
        open: false,
        host: '127.0.0.1',
        port: '6980'
    },
    module: {
        rules: [
            //处理css文件的loader
            {test: /\.css$/, use: ['style-loader', 'css-loader']},
            //处理less文件的loader
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']},
            //处理图片文件的loader
            {test: /\.jpg|png|gif$/, use:'url-loader'},
        ]
    }
}