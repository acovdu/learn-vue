## 工程化

### Vue项目初始化

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

### 项目开发热部署

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

### 不访问src

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

### 指定ip端口打开浏览器

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



### 加载资源

在webpack中，一切皆是模块，都可以通过ES6语法导入和使用

#### 加载css

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

#### 加载less

在src目录下创建css目录，在css目录中创建index.less样式文件

在src/index2.js文件中添加如下代码：

```js
import './css/index.less'
```

 安装less-loader和css-loader加载器：

```js
npm i less-loader@10.0.1 less@4.1.1 -D
```

在webpack.config.js中配置：

```js
module.exports = {
    module: {
        rules: [
            {test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader']}
        ]
    }
}
```

运行项目，发现导入的less样式生效

#### 加载图片

base64图片优缺点

| 优点                           | 缺点                     |
| ------------------------------ | ------------------------ |
| 不用发起多次网络请求，一步到位 | 转成base64后体积会大一点 |

在src目录下创建img目录，在img目录下放入一个test.jpg的图片

在index.html文件中加入图片标签:

```html
<img src="" class="imgBox">
```

在index2.js文件中加入代码：

```js
import testimg from './img/test.jpg'

$(function () {
    $('.imgBox').attr('src',testimg)
})
```

 安装url-loader和file-loader加载器：

```sh
npm i url-loader@4.1.1 file-loader@6.2.0 -D
```

在webpack.config.js中配置：

```js
module.exports = {
    module: {
        rules: [
            {test: /\.jpg|png|gif$/, use:'url-loader'}
        ]
    }
}
```

运行项目，在浏览器发现导入图片











## 官网示例

### 声明式渲染

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Hello Vue 声明式渲染</title>
</head>
<body>
<div id="app">
    {{message}}
</div>
<div id="app-2">
    <span v-bind:title="message">
        悬停看提示信息
    </span>
</div>
</body>
<script src="../lib/vue.js"></script>
<script>
    var app = new Vue({
        el: '#app',
        data: function () {
            return {
                message: 'Hello vue'
            }
        }
    });

    var app2 = new Vue({
        el: '#app-2',
        data: function () {
            return {
                message: '页面加载于 ' + new Date().toLocaleDateString()
            }
        }
    })
</script>
</html>
```

### 条件与循环

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>条件与循环</title>
</head>
<body>

<div id="app">
    <p v-if="seen">显示</p>
</div>

<div id="app2">
    <ol>
        <li v-for="todo in todos">
            {{todo.text}}
        </li>
    </ol>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>

    var app = new Vue({
        el: '#app',
        data: {
            seen: false
        }
    })

    var app2 = new Vue({
        el: '#app2',
        data: function () {
            return {
                todos: [
                    {text: 'xxx'},
                    {text: 'yyy'},
                    {text: 'zzz'}
                ]
            }
        }
    })
</script>
</html>

```

### 处理用户输入

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>处理用户输入</title>
</head>
<body>
<!--方法的使用-->
<div id="app">
    <p>{{message}}</p>
    <button v-on:click="reverseMessage">反转消息</button>
</div>

<!--双向绑定-->
<div id="app2">
    <p>{{message}}</p>
    <input v-model="message">
</div>

</body>
<script src="../lib/vue.js"></script>
<script>

    var app = new Vue({
        el: '#app',
        data: function () {
            return {
                message: 'Hello Vue.js'
            }
        },
        methods: {
            reverseMessage: function () {
                this.message = this.message.split('').reverse().join('');
            }
        }
    });

    var app2 = new Vue({
        el: '#app2',
        data: {
            message: 'Hello Vue'
        }
    })
</script>
</html>

```

### 组件化应用构建

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>组件化应用构建</title>
</head>
<body>
<div id="app">
    <ol>
        <todo-item
                v-for="item in groceryList"
                v-bind:todo="item"
                v-bind:key="item.id"
        >

        </todo-item>
    </ol>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    Vue.component('todo-item', {
        props: ['todo'],
        template: '<li v-bind:id="todo.id">{{todo.text}}</li>'
    })
    var app = new Vue({
        el: '#app',
        data: function () {
            return {
                groceryList: [
                    {id: 5, text: '手机'},
                    {id: 6, text: '电脑'},
                    {id: 8, text: '耳机'}
                ]
            }
        }
    })
</script>
</html>

```

### 实例数据与方法

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>数据与方法</title>
</head>
<body>
<div id="app">

    <p>{{msg}}</p>
</div>
<div id="app2">
    <p>{{foo}}</p>
    <button v-on:click="foo = 'baz'">改变foo</button>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var data = {
        a: 1,
        msg: null
    }

    var vm = new Vue({
        el: '#app',
        data: data
    })
    console.info('vm.a==data.a: ' + (vm.a == data.a))
    vm.a = 2;
    console.info('vm.a=2后data.a的值:' + data.a)
    data.a = 3;
    console.info('data.a=3后vm.a的值:' + vm.a)

    //后面添加的属性不是响应式的,如果需要响应式就先初始化
    vm.msg = '实例化后更新消息'

    //使用Object.freeze()阻止修改现有属性,响应系统无法追踪变化
    var obj = {foo: 'bar'}
    // Object.freeze(obj)
    var vm2 = new Vue({
        el: '#app2',
        data: obj
    })

    //Vue暴露的属性和方法
    console.info('vm.$data == data :' + (vm.$data == data))
    console.info('vm.$el == document.getElementById(\'app\') :' + (vm.$el == document.getElementById('app')))
    vm2.$watch('foo', function (newValue, oldValue) {
        console.info('foo的旧值:' + oldValue)
        console.info('foo的新值:' + newValue)
    })

