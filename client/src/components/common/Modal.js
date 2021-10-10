import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import styled, { css } from 'styled-components'

const ModalWrapper = styled.div`
	position: absolute;
	width: 100%;
	height: 100vh;
	top: 0;
	left: 0;
	background-color: rgba(0, 0, 0, 0.15);
	z-index: 4;
	opacity: 1;
	pointer-events: auto;
	transition: opacity 0.3s;
	${props =>
		!props.visible &&
		css`
			opacity: 0;
			pointer-events: none;
		`};
`

const ModalContent = styled.div`
	position: absolute;
	top: 50%;
	left: 50%;
	transform: translate(-50%, -50%);
	background-color: white;
	border-radius: 5px;
	padding: 20px;
	box-shadow: 4px 2px 5px rgba(0, 0, 0, 0.15);
	max-width: calc(100% - 70px);
	width: 500px;
`

const Modal = ({ visible, onClose, children }) =>
	createPortal(
		<ModalWrapper onClick={onClose} visible={visible}>
			<ModalContent onClick={e => e.stopPropagation()}>{children}</ModalContent>
		</ModalWrapper>,
		document.body
	)

export default Modal

export const useModal = () => {
	const [visible, toggleVisibility] = useState(false)

	const hideModal = () => toggleVisibility(false)
	const showModal = () => toggleVisibility(true)

	return [visible, hideModal, showModal]
}
