import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink";
import {Menu} from 'antd';

const data = [
    ["1", "2021-12-29字节懂车帝一面"],
    ["2", "2022-1-13蚂蚁技术体验部笔试"],
    ["3", "2022-1-17蚂蚁技术体验部一面"],
    ["4", "2022-2-12微软 Explore Program 笔试"]
]

export default class InterLeftBar extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                <Menu mode="vertical" className="leftbar-menu">
                    {
                        data.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/interview/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}