import React, {Component} from "react"
import {Route, Routes} from "react-router-dom"
import JSLeftBar from "../../Pages/JSLeftBar"
import IntroductionLeftBar from "../../Pages/IntroductionLeftBar"
import HCLeftBar from "../../Pages/HCLeftBar"
import DSALeftBar from "../../Pages/DSALeftBar"
import ReactLeftBar from "../../Pages/ReactLeftBar"
import InterLeftBar from "../../Pages/InterLeftBar"
import TSLeftBar from "../../Pages/TSLeftBar"
import MySQLLeftBar from "../../Pages/MySQLLeftBar"
import WebpackLeftBar from "../../Pages/WebpackLeftBar"
import ComputerNetworkLeftBar from '../../Pages/ComputerNetworkLeftBar'
import './index.css'

export default class ContentLeftBar extends Component {
    render() {
        return (
            <div className="ContentLeftBar">
                <Routes>
                    <Route index element={<IntroductionLeftBar/>}/>
                    <Route path="/introduction/*" element={<IntroductionLeftBar/>}/>
                    <Route path="/javascript/*" element={<JSLeftBar/>}/>
                    <Route path="/htmlcss/*" element={<HCLeftBar/>}/>
                    <Route path="/webpack/*" element={<WebpackLeftBar/>}/>
                    <Route path="/data-structure&algorithm/*" element={<DSALeftBar/>}/>
                    <Route path="/react/*" element={<ReactLeftBar/>}/>
                    <Route path="/dva/*" element={<ReactLeftBar/>}/>
                    <Route path="/interview/*" element={<InterLeftBar/>}/>
                    <Route path="/typescript/*" element={<TSLeftBar/>}/>
                    <Route path="/mysql/*" element={<MySQLLeftBar/>}/>
                    <Route path="/computer-network/*" element={<ComputerNetworkLeftBar/>}/>
                </Routes>
            </div>
        )
    }
}