</script>
</html>

```

### 实列生命周期钩子

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>实例生命周期钩子</title>
</head>
<body>
<div id="app">
    <p>{{msg}}</p>
</div>
<div id="app2">
    <p>{{msg}}</p>
</div>
</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        // el: '#app',
        data: function () {
            return {
                msg: '消息...'
            }
        },
        beforeCreate: function () {
            console.info('创建前..')
        },
        created: function () {
            console.info('创建后..')
        },
        beforeMount: function () {
            console.info('安装前..')
        },
        mounted: function () {
            console.info('安装后..')
        },
        beforeUpdate: function () {
            console.info('更新前..')
        },
        updated: function () {
            console.info('更新后..')
        },
        beforeDestroy: function () {
            console.info('销毁前..')
        },
        destroyed: function () {
            console.info('销毁后..')
        }
    })
    //创建Vue实例时没有指定el,安装方法是可调用的
    vm.$mount('#app')
    //销毁
    vm.$destroy()
</script>
</html>

```

### 语法-插值

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>插值</title>
</head>
<body>
<div id="app">
    <!-- 文本 -->
    <!-- v-once 一次性插值-->
    <span v-once>Message: {{msg}}</span>

    <br/><br/>

    <!--  原始HTML  -->
    <!-- 使用{{}}输出原始值-->
    <span>{{rawHtml}}</span>

    <!--  v-html 输出并解析html代码  -->
    <span v-html="rawHtml"></span>

    <!--  Attribute 属性  -->
    <span v-bind:id="objId">绑定属性id</span>
    <br>
    <br>
    <!--    布尔属性-->
    <!--  disableBtn 的值为false、null、undefined时，disabled属性不会被渲染出来-->
    <button v-bind:disabled="disableBtn">按钮</button>
    <!--    js表达式，只能使用表达式，不能使用js语句-->
    <p>{{ num + 1 }}</p>
    <p>{{ ok ? 'Yes':'No'}}</p>
    <p>{{ msg.split('').reverse().join('') }}</p>
    <div v-bind:id="'list-' + objId">绑定id属性</div>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                msg: '消息...',
                rawHtml: '<p>使用v-html插入的p标签..</p>',
                objId: '001',
                disableBtn: true,
                num: 1,
                ok: false
            }
        }
    })
</script>
</html>
```

### 语法-指令

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>指令</title>
</head>
<body>
<div id="app">

    <!--  v-if 指令  -->
    <p v-if="seen">被看到。。</p>

    <!--  参数  -->
    <!--  能接收参数的指令，在指令后面以冒号表示  -->
    <a v-bind:href="url">链接</a>

    <br>
    <!--  v-on 指令，用于事件函数绑定  -->
    <button v-on:click="clickBtn">按钮</button>

    <br>
    <!--  动态参数 注意：中括号中的属性要统一小写，避免使用引号和空格，null值会移除绑定，其他非字符串会触发警告 -->
    <a v-bind:[att_name]="url">动态绑定属性</a>
    <br>
    <button v-on:[event_name]="clickBtn">动态按钮</button>

    <br>
    <!--  修饰符  -->
    <!--  v-on:submit.prevent 改变默认提交方法  -->
    <form v-on:submit.prevent="onSubmit" action="http://182.151.12.39:18987/homePage/list">
        <button type="submit">提交</button>
    </form>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>

    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                seen: true,
                url: 'http://www.baidu.com',
                att_name: 'href',
                event_name: 'click'
            }
        },
        methods: {
            clickBtn: function () {
                alert('点了按钮。。')
            },
            onSubmit: function () {
                alert('提交中。。。')
            }
        }
    })
</script>
</html>

```

### 语法-缩写

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>缩写</title>
</head>
<body>
<div id="app">
    <!--  v-bind 的缩写  -->
    <a :href="url">链接</a>
    <br>
    <a :[att_name]="url">链接2</a>
    <br>
    <!--  v-on 的缩写  -->
    <button @click="clickBtn">按钮</button>
    <br><br>
    <button @[event_name]="clickBtn">按钮2</button>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                url: 'http://www.baidu.com',
                att_name: 'href',
                event_name: 'click'
            }
        },
        methods: {
            clickBtn: function () {
                alert('点了按钮。。')
            }
        }
    })
</script>
</html>

