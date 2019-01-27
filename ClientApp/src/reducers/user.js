import { RECEIVE_USER_DATA } from '../actions/user'

export default (
	state = {
		ownFiles: [],
		secondFiles: [],
		currentFile: {},
	},
	action
) => {
	switch (action.type) {
		case RECEIVE_USER_DATA:
			return { ...action.data, currentFile: action.data.ownFiles[0] }
		default:
			return state
	}
}
