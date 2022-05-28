# \<script>元素

HTML 中的 `<script>` 标签包含下列 8 个属性：

+ `async`
+ `charset`
+ `crossorigin`
+ `defer`
+ `integrity`
+ `language`
+ `src`
+ `type`

这 8 个属性每一个都是可选的（全部省略显然就是嵌入行内 JS 代码）。在此处我们注重关注一下 `async` 和 `defer` 属性。

如果上面两个属性都不包括，那么此时的 `script` 标签将会阻碍 HTML 的解析，只有下载成功并执行完脚本，才会继续解析 HTML。

包含 `async` 属性表示异步下载，即在解析 HTML 的过程中进行脚本的异步下载，下载成功后立刻执行（仍然可能阻断 HTML 的解析）。

包含 `defer` 属性同样是在解析 HTML 的过程中进行脚本的异步下载，但是只有在 HTML 解析完成后才会顺序执行脚本。

在 `<script>` 元素中的代码被计算完成之前，页面的其余内容不会被加载，也不会被显示。

## 标签位置

如果把所有的 JavaScript 文件都放在 \<head> 当中，那么页面将在将所有 JS 代码下载、解析和解释完成后，才会开始渲染页面，这是因为页面在浏览器解析到\<body>的起始标签后才开始渲染。要想解决这个问题，我们只需要将 JS 的引用放在 \<body> 元素中的页面内容的后面。

## defer 属性推迟执行脚本

HTML 4.01 开始支持 defer 属性。

defer 属性使得脚本在执行的时候不会改变页面的结构。即脚本会被延迟到整个页面都解析完毕后再执行。因此设置 defer 属性后，会先下载 JS 代码，但是延迟执行。

HTML5 规范要求脚本应该按照它们出现的顺序执行，因此如果存在多个包含 defer 属性的外部脚本，推迟执行的脚本不一定会按照顺序执行或者在 DOMContentLoaded 事件之前执行。因此整个页面中，最好只包含一个含有 defer 属性的脚本。

## async 属性异步执行脚本

HTML5 开始支持 async 属性。

标记为 async 的脚本并不能保证能按照它们出现的次序执行。因此，重点在于多个指定了 async 脚本的（或许也与没有指定的有关）是否存在依赖关系。async 属性告诉浏览器不必等到脚本下载和执行完后再加载页面，同样也不必等到该异步脚本下载和执行后再加载其他脚本。因此，异步脚本不应该在加载期间修改 DOM。

defer 与 async 的区别是：defer 要等到整个页面在内存中正常渲染结束，才会执行；async 一旦下载完，渲染引擎就会中断渲染，执行这个脚本以后，再继续渲染。因此，defer 是“渲染完再执行”，async 是“下载完就执行”。

## 动态加载文件

\<script> 标签本质上也是 DOM 树中的一个节点，因此我们可以使用 DOM API，向 DOM 中动态添加 script 元素达到加载指定的脚本的目的：

```js
let script = document.createElement('script')
script.src = 'demo.js'
document.head.appendChild(script)
```

默认情况下，以这种方式创建的 \<script> 元素都是以异步方式加载的，因此相当于默认添加了 async 属性。不过这样执行可能会存在一个问题，因为不是所有的浏览器的 \<script> 标签都支持 async 属性。因此，如果要统一动态脚本的加载行为，我们可以人为指定为同步加载：

```js
let script = document.createElement('script')
script.src = 'demo.js'
script.async = false
document.head.appendChild(script)
```

# 行内代码与外部文件

通常认为最佳实践是尽可能将 JavaScript 代码放在外部文件中，有下列理由：

1. 可维护性。
2. 缓存问题。

> 浏览器会根据特定情况设置缓存所有外部链接的 JS 文件，这意味着如果两个页面都用到同一个文件，则该文件只需要下载一次。

3. 适应未来。

> 通过把 JS 放到外部文件中，就不必考虑 XHTML 的情况，因为包含外部 JS 文件的语法在 XHTML 和 HTML 中是一样的。

# \<noscript>元素

出现下面两种情况时，\<noscript> 标签内的内容将展示出来：

1. 浏览器本身不支持脚本。
2. 浏览器对脚本的支持被关闭。

注意，\<noscript> 标签可以包含除 \<script> 外的任何可以出现在 \<body> 中的 HTML 元素。