```

### 计算属性

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>计算属性</title>
</head>
<body>
<div id="app">

    <!--  对于复杂的逻辑，都应该使用计算属性  -->
    <p>Msg：{{ msg }}</p>
    <!--  当msg改变时，计算值也会跟着变  -->
    <p>Reverse Msg：{{ reverseMsg }}</p>

    <!--  使用方法达到同样的效果  -->
    <p>方法反转Msg：{{ reverseMsgMethod() }}</p>
    <!--  计算有缓存，方法没有缓存 ，如果不需要缓存就用方法。当msg改变时计算属性和方法都将更新 -->
</div>
<div id="app2">
    <p>监听名字:{{fullName}}</p>
</div>
<div id="app3">
    <p>计算名字:{{fullName}}</p>
</div>
<div id="app4">
    <p>计算set和get方法:{{fullName}}</p>
</div>
</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                msg: 'Hello',
            }
        },
        methods: {
            reverseMsgMethod: function () {
                console.info('方法计算msg')
                return this.msg.split('').reverse().join('');
            }
        },
        computed: {
            reverseMsg: function () {
                console.info('计算msg')
                return this.msg.split('').reverse().join('');
            }
        }
    })

    //计算属性 vs 侦听属性
    var vm2 = new Vue({
        el: '#app2',
        data: function () {
            return {
                firstName: '三',
                lastName: '张',
                fullName: '张三'
            }
        },
        watch: {
            firstName: function (val) {
                console.info('firstName更新为:' + val)
                this.fullName = this.lastName + val;
            },
            lastName: function (val) {
                console.info('lastName更新为:' + val)
                this.fullName = val + this.firstName;
            }
        }
    })
    //计算 用计算就就比较直观方便
    var vm3 = new Vue({
        el: '#app3',
        data: function () {
            return {
                firstName: '三',
                lastName: '张'
            }
        },
        computed: {
            fullName: function () {
                var name = this.lastName + this.firstName;
                console.info('计算得出名字:' + name)
                return name;
            }
        }
    })

    //计算属性的 setter
    //默认提供get
    var vm4 = new Vue({
        el: '#app4',
        data: function () {
            return {
                firstName: '三',
                lastName: '张'
            }
        },
        computed: {
            fullName: {
                get: function () {
                    var name = this.lastName + this.firstName;
                    console.info('get名字:' + name)
                    return name;
                },
                set: function (val) {
                    if (val) {
                        console.info('set名字:' + val)
                        this.firstName = val.substr(1, val.length - 1);
                        this.lastName = val.substr(0, 1);
                    }
                }
            }
        }
    })
    //直接赋值将调用set方法
    // vm4.fullName = '王二111';

</script>
</html>

```

### 监听器

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>侦听器</title>
</head>
<body>
<div id="app">
    问yes还是no：<input v-model="question">
    <br>
    <p>解答：{{answer}}</p>
</div>

</body>
<!-- 因为 AJAX 库和通用工具的生态已经相当丰富，Vue 核心代码没有重复 -->
<!-- 提供这些功能以保持精简。这也可以让你自由选择自己更熟悉的工具。 -->
<script src="https://cdn.jsdelivr.net/npm/axios@0.12.0/dist/axios.min.js"></script>
<!--<script src="https://cdn.jsdelivr.net/npm/lodash@4.13.1/lodash.min.js"></script>-->
<script src="../lib/vue.js"></script>
<script src="../lib/lodash.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                question: '',
                answer: '请提问！'
            }
        },
        created: function () {
            //创建后
            console.info('created...')
            // `_.debounce` 是一个通过 Lodash 限制操作频率的函数。
            this.debouncedGetAnswer = _.debounce(this.getAnswer, 500)
        },
        watch: {
            question: function (newVal, oldVal) {
                console.info('旧问题:' + oldVal + ',新问题:' + newVal)
                this.answer = '等待你停止输入...'
                this.debouncedGetAnswer()
            }
        },
        methods: {
            getAnswer: function () {
                console.info('执行getAnswer()方法...')
                var vm = this;
                axios.get('https://yesno.wtf/api')
                    .then(function (resp) {
                        console.info('响应:' + JSON.stringify(resp))
                        vm.answer = resp.data.answer;
                    })
                    .catch(function (err) {
                        vm.wanwer = '出现异常:' + err;
                    });
            }
        }

    })

</script>
</html>


```

### 绑定class

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>绑定 HTML Class</title>
    <style type="text/css">
        .active {
            border: 1px solid red;
        }

        .static {
            padding: 2px 2px;
        }

        .text-danger {
            color: coral;
        }
    </style>
</head>
<body>
<div id="app">
    <div class="static" v-bind:class="{ active: isActive }">
        <p>绑定class</p>
    </div>
    <div v-bind:class="classObject">
        <p>class绑定一个对象</p>
    </div>
    <div v-bind:class="computeAtt">
        <p>class绑定一个计算属性</p>
    </div>
    <div v-bind:class="[activeClass,errorClass]">
        <p>class 绑定一个数组</p>
    </div>
    <div v-bind:class="[isActive?activeClass:'',errorClass]">
        <p>三元表达式控制class</p>
    </div>
    <div v-bind:class="[{active:isActive},errorClass]">
        <p>绑定class数组中用对象语法</p>
    </div>

    <!--  组件添加class  -->
    <my-component class="text-danger"></my-component>
    <my-component v-bind:class="{active:isActive}"></my-component>
</div>
</body>
<script src="../lib/vue.js"></script>
<script>
    Vue.component('my-component', {
        template: '<p class="yyyyy">我是一个组件</p>'
    })

    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                isActive: true,
                activeClass: 'active',
                errorClass: 'text-danger',
                classObject: {
                    active: true
                }
            }
        },
        computed: {
            computeAtt: function () {
                return {
                    active: true
                }
            }
        }
    })


</script>
</html>

```

