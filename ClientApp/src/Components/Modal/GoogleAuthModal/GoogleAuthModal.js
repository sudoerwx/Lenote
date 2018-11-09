import React, { Component } from "react"
import Modal from "../Modal"
import { connect } from "react-redux"
import "./GoogleAuthModal.css"
import { checkLogin } from "../../../Actions/userActions"

class GoogleAuthModal extends Component {
    componentDidMount() {
        this.props.checkLogin()
    }

    render() {
      const { isAuthorized } = this.props;
        return (
            <Modal
                required={true}
                className="google-auth-modal"
                active={!isAuthorized}
            >
                <h2>Sign in</h2>
                <a
                    href="/auth/google"
                    className="google-login-button"
                >
                    Sign in with Google
                </a>
                <br />
            </Modal>
        )
    }
}

const mapStateToProps = ({ user: { isAuthorized } }) => ({ isAuthorized });

const mapDispatchToProps = dispatch => {
    return {
        checkLogin: () => dispatch(checkLogin())
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(GoogleAuthModal)
