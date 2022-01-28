import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink";
import './index.css'

const data_basic = [
    ["jsx", "JSX"],
    ["component", "函数式组件与类式组件"],
    ["state-props-refs", "state-props-refs"],
    ["event", "事件绑定"],
    ["life-cycle", "生命周期"],
    ["create-react-app", "create-react-app"],
    ["controlled", "受控组件与非受控组件"],
    ["component-combination", "组件组合"]
]

const data_more = [
    ["pubsub", "PubSub"],
    ["code-splitting", "代码分割"],
    ["accessibility", "无障碍辅助功能"],
    ["context", "Context 机制"],
    ["higher-order-function", "高阶函数"],
    ["strict-mode", "严格模式"],
    ["error-boundaries", "错误边界"],
    ["forwarding-refs", "refs 转发"],
    ["higher-order-component", "高阶组件"],
    ["hook", "Hook"]
]

const router = [
    ["router", "router"]
]

const redux = [
    ["redux", 'Redux'],
    ["react-redux", "React-Redux"]
]

export default class ReactLeftBar extends Component {
    render() {
        return (
            <div>
                <div className="leftbar-item-title">
                    React 基础
                </div>
                {
                    data_basic.map(item => {
                        return (
                            <div className="leftbar-item react-item">
                                <MyNavLink to={"/react/" + item[0]} name={" " + item[1]}/>
                            </div>
                        )
                    })
                }
                <div className="leftbar-item-title">
                    React 进阶
                </div>
                {
                    data_more.map(item => {
                        return (
                            <div className="leftbar-item react-item">
                                <MyNavLink to={"/react/" + item[0]} name={" " + item[1]}/>
                            </div>
                        )
                    })
                }
                <div className="leftbar-item-title">
                    React-Router
                </div>
                {
                    router.map(item => {
                        return (
                            <div className="leftbar-item react-item">
                                <MyNavLink to={"/react/" + item[0]} name={" " + item[1]}/>
                            </div>
                        )
                    })
                }
                <div className="leftbar-item-title">
                    Redux
                </div>
                {
                    redux.map(item => {
                        return (
                            <div className="leftbar-item react-item">
                                <MyNavLink to={"/react/" + item[0]} name={" " + item[1]}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}