> 注意！！该笔记为 React-Router v6 之前的笔记，v6 许多地方没有很好实现向下兼容。之后会重新写一份 v6 的笔记。

# 相关理解

## SPA 的理解

+ 单页面 Web 应用（ Single Page Applicarion ）
+ 整个页面只有一个完整的页面
+ 点击页面中的链接不会刷新页面，只会做页面的局部更新。
+ 数据都需要通过 ajax 请求获取，并在前端异步展现。

## 路由的理解

### 什么是路由

+ 一个路由就是一个映射关系
+  key 为路径， value 可能是 function 或者 component 

### 路由的分类

+ 后端路由
  + 理解： value 是 function ，用来处理客户端提交的请求。
  + 注册路由： router.get(path, function(req, res)) 
  + 工作过程：当 node 接收到一个请求时，根据请求路径找到匹配的路由，调用路由中的函数来处理请求，返回响应数据。
+ 前端路由
  + 理解： value 是 component ，用于展示页面内容。
  + 注册路由： <Route path="..." component={...}> 
  + 工作过程：当浏览器的 path 变为 ... 时，当前路由组件就会变为 Test 组件。

## react-router-dom 的理解

+  react 的一个插件库。
+ 专门用来实现一个 SPA 应用。
+ 基于 react 的项目基本都会用到此库。

# react-router-dom 相关 API

> 记得 import 导入对应标签

## 路由的基本使用

### 编写路由链接

想要实现链接跳转可以用 <Link> 标签，其中 to 属性指向的即为路径（主要不要写为相对路径的写法，直接写 /... 即可），其余相关用法与原本的锚点标签 <a> 相同。

> 但是要注意， Link 标签外部需要包裹一个 BrowserRouter 标签。

### 注册路由

我们使用 Route 标签注册路由。

 <Route> 标签接收两个属性：

+  path 属性，表示当 path 为...时，渲染后面属性对应的组件。
+  component 属性（注意开头字母小写），表示渲染对应的组件。（注意，属性接收的参数是 jsx 格式，用大括号；只需要写对应组件的名称，并不是组件标签的写法）

> 同样，使用 Route 标签需要在外部包裹一个 BrowserRouter 标签。

###  <BrowserRouter> 

尽管编写路由链接和注册路由对应的标签 <Link> 和 <Route> 都需要在外部包裹一个 BrowserRouter 标签，但是不能分别包裹，不然会造成路由失效。

其中的一个解决办法是，我们在渲染整个的大外壳组件 App 时，就直接将它包裹在 BrowserRouter 标签内：

```jsx
ReactDOM.render(
<BrowserRouter>
	<App/>
</BrowserRouter>,
document.getElementById('root')
)
```

### 总结

+ 明确好界面中的导航区、展示区
+ 导航区的 a 标签改为 Link 标签：

```jsx
<Link to='/xxx'>Demo</Link>
```

+ 展示区的 Route 标签进行路径匹配

```jsx
<Route path='/xxx' component={Demo}/>
```

+  <App> 最外侧包裹 <BrowserRouter> 或者 <HashRouter> 

## 路由组件与一般组件

概念的区别：

由用户自己创建的组件叫做一般组件；由路由创建的组件叫做路由组件。

> 规范上来说，路由组件不应该放在 ./components 路径下，而应该放在 ./pages 路径下。

路由组件与一般组件的另外一个区别是：由于路由组件不是由用户自己创建，因此用户无法自己向路由组件传递 props 属性，但是路由组件会收到路由器传递的 props 属性。其中最重要的三个 props 属性分别是： history 、 location 、 match 。

##  <NavLink> 

### 一般的区别

如果原本的样式设置上有高亮效果，直接使用 <Link> 标签无效，应该使用 <NavLink> 标签。

更一般的， <NavLink> 可以接收一个参数 activeClassName ，用来表示当该链接被点击时追加类。

### 封装 NavLink 标签

封装自己的 NavLink 标签的意义在于，当有多个路由链接对应不同组件时，如果使用多个 NavLink 标签，会造成代码的大量冗长重复。而我们自己封装 NavLink 标签，可以只需要指定 NavLink 标签的不同之处。