### 绑定内嵌样式

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>绑定内联样式</title>
    <style type="text/css">
        .xxx {
            font-weight: bold;
            text-decoration: underline;
        }
    </style>
</head>
<body>
<div id="app">
    <!--  可以都使用驼峰形式，使用横杠形式的样式属性名需要引号引起来  -->
    <div :style="{color:activeColor,fontFamily: fontF,'font-size':fontS+'px'}">
        <p>绑定内联样式</p>
    </div>
    <div :style="styleObj">
        <p>绑定内联样式对象</p>
    </div>
    <div :style="compStyle">
        <p>使用计算对象</p>
    </div>
    <div :style="[styleObj,styleOtherObj]">
        <p>使用数组语法</p>
    </div>
    <div :style="[autoPrefix]">
        <p>自动添加前缀</p>
    </div>
    <div :style="{display: ['-webkit-box', '-ms-flexbox', 'flex'] }">
        <p>多重值</p>
    </div>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                activeColor: 'blue',
                fontS: 36,
                fontF: '楷体',
                transform: 'rotate(7deg)',
                styleObj: {
                    color: 'red',
                    fontSize: '22px',
                    fontFamily: '微软雅黑',
                    fontWeight: 'bold'
                },
                styleOtherObj: {
                    textDecoration: 'underline'
                },
                autoPrefix: {
                    width: '100px',
                    height: '100px',
                    border: '1px solid red',
                    transform: 'rotate(7deg)'
                }
            }
        },
        computed: {
            compStyle: function () {
                return {
                    color: 'orange',
                    fontSize: '26px',
                    fontFamily: '宋体',
                    fontWeight: 'bold'
                }
            }
        }
    })
</script>
</html>

```

### 条件渲染 v-if

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>v-if</title>
</head>
<body>
<div id="app">
    <h5 v-if="awesome">很棒..</h5>
    <h5 v-else>不是很棒</h5>
    <div v-if="ok">
        <div>if控制模块</div>
    </div>
    <template v-if="showTemplate">
        <div>if控制模板</div>
    </template>
    <!--  使用else if  -->
    <p v-if="selectTemplate == 'a'">显示a</p>
    <p v-else-if="selectTemplate == 'b'">显示b</p>
    <p v-else-if="selectTemplate == 'c'">显示c</p>
    <p v-else>未知页面</p>

    <!--  复用元素  -->
    <template v-if="loginType=='username'">
        <h4>用户名登陆</h4>
        <input type="text" placeholder="输入用户名">
    </template>
    <template v-else>
        <h4>邮箱登陆</h4>
        <input type="text" placeholder="输入邮箱地址">
    </template>
    <button @click="switchLoginType">切换登陆类型</button>

    <!--  用key管理可复用元素  -->
    <template v-if="loginType=='username'">
        <h4>用户名登陆</h4>
        <input type="text" placeholder="输入用户名" key="username">
    </template>
    <template v-else>
        <h4>邮箱登陆</h4>
        <input type="text" placeholder="输入邮箱地址" key="email">
    </template>
    <button @click="switchLoginType">切换登陆类型时清空输入框</button>

    <!--   不推荐v-if 和 v-for同时使用，因为v-for有更高的优先级 -->
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                awesome: true,
                ok: true,
                showTemplate: true,
                selectTemplate: 'a',
                loginType: 'username'
            }
        },
        methods: {
            switchLoginType: function () {
                this.loginType = this.loginType == 'username' ? 'email' : 'username';
            }
        }
    })
    // vm.awesome = false;

</script>
</html>

```

### 条件渲染 v-show

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>v-show</title>
</head>
<body>
<div id="app">
    <div v-show="showMe">
        <p>显示我？？</p>
    </div>
    <!--  v-show不支持template标签  -->
    <template v-show="showMe">
        <p>显示我？？</p>
    </template>

    <!--
    v-if vs v-show
    v-show初始渲染开销较大，v-if初始渲染开销较小
    如果运行中需要频繁切换用v-show，运行中很少切换用v-if
    -->

</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                showMe: true
            }
        }
    })
</script>
</html>

