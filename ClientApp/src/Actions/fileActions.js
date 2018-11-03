const sendFile = () => ({ type: "SEND_FILE" })

export const syncFile = getText => dispatch => {
    dispatch(sendFile)
    fetch(`/files/testUser/testFile`, {
        method: "POST",
        body: getText()
    })
}
