import React, { useState } from 'react'
import TextInput from '../TextInput'
import { customRender, fireEvent } from 'utils/test-utils'

const error = jest.fn(value => value === 'Invalid' && 'Invalid')

const TestComponent = () => {
	const [value, setValue] = useState('Initial')

	return <TextInput value={value} onChange={setValue} error={error} />
}

it('renders without crashing, changes and shows an error message', () => {
	const { getByDisplayValue } = customRender(<TestComponent />)

	const input = getByDisplayValue('Initial')
	fireEvent.change(input, { target: { value: 'Changed' } })
	expect(input.value).toEqual('Changed')
	fireEvent.change(input, { target: { value: 'Invalid' } })
	expect(input.nextElementSibling.textContent).toEqual('Invalid')
})
