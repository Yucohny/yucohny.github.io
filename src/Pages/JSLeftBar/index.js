import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink";
import {Menu} from 'antd';
import './index.css'

const {SubMenu} = Menu

const data1 = [
    ["inhtml", "HTML中的JavaScript"],
    ["datatype", "数据类型与操作符与语句"],
    ["function", "函数"]
]

const data_obj = [
    ["object_basic", "面向对象-基础"],
    ["object_prototype", "面向对象-原型"],
    ["object_extend", "面向对象-继承"],
    ["object_class", "面向对象-类"]
]

const data2 = [
    ["dom", "DOM"],
    ["bom", "BOM"],
    ["ajax", "AJAX"],
    ["memory", "内存"],
    ["event", "事件"]
]

const data_std = [
    ["object", "标准库-Object"],
    ["array", "标准库-Array"],
    ["date", "标准库-Date"],
    ["json", "标准库-JSON"],
    ["regexp", "标准库-RegExp"],
    ["string", "标准库-String"]
]

const data3 = [
    ["transform", "ES6 转码"],
    ["var_let_const", "var-let-const"],
    ["destructure", "解构赋值"],
    ["extend", "扩展运算符"],
    ["deepclone", "深拷贝"],
    ["iterator", "迭代器"],
]

const data_asy = [
    ["async_basic", "异步操作-基础"],
    ["async_promise", "异步操作-Promise对象"],
    ["async_generator", "异步操作-Generator函数"],
    ["async_func", "异步操作-async函数"],
]

const data4 = [
    ["proxy", "代理与反射"]
]

export default class JSLeftBar extends Component {
    render() {
        return (
            <div style={{width: "100%"}}>
                <Menu mode="vertical" className="leftbar-menu">
                    {
                        data1.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/javascript/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                    <SubMenu key="1" title="面向对象">
                        {
                            data_obj.map(item => {
                                return (
                                    <Menu.Item key={item[0]}>
                                        <MyNavLink to={"/javascript/" + item[0]} name={item[1]}/>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    {
                        data2.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/javascript/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                    <SubMenu key="2" title="标准库">
                        {
                            data_std.map(item => {
                                return (
                                    <Menu.Item key={item[0]}>
                                        <MyNavLink to={"/javascript/" + item[0]} name={item[1]}/>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    {
                        data3.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/javascript/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                    <SubMenu key="3" title="异步操作">
                        {
                            data_asy.map(item => {
                                return (
                                    <Menu.Item key={item[0]}>
                                        <MyNavLink to={"/javascript/" + item[0]} name={item[1]}/>
                                    </Menu.Item>
                                )
                            })
                        }
                    </SubMenu>
                    {
                        data4.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/javascript/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}