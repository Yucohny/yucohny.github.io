优化什么？

+ 开发环境性能优化
  + 优化打包构建速度
  + 优化代码调试
+ 生产环境性能优化
  + 优化打包构建速度
  + 优化代码运行的性能

# HMR

原本存在的一些问题：

+ 只是修改了其中的一个模块，但是所有的模块都会被重新打包

hot module replacement 热模块替换

作用：一个模块发生变化，只会重新打包这一个模块，而不是打包所有模块，极大提升了构建速度

开启 HMR 功能只需要在 devServer 属性中添加 hot: true 即可：

```js
devServer: {
    static: {
        directory: path.join(__dirname, 'build')
    },
    compress: true,
        port: 3000,
        open: true,
        hot: true
}
```

但是不同的模块资源对 HMR 的适应性不同：

+ 样式文件
  + 可以使用 HMR 功能，因为 style-loader 内部实现了
+ js 文件
  + 默认不能使用 HMR 功能
+ html 文件
  + 默认不能使用 HMR 功能，同时会导致 html 资源无法进行热更新
  + 解决方案：将 index.html 也作为入口文件加入 entry

由于只有一个 html 文件，因此我们不需要对 html 文件实现 HMR功能；而要对 js 文件实现 HMR 功能，就需要修改 js 代码，添加支持 HMR 的代码。

在 index.js 中添加以下内容，即可监听 demo.js 文件的变化，一旦发生变化，其他模块不会重新打包构建，只会重新打包该资源，并执行后面的回调函数：

```js
if (module.hot) {
    module.hot.accept('./demo.js', function () {
        console.log('repacked...')
    })
}
```

> 注意：HMR 功能对 js 的处理，只能处理非入口的 js 资源。而如果修改了入口文件的 js 资源，则需要重新启动项目。

# source-map

source-map 是一种提供源代码到构建后代码映射的技术。如果构建后代码出错，则可以通过映射关系追踪到源代码何处出错。

在 webpack.config.js 中加入配置 devtool: 'source-map'

相关参数选项：

\[inline-|hidden-|eval|][noresources-]\[cheap-[module-]]source-map

+ source-map
  + 错误代码准确信息 和 源代码的错误位置

+ inline-source-map
  + 内联，只生成一个内联 source-map
  + 错误代码准确信息 和 源代码的错误位置
+ hidden-source-map
  + 外部
  + 错误代码错误原因，但是没有错误位置
  + 不能追踪源代码错误，只能提示到构建后代码的错误位置
+ eval-source-map
  + 内联，每一个文件都生成对应的 source-map，都在 eval
  + 错误代码准确信息 和 源代码的错误位置

> 内联和外部的区别：
>
> + 外部生成了文件，内联没有
> + 内联构建速度更快

+ noresources-source-map
  + 外部
  + 错误代码准确信息, 但是没有任何源代码信息
+ cheap-source-map
  + 外部
  + 错误代码准确信息 和 源代码的错误位置 
  + 只能精确的行
+ cheap-module-source-map
  + 外部
  + 错误代码准确信息 和 源代码的错误位置 
  + module 会将 loader 的 source map 加入

> 对比：![img-24](./img/24.png)

# oneOf

在 rules 中设置 oneOf 对象，值为数组，数组中的 loader 只会配置一个，不能有两个配置处理同一个文件。

# 缓存

## babel 缓存

只需要在 js 的配置 options 中添加属性：cacheDirectory: true 即可：

```js
module.exports = {
    module: {
        rules: [
            {
                //JS兼容
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    presets: [ ... ],
                    cacheDirectory: true
                }
            }
        ]
    }
}
```

加入该属性后，开始第二次构建时，就会读取之前的缓存。

## 文件资源缓存

+ hash 值修改
  + 每次打包构建时，都会生成唯一的一个 hash 值。
  + 问题：由于 js 和 css 使用的是同一个 hash 值，如果重新打包，会导致所有缓存失效（但是其实只改动了一个文件）。
+ chunkhash 值修改
  + 根据 chunk 生成的 hash 值。如果打包来源于同一个 chunk，那么 hash 值就一样。
  + 问题：js 和 css 的 hash 值还是一样的，因为 css 是在 js 中被引入的，所以同属于一个 chunk。
+ contenthash
  + 根据文件的内容生成 hash 值，不同文件的 hash 值一定不一样

# tree shaking

tree shaking 的作用是去除无用代码。

前提：

1. 必须使用 ES6 模块化
2. 开启 production 环境

作用：减小代码体积

如果在 package.json 中配置 "sideEffects": false 则可能会把 css / @babel/polyfill 文件去除；可以这样配置： "sideEffects": ["*.css", "\*.less"]

