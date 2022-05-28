import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink";
import {Menu} from 'antd';

const data = [
    ["unit", "单位"],
    ["display", "display"],
    ["position", "position"],
    ["float", "float"],
    ["boxmodel", "盒模型"],
    ["hide", "隐藏元素"],
    ["centered_horizontally_and_vertically", "水平垂直居中"],
    ["flex", "弹性布局"],
    ["bfc", "BFC"]
]

export default class HCLeftBar extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                <Menu mode="vertical" className="leftbar-menu">
                    {
                        data.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/htmlcss/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}