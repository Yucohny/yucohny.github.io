import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink";

const data = [
    ["inhtml", "HTML中的JavaScript"],
    ["datatype", "数据类型与操作符与语句"],
    ["function", "函数"],
    ["object_basic", "面向对象-基础"],
    ["object_prototype", "面向对象-原型"],
    ["object_extend", "面向对象-继承"],
    ["object_class", "面向对象-类"],
    ["dom", "DOM"],
    ["bom", "BOM"],
    ["ajax", "AJAX"],
    ["variable", "变量、作用域与内存"],
    ["event", "事件"],
    ["array", "标准库-Array"],
    ["date", "标准库-Date"],
    ["json", "标准库-JSON"],
    ["regexp", "标准库-RegExp"],
    ["string", "标准库-String"],
    ["transform", "ES6 转码"],
    ["var_let_const", "var-let-const"],
    ["destructure", "解构赋值"],
    ["extend", "扩展运算符"],
    ["deepclone", "深拷贝"],
    ["iterator", "迭代器"],
    ["async_basic", "异步操作-基础"],
    ["async_promise", "异步操作-Promise对象"],
    ["async_generator", "异步操作-Generator函数"],
    ["async_func", "异步操作-async函数"],
]

export default class JSLeftBar extends Component {
    render() {
        return (
            <div>
                {
                    data.map(item => {
                        return (
                            <div className="leftbar-item">
                                <MyNavLink to={"/javascript/" + item[0]} name={item[1]}/>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}