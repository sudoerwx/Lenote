const unauthorized = () => ({ type: "UNAUTHORIZED" })
const login = payload => ({ type: "LOGIN", payload })
const fileList = payload => ({ type: "RECEIVE_FILE_LIST", payload }) // TODO: rewrite all reducers

export const checkLogin = () => async dispatch => {
    const response = await fetch("/users")
    if (response.status === 401) {
        dispatch(unauthorized())
    } else if (response.status === 200) {
        const { ownFiles, secondFiles, ...userInfo } = await response.json();
        dispatch(login(userInfo))
        dispatch(fileList([...ownFiles, ...secondFiles])) // TODO: add a delimiter
    }
}
