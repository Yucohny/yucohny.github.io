import React, {Component} from "react"
import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import {prism} from 'react-syntax-highlighter/dist/esm/styles/prism'
import remarkGfm from "remark-gfm"
import remarkMath from 'remark-math'
import remarkCodeBlocks from 'remark-code-blocks'
import rehypeKatex from 'rehype-katex'
import './index.css'

export default class MyMarkdown extends Component {
    render() {
        const {children} = this.props
        return (
            <ReactMarkdown children={children}
                           remarkPlugins={[remarkMath, remarkGfm, remarkCodeBlocks]}
                           rehypePlugins={[rehypeKatex]}
                           components={{
                               a({node, children}) {
                                   return children[0].type === undefined ? (
                                       <a className="a-class" href={node.properties.href}>{children}</a>
                                   ) : (
                                       <a href={node.properties.href}>{children}</a>
                                   )
                               },
                               blockquote({node, children}) {
                                   return (
                                       <blockquote className="blockquote-class">{children}</blockquote>
                                   )
                               },
                               code({node, inline, className, children, ...props}) {
                                   const match = /language-(\w+)/.exec(className || '')
                                   return !inline && match ? (
                                       <SyntaxHighlighter
                                           children={String(children).replace(/\n$/, '')}
                                           style={prism}
                                           language={match[1]}
                                           PreTag="div"
                                           {...props}
                                       />
                                   ) : (
                                       <code className="code-class" {...props}>
                                           {children}
                                       </code>
                                   )
                               }
                           }}/>
        )
    }
}