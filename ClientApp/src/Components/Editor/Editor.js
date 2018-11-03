import React, { Component, createRef } from "react"
import CodeMirror from "codemirror"
import "codemirror/mode/gfm/gfm"
import "codemirror/mode/javascript/javascript"
import "codemirror/mode/css/css"
import "codemirror/mode/clike/clike"
import "./style.css"
import { connect } from "react-redux"
import Sidebar from "../Sidebar/Sidebar"
import Button from "../Button/Button"
import ReactSVG from "react-svg"
import MarkdownIt from "react-markdown-it"
import "../../vendor/cledit-style.css"
import "./Editor.css"
import eyeIcon from "../../images/eye.svg"
import downloadIcon from "../../images/download.svg"
import hideTopPanelIcon from "../../images/hide-top-panel.svg"
import preferencesIcon from "../../images/preferences.svg"
import FileList from "../FileList/FileList"
import ToolsPanel from "../ToolsPanel/ToolsPanel"
import { changeText, togglePreview, toggleToolsPanel } from "../../Actions/sync"
import { syncFile } from "../../Actions/fileActions"

class Editor extends Component {
    editorRef = createRef()

    componentDidMount() {
        const { doc } = CodeMirror(this.editorRef.current, {
            value: "",
            mode: {
                name: "markdown",
                allowAtxHeaderWithoutSpace: true,
                highlightFormatting: true,
                maxBlockquoteDepth: 3,
                fencedCodeBlockHighlighting: true
            },
            lineWrapping: true
        })
        this.intervalId = setInterval(
            () => this.props.syncFile(() => doc.getValue()),
            3000
        )
    }

    render() {
        const { isPreview } = this.props
        return (
            <div className="scroller">
                {isPreview && (
                    <div className="markdown-preview">
                        <MarkdownIt>{this.props.children}</MarkdownIt>
                    </div>
                )}
                <div style={{ display: isPreview ? "none" : "block" }}>
                    <div className="editor" ref={this.editorRef} />
                    {!this.props.isToolsPanelHidden && <ToolsPanel />}
                </div>
                <Sidebar>
                    <div className="buttons">
                        <Button
                            className="normal-size-for-mob"
                            onClick={this.props.togglePreview}
                        >
                            <ReactSVG path={eyeIcon} />
                        </Button>
                        <Button>
                            <ReactSVG path={downloadIcon} />
                        </Button>
                        <Button>
                            <ReactSVG path={preferencesIcon} />
                        </Button>
                        <Button
                            className="only-desktop"
                            onClick={this.props.toggleToolsPanel}
                        >
                            <ReactSVG path={hideTopPanelIcon} />
                        </Button>
                        <Button
                            isExpandable={true}
                            style={{
                                padding: 0
                            }}
                            activeAreaStyle={{
                                right: 0,
                                top: 0,
                                marginTop: 0
                            }}
                        >
                            <img
                                src={this.props.userImage}
                                className="avatar"
                                alt=""
                            />
                        </Button>
                    </div>
                    <FileList>Your files</FileList>
                </Sidebar>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isPreview: state.ui.isPreview,
    isToolsPanelHidden: state.ui.isToolsPanelHidden,
    userImage: state.ui.userInfo.profileObj
        ? state.ui.userInfo.profileObj.imageUrl
        : ""
})

const mapDispatchToProps = dispatch => ({
    changeText: () => dispatch(changeText(window.cledit.getContent())),
    togglePreview: () => dispatch(togglePreview()),
    toggleToolsPanel: () => dispatch(toggleToolsPanel()),
    syncFile: getText => dispatch(syncFile(getText))
})

Editor = connect(
    mapStateToProps,
    mapDispatchToProps
)(Editor)

export default Editor
