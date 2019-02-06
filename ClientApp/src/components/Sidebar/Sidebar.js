import React from 'react'
import { connect } from 'react-redux'
import styled, { css } from 'styled-components'
import { createFile, deleteFile } from '../../actions/user'
import { ReactComponent as DeleteIcon } from '../../icons/delete.svg'

const StyledSidebar = styled.div`
	margin-top: 40px;
	width: calc((var(--max-width) - var(--container-width)) / 2);
	position: fixed;
	margin-left: 50vw;
	left: calc((var(--max-width) / -2));
`

const Item = styled.div`
	display: flex;
	justify-content: space-between;
	background-color: ${({ hl }) => (hl ? 'var(--c-white-hl)' : 'transparent')};
	border-left: ${({ hl }) => (hl ? '4px' : 0)} solid var(--c-blue-hl);
	padding: 8px;
	padding-left: ${({ hl }) => (hl ? '17px' : '21px')};
	font-weight: 200;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	color: var(--c-darkgrey-text);
	cursor: pointer;
	transition: color 0.3s;
	&:hover {
		color: black;
		svg {
			fill: var(--c-red-hl);
			pointer-events: auto;
		}
	}
	svg {
		fill: transparent;
		pointer-events: none;
		transition: fill 0.3s 0.1s;
	}
`

const NewFileButton = styled(Item)`
	display: block;
	margin-top: 10px;
	&::before {
		content: '+';
		font-size: 1.3rem;
		font-weight: 400;
		opacity: 0.7;
		vertical-align: middle;
		margin-left: -10px;
		margin-right: 10px;
	}
`

const Text = styled.p`
	margin: 50px 0 3px 21px;
	font-weight: 500;
	font-size: 0.9rem;
	text-transform: uppercase;
	color: var(--c-grey-text);
`

const Sidebar = ({ user, createFile, deleteFile }) => (
	<StyledSidebar>
		{!!user.ownFiles.length && (
			<>
				<Text>Own files</Text>
				{user.ownFiles.map(({ name, highlighted, nameHash }) => (
					<Item key={nameHash} hl={nameHash === user.currentFile.nameHash}>
						{name}
						<DeleteIcon onClick={() => deleteFile(nameHash)} />
					</Item>
				))}
			</>
		)}
		{!!user.secondFiles.length && (
			<>
				<Text>Other's files</Text>
				{user.secondFiles.map(({ name, highlighted, nameHash }) => (
					<Item key={nameHash} hl={nameHash === user.currentFile.nameHash}>
						{name}
						<DeleteIcon onClick={() => deleteFile(nameHash)} />
					</Item>
				))}
			</>
		)}
		<NewFileButton onClick={() => createFile('asdf' + new Date().toISOString())}>Add a new file</NewFileButton>
	</StyledSidebar>
)

const mapStateToProps = ({ user }) => ({ user })

const mapDispatchToProps = { createFile, deleteFile }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Sidebar)
