# `npm`

执行命令`npm install formidable`

```cmd
E:\前端资料\code\formidableStudy>npm install formidable
npm WARN saveError ENOENT: no such file or directory, open 'E:\前端资料\code\formidableStudy\package.json'
npm notice created a lockfile as package-lock.json. You should commit this file.
npm WARN enoent ENOENT: no such file or directory, open 'E:\前端资料\code\formidableStudy\package.json'
npm WARN formidableStudy No description
npm WARN formidableStudy No repository field.
npm WARN formidableStudy No README data
npm WARN formidableStudy No license field.

+ formidable@1.2.2
added 1 package and audited 1 package in 2.235s

1 package is looking for funding
  run `npm fund` for details

found 0 vulnerabilities
```

如果当前目录本身最开始并没有`package.json`文件，会先生成对应的`package.json`文件，然后在`./node_modules`解压下载好的第三方模块`formidable`压缩包。



# 创建实例对象并设置属性信息

## 创建对象

```js
var form = new formidable.IncomingForm()
```



## 设置属性信息

`encoding`，设置表单域的编码

`uploadDir`，设置上传文件所存放的文件夹，默认为系统的临时文件夹

`keepExtensions`，该属性为`true`可以使得上传的文件保持原来的文件扩展名

`maxFieldsSize`，限制所有存储表单字段域的大小（除去`file`字段），如果超出，会触发`error`事件，默认为`2M`

`maxFields`，设置可以转换多少查询字符串，默认为`1000`

`hash`，设置上传文件的校验码，可以有两个取值`sha1`或者`md5`

`multiples`，该属性为`true`时，当调用`parse()`方法时，回调函数的`files`参数将会是一个`file`数组，数组每一个成员是一个`File`对象，此功能需要`html5`中的`multiple`特性支持。

`bytesReceived`，返回服务器已经接受到当前表单数据多少字节

`bytesExpected`，返回将要接收到当前表单数据的大小



# `formidable.File`对象

该对象常用属性如下：

`size`，表示上传文件的大小，如果文件正在上传，表示已上传部分的大小

`path`，上传文件的路径。如果不想让`formidable`产生一个临时文件夹，可以在下面的`fileBegin`事件中修改路径

> `form.on('fileBegin', (name, file) => {})`

`name`，上传文件的名字

`type`，上传文件的`mime`类型

`lastModifiedDate`，时间对象，上传文件最近一次被修改的时间

`hash`，上传文件的哈希值

> 可以使用`JSON.stringify(file.toJSON())`来格式化输出文件的信息



# 其他方法

## `parse`

`form.parse(request, [callback])`该方法会转换请求中所包含的表单数据，`callback会包含所有的字段域和文件信息`，如：

```js
form.parse(req, function(err, fields, files) {
	//...
})
```

## `field`

每当一个字段/值对已经收到时会触发该事件。

```js
file.on('field', function(name, value) {
	//...
})
```

## `progress`

每当有数据块被处理之后会触发该事件，对于创建进度条非常有用。

```js
form.on('progress', function(bytesReceived, bytesExpected) {
	//...
})
```

## `file`

每当有一对字段/文件已经接收到，便会触发该事件。（与`field`区分）

```js
form.on('file', function () {
	//...
})
```

## `error`

当上传过程中出现错误便会触发该事件，当出现错误时，若想要继续触发`req`的`data`事件，则必须手动调用`req.resume()`方法

## `aborted`

当用户中止请求时会触发该事件，`socket`中的`timeout`和`close`事件会触发该事件，当该事件触发之后，`error`事件也会触发。

## `end`

当所有的请求已经接收到，并且所有的文件都已上传到服务器中，该事件会触发，此时可以发送请求到客户端。



