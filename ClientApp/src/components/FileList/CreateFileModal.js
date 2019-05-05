import React, { useState, useCallback } from 'react'
import styled, { css } from 'styled-components'
import Modal from '../common/Modal'
import TextInput from '../common/TextInput'

const Title = styled.h2`
	font-weight: 300;
`
const ButtonsContainer = styled.div`
	display: flex;
	justify-content: flex-end;
`

const Button = styled.div`
	padding: 8px;
	margin-left: 5px;
	border-radius: 5px;
	text-transform: uppercase;
	font-size: 13px;
	cursor: pointer;
	background-color: transparent;
	transition: background-color 0.2s, color 0.2s;
	&:hover {
		background-color: rgba(0, 0, 0, 0.05);
	}
	${props =>
		props.disabled &&
		css`
			color: var(--c-lightgrey-text);
			pointer-events: none;
		`};
`

const CreateFileModal = ({ visible, onClose, error, submit }) => {
	const [fileName, setFileName] = useState('')
	const [touched, setTouched] = useState(false)

	const handleNameChange = useCallback(
		newFileName => {
			if (!touched) setTouched(true)
			setFileName(newFileName)
		},
		[touched]
	)

	return (
		<Modal visible={visible} onClose={onClose}>
			<Title>Enter new file name</Title>
			<TextInput value={fileName} onChange={handleNameChange} error={touched && error} />
			<ButtonsContainer>
				<Button onClick={onClose}>Cancel</Button>
				<Button disabled={Boolean(error(fileName))} onClick={() => submit(fileName).then(onClose)}>
					Create
				</Button>
			</ButtonsContainer>
		</Modal>
	)
}

export default CreateFileModal
