import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import useMatchMobile from '../hooks/useMatchMobile'
import FileList from '../FileList/FileList'

const StyledSidebar = styled.div`
	margin-top: 40px;
	width: calc((var(--max-width) - var(--container-width)) / 2);
	position: fixed;
	margin-left: 50%;
	left: calc((var(--max-width) / -2));
`

const Sidebar = () => {
	const isMobile = useMatchMobile()

	if (isMobile) return null

	return (
		<StyledSidebar>
			<FileList />
		</StyledSidebar>
	)
}

export default withRouter(Sidebar)
