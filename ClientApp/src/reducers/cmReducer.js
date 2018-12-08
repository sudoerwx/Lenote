import { SET_CM_INSTANCE } from '../actions/cmActions'

export default (state = null, action) => {
	switch (action.type) {
		case SET_CM_INSTANCE:
			return action.codeMirror

		default:
			return state
	}
}
