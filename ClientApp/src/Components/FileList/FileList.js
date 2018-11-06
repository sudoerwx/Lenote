import React, { Component } from 'react';
import FileListItem from "./FileListItem/FileListItem";
import './FileList.css'
import {fetchFile} from "../../Actions/async";
import {selectFile} from "../../Actions/sync";
import {connect} from "react-redux";
import AddNewFile from "./AddNewFile/AddNewFile";

class FileList extends Component {
    render() {
        return (
            <div className='file-list'>
                <h2>{this.props.children}</h2>
                <hr color='lightgrey' size='1' />
                {
                    this.props.fileList.map(file => {
                        return (
                            file && <FileListItem
                                name={file.name}
                                current={this.props.current}
                                id={file.nameHash}
                                onClick={() => this.props.onClick(file.nameHash)}
                                key={file.nameHash}
                            />
                        )
                    }).reverse()
                }
            <AddNewFile />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    fileList: state.fileList,
    userId: state.ui.userInfo.id,
    oldText: state.ui.text,
    oldId: state.ui.currentFile
});

const mergeProps = ({ userId, oldText, oldId, fileList }, { dispatch }, { children }) => ({
    fileList,
    children,
    onClick: (id) => fileList.forEach(item => {
        if (id === item.id) {
            if (!item.file.text) {
                dispatch(fetchFile({userId, hash: id}));
            } else {
                dispatch(selectFile(oldId, id, oldText, item.file.text));
            }
        }
    })
});

FileList = connect(mapStateToProps, null, mergeProps)(FileList);

export default FileList;