```

### 列表渲染 v-for

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>v-for</title>
</head>
<body>
<ul id="app">

    <p>遍历消息加父级消息</p>
    <li v-for="item in items" :key="item.msg">
        {{ item.msg }},{{parentMsg}}
    </li>

    <p>加索引</p>
    <li v-for="(item,index) in items2" :key="item.msg">
        {{ item.msg }}-{{ index}}
    </li>

    <p>遍历对象信息</p>
    <li v-for="value in user">
        {{ value }}
    </li>

    <p>遍历对象信息 使用 of</p>
    <li v-for="value of user">
        {{ value }}
    </li>

    <p>遍历对象信息和属性名</p>
    <li v-for="(value,name) in user">
        {{name}}:{{ value }}
    </li>

    <p>遍历对象信息和属性名加索引</p>
    <li v-for="(value,name,index) in user">
        {{ index+1 }}.{{ name }}:{{ value }}
    </li>

    <!--  尽量使用key，相当于数据库表的主键id  -->

    <p>v-for遍历数字</p>
    <li v-for="n in 10">{{ n }}</li>

    <p>template上使用v-for</p>
    <template v-for="item in items">
        <li>{{item.msg}}</li>
    </template>

    <p>v-for 与 v-if 一块使用</p>
    <li v-for="item in items" v-if="item.id != 1">
        {{item.msg}}
    </li>

    <p>条件置于循环外层</p>
    <template v-if="items.length > 0">
        <li v-for="item in items">
            {{item.msg}}
        </li>
    </template>

</ul>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                parentMsg: '父级消息',
                items: [
                    {id: 1, msg: '消息x'},
                    {id: 2, msg: '消息z'}
                ],
                items2: [
                    {msg: 'yyyy'},
                    {msg: 'xxxx'}
                ],
                user: {
                    name: '张三',
                    年龄: 20,
                    地址: '上海'
                }
            }
        }
    });
    //数组替换
    vm.items2 = vm.items2.filter(function (item) {
        return item.msg.match('xxxx')
    })
    //数组变化
    vm.items2.push({msg: 'zzzz'});
</script>
</html>

```

### 列表渲染-过滤排序

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>过滤、排序</title>
</head>
<body>
<div id="app">
    <p>计算属性</p>
    <span v-for="num in evenNumbers">{{ num + '，' }}</span>
    <p>使用方法</p>
    <span v-for="num in even(nums)">{{ num + '，' }}</span>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function() {
            return {
                nums: [1, 2, 3, 4, 5, 6]
            }
        },
        computed: {
            evenNumbers: function () {
                return this.nums.filter(function (num) {
                    return num % 2 == 0;
                })
            }
        },
        methods: {
            even: function (nums) {
                return nums.filter(function (num) {
                    return num % 2 == 0;
                })
            }
        }
    })
</script>
</html>

```

### 在组件上使用 v-for

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>在组件上使用 v-for</title>
</head>
<body>
<div id="app">
    <ul>
        <!--    2.2.0+版本以上，必须使用key     -->
        <!--<li
                is="my-comp"
                v-for="(item,index) in news"
                v-bind:title="item.title"
                v-bind:key="item.id"
                v-bind:id="item.id"
                v-bind:index="index"
        >
        </li>-->
    </ul>

    <p>以下是添加新闻板块</p>
    <form v-on:submit.prevent="addNew">
        <label for="add-news">添加新闻</label>
        <input v-model="newsTitle" id="add-news">
        <button>提交</button>
    </form>

    <ul>
        <li
                is="news-list"
                v-for="(item,index) in news"
                v-bind:title="item.title"
                v-bind:key="item.id"
                v-on:remove="news.splice(index,1)"
        >

        </li>
    </ul>

</div>

</body>
<script src="../lib/vue.js"></script>
<script>

    Vue.component('news-list', {
        template: '<li>{{title}} <button v-on:click="$emit(\'remove\')">Remove</button></li>',
        props: ['title']
    })

    Vue.component('my-comp', {
        template: '<li>{{title}}</li>',
        props: ['title']
    })

    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                newsTitle: '',
                news: [
                    {id: 1, title: '新闻一'},
                    {id: 2, title: '新闻二'},
                    {id: 3, title: '新闻三'},
                    {id: 4, title: '新闻四'}
                ],
                newNextId: 4
            }
        },
        methods: {
            addNew: function () {
                this.news.push({
                    id: this.newNextId++,
                    title: this.newsTitle
                })
            }
        }
    })
</script>
</html>
```

### 监听事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>监听事件</title>
</head>
<body>
<div id="app">
    <button v-on:click="num+=1">数量加1</button>
    <p>数量：{{num}}</p>

    <button v-on:click="useMethod">触发方法</button>
    <br>
    <button v-on:click="innerHander('消息111')">传入消息</button>
    <br>
    <form action="123">
        <button type="submit" v-on:click="innerHanderAndEvent('消息222',$event)">传入消息和DOM事件</button>
    </form>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return{
                num: 0,
                name: '名称111'
            }
        },
        methods: {
            useMethod: function (event) {
                alert('实例name属性值：' + this.name)
                if (event) {
                    //原生DOM事件
                    alert('触发标签: ' + event.target.tagName)
                }
            },
            innerHander: function (msg) {
                alert(msg)
            },
            innerHanderAndEvent: function (msg, event) {
                alert(msg)
                if (event) {
                    //阻止默认事件
                    event.preventDefault();
                }
            }
        }
    })
