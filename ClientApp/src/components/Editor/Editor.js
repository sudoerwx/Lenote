import React, { Component, createRef } from 'react'
import styled from 'styled-components'

import { connect } from 'react-redux'
import { setCmInstance } from '../../actions/editorActions'

import { default as PagedownConverter } from '../../vendor/Markdown.Converter'
import { default as PagedownEditor } from '../../vendor/Markdown.Editor'

import CodeMirror from 'codemirror'
import 'codemirror/mode/gfm/gfm'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/clike/clike'
import '../../static/css/CodeMirrorStyle.css'

const FakeButtonsElement = styled.div`
	position: absolute;
	height: 0;
	width: 0;
	overflow: hidden;
`

class Editor extends Component {
	editorRef = createRef()

	componentDidMount() {
		const pagedownConverter = new PagedownConverter.Converter()
		const pagedownEditor = new PagedownEditor.Editor(pagedownConverter)
		const codeMirror = CodeMirror.fromTextArea(this.editorRef.current, {
			value: '',
			mode: {
				name: 'markdown',
				allowAtxHeaderWithoutSpace: true,
				highlightFormatting: true,
				maxBlockquoteDepth: 3,
				fencedCodeBlockHighlighting: true,
			},
			lineWrapping: true,
		})
		pagedownEditor.run(codeMirror)
		const doClick = name =>
			pagedownEditor.uiManager.buttons[name] && pagedownEditor.uiManager.buttons[name].onclick()
		this.props.setCmInstance({ codeMirror, doClick })
	}

	render() {
		return (
			<>
				<FakeButtonsElement id="wmd-button-bar" />
				<textarea ref={this.editorRef} />
			</>
		)
	}
}

const mapDispatchToProps = { setCmInstance }

export default connect(
	null,
	mapDispatchToProps
)(Editor)
