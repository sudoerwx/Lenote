import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'
import FileList from '../FileList/FileList'

const StyledSidebar = styled.div`
	padding-top: 40px;
	width: calc((var(--max-width) - var(--container-width)) / 2);
	max-height: calc(100vh - 100px);
	overflow-y: auto;
	position: fixed;
	margin-left: 50%;
	left: calc((var(--max-width) / -2));
	@media (max-width: 1160px) {
		width: 100%;
		max-height: calc(100vh - 200px);
		opacity: ${({ mobileSidebarOpen }) => Number(mobileSidebarOpen)};
		transform: translateX(${({ mobileSidebarOpen }) => (mobileSidebarOpen ? 0 : -100)}%);
		transition: transform 0.5s, opacity 0.3s;
	}
`

const Sidebar = ({ mobileSidebarOpen, toggleMobileSidebar }) => (
	<StyledSidebar mobileSidebarOpen={mobileSidebarOpen}>
		<FileList onOpenFile={toggleMobileSidebar} />
	</StyledSidebar>
)

export default withRouter(Sidebar)
