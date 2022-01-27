# `load()`方法

`load()`方法从服务器加载数据，并把返回的数据放入被选元素中。

语法如下：

```js
$(selector).load(URL, data, callback)
```

+ `URL`：必填，是希望加载的`URL`
+ `data`：可选，是希望与请求一同发送给的查询字符串键值对的集合
+ `callback`：可选，`load()`方法完成后的回调函数

示例如下：

```js
$('#div1').load('test.txt')
```

`URL`参数中也可以添加`jQuery`选择器，如下面的例子是把`test.txt`文件中`id=p1`的元素的内容加载到指定的`div`元素中：

```js
$('#div1').load('test.txt #p1')
```

回调函数`callback`中可以接收三个参数：

+ `responseTxt`：调用成功时的结果内容
+ `statusTxt`：调用的状态，只有`success`和`error`两个值（字符串）
+ `xhr`：包含的`XMLHttpRequest`对象



# `get`方法

`$.get()`方法通过`HTTP GET`请求从服务器上请求数据。

示例如下：

```js
$.get(URL, callback)
```

+ `URL`：必填，是希望加载的`URL`
+ `callback`：可选，**请求成功后**的回调函数

> 注意是请求成功后的回调函数，不是`get()`方法执行完后的回调函数

回调函数的第一个参数存储被请求页面的内容，第二个参数存储有请求时的状态。



# `post`方法

`$.post()`方法通过`HTTP POST`请求从服务器上请求数据。

示例如下：

```js
$.post(URL, data, callback)
```

+ `URL`：必填，是希望加载的`URL`
+ `data`：可选，是希望连同请求一起发送的数据
+ `callback`：可选，**请求成功后**的回调函数

回调函数的第一个参数存储被请求页面的内容，第二个参数存储有请求时的状态。

