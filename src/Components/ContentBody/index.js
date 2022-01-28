import React, {Component} from "react"
import {Route, Routes} from "react-router-dom";
import MyMarkdown from "../MyMarkdown";
// import IntroductionBody from "../../Pages/IntroductionBody"
import JSBody from "../../Pages/JSBody";
import './index.css'
import markdown from '../../note/README.md'
import js_readme from '../../note/JavaScript/README.md'
import js_inhtml from '../../note/JavaScript/1-HTML中的JavaScript.md'
import js_datatype from '../../note/JavaScript/2-数据类型与操作符与语句.md'

export default class ContentBody extends Component {
    render() {
        return (
            <div className="ContentBody">
                <Routes>
                    <Route path="/" element={<MyMarkdown children={markdown}/>}/>
                    <Route path="/introduction" element={<MyMarkdown children={markdown}/>}/>
                    {/*<Route path="/introduction" element={<IntroductionBody/>}/>*/}
                    <Route path="/javascript">
                        <Route index element={<MyMarkdown children={js_readme}/>}/>
                        <Route path="/javascript/inhtml" element={<MyMarkdown children={js_inhtml}/>}/>
                        <Route path="/javascript/datatype" element={<MyMarkdown children={js_datatype}/>}/>
                    </Route>
                </Routes>
            </div>
        )
    }
}