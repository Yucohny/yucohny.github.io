import React, {Component} from "react"
import {NavLink} from "react-router-dom"

export default class MyNavLink extends Component {
    // make = (s) => {}
    render() {
        const {to, name} = this.props
        return (
            <NavLink activeclassname="active" className="Header-Item-NavLink" to={to}>{name}</NavLink>
        )
    }
}