var http = require('http'),
    fs = require('fs'),
    url = require('url')

http
    .createServer(function (req, res) {
        var parseObj = url.parse(req.url, true)
        var pathName = parseObj.pathname
        if (pathName === '/') {
            fs.readFile('./index.html', function (error, data) {
                if (error) {
                    return res.end('404 Not Found.')
                }
                res.end(data)
            })
        } else if (pathName === '/comment') {
            res.setHeader('Content-Type', 'text/html')
            res.write('<h1>Name: ' + parseObj.query.name + '</h1>')
            res.write('<h1>Message: ' + parseObj.query.message + '</h1>')
            console.log(parseObj.query)
            res.end()
        } else {
            res.end('404 Not Found.')
        }
    })
    .listen(8000, function () {
        console.log('running...')
    })