import React, {Component} from "react"
import {Route} from "react-router-dom"
import MyMarkdown from "../../Components/MyMarkdown";
import readme from '../../note/JavaScript/README.md'
import inhtml from '../../note/JavaScript/1-HTML中的JavaScript.md'
import datatype from '../../note/JavaScript/2-数据类型与操作符与语句.md'

export default class JSBody extends Component {
    render() {
        return (
            <Route path="/javascript">
                <Route index element={<MyMarkdown children={readme}/>}/>
                <Route path="/javascript/inhtml" element={<MyMarkdown children={inhtml}/>}/>
                <Route path="/javascript/datatype" element={<MyMarkdown children={datatype}/>}/>
            </Route>
        )
    }
}