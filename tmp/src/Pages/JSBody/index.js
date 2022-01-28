import React, { Component } from "react"
import ReactMarkdown from "react-markdown"
import {Route, Routes} from "react-router-dom"
import readme from '../../note/JavaScript/README.md'
import inhtml from '../../note/JavaScript/1-HTML中的JavaScript.md'
import datatype from '../../note/JavaScript/2-数据类型与操作符与语句.md'
import Demo from "../../Components/Demo";

export default class JSBody extends Component {
    myReactMarkdown = (children) => {
        return <ReactMarkdown children={children}/>
    }

    render() {
        console.log(inhtml)
        console.log(<ReactMarkdown children={inhtml}/>)
        return (
            <div>
                <ReactMarkdown children={readme}/>
                123
                <Routes>
                    <Route path="/javascript" element={<Demo/>}/>
                    <Route path="/javascript/inhtml" element={this.myReactMarkdown(inhtml)}/>
                    <Route path="/javascript/datatype" element={<ReactMarkdown children={datatype}/>}/>
                </Routes>
            </div>
        )
    }
}