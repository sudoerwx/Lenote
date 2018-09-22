import React, { Component } from 'react';
import {connect} from 'react-redux';
import Button from '../../Button/Button'

class FileListItem extends Component {
    render() {
        const { current, name, onClick, id, className } = this.props;
        return (
            <Button
                className={
                    'file-list-item' +
                    (className ? ' ' + className : '') +
                    (current ? ' current' : '')
                }
                onClick={() => onClick(id)}
            >
                {name}
                <div className="delete" />
            </Button>
        );
    }
}

const mapStateToProps = (state, props) => ({
    current: state.ui.currentFile === props.id
});

FileListItem = connect(mapStateToProps)(FileListItem);

export default FileListItem;