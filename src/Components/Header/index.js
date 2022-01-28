import React, {Component} from "react"
import MyNavLink from "../MyNavLink"
import './index.css'

export default class Header extends Component {
    render() {
        return (
            <div className="Header">
                <div className="HeaderItem"><MyNavLink to="/introduction" name="简介"/></div>
                <div className="HeaderItem"><MyNavLink to="/htmlcss" name="HTML/CSS"/></div>
                <div className="HeaderItem"><MyNavLink to="/javascript" name="JavaScript"/></div>
                <div className="HeaderItem"><MyNavLink to="/typescript" name="TypeScript"/></div>
                <div className="HeaderItem"><MyNavLink to="/react" name="React"/></div>
                <div className="HeaderItem"><MyNavLink to="/dvamock" name="Dva&Mock"/></div>
                {/*<div className="HeaderItem"><MyNavLink to="/nodejs" name="Node.js"/></div>*/}
                <div className="HeaderItem"><MyNavLink to="/webpack" name="Webpack"/></div>
                <div className="HeaderItem"><MyNavLink to="/data-structure&algorithm" name="数据结构与算法"/></div>
            </div>
        )
    }
}