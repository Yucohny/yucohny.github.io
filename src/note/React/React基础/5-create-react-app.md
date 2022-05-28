# 使用 create-react-app 创建 react 应用

## react 脚手架

+  react 脚手架用来帮助程序员快速创建一个基于 react 库的模板项目
  + 包含了所有需要的配置（语法检查、 jsx 编译、 devServer ）
  + 下载好了所有相关的依赖
  + 可以直接运行一个简单效果
+  react 提供了一个用于创建 react 项目的脚手架库： create-react-app 
+ 项目的整体技术架构为： react+webpack+es6+eslint 
+ 使用脚手架开发项目的特点是：模块化、组件化、工程化

## 创建项目并启动

+ 全局安装： npm install -g create-react-app 

+ 切换到想要创建项目的目录，使用命令： create-react-app xxx 

+ 进入项目文件夹 cd xxx 

+ 启动项目 npm start 

# 配置代理

> 为什么需要代理？解决跨域问题。
>
> 当你处于本地端口 3000 时想要获取端口 5000 的数据，会发现请求数据成功，但是数据无法从端口 5000 发送至端口 3000 ，因此就需要代理来解决这个问题。
>
> 而代理的本质时在发送端口 3000 处设置一个中间人进行数据请求：端口 3000 向端口 3000 的中间人请求数据，中间人向端口 5000 请求数据；端口 5000 向中间人发送数据，中间人向端口 3000 发送数据。

## 方法1

+ 在配置文件 package.json 中添加键值对：

  ```json
  {
      "proxy": "http://loaclhost:5000"
  }
  ```

+ 将请求的端口号由 5000 改为 3000 .

> 这种配置方法的含义是：先在端口号为 3000 的本地查找是否在 public 目录下存在我们所想要访问的数据，如果存在即返回，如果不存在则访问端口号 5000 对应的目录。
>
> 且这种方法只能配置一个代理。

## 方法2

在 src 目录下创建 setupProxy.js 文件：

```js
const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('/api1', {//遇见/api1前缀的请求时，就会触发该代理配置
            target: 'http://localhost:5000',//请求转发给谁
            changeOrigin: true,//控制服务器收到的请求头中Host的值
            pathRewrite: {'^/api1': ''}//重写请求路径，必填项
        }),
        proxy('/api2', {
            target: 'http://localhost:5001',
            changeOrigin: true,
            pathRewrire: {'^/api2': ''}
        })
    )
}
```

>  changeOrigin 设置为 true 时，服务器收到的请求头中的 host 为： localhost:5000 
>
>  changeOrigin 设置为 false 时，服务器收到的请求头中的 host 为： localhost:3000 
>
> 默认值为 false ，但是一般改为 true 

然后修改请求路径为 http://localhost:3000/api1/5000 即可访问。

> 此方法可以配置多个代理，可以灵活控制请求是否走代理；但是配置繁琐，前端请求资源时必须加前缀。
