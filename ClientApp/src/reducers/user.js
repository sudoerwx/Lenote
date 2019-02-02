import { RECEIVE_USER_DATA, LOGOUT } from '../actions/user'

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
		default:
			return state
	}
}
