import {combineReducers} from 'redux';

const ui = (
    state = {
        isLoading: false,
        isImageUploading: false,
        currentFile: '',
        text: '',
        userInfo: {},
        isPreview: false,
        isToolsPanelHidden: false,
        isSidebarOpened: false
    },
    action
) => {
    switch (action.type) {
        case 'REQUEST_FILE_LIST':
        case 'REQUEST_FILE':
            return {
                ...state,
                isLoading: true
            };
        case 'START_IMAGE_UPLOADING':
            return {
                ...state,
                isImageUploading: true
            };
        case 'RECEIVE_USER_INFO':
            return {
                ...state,
                userInfo: action.userInfo
            };
        case 'RECEIVE_FILE_LIST':
            return {
                ...state,
                isLoading: false
            };
        case 'RECEIVE_FILE':
            return {
                ...state,
                currentFile: action.file.id,
                isLoading: false,
                text: action.file.text
            };
        case 'RECEIVE_IMAGE_URL':
            return {
                ...state,
                text: state.text.trimRight() + action.url + ')',
                isImageUploading: false
            };
        case 'SELECT_FILE':
            return {
                ...state,
                currentFile: action.id,
                text: action.newText
            };
        case 'CHANGE_TEXT':
            return {
                ...state,
                text: action.text
            };
        case 'TOGGLE_PREVIEW':
            return {
                ...state,
                isPreview: !state.isPreview
            };
        case 'TOGGLE_TOOLS_PANEL':
            return {
                ...state,
                isToolsPanelHidden: !state.isToolsPanelHidden
            };
        case 'TOGGLE_SIDEBAR':
            return {
                ...state,
                isSidebarOpened: action.isOpened
            };
        default:
            return state;
    }
};

const fileList = (
    state = [],
    action
) => {
    switch (action.type) {
        case 'RECEIVE_FILE_LIST':
            return action.fileList.map(file => ({
                id: file.IdNameHash,
                file: {
                    name: file.NameFile,
                    text: ''
                }
            }));
        case 'RECEIVE_FILE':
            return state.map(item => {
                return action.file.id !== item.id ?
                    item :
                    {id: item.id, file: {
                        name: item.file.name, text: action.file.text
                    }}
            });
        case 'REQUEST_SAVE_FILE':
            return state.map(item => {
                return action.id !== item.id ?
                    item :
                    {id: item.id, file: {
                            name: item.file.name, text: action.text
                        }}
            });

        case 'SELECT_FILE':
            return state.map(item => {
                return action.oldId !== item.id ?
                    item :
                    {id: item.id, file: {
                        name: item.file.name, text: action.oldText
                    }}
            });
        default:
            return state;
    }
};

const rootReducer = combineReducers({ui, fileList});

export default rootReducer;