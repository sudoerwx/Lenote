import { SET_CM_INSTANCE } from '../actions/editorActions'

export default (state = null, action) => {
	switch (action.type) {
		case SET_CM_INSTANCE:
			return action.editor

		default:
			return state
	}
}
