import React, { Component } from 'react';
import './App.css';
import {connect} from 'react-redux';
import Editor from '../Editor/Editor';
import GoogleAuthModal from '../Modal/GoogleAuthModal/GoogleAuthModal';
import {saveFile} from "../../Actions/async";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            previousText: ''
        }
    }

    componentDidMount() {
        setInterval(() => {
            if(this.state.previousText === this.props.currentFile.text ||
                this.props.isLoading ||
                !this.props.currentFile.text) {
                return;
            }
            this.props.saveFile(this.props.currentFile);
            this.setState({previousText: this.props.currentFile.text});
        }, 2000);
    }

    render() {
        const text = this.props.currentFile.text;
        return (
            <div className="App">
                <Editor>
                    {text}
                </Editor>
                <GoogleAuthModal />
            </div>
        );
  }
}

const mapStateToProps = ({ ui }) => {
    return ({
    currentFile: {
        userId: ui.userInfo.GoogleId,
        hash: ui.currentFile,
        text: ui.text
    },
    isLoading: ui.isLoading
})};

const mapDispatchToProps = (dispatch) => ({
    saveFile: (file) => dispatch(saveFile(file))
});

App = connect(mapStateToProps, mapDispatchToProps)(App);

export default App;