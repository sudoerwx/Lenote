import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { ReactComponent as ArrowDownIcon } from '../../icons/arrow-down.svg'
import Buttons from './Buttons'
import Avatar from '../common/Avatar'
import Menu, { OpenMenu } from '../common/Menu'
import { logout } from '../../actions/user'
import { getShareLink } from '../../actions/shareLink'

const Button = styled.div`
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

const ShareLink = styled.input`
	padding: 15px 20px;
`

const LoginButton = styled.a`
	font-weight: 500;
	color: var(--c-blue-hl);
	text-decoration: none;
`

const UserName = styled.div`
	display: flex;
	align-items: center;
	cursor: pointer;
	height: 100%;
	${Avatar} {
		margin-left: 10px;
	}
`

const MenuButtonsContainer = styled.div`
	margin-top: 10px;
	width: 200px;
	right: 0;
	box-shadow: 4px 2px 2px rgba(0, 0, 0, 0.2);
	background-color: white;
	color: var(--c-darkgrey-text);
`

const UserButton = styled.div`
	padding: 15px 20px;
	cursor: pointer;
`

const Toolbar = ({ renderMarkdown, toggleRenderMarkdown, user, logout, getShareLink, shareLink }) => (
	<StyledToolbar>
		<Wrapper>
			<Group>
				<Menu onOpen={() => getShareLink(user.currentFile.nameHash)}>
					<OpenMenu OptionsContainer={MenuButtonsContainer}>
						<Button>
							{user.currentFile.name}
							<ArrowDownIcon />
						</Button>
					</OpenMenu>
					<ShareLink
						onChange={() => {}}
						value={
							shareLink.link ? `Share link: ${window.location.origin}/${shareLink.link}` : 'Share link: '
						}
					/>
				</Menu>
			</Group>
			<Group>
				<Buttons />
			</Group>
			<Group>
				{user.name ? (
					<Menu OptionsContainer={MenuButtonsContainer}>
						<OpenMenu>
							<UserName>
								{user.name} {user.secondName}
								{user.photoURI && <Avatar src={user.photoURI} />}
							</UserName>
						</OpenMenu>
						<UserButton onClick={logout}>Logout</UserButton>
					</Menu>
				) : (
					<LoginButton href={`${process.env.REACT_APP_API_BASE_URL}/auth/google`}>Login</LoginButton>
				)}
			</Group>
		</Wrapper>
	</StyledToolbar>
)

const mapStateToProps = ({ renderMarkdown, user, shareLink }) => ({ renderMarkdown, user, shareLink })

const mapDispatchToProps = { logout, getShareLink }

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Toolbar)
