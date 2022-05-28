import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink";
import {Menu} from 'antd';
import './index.css'

const { SubMenu } = Menu;

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
    ["portals", "Portals"],
    ["profiler", "Profiler"],
    ["not-use-es6", "不使用 ES6"],
    ["not-use-jsx", "不使用 JSX"],
    ["diff", "diff 算法"],
    ["render-props", "Render Props"],
    ["web-components", "Web Components"],
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
            <div style={{width: "100%"}}>
                <Menu mode="vertical" className="leftbar-menu">
                    <SubMenu title="React 基础">
                        {
                            data_basic.map(item => {
                                return (
                                    <Menu.Item key={item[0]}>
                                        <MyNavLink to={"/react/" + item[0]} name={item[1]}/>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu title="React 进阶">
                        {
                            data_more.map(item => {
                                return (
                                    <Menu.Item key={item[0]}>
                                        <MyNavLink to={"/react/" + item[0]} name={item[1]}/>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu title="React-Router">
                        {
                            router.map(item => {
                                return (
                                    <Menu.Item key={item[0]}>
                                        <MyNavLink to={"/react/" + item[0]} name={item[1]}/>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <SubMenu title="Redux">
                        {
                            redux.map(item => {
                                return (
                                    <Menu.Item key={item[0]}>
                                        <MyNavLink to={"/react/" + item[0]} name={item[1]}/>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    <Menu.Item key="dva">
                        <MyNavLink to="/dva" name="Dva.js"/>
                    </Menu.Item>
                </Menu>
            </div>
        );
    }
}