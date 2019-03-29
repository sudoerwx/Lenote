import { RECEIVE_SHARE_LINK } from '../actions/shareLink'

export default (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_SHARE_LINK:
			return action.data
		default:
			return state
	}
}
