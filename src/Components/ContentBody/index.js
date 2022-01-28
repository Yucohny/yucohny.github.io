import React, {Component} from "react"
import {Route, Routes} from "react-router-dom";
import MyMarkdown from "../MyMarkdown";
import './index.css'
import readme from '../../note/README.md'
import hc_readme from '../../note/CSS/README.md'
import hc_unit from '../../note/CSS/单位.md'
import hc_dis from '../../note/CSS/display.md'
import hc_pos from '../../note/CSS/position.md'
import hc_float from '../../note/CSS/float.md'
import hc_box from '../../note/CSS/盒模型.md'
import hc_hide from '../../note/CSS/隐藏元素.md'
import hc_center from '../../note/CSS/水平垂直居中.md'
import hc_flex from '../../note/CSS/弹性布局.md'
import hc_bfc from '../../note/CSS/BFC.md'
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
import dsa_readme from '../../note/数据结构与算法/README.md'
import dsa_sql from '../../note/数据结构与算法/栈队列链表.md'
import dsa_sort from '../../note/数据结构与算法/各种排序算法.md'
import dsa_heap from '../../note/数据结构与算法/堆.md'
import dsa_ufds from '../../note/数据结构与算法/并查集.md'
import dsa_bst from '../../note/数据结构与算法/二叉搜索树.md'
import './index.css'

const css_data = [
    ["unit", hc_unit],
    ["display", hc_dis],
    ["position", hc_pos],
    ["float", hc_float],
    ["boxmodel", hc_box],
    ["hide", hc_hide],
    ["centered_horizontally_and_vertically", hc_center],
    ["flex", hc_flex],
    ["bfc", hc_bfc]
]

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

const dsa_data = [
    ["stack-queue-list", dsa_sql],
    ["sort", dsa_sort],
    ["heap", dsa_heap],
    ["union-find-disjoint-sets", dsa_ufds],
    ["bst", dsa_bst],
]

export default class ContentBody extends Component {
    render() {
        return (
            <div className="ContentBody">
                <Routes>
                    <Route path="/" element={<MyMarkdown children={readme}/>}/>
                    <Route path="/introduction" element={<MyMarkdown children={readme}/>}/>
                    <Route path="/htmlcss">
                        <Route index element={<MyMarkdown children={hc_readme}/>}/>
                        {
                            css_data.map((item) => {
                                return <Route path={"/htmlcss/" + item[0]} element={<MyMarkdown children={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/javascript">
                        <Route index element={<MyMarkdown children={js_readme}/>}/>
                        {
                            js_data.map((item) => {
                                return <Route path={"/javascript/" + item[0]} element={<MyMarkdown children={item[1]}/>}/>
                            })
                        }
                    </Route>
                    <Route path="/data-structure&algorithm">
                        <Route index element={<MyMarkdown children={dsa_readme}/>}/>
                        {
                            dsa_data.map(item => {
                                return <Route path={"/data-structure&algorithm/" + item[0]} element={<MyMarkdown children={item[1]}/>}/>
                            })
                        }
                    </Route>
                </Routes>
            </div>
        )
    }
}