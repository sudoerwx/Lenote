export const RECEIVE_SHARE_LINK = 'RECEIVE_SHARE_LINK'

export const getShareLink = nameHash => async dispatch => {
	try {
		const data = await fetch(`/link/${nameHash}`)

		dispatch(receiveShareLink(await data.json()))
	} catch (err) {
		console.dir(err)
	}
}

const receiveShareLink = data => ({
	type: RECEIVE_SHARE_LINK,
	data,
})
