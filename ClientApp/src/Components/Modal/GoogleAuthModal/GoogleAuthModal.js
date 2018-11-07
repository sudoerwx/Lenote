import React, { Component } from "react"
import Modal from "../Modal"
import { connect } from "react-redux"
import "./GoogleAuthModal.css"
import { checkLogin } from "../../../Actions/userActions"

class GoogleAuthModal extends Component {
    constructor(props) {
        super(props)
        this.state = {
            active: false
        }
    }

    componentDidMount() {
        this.props.checkLogin()
    }

    render() {
        return (
            <Modal
                required={true}
                className="google-auth-modal"
                active={this.state.active}
                close={() => this.setState({ active: false })}
            >
                <h2>Sign in</h2>
                {/* <GoogleLogin
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
            /> */}
                <a
                    href="http://localhost:5000/auth/google"
                    className="google-login-button"
                >
                    Sign in with Google
                </a>
                <br />
            </Modal>
        )
    }
}

const mapStateToProps = () => ({})

const mapDispatchToProps = dispatch => {
    return {
        checkLogin: () => dispatch(checkLogin())
        // onSuccess: response => {
        //     if (!response.profileObj) {
        //         return
        //     }
        //     const GoogleId = response.googleId
        //     const Name = response.profileObj.name
        //     const Mail = response.profileObj.email
        //     const userInfo = {
        //         GoogleId,
        //         Name,
        //         Mail
        //     }
        //     dispatch(
        //         receiveUserInfo({
        //             ...userInfo,
        //             profileObj: response.profileObj
        //         })
        //     )
        //     dispatch(fetchFileList(userInfo))
        // },
        // onFailure: () => {
        //     dispatch(requestUserInfo())
        //     mockFetch("/GoogleAuth").then(response => {
        //         dispatch(receiveUserInfo(response))
        //         if (!response.profileObj) {
        //             return
        //         }
        //         const GoogleId = response.googleId
        //         const Name = response.profileObj.name
        //         const Mail = response.profileObj.email
        //         const userImage = response.profileObj.userImage
        //         const userInfo = {
        //             GoogleId,
        //             Name,
        //             Mail
        //         }
        //         const fullUserInfo = {
        //             GoogleId,
        //             Name,
        //             Mail,
        //             userImage
        //         }
        //         dispatch(receiveUserInfo(fullUserInfo))
        //         dispatch(fetchFileList(userInfo))
        //     })
        // }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoogleAuthModal)
