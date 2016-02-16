# <a href="http://webpack.github.io/docs/">webpack</a>
## 安装
* 安装   
```npm install webpack  -g```   

* 配置默认环境   
```webpack —config webpack.custom.config.js```

##配置
```javascript
module.exports = {
    entry: [
        './assets/index.js'
    ],
    output: {
        path: __dirname + '/lib/',
        publicPath: "/lib/",
        filename: 'index.js'
    }
};
```
* entry为```业务入口```,通过入口,以此获取所有依赖
* path: 打包文件存放的绝对路径
* publicPath: 运行时的访问路径
* filename: 打包后的文件名

## 编译－－》loaders
使用react时,使用了jsx语法,直接webpack或报错,需要依赖加载html中加载JSXTransformer或通过jsx"编译",webpack中loaders专门用来处理类似文件 

package.json:```jsx-loader": "^0.12.2```    

```javascript
module.exports = {
    entry: [
        './assets/index.js'
    ],
    output: {
        path: __dirname + '/lib/',
        publicPath: "/lib/",
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loaders: ['jsx?harmony']
        }]
    }
};
```
LESS,TypeScript,JSX,CoffeeScript均可以通过类似方式进行处理

## 实时获取－－》webpack-dev-server
webpack依赖loader,编译的过程,使得脚本调试后需要重新执行一次webpack的命令,而实时更新则意味着对文件进行监控,当文件变更时就会进行一次webpack(仅为理论)

很显然,热部署依赖一个端口监控

package.json:```"webpack": "^1.5.1","webpack-dev-server": "1.6.4"```
 

app.js

```javascript
var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config');

new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(3000, 'localhost', function (err, result) {
  if (err) console.log(err);
  console.log('Listening at localhost:3000');
});
```
通过```http://localhost:3000/lib/index.js```即可```动态获取```

## 组件热部署－－》修改webpack配置
实时获取后依然需要刷新浏览器－－修改webpack配置可以使webpack监控端口上的信息,并以此刷新浏览器

```javascript
var webpack = require('webpack');
var path = __dirname;
module.exports = {
    entry: [
    	//浏览器中增加websocket
            'webpack-dev-server/client?http://localhost:3000',
            'webpack/hot/only-dev-server',
            './assets/index.js'
        ],
    output: {
        path: path + '/lib/',
        publicPath: "/lib/",
        filename: 'index.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            //或许是更新/监控部分?
            loaders: ['react-hot', 'jsx?harmony'],
            exclude: /node_modules/
        }]
    },
    plugins: [
    //替换功能
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
```
仅包括组件部分,entry下的文件依然需要刷新页面