</script>
</html>
```

### 事件修饰符

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>事件修饰符</title>
</head>
<body>
<div id="app">
    <div @click="clickDiv">
        <p>点击继续传播，出现冒泡</p>
        <button @click="clickBtn">按钮</button>
    </div>
    <div @click="clickDiv">
        <p>.stop 阻止点击继续传播，父级div上的点击事件失效</p>
        <button @click.stop="clickBtn">按钮</button>
    </div>
    <br>

    <form action="/xxxx" @click.prevent="submitForm">
        <p>.prevent 阻止默认事件的发生</p>
        <button type="submit">注册</button>
    </form>
    <a href="www.baidu.com" @click.prevent>百度</a>

    <p>.capture 捕获冒泡，会被最先触发</p>
    <div style="width: 200px;height: 200px;border: 1px solid blue" @click.capture="outClick">
        <div style="width: 160px;height: 160px;border: 1px solid red" @click="midClick">
            <div style="width: 120px;height: 120px;border: 1px solid orange" @click="innerClick"></div>
        </div>
    </div>

    <p>.self 避免冒泡影响，只有点击自身才触发</p>
    <div style="width: 200px;height: 200px;border: 1px solid blue" @click="outClick">
        <div style="width: 160px;height: 160px;border: 1px solid red" @click.self="midClick">
            <div style="width: 120px;height: 120px;border: 1px solid orange" @click="innerClick"></div>
        </div>
    </div>

    <p>.once 只触发一次</p>
    <button @click.once="clickDiv">点击触发一次</button>

    <p>.passive 不阻止事件的默认行为</p>
    <p>使用.passive 可以提高性能，让浏览器不用再去判断有没有调用event.preventDefault()</p>
    <div></div>

    <p>.native 用于自定义的组件上，在根节点上使用</p>
    <comp-a @click.native="clickCompABtn"></comp-a>
    <comp-b></comp-b>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>

    Vue.component('comp-a', {
        template: '<button>组件a的按钮</button>'
    })
    Vue.component('comp-b', {
        template: '<button @click.native="clickCompBBtn">组件b的按钮</button>'
    })

    var vm = new Vue({
        el: '#app',
        data: function () {
            return {}
        },
        methods: {
            clickDiv: function () {
                console.info('点击div..')
            },
            clickBtn: function () {
                console.info('点击按钮...')
            },
            submitForm: function () {
                console.info('执行表单提交方法')
            },
            outClick: function () {
                console.info('最外层。。')
            },
            midClick: function () {
                console.info('中间层。。')
            },
            innerClick: function () {
                console.info('内层..')
            },
            clickCompABtn: function () {
                console.info('点击组件a按钮..')
            },
            clickCompBBtn: function () {
                console.info('点击组件b按钮..')
            }
        }
    })
</script>
</html>
```

### 按键修饰符

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>按键修饰符</title>
    <style type="text/css">
        .xxx {
            border: 1px solid blue;
            padding: 5px;
        }
    </style>
</head>
<body>
<div id="app">
    <div :style="divStyle">
        <form action="/aaa" @submit.prevent>

            <p>按回车键触发提交方法</p>
            名字: <input type="text" v-model="name" @keyup.enter="enterSubmit"/>
            <!--        <p>{{name}}</p>-->
        </form>
    </div>
    <div :style="divStyle">
        <p>按键抬起触发</p>
        <input @keyup="keyUp">
    </div>
    <div :style="divStyle">
        <p>使用按键名，比如page down</p>
        <input @keyup.page-down="triggerBuild('page down')"><br>
        vue的示例按键名：<br>
        .enter<br>
        .tab<br>
        .delete (捕获“删除”和“退格”键)<br>
        .esc<br>
        .space<br>
        .up<br>
        .down<br>
        .left<br>
        .right<br>
    </div>
    <div :style="divStyle">
        <p>使用按键码，比如回车键，已经废弃，新浏览器可能不支持</p>
        <input @keyup.13="triggerBuild('13')">
    </div>
    <div :style="divStyle">
        自定义按键码,13
        <回车键br>
            <input @keyup.f1="triggerBuild('自定义按键码,13 回车键')">
    </div>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    //自定义按键码,13 回车键
    Vue.config.keyCodes.f1 = 13;

    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                name: '按下回车键提交',
                divStyle: {
                    width: 'auto',
                    height: 'auto',
                    border: '1px solid blue',
                    padding: '15px'
                }
            }
        },
        methods: {
            enterSubmit: function () {
                console.info('回车提交...')
            },
            keyUp: function () {
                console.info('按键抬起触发..')
            },
            triggerBuild: function (key) {
                console.info('触发按键：' + key)
            }
        }
    })
</script>
</html>
```

### 系统修饰符

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>系统修饰键</title>
    <style scoped>
        @import "../css/common.css";
    </style>
</head>
<body>
<div id="app">

    <div class="xxx">
        使用组合键触发事件<br>
        常用搭配组合键：Ctrl、Alt、Shift、Meta（Win系统为开始键）<br>
        Ctrl + C 组合<br>
        <input @keyup.ctrl.c="triggerBuild('Ctrl + C')"><br>
    </div>

    <div class="xxx" @click.ctrl="triggerBuild('按Ctrl键点击')">
        <p>按Ctrl键点击</p>
    </div>

    <div class="xxx">
        .exact修饰符<br>
        问题：按下Ctrl与Shift和Alt任意组合再点击按钮A，都会触发<br>
        <button @click.ctrl="triggerBuild('@click.ctrl')">按钮A</button>
        <br>
        只有按下Ctrl再点击按钮B才会触发<br>
        <button @click.ctrl.exact="triggerBuild('@click.ctrl.exact')">按钮B</button>
        <br>
        没有按下Ctrl、Shift和Alt任意键时或任意组合键时点击按钮C才会触发<br>
        <button @click.exact="triggerBuild('@click.exact')">按钮C</button>

    </div>
    <div class="xxx">
        鼠标按钮修饰符<br>
        <button @click.left="triggerBuild('左键点击')">左键点击</button>
        <br>
        <button @click.right="triggerBuild('右键点击')">右键点击</button>
        <br>
        <button @click.middle="triggerBuild('中键点击')">中键点击</button>
        <br>

    </div>

</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {}
        },
        methods: {
            triggerBuild: function (key) {
                console.info('触发按键：' + key)
            }
        }
    })
</script>
</html>
```

