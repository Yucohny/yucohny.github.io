let http = require('http')
let url = require('url')
let fs = require('fs')
let formidable = require('./node_modules/formidable')

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
            let form = new formidable.IncomingForm();
            form.uploadDir = './uploads/';
            form.parse(req, (err, fields, files) => {
                if (!files.wenjian) {
                    return;
                }
                if (!files.wenjian.name) {
                    return;
                }
                fs.rename(files.wenjian.path, form.uploadDir + files.wenjian.name, () => {
                    res.setHeader('Content-Type', 'text/html; charset=utf-8')
                    res.end('<h1>上传成功</h1>')
                })
            })
        }
    })
    .listen(3000, function () {
        console.log('running...')
    })