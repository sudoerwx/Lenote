import { combineReducers } from 'redux'
import editor from './editor'
import renderMarkdown from './renderMarkdown'
import user from './user'

export default combineReducers({
	editor,
	renderMarkdown,
	user,
})
