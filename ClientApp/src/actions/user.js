export const RECEIVE_USER_DATA = 'RECEIVE_USER_DATA'
export const LOGOUT = 'LOGOUT'
export const CREATE_FILE_SUCCESS = 'CREATE_FILE_SUCCESS'
export const DELETE_FILE_SUCCESS = 'DELETE_FILE_SUCCESS'

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

export const logout = history => async dispatch => {
	await fetch('/auth/logout')
	dispatch(logoutSuccess())
	history.push('/')
}

export const logoutSuccess = () => ({
	type: LOGOUT,
})

export const createFile = name => async dispatch => {
	try {
		const { data } = await fetch(`/file/${name}`, { method: 'POST' })
		console.warn(data)
		dispatch(createFileSuccess(data))
	} catch (err) {
		console.warn(err)
		dispatch(createFileSuccess(name)) // TODO: delete when backend is finished
	}
}

export const createFileSuccess = name => ({
	type: CREATE_FILE_SUCCESS,
	data: {
		name,
		nameHash: name
			.split('')
			.reverse()
			.join(''),
	},
})

export const deleteFile = nameHash => async dispatch => {
	try {
		await fetch(`/file/${nameHash}`, { method: 'DELETE' })
		dispatch(deleteFileSuccess(nameHash))
	} catch (err) {
		console.warn(err)
	}
}

export const deleteFileSuccess = nameHash => ({
	type: DELETE_FILE_SUCCESS,
	nameHash,
})
