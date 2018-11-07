const sendFile = () => ({ type: "SEND_FILE" })
const receiveFile = text => ({ type: "RECEIVE_FILE", payload: text })

export const syncFile = getText => dispatch => {
    dispatch(sendFile)
    fetch(`/files/testFile`, {
        method: "POST",
        body: getText()
    })
}

export const getFile = id => async dispatch => {
  const text = await fetch(`/files/${id}`)
  dispatch(receiveFile(text))
}
