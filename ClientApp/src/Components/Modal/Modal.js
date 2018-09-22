import React, { Component } from 'react';
import './Modal.css'

export default class Modal extends Component {
    render() {
        const { active, children, style, className} = this.props;
        return active && (
            <div
                className='modal-wrapper'
                onKeyDown={e => {
                    if(this.props.required) {
                        return;
                    }
                    e.keyCode === 27 && this.props.close();
                }}
                onClick={() => {
                    if(this.props.required) {
                        return;
                    }
                    this.props.close();
                }}
            >
                <div
                    style={style}
                    onClick={e => e.stopPropagation()}
                    className={
                        'modal' +
                        (className ? ' ' + className : '')
                    }
                >
                    {children}
                </div>
            </div>
        )
    }
}