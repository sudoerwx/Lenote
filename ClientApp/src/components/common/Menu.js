import React, { Component, createRef } from 'react'
import styled from 'styled-components'

const Container = styled.div`
	position: relative;
`

const OptionsWrapper = styled.div`
	position: absolute;
	top: 100%;
	display: ${props => (props.visible ? 'block' : 'none')};
`

const Open = () => null

class Menu extends Component {
	clickAwayRef = createRef()

	state = {
		isMenuOpen: false,
	}

	toggleMenu = () => this.setState(prevState => ({ isMenuOpen: !prevState.isMenuOpen }))

	hideMenu = () => this.setState({ isMenuOpen: false })

	hideOnClickAway = event => {
		if (!event.path.some(el => el === this.clickAwayRef.current)) {
			this.hideMenu()
		}
	}

	componentDidMount() {
		window.addEventListener('click', this.hideOnClickAway)
	}

	componentWillUnmount() {
		window.removeEventListener('click', this.hideOnClickAway)
	}

	render() {
		const { children, ContainerTag = Container, OptionsContainer = 'div', value, onChange } = this.props
		const { isMenuOpen } = this.state

		const open = children.find(child => child.type === Open)
		const options = children.filter(child => child.type !== Open)

		return (
			<ContainerTag onClick={this.toggleMenu} ref={this.clickAwayRef}>
				{open && open.props.children}
				<OptionsWrapper visible={isMenuOpen}>
					<OptionsContainer>
						{options &&
							React.Children.map(options, option =>
								React.cloneElement(option, {
									onClick: e => onChange(option.props.value, e),
									...option.props,
								})
							)}
					</OptionsContainer>
				</OptionsWrapper>
			</ContainerTag>
		)
	}

	static Open = Open
}

export default Menu
