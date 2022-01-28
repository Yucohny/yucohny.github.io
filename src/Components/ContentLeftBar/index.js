import React, {Component} from "react"
import {Route, Routes} from "react-router-dom"
import JSLeftBar from "../../Pages/JSLeftBar"
import IntroductionLeftBar from "../../Pages/IntroductionLeftBar"
import HCLeftBar from "../../Pages/HCLeftBar"
import DSALeftBar from "../../Pages/DSALeftBar"
import ReactLeftBar from "../../Pages/ReactLeftBar"
import './index.css'

export default class ContentLeftBar extends Component {
    render() {
        return (
            <div className="ContentLeftBar">
                <Routes>
                    <Route path="/introduction/*" element={<IntroductionLeftBar/>}/>
                    <Route path="/javascript/*" element={<JSLeftBar/>}/>
                    <Route path="/htmlcss/*" element={<HCLeftBar/>}/>
                    <Route path="/data-structure&algorithm/*" element={<DSALeftBar/>}/>
                    <Route path="/react/*" element={<ReactLeftBar/>}/>
                </Routes>
            </div>
        )
    }
}