import React from 'react'
import Modal, { useModal } from '../Modal'
import { customRender, fireEvent } from 'utils/test-utils'

const onClose = jest.fn(() => {})

const TestComponent = () => {
	const [visible, , showModal] = useModal()

	return (
		<>
			<div onClick={showModal}>Show modal</div>
			<div>Unrelated text</div>
			<div>Container</div>
			<Modal visible={visible} onClose={onClose}>
				Modal content
			</Modal>
		</>
	)
}

it('renders without crashing and hides after a click on the background', () => {
	const { getByText } = customRender(<TestComponent />)

	fireEvent.click(getByText('Show modal'))
	expect(onClose).toBeCalledTimes(0)
	fireEvent.click(getByText('Modal content'))
	expect(onClose).toBeCalledTimes(0)
	fireEvent.click(getByText('Modal content').parentElement)
	expect(onClose).toBeCalledTimes(1)
})
