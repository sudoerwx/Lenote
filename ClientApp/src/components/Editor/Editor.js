import React, { Component, createRef } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import { setCmInstance } from '../../actions/editor'
import { toggleRenderMarkdown } from '../../actions/renderMarkdown'
import { ReactComponent as VisibilityOn } from '../../icons/visibility-on.svg'
import { ReactComponent as VisibilityOff } from '../../icons/visibility-off.svg'

import { default as PagedownConverter } from '../../vendor/Markdown.Converter'
import { default as PagedownEditor } from '../../vendor/Markdown.Editor'

import CodeMirror from 'codemirror'
//import 'codemirror/mode/gfm/gfm'
import '../../vendor/modifiedGfm'
import 'codemirror/mode/javascript/javascript'
import 'codemirror/mode/css/css'
import 'codemirror/mode/clike/clike'
import '../../static/css/CodeMirrorStyle.css'

const FakeButtonsElement = styled.div`
	display: none;
`

const VisibilityWrapper = styled.div`
	display: ${props => (props.visible ? 'block' : 'none')};
`

const MarkdownRenderWrapper = styled.div`
	min-height: calc(100vh - 188px);
	padding: 14px;
	overflow-wrap: break-word;
`

const RenderButton = styled.div`
	position: fixed;
	width: 0;
	height: 0;
	top: 60px;
	right: 0;
	border: 40px solid rgba(0, 0, 0, 0.1);
	border-bottom-color: transparent;
	border-left-color: transparent;
	cursor: pointer;
	z-index: 2;
	&::after {
		content: '';
		clear: both;
	}
	svg {
		position: absolute;
		margin-left: 5px;
		margin-top: -30px;
		color: var(--c-darkgrey-bg);
	}
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
		const { renderMarkdown, toggleRenderMarkdown, codeMirror } = this.props

		return (
			<>
				<RenderButton onClick={toggleRenderMarkdown}>
					{renderMarkdown ? <VisibilityOff /> : <VisibilityOn />}
				</RenderButton>
				<VisibilityWrapper visible={!renderMarkdown}>
					<FakeButtonsElement id="wmd-button-bar" />
					<textarea ref={this.editorRef} />
				</VisibilityWrapper>
				<VisibilityWrapper visible={renderMarkdown}>
					<MarkdownRenderWrapper>
						<ReactMarkdown source={codeMirror.doc && codeMirror.doc.getValue()} />
					</MarkdownRenderWrapper>
				</VisibilityWrapper>
			</>
		)
	}
}

const mapStateToProps = ({ renderMarkdown, editor: { codeMirror } }) => ({ renderMarkdown, codeMirror })

const mapDispatchToProps = { setCmInstance, toggleRenderMarkdown }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Editor)
