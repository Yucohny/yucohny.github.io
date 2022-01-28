import React, { Component } from "react";
import {Link, Outlet} from "react-router-dom";

export default class Alpha extends Component {
    render() {
        return (
            <div>
                This is Alpha.
                <div>
                    <Link to="/alpha/one">one</Link><br/>
                    <Link to="/alpha/two">two</Link>
                </div>
                <Outlet/>
            </div>
        )
    }
}