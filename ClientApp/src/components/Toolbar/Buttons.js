import React from 'react'
import styled from 'styled-components'
import ButtonIcons from './ButtonIcons'

const StyledButtons = styled.div`
	display: flex;
	align-items: center;
	svg {
		margin: 0 15px;
		cursor: pointer;
	}
`

export default () => (
	<StyledButtons>
		{ButtonIcons.map((Icon, index) => <Icon key={index} fill="var(-c-lightgrey-text)" />)}
	</StyledButtons>
)
