import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import './Button.css'

export default class Button extends Component{
    constructor(props) {
        super(props);
        this.state = {
            isRipple: false,
            x: null,
            y: null,
            isExpanded: false
        };
        this.element = React.createRef();
    }

    clickHandler(callback = () => {}, rerenderNeeded) {
        callback();
        rerenderNeeded && rerenderNeeded.forceUpdate();
    }

    componentDidMount() {
        this.activeElementRect = ReactDOM.findDOMNode(this).getBoundingClientRect();
    }

    componentWillUnmount() {
        clearTimeout(this.cancelTimeout);
    }

    ripple(e) {
        this.setState({
            isRipple: true,
            x: e.pageX - e.target.getBoundingClientRect().left - 25,
            y: e.pageY - e.target.getBoundingClientRect().top - 25
        });
    }

    render() {
        const { onClick,
            children,
            style,
            className,
            isExpandable,
            rerenderNeeded,
            activeAreaStyle,
            onFocus,
            onBlur,
            onKeyUp,
            isEditable,
            onChange
        } = this.props;
        return (isExpandable ?
                <div
                    className={
                        'button is-expandable' +
                        (className ? ' ' + className : '') +
                        (this.state.isExpanded ? ' is-expanded' : '')
                    }
                    style={style}
                >
                    <div
                        className="active-area"
                        onClick={() => {
                            this.setState(({isExpanded}) => ({isExpanded: !isExpanded}))
                        }}
                        style={activeAreaStyle}
                    >{children}</div>
                </div>
                :
                <button
                    className={
                        'button' +
                        (className ? ' ' + className : '')
                    }
                    onMouseUp={() => {
                        this.setState({isRipple: false});
                        this.clickHandler(onClick, rerenderNeeded);
                    }}
                    onMouseDown={(e) => this.ripple(e)}
                    style={style}
                    ref={this.element}
                    tabIndex='0'
                    contentEditable={isEditable}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    onKeyUp={onKeyUp}
                    onChange={onChange}
                >{' '}
                    {children}
                    {
                        this.state.isRipple &&
                        <div
                            className='ripple-effect'
                            style={{
                                left: this.state.x,
                                top: this.state.y
                            }}
                        />
                    }
                </button>
        );
    }
}