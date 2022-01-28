# 压缩 js 代码

生产环境下会自动压缩 js 代码，因此我们只需要将 mode 修改为 'production' 即可，因为生产环境下会自动加载 UglifyJsPlugin 插件。

# 压缩 html 代码

在 plugins 中手动设置压缩对象：

```js
plugins: [
    new HtmlWebpackPlugin({
        template: "./src/index.html",
        minify: {
            collapseWhitespace: true,
            removeComments: true
        }
    })
],
```