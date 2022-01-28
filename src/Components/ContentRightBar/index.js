import React, {Component} from "react"
import ReactMarkdownHeading from 'react-markdown-heading'
import './index.css'
const markdown = '## h2\n### h3\n#### h4\n### h3\n# h1\n### h3'

export default class ContentRightBar extends Component {
    render() {
        return (
            <div className="ContentRightBar">
                <ReactMarkdownHeading
                    markdown={markdown}
                    hyperlink={true}
                    onChangeHeading={(headingList) => {
                        console.log(headingList)
                    }}
                    liClassName="li"
                    activeAnchorClassName="activeAnchor"
                />
                {/*目录<br/>等待更新*/}
            </div>
        )
    }
}