import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ReactComponent as ArrowDownIcon } from '../../icons/arrow-down.svg'
import Buttons from './Buttons'

const Button = styled.span`
	cursor: pointer;
`

const StyledToolbar = styled.div`
	width: 100%;
	display: flex;
	justify-content: center;
	background-color: var(--c-darkgrey-bg);
	position: fixed;
	top: 0;
	left: 0;
	z-index: 2;
`

const Wrapper = styled.div`
	width: 100vw;
	max-width: var(--container-width);
	height: 60px;
	display: flex;
	justify-content: space-between;
`

const Group = styled.div`
	display: flex;
	justify-content: flex-start;
	align-items: center;
	color: var(--c-lightgrey-text);
	font-weight: 200;
	&:nth-of-type(3n - 1) {
		display: flex;
		justify-content: center;
	}
	&:nth-of-type(3n) {
		display: flex;
		justify-content: flex-end;
	}
	svg {
		margin-left: 15px;
	}
`

const LoginButton = styled.a`
	font-weight: 500;
	color: var(--c-blue-hl);
	text-decoration: none;
`

const Toolbar = ({ renderMarkdown, toggleRenderMarkdown }) => (
	<StyledToolbar>
		<Wrapper>
			<Group>
				Lorem Ipsum Dolor{' '}
				<Button>
					<ArrowDownIcon />
				</Button>
			</Group>
			<Group>
				<Buttons />
			</Group>
			<Group>
				<LoginButton href={`${process.env.REACT_APP_API_BASE_URL}/auth/google`}>Login</LoginButton>
			</Group>
		</Wrapper>
	</StyledToolbar>
)

const mapStateToProps = ({ renderMarkdown }) => ({ renderMarkdown })

export default connect(
	mapStateToProps,
	null
)(Toolbar)
