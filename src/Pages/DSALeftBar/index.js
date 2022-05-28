import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink";
import {Menu} from 'antd';

const data = [
    ["stack-queue-list", "栈、队列与链表"],
    ["sort", "各种排序算法"],
    ["heap", "堆"],
    ["union-find-disjoint-sets", "并查集"],
    ["bst", "二叉搜索树"],
]

export default class DSALeftBar extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                <Menu mode="vertical" className="leftbar-menu">
                    {
                        data.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/data-structure&algorithm/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}