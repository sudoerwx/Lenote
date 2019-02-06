import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ButtonList from './ButtonList'

const StyledButtons = styled.div`
	display: flex;
	align-items: center;
	svg {
		margin: 0 15px;
		cursor: pointer;
	}
`

const Buttons = ({ editor }) => (
	<StyledButtons>
		{ButtonList.map(({ Icon, method }, index) => (
			<Icon key={index} onClick={() => editor.doClick(method)} fill="var(--c-lightgrey-text)" />
		))}
	</StyledButtons>
)

export default connect(({ editor }) => ({ editor }))(Buttons)