### 表单

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>表单输入绑定基础用法</title>
    <style scoped>
        @import "../css/common.css";
    </style>
</head>
<body>
<div id="app">

    <div class="xxx">
        <h3>v-model双向绑定数据</h3>
        输入框：<input v-model="msg" placeholder="输入消息">
        <p>msg：{{msg}}</p>
        使用v-model，元素的默认值都会替换成Vue实列的数据值<br>

        多行文本框：<textarea v-model="textMsg"></textarea>
        <p>{{textMsg}}</p>

        复选框：<input type="checkbox" value="123" v-model="checked">
        <p>{{checked}}</p>

        多个复选框：<label><input type="checkbox" value="A" v-model="names">A选项</label>
        <label><input type="checkbox" value="B" v-model="names">B选项</label>
        <p>{{names}}</p>

        单选按钮：<label><input type="radio" value="man" v-model="sex">男</label>
        <label><input type="radio" value="woman" v-model="sex">女</label>
        <P>{{sex}}</P>

        选择框：
        <select v-model="area">
            <option disabled value="">请选择</option>
            <option value="beijing">北京</option>
            <option>上海</option>
            <option>深圳</option>
        </select>
        <p>{{area}}</p>

        多选框：
        <select multiple v-model="areas">
            <option disabled value="">请选择</option>
            <option value="beijing">北京</option>
            <option>上海</option>
            <option>深圳</option>
        </select>
        <p>{{areas}}</p>
    </div>

    <div class="xxx">
        <h3>值绑定</h3>
        输入框：<input type="text" v-model="name"/>
        <p>{{name}}</p>
        文本域：<textarea v-model="content"></textarea>
        <p>{{content}}</p>
        单选按钮：<label><input type="radio" value="man" v-model="gender">男</label>
        <label><input type="radio" value="woman" v-model="gender">女</label>
        <p>{{gender}}</p>
        选择框数据初始化及数据绑定；<br>
        单选择框：
        <select v-model="book">
            <option v-for="book in selectBooks">{{book.text}}</option>
        </select>
        <p>{{book}}</p>

        复选框：<label><input type="checkbox" value="basketball" v-model="hobbies"/>篮球</label>
        <label><input type="checkbox" value="football" v-model="hobbies">足球</label>
        <p>{{hobbies}}</p>
        多选择框：
        <select multiple v-model="depts">
            <option v-for="dept in selectDepts" :value="dept.value">{{dept.text}}</option>
        </select>
        <p>{{depts}}</p>
    </div>
    <div class="xxx">
        <h3>修饰符</h3>
        .lazy 输入完成，光标离开输入框数据才同步<br>
        <input type="text" v-model.lazy="msg"/>
        <p>{{msg}}</p>
        .number 转数字<br>
        <input type="number" v-model.number="count"/>
        <p>{{count}}</p>
        .trim 去首尾空格<br>
        <input type="text" v-model="msg2"/>
        <p>{{msg2}}</p>
    </div>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                name: '赵六',
                msg2: '',
                content: '新闻内容...',
                msg: '',
                count: 0,
                textMsg: '',
                checked: true,
                names: [],
                sex: '',
                gender: 'woman',
                area: '',
                areas: [],
                hobbies: ['basketball'],
                book: 'Java编程思想',
                selectBooks: [
                    {text: 'Java编程思想'},
                    {text: 'C++ Primer'}
                ],
                depts: ['personnelDept'],
                selectDepts: [
                    {text: '人事部', value: 'personnelDept'},
                    {text: '财政部', value: 'ministryOfFinance'}
                ]
            }
        }
    })
</script>
</html>
```

### 组件示例及复用

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>组件基本示例</title>
    <style scoped>
        @import "../css/common.css";
    </style>
</head>
<body>

<div id="app">
    <h3>组件基本示例</h3>
    <component-demo></component-demo>
    <br/>
    组件除了没有el属性外，其他属性及方法跟Vue属性一样

    <h3>组件的复用</h3>
    <component-demo></component-demo>
    <br>
    <component-demo></component-demo>
    <br>
    每使用一次组件都会创建一个组件实例，每个实例维护着自己的数据
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    Vue.component('component-demo', {
        data: function () { //组件的data必须是一个函数
            return {
                count: 0
            }
        },
        template: '<button @click="count++">点击按钮{{count}}次</button>'
    });
    var vm = new Vue({
        el: '#app'
    })
</script>
</html>
```

### 组件通过 Prop 向子组件传递数据

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>通过 Prop 向子组件传递数据</title>
    <style scoped>
        @import "../css/common.css";
    </style>
