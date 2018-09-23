import {
    receiveFile,
    receiveFileList,
    receiveImageUrl,
    requestFile,
    requestFileList,
    requestSaveFile
} from './sync';
import fetch from "../mockFetch";

export const fetchFileList = userInfo => dispatch => {
    dispatch(requestFileList());
    const json = '"' + JSON.stringify(userInfo).replace(/"/g, '\\"') + '"';
    return fetch('/api/GoogleAuth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: json
    })
        .then(r => r.text())
        .then(r => {
            const json = r.replace(/"\[/g, '[').replace(/]"/g, ']').replace(/\\/g, '');
            const obj = JSON.parse(json);
            dispatch(receiveFileList(obj));
            dispatch(fetchFile(obj[obj.length-1].IdNameHash))
        });
};

export const fetchFile = hash => dispatch => {
    dispatch(requestFile());
    return fetch(`/api/file/${hash}`, {
        method: 'GET'
    })
        .then(r => r.json())
        .then(r => dispatch(receiveFile({id: hash, text: r.text})));
};

export const saveFile = ({ userId, hash, text }) => dispatch => {
    dispatch(requestSaveFile(hash, text));
    return fetch(`/api/file/${userId}/${hash}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: '"' + text + '"'
    });
};

export const uploadImage = image => dispatch => {
    return fetch('/api/Img/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: '"' + image + '"'
    })
        .then(r => r.text())
        .then(r => {
            console.log('fdsafasd'+r);
            dispatch(receiveImageUrl(window.location.href + 'api/Img/' + r))
        });
};

export const createNewFile = (name, userId) => dispatch => {
    dispatch(requestFileList());
    return fetch(`/api/file/${userId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8'
        },
        body: '"' + name + '"'
    })
        .then(r => r.text())
        .then(r => {
            const json = r.replace(/"\[/g, '[').replace(/]"/g, ']').replace(/\\/g, '');
            const obj = JSON.parse(json);
            dispatch(receiveFileList(obj));
            dispatch(fetchFile(obj[obj.length-1].IdNameHash))
        });
};