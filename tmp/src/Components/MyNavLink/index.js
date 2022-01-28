import React, {Component} from "react"
import {NavLink} from "react-router-dom"

export default class MyNavLink extends Component {
    render() {
        const {to, name} = this.props
        return (
            <NavLink activeClassName="active" className="Header-Item-NavLink" to={to}>{name}</NavLink>
        )
    }
}