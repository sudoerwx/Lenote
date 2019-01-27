export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'

export const requestUserData = () => async dispatch => {
	try {
		const data = await fetch('/users')
		dispatch(receiveUserData(await data.json()))
	} catch (err) {
		console.warn(err)
	}
}

export const receiveUserData = data => ({
	type: RECEIVE_USER_DATA,
	data,
})
