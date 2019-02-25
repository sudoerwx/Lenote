import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { withRouter } from 'react-router-dom'
import { ReactComponent as ArrowDownIcon } from '../../icons/arrow-down.svg'
import Buttons from './Buttons'
import Avatar from '../common/Avatar'
import Menu, { OpenMenu } from '../common/Menu'
import { useModal } from '../common/Modal'
import ShareLinkModal from './ShareLinkModal'
import { logout } from '../../actions/user'
import useMatchMobile from '../hooks/useMatchMobile'

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

const MenuButton = styled.div`
	padding: 15px 20px;
	cursor: pointer;
`

const Toolbar = ({ renderMarkdown, toggleRenderMarkdown, user, logout, match, history }) => {
	const [shareLinkVisible, hideShareLink, showShareLink] = useModal()
	const isMobile = useMatchMobile()

	const currentFile =
		[...user.ownFiles, ...user.secondFiles].find(file => file.nameHash === match.params.nameHash) || {}

	return (
		<StyledToolbar>
			<Wrapper>
				<Group>
					<Menu OptionsContainer={MenuButtonsContainer}>
						<OpenMenu>
							<Button>
								{currentFile.name}
								<ArrowDownIcon />
							</Button>
						</OpenMenu>
						<MenuButton onClick={showShareLink}>Get shareable link</MenuButton>
					</Menu>
				</Group>
				{!isMobile && (
					<Group>
						<Buttons />
					</Group>
				)}
				<Group>
					{user.name ? (
						<Menu OptionsContainer={MenuButtonsContainer}>
							<OpenMenu>
								<UserName>
									{user.name} {user.secondName}
									{user.photoURI && <Avatar src={user.photoURI} />}
								</UserName>
							</OpenMenu>
							<MenuButton onClick={() => logout(history)}>Logout</MenuButton>
						</Menu>
					) : (
						<LoginButton href={`${process.env.REACT_APP_API_BASE_URL}/auth/google`}>Login</LoginButton>
					)}
				</Group>
			</Wrapper>
			<ShareLinkModal visible={shareLinkVisible} onClose={hideShareLink} />
		</StyledToolbar>
	)
}

const mapStateToProps = ({ renderMarkdown, user }) => ({ renderMarkdown, user })

const mapDispatchToProps = { logout }

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(Toolbar)
)
