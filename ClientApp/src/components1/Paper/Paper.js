import React from 'react'
import styled from 'styled-components'
import Editor from '../Editor/Editor'

const StyledPaper = styled.div`
	margin-top: 40px;
	width: calc(var(--container-width) - 60px);
	padding: 30px;
	background-color: white;
	box-shadow: 10px 20px 20px rgba(0, 0, 0, .25);
`

const Paper = () => (
	<StyledPaper>
		<Editor />
	</StyledPaper>
)

export default Paper
