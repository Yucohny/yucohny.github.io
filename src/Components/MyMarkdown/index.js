import React, {Component} from "react"
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism'

export default class MyMarkdown extends Component {
    render() {
        const { children } = this.props
        return (
            <ReactMarkdown children={children}
                           components={{
                               code({node, inline, className, children, ...props}) {
                                   const match = /language-(\w+)/.exec(className || '')
                                   return !inline && match ? (
                                       <SyntaxHighlighter
                                           children={String(children).replace(/\n$/, '')}
                                           style={a11yDark}
                                           language={match[1]}
                                           PreTag="div"
                                           {...props}
                                       />
                                   ) : (
                                       <code className={className} {...props}>
                                           {children}
                                       </code>
                                   )
                               }
                           }}/>
        )
    }
}