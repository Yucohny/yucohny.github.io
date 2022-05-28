import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink"
import {Menu} from 'antd'

const data = [
    ["environment", "开发环境搭建"],
    ["type", "类型"],
    ["variable", "变量声明"],
    ["compile", "编译选项"],
    ["webpack-for-ts", "使用 Webpack 打包 ts 代码"],
    ["interface", "接口"]
]

export default class TSLeftBar extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <Menu mode="vertical" className="leftbar-menu">
                    {
                        data.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/typescript/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}