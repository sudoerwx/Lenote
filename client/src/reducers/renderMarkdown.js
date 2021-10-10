import { TOGGLE_RENDER_MARKDOWN } from '../actions/renderMarkdown'

export default (state = false, action) => {
	switch (action.type) {
		case TOGGLE_RENDER_MARKDOWN:
			return !state
		default:
			return state
	}
}
