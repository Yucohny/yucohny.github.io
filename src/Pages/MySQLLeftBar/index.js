import React, {Component} from "react"
import MyNavLink from "../../Components/MyNavLink"
import {Menu} from 'antd'

const data = [
    ["sql-basic", "SQL 基础"],
    ["sql-ddl", "SQL-DDL"],
    ["sql-dml", "SQL-DML"],
    ["sql-dql", "SQL-DQL"],
    ["sql-dcl", "SQL-DCL"],
    ["function", "SQL-函数"],
    ["constraint", "SQL-约束"],
    ["multi-table-query", "SQL-多表查询"],
    ["transaction", "SQL-事务"]
]

export default class MySQLLeftBar extends Component {
    render() {
        return (
            <div style={{width: '100%'}}>
                <Menu mode="vertical" className="leftbar-menu">
                    {
                        data.map(item => {
                            return (
                                <Menu.Item key={item[0]}>
                                    <MyNavLink to={"/mysql/" + item[0]} name={item[1]}/>
                                </Menu.Item>
                            )
                        })
                    }
                </Menu>
            </div>
        );
    }
}