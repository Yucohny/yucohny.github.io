import React, { Component } from "react"
import MyNavLink from "../../Components/MyNavLink";

export default class JSLeftBar extends Component {
    render() {
        return (
            <div>
                <div className="leftbar-item">
                    <MyNavLink to="/javascript/inhtml" name="HTML中的JavaScript"></MyNavLink>
                </div>
                <div className="leftbar-item">
                    <MyNavLink to="/javascript/datatype" name="数据类型与操作符与语句"></MyNavLink>
                </div>
            </div>
        )
    }
}