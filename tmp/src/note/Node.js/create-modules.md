[TOC]

# 创建模块

模块既可以是一个文件，也可以是包含一个或多个文件的目录；如果模块是一个目录，`Node`通常会在这个目录下找一个叫`index.js`的文件作为模块入口（这个默认设置可以重写，如下）。

```json
{
	"main": "index.js"
}
```



典型的模块是一个包含`exports`对象属性定义的文件。

使用新模块要用到`Node`中的`require`函数，该函数以所用模块的路径为参数。`Node`以同步的方式寻找模块，定位到这个模块并加载文件中的内容。`Node`查找文件的顺序是先找核心模块，然后是当前目录，最后是`node_modules`。在`Node`定位到并计算好你的模块之后，`require`函数会返回这个模块中定义的`exports`对象中的内容，然后就可以用这个模块中的成员属性和方法了。

# 用`module.exports`微调模块的创建

如果只需要从模块中得到一个函数，那从`require`中返回一个函数的代码要比返回一个对象的代码更加优雅。

用`module.exports`代替`exports`可以对外提供单个变量、函数或者对象。

如果你创建了一个既有`exports`又有`module.exports`的模块，那它会返回`module.exports`，而`exports`会被忽略。



## 导出的究竟是什么

最终在程序里导出的是`module.exports`。`exports`只是对`module.exports`的一个全局引用，最初被定义为一个可以添加属性的空对象。如`exports.myFunc`只是对`module.exports.myFund`的简写。所以，如果把`exports`设定为别的，就打破了`module.exports`和`exports`之间的引用关系。



# 注意事项

`Node`能把模块作为对象缓存起来。如果程序中的两个文件引入了相同的模块，第一个`require`会把模块返回的数据保存在内存中，这样第二个`require`就不用再去访问和计算模块的源文件了。
