import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import { setCmInstance } from '../../actions/cmActions'

import CodeMirror from 'codemirror'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/clike/clike'
import '../../static/css/CodeMirrorStyle.css'

class Editor extends Component {
	editorRef = createRef()

	componentDidMount() {
		const codeMirror = CodeMirror.fromTextArea(this.editorRef.current, {
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

		this.props.setCmInstance(codeMirror)
	}

	render() {
		return <textarea ref={this.editorRef} />
	}
}

const mapDispatchToProps = { setCmInstance }

export default connect(null, mapDispatchToProps)(Editor)
