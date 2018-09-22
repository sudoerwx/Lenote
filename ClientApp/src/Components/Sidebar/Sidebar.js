import React, { Component } from 'react';
import './Sidebar.css'
import Button from "../Button/Button";
import ReactSVG from "react-svg";
import burgerIcon from '../../images/burger.svg'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: false
        };
    }

    render() {
        return (
            <div>
                <Button
                    className={'burger' +
                (this.state.isOpened? ' is-opened': '')}
                    onClick={() => this.setState(state => ({isOpened: !state.isOpened}))}
                >
                    <ReactSVG path={burgerIcon} />
                </Button>
                <div className={
                    'sidebar' +
                    (this.state.isOpened? ' is-opened': '')
                }
                    >
                    {this.props.children}
                </div>
            </div>
        )
    }
}