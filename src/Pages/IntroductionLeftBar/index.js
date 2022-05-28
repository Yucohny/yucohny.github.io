import React, { Component } from "react"
import MyNavLink from "../../Components/MyNavLink"
import {Menu} from 'antd'

const data = [
    ["introduction", "网站介绍"],
    // ["aboutme", "关于 Yucohny"]
]

export default class IntroductionLeftBar extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                <Menu mode="vertical" className="leftbar-menu">
                    {
                        data.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/introduction/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}