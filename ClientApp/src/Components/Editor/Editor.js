import React, { Component } from 'react';
import { connect } from 'react-redux';
import Prism from 'prismjs';
import { defaultMdGrammar } from '../../vendor/prismMdGrammar';
import Sidebar from '../Sidebar/Sidebar';
import Cledit from '../../vendor/cledit';
import Button from '../Button/Button';
import ReactSVG from 'react-svg';
import MarkdownIt from 'react-markdown-it';
import '../../vendor/cledit-style.css';
import './Editor.css';
import eyeIcon from '../../images/eye.svg';
import downloadIcon from '../../images/download.svg';
import hideTopPanelIcon from '../../images/hide-top-panel.svg';
import preferencesIcon from '../../images/preferences.svg';
import FileList from '../FileList/FileList';
import ToolsPanel from '../ToolsPanel/ToolsPanel';
import { changeText, togglePreview, toggleToolsPanel } from '../../Actions/sync';

class Editor extends Component {
    constructor (props) {
        super(props);
        this.scrollerElement = React.createRef();
        this.editorElement = React.createRef();
    }

    componentDidMount() {
        this.initEditor();
    }

    initEditor() {
        window.cledit = Cledit(
            this.editorElement.current,
            this.scrollerElement.current
        );

        window.cledit.init({
            sectionHighlighter: function (section) {
                return Prism.highlight(section.text, defaultMdGrammar)
            }
        });
        (new Cledit.Watcher(window.cledit, (text) => this.props.changeText(text))).startWatching();
    }

    render() {
        const {isPreview} = this.props;
        if (window.cledit) {
            window.cledit.setContent(this.props.children);
            window.cledit.$contentElt.querySelectorAll('.img .cl-src').forEach((el) => {
                el.dataset.url = el.innerText;
            })
        }
        return (
            <div className='scroller' ref={this.scrollerElement}>
                {isPreview &&
                    <div className='markdown-preview'>
                        <MarkdownIt>{this.props.children}</MarkdownIt>
                    </div>
                }
                <div style={{display: isPreview ? 'none': 'block'}}>
                    <pre className='editor' ref={this.editorElement} />
                    {!this.props.isToolsPanelHidden && <ToolsPanel cledit={window.cledit} />}
                </div>
                <Sidebar>
                    <div className="buttons">
                        <Button className='normal-size-for-mob' onClick={this.props.togglePreview}><ReactSVG path={eyeIcon} /></Button>
                        <Button><ReactSVG path={downloadIcon} /></Button>
                        <Button><ReactSVG path={preferencesIcon} /></Button>
                        <Button className='only-desktop' onClick={this.props.toggleToolsPanel}><ReactSVG path={hideTopPanelIcon} /></Button>
                        <Button
                            isExpandable={true}
                            style={{
                                padding: 0
                            }}
                            activeAreaStyle={{
                                right: 0,
                                top: 0,
                                marginTop: 0
                            }}
                        ><img
                            src={this.props.userImage}
                            className='avatar'
                            alt='' /></Button>
                    </div>
                    <FileList>Your files</FileList>
                </Sidebar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isPreview: state.ui.isPreview,
    isToolsPanelHidden: state.ui.isToolsPanelHidden,
    userImage: state.ui.userInfo.profileObj ? state.ui.userInfo.profileObj.imageUrl : ''
});

const mapDispatchToProps = dispatch => ({
    changeText: () => dispatch(changeText(window.cledit.getContent())),
    togglePreview: () => dispatch(togglePreview()),
    toggleToolsPanel: () => dispatch(toggleToolsPanel())
});

Editor = connect(mapStateToProps, mapDispatchToProps)(Editor);

export default Editor