import React, { Component } from 'react';
import Button from "../Button/Button";
import ReactSVG from 'react-svg';
import './ToolsPanel.css';
import linkIcon from '../../images/link.svg';
import imgIcon from '../../images/photo.svg';
import tableIcon from '../../images/table.svg';
import ulIcon from '../../images/ul.svg';
import olIcon from '../../images/ol.svg';
import { connect } from "react-redux";
import { changeText, receiveImageUrl, startImageUploading } from "../../Actions/sync";
import ImageUploadModal from "../Modal/ImageUploadModal/ImageUploadModal";

class ToolsPanel extends Component {
    render() {
        const {
            text,
            isImageUploading,
            onHeaderClick,
            onBoldClick,
            onItalicClick,
            onQuoteClick,
            onCodeClick,
            onLinkClick,
            onImgClick,
            onTableClick,
            onUlClick,
            onOlClick,
            onHrClick
        } = this.props;
        return (
            <div className='tools-panel-wrapper'>
                <div className='tools-panel'>
                    <Button onClick={() => onHeaderClick(text)} className='header-button'><span>#</span>T</Button>
                    <Button onClick={() => onBoldClick(text)} className='bold-button'><span>**</span>B<span>**</span></Button>
                    <Button onClick={() => onItalicClick(text)} className='italic-button'><span>_</span>I<span>_</span></Button>
                    <Button onClick={() => onQuoteClick(text)} className='quote-button only-desktop'><span>&gt;</span>❝❞</Button>
                    <Button onClick={() => onCodeClick(text)} className="code-button only-desktop"><span>`</span>&lt;&gt;<span>`</span></Button>
                    <Button onClick={() => onLinkClick(text)} className="link-button">
                        <ReactSVG
                            path={linkIcon}
                        />
                    </Button>
                    <Button onClick={() => onImgClick(text)} className="img-button">
                        <ReactSVG
                            path={imgIcon}
                        />
                    </Button>
                    <Button  onClick={() => onTableClick(text)} className="table-button only-desktop">
                        <ReactSVG
                            path={tableIcon}
                        />
                    </Button>
                    <Button onClick={() => onUlClick(text)} className="ul-button">
                        <ReactSVG
                            path={ulIcon}
                        />
                    </Button>
                    <Button onClick={() => onOlClick(text)} className="ol-button">
                        <ReactSVG
                            path={olIcon}
                        />
                    </Button>
                    <Button onClick={() => onHrClick(text)} className="hr-button only-desktop">__</Button>
                </div>
                <ImageUploadModal
                    active={isImageUploading}
                    close={() => receiveImageUrl('')}
                />
            </div>
        );
    }
}

const mapStateToProps = state => ({
    text: state.ui.text,
    isImageUploading: state.ui.isImageUploading
});

const getCaret = cledit => {
    if(!cledit) {
        return 0;
    }
    cledit.focus();
    cledit.selectionMgr.restoreSelection();
    return cledit.selectionMgr.selectionStart;
};

const insert = (dispatch, text, caret, sub) => {
    return dispatch(changeText(text.slice(0, caret) + sub + text.slice(caret)));
};

const insertAtLineStart = (dispatch, text, caret, sub) => {
    while (caret--) {
        if (text[caret] === '\n') {
            return insert(dispatch, text, caret + 1, sub);
        }
    }
    return insert(dispatch, text, caret + 1, sub);
};

const insertAfter = (dispatch, text, sub) => {
    return dispatch(changeText(text + sub));
};

const mapDispatchToProps = (dispatch, props) => ({
    onHeaderClick: text => {
        let caret = getCaret(props.cledit);
        return insertAtLineStart(dispatch, text, caret, '# ');
    },
    onBoldClick: text => {
        const caret = getCaret(props.cledit);
        return insert(dispatch, text, caret, '__Bold__');
    },
    onItalicClick: text => {
        const caret = getCaret(props.cledit);
        return insert(dispatch, text, caret, '*Italic*');
    },
    onQuoteClick: text => {
        const caret = getCaret(props.cledit);
        return insertAtLineStart(dispatch, text, caret, '> ');
    },
    onCodeClick: text => {
        const caret = getCaret(props.cledit);
        return insert(dispatch, text, caret, '`code`');
    },
    onLinkClick: text => {
        const caret = getCaret(props.cledit);
        return insert(dispatch, text, caret, '[Link text](url)');
    },
    onImgClick: text => {
        dispatch(startImageUploading());
        return insertAfter(dispatch, text, '![Alt text](');
    },
    onTableClick: text => {
        const caret = getCaret(props.cledit);
        return insert(dispatch, text, caret, '\n|  |  |  |\n|--|--|--|\n|  |  |  |\n');
    },
    onUlClick: text => {
        const caret = getCaret(props.cledit);
        return insertAtLineStart(dispatch, text, caret, '* ');
    },
    onOlClick: text => {
        const caret = getCaret(props.cledit);
        return insertAtLineStart(dispatch, text, caret, '1. ');
    },
    onHrClick: text => {
        let caret = getCaret(props.cledit);
        return insert(dispatch, text, caret, '\n____\n');
    }
});

ToolsPanel = connect(mapStateToProps, mapDispatchToProps)(ToolsPanel);

export default ToolsPanel;