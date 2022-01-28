import React, {Component} from "react"
import {Route, Routes} from "react-router-dom";
import MyMarkdown from "../MyMarkdown";
// import IntroductionBody from "../../Pages/IntroductionBody"
import JSBody from "../../Pages/JSBody";
import './index.css'
import markdown from '../../note/README.md'
import js_readme from '../../note/JavaScript/README.md'
import js_inhtml from '../../note/JavaScript/1-HTML中的JavaScript.md'
import js_datatype from '../../note/JavaScript/2-数据类型与操作符与语句.md'
import js_func from '../../note/JavaScript/3-函数.md'
import js_obj_basic from '../../note/JavaScript/4-面向对象-基础.md'
import js_obj_pro from '../../note/JavaScript/4-面向对象-原型.md'
import js_obj_ext from '../../note/JavaScript/4-面向对象-继承.md'
import js_obj_class from '../../note/JavaScript/4-面向对象-类.md'
import js_dom from '../../note/JavaScript/5-DOM.md'
import js_bom from '../../note/JavaScript/6-BOM.md'
import js_ajax from '../../note/JavaScript/7-AJAX.md'
import js_var from '../../note/JavaScript/8-变量、作用域与内存.md'
import js_event from '../../note/JavaScript/9-事件.md'
import js_array from '../../note/JavaScript/10-标准库-Array.md'
import js_date from '../../note/JavaScript/10-标准库-Date.md'
import js_json from '../../note/JavaScript/10-标准库-JSON.md'
import js_regexp from '../../note/JavaScript/10-标准库-RegExp.md'
import js_string from '../../note/JavaScript/10-标准库-String.md'
import js_trans from '../../note/JavaScript/11-ES6转码.md'
import js_vlc from '../../note/JavaScript/12-var-let-const.md'
import js_des from '../../note/JavaScript/13-解构赋值.md'
import js_extend from '../../note/JavaScript/14-扩展运算符.md'
import js_dc from '../../note/JavaScript/15-深拷贝.md'
import js_it from '../../note/JavaScript/16-迭代器.md'
import js_absic from '../../note/JavaScript/17-异步操作-基础.md'
import js_apromise from '../../note/JavaScript/17-异步操作-Promise对象.md'
import js_agene from '../../note/JavaScript/17-异步操作-Generator函数.md'
import js_afunc from '../../note/JavaScript/17-异步操作-async函数.md'



const js_data = [
    ["inhtml", js_inhtml],
    ["datatype", js_datatype],
    ["function", js_func],
    ["object_basic", js_obj_basic],
    ["object_prototype", js_obj_pro],
    ["object_extend", js_obj_ext],
    ["object_class", js_obj_class],
    ["dom", js_dom],
    ["bom", js_bom],
    ["ajax", js_ajax],
    ["variable", js_var],
    ["event", js_event],
    ["array", js_array],
    ["date", js_date],
    ["json", js_json],
    ["regexp", js_regexp],
    ["string", js_string],
    ["transform", js_trans],
    ["var_let_const", js_vlc],
    ["destructure", js_des],
    ["extend", js_extend],
    ["deepclone", js_dc],
    ["iterator", js_it],
    ["async_basic", js_absic],
    ["async_promise", js_apromise],
    ["async_generator", js_agene],
    ["async_func", js_afunc],
]

export default class ContentBody extends Component {
    render() {
        return (
            <div className="ContentBody">
                <Routes>
                    <Route path="/" element={<MyMarkdown children={markdown}/>}/>
                    <Route path="/introduction" element={<MyMarkdown children={markdown}/>}/>
                    {/*<Route path="/introduction" element={<IntroductionBody/>}/>*/}
                    <Route path="/javascript">
                        <Route index element={<MyMarkdown children={js_readme}/>}/>
                        {
                            js_data.map((item) => {
                                return <Route path={"/javascript/" + item[0]} element={<MyMarkdown children={item[1]}/>}/>
                            })
                        }
                        {/*<Route path="/javascript/inhtml" element={<MyMarkdown children={js_inhtml}/>}/>*/}
                        {/*<Route path="/javascript/datatype" element={<MyMarkdown children={js_datatype}/>}/>*/}
                        {/*<Route path="/javascript/function" element={<MyMarkdown children={js_func}/>}/>*/}
                        {/*<Route path="/javascript/object_basic" element={<MyMarkdown children={js_obj_basic}/>}/>*/}
                        {/*<Route path="/javascript/object_prototype" element={<MyMarkdown children={js_obj_pro}/>}/>*/}
                        {/*<Route path="/javascript/object_extend" element={<MyMarkdown children={js_obj_ext}/>}/>*/}
                        {/*<Route path="/javascript/object_class" element={<MyMarkdown children={js_obj_class}/>}/>*/}
                        {/*<Route path="/javascript/dom" element={<MyMarkdown children={js_dom}/>}/>*/}
                        {/*<Route path="/javascript/bom" element={<MyMarkdown children={js_bom}/>}/>*/}
                    </Route>
                </Routes>
            </div>
        )
    }
}