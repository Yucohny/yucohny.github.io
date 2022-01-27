import React, {Component} from "react"
import {Route, Routes} from "react-router-dom";
// import IntroductionBody from "../../Pages/IntroductionBody"
import JSBody from "../../Pages/JSBody";
import './index.css'
import markdown from '../../note/README.md'
import ReactMarkdown from "react-markdown";

export default class ContentBody extends Component {
    render() {
        return (
            <div className="ContentBody">
                <Routes>
                    <Route path="/introduction" element={<ReactMarkdown children={markdown}/>}/>
                    {/*<Route path="/introduction" element={<IntroductionBody/>}/>*/}
                    <Route path="/javascript" element={<JSBody/>}/>
                </Routes>
            </div>
        )
    }
}