import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import Modal from '../common/Modal'
import TextInput from '../common/TextInput'
import { getShareLink } from '../../actions/shareLink'
import { baseApiUrl } from '../../config/constants'

const Title = styled.h2`
	font-weight: 300;
`

const LinkInput = styled(TextInput)`
	margin-top: 15px;
	width: calc(100% - 20px);
`

const ShareLinkModal = ({
	visible,
	onClose,
	getShareLink,
	shareLink,
	match: {
		params: { nameHash },
	},
}) => {
	useEffect(
		() => {
			if (visible) {
				getShareLink(nameHash)
			}
		},
		[visible, nameHash]
	)

	return (
		<Modal visible={visible} onClose={onClose}>
			<Title>Send this link to your friends to share a file with them</Title>
			<LinkInput
				placeholder="Generating a link for you"
				value={shareLink.link ? `${baseApiUrl}/share/${shareLink.link}` : ''}
				onChange={() => {}}
			/>
		</Modal>
	)
}

const mapStateToProps = ({ shareLink }) => ({ shareLink })

const mapDispatchToProps = { getShareLink }

export default withRouter(
	connect(
		mapStateToProps,
		mapDispatchToProps
	)(ShareLinkModal)
)
