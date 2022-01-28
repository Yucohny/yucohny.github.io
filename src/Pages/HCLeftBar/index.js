import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink";

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
            <div>
                {
                    data.map(item => {
                        return (
                            <div className="leftbar-item">
                                <MyNavLink to={"/htmlcss/" + item[0]} name={item[1]}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}