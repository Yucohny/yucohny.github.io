import React, { Component } from "react"

// eslint-disable-next-line
String.prototype.trim = function() {
    return this.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

export default class MyMarkdownTitle extends Component {
    render() {
        let {markdown} = this.props
        // console.log(1, markdown)
        markdown = markdown.replace(/\r/g, '')
        // console.log(2, markdown)
        const lines = markdown.split(/\n/g)
        for (let i = 0; i < lines.length; ++i) {
            lines[i] = lines[i].trim()
        }
        const title = []
        for (let i = 0; i < lines.length; ++i) {
            if (lines[i][0] !== '#') {
                continue
            }
            console.log(i, lines[i])
            for (let j = 1; j < lines[i].length; ++j) {
                if (lines[i][j] !== '#') {
                    // title.push(j)
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
            <>
                {
                    title.map(item => {
                        if (item[0] === 1) {
                            return <div>
                                •&nbsp;&nbsp;{item[1]}
                            </div>
                        } else if (item[0] === 2) {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;○&nbsp;&nbsp;{item[1]}
                            </div>
                        } else if (item[0] === 3) {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;■&nbsp;&nbsp;{item[1]}
                            </div>
                        } else if (item[0] === 4) {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;□&nbsp;&nbsp;{item[1]}
                            </div>
                        } else if (item[0] === 5) {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◆&nbsp;&nbsp;{item[1]}
                            </div>
                        } else {
                            return <div>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;◇&nbsp;&nbsp;{item[1]}
                            </div>
                        }
                    })
                }
            </>
        )
    }
}