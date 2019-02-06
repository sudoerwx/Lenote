import { RECEIVE_USER_DATA, LOGOUT, CREATE_FILE_SUCCESS, DELETE_FILE_SUCCESS } from '../actions/user'

const initialState = {
	ownFiles: [],
	secondFiles: [],
	currentFile: {},
}

export default (state = initialState, action) => {
	switch (action.type) {
		case RECEIVE_USER_DATA:
			return { ...action.data, currentFile: action.data.ownFiles[0] }
		case LOGOUT:
			return initialState
		case CREATE_FILE_SUCCESS:
			return {
				...state,
				ownFiles: [...state.ownFiles, action.data],
				currentFile: action.data,
			}
		default:
			return state
	}
}
