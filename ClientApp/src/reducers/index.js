import { combineReducers } from 'redux'
import editor from './editor'
import renderMarkdown from './renderMarkdown'

export default combineReducers({
	editor,
	renderMarkdown,
})
