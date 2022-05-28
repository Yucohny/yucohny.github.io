import React, {Component} from "react"
import './index.css'
import {Route, Routes} from "react-router-dom";
import MyMarkdownTitle from "../MyMarkdownTitle";
import hc_readme from '../../note/CSS/README.md'
import js_readme from '../../note/JavaScript/README.md'
import r_readme from '../../note/React/README.md'
import dsa_readme from '../../note/数据结构与算法/README.md'
import ts_readme from '../../note/TypeScript/README.md'
import mysql_readme from '../../note/MySQL/README.md'
import wp_readme from '../../note/Webpack/README.md'
import cn_readme from '../../note/计算机网络/README.md'
import ImportContent from '../ImportContent'

const {css_data, js_data, ts_data, mysql_data, inter_data, webpack_data, react_data, dsa_data, computer_network_data} = ImportContent

export default class ContentRightBar extends Component {
    render() {
        return (
            <div className="ContentRightBar">
                <Routes>
                    <Route path="/htmlcss">
                        <Route index element={<MyMarkdownTitle markdown={hc_readme}/>}/>
                        {
                            css_data.map((item) => {
                                return <Route key={item[0] === undefined ? "1" : item[0]} path={"/htmlcss/" + item[0]} element={<MyMarkdownTitle markdown={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/javascript">
                        <Route index element={<MyMarkdownTitle markdown={js_readme}/>}/>
                        {
                            js_data.map((item) => {
                                return <Route key={item[0] === undefined ? "1" : item[0]} path={"/javascript/" + item[0]} element={<MyMarkdownTitle markdown={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/typescript">
                        <Route index element={<MyMarkdownTitle markdown={ts_readme}/>}/>
                        {
                            ts_data.map((item) => {
                                return <Route key={item[0] === undefined ? "1" : item[0]} path={"/typescript/" + item[0]} element={<MyMarkdownTitle markdown={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/webpack">
                        <Route index element={<MyMarkdownTitle markdown={wp_readme}/>}/>
                        {
                            webpack_data.map((item) => {
                                return <Route key={item[0] === undefined ? "1" : item[0]} path={"/webpack/" + item[0]} element={<MyMarkdownTitle markdown={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/react">
                        <Route index element={<MyMarkdownTitle markdown={r_readme}/>}/>
                        {
                            react_data.map((item) => {
                                return <Route key={item[0] === undefined ? "1" : item[0]} path={"/react/" + item[0]} element={<MyMarkdownTitle markdown={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/data-structure&algorithm">
                        <Route index element={<MyMarkdownTitle markdown={dsa_readme}/>}/>
                        {
                            dsa_data.map(item => {
                                return <Route key={item[0] === undefined ? "1" : item[0]} path={"/data-structure&algorithm/" + item[0]} element={<MyMarkdownTitle markdown={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/mysql">
                        <Route index element={<MyMarkdownTitle markdown={mysql_readme}/>}/>
                        {
                            mysql_data.map(item => {
                                return <Route key={item[0] === undefined ? "1" : item[0]} path={"/mysql/" + item[0]} element={<MyMarkdownTitle markdown={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/interview">
                        {/*<Route index element={<MyMarkdownTitle markdown={inter1}/>}/>*/}
                        {
                            inter_data.map(item => {
                                return <Route key={item[0] === undefined ? "1" : item[0]} path={"/interview/" + item[0]} element={<MyMarkdownTitle markdown={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/computer-network">
                        <Route index element={<MyMarkdownTitle markdown={cn_readme}/>}/>
                        {
                            computer_network_data.map(item => {
                                return <Route key={item[0] === undefined ? "1" : item[0]} path={"/computer-network/" + item[0]} element={<MyMarkdownTitle markdown={item[1]}/>}/>
                            })
                        }
                    </Route>
                </Routes>
            </div>
        )
    }
}