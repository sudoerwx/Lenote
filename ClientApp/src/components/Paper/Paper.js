import React from 'react'
import styled from 'styled-components'
import Editor from '../Editor/Editor'

const Wrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
`

const StyledPaper = styled.div`
	margin-top: 40px;
	width: calc(var(--container-width) - 60px);
	padding: 30px;
	background-color: white;
	box-shadow: 10px 20px 20px rgba(0, 0, 0, .25);
`

const Paper = () => (
    <Wrapper>
        <StyledPaper>
            <Editor />
        </StyledPaper>
    </Wrapper>
)

export default Paper
