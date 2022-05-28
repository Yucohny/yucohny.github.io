import React, { Component } from "react"

// eslint-disable-next-line
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

export default class MyMarkdownTitle extends Component {
    render() {
        let {markdown} = this.props
        markdown = markdown.replace(/\r/g, '')
        const lines = markdown.split(/\n/g)
        for (let i = 0; i < lines.length; ++i) {
            lines[i] = lines[i].trim()
        }
        const title = []
        for (let i = 0; i < lines.length; ++i) {
            if (lines[i][0] !== '#') {
                continue
            }
            let index = 0
            while (lines[i][index] === '#') {
                ++index
            }
            if (lines[i][index] !== ' ') {
                continue
            }
            for (let j = 1; j < lines[i].length; ++j) {
                if (lines[i][j] !== '#') {
                    for (let k = j; k < lines[i].length; ++k) {
                        if (lines[i][k] !== ' ') {
                            title.push([j, lines[i].substr(k, lines[i].length)])
                            break
                        }
                    }
                    break
                }
            }
        }
        return (
            <div className="markdown-title">
                {
                    title.length === 0 ? '' : <b>目录</b>
                }
                {
                    title.map(item => {
                        if (item[0] === 1) {
                            return <div>
                                {item[1]}
                            </div>
                        } else if (item[0] === 2) {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                            </div>
                        } else if (item[0] === 3) {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                            </div>
                        } else if (item[0] === 4) {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                            </div>
                        } else if (item[0] === 5) {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                            </div>
                        } else {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{item[1]}
                            </div>
                        }
                    })
                }
            </div>
        )
    }
}