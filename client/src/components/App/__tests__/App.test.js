import React from 'react'
import { App } from '../App'
import { customRender } from 'utils/test-utils'

const requestUserData = jest.fn(() => Promise.resolve())

it('renders without crashing', () => {
	customRender(<App requestUserData={requestUserData} />)

	expect(requestUserData).toBeCalledTimes(1)
})
