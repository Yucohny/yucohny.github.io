import React, {Component} from "react"
import {Route, Routes} from "react-router-dom"
import JSLeftBar from "../../Pages/JSLeftBar"
import IntroductionLeftBar from "../../Pages/IntroductionLeftBar"
import HCLeftBar from "../../Pages/HCLeftBar"
import './index.css'

export default class ContentLeftBar extends Component {
    render() {
        return (
            <div className="ContentLeftBar">
                <Routes>
                    <Route path="/introduction/*" element={<IntroductionLeftBar/>}/>
                    <Route path="/javascript/*" element={<JSLeftBar/>}/>
                    <Route path="/htmlcss/*" element={<HCLeftBar/>}/>
                </Routes>
            </div>
        )
    }
}