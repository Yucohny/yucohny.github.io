import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink";

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
            <div>
                {
                    data.map(item => {
                        return (
                            <div className="leftbar-item">
                                <MyNavLink to={"/data-structure&algorithm/" + item[0]} name={item[1]}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}