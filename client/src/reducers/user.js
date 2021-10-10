import { RECEIVE_USER_DATA, LOGOUT, CREATE_FILE_SUCCESS, DELETE_FILE_SUCCESS } from '../actions/user'

const initialState = {
	ownFiles: [],
	secondFiles: [],
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
			}
		case DELETE_FILE_SUCCESS:
			return {
				...state,
				ownFiles: state.ownFiles.filter(({ nameHash }) => nameHash !== action.nameHash),
			}
		default:
			return state
	}
}
