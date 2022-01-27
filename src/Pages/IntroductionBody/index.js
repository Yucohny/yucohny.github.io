import React, { Component } from "react"
import ReactMarkdown from "react-markdown"
import markdown from '../../note/README.md'

export default class IntroductionBody extends Component {
    render() {
        return (
            <ReactMarkdown children={markdown}></ReactMarkdown>
        )
    }
}