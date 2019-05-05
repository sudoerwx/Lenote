export const SET_CM_INSTANCE = 'SET_CM_INSTANCE'

export const setCmInstance = ({ codeMirror, doClick }) => ({
	type: SET_CM_INSTANCE,
	editor: {
		codeMirror,
		doClick,
	},
})
