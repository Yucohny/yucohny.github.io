import React, {Component} from "react"
import MyNavLink from "../MyNavLink"
import { Menu } from 'antd';
import './index.css'
import 'antd/dist/antd.less'

const data = [
    ["/introduction", "简介"],
    ["/htmlcss", "HTML/CSS"],
    ["/javascript", "JavaScript"],
    ["/typescript", "TypeScript"],
    ["/react", "React"],
    ["/dvamock", "Dva&Mock"],
    ["/webpack", "Webpack"],
    ["/data-structure&algorithm", "数据结构与算法"]
]

export default class Header extends Component {
    render() {
        return (
            <div className="Header">
                <Menu mode="horizontal" inlineCollapsed={false}>
                    {
                        data.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
                {/*<div className="HeaderItem"><MyNavLink to="/introduction" name="简介"/></div>*/}
                {/*<div className="HeaderItem"><MyNavLink to="/htmlcss" name="HTML/CSS"/></div>*/}
                {/*<div className="HeaderItem"><MyNavLink to="/javascript" name="JavaScript"/></div>*/}
                {/*<div className="HeaderItem"><MyNavLink to="/typescript" name="TypeScript"/></div>*/}
                {/*<div className="HeaderItem"><MyNavLink to="/react" name="React"/></div>*/}
                {/*<div className="HeaderItem"><MyNavLink to="/dvamock" name="Dva&Mock"/></div>*/}
                {/*/!*<div className="HeaderItem"><MyNavLink to="/nodejs" name="Node.js"/></div>*!/*/}
                {/*<div className="HeaderItem"><MyNavLink to="/webpack" name="Webpack"/></div>*/}
                {/*<div className="HeaderItem"><MyNavLink to="/data-structure&algorithm" name="数据结构与算法"/></div>*/}
            </div>
        )
    }
}