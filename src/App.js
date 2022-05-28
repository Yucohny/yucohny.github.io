import React, { Component } from "react"
import Header from "./Components/Header"
import ContentBox from "./Components/ContentBox"
import Footer from "./Components/Footer"

export default class App extends Component {
    render() {
        return (
            <>
                <Header/>
                <ContentBox/>
                <Footer/>
            </>
        )
    }
}