import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink"
import {Menu} from 'antd'

const data = [
    ["install-basic", "安装与基本使用"],
    ["webpack-config", "自定义 Webpack 配置"],
    ["asset", "资源模块"],
    ["loader", "loader"],
    ["code-splitting", "代码分割"],
    ["cache", "缓存"],
    ["split-config", "拆分基本配置"]
]

export default class WebpackLeftBar extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <Menu mode="vertical" className="leftbar-menu">
                    {
                        data.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/webpack/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}