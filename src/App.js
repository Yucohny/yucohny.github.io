import React, { Component } from "react"
import Header from "./Components/Header"
import ContentBox from "./Components/ContentBox"

export default class App extends Component {
    render() {
        return (
            <div>
                <Header/>
                <ContentBox/>
            </div>
        )
    }
}