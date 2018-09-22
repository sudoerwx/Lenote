import React, { Component } from 'react';
import Button from "../../Button/Button";
import {createNewFile} from "../../../Actions/async";
import {connect} from "react-redux";

class AddNewFile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isContentEditable: false,
            text: 'New File'
        }
    }

    selectText(el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }

    onFocus(e) {
        if(!e.target.classList.contains('add-new-file')) {
            return;
        }
        this.setState({
            isContentEditable: true,
            text: 'Untitled'
        });
        this.selectText(e.target);
    }

    onBlur() {
        this.setState({
            isContentEditable: false,
            text: 'New File'
        });
    }

    onKeyUp(e) {
        if(e.keyCode !== 13) {
            return;
        }
        this.props.createNewFile(e.target.innerText, this.props.userId);
        this.setState({
            isContentEditable: false,
            text: 'New File'
        });
        e.target.innerText = 'New File';
    }

    onChange(e) {
        this.setState({text: e.target.innerText});
    }

    render() {
        return (
            <Button
                className={'file-list-item add-new-file' + ( this.state.isContentEditable ? ' is-editable' : '')}
                onFocus={(e) => this.onFocus(e)}
                onBlur={e => this.onBlur(e)}
                onKeyUp={e => this.onKeyUp(e)}
                onChange={e => this.onChange(e)}
                isEditable={this.state.isContentEditable}
            >{this.state.text}</Button>
        );
    }
}

const mapStateToProps = state => ({
    userId: state.ui.userInfo.GoogleId
});

const mapDispatchToProps = dispatch => ({
    createNewFile: (name, userId) => dispatch(createNewFile(name, userId))
});

AddNewFile = connect(mapStateToProps, mapDispatchToProps)(AddNewFile);

export default AddNewFile;
