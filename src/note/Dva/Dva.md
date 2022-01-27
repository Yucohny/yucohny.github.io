# 介绍

官网的描述如下：

Dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，Dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

# 快速上手

## 安装 dva-cli

```shell
npm install dva-cli -g
```

## 创建新应用

```shell
dva new dvastudy
```

该命令会创建 dvastudy 目录，包含项目初始化目录和文件，并且提供开发服务器、构建脚本、数据 mock 服务、代理服务器等功能。

然后我们进入该文件夹，并且启动开发服务器：

```shell
cd dvastudy
npm start
```

打开服务器后，我们在本地 8000 端口就可以查看界面了。

## 使用 antd

安装命令如下：

```shell
npm install antd babel-plugin-import --save
```

然后编辑 .webpackrc，使 babel-plugin-import 该插件生效：

```json
{
  "extraBabelPlugins": [
    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
  ]
}
```

## 定义路由

我们以现实产品列表为例进行介绍。

首先我们需要创建路由：

routes/Products.js：

```react
import React, { Component } from "react";

export default class Products extends Component {
    render() {
        return <h2>List of Product</h2>
    }
}
```

然后编辑 router.js：

```react
import React from 'react';
import {Router, Route, Switch} from 'dva/router';
import IndexPage from './routes/IndexPage';
import Products from './routes/Products';

function RouterConfig({history}) {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/products" exact component={Products}/>
      </Switch>
    </Router>
  );
}


export default RouterConfig;
```

此时我们在浏览器打开 http://localhost:8000/#/products，便可以看到我们前面定义的 Products 组件了。

