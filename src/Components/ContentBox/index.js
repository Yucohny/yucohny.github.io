import React, {Component} from "react"
import ContentLeftBar from "../ContentLeftBar"
import ContentBody from "../ContentBody"
import ContentRightBar from "../ContentRightBar"
import './index.css'

export default class ContentBox extends Component {
    render() {
        return (
            <>
                <ContentLeftBar/>
                <ContentBody/>
                <ContentRightBar/>
            </>
        )
    }
}