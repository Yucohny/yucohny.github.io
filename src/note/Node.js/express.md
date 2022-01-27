在`node`中有许多`web`框架，`express`就是其中一个。

> expressjs.com

官网描述如下

![image-20210930093207686](C:\Users\Yucohny\AppData\Roaming\Typora\typora-user-images\image-20210930093207686.png)



# 安装`express`

`npm i -S express`



# `Hello, world`

（1）创建服务器应用程序，相当于之前的`http.createServer`

```js
let express = require('express')
let app = express()
```

（2）当服务器收到`get`请求`/`时，执行回调

```js
app.get('/', function (req, res) {
    res.send('hello, world!')
})
```

（3）监听

```js
app.listen(3000, function () {
    console.log('running...')
})
```



# 基本路由

`get`

```js
//当以get方法请求/的时候，执行对应回调
app.get('/', function (req, res) {
	res.send('Hello, world')
})
```

`post`

```js
//当以post方法请求/的时候，执行对应回调
app.post('/', function (req, res) {
	res.send('Hello, world')
})
```





# 指定公开目录

`app.use('/public/', express.static('./public/'))`

当以`xxx`开头时，去`yyy`目录中寻找对应资源

`app.use('xxx', express.static('yyy'))`

比如`app.use('/a/', express.static('./public'))`，当以`/a`形式访问时，直接去`./public`中寻找资源



当省略第一个参数的时候，则可以通过省略`/public`的方式来访问静态资源，比如

`app.use(express.static('./public'))`

可以通过`/xxx`的方式访问`./public/xxx`中的静态资源

> 这样做可以帮助我们提高效率



# 配置使用`art-template`模板引擎

## 安装

```shell
npm install --save art-template
npm install --save express-art-template

npm WARN expressStudy@1.0.0 No description
npm WARN expressStudy@1.0.0 No repository field.

+ art-template@4.13.2
+ express-art-template@1.0.1
added 34 packages from 141 contributors and audited 84 packages in 4.474s
found 0 vulnerabilities
```



## 配置

第一个参数表示当以`.art`结尾的文件的时候，使用`art-template`模板引擎

`express-art-template`是专门用来在`express`中把`art-template`整合到`express`中

虽然此处我们不需要直接加载`art-template`，但是也必须安装，因为`express-art-template`依赖于`art-template`

```js
app.engine('art', require('express-art-template'))
```



## 使用

`express`为`response`响应对象提供了一个方法`render`，`render`方法默认不可用，但是如果配置了模板引擎就可以使用了。

`res.render('html模板名', {模板数据})`

注意：第一个参数不能写路径，默认会去项目中的`views`目录查找该模板文件，也就是说`express`有一个约定：开发人员把所有的视图文件都放到`views`目录中。

如果想要修改默认的`views`目录，可以使用`set`函数进行修改

```js
app.set('views', render中的默认路径)
```



