import React, { Component } from 'react';
import Modal from '../Modal';
import { GoogleLogin } from 'react-google-login';
import { connect } from 'react-redux';
import './GoogleAuthModal.css'
import {fetchFileList} from "../../../Actions/async";
import mockFetch from "../../../mockFetch";
import {receiveUserInfo, requestUserInfo} from "../../../Actions/sync";

class GoogleAuthModal extends Component {
    constructor (props) {
        super(props);
        this.state = {
            active: true
        }
    }

    render () {
        return <Modal
            required={true}
            className='google-auth-modal'
            active={this.state.active}
            close={() => this.setState({active: false})}
        >
            <h2>Sign in</h2>
            <GoogleLogin
                responseType='id_token'
                clientId="880362213330-1809l1nnn6lfor04feb1ju0rfdt48egl.apps.googleusercontent.com"
                buttonText="Sign in with Google"
                isSignedIn={true}
                onSuccess={r => {
                    this.setState({active: false});
                    this.props.onSuccess(r)}
                }
                onFailure={() => {
                    this.setState({active: false});
                    this.props.onFailure()
                }}
                className='google-login-button'
            />
            <br />
        </Modal>
    }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = (dispatch, props) => {
    return {
        onSuccess: response => {
            if (!response.profileObj) {
                return;
            }
            const GoogleId = response.googleId;
            const Name = response.profileObj.name;
            const Mail = response.profileObj.email;
            const userInfo = {
                GoogleId,
                Name,
                Mail
            };
            dispatch(receiveUserInfo({...userInfo, profileObj: response.profileObj}));
            dispatch(fetchFileList(userInfo));
        },
        onFailure: () => {
            dispatch(requestUserInfo());
            mockFetch('/GoogleAuth').then(response => {
                dispatch(receiveUserInfo(response));
                if (!response.profileObj) {

                    return;
                }
                const GoogleId = response.googleId;
                const Name = response.profileObj.name;
                const Mail = response.profileObj.email;
                const userImage = response.profileObj.userImage;
                const userInfo = {
                    GoogleId,
                    Name,
                    Mail
                };

                const fullUserInfo = {
                    GoogleId,
                    Name,
                    Mail,
                    userImage
                };
                dispatch(receiveUserInfo(fullUserInfo));
                dispatch(fetchFileList(userInfo));
            })
        }
    }
};

export default GoogleAuthModal = connect(mapStateToProps, mapDispatchToProps)(GoogleAuthModal);