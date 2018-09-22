export function requestUserInfo () {
    return {
        type:'REQUEST_USER_INFO'
    }
}

export function receiveUserInfo (userInfo) {
    return {
        type: 'RECEIVE_USER_INFO',
        userInfo
    }
}

export function requestFileList () {
    return {
        type: 'REQUEST_FILE_LIST'
    }
}

export function receiveFileList (fileList) {
    return {
        type: 'RECEIVE_FILE_LIST',
        fileList
    }
}

export function requestFile () {
    return {
        type: 'REQUEST_FILE'
    }
}

export function receiveFile ({id, text}) {
    return {
        type: 'RECEIVE_FILE',
        file: {
            id,
            text
        }
    }
}

export function requestSaveFile (id, text) {
    return {
        type: 'REQUEST_SAVE_FILE',
        id,
        text
    }
}

export function startImageUploading () {
    return {
        type: 'START_IMAGE_UPLOADING'
    }
}

export function receiveImageUrl (url) {
    return {
        type: 'RECEIVE_IMAGE_URL',
        url
    }
}

export function changeText (text) {
    return {
        type: 'CHANGE_TEXT',
        text
    }
}

export function selectFile (oldId, id, oldText, newText) {
    return {
        type: 'SELECT_FILE',
        oldId,
        id,
        oldText,
        newText
    }
}

export function togglePreview () {
    return {
        type: 'TOGGLE_PREVIEW'
    }
}

export function toggleToolsPanel() {
    return {
        type: 'TOGGLE_TOOLS_PANEL'
    }
}

export function toggleSidebar(isOpened) {
    return {
        type: 'TOGGLE_SIDEBAR',
        isOpened
    }
}