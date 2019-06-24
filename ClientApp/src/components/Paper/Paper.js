import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import Editor from '../Editor/Editor'
import ReactMarkdown from 'react-markdown'

import { toggleRenderMarkdown } from '../../actions/renderMarkdown'

import { ReactComponent as VisibilityOn } from '../../icons/visibility-on.svg'
import { ReactComponent as VisibilityOff } from '../../icons/visibility-off.svg'

const Wrapper = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
`

const StyledPaper = styled.div`
	margin-top: 40px;
	width: calc(var(--container-width) - 60px);
	padding: 30px;
	background-color: white;
	box-shadow: 10px 20px 20px rgba(0, 0, 0, 0.25);
	@media (max-width: 1160px) {
		transform: translateX(${({ mobileSidebarOpen }) => (mobileSidebarOpen ? 100 : 0)}%);
		transition: transform 0.5s;
	}
`

const VisibilityWrapper = styled.div`
	display: ${props => (props.visible ? 'block' : 'none')};
`

const MarkdownRenderWrapper = styled.div`
	min-height: calc(100vh - 188px);
	padding: 14px;
	overflow-wrap: break-word;
	img {
		max-width: 100%;
	}
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

const Paper = ({ renderMarkdown, toggleRenderMarkdown, mobileSidebarOpen, codeMirror }) => (
	<Wrapper>
		<RenderButton onClick={toggleRenderMarkdown}>
			{renderMarkdown ? <VisibilityOff /> : <VisibilityOn />}
		</RenderButton>
		<StyledPaper mobileSidebarOpen={mobileSidebarOpen}>
			<VisibilityWrapper visible={!renderMarkdown}>
				<Editor />
			</VisibilityWrapper>
			<VisibilityWrapper visible={renderMarkdown}>
				<MarkdownRenderWrapper>
					<ReactMarkdown source={codeMirror.doc && codeMirror.doc.getValue()} />
				</MarkdownRenderWrapper>
			</VisibilityWrapper>
		</StyledPaper>
	</Wrapper>
)

const mapStateToProps = ({ renderMarkdown, editor: { codeMirror } }) => ({ renderMarkdown, codeMirror })

const mapDispatchToProps = { toggleRenderMarkdown }

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Paper)
)
