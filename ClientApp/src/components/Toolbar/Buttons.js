import React from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'

import ButtonList from './ButtonList'
import DialogStyle from './DialogStyle'

const StyledButtons = styled.div`
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	justify-content: center;
	svg {
		margin: 15px;
		cursor: pointer;
	}
	@media (max-width: 520px) {
		justify-content: space-around;
		svg:nth-of-type(6) {
			break-after: always;
		}
	}
`

const Buttons = ({ editor, dark }) => (
	<>
		<StyledButtons>
			{ButtonList.map(({ Icon, method }, index) => (
				<Icon
					key={index}
					onClick={() => editor.doClick(method)}
					fill={`var(--c-${dark ? 'dark' : 'light'}grey-text)`}
				/>
			))}
		</StyledButtons>
		<DialogStyle />
	</>
)

export default connect(({ editor }) => ({ editor }))(Buttons)