</head>
<body>
<div id="app">

    <div class="xxx">
        <test-comp-attr title="测试组件属性1"></test-comp-attr>
        <test-comp-attr title="测试组件属性2"></test-comp-attr>

        <!--    使用data中的数据    -->
        <test-comp-attr
                v-for="blog in blogs"
                :key="blog.id"
                :title="blog.title"
        >
        </test-comp-attr>
    </div>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>

    Vue.component('test-comp-attr', {
        props: ['title'],
        template: '<h3>{{ title }}</h3>'
    })

    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                blogs: [
                    {id: 1, title: '博客标题1'},
                    {id: 2, title: '博客标题2'},
                    {id: 3, title: '博客标题3'}
                ]
            }
        }
    })
</script>
</html>
```

### 组件单个根元素

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>单个根元素</title>
    <style scoped>
        @import "../css/common.css";
    </style>
</head>
<body>
<div id="app">

    <div class="xxx">
        <test-comp-attr
                v-for="blog in blogs"
                :blog="blog"
        >
        </test-comp-attr>
    </div>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>
    Vue.component('test-comp-attr', {
        props: ['blog'],
        template: '<div class="blog-post">\n' +
            '    <h3>{{blog.title}}</h3>\n' +
            '    <div v-html="blog.content"></div>\n' +
            '</div>'
    })

    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                blogs: [
                    {id: 1, title: '博客标题1', content: '<p>测试内容..</p>'},
                    {id: 2, title: '博客标题2', content: '<p>测试内容2..</p>'},
                    {id: 3, title: '博客标题3', content: '<p>测试内容3..</p>'}
                ]
            }
        }
    })
</script>
</html>
```

### 监听子组件事件

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>监听子组件事件</title>
    <style scoped>
        @import "../css/common.css";
    </style>
</head>
<body>
<div id="app">

    <!--    <div class="xxx">
            <p>测试监听子组件事件</p>
            <div :style="{fontSize:postFontSize + 'em'}">
                <test-comp-monitor
                        v-for="blog in blogs"
                        :blog="blog"
                        @enlarge-font="postFontSize+=0.1"
                >
                </test-comp-monitor>
            </div>
        </div>-->

    <!--  <div class="xxx">
          <p>使用事件抛出一个值</p>
          <div :style="{fontSize:postFontSize + 'em'}">
              <test-comp-throw-value
                      v-for="blog in blogs"
                      :blog="blog"
                      @enlarge-font="postFontSize+=$event"
              >
              </test-comp-throw-value>
          </div>
      </div>-->

    <!--<div class="xxx">
        <p>使用使用方法接收事件抛出的一个值</p>
        <div :style="{fontSize:postFontSize + 'em'}">
            <test-comp-throw-value
                    v-for="blog in blogs"
                    :blog="blog"
                    @enlarge-font="boldFont"
            >
            </test-comp-throw-value>
        </div>
    </div>-->

    <div class="xxx">
        <p>组件上使用v-model</p>
        <test-comp-use-model
                v-model="searchText"
        ></test-comp-use-model>
    </div>
</div>
<!--<div>
    <h3>{{blog.title}}</h3>
    <div v-html="blog.content"></div>
    <button @click="$emit('enlarge-font')">放大字体</button>
</div>-->
<!--<input :value="value" @input="$emit(input,$event.target.value)">-->
</body>
<script src="../lib/vue.js"></script>
<script>

    // Vue.component('test-comp-monitor', {
    //     props: ['blog'],
    //     template: '<div>\n' +
    //         '    <h3>{{blog.title}}</h3>\n' +
    //         '    <div v-html="blog.content"></div>\n' +
    //         '    <button @click="$emit(\'enlarge-font\')">放大字体</button>\n' +
    //         '</div>'
    // })

    // Vue.component('test-comp-throw-value', {
    //     props: ['blog'],
    //     template: '<div>\n' +
    //         '    <h3>{{blog.title}}</h3>\n' +
    //         '    <div v-html="blog.content"></div>\n' +
    //         '    <button @click="$emit(\'enlarge-font\',0.1)">放大字体</button>\n' +
    //         '</div>'
    // })
    Vue.component('test-comp-use-model', {
        props: ['value'],
        template: '<input v-bind:value="value" v-on:input="$emit(\'input\',$event.target.value)">'
    })

    var vm = new Vue({
        el: '#app',
        data: function () {
            return {
                blogs: [
                    {id: 1, title: '博客标题1', content: '<p>测试内容..</p>'},
                    {id: 2, title: '博客标题2', content: '<p>测试内容2..</p>'},
                    {id: 3, title: '博客标题3', content: '<p>测试内容3..</p>'}
                ],
                postFontSize: 1,
                searchText: ''
            }
        },
        methods: {
            boldFont: function (increase) {
                this.postFontSize += increase;
            }
        }
    })
</script>
</html>
```

### 组件-插槽

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>使用插槽</title>
    <style scoped>
        @import "../css/common.css";
    </style>
</head>
<body>
<div id="app">

    <div class="xxx">
        <!--    使用插槽    -->
        <use-slot>I am sorry!</use-slot>
    </div>
</div>

</body>
<script src="../lib/vue.js"></script>
<script>

    Vue.component('use-slot', {
        template: '<div>\n' +
            '    <strong>Error!</strong>\n' +
            '    <slot></slot>\n' +
            '</div>'
    })
    var vm = new Vue({
        el: '#app',
        data: function () {
            return {}
        }
    })
</script>
</html>
```











































































