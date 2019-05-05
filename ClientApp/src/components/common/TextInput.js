import React from 'react'
import styled, { css } from 'styled-components'

const Input = styled.input`
	border: none;
	border-bottom: 1px solid var(--c-lightgrey-text);
	transition: border-bottom-color 0.3s;
	outline: 0;
	padding: 10px;
	margin-bottom: 15px;
	font-size: 16px;
	&:focus {
		border-bottom-color: var(--c-blue-hl);
	}
	${props =>
		props.invalid &&
		css`
			border-bottom-color: red !important;
		`};
`

const ErrorMessage = styled.div`
	color: red;
	font-size: 14px;
`

const TextInput = ({ error, value, onChange, ...rest }) => (
	<>
		<Input
			type="text"
			value={value}
			invalid={error && Boolean(error(value))}
			onChange={e => onChange && onChange(e.target.value)}
			{...rest}
		/>
		<ErrorMessage>{error && error(value)}</ErrorMessage>
	</>
)

export default TextInput
