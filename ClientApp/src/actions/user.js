export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'
export const LOGOUT = 'LOGOUT'

export const requestUserData = () => async dispatch => {
	try {
		const data = await fetch('/user')
		dispatch(receiveUserData(await data.json()))
	} catch (err) {
		console.warn(err)
	}
}

export const receiveUserData = data => ({
	type: RECEIVE_USER_DATA,
	data,
})

export const logout = () => async dispatch => {
	try {
		const data = await fetch('/auth/logout')
		dispatch(logoutSuccess())
	} catch (err) {
		console.warn(err)
	}
}

export const logoutSuccess = () => ({
	type: LOGOUT,
})