``` jsx
import React, { Component } from 'react'
import {NavLink} from 'react-router-dom'
export default class MyNavLink extends Component {
    render() {
        return (
            <NavLink activeClassName="active" className="list-group-item" {...this.props}}/>
        )
    }
}
```

## Switch 

在上面的笔记中，我们把路由称作为键值对。那么一般情况下， 一个键只能匹配唯一一个值。

但是在 NavLink 中，相同的 path 可能会同时渲染多个 component 。而事实上，渲染匹配的顺序是，无论当前 path 是否匹配成功，都会继续向下枚举。

这样就导致了两点问题：

+ 单个键对应多个值。
+ 匹配成功后依然向下匹配导致了效率上的问题。

此时，就可以使用 switch 来解决这个问题。

我们在所有的 Link 标签和 NavLink 标签外部包裹一个 Switch 标签，就可以解决这个问题。

## 模糊匹配与严格匹配

模糊匹配含义略，结合目录关系来理解。

如果要设置路径严格匹配，可以在 NavLink 标签内添加属性 exact={true} 或者 exact 

> 严格匹配不要随便开启，需要的时候再开，有的时候开启严格匹配导致无法继续匹配二级路由。

## Redirect 

当没有路径匹配上时，可以使用 Redirect 标签进行重定向。

将 Redirect 放在 Switch 中所有 Route 的最后面，接受一个参数 to ，表示重定向指向的链接。

## 嵌套路由

注意层次关系，然后该怎么写就怎么写就行。

注意，不要开启严格匹配。

## 三大参数

### params 

路由链接携带参数：

```jsx
<Link to='/demo/tom/18'>详情</Link>
```

> 可以使用模板字符串来携带对应的参数

注册路由中声明接收参数：

```jsx
<Route path='demo/tom/:age' component={tom}/>
```

接收参数：

```jsx
const {age} = this.props.match.params
```

### search 

路由链接携带参数：

```jsx
<Link to='/demo?name=tom&age=18'>详情</Link>
```

正常注册路由：

```jsx
<Route path='/demo' component={Demo}/>
```

接收参数：

```jsx
const {search} = this.props.location
```

 qs 解析：

```jsx
import qs from 'querystring'
const {name, age} = qs.parse(search.slice(1))
```

### state 

路由链接携带参数：

```jsx
<Link to={{path:'/demo', state={name:'tom', age:18}}}>详情</Link>
```

正常注册路由：

```jsx
<Route path='/demo' component={Tom}/>
```

接收参数：

```jsx
const {name, age} = this.props.location.state 
```

## push 与 replace 模式

push 模式下可以跳转到上一个路由情况， replace 模式下无法跳转。

### 编程式路由导航

借助 history 属性中的方法进行跳转、前进、后退：

+  this.props.history.push() 
+  this.props.history.replace() 
+  this.props.history.goBack() 
+  this.props.history.goForward() 
+  this.props.history.go() 

## withRouter 

 withRouter 方法可以加工一般组件，让一般组件具备路由组件所特有的 API ，返回一个新组件，使用如下：

```jsx
class Demo extends React.Component {
    render() {
        return ...
    }
}
export default withRouter(Demo)
```

## BrowserRouter 和 HashRouter 的区别

+ 底层原理不一样
  +  BrowserRouter 使用的是 H5 的 history API 。
  +  HashRouter 使用的是 URL 的哈希值。
+  path 表现形式不一样
  +  BrowserRouter 的路径中没有 # 
  +  HashRouter 的路径包含 # 
+ 刷新后对路由 state 参数的影响
  +  BrowserRouter 没有任何影响，因为 state 保存在 history 对象中。
  +  HashRouter 刷新后会导致路由 state 参数的丢失。
+  HashRouter 可以用于解决一些路径错误相关的问题。

# 解决多级路径刷新页面样式丢失

三个解决办法：

+  public/index.html 中引入样式的时候不写 ./ 写 / （常用）。
+  public/index.html 中引入样式的时候不写 ./ 写 %PUBLIC_URL% （常用）。

> 这种方式只能在 react 中使用。

+ 使用 HashRouter 

