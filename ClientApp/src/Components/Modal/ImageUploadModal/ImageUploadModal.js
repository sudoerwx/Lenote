import React, { Component } from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { uploadImage } from "../../../Actions/async";
import { receiveImageUrl } from "../../../Actions/sync";

class ImageUploadModal extends Component {
    constructor(props) {
        super(props);
        this.fileInput = React.createRef();
    }

    imageToBase64(img, callback) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(img);
        fileReader.onloadend = () => callback(fileReader.result)
    };

    render() {
        return <Modal
            close={this.props.close}
            active={this.props.active}>
            <h2>Upload image</h2>
            <input
                type="file"
                accept='image/*'
                onChange={() => {
                    if(this.fileInput.current.files) {
                        this.imageToBase64(this.fileInput.current.files[0], this.props.pasteUrl)
                    }}
                }
                ref={this.fileInput}
            />
            <h3> or type url</h3>
            <input type="text" accept='image/*' onKeyDown={e => {
                if(e.keyCode === 13){
                    this.props.pasteUrl(e.target.value);
                }
            }}/>
        </Modal>
    }
}

const mapDispatchToProps = dispatch => ({
    upload: base64 => {
        dispatch(uploadImage(base64))
    },
    pasteUrl: url => dispatch(receiveImageUrl(url))
});

ImageUploadModal = connect(null, mapDispatchToProps)(ImageUploadModal);

export default ImageUploadModal;