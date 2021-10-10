import { SET_CM_INSTANCE } from '../actions/editor'

export default (state = { codeMirror: {} }, action) => {
	switch (action.type) {
		case SET_CM_INSTANCE:
			return action.editor

		default:
			return state
	}
}
