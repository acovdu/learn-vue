## Vue项目初始化

创建项目目录vue-project01，在项目目录里面执行如下脚本：

```shell
npm init -y
```

在项目目录里面创建src源代码目录，在src目录里面依次创建index.html和index.js文件，运行如下命令安装jQuery

```shell
npm install jquery -S
```

-S 等同于 --save

在index.js中代码如下：

```js
import $ from 'jquery' 
$(function () {
    console.log('???')
})
```

此时访问index.html，报 Cannot use import statement outside a module错误

安装webpack

```shell
npm install webpack@5.42.1 webpack-cli@4.9.2 -D
```

-D 等同于 --save-dev

在根目录下创建webpack.config.js配置文件，代码如下：

```js
//导入node.js中专门操作路径的模块
const path = require("path")
// 使用node.js语法 向外导出一个webpack配置对象
module.exports = {
    //代表webpack运行模式，有 development 和 production 两个选项，
    // 特点：dev打包快，不压缩；prod打包慢，压缩，正好符合生产要求体积小的需求
    mode: "production",
    //entry 指定入口文件，默认是src下的index.js文件，__dirname代表当前配置文件的目录
    entry: path.join(__dirname, './src/index2.js'),
    //output 打包输出配置
    output: {
        path: path.join(__dirname,'dist01'),
        filename: "bundle.js"
    }
}
```

在package.json文件里面的scripts节点中创建dev命令：

```js
    "dev": "webpack" //scripts节点下的脚本，可以通过npm run 执行，比如：npm run dev
```

在控制台执行

```
npm run dev
```

生成dist文件夹，在index中引入dist文件夹中的main.js

访问index.html，import $ from 'jquery'  类似语法就生效了

## 项目开发热部署

安装webpack-dev-server插件

```shell
npm install webpack-dev-server@3.11.2 -D
```

修改package.json中的dev值:

```js
"scripts": {
    "dev": "webpack serve"
  }
```

再次运行npm run dev报错：

```shell
Unable to load '@webpack-cli/serve' command
```

安装webpack-cli

```shell
npm i webpack-cli -D
```

修改html页面引用内存中的bundle.js

```html
<script type="text/javascript" src="/bundle.js"></script>
```

访问：http://localhost:8080/src/

## 不访问src

安装html-webpack-plugin插件

```shell
npm i html-webpack-plugin@5.3.2 -D
```

在webpack.config.js配置：

```js
//1、导入html-webpack-plugin插件，得到这个插件的构造函数
const HtmlPlugin = require('html-webpack-plugin')
//2、new 构造函数，插件插件对象
const htmlPlugin = new HtmlPlugin({
    template:'./src/index.html',//要复制的文件
    filename:'./index.html'//目标文件
})
// 使用node.js语法 向外导出一个webpack配置对象
module.exports = {
      //3、注册插件
    plugins: [
        htmlPlugin
    ]
}
```

此时直接访问：http://localhost:8080 出现页面

此时在index.html中移除<script type="text/javascript" src="/bundle.js"></script>

访问页面依然有效，是因为html-webpack-plugin插件自动加入了bundle.js

## 指定ip端口打开浏览器

在webpack.config.js配置：

```js
module.exports = {
    //开发服务配置
    devServer: {
        open: true,
        host: '127.0.0.1',
        port: '6980'
    }
}
```



## 加载资源

在webpack中，一切皆是模块，都可以通过ES6语法导入和使用

在src目录下创建css目录，在css目录中创建index.css样式文件

在src/index2.js文件中添加如下代码：

```js
import './css/index.css'
```

此时项目运行报错，提示需要一个合适的加载器来加载这个文件

 安装style-loader和css-loader加载器：

```sh
npm i style-loader@3.0.0 css-loader@5.2.6 -D
```

在webpack.config.js中配置：

```js
module.exports = {
    module: {
        rules: [
            {test: /\.css$/, use: ['style-loader', 'css-loader']}
        ]
    }
}
```

此时通过浏览器发现使用import导入的css样式文件生效





























































