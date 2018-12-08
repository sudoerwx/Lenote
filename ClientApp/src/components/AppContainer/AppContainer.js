import React from 'react'
import styled from 'styled-components'

import Paper from '../Paper/Paper'
import Sidebar from '../Sidebar/Sidebar'

const StyledAppContainer = styled.div`
	display: flex;
	justify-content: center;
	min-height: calc(100vh - 60px);
`

const AppContainer = () => (
	<StyledAppContainer>
		<Sidebar />
		<Paper />
		<Sidebar empty />
	</StyledAppContainer>
)

export default AppContainer
