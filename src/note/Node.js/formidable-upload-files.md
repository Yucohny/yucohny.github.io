此篇笔记用于记录如何将文件从客户端上传到服务端。

# 建立表单

```html
<body>
    <form class="upload" action="post" enctype="multipart/form-data" method="post">
        <div>
            请选择一个文件
            <input type="file" name="wenjian">
        </div>
        <br>
        <div style="margin: 0 auto;">
            <input type="submit" value="提交">
        </div>
    </form>
</body>
```

效果图如下：

![img-18](./img/18.png)



# 建立服务器通道

```js
let http = require('http')
let url = require('url')
let fs = require('fs')

http
    .createServer(function onRequest (req, res) {
        let pathname = url.parse(req.url).pathname;
        if (pathname == '/') {
            fs.readFile('./public/index.html', function (error, data) {
                if (error) {
                    return res.end("Failed to read the file")
                }
                res.end(data);
            })
        } else if(pathname == '/post'){
            
        }
    })
    .listen(3000, function () {
        console.log('running...')
    })
```

已经将首页渲染至服务端，现在的问题依然是如何将上传的文件保存下来。

参见`formidable.md`笔记文件，我们可以使用`parse()`方法将上传的文件数据转换保存下来。

首先我们在`app.js`文件目录下新建文件夹`./uploads`，并修改`formidable`对象属性为：

```js
let formidable = require('./node_modules/formidable')
let form = new formidable.IncomingForm();
form.uploadDir = './uploads/';
```

随后执行`form.parse()`方法，在回调函数参数`files`中存有文件数据，将数据保存至`uploadDir`目录后文件名连同扩展名统一修改为`upload+hash`编码保存文件。此时的文件（1）并不是我们原本的文件名（2）并未生成扩展名。因此我们还需要人为修改相关信息。

修改文件信息可以使用`fs`模块的`rename`方法，但是注意不要望文生义，`rename`方法确实是重命名的方法，但是接受的参数是新地址与旧地址，并不是文件位置与新文件名。

## 完整程序与目录见`formidable-upload-files`目录

